var page = 1;
var row_num = 20;
var aws_url = "https://s3.ap-northeast-2.amazonaws.com/";
jQuery(document).ready(function(){
	/*
	$("input[name='search_routine_category']").click(function(){
		form_search();
	});
	
	$("input[name='search_routine_type']").click(function(){
		form_search();
	});
	*/
	$('#search_routine_category').change(function(e){
		form_search();
	});	
	$('#search_routine_type').change(function(e){
		form_search();
	});	
	$('#search_routine_organization_id').change(function(e){
		form_search();
	});	
	search_organization();
});

function search_organization()
{
	$.ajax({
		type : "POST",
		url : "/common/getAuthOrganizationTeamList.do",
		data : {
			
		},
		success:function(data){
			var tSeq = 1;
			var vHtml = "";
			var tHtml = "";
			vHtml += '<div class="radio radio-css radio-inline">';
			vHtml += '	<input type="radio" name="routine_organization_id" id="routine_organization_id_0" value="0" checked>';
			vHtml += '	<label for="routine_organization_id_0">전체</label>';
			vHtml += '</div>';
			tHtml += '<option value="0">전체</option>';
			tSeq++;
			for(var i=0; i<data.length; i++)
			{
				vHtml += '<div class="radio radio-css radio-inline">';
				vHtml += '	<input type="radio" name="routine_organization_id" id="routine_organization_id_'+data[i].id+'" value="'+data[i].id+'">';
				vHtml += '	<label for="routine_organization_id_'+data[i].id+'">'+data[i].organization_name+'</label>';
				vHtml += '</div>';
				tHtml += '<option value="'+data[i].id+'">'+data[i].organization_name+'</option>';
				if(tSeq % 6 == 0)vHtml += '<br>'; 
				tSeq++;
				
			}
			$("#routine_organization").html(vHtml);
			$("#search_routine_organization_id").html(tHtml);
			form_search();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}
function form_search()
{
	search_list(1);
}

function search_list(vPage)
{
	page = vPage;
	//var search_routine_category = $("input[name='search_routine_category']:checked").val();
	//var search_routine_type = $("input[name='search_routine_type']:checked").val();
	
	var search_routine_category = $("#search_routine_category").val();
	var search_routine_type = $("#search_routine_type").val();
	var search_routine_organization_id = $("#search_routine_organization_id").val();
	$.ajax({
		type : "POST",
		url : "/notice/getRoutineList.do",
		data : {
			routine_category : search_routine_category,
			routine_type:search_routine_type,
			routine_organization_id:search_routine_organization_id,
			page:vPage,
			row_num:row_num
		},
		success:function(data){
			var total_count = data.routineCount.total_count;
			var total_page = Math.ceil(total_count/row_num);
			
			var routineList = data.routineList;
			var vHtml = "";
			if(routineList.length > 0)
			{
				for(var i=0; i<routineList.length; i++){
					var no = total_count - (row_num * (vPage-1)) - i;
					var routine_type = "교실";
					if(routineList[i].routine_type == "ORGANIZATION") routine_type = "조직";
					vHtml += "<tr>";
					vHtml += "<td class='text-center'>"+no+"</td>";
					vHtml += "<td class='text-center'>"+cfmNvl1(routineList[i].routine_category)+"</td>";
					vHtml += "<td>"+cfmNvl1(routineList[i].routine_title)+"</td>";
					vHtml += "<td class='text-center'>"+cfmNvl1(routineList[i].created_name)+"<br>"+cfmNvl1(routineList[i].created)+"</td>";
					vHtml += "<td class='text-center'>"+cfmNvl1(routineList[i].modified_name)+"<br>"+cfmNvl1(routineList[i].modified)+"</td>";
					vHtml += "<td class='text-center'>"+cfmNvl1(routine_type)+"</td>";
					vHtml += "<td class='text-center'>"+cfmNvl1(routineList[i].routine_organization_name)+"</td>";
					vHtml += "<td class='with-btn text-center' nowrap=''>";
					vHtml += "	<button type='button' class='btn btn-sm btn-primary m-r-2' onclick='form_modify(\""+routineList[i].id+"\")'>수정</button>";
					vHtml += "	<button type='button' class='btn btn-sm btn-primary m-r-2' onclick='form_delete(\""+routineList[i].id+"\")'>삭제</button>";
					vHtml += "</td>";
					vHtml += "</tr>";
				}
			}else{
				vHtml = "<tr><td class='text-center' colspan='6'>조회된 데이터가 없습니다.</td></tr>";
			}
			
			$("#dataList").html(vHtml);
			
			vHtml = cfmPage(10, vPage, total_page, "search_list");
			$("#pageList").html(vHtml);
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

var routine_id = 0;
var nSeq = 1;
function form_add()
{
	routine_id = 0;
	nSeq = 1;
	$('#routine_category_daily').prop("checked", true);
	$('#routine_organization_id_0').prop("checked", true);
	$('#routine_type_class').prop("checked", true);
	$('#routine_title').val("");
	$("#routine_detail_list").html("");
	append_routine_detail(0, "", "", true, true, true, true, "","","","","");
	nSeq++;
	$("#modal-routine").modal();
}

function form_modify(v_id)
{
	routine_id = v_id;
	$.ajax({
		type : "POST",
		url : "/notice/getRoutine.do",
		data:{
			id:v_id
		},
		success:function(data){
			var routineInfo = data.routineInfo;
			var routineDetailList = data.routineDetailList;
			$('#routine_category_'+routineInfo.routine_category.toLowerCase()).prop("checked", true);
			$('#routine_organization_id_'+routineInfo.routine_organization_id).prop("checked", true);
			$('#routine_type_'+routineInfo.routine_type.toLowerCase()).prop("checked", true);
			$('#routine_title').val(routineInfo.routine_title);
			$("#routine_detail_list").html("");
			nSeq = 1;
			for(var i=0; i<routineDetailList.length; i++)
			{
				var v_id = routineDetailList[i].id; 
				var v_title                = routineDetailList[i].routine_detail_title;
				var v_content              = routineDetailList[i].routine_detail_content; 
				var is_report_image        = routineDetailList[i].routine_detail_report_image;
				var is_report_url          = routineDetailList[i].routine_detail_report_url;
				var is_report_ox           = routineDetailList[i].routine_detail_report_ox;
				var is_report_file         = routineDetailList[i].routine_detail_report_file;
				var v_reference_url        = routineDetailList[i].routine_detail_reference_url;
				var v_reference_image      = routineDetailList[i].routine_detail_reference_image;
				var v_reference_image_name = routineDetailList[i].routine_detail_reference_image_name;
				var v_reference_file       = routineDetailList[i].routine_detail_reference_file;
				var v_reference_file_name  = routineDetailList[i].routine_detail_reference_file_name;
				
				append_routine_detail(v_id, v_title, v_content, is_report_image, is_report_url, is_report_ox, is_report_file, v_reference_url, v_reference_image, v_reference_image_name, v_reference_file, v_reference_file_name);
				nSeq++;
			}
			$("#modal-routine").modal();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	})
}

function form_delete(v_id)
{
	if(!confirm("삭제하시겠습니까?")) return;
	
	$.ajax({
		type : "POST",
		url : "/notice/deleteRoutine.do",
		data:{
			id:v_id
		},
		success:function(data){
			alert("삭제하였습니다.");
			search_list(page);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}


function form_detail_add()
{
	append_routine_detail(0, "", "", true, true, true, true, "","","","","");
	nSeq++;
}

function append_routine_detail(v_id, v_title, v_content, is_report_image, is_report_url, is_report_ox, is_report_file, v_reference_url, v_reference_image, v_reference_image_name, v_reference_file, v_reference_file_name)
{
	var v_checked = "";

	var vHtml = "";
	vHtml += '<table class="table table-bordered m-b-10" id="routine_detail_'+nSeq+'">';
	vHtml += '	<colgroup>';
	vHtml += '		<col style="width:10%;" />';
	vHtml += '		<col style="width:90%;" />';
	vHtml += '	</colgroup>	';
	vHtml += '	<tbody>';
	vHtml += '		<tr>';
	vHtml += '			<td class="with-form-control text-right" colspan="4">';
	vHtml += '				<button type="button" class="btn btn-danger" onclick="form_detail_delete('+nSeq+','+v_id+')">상세내역 삭제</button>';
	vHtml += '			</td>';
	vHtml += '		</tr>';
	vHtml += '		<tr>';
	vHtml += '			<th class="text-center table-info">제목</th>';
	vHtml += '			<td class="with-form-control" colspan="3">';
	vHtml += '				<input type="hidden" name="routine_detail_id" value="'+v_id+'">';
	vHtml += '				<input type="text" class="form-control" name="routine_detail_title" value="'+v_title+'">';
	vHtml += '			</td>';
	vHtml += '		</tr>';
	vHtml += '		<tr>';
	vHtml += '			<th class="text-center table-info">내용</th>';
	vHtml += '			<td class="with-form-control" colspan="3">';
	vHtml += '				<textarea class="form-control" name="routine_detail_content">'+v_content+'</textarea>  ';
	vHtml += '			</td>';
	vHtml += '		</tr>';
	vHtml += '		<tr>';
	vHtml += '			<th class="text-center table-info">보고형식</th>';
	v_checked = "";
	if(is_report_image) v_checked = "checked";
	vHtml += '			<td class="with-checkbox" colspan="3">';
	vHtml += '				<div class="checkbox checkbox-css pt-0 checkbox-inline">';
	vHtml += '				<input type="checkbox" name="routine_detail_report_image" id="routine_detail_report_image_'+nSeq+'" '+v_checked+'>';
	vHtml += '				<label for="routine_detail_report_image_'+nSeq+'">사진보고</label>';
	vHtml += '			</div>';
	v_checked = "";
	if(is_report_url) v_checked = "checked";
	vHtml += '			<div class="checkbox checkbox-css pt-0 checkbox-inline">';
	vHtml += '				<input type="checkbox" name="routine_detail_report_url" id="routine_detail_report_url_'+nSeq+'" '+v_checked+'>';
	vHtml += '				<label for="routine_detail_report_url_'+nSeq+'">URL</label>';
	vHtml += '			</div>';
	v_checked = "";
	if(is_report_ox) v_checked = "checked";
	vHtml += '			<div class="checkbox checkbox-css pt-0 checkbox-inline">';
	vHtml += '				<input type="checkbox" name="routine_detail_report_ox" id="routine_detail_report_ox_'+nSeq+'" '+v_checked+'>';
	vHtml += '				<label for="routine_detail_report_ox_'+nSeq+'">O/X</label>';
	vHtml += '			</div>';
	v_checked = "";
	if(is_report_file) v_checked = "checked";
	vHtml += '			<div class="checkbox checkbox-css pt-0 checkbox-inline">';
	vHtml += '				<input type="checkbox" name="routine_detail_report_file" id="routine_detail_report_file_'+nSeq+'" '+v_checked+'>';
	vHtml += '				<label for="routine_detail_report_file_'+nSeq+'">첨부파일</label>';
	vHtml += '			</div>';
	vHtml += '			</td>';
	vHtml += '		</tr>';
	vHtml += '		<tr>';
	vHtml += '			<th class="text-center table-info">참고URL</th>';
	vHtml += '			<td class="with-form-control" colspan="3">';
	vHtml += '				<textarea class="form-control" name="routine_detail_reference_url">'+v_reference_url+'</textarea>';
	vHtml += '			</td>';
	vHtml += '		</tr>';
	vHtml += '		<tr>';
	vHtml += '			<th class="text-center table-info">참고사진</th>';
	vHtml += '			<td class="with-form-control">';
	vHtml += '				<span id="span_image_name_'+nSeq+'">'+v_reference_image_name+'</span>';
	vHtml += '				<button type="button" class="btn btn-primary" onclick="form_add_image('+nSeq+')">참고사진 등록</button>';
	vHtml += '				<button type="button" class="btn btn-danger" onclick="form_del_image('+nSeq+')">참고사진 삭제</button>';
	vHtml += '				<input type="hidden" name="routine_detail_reference_image" id="routine_detail_reference_image_'+nSeq+'" value="'+v_reference_image+'">';
	vHtml += '				<input type="hidden" name="routine_detail_reference_image_name" id="routine_detail_reference_image_name_'+nSeq+'" value="'+v_reference_image_name+'">';
	vHtml += '				<div style="width:100%;padding:5px;" id="div_routine_detail_reference_image_'+nSeq+'">';
	if(v_reference_image){
		vHtml += '<img src="'+v_reference_image +'" style="border:1px solid #000;width:100%;">';
	}
	vHtml += '				</div>';
	vHtml += '			</td>';
	vHtml += '		</tr>';
	vHtml += '		<tr>';
	vHtml += '			<th class="text-center table-info">참고파일</th>';
	vHtml += '			<td class="with-form-control">';
	vHtml += '				<span id="span_file_name_'+nSeq+'">';
	if(v_reference_file){
		vHtml += '<a href="'+v_reference_file+'" target="_blank">'+v_reference_file_name+'</a>';
	}
	vHtml += '				</span>';
	vHtml += '				<button type="button" class="btn btn-primary" onclick="form_add_file('+nSeq+')">참고파일 등록</button>';
	vHtml += '				<button type="button" class="btn btn-danger" onclick="form_del_file('+nSeq+')">참고파일 삭제</button>';
	vHtml += '				<input type="hidden" name="routine_detail_reference_file" id="routine_detail_reference_file_'+nSeq+'" value="'+v_reference_file+'">';
	vHtml += '				<input type="hidden" name="routine_detail_reference_file_name" id="routine_detail_reference_file_name_'+nSeq+'" value="'+v_reference_file_name+'">';
	vHtml += '			</td>';
	vHtml += '		</tr>';
	vHtml += '	</tbody>';
	vHtml += '</table>';
	$("#routine_detail_list").append(vHtml);
}

function form_detail_delete(v_seq, v_id)
{
	if(v_id > 0)
	{
		$.ajax({
			type : "POST",
			url : "/notice/deleteRoutineDetails.do",
			data : {
				id : v_id
			},
			success:function(data){
				
			},
			error:function(event){				
				alert("잠시후 다시 시도 바랍니다.");
			}
		});	
	}
	$("#routine_detail_"+v_seq).remove();
}

var file_type = "";
var file_seq;

function form_add_image(v_seq)
{
	file_type = "IMAGE";
	file_seq = v_seq;
	
	$("#form1").html('<input type="file" class="form-control" name="file" id="file" accept="image/*">');
	$("#modal-routin-file").modal();
}

function form_del_image(v_seq)
{
	$("#span_image_name_"+v_seq).html("");
	$("#routine_detail_reference_image_name_"+v_seq).val("");
	$("#routine_detail_reference_image_"+v_seq).val("");
	$("#div_routine_detail_reference_image_"+v_seq).html("");
}

function form_add_file(v_seq)
{
	file_type = "FILE";
	file_seq = v_seq;
	$("#form1").html('<input type="file" class="form-control" name="file" id="file">');
	$("#modal-routin-file").modal();
}

function form_del_file(v_seq)
{
	$("#span_file_name_"+v_seq).html("");
	$("#routine_detail_reference_file_name_"+v_seq).val("");
	$("#routine_detail_reference_file_"+v_seq).val("");
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
    		$("#span_image_name_"+file_seq).html(array_file_name[1]);
    		$("#routine_detail_reference_image_name_"+file_seq).val(array_file_name[1]);
    		$("#routine_detail_reference_image_"+file_seq).val(aws_url+array_file_name[0]);
    		$("#div_routine_detail_reference_image_"+file_seq).html('<img src="'+aws_url+array_file_name[0] +'" style="border:1px solid #000;width:100%;">');
    	}else{
    		$("#span_file_name_"+file_seq).html('<a href="'+aws_url+array_file_name[0]+'" target="_blank">'+array_file_name[1]+'</a>');
    		$("#routine_detail_reference_file_name_"+file_seq).val(array_file_name[1]);
    		$("#routine_detail_reference_file_"+file_seq).val(aws_url+array_file_name[0]);
    	}
    	$("#modal-routin-file").modal("hide");
    }).fail(function (error) {
    	console.log(error);
    })
    
}

function save_form()
{
	var $_routine_detail_id                   = $("input[name=routine_detail_id]");
	var $_routine_detail_title                = $("input[name=routine_detail_title]");
	var $_routine_detail_content              = $("textarea[name=routine_detail_content]");
	var $_routine_detail_report_image         = $("input[name=routine_detail_report_image]");
	var $_routine_detail_report_url           = $("input[name=routine_detail_report_url]");
	var $_routine_detail_report_ox            = $("input[name=routine_detail_report_ox]");
	var $_routine_detail_report_file          = $("input[name=routine_detail_report_file]");
	var $_routine_detail_reference_url        = $("textarea[name=routine_detail_reference_url]");
	var $_routine_detail_reference_image      = $("input[name=routine_detail_reference_image]");
	var $_routine_detail_reference_image_name = $("input[name=routine_detail_reference_image_name]");
	var $_routine_detail_reference_file       = $("input[name=routine_detail_reference_file]");
	var $_routine_detail_reference_file_name  = $("input[name=routine_detail_reference_file_name]");
	
	var detail_list = Array();
	
	$_routine_detail_id.each(function(index) {
		var objDetail = Object();
		objDetail.routine_detail_id = $(this).val();
		objDetail.routine_detail_title        = $_routine_detail_title.eq(index).val();
		objDetail.routine_detail_content      = $_routine_detail_content.eq(index).val();
		
		objDetail.routine_detail_report_image = false;
		objDetail.routine_detail_report_url   = false;
		objDetail.routine_detail_report_ox    = false;
		objDetail.routine_detail_report_file  = false;
		
		objDetail.routine_detail_reference_url        = $_routine_detail_reference_url.eq(index).val();
		objDetail.routine_detail_reference_image      = $_routine_detail_reference_image.eq(index).val();
		objDetail.routine_detail_reference_image_name = $_routine_detail_reference_image_name.eq(index).val();
		objDetail.routine_detail_reference_file       = $_routine_detail_reference_file.eq(index).val();
		objDetail.routine_detail_reference_file_name  = $_routine_detail_reference_file_name.eq(index).val();

		if($_routine_detail_report_image.eq(index).is(":checked"))
		{
			objDetail.routine_detail_report_image = true;
		}
		
		if($_routine_detail_report_url.eq(index).is(":checked"))
		{
			objDetail.routine_detail_report_url = true;
		}
		
		if($_routine_detail_report_ox.eq(index).is(":checked"))
		{
			objDetail.routine_detail_report_ox = true;
		}
		
		if($_routine_detail_report_file.eq(index).is(":checked"))
		{
			objDetail.routine_detail_report_file = true;
		}
		
		detail_list.push(objDetail);
		
	});
	
	
	var data_value = JSON.stringify(detail_list);
	$.ajax({
		type : "POST",
		url : "/notice/saveRoutine.do",
		data:{
			id:routine_id,
			routine_category:$("input[name='routine_category']:checked").val(),
			routine_organization_id:$("input[name='routine_organization_id']:checked").val(),
			routine_title:$("input[name='routine_title']").val(),
			routine_type:$("input[name='routine_type']:checked").val(),
			data_value:data_value
		},
		success:function(data){
			alert("저장하였습니다.");
			$("#modal-routine").modal("hide");
			search_list(page);

		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}