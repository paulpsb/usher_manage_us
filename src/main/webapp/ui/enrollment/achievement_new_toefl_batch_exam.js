/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	search_semester();
	form_init();
});

function form_init()
{
	var v_schedule = $("#course_schedule").val();
	
	var arr_schedule = v_schedule.split(",");
	var course_first_date = arr_schedule[0];
	
	$.ajax({
		type : "POST",
		url : "/enrollment/getAchieveToeflExamBatchList.do",
		data:{
			course_id : $("#course_id").val()
		},
		success:function(data){
			//상단화면을 그려준다.
			create_top_menu(data.sectionList, data.practiceAllList, "exam", "toefl_batch_exam", $("#course_id").val(), data.courseInfo.student_type);
			
			var enrollmentList = data.enrollmentList;
			var courseInfo = data.courseInfo;
			var classCountList = data.classCountList;
			
			var semesterInfo = data.semesterInfo;
			
			var nWidth = 60;
			var vHtml = "";
			vHtml += '<table id="example"  class="table table-bordered table-td-valign-middle m-b-0">';
			vHtml += '	<thead>';
			vHtml += '		<tr>';
			vHtml += '			<th class="text-center table-info" rowspan="2" style="width:60px;">상태</th>';
			vHtml += '			<th class="text-center table-info" rowspan="2" style="width:60px;">번호</th>';
			vHtml += '			<th class="text-center table-info" rowspan="2" style="width:100px;">이름</th>';
			vHtml += '			<th class="text-center table-info" rowspan="2" style="width:80px;">기존/신규</th>';
			vHtml += '			<th class="text-center table-info" colspan="5" style="width:'+(nWidth*5)+'px;">'+semesterInfo.date+' 배치고사 성적</th>';
			vHtml += '			<th class="text-center table-info" colspan="5" style="width:'+(nWidth*5)+'px;">'+semesterInfo.pre_date1+' 배치고사 성적</th>';
			vHtml += '			<th class="text-center table-info" colspan="5" style="width:'+(nWidth*5)+'px;">'+semesterInfo.pre_date2+' 배치고사 성적</th>';
			vHtml += '			<th class="text-center table-info" colspan="5" style="width:'+(nWidth*5)+'px;">'+semesterInfo.pre_date3+' 배치고사 성적</th>';
			vHtml += '			<th class="text-center table-info" colspan="5" style="width:'+(nWidth*5)+'px;">'+semesterInfo.pre_date4+' 배치고사 성적</th>';
			vHtml += '			<th class="text-center table-info" colspan="5" style="width:'+(nWidth*5)+'px;">'+semesterInfo.pre_date5+' 배치고사 성적</th>';
			vHtml += '		</tr>';
			vHtml += '		<tr>';
			vHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">SW1</th>';
			vHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">SW2</th>';
			vHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">SW1+SW2</th>';
			vHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">RC</th>';
			vHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">LC</th>';
			vHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">SW1</th>';
			vHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">SW2</th>';
			vHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">SW1+SW2</th>';
			vHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">RC</th>';
			vHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">LC</th>';
			vHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">SW1</th>';
			vHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">SW2</th>';
			vHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">SW1+SW2</th>';
			vHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">RC</th>';
			vHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">LC</th>';
			vHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">SW1</th>';
			vHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">SW2</th>';
			vHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">SW1+SW2</th>';
			vHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">RC</th>';
			vHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">LC</th>';
			vHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">SW1</th>';
			vHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">SW2</th>';
			vHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">SW1+SW2</th>';
			vHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">RC</th>';
			vHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">LC</th>';
			vHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">SW1</th>';
			vHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">SW2</th>';
			vHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">SW1+SW2</th>';
			vHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">RC</th>';
			vHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">LC</th>';
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
				
				vHtml += '		<tr>';
				vHtml += create_student_info(enrollmentList[i], courseInfo, classCountList);
				
				var v_user_id = enrollmentList[i].user_id;
				
				for(var j=0; j<6; j++)
				{
					var batchList;
					if(j == 0){
						batchList = data.batchList;
					}else if(j == 1){
						batchList = data.batchList1;
					}else if(j == 2){
						batchList = data.batchList2;
					}else if(j == 3){
						batchList = data.batchList3;
					}else if(j == 4){
						batchList = data.batchList4;
					}else if(j == 5){
						batchList = data.batchList5;
					}
					var t_idx = batchList.findIndex(t => t.user_id == v_user_id);
					if(t_idx >= 0)
					{
						var class_bg = "";
						var score = batchList[t_idx].batch_grammar_score1;
						var score_prev = batchList[t_idx].batch_grammar_score1_prev;
						if(score > 0 && score_prev > 0){
							if(score > score_prev){
								class_bg = "bg-green";
							}else if(score < score_prev){
								class_bg = "bg-red";
							}else{
								class_bg = "bg-yellow";
							}
							vHtml += '			<td class="'+class_bg+' text-center" style="width:'+nWidth+'px;">'+score+'</td>';
						}else{
							if(score > 0)
							{
								vHtml += '			<td class="text-center" style="width:'+nWidth+'px;">'+score+'</td>';
							}else{
								vHtml += '			<td class="bg-grey-darker text-center" style="width:'+nWidth+'px;">미시행</td>';
							}
						}
						
						class_bg = "";
						score = batchList[t_idx].batch_grammar_score2;
						score_prev = batchList[t_idx].batch_grammar_score2_prev;
						if(score > 0 && score_prev > 0){
							if(score > score_prev){
								class_bg = "bg-green";
							}else if(score < score_prev){
								class_bg = "bg-red";
							}else{
								class_bg = "bg-yellow";
							}
							vHtml += '			<td class="'+class_bg+' text-center" style="width:'+nWidth+'px;">'+score+'</td>';
						}else{
							if(score > 0)
							{
								vHtml += '			<td class="text-center" style="width:'+nWidth+'px;">'+score+'</td>';
							}else{
								vHtml += '			<td class="bg-grey-darker text-center" style="width:'+nWidth+'px;">미시행</td>';
							}
						}
						
						class_bg = "";
						score = batchList[t_idx].batch_grammar_score1 + batchList[t_idx].batch_grammar_score2;
						score_prev = batchList[t_idx].batch_grammar_score1_prev + batchList[t_idx].batch_grammar_score2_prev;
						if(score > 0 && score_prev > 0){
							if(score > score_prev){
								class_bg = "bg-green";
							}else if(score < score_prev){
								class_bg = "bg-red";
							}else{
								class_bg = "bg-yellow";
							}
							vHtml += '			<td class="'+class_bg+' text-center" style="width:'+nWidth+'px;">'+score+'</td>';
						}else{
							if(score > 0)
							{
								vHtml += '			<td class="text-center" style="width:'+nWidth+'px;">'+score+'</td>';
							}else{
								vHtml += '			<td class="bg-grey-darker text-center" style="width:'+nWidth+'px;">미시행</td>';
							}
						}
						
						class_bg = "";
						score = batchList[t_idx].batch_reading_score;
						score_prev = batchList[t_idx].batch_reading_score_prev;
						if(score > 0 && score_prev > 0){
							if(score > score_prev){
								class_bg = "bg-green";
							}else if(score < score_prev){
								class_bg = "bg-red";
							}else{
								class_bg = "bg-yellow";
							}
							vHtml += '			<td class="'+class_bg+' text-center" style="width:'+nWidth+'px;">'+score+'</td>';
						}else{
							if(score > 0)
							{
								vHtml += '			<td class="text-center" style="width:'+nWidth+'px;">'+score+'</td>';
							}else{
								vHtml += '			<td class="bg-grey-darker text-center" style="width:'+nWidth+'px;">미시행</td>';
							}
						}
						
						class_bg = "";
						score = batchList[t_idx].batch_listening_score;
						score_prev = batchList[t_idx].batch_listening_score_prev;
						if(score > 0 && score_prev > 0){
							if(score > score_prev){
								class_bg = "bg-green";
							}else if(score < score_prev){
								class_bg = "bg-red";
							}else{
								class_bg = "bg-yellow";
							}
							vHtml += '			<td class="'+class_bg+' text-center" style="width:'+nWidth+'px;">'+score+'</td>';
						}else{
							if(score > 0)
							{
								vHtml += '			<td class="text-center" style="width:'+nWidth+'px;">'+score+'</td>';
							}else{
								vHtml += '			<td class="bg-grey-darker text-center" style="width:'+nWidth+'px;">미시행</td>';
							}
						}
						
					}else{
						vHtml += '			<td class="bg-grey-darker text-center" style="width:'+nWidth+'px;">미시행</td>';
						vHtml += '			<td class="bg-grey-darker text-center" style="width:'+nWidth+'px;">미시행</td>';
						vHtml += '			<td class="bg-grey-darker text-center" style="width:'+nWidth+'px;">미시행</td>';
						vHtml += '			<td class="bg-grey-darker text-center" style="width:'+nWidth+'px;">미시행</td>';
						vHtml += '			<td class="bg-grey-darker text-center" style="width:'+nWidth+'px;">미시행</td>';
					}
				}
				vHtml += '		</tr>';
			}
			vHtml += '	</tbody>';
			vHtml += '</table>';
			$("#table_info").html(vHtml);
			
			var column_length = 30 + 4;
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
