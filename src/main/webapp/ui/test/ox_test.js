var course_id = "";
var course_name = "";
var section = "";
var practice_type = "";
var practice_schedule_id;
var is_passage = false;
var course_enrollment_id;
var mode = "select";

var student_list;
var student_idx;

var random_student_list;
var random_student_idx;
var random_student_count;

var exam_count;
var exam_not_count;

var exam_type = {
	//12간지
	TWELVE:[
			"academic",
			"saving time",
			"money",
			"stress",
			"good at it",
			"love",
			"bike",
			"parents",
			"environment",
			"government",
			"advertisement",
			"great memory"
	],
	//별지
	APPENDIX:[
		"That vs. those",
		"To-부정사 부사적 용법",
		"도치",
		"의미상 주어",
		"끼워넣기 문제 풀이 방법",
		"As 관계대명사",
		"out of",
		";(세미콜론)",
		"of which",
		"be to 용법"
	],
	//접속사 암기
	CONJUCTION:[
		"when",
		"because",
		"since",
		"whereas",
		"where",
		"although",
		"whose",
		"how",
		"while",
		"if",
		"whether",
		"though",
		"unless",
		"once",
		"as long as",
		"why",
		"providing",
		"provided",
		"after",
		"as far as",
		"by the time",
		"as soon as",
		"as if",
		"as though",
		"at the time",
		"now that",
		"even if",
		"even though",
		"every time",
		"except that",
		"however",
		"in case",
		"in order that",
		"in that",
		"so that",
		"so ~ that",
		"so that",
		"what",
		"whenever",
		"which",
		"as",
		"than",
		"before",
		"whatever",
		"that"
	],
	FIVERULES:[
		"Rule1",
		"Rule2",
		"Rule3",
		"Rule4",
		"Rule5"
	],
	VERBAL_BLUEPRINT:[
		"1일차",
		"2일차",
		"3일차",
		"4일차",
		"5일차"
	],
	IRREGULAR:[
		"a-a-a",
		"a-b-a",
		"a-b-b",
		"a-b-c"
	],
	EXPLANATION:[
		"1번",
		"2번",
		"3번",
		"4번",
		"5번",
		"6번",
		"7번",
		"8번",
		"9번",
		"10번",
		"11번",
		"12번",
		"13번",
		"14번",
		"15번",
		"16번",
		"17번",
		"18번",
		"19번",
		"20번",
		"21번",
		"22번",
		"23번",
		"24번",
		"25번",
		"26번",
		"27번",
		"28번",
		"29번",
		"30번",
		"31번",
		"32번",
		"33번",
		"34번",
		"35번",
		"36번",
		"37번",
		"38번",
		"39번",
		"40번"
	],
	GRAMMAR_TRANSLATION_ACUTAL:[
		"1번",
		"2번",
		"3번",
		"4번",
		"5번",
		"6번",
		"7번",
		"8번",
		"9번",
		"10번",
		"11번",
		"12번",
		"13번",
		"14번",
		"15번",
		"16번",
		"17번",
		"18번",
		"19번",
		"20번",
		"21번",
		"22번",
		"23번",
		"24번",
		"25번",
		"26번",
		"27번",
		"28번",
		"29번",
		"30번",
		"31번",
		"32번",
		"33번",
		"34번",
		"35번",
		"36번",
		"37번",
		"38번",
		"39번",
		"40번"
	],
	GRAMMAR_TRANSLATION:[
		"1-15",
		"16-40"
	]
};

var section_exam_type = {
	SPEAKING:{
		//뼈대
		BACKBONE:[
			"Task1",
			"Task2",
			"Task3",
			"Task4",
		]
	},
	WRITING:{
		//뼈대
		BACKBONE:[
			"5분 뼈대/독립",
			"3분 뼈대/통합"
		]
	}
}

/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	course_id = $("#course_id").val();
	course_name = $("#course_name").val();
	section = $("#section").val();
	practice_type = $("#practice_type").val();
	
	search_semester();
	create_seat();
	
	$(window).resize(resizeContents);
    
	resizeContents();
	
	$('#search_schedule_id').change(function(e){
		search_student();
	});
	
	$('#mode_random_order').change(function(e){
		//현재학생을 변경한다.
		student_idx = student_list.findIndex(i => i.course_enrollment_id == course_enrollment_id); 
		$("#student_"+course_enrollment_id).removeClass("bg-blue-lighter");

		if(student_list[student_idx].is_exam)
		{
			if(student_list[student_idx].pass_result){
				$("#student_"+course_enrollment_id).addClass("bg-green-lighter");
			}else{
				$("#student_"+course_enrollment_id).addClass("bg-red-lighter");
			}
		}else{
			$("#student_"+course_enrollment_id).addClass("bg-grey-lighter");
		}
		
		int_random_mode();
	});
	
	if(!course_name){
		showCourses("N");
	}else{
		$("#select_course_name").html(course_name);
		search_practice_course();
	}

});

/*
 * 설명 : 화면 사이즈 변경시
 */
function resizeContents()
{
	//현재의 사이즈를 찾는다.
	var window_size = $(window).height();

	$("#seat_list").height(window_size - 250);
	$("#div_quiz_list").height(window_size - 330);
}

