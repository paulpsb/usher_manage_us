/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	$("#search_section").change(function(e){
		form_search();
	});
	$("#search_staus").change(function(e){
		form_search();
	});
	$("#search_book_name").keydown(function(key) {
		if (key.keyCode == 13) {
			form_search();
		}
	});

	form_search();
	
});

function form_search()
{
	$.ajax({
		type : "POST",
		url : "/base/getBaseBookList.do",
		data:{
			section:$("#search_section").val(),
			status:$("#search_staus").val(),
			book_name:$("#search_book_name").val()
		},
		success:function(data){

			var vHtml = "";
			for(var i=0; i<data.length; i++){
				var v_status = "사용";
				if(data[i].status != "ACTIVE") v_status = "미사용";
				vHtml += "<tr>";
				vHtml += "<td class='text-center'>"+data[i].section+"</td>";
				vHtml += "<td class='text-center'>"+data[i].book_name+"</td>";
				vHtml += "<td class='text-right'>"+data[i].book_amount+"</td>";
				vHtml += "<td class='text-right'>"+data[i].book_kyobo_amount+"</td>";
				vHtml += "<td class='text-center'>"+v_status+"</td>";
				vHtml += "<td class='text-right'>"+data[i].book_sort+"</td>";
				vHtml += "<td class='text-center'>"+data[i].created_name+"("+data[i].created+")"+"</td>";
				vHtml += "<td class='text-center'>"+data[i].modified_name+"("+data[i].modified+")"+"</td>";
				vHtml += "<td class='with-btn text-center' nowrap=''>";
				vHtml += "	<button type='button' class='btn btn-sm btn-primary' onclick='form_modify("+data[i].id+")'>수정</button>";
				vHtml += "	<button type='button' class='btn btn-sm btn-danger' onclick='form_delete("+data[i].id+")'>삭제</button>";
				vHtml += "</td>";
				vHtml += "</tr>";
			}
			
			$("#dataList").html(vHtml);

		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

var book_idx;
function form_add()
{
	book_idx = 0;
	$("#section").val("VOCA");
	$("#book_name").val("");
	$("#book_amount").val("");
	$("#book_kyobo_amount").val("");
	$("#book_image").val("");
	$("#book_url").val("");
	$("#book_sort").val("0");
	$("#status").prop("checked", true);
	$("#td_book_image").html("");
	$("#modal-book").modal();
}

function form_modify(v_id)
{
	book_idx = v_id;
	$.ajax({
		type : "POST",
		url : "/base/getBaseBook.do",
		data:{
			id:v_id
		},
		success:function(data){
			$("#section").val(data.section);
			$("#book_name").val(data.book_name);
			$("#book_amount").val(data.book_amount);
			$("#book_kyobo_amount").val(data.book_kyobo_amount);
			$("#book_image").val(data.book_image);
			$("#book_url").val(data.book_url);
			if(data.status == "ACTIVE"){
				$("#status").prop("checked", true);
			}else{
				$("#status").prop("checked", false);
			}
			if(data.book_image){
				$("#td_book_image").html("<img src='"+data.book_image+"' style='width:100%;'>");
			}else{
				$("#td_book_image").html("");
			}
			$("#book_sort").val(data.book_sort);
			$("#modal-book").modal();
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
		url : "/base/deleteBaseBook.do",
		data:{
			id:v_id
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
	var section           = $("#section").val();
	var book_name         = $("#book_name").val();
	var book_amount       = $("#book_amount").val();
	var book_kyobo_amount = $("#book_kyobo_amount").val();
	var book_image        = $("#book_image").val();
	var book_url          = $("#book_url").val();
	var book_sort         = $("#book_sort").val();
	var status            = "ACTIVE";
	if(!$("#status").is(":checked")){
		status            = "INACTIVE";
	}
	var url = "/base/insertBaseBook.do";
	if(book_idx > 0) url = "/base/updateBaseBook.do";
	$.ajax({
		type : "POST",
		url : url,
		data:{
			id:book_idx,
			status:status,
			section:section,
			book_name:book_name,
			book_amount:book_amount,
			book_kyobo_amount:book_kyobo_amount,
			book_image:book_image,
			book_url:book_url,
			book_sort:book_sort
		},
		success:function(data){

			alert("저장하였습니다.");
			$("#modal-book").modal("hide");
			form_search();

		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function add_image()
{
	$("#image_file").click();
}

function load_image(event)
{
    var formData=new FormData();
	formData.append("file",event.files[0], event.files[0].name);
	
	$.ajax({
        type: 'POST',
        url: '/base/uploadBookFileUpload.do',
        data: formData,
        processData: false,
        contentType: false
    }).done(function (data) {
    	var bucketUrl = "https://s3.ap-northeast-2.amazonaws.com/"+data;
    	$("#book_image").val(bucketUrl);
    	$("#td_book_image").html("<img src='"+bucketUrl+"' style='width:100%;'>");
    }).fail(function (error) {
    	console.log(error);
    })
}