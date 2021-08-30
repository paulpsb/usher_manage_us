var v_ym = "";
var v_date = "";

var enrollmentList;
var current_idx = -1;
var course_id;
/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	$(window).resize(resizeContents);
    resizeContents();
    
	 var date = new Date();
	 v_ym = cfmDateChar(date,'yyyy-mm');
	 v_date = cfmDateChar(date,'yyyy-mm-dd');
	 
	$('#calendar').fullCalendar({
		header: {
			left: 'prev',
			center: 'title',
			right: 'next '
		},
		droppable: false, // this allows things to be dropped onto the calendar
		selectable: true,
		selectHelper: true,
		select: function(start, end) {
			var date = new Date(start);
			v_date = cfmDateChar(date,'yyyy-mm-dd');
			search_daliy_schedule();
		},
		editable: true,
		eventLimit: true, // allow "more" link when too many events
		eventClick:function(info){
			var date = new Date(info.start);
			v_date = cfmDateChar(date,'yyyy-mm-dd');
			search_daliy_schedule();
		},
		events: []
	});
	
    // 왼쪽 버튼을 클릭하였을 경우
    $(".fc-prev-button").click(function() {
        var date = new Date($('#calendar').fullCalendar('getDate'));
        v_ym = cfmDateChar(date,'yyyy-mm');
        search_schedule();
    });

    // 오른쪽 버튼을 클릭하였을 경우
    $(".fc-next-button").click(function() {
        var date = new Date($('#calendar').fullCalendar('getDate'));
        v_ym = cfmDateChar(date,'yyyy-mm');
        search_schedule();
    });
    search_semester();
    showCourses("N");
});

/*
 * 설명 : 화면 사이즈 변경시 문제 영역 변경
 */
