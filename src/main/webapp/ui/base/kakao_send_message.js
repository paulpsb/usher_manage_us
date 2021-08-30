var send_message_id = -1;
/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	search_code();
	
});

function search_code()
{
	$.ajax({
		type : "POST",
		url : "/base/getBaseKakaoSendCodeList.do",
		data:{

		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				var v_send_code  = data[i].send_code;
				var v_send_value = data[i].send_value;
				vHtml += '<div class="col-3 mb-1">';
				vHtml += '	<button type="button" class="btn btn-default btn-sm btn-block" onClick="insertHTML(\''+v_send_code+'\')">'+v_send_value+'('+v_send_code+')</button>';
				vHtml += '</div>'; 
			}
			
			$("#div_send_code").html(vHtml);
			form_search();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function form_search()
{
	send_message_id = -1;
	
	$("#send_message_gubun").val("");
	$("#send_message_name").val("");
	CKEDITOR.instances.send_message_desc.setData("");
	$("#send_message_gubun").attr("disabled", true);
	$("#send_message_name").attr("disabled", true);

	
	$.ajax({
		type : "POST",
		url : "/base/getBaseKakaoSendMessageList.do",
		data:{

		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				var v_id = data[i].id;
				vHtml += '<tr">';
				vHtml += '	<td class="text-center">'+data[i].send_message_gubun+'</td>';
				vHtml += '	<td class="text-center">'+data[i].send_message_name+'</td>';
				vHtml += "	<td class='with-btn text-center' nowrap=''>";
				vHtml += "		<button type='button' class='btn btn-sm btn-primary' onclick='form_modify("+v_id+")'>수정</button>";
				vHtml += "		<button type='button' class='btn btn-sm btn-danger' onclick='form_delete("+v_id+")'>삭제</button>";
				vHtml += "	</td>";
				vHtml += '</tr>'; 
			}
			
			$("#dataList").html(vHtml);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function form_add()
{
	send_message_id = 0;
	
	$("#send_message_gubun").val("");
	$("#send_message_name").val("");
	CKEDITOR.instances.send_message_desc.setData("");
	$("#send_message_gubun").attr("disabled", false);
	$("#send_message_name").attr("disabled", false);
	
	$("#send_message_gubun").focus();
}

function form_modify(v_id)
{
	send_message_id = v_id;
	
	$.ajax({
		type : "POST",
		url : "/base/getBaseKakaoSendMessage.do",
		data:{
			id:v_id
		},
		success:function(data){
			$("#send_message_gubun").val(data.send_message_gubun);
			$("#send_message_name").val(data.send_message_name);
			CKEDITOR.instances.send_message_desc.setData(data.send_message_desc);
			$("#send_message_gubun").attr("disabled", true);
			$("#send_message_name").attr("disabled", false);
			
			$("#send_message_gubun").focus();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function form_delete(v_id)
{
	if(!confirm("삭제하시겠습니까?")) return;
	$.ajax({
		type : "POST",
		url : "/base/deleteBaseKakaoSendMessage.do",
		data:{
			id:v_id
		},
		success:function(data){
			form_search();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function form_save()
{
	var v_send_message_desc = CKEDITOR.instances.send_message_desc.getData();
	$.ajax({
		type : "POST",
		url : "/base/saveBaseKakaoSendMessage.do",
		data:{
			id:send_message_id,
			send_message_gubun:$("#send_message_gubun").val(),
			send_message_name:$("#send_message_name").val(),
			send_message_desc:v_send_message_desc
		},
		success:function(data){
			form_search();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function insertHTML(str)
{
	if(send_message_id < 0) return;
	
	var oEditor = CKEDITOR.instances.send_message_desc;
	var val = oEditor.getSelection().getRanges()[0];
	var text = oEditor.getSelection().getSelectedText();
	var value;
	
	if(!text) 
		value = '['+str+']';
	else 
		value = '['+str+']';

	if ( oEditor.mode == 'wysiwyg' )
	{
		oEditor.insertHtml( value );
	}
	else
		alert( 'You must be in WYSIWYG mode!' );
}