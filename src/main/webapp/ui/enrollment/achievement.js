var course_id;
var section;
var practice_type;

var practiceLists;
var archieve_list = ["OT", "GOAL", "ALL", "VOCA"];
var archieve = {
	OT:{ name:"OT명단",code:"ot"},
	GOAL:{ name:"목표설정",code:"goal"},
	ALL:{ name:"한판보기",code:"all"},
	VOCA:{ name:"출결/단어", code:"voca"}
};

var oTable;

var monthly_list = [
	"TWELVE",
	"APPENDIX",
	"CONJUCTION",
	"FIVERULES",
	"VERBAL_BLUEPRINT",
	"IRREGULAR"
]

var monthly_list_type = [
	"GRAMMAR_TRANSLATION",
	"GRAMMAR_TRANSLATION_ACUTAL",
	"EXPLANATION"
]

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

var is_load = false;
/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	search_semester();
	showCourses("N");
});

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
	$('#select_courses').hide(); 
	$('#mask').hide(); 
	$('#mask').remove();
	
	search_section();
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

function showCourses(isCancel)
{
	if(isCancel == "Y"){
		$("#btn_cancel_course").show();
	}else{
		$("#btn_cancel_course").hide();
	}
	var maskHeight = $(document).height(); 
	var maskWidth = window.document.body.clientWidth; 
	var mask = "<div id='mask' style='position:absolute; z-index:9000; background-color:#000000; display:none; left:0; top:0;'></div>"; 
	$('body').append(mask); 
	$('#mask').css({ 'width' : maskWidth , 'height': maskHeight , 'opacity' : '0.3' }); 
	$('#mask').show(); 
	$('#select_courses').show(); 
}

function form_course_select()
{
	var course_group_name = $("#search_course_group_id option:checked").text();
	var course_name = $("#search_course_id option:checked").text();
	course_id = $("#search_course_id").val();
	$("#select_course_name").html(course_group_name+" "+course_name+"반");
	$('#select_courses').hide(); 
	$('#mask').hide(); 
	$('#mask').remove();
	
	search_section();
}

function form_course_cancel()
{
	$('#select_courses').hide(); 
	$('#mask').hide(); 
	$('#mask').remove();
}


