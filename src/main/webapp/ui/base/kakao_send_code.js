var array_delete;
/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	form_search();
	
});

function form_search()
{
	array_delete = Array();
	$.ajax({
		type : "POST",
		url : "/base/getBaseKakaoSendCodeList.do",
		data:{

		},
		success:function(data){

			$("#dataList").html("");
			for(var i=0; i<data.length; i++){
				add_table(data[i].id, data[i].send_code, data[i].send_value, data[i].send_default_value, data[i].created_name+"("+data[i].created+")", data[i].modified_name+"("+data[i].modified+")");
			}
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function add_table(v_id, v_send_code, v_send_value, v_send_default_value, v_created, v_modified)
{
	var v_flag = "I";
	if(v_id > 0 ) v_flag = "U";
	var readonly = "";
	if(v_id > 0 ) readonly = "readonly";
	var vHtml = "";
	vHtml += "<tr>";
	vHtml += '	<td class="text-with-form-control">';
	vHtml += '		<input type="hidden" name="send_code_flag" value="'+v_flag+'">';
	vHtml += '		<input type="hidden" name="send_code_id" value="'+v_id+'">';
	vHtml += '		<input type="text" class="form-control" name="send_code" value="'+v_send_code+'" '+readonly+'>';
	vHtml += "	</td>";
	vHtml += '	<td class="text-with-form-control">';
	vHtml += '		<input type="text" class="form-control" name="send_value" value="'+v_send_value+'">';
	vHtml += "	</td>";
	vHtml += '	<td class="text-with-form-control">';
	vHtml += '		<input type="text" class="form-control" name="send_default_value" value="'+v_send_default_value+'">';
	vHtml += "	</td>";
	vHtml += "	<td class='text-center'>"+v_created+"</td>";
	vHtml += "	<td class='text-center'>"+v_modified+"</td>";
	vHtml += "	<td class='with-btn text-center' nowrap=''>";
	vHtml += "		<button type='button' class='btn btn-sm btn-danger' onclick='form_delete(this)'>삭제</button>";
	vHtml += "	</td>";
	vHtml += "</tr>";
	$("#dataList").append(vHtml);
}

function form_add()
{
	add_table(0, "", "", "", "", "");
}

function form_delete(obj)
{
	var send_code_flag     = $(obj).closest("tr").find("input[name='send_code_flag']").val();
	var send_code_id       = $(obj).closest("tr").find("input[name='send_code_id']").val();
	var send_code          = $(obj).closest("tr").find("input[name='send_code']").val();
	var send_value         = $(obj).closest("tr").find("input[name='send_value']").val();
	var send_default_value = $(obj).closest("tr").find("input[name='send_default_value']").val();
	if(send_code_flag == "U"){
		var objData = Object();
		objData.flag               = 'D';
		objData.send_code_id       = send_code_id;
		objData.send_code          = send_code;
		objData.send_value         = send_value;
		objData.send_default_value = send_default_value;
		
		array_delete.push(objData);
	}
	
	$(obj).closest("tr").remove();
}

function form_save()
{
	var array_data = Array();
	for(var i=0; i<array_delete.length; i++)
	{
		array_data.push(array_delete[i]);
	}
	
	var $_send_code_flag     = $("input[name='send_code_flag']");
	var $_send_code_id       = $("input[name='send_code_id']");
	var $_send_code          = $("input[name='send_code']");
	var $_send_value         = $("input[name='send_value']");
	var $_send_default_value = $("input[name='send_default_value']");
	
	$_send_code_flag.each(function(index) {
		var send_code_flag     = $(this).val();
		var send_code_id       = $_send_code_id.eq(index).val();
		var send_code          = $_send_code.eq(index).val();
		var send_value         = $_send_value.eq(index).val();
		var send_default_value = $_send_default_value.eq(index).val();
		
		var objData = Object();
		objData.flag               = send_code_flag;
		objData.send_code_id       = send_code_id;
		objData.send_code          = send_code;
		objData.send_value         = send_value;
		objData.send_default_value = send_default_value;
		array_data.push(objData);
    });

	
	var data_value = JSON.stringify(array_data);
	
	$.ajax({
		type : "POST",
		url : "/base/saveBaseKakaoSendCode.do",
		data:{
			data_value:data_value
		},
		success:function(data){
			form_search();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}
