var is_search = true;
var search_group = "MANAGER";
var search_oranization_id= 0;

var junior_timetable = [
	["",""],
	["",""],
	["",""],
	["",""],
	["",""],
	["",""],
	["",""],
	["16:30","17:30"],
	["17:30","18:25"],
	["18:25","19:20"],
	["19:20","20:15"],
	["20:15","21:10"],
	["21:10","22:00"]
];

var base_timetable = [
	["09:00","10:00"],
	["10:00","11:00"],
	["11:00","12:00"],
	["12:00","13:00"],
	["13:00","14:00"],
	["14:00","15:00"],
	["15:00","16:00"],
	["16:00","17:00"],
	["17:00","18:00"],
	["18:00","19:00"],
	["19:00","20:00"],
	["20:00","21:00"],
	["21:00","22:00"]
];

var week = [
	'일요일', 
	'월요일', 
	'화요일', 
	'수요일', 
	'목요일', 
	'금요일', 
	'토요일'
];

var practice_section_color = {
		VOCA:{color:"bg-red-darker"},
		GRAMMAR:{color:"bg-green-darker"},
		READING:{color:"bg-purple-darker"},
		LISTENING:{color:"bg-orange-darker"},
		WRITING:{color:"bg-aqua-darker"},
		SPEAKING:{color:"bg-blue-darker"}
	};

jQuery(document).ready(function(){
	$("input[name='search_group']").click(function(){
		search_group = $("input[name='search_group']:checked").val();
		if(search_group == "ORGANIZATION"){
			is_search = false;
			$("#search_organization").show();
			$("#task_table").html("");
		}else{
			is_search = true;
			$("#search_organization").hide();
			$("#search_organization_name").html("");
			search_oranization_id= 0;
			search_form();
		}
	});
	
	var to_day = cfmGetToDate();
	$("#search_date").val(to_day);
	search_oranization();
	
});

var auth_oragnization_list;
var oHtml = "";

