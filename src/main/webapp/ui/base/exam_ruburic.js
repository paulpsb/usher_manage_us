/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	$('#search_section').change(function(e){
		search_book();
	});	
	
	$('#search_book').change(function(e){
		form_search();
	});	
	
	search_book();
    
});

function search_book()
{

	$.ajax({
		type : "POST",
		url : "/common/getProblemBookList.do",
		data:{
			section:$('#search_section').val()
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				if(data[i].book == "암기시험" || data[i].book == "지문과 관련없는 OX시험들") continue;
				
				vHtml += "<option value='"+data[i].book+"'>"+data[i].book+"</option>";
			}
			$("#search_book").html(vHtml);

			form_search();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function form_search()
{
	$.ajax({
		type : "POST",
		url : "/base/getBaseExamRuburicList.do",
		data:{
			section:$('#search_section').val(),
			book:$('#search_book').val()
		},
		success:function(data){
			country1 = "";
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				vHtml += "<tr>";
				vHtml += "	<td class='text-center'>"+data[i].section+"</td>";
				vHtml += "	<td class='text-center'>"+data[i].book+"</td>";
				vHtml += "	<td class='text-center'>"+data[i].ruburic_num+"</td>";
				vHtml += "	<td>"+data[i].ruburic_category_title+"</td>";
				vHtml += "	<td>"+data[i].ruburic_category_sub+"</td>";
				vHtml += "	<td>"+data[i].ruburic_content_title+"</td>";
				vHtml += "	<td>"+data[i].ruburic_content_sub+"</td>";
				vHtml += "	<td class='with-btn text-center' nowrap=''>";
				vHtml += "		<button type='button' class='btn btn-sm btn-primary width-60 m-r-2' onclick='form_modify(\""+data[i].id+"\")'>수정</a>";
				vHtml += "		<button type='button' class='btn btn-sm btn-primary width-60 m-r-2' onclick='form_delete(\""+data[i].id+"\")'>삭제</a>";
				vHtml += "	</td>";
				vHtml += "</tr>";
			}
			
			$("#data_list").html(vHtml);
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function form_add()
{
	$("#ruburic_id").val("0");
	$("#ruburic_num").val("");
	$("#section").val($("#search_section").val());
	$("#book").val($("#search_book").val());
	$("#ruburic_category_title").val("");
	$("#ruburic_category_sub").val("");
	$("#ruburic_content_title").val("");
	$("#ruburic_content_sub").val("");
	
	$("#ruburic_num").attr("disabled", false);
	
	$("#modal-ruburic").modal();
}

function form_modify(v_ruburic_id)
{
	$.ajax({
		type : "POST",
		url : "/base/getBaseExamRuburic.do",
		data:{
			id:v_ruburic_id
		},
		success:function(data){
			$("#ruburic_id").val(data.id);
			$("#section").val(data.section);
			$("#book").val(data.book);
			$("#ruburic_num").val(data.ruburic_num);
			$("#ruburic_category_title").val(data.ruburic_category_title);
			$("#ruburic_category_sub").val(data.ruburic_category_sub);
			$("#ruburic_content_title").val(data.ruburic_content_title);
			$("#ruburic_content_sub").val(data.ruburic_content_sub);
			
			$("#ruburic_num").attr("disabled", true);
			
			$("#modal-ruburic").modal();

			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function form_delete(v_ruburic_id)
{
if(!confirm("삭제하시겠습니까?")) return;
	
	$.ajax({
		type : "POST",
		url : "/base/deleteBaseExamRuburic.do",
		data:{
			id:v_ruburic_id
		},
		success:function(data){
			alert("삭제하였습니다.");
			form_search();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

function form_save()
{
	var url = "";
	if($('#ruburic_id').val() == "0")
	{
		url = "/base/insertBaseExamRuburic.do";
	}else{
		url = "/base/updateBaseExamRuburic.do";
	}
	$.ajax({
		type : "POST",
		url :url,
		data:{
			id:$('#ruburic_id').val(),
			section:$('#section').val(),
			book:$('#book').val(),
			ruburic_num:$('#ruburic_num').val(),
			ruburic_category_title:$('#ruburic_category_title').val(),
			ruburic_category_sub:$('#ruburic_category_sub').val(),
			ruburic_content_title:$('#ruburic_content_title').val(),
			ruburic_content_sub:$('#ruburic_content_sub').val()
		},
		success:function(data){
			alert("저장하였습니다.");
			$("#modal-ruburic").modal("hide");
			form_search();
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}