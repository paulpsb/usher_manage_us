var routineOraganizationInfo;
var routineOraganizationDetailList;
var routineList;
var timescheduleList;

var routine_organization_id;
var routine_organization_name

var routine_trans_oraganization_id;
var array_date = [0,31,28,31,30,31,30,31,31,30,31,30,31];

/*
* 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	$("input[name='search_routine_category']").click(function(){
		var search_routine_category = $("input[name='search_routine_category']:checked").val();
		if(search_routine_category == "DAILY"){
			location.href="/notice/routine_oraganization_daily.do?routine_organization_id="+routine_organization_id+"&&routine_organization_name="+routine_organization_name;
		}else if(search_routine_category == "MONTHLY"){
			location.href="/notice/routine_oraganization_monthly.do?routine_organization_id="+routine_organization_id+"&&routine_organization_name="+routine_organization_name;
		}
	});
	
	$("input[name='search_routine_month']").click(function(){
		createDailyTable();
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
			routine_category:"YEARLY",
			routine_schedule:0			
		},
		success:function(data){
			routineOraganizationInfo       = data.routineOraganizationInfo;
			routineOraganizationDetailList = data.routineOraganizationDetailList;
			routineList                    = data.routineList;
			timescheduleList               = data.timescheduleList;
			
			routine_trans_oraganization_id = routineOraganizationInfo.id;
			createRoutineTable();
			createDailyTable();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

function createDailyTable()
{
	var select_month = $("input[name='search_routine_month']:checked").val();
	var nMonth = parseInt(select_month);
	var nDate  = array_date[nMonth];
	var nCount = parseInt(nDate/7);
	if((nDate%7) > 0) nCount++;

	var nSeq1 = 1;
	var nSeq2 = 1; 
	var vHtml = "";
	for(var i=0; i<nCount; i++)
	{
		vHtml += '<tr>';
		for(var k=0; k<7; k++){
			if(nSeq1 > nDate)
			{
				vHtml += '<td rowspan="2"></td>';
			}else{
				vHtml += '<th class="bg-black-transparent-5 text-white">'+nSeq1+'일</th>';
			}
			nSeq1++;
		}
		
		vHtml += '</tr>';
		vHtml += '<tr>';
		for(var k=0; k<7; k++){
			var v_date = select_month;
			if(nSeq2 < 10){
				v_date += "-0"+nSeq2;
			}else{
				v_date += "-"+nSeq2;
			}
			if(nSeq2 > nDate)
			{
			}else{
				vHtml += '<td>';
				vHtml += '	<div class="row droppable" style="margin:0px;width:100%;min-height:120px;">';
				vHtml += '		<input type="hidden" name="routine_date" value="'+v_date+'">';
				var array_group_detail = routineOraganizationDetailList.filter(function(item, index){
					//if(item.current_status == "OK" && item.course_id == course_id && item.refund_status != "FULL_REFUND" && item.status != "REFUND_COMPLETED"){
					if(item.routine_date == v_date){
						return true;
					}
				});
				for(var j=0; j<array_group_detail.length; j++)
				{
					vHtml += '<div id="routine_group_detail_'+array_group_detail[j].id+'" class="col-12 mb-2">';
					vHtml += '	<div class="section-drop bg-pink-lighter text-center">';
					vHtml += '		<input type="hidden" name="group_detail_id" value="'+array_group_detail[j].id+'">';
					vHtml += '		<input type="hidden" name="routine_id" value="'+array_group_detail[j].routine_id+'">';
					vHtml += array_group_detail[j].routine_title;
					vHtml += '	</div>';
					vHtml += '</div>';
				}
				vHtml += '	</div>';
				vHtml += '</td>';
			}
			nSeq2++;
		}
		
		vHtml += '</tr>';
	}
	
	$("#daily_list").html(vHtml);
	
	$(".droppable").droppable({
		drop: function (event, ui) {
			var routine_id         = ui.draggable.find("input[name=routine_id]").val();
			var routine_title      = ui.draggable.find("input[name=routine_title]").val();
			var routine_date       = $(this).find("input[name=routine_date]").val();
			var drop_target        = $(this);
			
			$.ajax({
				type : "POST",
				url : "/notice/insertRoutineTransOraganizationDetail.do",
				data : {
					routine_day:0,
					routine_date:routine_date,
					routine_start_time:"0",
					routine_trans_oraganization_id:routine_trans_oraganization_id,
					routine_id:routine_id			
				},
				success:function(data){
					var routine_trans_oraganization_detail_id = data.id;
					
					var vHtml = "";
					
					vHtml += '<div id="routine_group_detail_'+routine_trans_oraganization_detail_id+'" class="col-12 mb-2">';
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