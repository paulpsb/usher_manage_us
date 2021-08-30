var courseGroupInfo;
var enrollmentList;
var classCountList;
var resultList;

var junior_regular_class_list = [
	[10, 15],
	[20, 30],
	[36, 48],
	[36, 48],
	[36, 48]
]

var junior_special_class_list = [
	[10, 15],
	[15, 30],
	[15, 30],
	[15, 30],
	[15, 30]
]

var senior_regular_class_list = [
	[1, 2],
	[1, 2],
	[1, 2],
	[1, 2],
	[1, 2]
]

/*
 * 설명 : 화면이 로딩후 
 */
jQuery(document).ready(function(){
	
	$('#search_semester_id').change(function(e){
		search_course_group();
	});
	
	$('#search_test_type').change(function(e){
		search_course_group();
	});
	
	$('#search_course_group_id').change(function(e){
		search_form();
	});
	
    search_semester();
});


/*
 * 설명 : 년/월 조회
 */
function search_semester()
{
	var to_month = cfmGetToMonth();
	
	$.ajax({
		type : "POST",
		url : "/common/getSemesterList.do",
		data:{
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				var selected = "";
				if(to_month == data[i].date) selected = "selected";
				vHtml += "<option value='"+data[i].id+"' "+selected+">"+data[i].date+"</option>";
			}
			
			$("#search_semester_id").html(vHtml);

			
			search_course_group();

		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

/*
 * 설명 : 반 그룹 조회
 */
function search_course_group()
{
	$.ajax({
		type : "POST",
		url : "/common/getCoursegroupList.do",
		data:{
			semester_id:$("#search_semester_id").val(),
			test_type:$("#search_test_type").val()
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				vHtml += "<option value='"+data[i].id+"'>"+data[i].name+"</option>";
			}
			
			$("#search_course_group_id").html(vHtml);
			
			search_form();

		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

function search_form()
{
	$("#chart_01_title").html("차트");
	$("#chart_02_title").html("차트");
	
	$("#div_chart_01").html('<canvas id="chart_01" height="300" style="width:100%"></canvas>');
	$("#div_chart_02").html('<canvas id="chart_02" height="300" style="width:100%"></canvas>');

	
	$.ajax({
		type : "POST",
		url : "/enrollment/getAchieveVocaAsDataList.do",
		data:{
			id:$("#search_course_group_id").val()
		},
		success:function(data){
			courseGroupInfo = data.courseGroupInfo;
			enrollmentList = data.enrollmentList;
			classCountList = data.classCountList;
			resultList = data.resultList;
			
			var v_today = cfmGetToDate();
			var v_schedule = courseGroupInfo.schedule;
			
			var arr_schedule = v_schedule.split(",");
			
			var nWidth = 100;
			
			var vHtml = "";
			vHtml += '<table id="example"  class="table table-bordered table-td-valign-middle m-b-0">';
			vHtml += '	<thead>';
			vHtml += '		<tr>';
			vHtml += '			<th class="text-center table-info" style="width:0px;display:none;">course_difficulty</th>';
			vHtml += '			<th class="text-center table-info" style="width:40px;">반</th>';
			vHtml += '			<th class="text-center table-info" style="width:40px;">번호</th>';
			vHtml += '			<th class="text-center table-info" style="width:80px;">이름</th>';
			vHtml += '			<th class="text-center table-info" style="width:80px;">기존/신규</th>';
			vHtml += '			<th class="text-center table-info" style="width:60px;">차트</th>';
			var column_length = 5;
			for(var i=arr_schedule.length-1; i>=0; i--)
			{
				var v_date = arr_schedule[i];
				if(v_today < v_date) continue;
				
				var dayOfWeek = new Date(arr_schedule[i]).getDay();
				if(dayOfWeek == 1){
					vHtml += '			<th class="text-center table-success" style="width:'+nWidth+'px;">'+arr_schedule[i]+'</th>';
				}else{
					vHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">'+arr_schedule[i]+'</th>';
				}
				column_length++;
			}
			vHtml += '		</tr>';
			vHtml += '	</thead>';
			vHtml += '	<tbody>';
			
			var student_type = courseGroupInfo.student_type; 
			var lecture_type = courseGroupInfo.lecture_type; 
			var vStudentType = courseGroupInfo.student_type;
			var nSeq = 0;
			for(var i=0; i<enrollmentList.length; i++)
			{
				nSeq++;
				var enrollmentInfo = enrollmentList[i];
				
				var course_enrollment_id = enrollmentInfo.course_enrollment_id;
				var student_id = enrollmentInfo.student_id;
				
				var difficulty = enrollmentInfo.course_difficulty; 
				var nClassH = 0;
				var nClassM = 0;
				if(student_type == "SENIOR"){
					nClassH = senior_regular_class_list[difficulty-1][1];
					nClassM = senior_regular_class_list[difficulty-1][0];
				}else{
					if(lecture_type == "SPECIAL"){
						nClassH = junior_special_class_list[difficulty-1][1];
						nClassM = junior_special_class_list[difficulty-1][0];
					}else{
						nClassH = junior_regular_class_list[difficulty-1][1];
						nClassM = junior_regular_class_list[difficulty-1][0];
					}
				}
				
				var c_idx = classCountList.findIndex(t => t.student_id == student_id && t.student_type == student_type && t.difficulty == difficulty);
				
				var class_count = 0;
				
				if(c_idx >=0 ){
					class_count = classCountList[c_idx].class_count;	
				}
				
				var class_list = classCountList.filter(function(item, index){
					if(item.student_id == student_id && item.student_type == student_type){
						return true;
					}
				});
				
				var all_class_count = 0;
				for(var k=0; k<class_list.length; k++)
				{
					all_class_count += class_list[k].class_count;
				}
				var class_clazz = "";
				
				if(class_count > nClassH){
					class_clazz = "bg-red text-white";
				}else if(class_count > nClassM){
					class_clazz = "bg-yellow";
				}
				
				var sReg = "신규";
				if(enrollmentInfo.registration_type != "NEW"){
					sReg = "기존";
				}
				
				var sUserNm = enrollmentInfo.last_name+enrollmentInfo.first_name;
				if(enrollmentInfo.chamgang_yn == "Y"){
					sUserNm += "(참강)";
				}
				
				var vClassType = enrollmentInfo.class_gubun;
				if(vClassType != vStudentType){
					vStudentType = vClassType;
					vSeq = 1;
				}
				if(vClassType=="반이동"){
					class_clazz = 'bg-black-transparent-3';
				}
				if(vClassType=="환불"){
					class_clazz = 'bg-black-transparent-5';
				}
				
				vHtml += '		<tr>';
				vHtml += '			<td class="text-center '+class_clazz+'" style="width:0px;display:none;">'+enrollmentInfo.course_difficulty+'</td>';
				vHtml += '			<td class="text-center '+class_clazz+'" style="width:40px;">'+enrollmentInfo.course_name+'</td>';
				vHtml += '			<td class="text-center '+class_clazz+'" style="width:40px;">'+nSeq+'</td>';
				vHtml += '			<td class="text-center '+class_clazz+'" style="width:80px;"><a href="javascript:student_login(\''+enrollmentInfo.username+'\','+enrollmentInfo.course_enrollment_id+')">'+sUserNm+'</a></td>';
				vHtml += '			<td class="text-center '+class_clazz+'" style="width:80px;">'+cfmLpad(class_count+"",3," ")+'회 / '+cfmLpad(all_class_count+"",3," ")+'회('+sReg+')</td>';
				vHtml += '			<td class="text-center '+class_clazz+'" style="width:60px;">';
				vHtml += '				<button type="button" class="btn btn-primary btn-xs" style="margin-right:5px;" onclick="go_chart('+course_enrollment_id+',\''+sUserNm+'\','+enrollmentList[i].course_id+',\''+enrollmentInfo.course_name+'\')">차트보기</button>';
				vHtml += '			</td>';
				
				for(var j=arr_schedule.length-1; j>=0; j--)
				{
					var v_date = arr_schedule[j];
					if(v_today < v_date) continue; 
					
					var v_idx1 = resultList.findIndex(t => t.date == v_date && t.course_enrollment_id == course_enrollment_id && t.book=="toefl");
					var v_idx2 = resultList.findIndex(t => t.date == v_date && t.course_enrollment_id == course_enrollment_id && t.book=="basic");
					if(v_idx1 >= 0){
						//통과했을경우(토플)
						if(resultList[v_idx1].pass_result){
							if(resultList[v_idx1].out_pass_result){
								vHtml += '<td class="click_practice bg-yellow text-center" style="width:100px;cursor:pointer;">';
								vHtml += '<input type="hidden" id="section" value="VOCA">';
								vHtml += '<input type="hidden" id="practice_type" value="VOCA">';
								vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
								vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
								vHtml += cfmLpad(resultList[v_idx1].score+"",3," ");
								vHtml += '(시간외)</td>';
							}else{
								vHtml += '<td class="click_practice bg-green text-center" style="width:100px;cursor:pointer;">';
								vHtml += '<input type="hidden" id="section" value="VOCA">';
								vHtml += '<input type="hidden" id="practice_type" value="VOCA">';
								vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
								vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
								vHtml += cfmLpad(resultList[v_idx1].score+"",3," ");
								vHtml += '</td>';
							}
						//실패(토플)
						}else{
							//성공(토플) - 자기기록
							if(resultList[v_idx1].user_pass_result){
								if(resultList[v_idx1].out_pass_result){
									vHtml += '<td class="click_practice bg-yellow text-center" style="width:100px;cursor:pointer;">';
									vHtml += '<input type="hidden" id="section" value="VOCA">';
									vHtml += '<input type="hidden" id="practice_type" value="VOCA">';
									vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
									vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
									vHtml += cfmLpad(resultList[v_idx1].score+"",3," ");
									vHtml += '(시간외)</td>';
								}else{
									vHtml += '<td class="click_practice bg-blue text-center" style="width:100px;cursor:pointer;">';
									vHtml += '<input type="hidden" id="section" value="VOCA">';
									vHtml += '<input type="hidden" id="practice_type" value="VOCA">';
									vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
									vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
									vHtml += cfmLpad(resultList[v_idx1].score+"",3," ");
									vHtml += '</td>';
								}
							//실패(토플)
							}else{
								if(v_idx2 >= 0){
									//성공(주니어)
									if(resultList[v_idx2].pass_result){
										//성공(주니어)시간외
										if(resultList[v_idx2].out_pass_result){
											vHtml += '<td class="click_practice bg-yellow text-center" style="width:100px;cursor:pointer;">';
											vHtml += '<input type="hidden" id="section" value="VOCA">';
											vHtml += '<input type="hidden" id="practice_type" value="VOCA">';
											vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
											vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
											vHtml += cfmLpad(resultList[v_idx2].score+"",3," ");
											vHtml += '(중고등-시간외)</td>';
										//성공(주니어)
										}else{
											vHtml += '<td class="click_practice bg-blue text-center" style="width:100px;cursor:pointer;">';
											vHtml += '<input type="hidden" id="section" value="VOCA">';
											vHtml += '<input type="hidden" id="practice_type" value="VOCA">';
											vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
											vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
											vHtml += cfmLpad(resultList[v_idx2].score+"",3," ");
											vHtml += '(중고등)</td>';
										}
									//실패(주니어)
									}else{
										if(resultList[v_idx2].user_pass_result){
											//성공(주니어)시간외
											if(resultList[v_idx2].out_pass_result){
												vHtml += '<td class="click_practice bg-yellow text-center" style="width:100px;cursor:pointer;">';
												vHtml += '<input type="hidden" id="section" value="VOCA">';
												vHtml += '<input type="hidden" id="practice_type" value="VOCA">';
												vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
												vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
												vHtml += cfmLpad(resultList[v_idx2].score+"",3," ");
												vHtml += '(중고등-시간외)</td>';
											}else{
												vHtml += '<td class="click_practice bg-blue text-center" style="width:100px;cursor:pointer;">';
												vHtml += '<input type="hidden" id="section" value="VOCA">';
												vHtml += '<input type="hidden" id="practice_type" value="VOCA">';
												vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
												vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
												vHtml += cfmLpad(resultList[v_idx2].score+"",3," ");
												vHtml += '(중고등)</td>';
											}
										}
									}
								}else{
									vHtml += '<td class="click_practice bg-red text-center" style="width:100px;cursor:pointer;">';
									vHtml += '<input type="hidden" id="section" value="VOCA">';
									vHtml += '<input type="hidden" id="practice_type" value="VOCA">';
									vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
									vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
									vHtml += cfmLpad(resultList[v_idx1].score+"",3," ");
									vHtml += '</td>';
								}									
							}

						}
					}else{
						if(v_idx2 >= 0){
							//성공(주니어)
							if(resultList[v_idx2].pass_result){
								//성공(주니어)시간외
								if(resultList[v_idx2].out_pass_result){
									vHtml += '<td class="click_practice bg-yellow text-center" style="width:100px;cursor:pointer;">';
									vHtml += '<input type="hidden" id="section" value="VOCA">';
									vHtml += '<input type="hidden" id="practice_type" value="VOCA">';
									vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
									vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
									vHtml += cfmLpad(resultList[v_idx2].score+"",3," ");
									vHtml += '(중고등-시간외)</td>';
								//성공(주니어)
								}else{
									vHtml += '<td class="click_practice bg-blue text-center" style="width:100px;cursor:pointer;">';
									vHtml += '<input type="hidden" id="section" value="VOCA">';
									vHtml += '<input type="hidden" id="practice_type" value="VOCA">';
									vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
									vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
									vHtml += cfmLpad(resultList[v_idx2].score+"",3," ");
									vHtml += '(중고등)</td>';
								}
							//실패(주니어)
							}else{
								if(resultList[v_idx2].user_pass_result){
									//성공(주니어)시간외
									if(resultList[v_idx2].out_pass_result){
										vHtml += '<td class="click_practice bg-yellow text-center" style="width:100px;cursor:pointer;">';
										vHtml += '<input type="hidden" id="section" value="VOCA">';
										vHtml += '<input type="hidden" id="practice_type" value="VOCA">';
										vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
										vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
										vHtml += cfmLpad(resultList[v_idx2].score+"",3," ");
										vHtml += '(중고등-시간외)</td>';
									}else{
										vHtml += '<td class="click_practice bg-blue text-center" style="width:100px;cursor:pointer;">';
										vHtml += '<input type="hidden" id="section" value="VOCA">';
										vHtml += '<input type="hidden" id="practice_type" value="VOCA">';
										vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
										vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
										vHtml += cfmLpad(resultList[v_idx2].score+"",3," ");
										vHtml += '(중고등)</td>';
									}
								}else{
									vHtml += '<td class="click_practice bg-red text-center" style="width:100px;cursor:pointer;">';
									vHtml += '<input type="hidden" id="section" value="VOCA">';
									vHtml += '<input type="hidden" id="practice_type" value="VOCA">';
									vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
									vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
									vHtml += cfmLpad(resultList[v_idx2].score+"",3," ");
									vHtml += '(중고등)</td>';
								}
							}
						}else{
							vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">미시행</td>';
						}
					}
				}
				vHtml += '		</tr>';
				if(i < enrollmentList.length-1){
					if(enrollmentList[i].course_difficulty != enrollmentList[i+1].course_difficulty || enrollmentList[i].course_inner_difficulty != enrollmentList[i+1].course_inner_difficulty){
						nSeq = 0;
					}
				}
			}
			vHtml += '	</tbody>';
			vHtml += '</table>';			
			$("#table_info").html(vHtml);
			
			$(".click_practice").click(function(e){
				var v_section = $(this).find("#section").val();	
				var v_practice_type = $(this).find("#practice_type").val();
				var v_course_enrollment_id = $(this).find("#course_enrollment_id").val();
				var v_date = $(this).find("#date").val();
				move_result(v_section, v_practice_type,v_course_enrollment_id, v_date, "", "", "", "", 0);
			});
			
			var array_column_def = Array();
			for(var i=0; i<2; i++)
			{
				var objColumn = new Object();
				objColumn.targets = i;
				objColumn.orderable = false;
				array_column_def.push(objColumn);
			}
			
			for(var i=2; i<column_length; i++)
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
		            leftColumns: 6
		        }
		    } );
			$("#example tbody tr td").css("padding","0px");
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

function move_result(section, practice_type,course_enrollment_id, date, book, volume, group, article, end_paragraph)
{
	if(!end_paragraph) end_paragraph = 0;
	//지문 화면으로 변경
	$.ajax({
		type : "POST",
		data:{
			course_id:$("#course_id").val(),
			section:section,
			practice_type:practice_type,
			course_enrollment_id:course_enrollment_id,
			date:date,
			book:book,
			volume:volume,
			group:group,
			article:article,
			end_paragraph:end_paragraph,
		},
		url : "/enrollment/getPracticeResultList.do",
		success:function(data){	
			var practiceList = data.practiceList;
			var typeList = data.typeList;
			if(practiceList.length > 0){
				if(practiceList.length == 1){
					go_result(practiceList[0].section, practiceList[0].practice_type, practiceList[0].id);
				}else{
					var vHtml = "";
					for(var i=0; i<practiceList.length; i++)
					{
						var vTitle = "[";
						vTitle += practiceList[i].book;
						if(practiceList[i].volume) vTitle += ' '+practiceList[i].volume;
						if(practiceList[i].group) vTitle += ' '+practiceList[i].group;
						if(practiceList[i].article) vTitle += ' '+practiceList[i].article;
						vTitle += "]";
						
						if(practiceList[i].section=="GRAMMAR" && practiceList[i].practice_type=="MOCK_TEST"){
							vTitle += ' SW1:'+practiceList[i].score1+'/'+practiceList[i].total_score1+', SW2:'+practiceList[i].score2+'/'+practiceList[i].total_score2;
						}else{
							vTitle += ' '+practiceList[i].score+'/'+practiceList[i].total_score;
						}
						vTitle += ' ('+practiceList[i].date+')';
						vHtml += '<li>';
						vHtml += '<a href="javascript:go_result(\''+practiceList[i].section+'\',\''+practiceList[i].practice_type+'\',\''+practiceList[i].id+'\')">';
						vHtml += vTitle;
						vHtml += '</a>';
						vHtml += '</li>';
					}
					$("#result_list").html(vHtml);
					$("#modal-result").modal();
				}
			}
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}
function go_result(section, practice_type, practice_result_id)
{
	var url;
	var exam_url = "http://exam-us.usher.co.kr/";
	if(practice_type == "VOCA"){
		url = exam_url + "/exam/voca/result.do?id="+practice_result_id;
	}else if(practice_type == "SPEECH"){
		url = exam_url + "/study/speech/result_exam.do?id="+practice_result_id;
	}else if(practice_type == "BLUEPRINT"){
		url = exam_url + "/exam/blueprint/test/result.do?id="+practice_result_id;
	}else if(practice_type == "PASSAGE_PHRASE"){
		url = exam_url + "/exam/passage/result.do?id="+practice_result_id;
	}else if(practice_type == "PASSAGE_VOCA"){
		url = exam_url + "/exam/passage/result.do?id="+practice_result_id;
	}else if(practice_type == "GRAMMAR_SYNTAX"){
		url = exam_url + "/exam/chain/test/result.do?id="+practice_result_id;
	}else if(section == "GRAMMAR" && practice_type == "MOCK_TEST"){
		url = exam_url + "/exam/grammar/test/review.do?id="+practice_result_id;
	}else if(section == "READING" && practice_type == "MOCK_TEST"){
		url = exam_url + "/exam/reading/test/review.do?id="+practice_result_id;
	}else if(section == "LISTENING" && practice_type == "MOCK_TEST"){
		url = exam_url + "/exam/listening/test/review.do?id="+practice_result_id;
	}
	
	window.open(url, "exam");
}

var s_username;
var s_course_enrollment_id;
function student_login(username, course_enrollment_id)
{
	s_username = username;
	s_course_enrollment_id = course_enrollment_id;
	$.ajax({
		type : "POST",
		url : "/common/getCourseenrollmentAttend.do",
		data:{
			course_enrollment_id:course_enrollment_id
		},
		success:function(data){
			if(data.status == "UNPERMITTED_ABSENT" || data.status == "PERMITTED_ABSENT" ){
				swal({
					title: '미출석',
					text: '이 학생은 아직 출석처리되지 않은 학생입니다.\n직원이 로그인 하게되면 학생이 출석처리가 되어버립니다.\n그래도 로그인 하시겠습니까?',
					icon: 'info',
					buttons: {
						cancel: {
							text: '아니오',
							value: null,
							visible: true,
							className: 'btn btn-default',
							closeModal: true,
						},
						confirm: {
							text: '로그인',
							value: true,
							visible: true,
							className: 'btn btn-primary',
							closeModal: true
						}
					}
				}).then((confirm) => {
				    if (confirm) {
						var exam_url = "http://exam-us.usher.co.kr/";
						//var exam_url = "http://127.0.0.1:8080/";
						var url = exam_url + "/member/login_manage.do?username="+s_username+"&&course_enrollment_id="+s_course_enrollment_id;
						window.open(url, "student_exam");
				    }
				});
			}else{
				var exam_url = "http://exam-us.usher.co.kr/";
				//var exam_url = "http://127.0.0.1:8080/";
				var url = exam_url + "/member/login_manage.do?username="+s_username+"&&course_enrollment_id="+s_course_enrollment_id;
				window.open(url, "student_exam");
			}
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
	
}

function go_chart(v_course_enrollment_id, v_course_enrollment_nm, v_course_id, v_course_nm)
{
	var v_course_group_nm = $("#search_course_group_id option:selected").text();
	$("#chart_01_title").html(v_course_group_nm+" "+v_course_nm+"반 평균 단어성적");
	$("#chart_02_title").html(v_course_enrollment_nm+" 평균 단어성적");
	
	$("#div_chart_01").html('<canvas id="chart_01" height="300" style="width:100%"></canvas>');
	$("#div_chart_02").html('<canvas id="chart_02" height="300" style="width:100%"></canvas>');

	
	$.ajax({
		type : "POST",
		url : "/enrollment/getAchieveVocaDailyList.do",
		data:{
			section:"VOCA",
			practice_type:"VOCA",
			course_enrollment_id:v_course_enrollment_id,
			course_id:v_course_id
		},
		success:function(data){
			var enrollmentDailyList = data.enrollmentDailyList;
			var courseDailyList     = data.courseDailyList;
			var labels_01 = Array();
			var scores_01 = Array();
			for(var i=0; i<courseDailyList.length; i++)
			{
				labels_01.push(courseDailyList[i].date);
				scores_01.push(courseDailyList[i].score);
			}
			var labels_02 = Array();
			var scores_02 = Array();
			for(var i=0; i<enrollmentDailyList.length; i++)
			{
				labels_02.push(enrollmentDailyList[i].date);
				scores_02.push(enrollmentDailyList[i].score);
			}
			var Chart01 = new Chart('chart_01', {
				type: 'horizontalBar',
				data: {
					labels: labels_01,
					datasets: [{
						label: '',
						backgroundColor: "rgba(115, 189, 115, 0.92)",
						borderColor:"rgba(115, 189, 115, 0.92)",
						borderWidth: 1,
						data:scores_01
						
					}]
				},
		        options: {
		            legend:false,
		            responsive: false,
		            scales: {
		                xAxes: [{
		                    ticks: {
		                        beginAtZero: true
		                    }
		                }]
		            },
		        }
			});
			
			var Chart02 = new Chart('chart_02', {
				type: 'horizontalBar',
				data: {
					labels: labels_02,
					datasets: [{
						label: '',
						backgroundColor: "rgba(87, 181, 218, 0.92)",
						borderColor:"rgba(87, 181, 218, 0.92)",
						borderWidth: 1,
						data:scores_02
						
					}]
				},
		        options: {
		            legend:false,
		            responsive: false,
		            scales: {
		                xAxes: [{
		                    ticks: {
		                        beginAtZero: true
		                    }
		                }]
		            },
		        }
			});
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}