var task_status = {
		ACTIVE:{ name:"활성"},
		INACTIVE:{ name:"비활성"}
	};
var page = 1;
var row_num = 20;
var aws_url = "https://s3.ap-northeast-2.amazonaws.com/";

var task_category_id = 0;
var task_category_title = "";
jQuery(document).ready(function(){
	/*
	$("input[name='search_routine_category']").click(function(){
		form_search();
	});
	
	$("input[name='search_routine_type']").click(function(){
		form_search();
	});
	*/
	var vHtml = "";
	for(var i=12; i>0; i--)
	{
		vHtml += '<option value="'+(i*10)+'">'+(i*10)+'분</option>';
	}
	$('#reference_time').html(vHtml);
	$('#search_status').change(function(e){
		form_search();
	});	
	
	form_search();
});

function form_search()
{
	task_category_id = 0;
	task_category_title = "";
	$("#search_task_category_title").html("");
	$("#detail_list").html("");
	search_list(1);
}

function search_list(vPage)
{
	page = vPage;

	$.ajax({
		type : "POST",
		url : "/notice/getNoticesTaskCategoryList.do",
		data : {
			status: $("#search_status").val(),
			page:vPage,
			row_num:row_num
		},
		success:function(data){
			var total_count = data.taskCategoryCount.total_count;
			var total_page = Math.ceil(total_count/row_num);
			
			var taskCategoryList = data.taskCategoryList;
			var vHtml = "";
			if(taskCategoryList.length > 0)
			{
				for(var i=0; i<taskCategoryList.length; i++){
					var no = total_count - (row_num * (vPage-1)) - i;
					vHtml += "<tr>";
					vHtml += "<td class='text-center'>"+no+"</td>";
					vHtml += "<td>"+cfmNvl1(taskCategoryList[i].title)+"</td>";
					vHtml += "<td class='text-center'>"+task_status[taskCategoryList[i].status].name+"</td>";
					vHtml += "<td class='text-center'>"+cfmNvl1(taskCategoryList[i].start_date)+"</td>";
					vHtml += "<td class='text-center'>"+cfmNvl1(taskCategoryList[i].end_date)+"</td>";
					vHtml += "<td class='with-btn text-center' nowrap=''>";
					vHtml += "	<button type='button' class='btn btn-sm btn-primary m-r-2' onclick='form_modify_category(\""+taskCategoryList[i].id+"\")'>수정</button>";
					vHtml += "	<button type='button' class='btn btn-sm btn-primary m-r-2' onclick='form_detail(\""+taskCategoryList[i].id+"\",\""+taskCategoryList[i].title+"\")'>보기</button>";
					vHtml += "	<button type='button' class='btn btn-sm btn-primary m-r-2' onclick='form_delete_category(\""+taskCategoryList[i].id+"\")'>삭제</button>";
					vHtml += "</td>";
					vHtml += "</tr>";
				}
			}else{
				vHtml = "<tr><td class='text-center' colspan='6'>조회된 데이터가 없습니다.</td></tr>";
			}
			
			$("#category_list").html(vHtml);
			
			vHtml = cfmPage(10, vPage, total_page, "search_list");
			$("#category_page").html(vHtml);
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}


function form_detail(v_id, v_name)
{
	task_category_id = v_id;
	task_category_title = v_name;
	
	$("#search_task_category_title").html(v_name);

	$.ajax({
		type : "POST",
		url : "/notice/getNoticesTaskCategoryDetailList.do",
		data : {
			task_category_id: task_category_id
		},
		success:function(data){
			var vHtml = "";
			if(data.length > 0)
			{
				for(var i=0; i<data.length; i++){
					vHtml += "<tr>";
					vHtml += "<td class='text-center'>"+(i+1)+"</td>";
					vHtml += "<td>"+cfmNvl1(data[i].reference_title)+"</td>";
					vHtml += "<td class='text-center'>";
					if(data[i].report_image){
						vHtml += '<span class="badge badge-primary">&nbsp</span>';
					}else{
						vHtml += "&nbsp;";
					}
					vHtml += "</td>";
					vHtml += "<td class='text-center'>";
					if(data[i].report_url){
						vHtml += '<span class="badge badge-primary">&nbsp</span>';
					}else{
						vHtml += "&nbsp;";
					}
					vHtml += "</td>";
					vHtml += "<td class='text-center'>";
					if(data[i].report_file){
						vHtml += '<span class="badge badge-primary">&nbsp</span>';
					}else{
						vHtml += "&nbsp;";
					}
					vHtml += "</td>";
					vHtml += "<td class='with-btn text-center' nowrap=''>";
					vHtml += "	<button type='button' class='btn btn-sm btn-primary m-r-2' onclick='form_modify_detail(\""+data[i].id+"\")'>수정</button>";
					vHtml += "	<button type='button' class='btn btn-sm btn-primary m-r-2' onclick='form_delete_detail(\""+data[i].id+"\")'>삭제</button>";
					vHtml += "</td>";
					vHtml += "</tr>";
				}
			}else{
				vHtml = "<tr><td class='text-center' colspan='6'>조회된 데이터가 없습니다.</td></tr>";
			}
			
			$("#detail_list").html(vHtml);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function form_add_category()
{
	
	$("#task_category_id").val("0");
	$("#task_category_title").val("");
	$("#task_category_start_date").val("");
	$("#task_category_end_date").val("");
	$("#task_category_status").prop("checked", true);
	$("#modal-task-category").modal();
}

function form_modify_category(v_id)
{
	$.ajax({
		type : "POST",
		url : "/notice/getNoticesTaskCategory.do",
		data : {
			id: v_id
		},
		success:function(data){
			$("#task_category_id").val(data.id);
			$("#task_category_title").val(data.title);
			$("#task_category_start_date").val(data.start_date);
			$("#task_category_end_date").val(data.end_date);
			if(data.status == "ACTIVE")
			{
				$("#task_category_status").prop("checked", true);
			}else{
				$("#task_category_status").prop("checked", false);
			}
			$("#modal-task-category").modal();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function form_delete_category(v_id)
{
	if(!confirm("삭제하시겠습니까?")) return;
	
	$.ajax({
		type : "POST",
		url : "/notice/deleteNoticesTaskCategory.do",
		data : {
			id: v_id
		},
		success:function(data){
			alert("삭제하였습니다.");
			task_category_id = 0;
			task_category_title = "";
			$("#search_task_category_title").html("");
			$("#detail_list").html("");
			search_list(page);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}
function form_save_category()
{
	var url = "/notice/updateNoticesTaskCategory.do";
	if($("#task_category_id").val() == "0")
	{
		url = "/notice/insertNoticesTaskCategory.do";
	}
	
	var status = $('input[name="task_category_status"]:checked').val();
	if(status == "1"){
		status = "ACTIVE";
	}else{
		status = "INACTIVE";
	}
		
	$.ajax({
		type : "POST",
		url : url,
		data : {
			id: $("#task_category_id").val(),
			title: $("#task_category_title").val(),
			status:status,
			start_date: $("#task_category_start_date").val(),
			end_date: $("#task_category_end_date").val(),
		},
		success:function(data){
			alert("저장하였습니다.");
			$("#modal-task-category").modal("hide");
			search_list(page);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function form_add_detail()
{
	if(task_category_id <= 0) return;
	
	$("#td_task_category_title").html(task_category_title);
	$("#task_detail_id").val("0");
	$("#reference_title").val("");
	$('#reference_time').val("60");
	$("#reference_contents").val("");
	$("#span_reference_image").html("");
	$("#div_reference_image").html("");
	$("#reference_image").val("");
	$("#reference_image_name").val("");
	$("#reference_url").val("");
	$("#span_reference_file").html("");
	$("#reference_file").val("");
	$("#reference_file_name").val("");

	$("#report_image").prop("checked", true);
	$("#report_url").prop("checked", true);
	$("#report_file").prop("checked", true);

	$("#modal-task-detail").modal();
}

function form_modify_detail(v_id)
{
	$.ajax({
		type : "POST",
		url : "/notice/getNoticesTaskCategoryDetail.do",
		data : {
			id: v_id
		},
		success:function(data){

			$("#td_task_category_title").html(task_category_title);
			$("#task_detail_id").val(data.id);
			$("#reference_title").val(data.reference_title);
			$('#reference_time').val(data.reference_time);
			$("#reference_contents").val(data.reference_contents);
			$("#span_reference_image").html(data.reference_image_name);
			if(data.reference_image){
				$("#div_reference_image").html('<img src="'+data.reference_image+'" style="border:1px solid #000;width:100%;">');
			}else{
				$("#div_reference_image").html("");
			}
			$("#reference_image").val(data.reference_image);
			$("#reference_image_name").val(data.reference_image_name);
			$("#reference_url").val(data.reference_url);
			if(data.reference_file){
				$("#span_reference_file").html('<a href="'+data.reference_file+'" target="_blank">'+data.reference_file_name+'</a>');
			}else{
				$("#span_reference_file").html("");
			}
			$("#reference_file").val(data.reference_file);
			$("#reference_file_name").val(data.reference_file_name);

			if(data.report_image)
			{
				$("#report_image").prop("checked", true);
			}else{
				$("#report_image").prop("checked", false);
			}
			if(data.report_url)
			{
				$("#report_url").prop("checked", true);
			}else{
				$("#report_url").prop("checked", false);
			}
			if(data.report_file)
			{
				$("#report_file").prop("checked", true);
			}else{
				$("#report_file").prop("checked", false);
			}
			
			$("#modal-task-detail").modal();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function form_delete_detail(v_id)
{
	if(!confirm("삭제하시겠습니까?")) return;
	
	$.ajax({
		type : "POST",
		url : "/notice/deleteNoticesTaskCategoryDetail.do",
		data : {
			id: v_id
		},
		success:function(data){
			alert("삭제하였습니다.");
			form_detail(task_category_id, task_category_title);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}
var file_type = "";
function form_add_detail_image()
{
	file_type = "IMAGE";
	
	$("#form1").html('<input type="file" class="form-control" name="file" id="file" accept="image/*">');
	$("#modal-task-file").modal();
}

function form_delete_detail_image()
{
	$("#span_reference_image").html("");
	$("#div_reference_image").html("");
	$("#reference_image").val("");
	$("#reference_image_name").val("");

}

function form_add_detail_file()
{
	file_type = "FILE";
	$("#form1").html('<input type="file" class="form-control" name="file" id="file">');
	$("#modal-task-file").modal();
}

function form_delete_detail_file()
{
	$("#span_reference_file").html("");
	$("#reference_file").val("");
	$("#reference_file_name").val("");

}

function form_file_save()
{
	var formData=new FormData(document.getElementById('form1'));
	var file_name = document.getElementById('form1').file.value;
	
	
	$.ajax({
        type: 'POST',
        url: '/common/getFileUploadNoticeTask.do',
        data: formData,
        processData: false,
        contentType: false
    }).done(function (data) {
    	var array_file_name = data.split("||");
    	if(file_type == "IMAGE"){
    		$("#span_reference_image").html(array_file_name[1]);
    		$("#reference_image_name").val(array_file_name[1]);
    		$("#reference_image").val(aws_url+array_file_name[0]);
    		$("#div_reference_image").html('<img src="'+aws_url+array_file_name[0]+'" style="border:1px solid #000;width:100%;">');
    	}else{
    		$("#span_reference_file").html('<a href="'+aws_url+array_file_name[0]+'" target="_blank">'+array_file_name[1]+'</a>');
    		$("#reference_file_name").val(array_file_name[1]);
    		$("#reference_file").val(aws_url+array_file_name[0]);
    	}
    	$("#modal-task-file").modal("hide");
    }).fail(function (error) {
    	console.log(error);
    })
}

function form_save_detail()
{
	var url = "/notice/updateNoticesTaskCategoryDetail.do";
	if($("#task_detail_id").val() == "0")
	{
		url = "/notice/insertNoticesTaskCategoryDetail.do";
	}
	
	var report_image_value = $('input[name="report_image"]:checked').val();
	var report_image = false
	if(report_image_value == "1"){
		report_image = true;
	}
	
	var report_url_value = $('input[name="report_url"]:checked').val();
	var report_url = false
	if(report_url_value == "1"){
		report_url = true;
	}
	
	var report_file_value = $('input[name="report_file"]:checked').val();
	var report_file = false
	if(report_file_value == "1"){
		report_file = true;
	}
	
	$.ajax({
		type : "POST",
		url : url,
		data : {
			id: $("#task_detail_id").val(),
			reference_time: $("#reference_time").val(),
			reference_title: $("#reference_title").val(),
			reference_contents: $("#reference_contents").val(),
			reference_image: $("#reference_image").val(),
			reference_image_name: $("#reference_image_name").val(),
			reference_url: $("#reference_url").val(),
			reference_file: $("#reference_file").val(),
			reference_file_name: $("#reference_file_name").val(),
			report_image:report_image,
			report_url:report_url,
			report_file:report_file,
			task_category_id:task_category_id
		},
		success:function(data){
			alert("저장하였습니다.");
			$("#modal-task-detail").modal("hide");
			form_detail(task_category_id, task_category_title);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}