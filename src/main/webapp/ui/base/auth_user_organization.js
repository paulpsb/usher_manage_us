var auth_oragnization_list;
var auth_user_oragnization_list;
/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	form_search();
    
});

var vHtml = "";
function form_search()
{
	$.ajax({
		type : "POST",
		url : "/base/getAuthOrganizationAllList.do",
		data:{
			
		},
		success:function(data){
			organization_id = 0;
			organization_name = "";
			$("#organization_name").html("");
			$("#user_list").html("");
			auth_user_oragnization_list = data.authUserOrganizationAllList;
			auth_oragnization_list = data.authOrganizationList;
			vHtml = "";
			vHtml += '<ul class="tree">';
			vHtml += '	<li>';
			vHtml += '		<span class="bg-red-lighter">';
			vHtml += '			<h2 class="text-white">어셔어학원</h2>';
			vHtml += '		</span>';
			create_down_organization(0);
			vHtml += '	</li>';
			vHtml += '</ul>';
			
			$("#organization_list").html(vHtml);
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
		vHtml += '<ul>';
		for(var i=0; i<array_auth_oragnization.length; i++)
		{
			var t_id    = array_auth_oragnization[i].id;
			var t_level = array_auth_oragnization[i].organization_level;
			var t_name  = array_auth_oragnization[i].organization_name;
			var t_class = array_auth_oragnization[i].organization_icon;
			vHtml += '	<li>';
			vHtml += '		<span class="'+t_class+'">';
			vHtml += '			<a href="javascript:search_organization_user('+t_id+',\''+t_name+'\', true)" class="text-white">';
			vHtml += '				<h2>'+t_name+'</h2>';
			vHtml += '			</a>';
			vHtml += '		</span>';
			var array_auth_user_oragnization = auth_user_oragnization_list.filter(function(item, index){
				if(item.organization_id == t_id){
					return true;
				}
			});
			if(array_auth_user_oragnization.length > 0)
			{
				vHtml += '<dt>';
				for(var j=0; j<array_auth_user_oragnization.length; j++)
				{
					vHtml += '<dd style="font-size:1rem">-&nbsp;'+array_auth_user_oragnization[j].last_name+array_auth_user_oragnization[j].first_name+'</dd>';
				}
				vHtml += '</dt>';
			}
			create_down_organization(t_id);
			vHtml += '	</li>';
		}
		vHtml += '</ul>';
	}
}

function close_auth_user()
{
	$("#modal-auth-user").modal("hide");
	form_search();
}

var organization_id;
var organization_name;
function search_organization_user(v_id, v_name, is_modal)
{
	organization_id = v_id;
	organization_name = v_name;
	
	$.ajax({
		type : "POST",
		url : "/base/getAuthUserOrganizationList.do",
		data:{
			organization_id:organization_id
		},
		success:function(data){
			$("#organization_name").html(organization_name);
			var tHtml = "";
			for(var i=0; i<data.length; i++)
			{
				var v_group = "";
				if(data[i].group_id == "2"){
					v_group = "직원";
				}else if(data[i].group_id == "3"){
					v_group = "매니저";
				}else if(data[i].group_id == "4"){
					v_group = "강사";
				}
				var is_status = "";
				
				if(data[i].status == "ACTIVE")    is_status = "checked";
				
				tHtml += "<tr>";
				tHtml += "<td class='text-center'>"+v_group+"</td>";
				tHtml += "<td class='text-center'>"+data[i].username+"</td>";
				tHtml += "<td class='text-center'>"+data[i].last_name+data[i].first_name+"</td>";
				/*
				tHtml += '<td class="text-center">';
				tHtml += '	<div class="switcher">';
				tHtml += '		<input type="hidden" name="user_id" value="'+data[i].user_id+'">';
				tHtml += '		<input type="checkbox" name="is_status" id="is_status_'+i+'" value="1" '+is_status+'>';
				tHtml += '		<label for="is_status_'+i+'"></label>';
				tHtml += '	</div>';
				tHtml += '</td>';
				*/
				tHtml += "<td class='with-btn text-center' nowrap=''>";
				tHtml += "	<a href='javascript:delete_user("+data[i].user_id+")' class='btn btn-sm btn-primary m-r-2'>삭제</a>";
				tHtml += "</td>";
				tHtml += "</tr>";
			}
			
			$("#user_list").html(tHtml);
			if(is_modal){
				$("#modal-auth-user").modal({backdrop: 'static', keyboard: false});
			}
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function form_add()
{
	if(organization_id == 0) return;
	$("#authList").html("");
	$("#search_auth_username").val("");
	$("#modal-auth").modal();
}

function auth_search()
{
	var v_username = $("#search_auth_username").val();
	
	$.ajax({
		type : "POST",
		url : "/base/getAuthUserStudentList.do",
		data:{
			group_id:$("#search_auth_group").val(),
			username:v_username
		},
		success:function(data){
			var tHtml = "";
			if(data.length > 0){
				for(var i=0; i<data.length; i++)
				{
					tHtml += "<tr>";
					
					tHtml += "<td class='text-center with-checkbox'>";
					tHtml += '	<div class="checkbox checkbox-css">';
					tHtml += '		<input type="hidden" name="add_user_id" value="'+data[i].user_id+'">';
					tHtml += '		<input type="checkbox" value="1" name="add_user_check" id="add_user_check_'+i+'">';
					tHtml += '		<label for="add_user_check_'+i+'">&nbsp;</label>';
					tHtml += '	</div>';
					tHtml += "</td>";
					tHtml += "<td class='text-center'>"+data[i].username+"</td>";
					tHtml += "<td class='text-center'>"+data[i].last_name+data[i].first_name+"</td>";
					
					tHtml += "</tr>";
				}
			}else{
				tHtml += "<tr><td class='text-center' colspan='3'>조회된 자료가 없습니다.</td></tr>";
			}
			$("#authList").html(tHtml);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

function auth_add()
{
	var nSeq = 0;
	
	var $_user_id      = $("input[name=add_user_id]");
	var $_is_check     = $("input[name=add_user_check]");
	
	var data_list = Array();
	
	$_user_id.each(function(index) {
		if($_is_check.eq(index).is(":checked"))
		{
			var objData = Object();
			objData.status = "ACTIVE";
			objData.organization_id = organization_id;
			objData.user_id = $(this).val();
			
			data_list.push(objData);
			nSeq++;
		}
		
	});
	if(nSeq == 0){
		alert("선택된 회원이 없습니다.");
		return;
	}
	
	var data_value = JSON.stringify(data_list);
	$.ajax({
		type : "POST",
		url : "/base/insertAuthUserOrganization.do",
		data:{
			data_value:data_value
		},
		success:function(data){
			alert("등록하였습니다.");
			$("#modal-auth").modal("hide");
			search_organization_user(organization_id, organization_name, false);

		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

function form_save()
{
	var nSeq = 0;
	
	var $_user_id      = $("input[name=user_id]");
	var $_is_check     = $("input[name=is_status]");
	
	var data_list = Array();
	
	$_user_id.each(function(index) {
		var objData = Object();
		objData.organization_id = organization_id;
		objData.user_id = $(this).val();
		if($_is_check.eq(index).is(":checked"))
		{
			objData.status = "ACTIVE";
		}else{
			objData.status = "INACTIVE";
		}
		
		data_list.push(objData);
		nSeq++;
	});
	if(nSeq == 0){
		alert("조회된 회원이 없습니다.");
		return;
	}
	
	var data_value = JSON.stringify(data_list);
	$.ajax({
		type : "POST",
		url : "/base/updateAuthUserOrganization.do",
		data:{
			data_value:data_value
		},
		success:function(data){
			alert("저장하였습니다.");
			search_organization_user(organization_id, organization_name, false);

		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

function delete_user(v_user_id)
{
	if(!confirm("삭제하시겠습니까?")) return;
	
	$.ajax({
		type : "POST",
		url : "/base/deleteAuthUserOrganization.do",
		data:{
			user_id:v_user_id,
			organization_id:organization_id
		},
		success:function(data){
			alert("삭제하였습니다.");
			search_organization_user(organization_id, organization_name, false);

		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}