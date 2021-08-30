/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	search_semester();
	form_init();
});

function form_init()
{
	var v_section = $("#section").val();
	var v_today = cfmGetToDate();
	var v_course_date = $("#course_date").val();
	var v_schedule = $("#course_schedule").val();
	
	var arr_schedule = v_schedule.split(",");
	var course_first_date = arr_schedule[0];
	$.ajax({
		type : "POST",
		url : "/enrollment/getAchieveSendList.do",
		data:{
			course_id : $("#course_id").val()
		},
		success:function(data){
			var v_date = $("#search_course_date").val();
			//상단화면을 그려준다.
			create_top_menu(data.sectionList, data.practiceAllList, "send", "", $("#course_id").val(), data.courseInfo.student_type);
			
			
			var enrollmentList = data.enrollmentList;
			
			var courseInfo = data.courseInfo;
			
			var classCountList = data.classCountList;
			var resultList = data.resultList;
			
			var nWidth = 100;
			
			var nWidth = 100;
			
			var vHtml = "";
			vHtml += '<table id="example"  class="table table-bordered table-td-valign-middle m-b-0">';
			vHtml += '	<thead>';
			vHtml += '		<tr>';
			vHtml += '			<th class="text-center table-info" style="width:40px;">상태</th>';
			vHtml += '			<th class="text-center table-info" style="width:40px;">번호</th>';
			vHtml += '			<th class="text-center table-info" style="width:80px;">이름</th>';
			vHtml += '			<th class="text-center table-info" style="width:80px;">기존/신규</th>';
			var column_length = 3;
			
			for(var i=arr_schedule.length-1; i>=0; i--)
			{
				var v_date = arr_schedule[i];
				if(v_today < v_date) continue;
				vHtml += '			<th class="text-center table-success" style="width:'+nWidth+'px;">'+v_date+'</th>';
			}
			vHtml += '		</tr>';
			vHtml += '	</thead>';
			vHtml += '	<tbody>';
			
			for(var i=0; i<enrollmentList.length; i++)
			{
				
				if(enrollmentList[i].class_gubun == "반이동"){
					if(enrollmentList[i].user_first_date == course_first_date){
						continue;
					}
				}
				var course_enrollment_id = enrollmentList[i].course_enrollment_id;
				var student_id = enrollmentList[i].student_id;
				
				var arr_enrollment_schedule = enrollmentList[i].schedule.split(",");
				var first_date = arr_enrollment_schedule[0];
				
				vHtml += '		<tr>';
				vHtml += create_student_info(enrollmentList[i], courseInfo, classCountList);
				for(var j=arr_schedule.length-1; j>=0; j--)
				{
					
					var v_date = arr_schedule[j];
					if(v_today < v_date) continue;
					
					//모두 빈칸으로 체크할경우
					var isPaid = true;
					var isMove  = false;
					var isFirst = false;
					var isMiddle = false;
					var isEmpty = false;
					if(enrollmentList[i].class_gubun == "반이동"){
						if(v_date >= enrollmentList[i].move_date)
						{
							isPaid = false;
							isEmpty = true;
						}else if(v_date < first_date){
							isPaid = false;
							isMiddle = true;
						}else if(arr_enrollment_schedule.indexOf(v_date) < 0 ){
							isPaid = false;
							isEmpty = true;
						}
					}else if(enrollmentList[i].class_gubun == "환불"){
						if(v_date >= enrollmentList[i].refund_date)
						{
							if(v_date >= enrollmentList[i].move_date)
							{
								isPaid = false;
								isEmpty = true;
							}else if(v_date < first_date){
								isPaid = false;
								isMiddle = true;
							}else if(arr_enrollment_schedule.indexOf(v_date) < 0 ){
								isPaid = false;
								isEmpty = true;
							}
						}
					}else{
						if(v_date < enrollmentList[i].move_date)
						{
							isPaid = false;
							isMove = true;
						}else if(v_date < first_date){
							isPaid = false;
							isFirst = true;
						}else if(arr_enrollment_schedule.indexOf(v_date) < 0 ){
							isPaid = false;
							isEmpty = true;
						}
					}
					var v_idx = resultList.findIndex(t => t.date == v_date && t.course_enrollment_id == course_enrollment_id);
					if(v_idx >= 0){
						vHtml += '<td class="text-center" style="width:'+nWidth+'px;">발송완료<br/>';
						vHtml += '<button type="button" class="btn btn-info btn-xs" style="margin-right:5px;" onclick="showAchieve('+course_enrollment_id+',\''+v_date+'\')">성취표 보기</button>';
						vHtml += '</td>';
						
					}else{
						vHtml += '<td class="bg-grey-darker text-center" style="width:'+nWidth+'px;">미발송</td>';
					}
					
				}
				vHtml += '		</tr>';
			}
			vHtml += '	</tbody>';
			vHtml += '</table>';			
			$("#table_info").html(vHtml);
			
			var array_column_def = Array();
			var objColumnDef = new Object();
			objColumnDef.targets = 0;
			objColumnDef.orderable = false;
			array_column_def.push(objColumnDef);
			for(var i=1; i<column_length; i++)
			{
				var objColumn = new Object();
				objColumn.targets = i;
				objColumn.orderData = [0, i];
				array_column_def.push(objColumn);
			}
			oTable = $('#example').DataTable( {
				"columnDefs": array_column_def,
				orderFixed : [ 0, 'asc' ],
		        searching: false,
		        info:false,
		        scrollY:        '60vh',
		        scrollX:        true,
		        scrollCollapse: true,
		        paging:         false,
		        fixedColumns:   {
		            leftColumns: 4
		        }
		    } );
			$("#example tbody tr td").css("padding","0px");
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}
function createStatusHtml(isMove, isFirst, isMiddle, isEmpty, nWidth)
{
	if(isMove){
		return '<td class="bg-grey-darker text-center" style="width:'+nWidth+'px;">반이동</td>';
	}
	if(isFirst){
		return '<td class="bg-grey-darker text-center" style="width:'+nWidth+'px;">중간등록</td>';
	}
	if(isMiddle){
		return '<td class="bg-grey-darker text-center" style="width:'+nWidth+'px;">중간등록</td>';
	}
	if(isEmpty){
		return '<td class="bg-grey-darker text-center" style="width:'+nWidth+'px;">미발송</td>';
	}
}