function resizeContents()
{
	//현재의 사이즈를 찾는다.
	var window_size = $(window).height();
	

	$(".student_list").height(window_size-320);

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

function form_course_cancel()
{
	/*
	$('#select_courses').hide(); 
	$('#mask').hide(); 
	$('#mask').remove();
	*/
	$('#select_courses').modal("hide"); 
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
	
	search_student();
}

function search_student()
{
	$.ajax({
		type : "POST",
		url : "/enrollment/getStudentList.do",
		data:{
			id:course_id
		},
		success:function(data){
			enrollmentList = data.enrollmentList;
			current_idx = -1;
			create_student_seat();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

function change_student(idx)
{
	current_idx = idx;
	create_student_seat();
}

function create_student_seat()
{
	var vHtml1 = "";
	if(current_idx > 0)
	{
		for(var i=0; i<current_idx; i++)
		{
			vHtml1 += "<li style='padding:5px 0px'><a href='javascript:change_student("+i+")'>"+enrollmentList[i].last_name+enrollmentList[i].first_name+"("+enrollmentList[i].username+")</a></li>";
		}
	}
	$("#student_list1").html(vHtml1);
	vHtml1 = "";
	for(var i=current_idx+1; i<enrollmentList.length; i++)
	{
		vHtml1 += "<li style='padding:5px 0px'><a href='javascript:change_student("+i+")'>"+enrollmentList[i].last_name+enrollmentList[i].first_name+"("+enrollmentList[i].username+")</a></li>";
	}
	$("#student_list2").html(vHtml1);
	
	if(current_idx < 0){
		$("#btn_prev").hide();
		$("#btn_next").hide();
		$("#select_student").html("&nbsp;");
	}else{
		if(current_idx == 0)
		{
			$("#btn_prev").hide();
		}else{
			$("#btn_prev").show();
		}
		
		if(current_idx == (enrollmentList.length-1))
		{
			$("#btn_next").hide();
		}else{
			$("#btn_next").show();
		}
		
		var btn_html = '<button id="btn_prev" type="button" class="btn btn-white btn-md m-r-5 m-b-5" onclick="student_login(\''+enrollmentList[current_idx].username+'\','+enrollmentList[current_idx].course_enrollment_id+');">학생로그인</button>';
		$("#select_student").html(enrollmentList[current_idx].last_name+enrollmentList[current_idx].first_name+"("+(current_idx+1)+"/"+enrollmentList.length+")  "+btn_html);
	}
	search_schedule();
	search_daliy_schedule();
}

function student_prev()
{
	current_idx--;
	create_student_seat();
}

function student_next()
{
	current_idx++;
	create_student_seat();
}

function search_schedule()
{
	$('#calendar').fullCalendar("removeEvents");
	if(current_idx < 0) return;
	
	$.ajax({
		type : "POST",
		url : "/enrollment/getMonthlyResultList.do",
		data : {
			date : v_ym,
			student_id : enrollmentList[current_idx].student_id
		},
		dataType : "json",
		success:function(data){ 
			var arr_data = Array();
			for(var i=0; i<data.length; i++)
			{
				var data_obj = Object();
				//data_obj.title = constant.PRACTICE_TYPES[data[i].practice_type]+" "+data[i].score;
				data_obj.title = data[i].practice_type+" "+data[i].score;
				
				data_obj.start = data[i].date;
				data_obj.color = COLOR_BLUE;
				data_obj.id = data[i].id;
				arr_data.push(data_obj);
			}

			if(arr_data.length > 0){
				$('#calendar').fullCalendar("addEventSource", arr_data);
			}
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function search_daliy_schedule()
{
	$("#dailyTitle").html("&nbsp;");
	$("#dailyList").html("");
	if(current_idx < 0) return;
	if(!v_date) return;
	$("#dailyTitle").html(cfmDateFormat(v_date, "K")+"의 나");
	
	$.ajax({
		type : "POST",
		url : "/enrollment/getDailyResultList.do",
		data:{
			date:v_date,
			student_id : enrollmentList[current_idx].student_id
		},
		success:function(data){
			var vHtml = "";
			if(data.length > 0)
			{
				for(var i=0; i<data.length; i++)
				{
					if(i==0){
						//vHtml += "<p>"+constant.SECTIONS[data[i].section]+" "+constant.PRACTICE_TYPES[data[i].practice_type]+"</p>";
						vHtml += "<p>"+data[i].practice_name+"</p>";
						vHtml += "<ul>";
					}else{
						if(data[i].section != data[i-1].section || data[i].practice_type != data[i-1].practice_type ){
							vHtml += "</ul>";
							vHtml += "<hr class='border-dotted' />";
							//vHtml += "<p>"+constant.SECTIONS[data[i].section]+" "+constant.PRACTICE_TYPES[data[i].practice_type]+"</p>";
							vHtml += "<p>"+data[i].practice_name+"</p>";
							vHtml += "<ul>";
						}
					}
					var isReal = "0";
					if(data[i].real){
						isReal = "1";
					}
					vHtml += "<li>";
					vHtml += "<a href='javascript:doResult(\""+data[i].section+"\",\""+data[i].practice_type+"\",\""+data[i].id+"\",\""+data[i].result_url+"\",\""+isReal+"\")'>";
					vHtml += "[";
					vHtml += data[i].book+" "+data[i].volume;
					if(data[i].article){
						vHtml += " "+data[i].article;
					}
					vHtml += "] "+data[i].score+"/"+data[i].total_score+" ("+data[i].practice_time+")";
					if(!data[i].real){
						vHtml += " - 모의시험";
					}
					
					if(data[i].real && data[i].practice_type == "VOCA"){
						vHtml += "  ("+data[i].repeat_count+" 차)";
					}
					if(data[i].pass_result){
						vHtml += "&nbsp;&nbsp;<i class='w-3 text-center fa fa-check text-110 text-blue'></i>";
					}else{
						vHtml += "&nbsp;&nbsp;<i class='w-3 text-center fa fa-times text-110 text-red'></i>";
					}
					vHtml += "</a>"
					vHtml += "</li>";
				}
				vHtml += "</ul>";
				$("#dailyList").html(vHtml);
			}else{
				$("#dailyList").html("<p>시험결과를 찾을 수 없습니다.</p>");
			}
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

function doResult(section, practice_type, practice_result_id, result_url, isReal)
{
	var exam_url = "http://exam-us.usher.co.kr/";
	var url = "";
	if(result_url){
		url = "https://study.usher.co.kr"+result_url;
	}else{
		if(practice_type == "VOCA"){
			if(isReal == "1"){
				url = exam_url + "/exam/voca/result.do?id="+practice_result_id;
			}else{
				url = exam_url + "/study/voca/result.do?id="+practice_result_id;
			}
		}else if(practice_type == "SPEECH"){
			url = exam_url + "/study/speech/result_exam.do?id="+practice_result_id;
		}else if(practice_type == "BLUEPRINT"){
			if(isReal == "1"){
				url = exam_url + "/exam/blueprint/test/result.do?id="+practice_result_id;
			}else{
				url = exam_url + "/study/blueprint/test/result.do?id="+practice_result_id;
			}
		}else if(practice_type == "PASSAGE_PHRASE"){
			if(isReal == "1"){
				url = exam_url + "/exam/passage/result.do?id="+practice_result_id;
			}else{
				url = exam_url + "/study/passage/result.do?id="+practice_result_id;
			}
		}else if(practice_type == "PASSAGE_VOCA"){
			if(isReal == "1"){
				url = exam_url + "/exam/passage/result.do?id="+practice_result_id;
			}else{
				url = exam_url + "/study/passage/result.do?id="+practice_result_id;
			}
		}else if(practice_type == "GRAMMAR_SYNTAX"){
			if(isReal == "1"){
				url = exam_url + "/exam/chain/test/result.do?id="+practice_result_id;
			}else{
				url = exam_url + "/study/chain/test/result.do?id="+practice_result_id;
			}
		}else if(section == "GRAMMAR" && practice_type == "MOCK_TEST"){
			url = exam_url + "/exam/grammar/test/review.do?id="+practice_result_id;
		}else if(section == "READING" && practice_type == "MOCK_TEST"){
			url = exam_url + "/exam/reading/test/review.do?id="+practice_result_id;
		}else if(section == "LISTENING" && practice_type == "MOCK_TEST"){
			url = exam_url + "/exam/listening/test/review.do?id="+practice_result_id;
		}
	}
	window.open(url, "exam");
}

var v_username;
var v_course_enrollment_id;
function student_login(username, course_enrollment_id)
{
	v_username = username;
	v_course_enrollment_id = course_enrollment_id;
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
						var url = exam_url + "/member/login_manage.do?username="+v_username+"&&course_enrollment_id="+v_course_enrollment_id;
						window.open(url, "student_exam");
				    }
				});
			}else{
				var exam_url = "http://exam-us.usher.co.kr/";
				//var exam_url = "http://127.0.0.1:8080/";
				var url = exam_url + "/member/login_manage.do?username="+v_username+"&&course_enrollment_id="+v_course_enrollment_id;
				window.open(url, "student_exam");
			}
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
	

}