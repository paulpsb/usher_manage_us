var voca_score = [
	180,
	170,
	160,
	150,
	140,
	130,
	120,
	110,
	100,
	90,
	80,
	70,
	60,
	50,
	0
];

var etc_score = [
	90,
	80,
	70,
	60,
	50,
	0
];


/*
설명 : 화면 로딩시.
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
		url : "/enrollment/getAchieveGoalList.do",
		data:{
			course_id : $("#course_id").val()
		},
		success:function(data){
			//상단화면을 그려준다.
			create_top_menu(data.sectionList, data.practiceAllList, "goal", "", $("#course_id").val(), data.courseInfo.student_type);
			
			var enrollmentList = data.enrollmentList;
			
			var courseInfo = data.courseInfo;
			
			var classCountList = data.classCountList;
			
			var sectionList = data.sectionList1;
			
			var practiceList = data.practiceList;
			
			var concentrationList = data.concentrationList;
			
			var concentrationPracticeList = data.concentrationPracticeList;
			
			var nWidth = 100;
			
			var vHtml = "";
			vHtml += '<table id="example"  class="table table-bordered table-td-valign-middle m-b-0">';
			vHtml += '	<thead>';
			vHtml += '		<tr>';
			vHtml += '			<th class="text-center table-info" rowspan="2" style="width:60px;">상태</th>';
			vHtml += '			<th class="text-center table-info" rowspan="2" style="width:60px;">번호</th>';
			vHtml += '			<th class="text-center table-info" rowspan="2" style="width:100px;">이름</th>';
			vHtml += '			<th class="text-center table-info" rowspan="2" style="width:80px;">기존/신규</th>';
			vHtml += '			<th class="text-center table-info" rowspan="2" style="width:100px;">집중과목</th>';
			var column_length = 4;
			for(var i=0; i<sectionList.length; i++)
			{
				var section = sectionList[i].section;
				
				var practice_count = practiceList.filter(function(item, index){
					if(item.section == section){
						return true;
					}
				}).length;
				if(practice_count > 0){
					vHtml += '			<th class="text-center table-info" colspan="'+practice_count+'" style="width:'+(practice_count * nWidth)+'px;">'+section+'</th>';
				}
			}
			vHtml += '		</tr>';
			vHtml += '		<tr>';
			for(var i=0; i<practiceList.length; i++)
			{
				vHtml += '			<th class="text-center table-info" style="width:100px;">'+practiceList[i].practice_name+'</th>';
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
				
				vHtml += '		<tr>';
				vHtml += create_student_info(enrollmentList[i], courseInfo, classCountList);
				var q_idx = concentrationList.findIndex(t => t.course_enrollment_id == course_enrollment_id);
				if(enrollmentList[i].class_gubun == "반이동" || enrollmentList[i].class_gubun == "환불")
				{
					vHtml += '			<td class="text-center" style="width:'+nWidth+'px;">&nbsp;</td>';
				}else{
					if(q_idx >= 0)
					{
						var enrollment_level= concentrationList[q_idx].enrollment_level;
						var course_level= concentrationList[q_idx].course_level;
						var v_title = "";
						var v_class = "";
						var v_section = sectionList[enrollment_level].short_title_kr+"집중";
						
						if(enrollment_level == course_level)
						{
							v_title = "(기본 범위)";
							v_class = "bg-yellow-darker";
						}else{
							if(enrollment_level > course_level)
							{
								v_title = "(기본보다 넓은 범위)";	
								v_class = "bg-green-darker";
							}else{
								v_title = "(기본보다 좁은 범위)";
								v_class = "bg-red-darker";
							}
						}
						vHtml += '<td class="text-center text-white '+v_class+'" style="width:'+nWidth+'px;">';
						vHtml += v_section+'<br>';
						vHtml += v_title+'<br>';
						vHtml += '<button type="button" class="btn btn-inverse btn-xs" onClick="modifyConcentration('+course_enrollment_id+')">집중과목 수정</button>';
						
						vHtml += '</td>';
					}else{
						vHtml += '			<td class="text-center" style="width:100px;">&nbsp;</td>';
					}					
				}

				for(var j=0; j<practiceList.length; j++)
				{
					if(enrollmentList[i].class_gubun == "반이동" || enrollmentList[i].class_gubun == "환불")
					{
						vHtml += '			<td class="text-center" style="width:'+nWidth+'px;">&nbsp;</td>';
						continue;
					}
					var a_section = practiceList[j].section;
					var a_practice_type = practiceList[j].practice_type;
					
					var a_idx = concentrationPracticeList.findIndex(t => t.course_enrollment_id == course_enrollment_id && t.section == a_section && t.practice_type == a_practice_type);
					if(a_idx >=0 )
					{
						var bg_class = "";
						if(q_idx >= 0){
							var a_is_section = "is_"+a_section.toLowerCase();
							var is_section = concentrationList[q_idx][a_is_section];
							if(!is_section){
								bg_class = "bg-grey-darker";
							}
							
						}else{
							bg_class = "bg-grey-darker";
						}
						var program_use       = concentrationPracticeList[a_idx].program_use;
						var pass_user_score   = concentrationPracticeList[a_idx].pass_user_score;
						var pass_course_score = concentrationPracticeList[a_idx].pass_course_score;
						var accept_result     = concentrationPracticeList[a_idx].accept_result;
						vHtml += '			<td class="text-center '+bg_class+'" style="width:'+nWidth+'px;">';
						if(program_use == "Y"){
							if(a_section == 'VOCA'){
								vHtml += '<div class="bg-indigo text-white">'+pass_course_score+'개</div>';
							}else{
								vHtml += '<div class="bg-indigo text-white">'+pass_course_score+'%</div>';
							}
						}else{
							vHtml += '<div class="bg-indigo text-white"">O/X</div>';
							
						}
						
						if(pass_user_score >= pass_course_score && concentrationPracticeList[a_idx].book != "basic")
						{
							if(program_use == "Y"){
								if(a_section == 'VOCA'){
									//vHtml += '<div class="bg-green text-white">'+pass_user_score+'개</div>';
									vHtml += '<button type="button" class="btn btn-green btn-xs btn-block" onclick="modifyPractice('+concentrationPracticeList[a_idx].id+')">'+pass_user_score+'개</button>';
								}else{
									vHtml += '<button type="button" class="btn btn-green btn-xs btn-block" onclick="modifyPractice('+concentrationPracticeList[a_idx].id+')">'+pass_user_score+'%</button>';
									//vHtml += '<div class="bg-green text-white">'+pass_user_score+'%</div>';
								}
							}else{
								vHtml += '<button type="button" class="btn btn-green btn-xs btn-block" onclick="modifyPractice('+concentrationPracticeList[a_idx].id+')">한다</button>';
								//vHtml += '<div class="bg-green text-white"">한다</div>';
							}
							
						}else{
							if(accept_result)
							{
								if(pass_user_score == 0)
								{
									//vHtml += '<div class="bg-danger text-white"">포기</div>';
									vHtml += '<button type="button" class="btn btn-danger btn-xs btn-block" onclick="modifyPractice('+concentrationPracticeList[a_idx].id+')">포기</button>';
								}else{
									if(program_use == "Y"){
										if(a_section == 'VOCA'){
											var v_basic = "";
											if(concentrationPracticeList[a_idx].book == "basic") v_basic = "(중고등)";
											
											//vHtml += '<div class="bg-warning text-white"">'+pass_user_score+'개'+v_basic+'</div>';
											vHtml += '<button type="button" class="btn btn-warning btn-xs btn-block" onclick="modifyPractice('+concentrationPracticeList[a_idx].id+')">'+pass_user_score+'개'+v_basic+'</button>';											
										}else{
											//vHtml += '<div class="bg-warning text-white"">'+pass_user_score+'%</div>';
											vHtml += '<button type="button" class="btn btn-warning btn-xs btn-block" onclick="modifyPractice('+concentrationPracticeList[a_idx].id+')">'+pass_user_score+'%</button>';
										}
									}
								}
							}else{
								if(pass_user_score == 0)
								{
									vHtml += '<button type="button" class="btn btn-inverse btn-xs btn-block" onclick="modifyPractice('+concentrationPracticeList[a_idx].id+')">포기</button>';
								}else{
									if(program_use == "Y"){
										if(a_section == 'VOCA'){
											var v_basic = "";
											if(concentrationPracticeList[a_idx].book == "basic") v_basic = "(중고등)";
											
											vHtml += '<button type="button" class="btn btn-inverse btn-xs btn-block" onclick="modifyPractice('+concentrationPracticeList[a_idx].id+')">'+pass_user_score+'개'+v_basic+'</button>';
										}else{
											vHtml += '<button type="button" class="btn btn-inverse btn-xs btn-block" onclick="modifyPractice('+concentrationPracticeList[a_idx].id+')">'+pass_user_score+'%</button>';
										}
									}
								}
							}

						}
						vHtml += '</td>';
					}else{
						vHtml += '			<td class="text-center" style="width:100px;">&nbsp;</td>';	
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


var enrollment_level;
var course_level;
var sectionList;
function modifyConcentration(course_enrollment_id)
{
	$.ajax({
		type : "POST",
		url : "/enrollment/getAchieveGoalConcentration.do",
		data:{
			course_id:$("#course_id").val(),
			course_enrollment_id:course_enrollment_id
		},
		success:function(data){ 
			
			$("#course_enrollment_id").val(course_enrollment_id);
			sectionList = data.sectionList;
			var concentrationInfo = data.concentrationInfo;
			var courseInfo = data.courseInfo;
			
			var course_section = "";
			var user_section = "";
			
			var vHtml = "";
			//우선 서로의 레벨을 찾는다.
			for(var i=0; i<sectionList.length; i++)
			{
				var section_id = "is_"+sectionList[i].section.toLowerCase();
				var actice = "";
				if(courseInfo[section_id]){
					course_section = sectionList[i].section;
					actice = "yellow";
					course_level = i;
				}
				
				vHtml += '<li class="'+actice+'">';
				vHtml += sectionList[i].section;
				vHtml += '</li>';
				
				if(concentrationInfo[section_id]){
					user_section = sectionList[i].section;
					enrollment_level = i;
				}
			}
			$("#progressbar_course").html(vHtml);
			$("#course_title").html(courseInfo.name+"반 기본 집중과목범위 : VOCA ~ "+course_section);
			$("#user_title").html("나의 집중과목범위 : VOCA ~ "+user_section);
			
			vHtml = "";
			var enrollment_color = "";
			if(enrollment_level == course_level)
			{
				enrollment_color = "yellow";
			}else{
				if(enrollment_level > course_level){
					enrollment_color = "green";
				}else{
					enrollment_color = "red";
				}
			}
			for(var i=0; i<sectionList.length; i++)
			{
				var section_id = "is_"+sectionList[i].section.toLowerCase();
				var actice = "";
				var value = "0";
				if(concentrationInfo[section_id]){
					actice = enrollment_color;
					value = "1";
				}
				
				vHtml += '<li id="user_'+section_id+'" class="is_section '+actice+'" style="cursor:pointer;">';
				vHtml += sectionList[i].section;
				vHtml += '<input type="hidden" id="'+section_id+'" value="'+value+'">';
				vHtml += '<input type="hidden" name="section_id" value="'+sectionList[i].section+'">';
				vHtml += '<input type="hidden" name="section_level" value="'+i+'">';
				vHtml += '</li>';
			}
			$("#progressbar_user").html(vHtml);
			
			$("#txt_concentration").val(cfmNvl1(concentrationInfo.comments));
			$("#txt_teacher_concentration").val(cfmNvl1(concentrationInfo.writer_comments));
			
			$(".is_section").click(function(){
				var section = $(this).find("input[name=section_id]").val();
				$("#user_title").html("나의 집중과목범위 : VOCA ~ "+section);
				enrollment_level = parseInt($(this).find("input[name=section_level]").val());
				var enrollment_color = "";
				if(enrollment_level == course_level)
				{
					enrollment_color = "yellow";
				}else{
					if(enrollment_level > course_level){
						enrollment_color = "green";
					}else{
						enrollment_color = "red";
					}
				}
				
				//우선 모두 active를 날려버린다.
				for(var i=0; i<sectionList.length; i++)
				{
					var section_id = "is_"+sectionList[i].section.toLowerCase();
					$("#user_"+section_id).removeClass("yellow");
					$("#user_"+section_id).removeClass("green");
					$("#user_"+section_id).removeClass("red");
					
					$("#"+section_id).val("0");
				}
				
				for(var i=0; i<=enrollment_level; i++)
				{
					var section_id = "is_"+sectionList[i].section.toLowerCase();
					$("#user_"+section_id).addClass(enrollment_color);
					
					$("#"+section_id).val("1");
				}
			});
			
			
			$("#modal-concentration").modal();
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function save_concentration()
{
	var resv_data = Object();

	//우선 모두 active를 날려버린다.
	for(var i=0; i<sectionList.length; i++)
	{
		var section_id = "is_"+sectionList[i].section.toLowerCase();
		
		if($("#"+section_id).val() == "1"){
			resv_data[section_id] = true;
		}else{
			resv_data[section_id] = false;
		}
	}
	resv_data.course_enrollment_id = $("#course_enrollment_id").val();
	resv_data.enrollment_level = enrollment_level;
	resv_data.course_level = course_level;
	resv_data.writer_comments = $("#txt_teacher_concentration").val();
	$.ajax({
		type : "POST",
		url : "/enrollment/saveAchieveGoalConcentration.do",
		data:resv_data,
		success:function(data){ 
			alert("수정하였습니다.");
			$("#modal-concentration").modal("hide");
			init_data();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}
function modifyPractice(practice_id){
	$("#practice_id").val(practice_id);
	
	$.ajax({
		type : "POST",
		url : "/enrollment/getAchieveGoalConcentrationPactice.do",
		data:{
			id:practice_id
		},
		success:function(data){
			$("#txt_practice").val(cfmNvl1(data.comments));
			$("#txt_teacher_practice").val(cfmNvl1(data.writer_comments));
			var vHtml = "";
			var selected = "";
			if(data.section == "VOCA")
			{
				vHtml += '<div class="col-3">';
				vHtml += '	<select class="form-control" id="practice_book">';
				
				selected = "";
				if(data.book == "toefl") selected = "selected";
				vHtml += '		<option value="toefl" '+selected+'>토플</option>';
				
				selected = "";
				if(data.book == "basic") selected = "selected";
				
				vHtml += '		<option value="basic" '+selected+'>중고등</option>';
				vHtml += '	</select>';
				vHtml += '</div>';
				vHtml += '<div class="col-3">';
				vHtml += '	<select class="form-control" id="pass_user_score">';
				for(var i=0; i<voca_score.length; i++)
				{
					selected = "";
					if(data.pass_user_score == voca_score[i]) selected = "selected";
					var vOption = "";
					
					if(voca_score[i] > 0){
						vOption = voca_score[i]+"개";
					}else{
						vOption = "포기";
					}
					vHtml += '		<option value="'+voca_score[i]+'" '+selected+'>'+vOption+'</option>';
				}
				vHtml += '	</select>';
				vHtml += '</div>';
			}else{
				if(data.program_use == "Y"){
					vHtml += '<div class="col-3">';
					vHtml += '	<input type="hidden" id="practice_book" value="">';
					vHtml += '	<select class="form-control" id="pass_user_score">';
					for(var i=0; i<etc_score.length; i++)
					{
						selected = "";
						if(data.pass_user_score == etc_score[i]) selected = "selected";
						var vOption = "";
						if(etc_score[i] > 0){
							vOption = etc_score[i]+"%";
						}else{
							vOption = "포기";
						}
						vHtml += '		<option value="'+etc_score[i]+'" '+selected+'>'+vOption+'</option>';
					}
					vHtml += '	</select>';
					vHtml += '</div>';
				}else{
					vHtml += '<div class="col-3">';
					vHtml += '	<input type="hidden" id="practice_book" value="">';
					vHtml += '	<select class="form-control" id="pass_user_score">';
					
					selected = "";
					if(data.pass_user_score == 1) selected = "selected";
					vHtml += '		<option value="1" '+selected+'>한다</option>';
					
					selected = "";
					if(data.pass_user_score == 0) selected = "selected";
					
					vHtml += '		<option value="0" '+selected+'>포기</option>';
					vHtml += '	</select>';
					vHtml += '</div>';
				}
			}
			$("#div_practice").html(vHtml);
			
			$("#modal-practice").modal();
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function save_practice()
{
	$.ajax({
		type : "POST",
		url : "/enrollment/saveAchieveGoalConcentrationPactice.do",
		data:{
			id:$("#practice_id").val(),
			pass_user_score:$("#pass_user_score").val(),
			writer_comments:$("#txt_teacher_practice").val(),
			book:$("#practice_book").val()
		},
		success:function(data){ 
			alert("승인하였습니다.");
			$("#modal-practice").modal("hide");
			init_data();
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}


/*
function modifyPractice(practice_id){
	$("#practice_id").val(practice_id);
	
	$.ajax({
		type : "POST",
		url : "/enrollment/getAchieveGoalConcentrationPactice.do",
		data:{
			id:practice_id
		},
		success:function(data){ 
			$("#pass_user_score").val(data.pass_user_score);
			$("#pass_course_score").val(data.pass_course_score);
			$("#practice_book").val(data.book);
			if(data.practice_type == "VOCA")
			{
				$("#orginal_book").val("toefl");
			}else{
				$("#orginal_book").val("");
			}
			$("#txt_practice").val(cfmNvl1(data.comments));
			$("#txt_teacher_practice").val(cfmNvl1(data.writer_comments));
			
			
			$("#modal-practice").modal();
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function save_practice_success()
{
	$.ajax({
		type : "POST",
		url : "/enrollment/saveAchieveGoalConcentrationPactice.do",
		data:{
			id:$("#practice_id").val(),
			pass_user_score:$("#pass_user_score").val(),
			writer_comments:$("#txt_teacher_practice").val(),
			book:$("#practice_book").val()
		},
		success:function(data){ 
			alert("승인하였습니다.");
			$("#modal-practice").modal("hide");
			init_data();
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}


function save_practice_fail()
{
	$.ajax({
		type : "POST",
		url : "/enrollment/saveAchieveGoalConcentrationPactice.do",
		data:{
			id:$("#practice_id").val(),
			pass_user_score:$("#pass_course_score").val(),
			writer_comments:$("#txt_teacher_practice").val(),
			book:$("#orginal_book").val()
		},
		success:function(data){ 
			alert("거부하였습니다.");
			$("#modal-practice").modal("hide");
			init_data();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}
*/
function openOath(username,course_enrollment_id, orientation_code)
{
	var examUrl = "http://exam.usher.co.kr/"
	var url = examUrl + "main/oath/oath.do?username="+username+"&&course_enrollment_id="+course_enrollment_id+"&&orientation_code="+orientation_code;
	window.open(url, "oath");
}