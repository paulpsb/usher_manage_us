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

			scheduleVocaList = data.scheduleVocaList;
			scheduleList = data.scheduleList;
			
			attendList = data.attendList;
			speechList = data.speechList;
			resultList = data.resultList;
			classCountList = data.classCountList;
			
			var nWidth = 100;
			
			var vHtml = "";
			vHtml += '<table id="example"  class="table table-bordered table-td-valign-middle m-b-0">';
			vHtml += '	<thead>';
			vHtml += '		<tr>';
			vHtml += '			<th class="text-center table-info" rowspan="2" style="width:40px;">상태</th>';
			vHtml += '			<th class="text-center table-info" rowspan="2" style="width:40px;">번호</th>';
			vHtml += '			<th class="text-center table-info" rowspan="2" style="width:80px;">이름</th>';
			vHtml += '			<th class="text-center table-info" rowspan="2" style="width:80px;">기존/신규</th>';
			var column_length = 3;
			var dHtml = "";
			//var pHtml = "";
			var aHtml = "";
			for(var i=arr_schedule.length-1; i>=0; i--)
			{
				var v_date = arr_schedule[i];
				if(v_today < v_date) continue;
				
				var nDayCount = 0;
				
				var dayOfWeek = new Date(arr_schedule[i]).getDay();
				var v_head_class = "table-info";
				var dayOfWeek = new Date($("#search_course_date").val()).getDay();
				if(dayOfWeek == 1) v_head_class = "table-success";
				
				var a_practice_type_list = practiceList.filter(function(item, index){
					if(item.section == t_section && item.practice_type == t_practice_type && item.date == v_date){
						return true;
					}
				});
				if(a_practice_type_list.length == 0) continue;
				for(var k=0; k<a_practice_type_list.length; k++)
				{
					var v_practice_type = a_practice_type_list[k].practice_type;
					var v_practice_name = a_practice_type_list[k].practice_name;
					var v_paragraph_use = a_practice_type_list[k].paragraph_use;
					var a_schedule_list = scheduleList.filter(function(item, index){
						if(item.section == t_section && item.practice_type == v_practice_type  && item.date == v_date){
							return true;
						}
					});
					
					if(a_schedule_list.length > 0){
						var nScheduleCount = a_schedule_list.length;
						nDayCount += nScheduleCount;
						//pHtml += '			<th class="text-center '+v_head_class+'" colspan="'+nScheduleCount+'" style="width:'+(nWidth*nScheduleCount)+'px;">'+v_practice_name+'</th>';
						
						for(var a=0; a<nScheduleCount; a++)
						{
							var v_title = '';
							v_title += a_schedule_list[a].book;
							
							if(a_schedule_list[a].volume){
								v_title += ' '+a_schedule_list[a].volume;
							}
							
							if(a_schedule_list[a].group){
								v_title += ' '+a_schedule_list[a].group;
							}
						
							if(a_schedule_list[a].article){
								v_title += ' '+a_schedule_list[a].article;
							}
							if(a_schedule_list[a].end_paragraph > 0 && v_paragraph_use == "Y"){
								v_title += ' '+a_schedule_list[a].end_paragraph+'문단';
							}
							
							aHtml += '			<th class="text-center '+v_head_class+'" style="width:'+nWidth+'px;">'+v_title+'</th>';
							column_length++;
							
						}
						
					}else{
						nDayCount++;
						column_length++;
						//pHtml += '			<th class="text-center '+v_head_class+'" style="width:'+nWidth+'px;">'+v_practice_name+'</th>';
						aHtml += '			<th class="text-center '+v_head_class+'" style="width:'+nWidth+'px;">&nbsp;</th>';
					}
				}
				
				dHtml += '			<th class="text-center '+v_head_class+'" colspan="'+nDayCount+'" style="width:'+(nWidth*nDayCount)+'px;">'+v_date+'</th>';
			}
			vHtml += dHtml;
			vHtml += '		</tr>';
			//vHtml += '		<tr>';
			//vHtml += pHtml;
			//vHtml += '		</tr>';
			vHtml += '		<tr>';
			vHtml += aHtml;
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
					
					var a_practice_type_list = practiceList.filter(function(item, index){
						if(item.section == t_section && item.practice_type == t_practice_type && item.date == v_date){
							return true;
						}
					});
					
					if(a_practice_type_list.length == 0) continue;
					for(var k=0; k<a_practice_type_list.length; k++)
					{
						var v_practice_type = a_practice_type_list[k].practice_type;
						var v_practice_name = a_practice_type_list[k].practice_name;
						var v_paragraph_use = a_practice_type_list[k].paragraph_use;
						var v_program_use   = a_practice_type_list[k].program_use;
						var a_schedule_list = scheduleList.filter(function(item, index){
							if(item.section == t_section && item.practice_type == v_practice_type  && item.date == v_date){
								return true;
							}
						});
						
						if(a_schedule_list.length > 0){
							for(var a=0; a<a_schedule_list.length; a++)
							{
								if(isPaid){
									var a_section = a_schedule_list[a].section;
									var v_practice_type = a_schedule_list[a].practice_type;
									var v_book = a_schedule_list[a].book;
									var v_volume = a_schedule_list[a].volume;
									var v_group = a_schedule_list[a].group;
									var v_article = a_schedule_list[a].article;
									var v_end_paragraph = a_schedule_list[a].end_paragraph;
									
									var objPractice = Object();
									objPractice.section = a_section;
									objPractice.practice_type = v_practice_type;
									objPractice.book = v_book;
									objPractice.volume = v_volume;
									objPractice.group = v_group;
									objPractice.article = v_article;
									objPractice.end_paragraph = v_end_paragraph;
									objPractice.date = v_date;
									
									var r_idx1;
									var r_idx2;
									
									if(v_paragraph_use == "Y"){
										r_idx1 = resultList.findIndex(t => t.section == a_section 
												&& t.practice_type == v_practice_type
												&& t.date == v_date
												&& t.course_enrollment_id == course_enrollment_id
												&& t.book == v_book
												&& t.volume == v_volume
												&& t.group == v_group
												&& t.article == v_article
												&& t.paragraph == v_end_paragraph
												&& t.pass_result == true); 
										r_idx2 = resultList.findIndex(t => t.section == a_section 
												&& t.practice_type == v_practice_type
												&& t.date == v_date
												&& t.course_enrollment_id == course_enrollment_id
												&& t.book == v_book
												&& t.volume == v_volume
												&& t.group == v_group
												&& t.article == v_article
												&& t.paragraph == v_end_paragraph
												&& t.pass_result == false); 
									}else{
										r_idx1 = resultList.findIndex(t => t.section == a_section 
												&& t.practice_type == v_practice_type
												&& t.date == v_date
												&& t.course_enrollment_id == course_enrollment_id
												&& t.book == v_book
												&& t.volume == v_volume
												&& t.group == v_group
												&& t.article == v_article
												&& t.pass_result == true); 
										r_idx2 = resultList.findIndex(t => t.section == a_section 
												&& t.practice_type == v_practice_type
												&& t.date == v_date
												&& t.course_enrollment_id == course_enrollment_id
												&& t.book == v_book
												&& t.volume == v_volume
												&& t.group == v_group
												&& t.article == v_article
												&& t.pass_result == false); 
									}
									
									if(r_idx1 >=0){
										var class_bg = "bg-green";
										var score;
										if(v_program_use == "Y"){
											if(t_section== "GRAMMAR" && v_practice_type == "MOCK_TEST"){
												var score1 = cfmLpad(resultList[r_idx1].score1+"",3," ");
												var score2 = cfmLpad(resultList[r_idx1].score2+"",3," ");
												var total_score1 = resultList[r_idx1].total_score1;
												var total_score2 = resultList[r_idx1].total_score2;
												score = "SW1:"+ score1+"/"+total_score1+" SW2:"+score2+"/"+total_score2;
											}else if(v_practice_type == "TENTIMES"){
												var score  = cfmLpad(resultList[r_idx1].score+"",3," ");
												var score1 = cfmLpad(resultList[r_idx1].score1+"",3," ");
												var score2 = cfmLpad(resultList[r_idx1].score2+"",3," ");
												var total_score1 = resultList[r_idx1].total_score1;
												var total_score2 = resultList[r_idx1].total_score2;
												score = score1+"회/"+total_score1+"회"+score+"%";
												
											}else{
												var score1 = cfmLpad(resultList[r_idx1].score+"",3," ");
												var total_score1 = resultList[r_idx1].total_score;
												score = score1+"/"+total_score1;
											}
										}else{
											score = "O";
										}
										if(resultList[r_idx1].out_pass_result){
											class_bg = "bg-yellow";
											score += '('+resultList[r_idx1].timem+')';
										}
										
										vHtml += '<td class="click_practice '+class_bg+' text-center" style="width:'+nWidth+'px;cursor:pointer;">';
										vHtml += '<input type="hidden" id="section" value="'+t_section+'">';
										vHtml += '<input type="hidden" id="practice_type" value="'+v_practice_type+'">';
										vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
										vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
										vHtml += '<input type="hidden" id="book" value="'+v_book+'">';
										vHtml += '<input type="hidden" id="volume" value="'+v_volume+'">';
										vHtml += '<input type="hidden" id="group" value="'+v_group+'">';
										vHtml += '<input type="hidden" id="article" value="'+v_article+'">';
										vHtml += '<input type="hidden" id="end_paragraph" value="'+v_end_paragraph+'">';
										vHtml += score;
										vHtml += '</td>';
										
									}else{
										if(r_idx2 >=0){
											var score;
											if(v_program_use == "Y"){
												if(t_section== "GRAMMAR" && v_practice_type == "MOCK_TEST"){
													var score1 = cfmLpad(resultList[r_idx2].score1+"",3," ");
													var score2 = cfmLpad(resultList[r_idx2].score2+"",3," ");
													var total_score1 = resultList[r_idx2].total_score1;
													var total_score2 = resultList[r_idx2].total_score2;
													score = "SW1:"+ score1+"/"+total_score1+" SW2:"+score2+"/"+total_score2;
												}else if(v_practice_type == "TENTIMES"){
													var score  = cfmLpad(resultList[r_idx2].score+"",3," ");
													var score1 = cfmLpad(resultList[r_idx2].score1+"",3," ");
													var score2 = cfmLpad(resultList[r_idx2].score2+"",3," ");
													var total_score1 = resultList[r_idx2].total_score1;
													var total_score2 = resultList[r_idx2].total_score2;
													score = score1+"회/"+total_score1+"회"+score+"%";
													
												}else{
													var score1 = cfmLpad(resultList[r_idx2].score+"",3," ");
													var total_score1 = resultList[r_idx2].total_score;
													score = score1+"/"+total_score1;
												}
											}else{
												score = "X";
											}
											var class_bg = "bg-red";
											if(resultList[r_idx2].user_pass_result){
												class_bg = "bg-blue";
												if(resultList[r_idx2].out_pass_result){
													class_bg = "bg-yellow";
													score += '('+resultList[r_idx2].timem+')';
												}
											}
											vHtml += '<td class="click_practice '+class_bg+' text-center" style="width:'+nWidth+'px;cursor:pointer;">';
											vHtml += '<input type="hidden" id="section" value="'+t_section+'">';
											vHtml += '<input type="hidden" id="practice_type" value="'+v_practice_type+'">';
											vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
											vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
											vHtml += '<input type="hidden" id="book" value="'+v_book+'">';
											vHtml += '<input type="hidden" id="volume" value="'+v_volume+'">';
											vHtml += '<input type="hidden" id="group" value="'+v_group+'">';
											vHtml += '<input type="hidden" id="article" value="'+v_article+'">';
											vHtml += '<input type="hidden" id="end_paragraph" value="'+v_end_paragraph+'">';
											vHtml += score;
											vHtml += '</td>';
										}else{
											vHtml += createAttendance(course_enrollment_id, attendList, v_date, first_date, objPractice);
										}
									}
								}else{
									vHtml += createStatusHtml(isMove, isFirst, isMiddle, isEmpty, nWidth);
								}
							}
						}else{
							if(isPaid){
								vHtml += '			<td class="bg-grey-darker text-center" style="width:'+nWidth+'px;">미시행</td>';
							}else{
								vHtml += createStatusHtml(isMove, isFirst, isMiddle, isEmpty, nWidth);
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
				var v_date = $(this).find("#date").val();
				var v_book = $(this).find("#book").val();
				var v_volume = $(this).find("#volume").val();
				var v_group = $(this).find("#group").val();
				var v_article = $(this).find("#article").val();
				var v_end_paragraph = $(this).find("#end_paragraph").val();
				move_result(v_section, v_practice_type,v_course_enrollment_id, v_date, v_book, v_volume, v_group, v_article, v_end_paragraph);
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
		return '<td class="text-center" style="width:'+nWidth+'px;"></td>';
	}
}

function createAttendance(course_enrollment_id, attendList, v_date, first_date, objPractice)
{
	var vHtml= "";
	var t_idx = attendList.findIndex(t => t.date == v_date && t.course_enrollment_id == course_enrollment_id); 
	if(t_idx >= 0){
		var v_status = attendList[t_idx].status;
		if(v_status == "REGULAR_ATTENDED")
		{
			//vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">미시행</td>';
			vHtml += '<td class="click_practice bg-grey-darker text-center" style="width:100px;cursor:pointer;">';
			vHtml += '<input type="hidden" id="section" value="'+objPractice.section+'">';
			vHtml += '<input type="hidden" id="practice_type" value="'+objPractice.practice_type+'">';
			vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
			vHtml += '<input type="hidden" id="date" value="'+objPractice.date+'">';
			vHtml += '<input type="hidden" id="book" value="'+objPractice.book+'">';
			vHtml += '<input type="hidden" id="volume" value="'+objPractice.volume+'">';
			vHtml += '<input type="hidden" id="group" value="'+objPractice.group+'">';
			vHtml += '<input type="hidden" id="article" value="'+objPractice.article+'">';
			vHtml += '<input type="hidden" id="end_paragraph" value="'+objPractice.end_paragraph+'">';
			vHtml += '미시행';
			vHtml += '</td>';
		}else{
			if(v_date == first_date)
			{
				vHtml += '			<td class="show_attend bg-grey-darker text-center" style="width:100px;">OT진행</td>';
			}else{
				if(v_status == "UNPERMITTED_LATE" || v_status == "PERMITTED_LATE"){
					//vHtml += '			<td class="show_attend bg-grey-darker text-center" style="width:100px;">지각('+attendList[t_idx].timem+')</td>';
					vHtml += '<td class="click_practice bg-grey-darker text-center" style="width:100px;cursor:pointer;">';
					vHtml += '<input type="hidden" id="section" value="'+objPractice.section+'">';
					vHtml += '<input type="hidden" id="practice_type" value="'+objPractice.practice_type+'">';
					vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
					vHtml += '<input type="hidden" id="date" value="'+objPractice.date+'">';
					vHtml += '<input type="hidden" id="book" value="'+objPractice.book+'">';
					vHtml += '<input type="hidden" id="volume" value="'+objPractice.volume+'">';
					vHtml += '<input type="hidden" id="group" value="'+objPractice.group+'">';
					vHtml += '<input type="hidden" id="article" value="'+objPractice.article+'">';
					vHtml += '<input type="hidden" id="end_paragraph" value="'+objPractice.end_paragraph+'">';
					vHtml += '지각('+attendList[t_idx].timem+')';
					vHtml += '</td>';
				}else{
					if(attendList[t_idx].attendance_reason_type){
						vHtml += '			<td class="show_attend bg-grey-darker text-center" style="width:100px;">일반결석</td>';
					}else{
						vHtml += '			<td class="show_attend bg-grey-darker text-center" style="width:100px;">무단결석</td>';
					}
				}
			}
		} 
	}
	
	return vHtml;
}