function create_seat()
{
	var nCol = 11;
	var nRow = 13;
	
	var vHtml = "";
	for(var i=nRow; i>0; i--)
	{
		vHtml += '<tr>';
		for(var j=1; j<=nCol; j++)
		{
			vHtml += '<td id="seat_'+i+'_'+j+'" class="text-center" style="border:0px none #000;vertical-align: middle;width:100px;height:80px;padding:5px;">';
			vHtml += '	<div class="bg-grey-darker" style="width:84px;height:64px;padding:3px;">';
			vHtml += '	</div>';
			vHtml += '</td>';
		}
		vHtml += '</tr>';
	}
	
	$("#seat_list").html(vHtml);
	
	$("#seat_list").scrollTop($("#seat_list")[0].scrollHeight);
}
/*
 * 설명 : 년/월 조회
 */
function search_semester()
{

	$.ajax({
		type : "POST",
		url : "/common/getSemesterList.do",
		data:{
		},
		success:function(data){
			var vHtml = "";
			var to_month = cfmGetToMonth();

			for(var i=0; i<data.length; i++){
				var selected = "";
				if(to_month == data[i].date) selected = "selected";
				vHtml += "<option value='"+data[i].id+"' "+selected+">"+data[i].date+"</option>";
			}
			
			$("#search_semester_id").html(vHtml);
			
			$('#search_semester_id').change(function(e){
				search_course_group();
			});
			
			$('#search_test_type').change(function(e){
				search_course_group();
			});
			
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
/*
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
			
			if(data.length == 0){
				vHtml = "<option value=''>반 그룹</option>";
			}
			
			$("#search_course_group_id").html(vHtml);
			
			$('#search_course_group_id').change(function(e){
				if($("#search_course_group_id").val()){
					search_course();
				}else{
					$("#search_course_id").html("<option>반</option>");				
				}
			});
			
			if(data.length > 0){
				search_course();
			}else{
				$("#search_course_id").html("<option>반</option>");		
			}

		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}
*/

function search_course_group()
{
	$.ajax({
		type : "POST",
		url : "/common/getCourseAllList.do",
		data:{
			semester_id:$("#search_semester_id").val()
		},
		success:function(data){
			var vHtml = "";
			var coursegroupList = data.coursegroupList;
			var courseList = data.courseList;
			for(var i=0; i<coursegroupList.length; i++)
			{
				var courseGorupId = coursegroupList[i].id;
				vHtml += '<div class="form-group row m-b-15">';
				vHtml += '	<div class="col-9">';
				vHtml += '		<h5>'+coursegroupList[i].name+'<h5>';
				vHtml += '	</div>';
				vHtml += '</div>';
				vHtml += '<div class="form-group row m-b-15">';
				
				var arr_course = courseList.filter(function(item, index){
					if(item.course_group_id == courseGorupId){
						return true;
					}
				});
				for(var j=0; j<arr_course.length; j++)
				{
					var vTitle = coursegroupList[i].name+' '+arr_course[j].name+'반';
					vHtml += '	<div class="col-2 text-center">';
					vHtml += '		<a href="javascript:form_sitemap_select(\''+vTitle+'\','+arr_course[j].id+')"><h5>'+arr_course[j].name+'반</h5></a>';
					vHtml += '	</div>';
				}
				vHtml += '</div>';
				$("#site_map").html(vHtml);
			}
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

function form_sitemap_select(v_title, v_course_id)
{
	course_id = v_course_id;
	$("#select_course_name").html(v_title);
	/*
	$('#select_courses').hide(); 
	$('#mask').hide(); 
	$('#mask').remove();
	*/
	$('#select_courses').modal("hide"); 
	
	search_practice();
}

/*
 * 설명 : 반 조회.
 */
function search_course()
{
	$.ajax({
		type : "POST",
		url : "/common/getCourseList.do",
		data:{
			course_group_id:$("#search_course_group_id").val()
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				vHtml += "<option value='"+data[i].id+"'>"+data[i].name+"</option>";
			}
			if(data.length == 0){
				vHtml = "<option value=''>반</option>";
			}
			$("#search_course_id").html(vHtml);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

/*
 * 설명 : 시험 List조회
 */
function search_practice_course()
{
	$.ajax({
		type : "POST",
		url : "/test/getPracticeScheduleOxList.do",
		data:{
			course_id:course_id
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				if(data[i].section == section && data[i].practice_type == practice_type){
					vHtml += '<button id="'+data[i].section+'_'+data[i].practice_type+'" type="button" class="btn_practice btn btn-danger btn-md" style="margin-right:5px;" onclick="select_practice(\''+data[i].section+'\',\''+data[i].practice_type+'\');">'+data[i].name+'</button>';
				}else{
					vHtml += '<button id="'+data[i].section+'_'+data[i].practice_type+'" type="button" class="btn_practice btn btn-white btn-md" style="margin-right:5px;" onclick="select_practice(\''+data[i].section+'\',\''+data[i].practice_type+'\');">'+data[i].name+'</button>';
				}
			}
			
			$("#div_practice").html(vHtml);
			search_schedule();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

/*
 * 설명 : 시험 List조회
 */
function search_practice()
{
	practice_type = "";
	section = "";
	$.ajax({
		type : "POST",
		url : "/test/getPracticeScheduleOxList.do",
		data:{
			course_id:course_id
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				if(i > 0){
					vHtml += '<button id="'+data[i].section+'_'+data[i].practice_type+'" type="button" class="btn_practice btn btn-white btn-md" style="margin-right:5px;" onclick="select_practice(\''+data[i].section+'\',\''+data[i].practice_type+'\');">'+data[i].name+'</button>';
				}else{
					section = data[i].section;
					practice_type = data[i].practice_type;
					vHtml += '<button id="'+data[i].section+'_'+data[i].practice_type+'" type="button" class="btn_practice btn btn-danger btn-md" style="margin-right:5px;" onclick="select_practice(\''+data[i].section+'\',\''+data[i].practice_type+'\');">'+data[i].name+'</button>';
				}
			}
			
			$("#div_practice").html(vHtml);
			if(vHtml){
				search_schedule();
			}else{
				$("#search_schedule_id").html("");
				$("#div_quiz_list").html("");
				$("#exam_count").html("");
				$("#exam_not_count").html("");
				create_seat();
			}
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

function select_practice(v_section, v_practice_type)
{
	section = v_section;
	practice_type = v_practice_type;
	
	$(".btn_practice").removeClass("btn-danger");
	$(".btn_practice").removeClass("btn-white");
	$(".btn_practice").addClass("btn-white");
	
	$("#"+v_section+"_"+v_practice_type).removeClass("btn-white");
	$("#"+v_section+"_"+v_practice_type).addClass("btn-danger");
	search_schedule();
}

/*
 * 설명 : 시험 List조회
 */
function search_schedule()
{
	$.ajax({
		type : "POST",
		url : "/test/getPracticeScheduleOxPracticeTypeList.do",
		data:{
			section:section,
			practice_type:practice_type,
			course_id:course_id
		},
		success:function(data){
			//타입별로 Combo를 사용할것인지 확인한다.
			if(exam_type[practice_type]){
				is_passage = true;
				var vHtml2 = "";
				for(var i=0; i<exam_type[practice_type].length;i++)
				{
					vHtml2 += '<option value="'+exam_type[practice_type][i]+'">'+exam_type[practice_type][i]+'</option>';
				}
				$("#mode_select_passage").html(vHtml2);
				$("#mode_random_passage").html(vHtml2);
				
				$("#mode_select_passage").show();
				$("#mode_random_passage").show();
				$("#mode_select_schedule_name").hide();
				$("#mode_random_schedule_name").hide();
			}else{
				if(section_exam_type[section]){
					var section_exam_practice_type = section_exam_type[section];
					if(section_exam_practice_type[practice_type])
					{
						is_passage = true;
						var vHtml2 = "";
						for(var i=0; i<section_exam_practice_type[practice_type].length;i++)
						{
							vHtml2 += '<option value="'+section_exam_practice_type[practice_type][i]+'">'+section_exam_practice_type[practice_type][i]+'</option>';
						}
						$("#mode_select_passage").html(vHtml2);
						$("#mode_random_passage").html(vHtml2);
						
						$("#mode_select_passage").show();
						$("#mode_random_passage").show();
						$("#mode_select_schedule_name").hide();
						$("#mode_random_schedule_name").hide();
						
					}else{
						is_passage = false;
						$("#mode_select_passage").hide();
						$("#mode_random_passage").hide();
						$("#mode_select_schedule_name").show();
						$("#mode_random_schedule_name").show();
					}
				}else{
					is_passage = false;
					$("#mode_select_passage").hide();
					$("#mode_random_passage").hide();
					$("#mode_select_schedule_name").show();
					$("#mode_random_schedule_name").show();
				}
			}
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				var title = "";
				if(data[i].book) title += data[i].book;
				if(data[i].volume) title += ' '+ data[i].volume;
				if(data[i].group) title += ' '+ data[i].group;
				if(data[i].article) title += ' '+ data[i].article;
				
				if(data[i].short_title) title += ':'+ data[i].short_title;
				if(data[i].start_paragraph > 0){
					if(data[i].start_paragraph == data[i].end_paragraph){
						title += '('+data[i].start_paragraph+'문단)';
					}else{
						title += '('+data[i].start_paragraph+'문단 ~ '+data[i].end_paragraph+'문단)';
					}
				}else{
					title += '(문단전체)';
				}
				
				vHtml += '<option value="'+data[i].id+'">'+title+'</option>';
			}
			
			$("#search_schedule_id").html(vHtml);
			

			search_student();
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

var $_select_student;
function showCourses(isCancel)
{
	if(isCancel == "Y"){
		$("#btn_cancel_course").show();
	}else{
		$("#btn_cancel_course").hide();
	}
	/*
	var maskHeight = $(document).height(); 
	var maskWidth = window.document.body.clientWidth; 
	var mask = "<div id='mask' style='position:absolute; z-index:9000; background-color:#000000; display:none; left:0; top:0;'></div>"; 
	$('body').append(mask); 
	$('#mask').css({ 'width' : maskWidth , 'height': maskHeight , 'opacity' : '0.3' }); 
	$('#mask').show();
	$('#select_courses').show(); 
	*/ 
	$('#select_courses').modal({backdrop: 'static', keyboard: false}); 
}

function form_course_select()
{
	var course_group_name = $("#search_course_group_id option:checked").text();
	var course_name = $("#search_course_id option:checked").text();
	course_id = $("#search_course_id").val();
	$("#select_course_name").html(course_group_name+" "+course_name+"반");
	/*
	$('#select_courses').hide(); 
	$('#mask').hide(); 
	$('#mask').remove();
	*/
	$('#select_courses').modal("hide"); 
	search_practice();
}

function form_course_cancel()
{
	/*
	$('#select_courses').hide(); 
	$('#mask').hide(); 
	$('#mask').remove();
	*/
	$('#select_courses').modal("hide"); 
}

function search_student()
{
	practice_schedule_id = $("#search_schedule_id").val();
	
	$.ajax({
		type : "POST",
		url : "/test/getPracticeQuizResultCourseList.do",
		data:{
			section:section,
			practice_type:practice_type,
			course_id:course_id,
			practice_schedule_id:practice_schedule_id
		},
		success:function(data){
			var vHtml1 = "";
			exam_count = 0;
			exam_not_count = data.length;
			student_list = data;
			create_seat();
			for(var i=0; i<data.length; i++)
			{
				if(data[i].seat_row > 0 && data[i].seat_col > 0)
				{
					var vHtml = "";
					var v_chamgang = "";
					var v_class = "bg-grey-lighter";
					if(data[i].chamgang_yn == "Y"){
						v_chamgang = "-참강";
						v_class = "bg-info";
					}
					//결석인지 확인
					if(data[i].attend_status == "UNPERMITTED_ABSENT" || data[i].attend_status == "PERMITTED_ABSENT" || data[i].attend_status == "GIVEUP")
					{
						student_list[i].use_exam = false;
						vHtml += '	<div class="bg-black-darker text-white text-center" style="width:84px;height:64px;padding:3px;">';
						vHtml += '		<p style="margin:0;padding:0;">'+data[i].student_name+'</p>';
						if(data[i].registration_type == "NEW")
						{
							vHtml += '		<p style="margin:0;padding:0;">(신규'+v_chamgang+')</p>';
						}else{
							vHtml += '		<p style="margin:0;padding:0;">(기존'+v_chamgang+')</p>';
						}
						if(data[i].is_today == "NO")
						{
							vHtml += '		<p style="margin:0;padding:0;">(지정결석)</p>';
						}else{
							if(data[i].attend_status == "GIVEUP")
							{
								vHtml += '		<p style="margin:0;padding:0;">(포기)</p>';
							}else if(data[i].attend_status == "PERMITTED_ABSENT")
							{
								if(data[i].will_time){
									vHtml += '		<p style="margin:0;padding:0;">('+data[i].will_time+'예정)</p>';
								}else{
									vHtml += '		<p style="margin:0;padding:0;">(예정결석)</p>';
								}
							}else{
								vHtml += '		<p style="margin:0;padding:0;">(무단결석)</p>';
							}
						}
						vHtml += '	</div>'
					}else{
						if(data[i].is_today == "NO")
						{
							student_list[i].use_exam = false;
							vHtml += '	<div class="bg-black-darker text-white text-center" style="width:84px;height:64px;padding:3px;">';
							vHtml += '		<p style="margin:0;padding:0;">'+data[i].student_name+'</p>';
							vHtml += '		<p style="margin:0;padding:0;">(지정결석)</p>';
							vHtml += '	</div>'
						}else{
							student_list[i].use_exam = true;
							if(data[i].is_exam)
							{
								exam_count++;
								exam_not_count--;
								vHtml1 += '<h6>'+data[i].student_name+' : <span id="result_'+data[i].course_enrollment_id+'">'+data[i].result+'</span></h6>';
								if(data[i].pass_result){
									vHtml += '	<div id="student_'+data[i].course_enrollment_id+'" class="bg_student bg-green-lighter text-center" style="width:84px;height:64px;padding:3px;cursor:pointer;">';
									vHtml += '		<input type="hidden" id="student_idx" value="'+i+'">';
									vHtml += '		<p style="margin:0;padding:0;">'+data[i].student_name+'</p>';
									if(data[i].registration_type == "NEW")
									{
										vHtml += '		<p style="margin:0;padding:0;">(신규'+v_chamgang+')</p>';
									}else{
										vHtml += '		<p style="margin:0;padding:0;">(기존'+v_chamgang+')</p>';
									}
									vHtml += '		<p style="margin:0;padding:0;">&nbsp;</p>';
									vHtml += '	</div>'
								}else{
									vHtml += '	<div id="student_'+data[i].course_enrollment_id+'" class="bg_student bg-red-lighter text-center" style="width:84px;height:64px;padding:3px;cursor:pointer;">';
									vHtml += '		<input type="hidden" id="student_idx" value="'+i+'">';
									vHtml += '		<p style="margin:0;padding:0;">'+data[i].student_name+'</p>';
									if(data[i].registration_type == "NEW")
									{
										vHtml += '		<p style="margin:0;padding:0;">(신규'+v_chamgang+')</p>';
									}else{
										vHtml += '		<p style="margin:0;padding:0;">(기존'+v_chamgang+')</p>';
									}
									vHtml += '		<p style="margin:0;padding:0;">&nbsp;</p>';
									vHtml += '	</div>'
								}
							}else{
								vHtml += '	<div id="student_'+data[i].course_enrollment_id+'" class="bg_student '+v_class+' text-center" style="width:84px;height:64px;padding:3px;cursor:pointer;">';
								vHtml += '		<input type="hidden" id="student_idx" value="'+i+'">';
								vHtml += '		<p style="margin:0;padding:0;">'+data[i].student_name+'</p>';
								if(data[i].registration_type == "NEW")
								{
									vHtml += '		<p style="margin:0;padding:0;">(신규'+v_chamgang+')</p>';
								}else{
									vHtml += '		<p style="margin:0;padding:0;">(기존'+v_chamgang+')</p>';
								}
								vHtml += '		<p style="margin:0;padding:0;">&nbsp;</p>';
								vHtml += '	</div>'
								
							}
						}
					}
					$("#seat_"+data[i].seat_row+"_"+data[i].seat_col).html(vHtml);
				}else{
					student_list[i].use_exam = false;
				}
			}
			$("#exam_not_count").html(exam_not_count);
			$("#exam_count").html(exam_count);
			$("#div_quiz_list").html(vHtml1);
			$('.bg_student').click(function(e){
				$(this).removeClass("bg-grey-lighter");
				$(this).removeClass("bg-green-lighter");
				$(this).removeClass("bg-red-lighter");
				$(this).addClass("bg-blue-lighter");
				
				$_select_student = $(this);
				student_idx = parseInt($(this).find("#student_idx").val());
				course_enrollment_id = student_list[student_idx].course_enrollment_id;
				select_mode_student();
			});
			
			if(is_passage){
				var maskHeight = $(document).height(); 
				var maskWidth = window.document.body.clientWidth; 
				var mask = "<div id='mask' style='position:absolute; z-index:9000; background-color:#000000; display:none; left:0; top:0;'></div>"; 
				$('body').append(mask); 
				$('#mask').css({ 'width' : maskWidth , 'height': maskHeight , 'opacity' : '0.3' }); 
				$('#mask').show(); 
				$('#alert-combo').show(); 
			}
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
	
}

function close_alert_combo()
{
	$('#alert-combo').hide(); 
	$('#mask').hide(); 
	$('#mask').remove();	
}

function select_mode_student()
{
	
	var mode_select_student_name = student_list[student_idx].student_name+" ";
	if(student_list[student_idx].registration_type == "NEW")
	{
		mode_select_student_name += '(신규)';
	}else{
		mode_select_student_name += '(기존)';
	}
	
	var mode_select_schedule_name = $("#search_schedule_id option:checked").text();
	
	var mode_select_result_count = cfmNvl1(student_list[student_idx].result).length + 1

	$("#mode_select_student_name").html(mode_select_student_name);
	$("#mode_select_schedule_name").html(mode_select_schedule_name);
	$("#mode_select_result_count").html(mode_select_result_count+"회차");
	
	$("#modal-select-mode").modal();
}

function complete_mode_student(vGubun)
{
	var isExam = student_list[student_idx].is_exam;
	var result = cfmNvl1(student_list[student_idx].result);
	result += vGubun;
	var pass_result = false;

	if(vGubun == "O"){
		pass_result = true;
	}
	
	if(isExam){
		/*
		if(student_list[student_idx].pass_result){
			if(vGubun == "O"){
				pass_result = true;
			}
		}
		*/
		$("#result_"+student_list[student_idx].course_enrollment_id).html(result);
	}else{
		exam_count++;
		exam_not_count--;
		/*
		if(vGubun == "O"){
			pass_result = true;
		}
		*/
		$("#exam_not_count").html(exam_not_count);
		$("#exam_count").html(exam_count);
		$("#div_quiz_list").append('<h6>'+student_list[student_idx].student_name+' : <span id="result_'+student_list[student_idx].course_enrollment_id+'">'+result+'</span></h6>');
	}
	
	student_list[student_idx].pass_result = pass_result;
	student_list[student_idx].result = result;
	student_list[student_idx].is_exam = true;
	
	var passage = "";
	if(is_passage){
		passage = $("#mode_select_passage").val();
	}
	$.ajax({
		type : "POST",
		url : "/test/insertPracticeQuizResult.do",
		data:{
			section:section,
			practice_type:practice_type,
			pass_result:pass_result,
			result:vGubun,
			course_enrollment_id:course_enrollment_id,
			practice_schedule_id:practice_schedule_id,
			passage:passage
		},
		success:function(data){
			close_select_mode();	
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
	
	
}

function complete_all_mode_student(vGubun)
{

	var pass_result = false;
	if(vGubun == "O"){
		pass_result = true;
	}
	var array_student = Array();
	for(var i=0; i<student_list.length; i++)
	{
		if(!student_list[i].use_exam) continue;
		
		var objStudent = Object();
		var isExam = student_list[i].is_exam;
		var result = cfmNvl1(student_list[i].result);
		result += vGubun;
		if(isExam){
			$("#result_"+student_list[i].course_enrollment_id).html(result);
		}else{
			$("#div_quiz_list").append('<h6>'+student_list[i].student_name+' : <span id="result_'+student_list[i].course_enrollment_id+'">'+result+'</span></h6>');
		}
		$("#student_"+student_list[i].course_enrollment_id).removeClass("bg-blue-lighter");
		$("#student_"+student_list[i].course_enrollment_id).removeClass("bg-green-lighter");
		$("#student_"+student_list[i].course_enrollment_id).removeClass("bg-red-lighter");
		$("#student_"+student_list[i].course_enrollment_id).removeClass("bg-grey-lighter");
		
		if(pass_result){
			$("#student_"+student_list[i].course_enrollment_id).addClass("bg-green-lighter");
		}else{
			$("#student_"+student_list[i].course_enrollment_id).addClass("bg-red-lighter");
		}
		student_list[i].pass_result = pass_result;
		student_list[i].result = result;
		student_list[i].is_exam = true;
		
		objStudent.pass_result = pass_result;
		objStudent.result = vGubun;
		objStudent.course_enrollment_id = student_list[i].course_enrollment_id;
		array_student.push(objStudent);
	}
	
	var passage = "";
	if(is_passage){
		passage = $("#mode_select_passage").val();
	}
	
	$.ajax({
		type : "POST",
		url : "/test/insertPracticeQuizResultAll.do",
		data:{
			section:section,
			practice_type:practice_type,
			practice_schedule_id:practice_schedule_id,
			passage:passage,
			data_value:JSON.stringify(array_student)
		},
		success:function(data){
			alert("일괄 O/X 완료!!!")
			$("#modal-select-mode").modal("hide");
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
	
	
}

function close_select_mode()
{
	$_select_student.removeClass("bg-blue-lighter");
	if(student_list[student_idx].is_exam)
	{
		if(student_list[student_idx].pass_result){
			$_select_student.addClass("bg-green-lighter");
		}else{
			$_select_student.addClass("bg-red-lighter");
		}
	}else{
		$_select_student.addClass("bg-grey-lighter");
	}
	$("#modal-select-mode").modal("hide");
}


function random_mode_student()
{
	$("#btn_mode_select").removeClass("btn-danger");
	$("#btn_mode_select").addClass("btn-white");
	$("#btn_mode_random").removeClass("btn-white");
	$("#btn_mode_random").addClass("btn-danger");
	$("#mode_random_order").val("A");
	
	//1차적으로 시험을 안본 학생들을 체크한다.
	var student_list_1 = student_list.filter(function(item, index){
		if(item.use_exam == true && item.is_exam == false && item.registration_type != "NEW"){
			return true;
		}
	});
	
	var student_list_2 = student_list.filter(function(item, index){
		if(item.use_exam == true && item.is_exam == false && item.registration_type == "NEW"){
			return true;
		}
	});

	random_student_list = Array();
	for(var i=0; i<student_list_1.length; i++){
		random_student_list.push(student_list_1[i]);
	}
	for(var i=0; i<student_list_2.length; i++){
		random_student_list.push(student_list_2[i]);
	}

	//모두 1차 시험을 봤다면 램덤으로 데이터를 만든다.
	if(random_student_list.length == 0){
		student_list_1 = student_list.filter(function(item, index){
			if(item.use_exam == true && item.pass_result == true && item.registration_type != "NEW"){
				return true;
			}
		});
		
		student_list_2 = student_list.filter(function(item, index){
			if(item.use_exam == true && item.pass_result == true && item.registration_type == "NEW"){
				return true;
			}
		});

		random_student_list = Array();
		for(var i=0; i<student_list_1.length; i++){
			random_student_list.push(student_list_1[i]);
		}
		for(var i=0; i<student_list_2.length; i++){
			random_student_list.push(student_list_2[i]);
		}
		
		if(random_student_list.length == 0){
			alert("Random Mode를 사용할 수 없습니다.");
			return;
		}
		
		randomeShuffleArray(random_student_list);
	}
	
	
	random_student_idx = 0;
	random_student_count = random_student_list.length;
	
	course_enrollment_id = random_student_list[random_student_idx].course_enrollment_id;
	
	$("#student_"+course_enrollment_id).removeClass("bg-grey-lighter");
	$("#student_"+course_enrollment_id).removeClass("bg-green-lighter");
	$("#student_"+course_enrollment_id).removeClass("bg-red-lighter");
	$("#student_"+course_enrollment_id).addClass("bg-blue-lighter");
	
	
	var mode_random_student_name = random_student_list[random_student_idx].student_name+" ";
	if(random_student_list[random_student_idx].registration_type == "NEW")
	{
		mode_random_student_name += '(신규)';
	}else{
		mode_random_student_name += '(기존)';
	}
	
	var mode_random_schedule_name = $("#search_schedule_id option:checked").text();
	
	var mode_random_result_count = cfmNvl1(random_student_list[random_student_idx].result).length + 1
	
	$("#mode_random_student_name").html(mode_random_student_name);
	$("#mode_random_schedule_name").html(mode_random_schedule_name);
	$("#mode_random_result_count").html(mode_random_result_count+"회차");
	
	var next_id = random_student_idx + 1;
	var max_count = random_student_list.length;
	if(next_id == max_count){
		$("#btn_random_next").html("다음<br>(없음)");
	}else{
		$("#btn_random_next").html("다음<br>("+random_student_list[next_id].student_name+")");
	}
	
	$("#modal-random-mode").modal();
}

function complete_random_mode_student(vGubun)
{
	student_idx = student_list.findIndex(i => i.course_enrollment_id == course_enrollment_id); 
	var isExam = student_list[student_idx].is_exam;
	var result = cfmNvl1(student_list[student_idx].result);
	result += vGubun;
	var pass_result = false;
	if(vGubun == "O"){
		pass_result = true;
	}
	if(isExam){
		if(student_list[student_idx].pass_result){
			/*
			if(vGubun == "O"){
				pass_result = true;
			}
			*/
		}
		$("#result_"+student_list[student_idx].course_enrollment_id).html(result);
	}else{
		exam_count++;
		exam_not_count--;
		/*
		if(vGubun == "O"){
			pass_result = true;
		}
		*/
		$("#exam_not_count").html(exam_not_count);
		$("#exam_count").html(exam_count);
		$("#div_quiz_list").append('<h6>'+student_list[student_idx].student_name+' : <span id="result_'+student_list[student_idx].course_enrollment_id+'">'+result+'</span></h6>');
	}
	
	student_list[student_idx].pass_result = pass_result;
	student_list[student_idx].result = result;
	student_list[student_idx].is_exam = true;
	
	var passage = "";
	if(is_passage){
		passage = $("#mode_random_passage").val();
	}
	
	$.ajax({
		type : "POST",
		url : "/test/insertPracticeQuizResult.do",
		data:{
			section:section,
			practice_type:practice_type,
			pass_result:pass_result,
			result:vGubun,
			course_enrollment_id:course_enrollment_id,
			practice_schedule_id:practice_schedule_id,
			passage:passage
		},
		success:function(data){
			next_random_mode();	
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
	
	
}

function complete_all_student(vGubun)
{

	var pass_result = false;
	if(vGubun == "O"){
		pass_result = true;
	}
	var array_student = Array();
	for(var i=0; i<student_list.length; i++)
	{
		if(!student_list[i].use_exam) continue;
		
		var objStudent = Object();
		var isExam = student_list[i].is_exam;
		var result = cfmNvl1(student_list[i].result);
		result += vGubun;
		if(isExam){
			$("#result_"+student_list[i].course_enrollment_id).html(result);
		}else{
			$("#div_quiz_list").append('<h6>'+student_list[i].student_name+' : <span id="result_'+student_list[i].course_enrollment_id+'">'+result+'</span></h6>');
		}
		$("#student_"+student_list[i].course_enrollment_id).removeClass("bg-blue-lighter");
		$("#student_"+student_list[i].course_enrollment_id).removeClass("bg-green-lighter");
		$("#student_"+student_list[i].course_enrollment_id).removeClass("bg-red-lighter");
		$("#student_"+student_list[i].course_enrollment_id).removeClass("bg-grey-lighter");
		
		if(pass_result){
			$("#student_"+student_list[i].course_enrollment_id).addClass("bg-green-lighter");
		}else{
			$("#student_"+student_list[i].course_enrollment_id).addClass("bg-red-lighter");
		}
		student_list[i].pass_result = pass_result;
		student_list[i].result = result;
		student_list[i].is_exam = true;
		
		objStudent.pass_result = pass_result;
		objStudent.result = vGubun;
		objStudent.course_enrollment_id = student_list[i].course_enrollment_id;
		array_student.push(objStudent);
	}
	
	var passage = "";
	if(is_passage){
		passage = $("#mode_random_passage").val();
	}
	
	$.ajax({
		type : "POST",
		url : "/test/insertPracticeQuizResultAll.do",
		data:{
			section:section,
			practice_type:practice_type,
			practice_schedule_id:practice_schedule_id,
			passage:passage,
			data_value:JSON.stringify(array_student)
		},
		success:function(data){
			alert("일괄 O/X 완료!!!")
			$("#modal-random-mode").modal("hide");
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
	
	
}

function int_random_mode()
{
	var order_type = $("#mode_random_order").val();
	var student_list_1;
	var student_list_2;
	//1차적으로 시험을 안본 학생들을 체크한다.
	
	if(order_type == "A")
	{
		student_list_1 = student_list.filter(function(item, index){
			if(item.use_exam == true && item.is_exam == true && item.registration_type != "NEW"){
				return true;
			}
		});
		
		student_list_2 = student_list.filter(function(item, index){
			if(item.use_exam == true && item.is_exam == true && item.registration_type == "NEW"){
				return true;
			}
		});
		
	}else if(order_type == "B"){
		student_list_1 = student_list.filter(function(item, index){
			if(item.use_exam == true && item.is_exam == true && item.registration_type == "NEW"){
				return true;
			}
		});
		
		student_list_2 = student_list.filter(function(item, index){
			if(item.use_exam == true && item.is_exam == true && item.registration_type != "NEW"){
				return true;
			}
		});
	}else if(order_type == "C"){
		student_list_1 = student_list.filter(function(item, index){
			if(item.use_exam == true && item.is_exam == true && item.chamgang_yn == "Y"){
				return true;
			}
		});
		
		student_list_2 = student_list.filter(function(item, index){
			if(item.use_exam == true && item.is_exam == true && item.chamgang_yn != "Y"){
				return true;
			}
		});
	}else if(order_type == "D"){
		student_list_1 = student_list.filter(function(item, index){
			if(item.use_exam == true && item.is_exam == true && item.chamgang_yn != "Y"){
				return true;
			}
		});
		
		student_list_2 = student_list.filter(function(item, index){
			if(item.use_exam == true && item.is_exam == true && item.chamgang_yn == "Y"){
				return true;
			}
		});
	}else{
		student_list_1 = student_list.filter(function(item, index){
			if(item.use_exam == true && item.is_exam == true){
				return true;
			}
		});
		
		student_list_2 = Array();
		
	}
		
	random_student_list = Array();
	for(var i=0; i<student_list_1.length; i++){
		random_student_list.push(student_list_1[i]);
	}
	for(var i=0; i<student_list_2.length; i++){
		random_student_list.push(student_list_2[i]);
	}
	
	//모두 1차 시험을 봤다면 램덤으로 데이터를 만든다.
	if(random_student_list.length == 0){
		if(order_type == "A")
		{
			student_list_1 = student_list.filter(function(item, index){
				if(item.use_exam == true && item.pass_result == true && item.registration_type != "NEW"){
					return true;
				}
			});
			
			student_list_2 = student_list.filter(function(item, index){
				if(item.use_exam == true && item.pass_result == true && item.registration_type == "NEW"){
					return true;
				}
			});
			
		}else if(order_type == "B"){
			student_list_1 = student_list.filter(function(item, index){
				if(item.use_exam == true && item.pass_result == true && item.registration_type == "NEW"){
					return true;
				}
			});
			
			student_list_2 = student_list.filter(function(item, index){
				if(item.use_exam == true && item.pass_result == true && item.registration_type != "NEW"){
					return true;
				}
			});
		}else if(order_type == "C"){
			student_list_1 = student_list.filter(function(item, index){
				if(item.use_exam == true && item.pass_result == true && item.chamgang_yn == "Y"){
					return true;
				}
			});
			
			student_list_2 = student_list.filter(function(item, index){
				if(item.use_exam == true && item.pass_result == true && item.chamgang_yn != "Y"){
					return true;
				}
			});
		}else if(order_type == "D"){
			student_list_1 = student_list.filter(function(item, index){
				if(item.use_exam == true && item.pass_result == true && item.chamgang_yn != "Y"){
					return true;
				}
			});
			
			student_list_2 = student_list.filter(function(item, index){
				if(item.use_exam == true && item.pass_result == true && item.chamgang_yn == "Y"){
					return true;
				}
			});
		}else{
			student_list_1 = student_list.filter(function(item, index){
				if(item.use_exam == true && item.pass_result == true){
					return true;
				}
			});
			
			student_list_2 = Array();
			
		}
		
		random_student_list = Array();
		for(var i=0; i<student_list_1.length; i++){
			random_student_list.push(student_list_1[i]);
		}
		for(var i=0; i<student_list_2.length; i++){
			random_student_list.push(student_list_2[i]);
		}
		
		if(random_student_list.length == 0){
			alert("Random Mode를 사용할 수 없습니다.");
			$("#modal-random-mode").modal("hide");
			return;
		}
		
		randomeShuffleArray(random_student_list);
	}
	
	
	random_student_idx = 0;
	random_student_count = random_student_list.length;
	
	course_enrollment_id = random_student_list[random_student_idx].course_enrollment_id;
	
	$("#student_"+course_enrollment_id).removeClass("bg-grey-lighter");
	$("#student_"+course_enrollment_id).removeClass("bg-green-lighter");
	$("#student_"+course_enrollment_id).removeClass("bg-red-lighter");
	$("#student_"+course_enrollment_id).addClass("bg-blue-lighter");
	
	
	var mode_random_student_name = random_student_list[random_student_idx].student_name+" ";
	if(random_student_list[random_student_idx].registration_type == "NEW")
	{
		mode_random_student_name += '(신규)';
	}else{
		mode_random_student_name += '(기존)';
	}
	
	var mode_random_schedule_name = $("#search_schedule_id option:checked").text();
	
	var mode_random_result_count = cfmNvl1(random_student_list[random_student_idx].result).length + 1
	
	$("#mode_random_student_name").html(mode_random_student_name);
	$("#mode_random_schedule_name").html(mode_random_schedule_name);
	$("#mode_random_result_count").html(mode_random_result_count+"회차");
	
		
	var next_id = random_student_idx + 1;
	var max_count = random_student_list.length;
	if(next_id == max_count){
		$("#btn_random_next").html("다음<br>(없음)");
	}else{
		$("#btn_random_next").html("다음<br>("+random_student_list[next_id].student_name+")");
	}
	
}

function next_random_mode()
{
	//현재학생을 변경한다.
	student_idx = student_list.findIndex(i => i.course_enrollment_id == course_enrollment_id); 
	$("#student_"+course_enrollment_id).removeClass("bg-blue-lighter");
	$("#student_"+course_enrollment_id).removeClass("bg-green-lighter");
	$("#student_"+course_enrollment_id).removeClass("bg-red-lighter");
	$("#student_"+course_enrollment_id).removeClass("bg-grey-lighter");
	
	if(student_list[student_idx].is_exam)
	{
		if(student_list[student_idx].pass_result){
			$("#student_"+course_enrollment_id).addClass("bg-green-lighter");
		}else{
			$("#student_"+course_enrollment_id).addClass("bg-red-lighter");
		}
	}else{
		$("#student_"+course_enrollment_id).addClass("bg-grey-lighter");
	}
	
	random_student_idx++;
	if(random_student_idx == random_student_count)
	{
		alert("한바퀴 시험 끝~! ^^");
		int_random_mode();
		/*
		if(confirm("시험 한바퀴 모두 진행하였습니다.\n다음 바퀴를 진행하시겠습니까?")){
			int_random_mode();
			
		}
		else{
			random_student_idx--;
			close_random_mode();
		}
		*/
		
	}else{
		course_enrollment_id = random_student_list[random_student_idx].course_enrollment_id;
		
		$("#student_"+course_enrollment_id).removeClass("bg-grey-lighter");
		$("#student_"+course_enrollment_id).removeClass("bg-green-lighter");
		$("#student_"+course_enrollment_id).removeClass("bg-red-lighter");
		$("#student_"+course_enrollment_id).addClass("bg-blue-lighter");
		
		
		var mode_random_student_name = random_student_list[random_student_idx].student_name+" ";
		if(random_student_list[random_student_idx].registration_type == "NEW")
		{
			mode_random_student_name += '(신규)';
		}else{
			mode_random_student_name += '(기존)';
		}
		
		var mode_random_schedule_name = $("#search_schedule_id option:checked").text();
		
		var mode_random_result_count = cfmNvl1(random_student_list[random_student_idx].result).length + 1
		
		$("#mode_random_student_name").html(mode_random_student_name);
		$("#mode_random_schedule_name").html(mode_random_schedule_name);
		$("#mode_random_result_count").html(mode_random_result_count+"회차");
		var next_id = random_student_idx + 1;
		var max_count = random_student_list.length;
		if(next_id == max_count){
			$("#btn_random_next").html("다음<br>(없음)");
		}else{
			$("#btn_random_next").html("다음<br>("+random_student_list[next_id].student_name+")");
		}
	}
}
function close_random_mode()
{
	$("#student_"+course_enrollment_id).removeClass("bg-blue-lighter");
	if(random_student_list[random_student_idx].is_exam)
	{
		if(random_student_list[random_student_idx].pass_result){
			$("#student_"+course_enrollment_id).addClass("bg-green-lighter");
		}else{
			$("#student_"+course_enrollment_id).addClass("bg-red-lighter");
		}
	}else{
		$("#student_"+course_enrollment_id).addClass("bg-grey-lighter");
	}
	
	$("#btn_mode_select").removeClass("btn-white");
	$("#btn_mode_select").addClass("btn-danger");
	$("#btn_mode_random").removeClass("btn-danger");
	$("#btn_mode_random").addClass("btn-white");
	
	$("#modal-random-mode").modal("hide");
}

function randomeShuffleArray(array){
	for(var i=array.length-1; i>0; i--){
		var j = Math.floor(Math.random() *(i+1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp
	}	
}