var page = 1;
var row_num = 20;

var task_stats = {
		REQUEST:{name:"작업요청",   color:"bg-grey-darker"},
		TIMEING:{name:"시간지정",   color:"bg-grey-darker"},
		STARTING:{name:"작업시작",  color:"bg-yellow-transparent-7"},
		WORKING:{name:"작업중",    color:"bg-yellow-transparent-7"},
		RESPONSE:{name:"작업전송",  color:"bg-blue-transparent-7"},
		RETURN:{name:"반려",       color:"bg-red-transparent-7"},
		COMPLETE:{name:"작업완료",  color:"bg-teal-transparent-7"}
	};

jQuery(document).ready(function(){
	var to_pre_day = cfmGetToDefaultMonth()+"-01";
	var to_nxt_day  = cfmGetToDate();
	
	$("#search_task_start_date").val(to_pre_day);
	$("#search_task_end_date").val(to_nxt_day);
	
	$('#search_task_status').change(function(e){
		form_search();
	});	
	
	$("#search_task_title").keydown(function(key) {
		if (key.keyCode == 13) {
			form_search();
		}
	});
	
	$("#search_task_reference_content").keydown(function(key) {
		if (key.keyCode == 13) {
			form_search();
		}
	});	


	$("#search_task_user_name").keydown(function(key) {
		if (key.keyCode == 13) {
			form_search();
		}
	});
	
	form_search();
});

function form_search()
{
	search_list(1);
}

