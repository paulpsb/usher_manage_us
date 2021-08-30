/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	form_search();
	
});

function form_search()
{
	$.ajax({
		type : "POST",
		url : "/base/getBaseAddressList.do",
		data:{

		},
		success:function(data){

			var vHtml = "";
			for(var i=0; i<data.length; i++){
				var v_status = "사용";
				if(data[i].status != "ACTIVE") v_status = "미사용";
				vHtml += "<tr>";
				vHtml += "<td class='text-center'>"+data[i].building_name+"</td>";
				vHtml += "<td class='text-left'>"+data[i].building_address+"</td>";
				vHtml += "<td class='text-left'>"+data[i].building_url+"</td>";
				vHtml += "<td class='text-center'>"+v_status+"</td>";
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

var building_idx;
function form_add()
{
	building_idx = 0;
	$("#building_name").val("");
	$("#building_address").val("");
	$("#building_image").val("");
	$("#building_url").val("");
	$("#status").prop("checked", true);
	$("#td_building_image").html("");
	$("#modal-address").modal();
}

function form_modify(v_id)
{
	building_idx = v_id;
	$.ajax({
		type : "POST",
		url : "/base/getBaseAddress.do",
		data:{
			id:v_id
		},
		success:function(data){
			$("#building_name").val(data.building_name);
			$("#building_address").val(data.building_address);
			$("#building_image").val(data.building_image);
			$("#building_url").val(data.building_url);
			if(data.status == "ACTIVE"){
				$("#status").prop("checked", true);
			}else{
				$("#status").prop("checked", false);
			}
			if(data.building_image){
				$("#td_building_image").html("<img src='"+data.building_image+"' style='width:100%;'>");
			}else{
				$("#td_building_image").html("");
			}
			$("#modal-address").modal();
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
		url : "/base/deleteBaseAddress.do",
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
	var building_name      = $("#building_name").val();
	var building_address   = $("#building_address").val();
	var building_image     = $("#building_image").val();
	var building_url       = $("#building_url").val();
	var status            = "ACTIVE";
	if(!$("#status").is(":checked")){
		status            = "INACTIVE";
	}
	var url = "/base/insertBaseAddress.do";
	if(building_idx > 0) url = "/base/updateBaseAddress.do";
	$.ajax({
		type : "POST",
		url : url,
		data:{
			id:building_idx,
			status:status,
			building_name:building_name,
			building_address:building_address,
			building_image:building_image,
			building_url:building_url
		},
		success:function(data){

			alert("저장하였습니다.");
			$("#modal-address").modal("hide");
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
        url: '/base/uploadAddressFileUpload.do',
        data: formData,
        processData: false,
        contentType: false
    }).done(function (data) {
    	var bucketUrl = "https://s3.ap-northeast-2.amazonaws.com/"+data;
    	$("#building_image").val(bucketUrl);
    	$("#td_building_image").html("<img src='"+bucketUrl+"' style='width:100%;'>");
    }).fail(function (error) {
    	console.log(error);
    })
}