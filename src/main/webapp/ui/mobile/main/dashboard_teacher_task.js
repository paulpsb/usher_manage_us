var task_id;
var schedule_date;
var current_date;
var user_id;
var aws_schedule_url = "https://s3.ap-northeast-2.amazonaws.com/";
jQuery(document).ready(function(){
	user_id = $("#user_id").val();
	task_id = $("#task_id").val();
	schedule_date = $("#schedule_date").val();
	current_date = $("#current_date").val();
	search_form();
});

function go_home()
{
	location.href = "/main/dashboard_teacher.do?user_id="+user_id+"&&section=PRACTICE&&schedule_date="+schedule_date;
}

function search_form()
{
	$.ajax({
		type : "POST",
		url : "/main/getNoticesTask.do",
		data : {
			id:task_id			
		},
		success:function(data){
			$("#task_title").html(data.task_title);
			$("#task_reference_title").html(data.task_reference_title);
			$("#task_reference_content").html(data.task_reference_content);
			if(data.task_return_content)
			{
				$("#task_return_content").html(data.task_reference_content);
				$("#div_task_return_content").show();
			}else{
				$("#div_task_return_content").hide();
			}
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
			
			$("#task_content").val(cfmNvl1(data.task_content));
			$("#task_image").val(cfmNvl1(data.task_image));
			$("#task_image_name").val(cfmNvl1(data.task_image_name));
			$("#task_url").val(cfmNvl1(data.task_url));
			$("#task_file").val(cfmNvl1(data.task_file));
			$("#task_file_name").val(cfmNvl1(data.task_file_name));
			
			if(data.task_report_image){
				$("#div_task_image1").show();
				$("#div_task_image2").show();
				$("#div_task_image3").show();
				if(data.task_image){
					$("#div_task_image3").html('<img src="'+data.task_image+'" style="border:1px solid #000;width:100%;">');
				}else{
					$("#div_task_image3").html('');
				}
			}else{
				$("#div_task_image1").hide();
				$("#div_task_image2").hide();
				$("#div_task_image3").hide();
			}
			
			if(data.task_report_url){
				$("#div_task_url1").show();
				$("#div_task_url2").show();
			}else{
				$("#div_task_url1").hide();
				$("#div_task_url2").hide();
			}

			
			if(data.task_report_file){
				if(data.task_file){
					$("#div_task_file3").html('<a href="'+data.task_file+'" class="text-dark" target="_blank"><h5>'+data.task_file_name+'</h5></a>');
				}else{
					$("#div_task_file3").html('');
				}
				$("#div_task_file1").show();
				$("#div_task_file2").show();
				$("#div_task_file3").show();
			}else{
				$("#div_task_file1").hide();
				$("#div_task_file2").hide();
				$("#div_task_file3").show();
			}
			if(schedule_date == schedule_date)
			{
				if(data.task_status == "RESPONSE" || data.task_status == "COMPLETE"){
					$("#btn_task_starting").hide();
					$("#btn_task_working").hide();
					$("#btn_task_response").hide();
				}else if(data.task_status == "TIMEING"){
					$("#btn_task_starting").show();
					$("#btn_task_working").hide();
					$("#btn_task_response").hide();
				}else{
					$("#btn_task_starting").hide();
					$("#btn_task_working").show();
					$("#btn_task_response").show();
				}
			}else{
				$("#btn_task_starting").hide();
				$("#btn_task_working").hide();
				$("#btn_task_response").hide();
			}
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

function task_save(v_status)
{
	$.ajax({
		type : "POST",
		url : "/main/updateNoticesTask.do",
		data : {
			id:task_id,
			task_status:v_status,
			task_content:$("#task_content").val(),
			task_image:$("#task_image").val(),
			task_image_name:$("#task_image_name").val(),
			task_url:$("#task_url").val(),
			task_file:$("#task_file").val(),
			task_file_name:$("#task_file_name").val()
		},
		success:function(data){
			alert("저장하였습니다.");
			 
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

var file_type = "";


function task_add_image()
{
	file_type = "IMAGE";
	/*
	//$("#form1").html('<input type="file" class="form-control" name="file" id="file" accept="image/*">');
	$("#form1").html(getFileScript('accept="image/*"'));
	initFileEvent();
	$("#modal-notice-schedule-file").modal({backdrop: 'static', keyboard: false});
	*/
	$("#image_file").click();
}

var image_file_name = "";
function load_image(event)
{
	var reader = new FileReader();
	reader.onload = e => {
        var image = new Image();
        image.className = "img-item"; // 스타일 적용을 위해
        image.src = e.target.result;
        image.onload = imageEvent => {
          // 이미지가 로드가 되면! 리사이즈 함수가 실행되도록 합니다.
          resize_image(image);
      };
    };
    
    image_file_name = event.files[0].name;
    reader.readAsDataURL(event.files[0]);
}

function resize_image(image)
{
	var canvas = document.createElement("canvas");
	var max_size = 1024;
    var width = image.width;
    var height = image.height;
    
    if (width > height) {
        // 가로가 길 경우
        if (width > max_size) {
          height *= max_size / width;
          width = max_size;
        }
      } else {
        // 세로가 길 경우
        if (height > max_size) {
          width *= max_size / height;
          height = max_size;
        }
      }
    canvas.width = width;
    canvas.height = height;
    canvas.getContext("2d").drawImage(image, 0, 0, width, height);
    var dataUrl = canvas.toDataURL("image/png");
    image_file_upload(dataURLToBlob(dataUrl));
}

function dataURLToBlob(dataURL)
{
	var BASE64_MARKER = ";base64,";

	// base64로 인코딩 되어있지 않을 경우
	if (dataURL.indexOf(BASE64_MARKER) === -1) {
		var parts = dataURL.split(",");
		var contentType = parts[0].split(":")[1];
		var raw = parts[1];
		return new Blob([raw], {
			type: contentType
		});
	}
	// base64로 인코딩 된 이진데이터일 경우
	var parts = dataURL.split(BASE64_MARKER);
	var contentType = parts[0].split(":")[1];
	var raw = window.atob(parts[1]);
	// atob()는 Base64를 디코딩하는 메서드
	var rawLength = raw.length;
	
	// 부호 없는 1byte 정수 배열을 생성 
	var uInt8Array = new Uint8Array(rawLength); // 길이만 지정된 배열
	
	var i = 0;
	while (i < rawLength) {
		uInt8Array[i] = raw.charCodeAt(i);
		i++;
	}
	return new Blob([uInt8Array], {
		type: contentType
	});
}

function image_file_upload(blob){
	var filename = new Date().toISOString()+".png";
	
	var formData=new FormData();
	formData.append("file",blob, filename);
	
	$.ajax({
        type: 'POST',
        url: '/common/getFileUploadNoticeUpload.do',
        data: formData,
        processData: false,
        contentType: false
    }).done(function (data) {
    	var array_file_name = data.split("||");
		$("#task_image_name").val(array_file_name[1]);
		$("#task_image").val(aws_schedule_url+array_file_name[0]);
		$("#div_task_image3").html('<img src="'+aws_schedule_url+array_file_name[0]+'" style="border:1px solid #000;width:100%;">');
    }).fail(function (error) {
    	console.log(error);
    })

}
function task_add_file()
{
	file_type = "FILE";
	//$("#form1").html('<input type="file" class="form-control" name="file" id="file">');
	$("#form1").html(getFileScript(""));
	initFileEvent();
	$("#modal-notice-task-file").modal({backdrop: 'static', keyboard: false});
}

function getFileScript(accept)
{
	var vHtml = "";
	vHtml += '<div class="filebox"> ';
	vHtml += '	<input class="upload-name" value="파일선택" disabled="disabled" style="width:80%"> ';
	vHtml += '	<label for="file">업로드</label> ';
	vHtml += '	<input type="file" name="file" id="file" class="upload-hidden" '+accept+'> ';
	vHtml += '</div> ';
	return vHtml;
}

function initFileEvent()
{
	var fileTarget = $('.filebox .upload-hidden'); 
	fileTarget.on('change', function(){ 
		// 값이 변경되면 
		if(window.FileReader){ // modern browser 
			var filename = $(this)[0].files[0].name; 
		} else { // old IE 
			var filename = $(this).val().split('/').pop().split('\\').pop(); // 파일명만 추출 
		} 
		
		// 추출한 파일명 삽입 
		$(this).siblings('.upload-name').val(filename); 
	});
}
function task_file_save()
{
	var formData=new FormData(document.getElementById('form1'));
	var file_name = document.getElementById('form1').file.value;
	
	
	$.ajax({
        type: 'POST',
        url: '/common/getFileUploadNoticeUpload.do',
        data: formData,
        processData: false,
        contentType: false
    }).done(function (data) {
    	var array_file_name = data.split("||");
		$("#task_file_name").val(array_file_name[1]);
		$("#task_file").val(aws_schedule_url+array_file_name[0]);
		$("#div_task_file3").html('<a href="'+aws_schedule_url+array_file_name[0]+'" class="text-dark" target="_blank"><h5>'+array_file_name[1]+'<h5></a>');
    	$("#modal-notice-task-file").modal("hide");
    }).fail(function (error) {
    	console.log(error);
    })
    
}