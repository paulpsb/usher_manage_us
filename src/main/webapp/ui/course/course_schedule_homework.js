var cur_date;
var course_id = "";
var course_name = "";
var section = "";

var array_voca_interval_count = [5,10,15,20,30,40,50,60,70,80,90,100];
var array_voca_interval_time  = [2,4,5,7,10,14,17,20,23,27,30,34];

/*
* 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	course_id = $("#course_id").val();
	course_name = $("#course_name").val();
	section = $("#section").val();

	search_section();
	search_semester();
	$(window).resize(resizeContents);
    
	resizeContents();
	if(!course_name){
		showCourses("N");
	}else{
		$("#select_course_name").html(course_name);
	}
});

/*
 * 설명 : 화면 사이즈 변경시
 */
function resizeContents()
{
	//현재의 사이즈를 찾는다.
	var window_size = $(window).height();

	$("#div_schedule").height(window_size - 345);
	//$("#div_problem").height(window_size - 375);
}

/*
 * 설명 : 년/월 조회
 */
function search_section()
{

	$.ajax({
		type : "POST",
		url : "/common/getPracticeSectionList.do",
		data:{
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				var selected = "";
				if(section == data[i].section) selected = "selected";
				vHtml += "<option value='"+data[i].id+"' "+selected+">"+data[i].section+"</option>";
			}
			
			$("#search_section").html(vHtml);
			
			$('#search_section').change(function(e){
				form_search();
				search_book();
			});
			
			if(course_name){
				form_search();
				search_book();
			}else{
				search_book();
			}
			

		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

/*
 * 설명 : 년/월 조회
 */
function search_book()
{

	$.ajax({
		type : "POST",
		url : "/common/getPracticeBookList.do",
		data:{
			practice_section_id:$("#search_section").val()
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				vHtml += "<option value='"+data[i].id+"'>"+data[i].book+"</option>";
			}
			
			$("#search_book").html(vHtml);
			
			$('#search_book').change(function(e){
				search_volume();
			});
			
			search_volume();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

/*
 * 설명 : 년/월 조회
 */
function search_volume()
{

	$.ajax({
		type : "POST",
		url : "/common/getPracticeVolumeList.do",
		data:{
			practice_section_id:$("#search_section").val(),
			practice_book_id:$("#search_book").val()
		},
		success:function(data){
			sectionList = data;
			var vHtml = "<option value='0'>볼륨</option>";
			for(var i=0; i<data.length; i++){
				vHtml += "<option value='"+data[i].id+"'>"+data[i].volume+"</option>";
			}
			
			$("#search_volume").html(vHtml);
			$('#search_volume').change(function(e){
				search_problem();
			});
			search_problem();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

/*
 * 설명 : 년/월 조회
 */
function search_problem()
{

	var section1 = "";
	var book1    = "";
	var volume1  = "";
	
	if($('#search_section').val() != "0")
	{
		section1 = $("#search_section option:checked").text();
	}

	if($('#search_book').val() != "0")
	{
		book1 = $("#search_book option:checked").text();
	}
	
	if($('#search_volume').val() != "0")
	{
		volume1 = $("#search_volume option:checked").text();
	}
	
	$.ajax({
		type : "POST",
		url : "/subject/getProblemList.do",
		data:{
			section:section1,
			book:book1,
			volume:volume1
		},
		success:function(data){
			//지문에 대해서 만든다.
			var vHtml = "";
			var problemList = data;
			for(var i=0; i<problemList.length; i++)
			{
				var vTitle = "";
				if((section1 == "SPEAKING" || section1 == "WRITING") && book1 != "암기시험")
				{
					vTitle += problemList[i].article
					if(book1 == "지문과 관련없는 OX시험들"){
						vHtml += '<div class="col-3" style="margin-bottom:5px">';
						vHtml += '	<div class="draggable section-drag">'+vTitle;
						vHtml += '		<input type="hidden" name="total_score" value="'+problemList[i].total_score+'">';	
						vHtml += '		<input type="hidden" name="practice_problem_id" value="'+problemList[i].id+'">';	
						vHtml += '	</div>';
						vHtml += '</div>';
					}else{
						vHtml += '<div class="col-1" style="margin-bottom:5px">';
						vHtml += '	<div class="draggable section-drag">'+vTitle;
						vHtml += '		<input type="hidden" name="total_score" value="'+problemList[i].total_score+'">';	
						vHtml += '		<input type="hidden" name="practice_problem_id" value="'+problemList[i].id+'">';	
						vHtml += '	</div>';
						vHtml += '</div>';
					}
				}else{
					if(book1 == "지문과 관련없는 OX시험들"){
						vTitle = problemList[i].article;
					}else if(book1 == "암기시험"){
						if(problemList[i].volume){
							vTitle += ' '+ problemList[i].volume
						}
						if(problemList[i].group){
							vTitle += ' '+ problemList[i].group
						}
						if(problemList[i].article){
							vTitle += ' '+ problemList[i].article
						}
						if(problemList[i].short_title){
							vTitle += ' : '+ problemList[i].short_title
						}
					}else{
						vTitle = problemList[i].book;
						if(problemList[i].volume){
							vTitle += ' '+ problemList[i].volume
						}
						if(problemList[i].group){
							vTitle += ' '+ problemList[i].group
						}
						if(problemList[i].article){
							vTitle += ' '+ problemList[i].article
						}
					}
					vHtml += '<div class="col-4" style="margin-bottom:5px">';
					vHtml += '	<div class="draggable section-drag">'+vTitle;
					vHtml += '		<input type="hidden" name="total_score" value="'+problemList[i].total_score+'">';	
					vHtml += '		<input type="hidden" name="practice_problem_id" value="'+problemList[i].id+'">';	
					vHtml += '	</div>';
					vHtml += '</div>';
				}
			}
			
			$("#problemList").html(vHtml);
			initEvent();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
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
			courseList = data.courseList;
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
					vHtml += '		<a href="javascript:form_sitemap_select(\''+vTitle+'\',\''+arr_course[j].id+'\',\''+arr_course[j].schedule+'\')"><h5>'+arr_course[j].name+'반</h5></a>';
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


function form_sitemap_select(v_title, v_course_id, v_schedule, v_cur_date)
{
	cur_date = v_cur_date;
	schedule = v_schedule; 
	course_id = v_course_id;
	course_name = v_title;
	
	$("#select_course_name").html(v_title);
	/*
	$('#select_courses').hide(); 
	$('#mask').hide(); 
	$('#mask').remove();
	*/
	$('#select_courses').modal("hide"); 
	create_schedule();
	form_search();
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

function form_search()
{
	$.ajax({
		type : "POST",
		url : "/course/getScheduleHomeworkList.do",
		data:{
			course_id:course_id,
			section:$("#search_section option:checked").text()
		},
		success:function(data){
			var courseInfo = data.courseInfo;
			
			$("#select_course_title").html("과제 ("+courseInfo.semester_date+")");
			$("#select_course_name").html(courseInfo.course_group_name+" "+courseInfo.name+"반(강사 : "+courseInfo.instructor_name+" / 매니저 : "+courseInfo.manager_name+" / 강의실 : "+courseInfo.building_name+" "+courseInfo.room_no+"강의실)");

			cur_date = courseInfo.cur_date;
			
			var typeList = data.typeList;
			var arr_date = courseInfo.schedule.split(",");
			var scheduleList = data.scheduleList;
			var width = 90/typeList.length;
			var vHtml = "";
			vHtml += '<colgroup>';
			vHtml += '	<col style="width:10%;" />';
			for(var i=0; i<typeList.length; i++)
			{
				vHtml += '	<col style="width:'+width+'%;" />';
			}
			vHtml += '</colgroup>';
			vHtml += '<thead>';
			vHtml += '	<tr>';
			vHtml += '		<th class="redips-mark text-center bg-black-transparent-5 text-white">일정</th>';
			for(var i=0; i<typeList.length; i++)
			{
				vHtml += '		<th class="redips-mark text-center bg-black-transparent-5 text-white">'+typeList[i].practice_name+'</th>';
			}
			vHtml += '	</tr>';
			vHtml += '</thead>';
			vHtml += '<tbody>';
			for(var i=0; i<arr_date.length; i++)
			{
				vHtml += '	<tr>';
				vHtml += '		<th class="redips-mark text-center bg-black-transparent-5 text-white" >'+arr_date[i]+'</th>';
				for(var j=0; j<typeList.length; j++)
				{
					var vDate = arr_date[i];
					var vPracticeType = typeList[j].practice_type;
					var vPracticeName = typeList[j].practice_name;
					var vParagraphUse = cfmNvl1(typeList[j].paragraph_use);
					var vTypeComment  = cfmNvl1(typeList[j].type_comment);
					var arr_schedule = scheduleList.filter(function(item, index){
						if(item.date == vDate && item.practice_type == vPracticeType && item.course_enrollment_id == 0){
							return true;
						}
					});
					if(cur_date <= vDate){
						vHtml += '<td class="droppable text-center bg-white">';
					}else{
						//vHtml += '<td class="text-center bg-white">';
						vHtml += '<td class="droppable text-center bg-white">';
					}
					
					vHtml += '	<h5>'+vPracticeName+'</h5>';
					vHtml += '	<input type="hidden" class="practice_type" value="'+vPracticeType+'">';
					vHtml += '	<input type="hidden" class="practice_name" value="'+vPracticeName+'">';
					vHtml += '	<input type="hidden" class="schedule_date" value="'+vDate+'">';
					vHtml += '	<input type="hidden" class="paragraph_use" value="'+vParagraphUse+'">';
					vHtml += '	<input type="hidden" class="type_comment" value="'+vTypeComment+'">';
					vHtml += '	<input type="hidden" class="course_enrollment_id" value="0">';
					vHtml += '	<input type="hidden" class="test_type" value="Y">';
					
					for(var k=0; k<arr_schedule.length; k++)
					{
						var vTitle = '';
						if(arr_schedule[k].book != "암기시험") vTitle = arr_schedule[k].book;
						
						if(arr_schedule[k].volume){
							vTitle += ' '+ arr_schedule[k].volume;
						}
						if(arr_schedule[k].group){
							vTitle += ' '+ arr_schedule[k].group;
						}
						if(arr_schedule[k].article){
							vTitle += ' '+ arr_schedule[k].article;
						}
						
						if(arr_schedule[k].book == "암기시험") vTitle += ' : '+ arr_schedule[k].short_title;
						
						vHtml += '	<div class="section-value">';
						vHtml += '		<input type="hidden" id="schedule_id" name="schedule_id" value="'+arr_schedule[k].id+'">';
						vHtml += 	'	<input type="hidden" id="schedule_date" name="schedule_date" value="'+arr_schedule[k].date+'">';
						vHtml += '		<input type="hidden" id="old_start_paragraph" name="old_start_paragraph" value="'+arr_schedule[k].start_paragraph+'">';
						vHtml += '		<input type="hidden" id="old_end_paragraph" name="old_end_paragraph" value="'+arr_schedule[k].end_paragraph+'">';
						vHtml += '		<input type="hidden" id="old_exam_time" name="old_exam_time" value="'+arr_schedule[k].exam_time+'">';
						vHtml += '		<input type="hidden" id="old_exam_count" name="old_exam_count" value="'+arr_schedule[k].exam_count+'">';
						vHtml += '		<input type="hidden" id="old_test_type" name="old_test_type" value="'+arr_schedule[k].test_type+'">';
						vHtml += '		<p style="margin-bottom:0px;">'+vTitle+'</p>';
						var select_display = "";
						
						//시험시간
						if(vPracticeType == "VOCA_INTERVAL"){
							vHtml += '		암기 : <select id="exam_time" name="exam_time">';
							for(var t=0; t<array_voca_interval_time.length; t++)
							{
								var v_time = array_voca_interval_time[t];
								var selected = "";
								if(v_time == arr_schedule[k].exam_time) selected = "selected";
								vHtml += '			<option value="'+v_time+'" '+selected+'>'+v_time+'분 암기</option>';
							}
							vHtml += '		</select><br>';
						}else{
							vHtml += '		시험시간 : <select id="exam_time" name="exam_time">';
							for(var t=1; t<=60; t++)
							{
								var selected = "";
								if(t == arr_schedule[k].exam_time) selected = "selected";
								vHtml += '			<option value="'+t+'" '+selected+'>'+t+'분</option>';
							}
							vHtml += '		</select><br>';
							
						}
						
						//시험횟수
						if(vPracticeType == "TENTIMES"){
							vHtml += '		시험횟수 : <select id="exam_count" name="exam_count">';
							for(var t=1; t<=10; t++)
							{
								var selected = "";
								if(t == arr_schedule[k].exam_count) selected = "selected";
								vHtml += '			<option value="'+t+'" '+selected+'>'+t+'회</option>';
							}
							vHtml += '		</select><br>';
						}else if(vPracticeType == "VOCA_INTERVAL"){
							vHtml += '		시험단위 : <select id="exam_count" name="exam_count">';
							for(var t=0; t<array_voca_interval_count.length; t++)
							{
								var t_count = array_voca_interval_count[t];
								var selected = "";
								if(t_count == arr_schedule[k].exam_count) selected = "selected";
								vHtml += '			<option value="'+t_count+'" '+selected+'>'+t_count+'개 단위</option>';
							}
							vHtml += '		</select>';
						}else{
							vHtml += '		<select id="exam_count" name="exam_count" style="display:none">';
							vHtml += '			<option value="1">1회</option>';
							vHtml += '		</select>';
						}
						
						if(vParagraphUse != "Y"){
							select_display = "style='display:none;'";
						}
						vHtml += '	<div '+select_display+'>';	
						vHtml += '		문단 : <select id="start_paragraph" name="start_paragraph">';
						for(var t=0; t<=10; t++)
						{
							var selected = "";
							if(t == arr_schedule[k].start_paragraph) selected = "selected";
							if(t == 0){
								vHtml += '			<option value="'+t+'" '+selected+'>전체</option>';
							}else{
								vHtml += '			<option value="'+t+'" '+selected+'>'+t+'</option>';
							}
							
						}
						vHtml += '		</select> ~ ';
						vHtml += '		<select id="end_paragraph" name="end_paragraph">';
						for(var t=0; t<=10; t++)
						{
							var selected = "";
							if(t == arr_schedule[k].end_paragraph) selected = "selected";
							if(t == 0){
								vHtml += '			<option value="'+t+'" '+selected+'>전체</option>';
							}else{
								vHtml += '			<option value="'+t+'" '+selected+'>'+t+'</option>';
							}
							
						}
						vHtml += '		</select>';
						vHtml += '	</div>';
						
						
						vHtml += '	<div>';
						vHtml += '	구분 : <select name="test_type">';
						var selected = "";
						if(arr_schedule[k].test_type == "ALL") selected = "selected";
						vHtml += '			<option value="ALL">전체 학생</option>';
						selected = "";
						if(arr_schedule[k].test_type == "FAIL") selected = "selected";
						vHtml += '			<option value="FAIL">불합격 학생</option>';
						vHtml += '		</select>';
						vHtml += '</div>';
						
						
						if(vParagraphUse != "Y"){
							vHtml += '		<p style="margin-bottom:0px;" class="text-red">문단별 시험불가</p>';
						}
						vHtml += '		<p style="margin-bottom:0px;">'+vTypeComment+'</p>';
						vHtml += '	</div>';
					}
					vHtml += '</td>';
				}
				vHtml += '	</tr>';
			}
			
			vHtml += '</tbody>';
			$("#scheduleTableList").html(vHtml);
			initEvent();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}
function initEvent()
{
	$(".section-drog").unbind();
	$(".section-value").unbind();


	$(".draggable").draggable({
		revert: true,
		zIndex: 9900
	});
 
	$(".droppable").droppable({
		drop: function (event, ui) {
			var vHtml = "";
			var vScheduleDate = $(this).find(".schedule_date").val();
			var vPracticeType = $(this).find(".practice_type").val();
			var vPracticeName = $(this).find(".practice_name").val();
			var vParagraphUse = $(this).find(".paragraph_use").val();
			var vTypeComment  = $(this).find(".type_comment").val();
			var vCourseEnrollmentId   = $(this).find(".course_enrollment_id").val();
			var vTestType     = $(this).find(".test_type").val();
			
			var vSection = $("#search_section option:checked").text();
			var vProblem = $("#search_book option:checked").text();
			
			
			vHtml += '<div class="section-drog">';
			vHtml += '	<input type="hidden" name="schedule_date" value="'+vScheduleDate+'">';
			vHtml += '	<input type="hidden" name="practice_type" value="'+vPracticeType+'">';
			vHtml += '	<input type="hidden" name="practice_name" value="'+vPracticeName+'">';
			vHtml += '	<input type="hidden" name="course_enrollment_id" value="'+vCourseEnrollmentId+'">';
			if(vSection == "SPEAKING" || vSection == "WRITING")
			{
				vHtml += '	<p style="margin-bottom:0px;">'+vProblem+' '+ui.draggable.html()+'</p>';
			}else{
				vHtml += '	<p style="margin-bottom:0px;">'+ui.draggable.html()+'</p>';
			}
			
			//시험시간
			var vExamTime = 10;
			var vExamCount = 15;
			if(vPracticeType=="MOCK_TEST")
			{
				if(vSection == "GRAMMAR")
				{
					vExamTime = 25;
				}else if(vSection == "READING"){
					vExamTime = 20;
				}else if(vSection == "LISTENING"){
					vExamTime = 5;
				}
			}
			
			if(vPracticeType=="VOCA_INTERVAL")
			{
				vExamTime = 5;
			}
			
			if(vPracticeType == "VOCA_INTERVAL"){
				vHtml += '		암기 : <select id="exam_time" name="exam_time">';
				for(var t=0; t<array_voca_interval_time.length; t++)
				{
					var v_time = array_voca_interval_time[t];
					var selected = "";
					if(v_time == vExamTime) selected = "selected";
					vHtml += '			<option value="'+v_time+'" '+selected+'>'+v_time+'분 암기</option>';
				}
				vHtml += '		</select><br>';
			}else{
				vHtml += '		시험시간 : <select id="exam_time" name="exam_time">';
				for(var t=1; t<=60; t++)
				{
					var selected = "";
					if(t == vExamTime) selected = "selected";
					vHtml += '			<option value="'+t+'" '+selected+'>'+t+'분</option>';
				}
				vHtml += '		</select><br>';
				
			}
			
			//시험횟수
			if(vPracticeType == "TENTIMES"){
				vHtml += '		시험횟수 : <select id="exam_count" name="exam_count">';
				for(var t=1; t<=10; t++)
				{
					var selected = "";
					vHtml += '			<option value="'+t+'" '+selected+'>'+t+'회</option>';
				}
				vHtml += '		</select><br>';
			}else if(vPracticeType == "VOCA_INTERVAL"){
				vHtml += '		시험단위 : <select id="exam_count" name="exam_count">';
				for(var t=0; t<array_voca_interval_count.length; t++)
				{
					var t_count = array_voca_interval_count[t];
					var selected = "";
					if(t_count == vExamCount) selected = "selected";
					vHtml += '			<option value="'+t_count+'" '+selected+'>'+t_count+'개 단위</option>';
				}
				vHtml += '		</select>';
			}else{
				vHtml += '		<select id="exam_count" name="exam_count" style="display:none">';
				vHtml += '			<option value="1">1회</option>';
				vHtml += '		</select>';
			}
			
			//문단
			var select_display = "";
			if(vParagraphUse != "Y"){
				select_display = "style='display:none;'";
			}
			vHtml += '	<div '+select_display+'>';
			vHtml += '	문단 : <select name="start_paragraph">';
			for(var t=0; t<=10; t++)
			{
				if(t == 0){
					vHtml += '		<option value="'+t+'">전체</option>';
				}else{
					vHtml += '		<option value="'+t+'">'+t+'</option>';
				}
				
			}
			vHtml += '		</select> ~ ';
			vHtml += '		<select name="end_paragraph">';
			for(var t=0; t<=10; t++)
			{
				if(t == 0){
					vHtml += '			<option value="'+t+'">전체</option>';
				}else{
					vHtml += '			<option value="'+t+'">'+t+'</option>';
				}
				
			}
			vHtml += '		</select><br>';
			vHtml += '</div>';
			
			//합격/불합격
			select_display = "";
			if(vCourseEnrollmentId > 0){
				select_display = "style='display:none;'";
			}	
			
			vHtml += '	<div '+select_display+'>';
			vHtml += '	구분 : <select name="test_type">';
			vHtml += '			<option value="ALL">전체 학생</option>';
			vHtml += '			<option value="FAIL">불합격 학생</option>';
			vHtml += '		</select>';
			vHtml += '</div>';
			
			if(vParagraphUse != "Y"){
				vHtml += '		<p style="margin-bottom:0px;" class="text-red">문단별 시험불가</p>';
			}
			vHtml += '		<p style="margin-bottom:0px;">'+vTypeComment+'</p>';	
			vHtml += '</div>';
			$(this).append(vHtml);
			initEvent();
		}
	})	
	
	$(".section-value").dblclick(function(){
		var vId = $(this).find("#schedule_id").val();
		var vDate = $(this).find("#schedule_date").val();
		
		if(vDate < cur_date){
			alert("이전일정은 삭제하실 수 없습니다.");
			return;
		}
		
		if(confirm("삭제하시겠습니까?")){
			var $_schedule = $(this);
			 $.ajax({
				type : "POST",
				url : "/course/updateScheduleHomework.do",
				data:{
					id:vId,
					status:"INACTIVE"
				},
				success:function(data){
					$_schedule.remove();
				},
				error:function(event){				
					alert("잠시후 다시 시도 바랍니다.");
				}
			});	
		}
	})
	
	$(".section-drog").dblclick(function(){
		$(this).remove();
	})
}

function form_save()
{
	$("#btn_save").hide();
	var arr_schedule = Array();
	$(".section-drog").each(function(index) {
		var objSchedule = Object();
		objSchedule.status = "ACTIVE";
		objSchedule.section = $("#search_section option:checked").text();
		objSchedule.practice_type = $(this).find("input[name='practice_type']").val();
		objSchedule.name = $(this).find("input[name='practice_name']").val();
		objSchedule.date = $(this).find("input[name='schedule_date']").val();
		objSchedule.course_id = course_id;
		objSchedule.course_enrollment_id =$(this).find("input[name='course_enrollment_id']").val();
		objSchedule.practice_problem_id =$(this).find("input[name='practice_problem_id']").val();
		objSchedule.start_paragraph = $(this).find("select[name='start_paragraph']").val();
		objSchedule.end_paragraph = $(this).find("select[name='end_paragraph']").val();
		objSchedule.exam_time = $(this).find("select[name='exam_time']").val();
		objSchedule.exam_count = $(this).find("select[name='exam_count']").val();
		objSchedule.test_type = $(this).find("select[name='test_type']").val();
		
		arr_schedule.push(objSchedule);
	});
	
	var arr_schedule_paragraph = Array();
	$(".section-value").each(function(index) {
		
		var schedule_id = $(this).find("input[name='schedule_id']").val();
		var old_start_paragraph = $(this).find("input[name='old_start_paragraph']").val();
		var old_end_paragraph = $(this).find("input[name='old_end_paragraph']").val();
		var start_paragraph = $(this).find("select[name='start_paragraph']").val();
		var end_paragraph = $(this).find("select[name='end_paragraph']").val();
		
		var old_exam_time = $(this).find("input[name='old_exam_time']").val();
		var exam_time = $(this).find("select[name='exam_time']").val();

		var old_exam_count = $(this).find("input[name='old_exam_count']").val();
		var exam_count = $(this).find("select[name='exam_count']").val();

		var old_test_type = $(this).find("input[name='old_test_type']").val();
		var test_type = $(this).find("select[name='test_type']").val();

		if(old_start_paragraph != start_paragraph || old_end_paragraph != end_paragraph || old_exam_time != exam_time || old_exam_count != exam_count || old_test_type != test_type)
		{
			var objScheduleParagraph = Object();
			objScheduleParagraph.schedule_id = schedule_id;
			objScheduleParagraph.start_paragraph = start_paragraph;
			objScheduleParagraph.end_paragraph = end_paragraph;
			objScheduleParagraph.exam_time = exam_time;
			objScheduleParagraph.exam_count = exam_count;
			objScheduleParagraph.test_type = test_type;
			arr_schedule_paragraph.push(objScheduleParagraph);
		}
	});
	 $.ajax({
			type : "POST",
			url : "/course/saveScheduleHomework.do",
			data:{
				data_value:JSON.stringify(arr_schedule),
				data_value1:JSON.stringify(arr_schedule_paragraph)
			},
			success:function(data){
				alert("저장하였습니다.");
				$("#btn_save").show();
				form_search();
			},
			error:function(event){	
				$("#btn_save").show();
				alert("잠시후 다시 시도 바랍니다.");
			}
		});	
}

function go_sylabus()
{
	location.href="/course/course_schedule.do?course_id="+course_id+"&&section="+$("#search_section option:checked").text();
}

function go_homework_detail()
{
	location.href="/course/course_schedule_homework_detail.do?course_id="+course_id+"&&section="+$("#search_section option:checked").text();
}