function search_list(vPage)
{
	page = vPage;
	
	var search_task_start_date         = $("#search_task_start_date").val();
	var search_task_end_date           = $("#search_task_end_date").val();
	var search_task_status             = $("#search_task_status").val();
	var search_task_title              = $("#search_task_title").val();
	var search_task_reference_content  = $("#search_task_reference_content").val();
	var search_task_user_name          = $("#search_task_user_name").val();
	$.ajax({
		type : "POST",
		url : "/notice/getTaskList.do",
		data : {
			task_start_date : search_task_start_date,
			task_end_date:search_task_end_date,
			task_status:search_task_status,
			task_title:search_task_title,
			task_reference_content:search_task_reference_content,
			task_user_name:search_task_user_name,
			page:vPage,
			row_num:row_num
		},
		success:function(data){
			var total_count = data.taskCount.total_count;
			var total_page = Math.ceil(total_count/row_num);
			
			var taskList = data.taskList;
			var statusList = data.statusList;
			var vHtml = "";
			if(taskList.length > 0)
			{
				for(var i=0; i<taskList.length; i++){
					var no = total_count - (row_num * (vPage-1)) - i;
					var task_id = taskList[i].id;
					
					vHtml += "<tr>";
					vHtml += "<td class='text-center'>"+no+"</td>";
					vHtml += "<td>"+cfmNvl1(taskList[i].task_title)+"</td>";
					vHtml += "<td>"+cfmNvl1(taskList[i].task_reference_title)+"</td>";
					vHtml += "<td class='text-center'>"+cfmNvl1(taskList[i].task_estimated_time)+"분</td>";
					vHtml += "<td class='text-center'>"+cfmNvl1(taskList[i].task_user_name)+"</td>";
					
					vHtml += "<td class='text-center'>";
					vHtml += '	<div class="row" style="margin:0px;">';
					var array_status = statusList.filter(function(item, index){
						if(item.task_id == task_id){
							return true;
						}
					});
					for(var t=0; t<array_status.length; t++)
					{
						var v_detail_status = task_stats[array_status[t].task_detail_status].name;
						var v_detail_color  = task_stats[array_status[t].task_detail_status].color;
						var v_detail_date = array_status[t].detail_date;
						var v_detail_detail_time = array_status[t].detail_time;
						var v_detail_user_name = array_status[t].detail_user_name;
						vHtml += '<div class="col-3 text-center" style="padding:5px;">';
						vHtml += '	<div class="'+v_detail_color+'" style="width:100%;padding:5px;">';
						vHtml += v_detail_status+'<br>';
						vHtml += v_detail_date+'<br>';
						vHtml += v_detail_detail_time+' '+v_detail_user_name;
						vHtml += '	</div>';
						vHtml += '</div>';
					}
					vHtml += '	</div>';
					vHtml += "</td>";
					vHtml += "<td class='text-center'>";
					if(taskList[i].task_report_image){
						if(taskList[i].task_image){
							vHtml += '<span class="badge badge-primary">&nbsp</span>';
						}else{
							vHtml += '<span class="badge badge-danger">&nbsp</span>';
						}
					}else{
						vHtml += "&nbsp;";
					}
					vHtml += "</td>";
					
					vHtml += "<td class='text-center'>";
					if(taskList[i].task_report_file){
						console.log(taskList[i].task_file);
						if(taskList[i].task_file){
							vHtml += '<span class="badge badge-primary">&nbsp</span>';
						}else{
							vHtml += '<span class="badge badge-danger">&nbsp</span>';
						}
					}else{
						vHtml += "&nbsp;";
					}
					vHtml += "</td>";

					vHtml += "<td class='text-center'>";
					if(taskList[i].task_report_url){
						if(taskList[i].task_url){
							vHtml += '<span class="badge badge-primary">&nbsp</span>';
						}else{
							vHtml += '<span class="badge badge-danger">&nbsp</span>';
						}
					}else{
						vHtml += "&nbsp;";
					}
					vHtml += "</td>";
					
					
					vHtml += "<td class='with-btn text-center' nowrap=''>";
					vHtml += "	<button type='button' class='btn btn-sm btn-primary m-r-2' onclick='form_view(\""+taskList[i].id+"\")'>상세보기</button>";
					vHtml += "	<button type='button' class='btn btn-sm btn-primary m-r-2' onclick='form_log(\""+taskList[i].id+"\")'>로그보기</button>";
					vHtml += "</td>";
					vHtml += "</tr>";
				}
			}else{
				vHtml = "<tr><td class='text-center' colspan='10'>조회된 데이터가 없습니다.</td></tr>";
			}
			
			$("#data_list").html(vHtml);
			
			vHtml = cfmPage(10, vPage, total_page, "search_list");
			$("#page_list").html(vHtml);
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}
var task_id;
function form_view(v_id)
{
	task_id = v_id;
	$.ajax({
		type : "POST",
		url : "/notice/getTask.do",
		data : {
			id : v_id
		},
		success:function(data){
			$("#task_title").html(data.task_title);
			$("#task_reference_title").html(data.task_reference_title);
			$("#task_reference_content").html(data.task_reference_content);

			if(data.task_reference_image)
			{
				$("#task_reference_image").html('<img src="'+data.task_reference_image+'" style="border:1px solid #000;width:100%;">');
				$("#div_task_reference_image").show();
			}else{
				$("#div_task_reference_image").hide();
			}
			
			if(data.task_reference_url)
			{
				$("#task_reference_url").html('<a href="'+data.task_reference_url+'" class="text-dark" target="_blank"><h5>'+data.task_reference_url+'</h5></a>');
				$("#div_task_reference_url").show();
			}else{
				$("#div_task_reference_url").hide();
			}
			
			if(data.task_reference_file)
			{
				$("#task_reference_file").html('<a href="'+data.task_reference_file+'" class="text-dark" target="_blank"><h5>'+data.task_reference_file_name+'</h5></a>');
				$("#div_task_reference_file").show();
			}else{
				$("#div_task_reference_file").hide();
			}
			
			$("#task_content").html(cfmNvl1(data.task_content));
			
			if(data.task_report_image){
				$("#div_task_image1").show();
				$("#div_task_image2").show();
				if(data.task_image){
					$("#div_task_image2").html('<img src="'+data.task_image+'" style="border:1px solid #000;width:100%;">');
				}else{
					$("#div_task_image2").html('');
				}
			}else{
				$("#div_task_image1").hide();
				$("#div_task_image2").hide();
			}
			
			if(data.task_report_url){
				if(data.task_url){
					$("#div_task_url2").html('<a href="'+data.task_url+'" class="text-dark" target="_blank"><h5>'+data.task_url+'</h5></a>');
				}else{
					$("#div_task_url2").html('');
				}
				$("#div_task_url1").show();
				$("#div_task_url2").show();
			}else{
				$("#div_task_url1").hide();
				$("#div_task_url2").hide();
			}

			
			if(data.task_report_file){
				if(data.task_file){
					$("#div_task_file2").html('<a href="'+data.task_file+'" class="text-dark" target="_blank"><h5>'+data.task_file_name+'</h5></a>');
				}else{
					$("#div_task_file2").html('');
				}
				$("#div_task_file1").show();
				$("#div_task_file2").show();
			}else{
				$("#div_task_file1").hide();
				$("#div_task_file2").hide();
			}

			$("#task_return_content").val(cfmNvl1(data.task_return_content));
			
			$('#modal-notice-task').modal({backdrop: 'static', keyboard: false}); 
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function task_save_return()
{
	var task_return_content = $("#task_return_content").val();
	if(!task_return_content){
		alert("반려사유를 입력하세요");
		return;
	}
	if(!confirm("반려하시겠습니까?")) return;

	$.ajax({
		type : "POST",
		url : "/notice/updateNoticesTaskReturn.do",
		data : {
			id : task_id,
			task_return_content:task_return_content
		},
		success:function(data){
			alert("반려하였습니다.")
			$('#modal-notice-task').modal("hide"); 
			search_list(page);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

function task_save_complete()
{
	if(!confirm("작업완료하시겠습니까?")) return;
	$.ajax({
		type : "POST",
		url : "/notice/updateNoticesTaskCompete.do",
		data : {
			id : task_id,
			task_status:"COMPLETE"
		},
		success:function(data){
			alert("작업완료하였습니다.")
			$('#modal-notice-task').modal("hide"); 
			search_list(page);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

function form_log(v_id)
{
	$.ajax({
		type : "POST",
		url : "/notice/getTaskDetailList.do",
		data : {
			task_id : v_id
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				vHtml += "<tr>";
				vHtml += "<td class='text-center'>"+(i+1)+"</td>";
				vHtml += "<td class='text-center'>"+cfmNvl1(data[i].detail_date)+"</td>";
				vHtml += "<td class='text-center'>"+cfmNvl1(data[i].detail_time)+"</td>";
				vHtml += "<td class='text-center'>"+cfmNvl1(data[i].detail_user_name)+"</td>";
				vHtml += "<td class='text-center'>"+task_stats[data[i].task_status].name+"</td>";
				vHtml += "</tr>";
			}
			$("#log_list").html(vHtml);
			$('#modal-notice-task-detail').modal({backdrop: 'static', keyboard: false}); 
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}