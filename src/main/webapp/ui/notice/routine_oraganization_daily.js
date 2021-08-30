var routineOraganizationInfo;
var routineOraganizationDetailList;
var routineList;
var timescheduleList;

var routine_organization_id;
var routine_organization_name

var routine_trans_oraganization_id;
/*
* 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	$("input[name='search_routine_category']").click(function(){
		var search_routine_category = $("input[name='search_routine_category']:checked").val();
		if(search_routine_category == "MONTHLY"){
			location.href="/notice/routine_oraganization_monthly.do?routine_organization_id="+routine_organization_id+"&&routine_organization_name="+routine_organization_name;
		}else if(search_routine_category == "YEARLY"){
			location.href="/notice/routine_oraganization_yearly.do?routine_organization_id="+routine_organization_id+"&&routine_organization_name="+routine_organization_name;
		}
	});
	
	routine_organization_id = $("#routine_organization_id").val();
	routine_organization_name = $("#routine_organization_name").val();
	
	search_oranization();
	
	if(!routine_organization_name){
		showOraganization("N");
	}else{
		$("#select_oraganization_name").html(routine_organization_name);
		form_search();
	}
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

function showOraganization(isCancel)
{
	if(isCancel == "Y"){
		$("#btn_cancel_organization").show();
	}else{
		$("#btn_cancel_organization").hide();
	}
	
	$('#select_oraganization').modal({backdrop: 'static', keyboard: false}); 
}

function organization_select(v_id, v_name)
{
	$('#select_oraganization').modal("hide"); 
	
	routine_organization_id = v_id;
	routine_organization_name = v_name;
	
	$("#select_oraganization_name").html(routine_organization_name);
	
	form_search();
}

function form_oraganization_cancel()
{
	$('#select_oraganization').modal("hide"); 
}

function form_search()
{
	$.ajax({
		type : "POST",
		url : "/notice/getRoutineOraganizationList.do",
		data : {
			routine_organization_id:routine_organization_id,
			routine_category:"DAILY",
			routine_schedule:0			
		},
		success:function(data){
			routineOraganizationInfo       = data.routineOraganizationInfo;
			routineOraganizationDetailList = data.routineOraganizationDetailList;
			routineList                    = data.routineList;
			timescheduleList               = data.timescheduleList;
			
			routine_trans_oraganization_id = routineOraganizationInfo.id;
			createRoutineTable();
			createTimeTable();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});

}

function createTimeTable()
{
	var vHtml = "";
	vHtml += '<tr>';
	vHtml += '	<th class="text-center bg-black-transparent-5 text-white">시간 미지정</th>';
	vHtml += '	<td>';
	vHtml += '		<div class="row droppable" style="margin:0px;width:100%;min-height:18px;">';
	vHtml += '			<input type="hidden" name="routine_start_time" value="0">';
	var array_group_detail = routineOraganizationDetailList.filter(function(item, index){
		//if(item.current_status == "OK" && item.course_id == course_id && item.refund_status != "FULL_REFUND" && item.status != "REFUND_COMPLETED"){
		if(item.routine_start_time == "0"){
			return true;
		}
	});
	for(var j=0; j<array_group_detail.length; j++)
	{
		vHtml += '<div id="routine_group_detail_'+array_group_detail[j].id+'" class="col-4 mb-2">';
		vHtml += '	<div class="section-drop bg-pink-lighter text-center">';
		vHtml += '		<input type="hidden" name="group_detail_id" value="'+array_group_detail[j].id+'">';
		vHtml += '		<input type="hidden" name="routine_id" value="'+array_group_detail[j].routine_id+'">';
		vHtml += array_group_detail[j].routine_title;
		vHtml += '	</div>';
		vHtml += '</div>';
	}
	vHtml += '		</div>';
	vHtml += '	</td>';
	vHtml += '</tr>';
	
	var before_hour = parseInt(timescheduleList[0].start_time.substr(0,2)) - 1;
	var before_min  = timescheduleList[0].start_time.substr(3,2);
	var before_time = "";
	if(before_hour < 10){
		before_time = "0"+before_hour+":"+before_min;
	}else{
		before_time = before_hour+":"+before_min;
	}
	
	vHtml += '<tr>';
	vHtml += '	<th class="text-center bg-black-transparent-5 text-white">'+before_time+'</th>';
	vHtml += '	<td>';
	vHtml += '		<div class="row droppable" style="margin:0px;width:100%;min-height:18px;">';
	vHtml += '			<input type="hidden" name="routine_start_time" value="'+before_time+'">';
	var array_group_detail = routineOraganizationDetailList.filter(function(item, index){
		//if(item.current_status == "OK" && item.course_id == course_id && item.refund_status != "FULL_REFUND" && item.status != "REFUND_COMPLETED"){
		if(item.routine_start_time == before_time){
			return true;
		}
	});
	for(var j=0; j<array_group_detail.length; j++)
	{
		vHtml += '<div id="routine_group_detail_'+array_group_detail[j].id+'" class="col-4 mb-2">';
		vHtml += '	<div class="section-drop bg-pink-lighter text-center">';
		vHtml += '		<input type="hidden" name="group_detail_id" value="'+array_group_detail[j].id+'">';
		vHtml += '		<input type="hidden" name="routine_id" value="'+array_group_detail[j].routine_id+'">';
		vHtml += array_group_detail[j].routine_title;
		vHtml += '	</div>';
		vHtml += '</div>';
	}
	vHtml += '		</div>';
	vHtml += '	</td>';
	vHtml += '</tr>';
	
	for(var i=0; i<timescheduleList.length; i++)
	{
		var start_time = timescheduleList[i].start_time;
		vHtml += '<tr>';
		vHtml += '	<th class="text-center bg-black-transparent-5 text-white">'+start_time+'</th>';
		vHtml += '	<td>';
		vHtml += '		<div class="row droppable" style="margin:0px;width:100%;min-height:18px;">';
		vHtml += '			<input type="hidden" name="routine_start_time" value="'+start_time+'">';
		var array_group_detail = routineOraganizationDetailList.filter(function(item, index){
			//if(item.current_status == "OK" && item.course_id == course_id && item.refund_status != "FULL_REFUND" && item.status != "REFUND_COMPLETED"){
			if(item.routine_start_time == start_time){
				return true;
			}
		});
		for(var j=0; j<array_group_detail.length; j++)
		{
			vHtml += '<div id="routine_group_detail_'+array_group_detail[j].id+'" class="col-4 mb-2">';
			vHtml += '	<div class="section-drop bg-pink-lighter text-center">';
			vHtml += '		<input type="hidden" name="group_detail_id" value="'+array_group_detail[j].id+'">';
			vHtml += '		<input type="hidden" name="routine_id" value="'+array_group_detail[j].routine_id+'">';
			vHtml += array_group_detail[j].routine_title;
			vHtml += '	</div>';
			vHtml += '</div>';
		}
		vHtml += '		</div>';
		vHtml += '	</td>';
		vHtml += '</tr>'
	}
	
	var last_idx = timescheduleList.length -1;
	var last_hour = parseInt(timescheduleList[last_idx].start_time.substr(0,2)) + 1;
	var last_min  = timescheduleList[last_idx].start_time.substr(3,2);
	var last_time = "";
	if(last_hour < 10){
		last_time = "0"+last_hour+":"+last_min;
	}else{
		last_time = last_hour+":"+last_min;
	}
	last_time = "22:00";
	vHtml += '<tr>';
	vHtml += '	<th class="text-center bg-black-transparent-5 text-white">'+last_time+'</th>';
	vHtml += '	<td>';
	vHtml += '		<div class="row droppable" style="margin:0px;width:100%;min-height:18px;">';
	vHtml += '			<input type="hidden" name="routine_start_time" value="'+last_time+'">';
	var array_group_detail = routineOraganizationDetailList.filter(function(item, index){
		//if(item.current_status == "OK" && item.course_id == course_id && item.refund_status != "FULL_REFUND" && item.status != "REFUND_COMPLETED"){
		if(item.routine_start_time == last_time){
			return true;
		}
	});
	for(var j=0; j<array_group_detail.length; j++)
	{
		vHtml += '<div id="routine_group_detail_'+array_group_detail[j].id+'" class="col-4 mb-2">';
		vHtml += '	<div class="section-drop bg-pink-lighter text-center">';
		vHtml += '		<input type="hidden" name="group_detail_id" value="'+array_group_detail[j].id+'">';
		vHtml += '		<input type="hidden" name="routine_id" value="'+array_group_detail[j].routine_id+'">';
		vHtml += array_group_detail[j].routine_title;
		vHtml += '	</div>';
		vHtml += '</div>';
	}
	vHtml += '		</div>';
	vHtml += '	</td>';
	vHtml += '</tr>';
	
	$("#time_list").html(vHtml);
	
	$(".droppable").droppable({
		drop: function (event, ui) {
			var routine_id         = ui.draggable.find("input[name=routine_id]").val();
			var routine_title      = ui.draggable.find("input[name=routine_title]").val();
			var routine_start_time = $(this).find("input[name=routine_start_time]").val();
			var drop_target   = $(this);
			
			$.ajax({
				type : "POST",
				url : "/notice/insertRoutineTransOraganizationDetail.do",
				data : {
					routine_day:0,
					routine_date:"0",
					routine_start_time:routine_start_time,
					routine_trans_oraganization_id:routine_trans_oraganization_id,
					routine_id:routine_id			
				},
				success:function(data){
					var routine_trans_oraganization_detail_id = data.id;
					
					var vHtml = "";
					
					vHtml += '<div id="routine_group_detail_'+routine_trans_oraganization_detail_id+'" class="col-4 mb-2">';
					vHtml += '	<div class="section-drop bg-pink-lighter text-center">';
					vHtml += '		<input type="hidden" name="group_detail_id" value="'+routine_trans_oraganization_detail_id+'">';
					vHtml += '		<input type="hidden" name="routine_id" value="'+routine_id+'">';
					vHtml += routine_title;
					vHtml += '	</div>';
					vHtml += '</div>';
					drop_target.append(vHtml);
					$("#routine_"+routine_id).hide();
					$(".section-drop").dblclick(function(){
						var v_group_id = $(this).find("input[name=group_detail_id]").val();
						var v_routine_id      = $(this).find("input[name=routine_id]").val();
						deleteGroupDetail(v_group_id, v_routine_id);
					});
				},
				error:function(event){				
					alert("잠시후 다시 시도 바랍니다.");
				}
			});
		}
	});
	
	$(".section-drop").dblclick(function(){
		var v_group_id = $(this).find("input[name=group_detail_id]").val();
		var v_routine_id      = $(this).find("input[name=routine_id]").val();
		deleteGroupDetail(v_group_id, v_routine_id);
	});
}

function deleteGroupDetail(v_group_id, v_routine_id)
{
	$.ajax({
		type : "POST",
		url : "/notice/deleteRoutineTransOraganizationDetail.do",
		data : {
			id:v_group_id			
		},
		success:function(data){
			$("#routine_group_detail_"+v_group_id).remove();
			$("#routine_"+v_routine_id).show();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

function createRoutineTable()
{
	var vHtml = "";
	for(var i=0; i<routineList.length; i++)
	{
		var routine_id    = routineList[i].id;
		var routine_title = routineList[i].routine_title;
		var display = "";
		var a_idx = routineOraganizationDetailList.findIndex(t => t.routine_id == routine_id);
		if(a_idx >= 0) display = "style='display:none;'";
		vHtml += '<div id="routine_'+routine_id+'" class="col-6 mb-2" '+display+'>';
		vHtml += '	<div class="draggable bg-aqua-transparent-7 section-drag text-center">';
		vHtml += '		<input type="hidden" name="routine_id" value="'+routine_id+'">';
		vHtml += '		<input type="hidden" name="routine_title" value="'+routine_title+'">';
		vHtml += routine_title;
		vHtml += '	</div>';
		vHtml += '</div>';
	}
	$("#routine_list").html(vHtml);
	
	$(".draggable").draggable({
		revert: true,
		zIndex: 999999
	});
}