function search_section()
{
	$.ajax({
		type : "POST",
		url : "/enrollment/getPracticeScheduleArchieveList.do",
		data:{
			course_id:course_id
		},
		success:function(data){
			var vHtml = "";
			vHtml+= '<div class="row mb-3">';
			vHtml+= '	<div class="col-12" id="section_area">';
			var nSeq = 1;
			for(var i=0; i<archieve_list.length; i++){
				var v_archieve = archieve_list[i];
				var v_archieve_name = archieve[v_archieve].name;
				
				var checked = "";
				if(i==0) checked = "checked";
				vHtml += '<input type="radio" class="css-input-radio-checkbox" name="search_section" id="search_section_'+nSeq+'" value="'+v_archieve+'" '+checked+'>';
				vHtml += '<label class="css-input-radio-checkbox-label" for="search_section_'+nSeq+'">'+v_archieve_name+'</label>';
				nSeq++;
			}
			for(var i=0; i<data.length; i++){
				vHtml += '<input type="radio" class="css-input-radio-checkbox" name="search_section" id="search_section_'+nSeq+'" value="'+data[i].section+'">';
				vHtml += '<label class="css-input-radio-checkbox-label" for="search_section_'+nSeq+'">'+data[i].section+'</label>';
				nSeq++;
			}
			vHtml+= '	</div>';
			vHtml+= '</div>';
			vHtml+= '<div class="row mb-3">';
			vHtml+= '	<div class="col-12" id="practice_area">';
			vHtml+= '	</div>';
			vHtml+= '</div>';
			$("#search_archeive").html(vHtml);
			
			
			$("input[name='search_section']").click(function(){
				search_practice();
			});
			
			search_practice();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

function search_practice()
{
	section = $("input[name='search_section']:checked").val();
	if(archieve[section]){
		$("#practice_area").html("");
		create_achievement(archieve[section].code);
	}else{
		$.ajax({
			type : "POST",
			url : "/enrollment/getPracticeScheduleArchievePracticeTypeList.do",
			data:{
				section:section,
				course_id:course_id
			},
			success:function(data){
				practiceLists = data;
				var vHtml = "";
				var nSeq = 1;
				practice_type = "practice_all";
				vHtml += '<input type="radio" class="css-input-radio-checkbox" name="search_practice" id="search_practice_0" value="practice_all" checked>';
				vHtml += '<label class="css-input-radio-checkbox-label" for="search_practice_0">한판보기</label>';

				for(var i=0; i<data.length; i++){
					var checked = "";
					
					vHtml += '<input type="radio" class="css-input-radio-checkbox" name="search_practice" id="search_practice_'+nSeq+'" value="'+data[i].practice_type+'" '+checked+'>';
					vHtml += '<label class="css-input-radio-checkbox-label" for="search_practice_'+nSeq+'">'+data[i].practice_name+'</label>';
					nSeq++;
				}
				$("#practice_area").html(vHtml);
				
				
				$("input[name='search_practice']").click(function(){
					practice_type = $("input[name='search_practice']:checked").val();
					
					create_achievement("");
				});
				
				create_achievement("");
			},
			error:function(event){				
				alert("잠시후 다시 시도 바랍니다.");
			}
		});
	}
}


function create_achievement(gubun)
{
	var achievement_code = "achievement_"+gubun;
	if(practice_type == "practice_all"){
		achievement_code = "achievement_practice_all";
	}else{
		if(!gubun){
			var p_idx = practiceLists.findIndex(t => t.practice_type == practice_type);
			var program_use = practiceLists[p_idx].program_use;
			
			if(program_use == "Y"){
				if(practice_type == "PASSAGE"){
					achievement_code = "achievement_program_passage";
				}else if(practice_type == "BLUEPRINT"){
					achievement_code = "achievement_program_monthly";
				}else{
					achievement_code = "achievement_program";
				}
			}else{
				if(monthly_list.indexOf(practice_type) >= 0){
					achievement_code = "achievement_ox_monthly";
				}else{
					if(monthly_list_type.indexOf(practice_type) >= 0){
						achievement_code = "achievement_ox_monthly_gr";
					}else{
						achievement_code = "achievement_ox_daily";
					}
				}
			}
		}
	}
	if(!is_load){
		is_load = true;
	}else{
		//oTable.destroy();
	}
	
	//지문 화면으로 변경
	$.ajax({
		type : "POST",
		data:{
			section:section,
			practice_type:practice_type,
			orientation_code:achievement_code,
			course_id:course_id
		},
		url : "/enrollment/achievement/step.do",
		dataType : "html", //data 형식 text, html, json, xml
		success:function(data){	
			//지문 화면으로 변경
			$("#page_info").html(data);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

function student_login(username)
{
	var exam_url = "http://exam-us.usher.co.kr/";
	//var exam_url = "http://127.0.0.1:8080/";
	var url = exam_url + "/member/login_manage.do?username="+username;
	window.open(url, "student_exam");
	//alert(username);
}

function move_result(section, practice_type,course_enrollment_id, date, book, volume, group, article, end_paragraph)
{
	if(!end_paragraph) end_paragraph = 0;
	
	//지문 화면으로 변경
	$.ajax({
		type : "POST",
		data:{
			course_id:course_id,
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
			if(data.length > 0){
				if(data.length == 1){
					go_result(data[0].section, data[0].practice_type, data[0].id);
				}else{
					var vHtml = "";
					for(var i=0; i<data.length; i++)
					{
						var vTitle = "[";
						vTitle += data[i].book;
						if(data[i].volume) vTitle += ' '+data[i].volume;
						if(data[i].group) vTitle += ' '+data[i].group;
						if(data[i].article) vTitle += ' '+data[i].article;
						vTitle += "]";
						
						if(data[i].section=="GRAMMAR" && data[i].practice_type=="MOCK_TEST"){
							vTitle += ' SW1:'+data[i].score1+'/'+data[i].total_score1+', SW2:'+data[i].score2+'/'+data[i].total_score2;
						}else{
							vTitle += ' '+data[i].score+'/'+data[i].total_score;
						}
						vTitle += ' ('+data[i].date+')';
						vHtml += '<li>';
						vHtml += '<a href="javascript:go_result(\''+data[i].section+'\',\''+data[i].practice_type+'\',\''+data[i].id+'\')">';
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