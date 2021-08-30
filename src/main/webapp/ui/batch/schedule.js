var v_ym = "";

/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	$("#search_auth_username").keydown(function(key) {
		if (key.keyCode == 13) {
			auth_search();
		}
	});
	
	 var date = new Date();
	 v_ym = cfmDateChar(date,'yyyy-mm');
	
	$('#date').datepicker({
		todayHighlight: true,
		autoclose: true,
		dateFormat: "yy-mm-dd"
	});

	$('#course_date').datepicker({
		todayHighlight: true,
		autoclose: true,
		dateFormat: "yy-mm-dd"
	});

	
	$('#start_time').timepicker({
		showMeridian:false
	});
	
	$('#end_time').timepicker({
		showMeridian:false,
		minuteStep:1
	});

	$('#course_batch_grammar_start_time').timepicker({
		showMeridian:false
	});
	
	$('#course_batch_grammar_end_time').timepicker({
		showMeridian:false,
		minuteStep:1
	});

	$('#course_batch_reading_start_time').timepicker({
		showMeridian:false
	});
	
	$('#course_batch_reading_end_time').timepicker({
		showMeridian:false,
		minuteStep:1
	});

	$('#course_batch_listening_start_time').timepicker({
		showMeridian:false
	});
	
	$('#course_batch_listening_end_time').timepicker({
		showMeridian:false,
		minuteStep:1
	});
	
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
			 //var date = new Date(start);
			 //insert_schedule(cfmDateChar(date,'yyyy-mm-dd'));
		},
		editable: true,
		eventLimit: true, // allow "more" link when too many events
		eventClick:function(info){
			search_schedule_detail(info.id);
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
    search_schedule();
    
    search_semester();
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

function search_schedule()
{
	$.ajax({
		type : "POST",
		url : "/batch/getBatchScheduleMonthlyList.do",
		data : {
			date : v_ym
		},
		dataType : "json",
		success:function(data){ 
			$('#calendar').fullCalendar("removeEvents");
			var arr_data = Array();
			for(var i=0; i<data.length; i++)
			{
				var data_obj = Object();
				if(data[i].course_id > 0 )
				{
					data_obj.title = data[i].course_name;
					data_obj.color = COLOR_RED;
				}else{
					data_obj.title = data[i].start_time+" ~ "+data[i].end_time;
					data_obj.color = COLOR_BLUE;
				}
				data_obj.start = data[i].date;
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

function search_schedule_detail(id)
{
	$.ajax({
		type : "POST",
		url : "/batch/getBatchSchedule.do",
		data : {
			id : id
		},
		dataType : "json",
		success:function(data){ 
			if(data.course_id > 0)
			{
				$("#course_schedule_id").val(data.id);
				$("#course_date").val(data.date);
				$("#course_date").attr("disabled",true);
				$("#course_name").html(data.course_name);
				$("#course_batch_grammar_start_time").val(data.batch_grammar_start_time);
				$("#course_batch_grammar_end_time").val(data.batch_grammar_end_time);
				$("#course_batch_grammar_min").val(data.batch_grammar_min);
				$("#course_batch_reading_start_time").val(data.batch_reading_start_time);
				$("#course_batch_reading_end_time").val(data.batch_reading_end_time);
				$("#course_batch_reading_min").val(data.batch_reading_min);
				$("#course_batch_listening_start_time").val(data.batch_listening_start_time);
				$("#course_batch_listening_end_time").val(data.batch_listening_end_time);
				$("#course_batch_listening_min").val(data.batch_listening_min);
				if(data.batch_grammar)
				{
					$("#course_batch_grammar").prop("checked",true);
				}else{
					$("#course_batch_grammar").prop("checked",false);
				}
				
				$("#course_batch_grammar_num").val(data.batch_grammar_num);
				if(data.batch_reading)
				{
					$("#course_batch_reading").prop("checked",true);
				}else{
					$("#course_batch_reading").prop("checked",false);
				}
				$("#course_batch_reading_num").val(data.batch_reading_num);
				if(data.batch_listening)
				{
					$("#course_batch_listening").prop("checked",true);
				}else{
					$("#course_batch_listening").prop("checked",false);
				}
				$("#course_batch_listening_num").val(data.batch_listening_num);
					
				$("#course_name").show();
				$("#div_course").hide();
				 
				$("#modal-schedule-course").modal();	
				
			}else{
				$("#schedule_id").val(data.id);
				$("#date").val(data.date);
				$("#date").attr("disabled",true);
				$("#start_time").val(data.start_time);
				$("#end_time").val(data.end_time);
				if(data.batch_grammar)
				{
					$("#batch_grammar").prop("checked",true);
				}else{
					$("#batch_grammar").prop("checked",false);
				}
				$("#batch_grammar_type").val(data.batch_grammar_type);
				$("#batch_grammar_num").val(data.batch_grammar_num);
				$("#batch_grammar_min").val(data.batch_grammar_min);
				if(data.batch_reading)
				{
					$("#batch_reading").prop("checked",true);
				}else{
					$("#batch_reading").prop("checked",false);
				}

				$("#batch_reading_type").val(data.batch_reading_type);
				$("#batch_reading_num").val(data.batch_reading_num);
				$("#batch_reading_min").val(data.batch_reading_min);
				
				if(data.batch_toeic)
				{
					$("#batch_toeic").prop("checked",true);
				}else{
					$("#batch_toeic").prop("checked",false);
				}

				$("#batch_toeic_type").val(data.batch_toeic_type);
				$("#batch_toeic_num").val(data.batch_toeic_num);
				$("#batch_toeic_min").val(data.batch_toeic_min);
				
				$("#batch_adviser_id").val(data.batch_adviser_id);
				$("#batch_adviser_name").html(data.batch_adviser_name);
				
				$("#modal-schedule").modal();
				
			}

			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}
function add_schedule()
{
	 var date = new Date();
	 v_ymd = cfmDateChar(date,'yyyy-mm-dd');
	 
	$("#schedule_id").val("0");
	$("#date").val(v_ymd);
	$("#date").attr("disabled",false);
	$("#start_time").val("14:00");
	$("#end_time").val("15:30");
	$("#batch_grammar").prop("checked",true);
	$("#batch_grammar_num").val("1");
	$("#batch_grammar_min").val("25");
	$("#batch_reading").prop("checked",true);
	$("#batch_reading_num").val("1");
	$("#batch_reading_min").val("60");
	$("#batch_toeic").prop("checked",true);
	$("#batch_toeic_num").val("1");
	$("#batch_toeic_min").val("60");
	$("#batch_adviser_id").val("0");
	$("#batch_adviser_name").html("");
	$("#modal-schedule").modal();	
}

function add_schedule_course()
{
	var date = new Date();
	v_ymd = cfmDateChar(date,'yyyy-mm-dd');
	 
	$("#course_schedule_id").val("0");
	$("#course_date").val(v_ymd);
	$("#course_date").attr("disabled",false);
	$("#course_batch_grammar_start_time").val("14:00");
	$("#course_batch_grammar_end_time").val("15:30");
	$("#course_batch_grammar_min").val("25");
	$("#course_batch_reading_start_time").val("14:00");
	$("#course_batch_reading_end_time").val("15:30");
	$("#course_batch_reading_min").val("60");
	$("#course_batch_listening_start_time").val("14:00");
	$("#course_batch_listening_end_time").val("15:30");
	$("#course_batch_listening_min").val("10");
	$("#course_batch_grammar").prop("checked",true);
	$("#course_batch_grammar_num").val("1");
	$("#course_batch_reading").prop("checked",true);
	$("#course_batch_reading_num").val("1");
	$("#course_batch_listening").prop("checked",true);
	$("#course_batch_listening_num").val("1");
		
	$("#course_name").hide();
	$("#div_course").show();
	 
	$("#modal-schedule-course").modal();	
	
}

function save_schedule()
{
	var obj = Object();

	obj.id = $("#schedule_id").val();
	obj.date = $("#date").val();
	obj.start_time = $("#date").val()+" "+$("#start_time").val()+":00";
	obj.end_time = $("#date").val()+" "+$("#end_time").val()+":00";
	if($("#batch_grammar").is(":checked")){
		obj.batch_grammar = true;
	}else{
		obj.batch_grammar = false;
	}
	obj.batch_grammar_type = $("#batch_grammar_type").val();
	obj.batch_grammar_num = $("#batch_grammar_num").val();
	obj.batch_grammar_min = $("#batch_grammar_min").val();
	if($("#batch_reading").is(":checked")){
		obj.batch_reading = true;
	}else{
		obj.batch_reading = false;
	}
	obj.batch_reading_type = $("#batch_reading_type").val();
	obj.batch_reading_num = $("#batch_reading_num").val();
	obj.batch_reading_min = $("#batch_reading_min").val();
	
	if($("#batch_toeic").is(":checked")){
		obj.batch_toeic = true;
	}else{
		obj.batch_toeic = false;
	}
	
	obj.batch_toeic_type = $("#batch_toeic_type").val();
	obj.batch_toeic_num = $("#batch_toeic_num").val();
	obj.batch_toeic_min = $("#batch_toeic_min").val();
	
	obj.course_id = 0;
	obj.batch_adviser_id = $("#batch_adviser_id").val();
	$.ajax({
		type : "POST",
		url : "/batch/saveBatchSchedule.do",
		data : obj,
		dataType : "text",
		success:function(data){ 
			alert("저장하였습니다.");
			$("#modal-schedule").modal("hide");
			search_schedule();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function save_schedule_course()
{
	var obj = Object();

	obj.id = $("#course_schedule_id").val();
	obj.date = $("#course_date").val();
	
	if($("#course_batch_grammar").is(":checked")){
		obj.batch_grammar = true;
		obj.batch_grammar_start_time = $("#course_date").val()+" "+$("#course_batch_grammar_start_time").val()+":00";
		obj.batch_grammar_end_time = $("#course_date").val()+" "+$("#course_batch_grammar_end_time").val()+":00";
	}else{
		obj.batch_grammar = false;
	}
	obj.batch_grammar_type = $("#course_batch_grammar_type").val();
	obj.batch_grammar_num = $("#course_batch_grammar_num").val();
	obj.batch_grammar_min = $("#course_batch_grammar_min").val();
	
	if($("#course_batch_reading").is(":checked")){
		obj.batch_reading = true;
		obj.batch_reading_start_time = $("#course_date").val()+" "+$("#course_batch_reading_start_time").val()+":00";
		obj.batch_reading_end_time = $("#course_date").val()+" "+$("#course_batch_reading_end_time").val()+":00";
	}else{
		obj.batch_reading = false;
	}
	obj.batch_reading_type = $("#course_batch_reading_type").val();
	obj.batch_reading_num = $("#course_batch_reading_num").val();
	obj.batch_reading_min = $("#course_batch_reading_min").val();

	if($("#course_batch_listening").is(":checked")){
		obj.batch_listening = true;
		obj.batch_listening_start_time = $("#course_date").val()+" "+$("#course_batch_listening_start_time").val()+":00";
		obj.batch_listening_end_time = $("#course_date").val()+" "+$("#course_batch_listening_end_time").val()+":00";
	}else{
		obj.batch_listening = false;
	}
	obj.batch_listening_type = $("#course_batch_listening_type").val();
	obj.batch_listening_num = $("#course_batch_listening_num").val();
	obj.batch_listening_min = $("#course_batch_listening_min").val();

	obj.course_id = $("#search_course_id").val();
	obj.batch_adviser_id = 0;
	$.ajax({
		type : "POST",
		url : "/batch/saveBatchSchedule.do",
		data : obj,
		dataType : "text",
		success:function(data){ 
			alert("저장하였습니다.");
			$("#modal-schedule-course").modal("hide");
			search_schedule();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function search_adviser()
{
	$("#authList").html("");
	$("#search_auth_username").val("");
	$("#modal-auth").modal();
}

function auth_search()
{
	var v_username = $("#search_auth_username").val();
	if(!v_username || v_username.length < 2){
		alert("검색어는 2글자 이상 입력하세요.");
		return;
	}
	
	$.ajax({
		type : "POST",
		url : "/common/getUserSearchEmployeeList.do",
		data:{
			username:v_username
		},
		success:function(data){
			var vHtml = "";
			if(data.length > 0){
				for(var i=0; i<data.length; i++)
				{
					var v_user_name = data[i].last_name+data[i].first_name;
					vHtml += "<tr>";
					vHtml += "<td class='text-center'>"+data[i].username+"</td>";
					vHtml += "<td class='text-center'>"+v_user_name+"</td>";
					vHtml += "<td class='with-btn text-center' nowrap=''>";
					vHtml += "	<a href='javascript:select_user("+data[i].user_id+",\""+v_user_name+"\")' class='btn btn-sm btn-primary m-r-2'>선택</a>";
					vHtml += "</td>";
					vHtml += "</tr>";
				}
			}else{
				vHtml += "<tr><td class='text-center' colspan='3'>조회된 자료가 없습니다.</td></tr>";
			}
			$("#authList").html(vHtml);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

function select_user(v_user_id, v_user_name)
{
	$("#batch_adviser_id").val(v_user_id);
	$("#batch_adviser_name").html(v_user_name);
	$("#modal-auth").modal("hide");
}