function search_oranization()
{
	$.ajax({
		type : "POST",
		url : "/base/getAuthOrganizationList.do",
		data:{
			
		},
		success:function(data){
			auth_oragnization_list = data;
			oHtml = "";
			oHtml += '<ul class="tree">';
			oHtml += '	<li>';
			oHtml += '		<span class="bg-red-lighter">';
			oHtml += '			<h5>어셔어학원</h5>';
			oHtml += '		</span>';
			create_down_organization(0);
			oHtml += '	</li>';
			oHtml += '</ul>';
			
			$("#organization_list").html(oHtml);
			
			change_date();
			search_form();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function create_down_organization(v_id)
{
	var array_auth_oragnization = auth_oragnization_list.filter(function(item, index){
		if(item.organization_up_id == v_id){
			return true;
		}
	});
	if(array_auth_oragnization.length > 0){
		oHtml += '<ul>';
		for(var i=0; i<array_auth_oragnization.length; i++)
		{
			var t_id    = array_auth_oragnization[i].id;
			var t_level = array_auth_oragnization[i].organization_level;
			var t_name  = array_auth_oragnization[i].organization_name;
			var t_class = array_auth_oragnization[i].organization_icon;
			oHtml += '	<li>';
			oHtml += '		<span class="'+t_class+'">';
			oHtml += '			<a href="javascript:organization_select('+t_id+', \''+t_name+'\')" class="text-white">';
			oHtml += '				<h5>'+t_name+'</h5>';
			oHtml += '			</a>';
			oHtml += '		</span>';
			create_down_organization(t_id);
			oHtml += '	</li>';
		}
		oHtml += '</ul>';
	}
}
function change_date(){
	var vDate = $("#search_date").val();
	var to_day = cfmGetToDate();
	if(vDate < to_day){
		$("#btn_next").attr("disabled", false);
	}else{
		$("#btn_next").attr("disabled", true);
	}
	var sDate = cfmGetDigit(vDate);
    var yy = parseInt(sDate.substr(0, 4), 10);
    var mm = parseInt(sDate.substr(4, 2), 10);
    var dd = parseInt(sDate.substr(6, 2), 10);

    var d = new Date(yy, mm - 1, dd);
    var w = d.getDay();
    $("#select_date_text").val(yy+"년 "+parseInt(mm)+"월"+parseInt(dd)+"일,"+week[w]);
    
}

function date_prev()
{
	var v_date = cfmAddDate($("#search_date").val(), -1);
	$("#search_date").val(v_date);
	change_date();
	search_form();
}

function date_next()
{
	var v_date = cfmAddDate($("#search_date").val(), 1);
	$("#search_date").val(v_date);
	change_date();
	search_form();
}

function showOrganization()
{
	$('#select_oraganization').modal({backdrop: 'static', keyboard: false}); 
}

function organization_select(v_id, v_name)
{
	$('#select_oraganization').modal("hide"); 
	
	search_oranization_id = v_id;
	
	$("#search_organization_name").html(v_name);
	is_search = true;
	search_form();
}

function form_oraganization_cancel()
{
	$('#select_oraganization').modal("hide"); 
}

var timetableList;
var userList;
var taskList;
var taskUserList;

function search_form()
{
	if(!is_search) return;
	$.ajax({
		type : "POST",
		url : "/notice/getTaskUserList.do",
		data:{
			search_type:search_group,
			organization_id:search_oranization_id,
			schedule_date:$("#search_date").val()
		},
		success:function(data){
			var currentInfo = data.currentInfo;
			
			timetableList = data.timetableList;
			userList      = data.userList;
			taskList      = data.taskList;
			taskUserList  = data.taskUserList;
			createTimeTable();
			createTask();
			
			if(currentInfo.cur_date == $("#search_date").val())
			{
				initEvent();
			}
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

function createTimeTable()
{
	var nCount = userList.length;
	var nWidth = 92 / nCount;

	for(var i=0; i<nCount; i++)
	{
		userList[i].remain_hour = 0;
	}
	
	var tHtml = "";
	//우선 가용시간을 정해준다.
	for(var k=0; k<base_timetable.length; k++)
	{
		var bsHour = base_timetable[k][0];
		var jsHour = junior_timetable[k][0];
		
		var sHour = bsHour;
		if(jsHour) sHour += "<br>"+jsHour+"(주니어)"
		
		if(!jsHour) jsHour = "99:99";
		
		tHtml += '		<tr>';
		tHtml += '			<th class="text-center bg-black-transparent-5 text-white">'+sHour+'</th>';
		for(var i=0; i<nCount; i++)
		{
			var v_user_bg_class = "";
			var v_user_id = userList[i].user_id;
			var v_start_time = userList[i].start_time;
			var v_end_time = userList[i].end_time;
			
			console.log(v_start_time + "||"+bsHour+"||"+v_end_time);
			
			if(v_start_time <= bsHour){
				if(v_end_time <= bsHour){
					v_user_bg_class = "bg-black-lighter";
				}
			}else{
				v_user_bg_class = "bg-black-lighter";
			}
			
			var base_timetable_list = timetableList.filter(function(item, index){
				if(item.user_id == v_user_id && item.class_hour == bsHour){
					return true;
				}
			});
			
			var junior_timetable_list = timetableList.filter(function(item, index){
				if(item.user_id == v_user_id && item.class_hour == jsHour){
					return true;
				}
			});
			

			if(base_timetable_list.length > 0 || junior_timetable_list.length > 0)
			{
				tHtml += '	<td class="'+v_user_bg_class+'">';
				tHtml += '		<div class="row" style="margin:0;width:100%;">';
				for(var t=0; t<base_timetable_list.length; t++)
				{
					var v_section = base_timetable_list[t].section;
					var v_title   = base_timetable_list[t].course_group_name+ ' '+base_timetable_list[t].course_name+'<br>';
					v_title += base_timetable_list[t].section_name+ ' '+base_timetable_list[t].study_type_name;
					tHtml += '		<div class="col-12 mb-3 text-white text-center '+practice_section_color[v_section].color+'" style="padding:5px;">';
					tHtml += v_title;
					tHtml += '		</div>';
				}
				for(var t=0; t<junior_timetable_list.length; t++)
				{
					var v_section = junior_timetable_list[t].section;
					var v_title   = junior_timetable_list[t].course_group_name+ ' '+junior_timetable_list[t].course_name+'<br>';
					v_title += junior_timetable_list[t].section_name+ ' '+junior_timetable_list[t].study_type_name;
					tHtml += '		<div class="col-12 mb-3 text-white text-center '+practice_section_color[v_section].color+'" style="padding:5px;">';
					tHtml += v_title;
					tHtml += '		</div>';
				}
			}else{
				if(!v_user_bg_class){
					tHtml += '	<td class="bg-yellow-transparent-4">';
					tHtml += '		<div class="row" style="margin:0;width:100%;">';
					userList[i].remain_hour++;
				}else{
					tHtml += '	<td class="'+v_user_bg_class+'">';
					tHtml += '		<div class="row" style="margin:0;width:100%;">';
					
				}				
			}
			tHtml += '		</div>';
			tHtml += '	</td>';
		}
		tHtml += '		</tr>';
		
	}
	
	
	var vHtml = "";
	vHtml += '<table class="table table-bordered m-b-0">';
	vHtml += '	<colgroup>';
	vHtml += '		<col style="width:8%;" />';
	for(var i=0; i<nCount; i++)
	{
		vHtml += '		<col style="width:'+nWidth+'%;" />';
	}
	vHtml += '	</colgroup>';
	
	vHtml += '	<thead>';
	vHtml += '		<tr>';
	vHtml += '			<th class="text-center bg-black-transparent-5 text-white">시간</th>';
	for(var i=0; i<nCount; i++)
	{
		vHtml += '			<th class="text-center bg-black-transparent-5 text-white">'+userList[i].last_name+userList[i].first_name+'</th>';
	}
	vHtml += '		</tr>';
	vHtml += '	</thead>';
	vHtml += '	<tbody>';
	vHtml += '		<tr>';
	vHtml += '			<th class="text-center bg-black-transparent-5 text-white">TASK</th>';
	for(var i=0; i<nCount; i++)
	{
		var v_user_id = userList[i].user_id;
		var v_remain_hour = userList[i].remain_hour;
		var v_remain_min  = v_remain_hour * 60;
		
		var task_user_list = taskUserList.filter(function(item, index){
			if(item.task_user_id == v_user_id){
				return true;
			}
		});
		var qHtml = "";
		var v_use_min = 0;
		for(var t=0; t<task_user_list.length; t++)
		{
			v_use_min = v_use_min + task_user_list[t].task_estimated_time;
			
			var task_id      = task_user_list[t].id;
			var task_title   = task_user_list[t].task_title+'<br>'+task_user_list[t].task_reference_title;
			var task_status  = task_user_list[t].task_status;
			var task_bg = "";
			var task_status_name = "";
			if(task_status == "TIMEING"){
				task_bg = "bg-grey-transparent-7";
				task_status_name = "(시간지정)";
			}else if(task_status == "STARTING"){
				task_bg = "bg-yellow-transparent-7";
				task_status_name = "(작업시작)";
			}else if(task_status == "WORKING"){
				task_bg = "bg-yellow-transparent-7";
				task_status_name = "(작업중)";
			}else if(task_status == "RESPONSE"){
				task_bg = "bg-blue-transparent-7";
				task_status_name = "(작업전송)";
			}else if(task_status == "RETURN"){
				task_bg = "bg-red-transparent-7";
				task_status_name = "(반려)";
			}else if(task_status == "COMPLETE"){
				task_bg = "bg-teal-transparent-7";
				task_status_name = "(작업완료)";
			}else{
				task_bg = "bg-grey-transparent-7";
				task_status_name = "(작업요청)";
			}
			qHtml += '<div class="col-12 mb-2" id="task_'+task_id+'">';
			qHtml += '	<div class="section-drop '+task_bg+' text-center">';
			qHtml += '		<input type="hidden" name="task_id" value="'+task_id+'">';
			qHtml += '		<input type="hidden" name="task_estimated_time" value="'+task_user_list[t].task_estimated_time+'">';
			qHtml += task_title+'<br>'+task_status_name;
			qHtml += '	</div>';
			qHtml += '</div>';
		}

		vHtml += '			<td>';
		vHtml += '				<h5 class="text-center">총 가용시간 : '+userList[i].remain_hour+'시간</h5>';
		vHtml += '				<div class="row droppable" style="margin:0px;width:100%;min-height:36px;">';
		vHtml += '					<input type="hidden" name="user_id" value="'+userList[i].user_id+'">';
		vHtml += '					<input type="hidden" name="remain_hour" value="'+userList[i].remain_hour+'">';
		vHtml += '					<input type="hidden" name="use_min"     value="'+v_use_min+'">';
		vHtml += qHtml;
		var v_calc_min = v_remain_min - v_use_min;
		var v_hour = parseInt(v_calc_min / 60);
		var v_min  = parseInt(v_calc_min % 60);
		var v_calc_title = "";
		if(v_hour > 0) v_calc_title += v_hour+"시간 ";
		if(v_min > 0) v_calc_title += v_min+"분 ";
		vHtml += '				</div>';
		vHtml += '				<h5 class="text-center" id="calc_time_'+userList[i].user_id+'">총 남은 시간 : '+v_calc_title+'</h5>';
		vHtml += '			</td>';
	}
	vHtml += '		</tr>';	
	vHtml += tHtml;
	vHtml += '	</tbody>';
	vHtml += '</table>';
	
	$("#task_table").html(vHtml);
}

function createTask()
{
	var vHtml = "";
	for(var i=0; i<taskList.length; i++)
	{
		var task_id    = taskList[i].id;
		var task_title = taskList[i].task_category_title+'<br>'+taskList[i].reference_title;
		var task_reference_time = taskList[i].reference_time;
		var v_display = "";
		if(taskList[i].is_used)
		{
			v_display = "style='display:none;'";
		}
		vHtml += '<div class="col-12 mb-2" '+v_display+' id="task_category_detail_'+task_id+'">';
		vHtml += '	<div class="draggable bg-aqua-transparent-7 section-drag text-center">';
		vHtml += '		<input type="hidden" name="task_category_detail_id" value="'+task_id+'">';
		vHtml += '		<input type="hidden" name="task_category_detail_title" value="'+task_title+'">';
		vHtml += '		<input type="hidden" name="task_category_detail_reference_time" value="'+task_reference_time+'">';
		vHtml += task_title;
		vHtml += '	</div>';
		vHtml += '</div>';
	}
	$("#task_list").html(vHtml);
}

function initEvent()
{
	$(".draggable").draggable({
		revert: true,
		zIndex: 999999
	});
	
	$(".droppable").droppable({
		drop: function (event, ui) {
			var task_category_detail_id  = ui.draggable.find("input[name=task_category_detail_id]").val();
			var task_user_id      = $(this).find("input[name=user_id]").val();
			var task_date         = $("#search_date").val();
			var drop_target   = $(this);
			$.ajax({
				type : "POST",
				url : "/notice/insertNoticesTask.do",
				data : {
					task_category_detail_id:task_category_detail_id,
					task_user_id:task_user_id,
					task_date:task_date			
				},
				success:function(data){
					$("#task_category_detail_"+task_category_detail_id).hide();
					var task_id = data.id;
					var task_user_id = data.task_user_id;
					var task_title = data.task_title+'<br>'+data.task_reference_title;
					var n_task_estimated_time = data.task_estimated_time;
					var vHtml = "";
					vHtml += '<div class="col-12 mb-2" id="task_'+task_id+'">';
					vHtml += '	<div class="section-drop bg-grey-transparent-7 text-center">';
					vHtml += '		<input type="hidden" name="task_id" value="'+task_id+'">';
					vHtml += '		<input type="hidden" name="task_estimated_time" value="'+n_task_estimated_time+'">';
					vHtml += task_title;
					vHtml += '	</div>';
					vHtml += '</div>';
					drop_target.append(vHtml);

					var n_remain_hour         = parseInt(drop_target.find("input[name=remain_hour]").val());
					var n_remain_min          = n_remain_hour * 60;
					var n_use_min             = parseInt(drop_target.find("input[name=use_min]").val());
					n_use_min = n_use_min + n_task_estimated_time;
					var n_calc_min = n_remain_min - n_use_min;
					var n_hour = parseInt(n_calc_min / 60);
					var n_min  = parseInt(n_calc_min % 60);
					var v_calc_title = "";
					if(n_hour > 0) v_calc_title += n_hour+"시간 ";
					if(n_min > 0) v_calc_title += n_min+"분 ";
					
					drop_target.find("input[name=use_min]").val(n_use_min);
					$("#calc_time_"+task_user_id).html("총 남은 시간 : "+v_calc_title);
					
					$(".section-drop").dblclick(function(){
						var task_id = $(this).find("input[name=task_id]").val();
						var task_estimated_time = $(this).find("input[name=task_estimated_time]").val();
						deleteTask($(this), task_id, task_estimated_time);
					});
				},
				error:function(event){				
					alert("잠시후 다시 시도 바랍니다.");
				}
			});
		}
	});
	
	$(".section-drop").dblclick(function(){
		var task_id = $(this).find("input[name=task_id]").val();
		var task_estimated_time = $(this).find("input[name=task_estimated_time]").val();
		deleteTask($(this), task_id, task_estimated_time);
	});
}

function deleteTask(obj, v_id, v_time)
{
	$.ajax({
		type : "POST",
		url : "/notice/deleteNoticesTask.do",
		data : {
			id:v_id			
		},
		success:function(data){
			var task_category_detail_id = data.task_category_detail_id;
			$("#task_category_detail_"+task_category_detail_id).show();
			var drop_target = obj.closest(".droppable");
			var v_user_id = drop_target.find("input[name=user_id]").val();
			var n_time = parseInt(v_time);
			var n_remain_hour         = parseInt(drop_target.find("input[name=remain_hour]").val());
			var n_remain_min          = n_remain_hour * 60;
			var n_use_min             = parseInt(drop_target.find("input[name=use_min]").val());
			n_use_min = n_use_min - n_time;
			var n_calc_min = n_remain_min - n_use_min;

			var n_hour = parseInt(n_calc_min / 60);
			var n_min  = parseInt(n_calc_min % 60);
			var v_calc_title = "";
			if(n_hour > 0) v_calc_title += n_hour+"시간 ";
			if(n_min > 0) v_calc_title += n_min+"분 ";
			if(!v_calc_title) v_calc_title = "없음"
			drop_target.find("input[name=use_min]").val(n_use_min);

			$("#calc_time_"+v_user_id).html("총 남은 시간 : "+v_calc_title);
			$("#task_"+v_id).remove();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}