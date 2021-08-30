/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	search_semester();
	form_init();
	
});

function form_init()
{
	var t_section = $("#section").val();
	var t_practice_type = $("#practice_type").val();
	var v_today = cfmGetToDate();
	var v_course_date = $("#course_date").val();
	var v_schedule = $("#course_schedule").val();
	
	var arr_schedule = v_schedule.split(",");
	var course_first_date = arr_schedule[0];
	
	$.ajax({
		type : "POST",
		url : "/enrollment/getAchievePracticeList.do",
		data:{
			course_id : $("#course_id").val(),
			section : t_section,
			practice_type:t_practice_type
		},
		success:function(data){
			var v_date = $("#search_course_date").val();
			//상단화면을 그려준다.
			create_top_menu(data.sectionList, data.practiceAllList,  t_section, t_practice_type, $("#course_id").val(), data.courseInfo.student_type);
			
			
			var enrollmentList = data.enrollmentList;
			
			var courseInfo = data.courseInfo;
			
			var classCountList = data.classCountList;
			
			var sectionList = data.sectionList;
			
			var practiceList = data.practiceList;

			var scheduleList = exam_type[t_practice_type];
			
			var attendList = data.attendList;
			var resultList = data.resultList;
			var classCountList = data.classCountList;
			
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
			for(var i=0; i<scheduleList.length; i++)
			{
				vHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">'+scheduleList[i]+'</th>';
				column_length++;
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
				for(var j=0; j<scheduleList.length; j++)
				{
					if(enrollmentList[i].class_gubun == "반이동"||enrollmentList[i].class_gubun == "환불"){
						vHtml += '			<td class="text-center" style="width:'+nWidth+'px;">&nbsp;</td>';
					}else{
						var a_section       = $("#section").val();
						var a_practice_type = $("#practice_type").val();
						var a_passage       = scheduleList[j];
						
						var t_idx1 = resultList.findIndex(t => t.section == a_section 
									&& t.practice_type == a_practice_type
									&& t.course_enrollment_id == course_enrollment_id
									&& t.passage == a_passage
									&& t.pass_result == true); 
						
						var t_idx2 = resultList.findIndex(t => t.section == a_section 
									&& t.practice_type == a_practice_type
									&& t.course_enrollment_id == course_enrollment_id
									&& t.passage == a_passage
									&& t.pass_result == false);
						if(t_idx1 >=0){
							var score = "O";
							vHtml += '<td class="click_practice bg-green text-center" style="width:'+nWidth+'px;cursor:pointer;">';
							vHtml += '<input type="hidden" id="section" value="'+a_section+'">';
							vHtml += '<input type="hidden" id="practice_type" value="'+a_practice_type+'">';
							vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
							vHtml += '<input type="hidden" id="passage" value="'+a_passage+'">';
							vHtml += score;
							vHtml += '</td>';
						}else{
							if(t_idx2 >=0){
								var class_bg = "bg-red";
								/*
								if(resultList[t_idx2].user_pass_result){
									class_bg = "bg-blue";
								}
								*/
								var score1 = resultList[t_idx2].score;
								var score = "X";
								vHtml += '<td class="click_practice '+class_bg+' text-center" style="width:'+nWidth+'px;cursor:pointer;">';
								vHtml += '<input type="hidden" id="section" value="'+a_section+'">';
								vHtml += '<input type="hidden" id="practice_type" value="'+a_practice_type+'">';
								vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
								vHtml += '<input type="hidden" id="passage" value="'+a_passage+'">';
								vHtml += score;
								vHtml += '</td>';
							}else{
								vHtml += '<td class="click_practice text-center" style="width:'+nWidth+'px;cursor:pointer;">';
								vHtml += '<input type="hidden" id="section" value="'+a_section+'">';
								vHtml += '<input type="hidden" id="practice_type" value="'+a_practice_type+'">';
								vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
								vHtml += '<input type="hidden" id="passage" value="'+a_passage+'">';
								vHtml += '&nbsp;';
								vHtml += '</td>';
							}
						}
					}
				}
				vHtml += '		</tr>';
			}
			vHtml += '</tbody>';	
			vHtml += '</table>';			
			$("#table_info").html(vHtml);
			
			
			$(".click_practice").click(function(e){
				var v_section = $(this).find("#section").val();	
				var v_practice_type = $(this).find("#practice_type").val();
				var v_course_enrollment_id = $(this).find("#course_enrollment_id").val();
				var v_book = $(this).find("#book").val();
				var v_volume = $(this).find("#volume").val();
				var v_group = $(this).find("#group").val();
				var v_article = $(this).find("#article").val();
				move_result(v_section, v_practice_type,v_course_enrollment_id, v_date, "", v_volume, v_group, v_article, 0);
			});
			
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