var auth_oragnization_list;
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
		url : "/base/getAuthOrganizationList.do",
		data:{
			
		},
		success:function(data){
			auth_oragnization_list = data;
			vHtml = "";
			vHtml += '<ul class="tree">';
			vHtml += '	<li>';
			vHtml += '		<span class="bg-red-lighter">';
			vHtml += '			<a href="javascript:open_organization_button(0, 0, \'어셔 어학원\')" class="text-white">';
			vHtml += '				<h2>어셔어학원</h2>';
			vHtml += '			</a>';
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
			vHtml += '			<a href="javascript:open_organization_button('+t_id+', '+t_level+', \''+t_name+'\')" class="text-white">';
			vHtml += '				<h2>'+t_name+'</h2>';
			vHtml += '			</a>';
			vHtml += '		</span>';
			create_down_organization(t_id);
			vHtml += '	</li>';
		}
		vHtml += '</ul>';
	}
}
var organization_id = 0;
var organization_up_name = "";
var organization_up_id;
var organization_level;
var v_flag = "";
function open_organization_button(v_id, v_level, v_organization_up_name)
{
	organization_id = v_id;
	organization_up_id = v_id;
	organization_level = v_level + 1;
	organization_up_name = v_organization_up_name;
	
	if(v_id > 0){
		$("#btn_modify").show();
		$("#btn_delete").show();
	}else{
		$("#btn_modify").hide();
		$("#btn_delete").hide();
	}
	$("#organization_title").html(v_organization_up_name);
	$("#modal-organization-info").modal();
}

function form_add()
{
	v_flag = "I";
	$("#modal-organization-info").modal("hide");
	
	$("#organization_up_name").html(organization_up_name);
	$("#organization_name").val("");
	$("#organization_icon").val("");
	
	$("#modal-organization").modal();
}

function form_modify()
{
	v_flag = "U";	
	
	$.ajax({
		type : "POST",
		url : "/base/getAuthOrganization.do",
		data:{
			id:organization_id
		},
		success:function(data){
			$("#modal-organization-info").modal("hide");
			
			$("#organization_up_name").html(data.organization_up_name);
			$("#organization_name").val(data.organization_name);
			$("#organization_icon").val(data.organization_icon);
			
			$("#modal-organization").modal();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function form_delete()
{
	$.ajax({
		type : "POST",
		url : "/base/deleteAuthOrganization.do",
		data:{
			id:organization_id
		},
		dataType : "text",
		success:function(data){ 
			if(data == "OK")
			{
				alert("삭제하였습니다.");
			}else{
				alert("하위 조직을 먼저 삭제하셔야 합니다.");
			}
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function form_save()
{
	var url = "/base/updateAuthOrganization.do";
	if(v_flag == "I") url = "/base/insertAuthOrganization.do";
	$.ajax({
		type : "POST",
		url : url,
		data:{
			id:organization_id,
			organization_name:$("#organization_name").val(),
			organization_up_id:organization_up_id,
			organization_icon:$("#organization_icon").val(),
			organization_level:organization_level
		},
		success:function(data){
			$("#modal-organization").modal("hide");
			form_search();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}