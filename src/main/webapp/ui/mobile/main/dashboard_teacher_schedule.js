var schedule_id;
var schedule_date;
var current_date;
var user_id;
var aws_schedule_url = "https://s3.ap-northeast-2.amazonaws.com/";
jQuery(document).ready(function(){
	user_id = $("#user_id").val();
	schedule_id = $("#notice_schedule_id").val();
	schedule_date = $("#schedule_date").val();
	current_date = $("#current_date").val();
	search_form();
});

function go_home()
{
	location.href = "/main/dashboard_teacher.do?user_id="+user_id+"&&section=SCHEDULE&&schedule_date="+schedule_date;
}

function search_form()
{
	$.ajax({
		type : "POST",
		url : "/main/getTeacherNoticeScheduleList.do",
		data : {
			id:schedule_id			
		},
		success:function(data){
			var scheduleInfo = data.scheduleInfo;
			var scheduleDetailList = data.scheduleDetailList;
			$("#schedule_title").html(scheduleInfo.schedule_title+' ('+scheduleInfo.course_group_name+' '+scheduleInfo.course_name+')');
			var vHtml = "";
			for(var i=0; i<scheduleDetailList.length; i++)
			{
				var vTime = "";
				
				var vShow = "";
				if(i==0) vShow = "show";
				var schedule_detail_id = scheduleDetailList[i].id;
				var schedule_detail_use_report_image  = scheduleDetailList[i].schedule_detail_use_report_image;
				var schedule_detail_use_report_url    = scheduleDetailList[i].schedule_detail_use_report_url;
				var schedule_detail_use_report_ox     = scheduleDetailList[i].schedule_detail_use_report_ox;
				var schedule_detail_use_report_file   = scheduleDetailList[i].schedule_detail_use_report_file;
				var schedule_detail_is_report_image   = scheduleDetailList[i].schedule_detail_is_report_image;
				var schedule_detail_is_report_url     = scheduleDetailList[i].schedule_detail_is_report_url;
				var schedule_detail_is_report_ox      = scheduleDetailList[i].schedule_detail_is_report_ox;
				var schedule_detail_is_report_file    = scheduleDetailList[i].schedule_detail_is_report_file;
				
				var schedule_detail_is_success        = scheduleDetailList[i].schedule_detail_is_success;
				var schedule_detail_is_ignore         = scheduleDetailList[i].schedule_detail_is_ignore;
				var schedule_detail_is_problem         = scheduleDetailList[i].schedule_detail_is_problem;
				
				if(schedule_detail_is_success){
					vTime = "("+scheduleDetailList[i].modified+") ";
					vHtml += '<div class="card bg-success text-white" id="notice_schedule_detail_'+schedule_detail_id+'">';
					vHtml += '	<div  id="notice_schedule_detail_header_'+schedule_detail_id+'" class="card-header bg-success-darker pointer-cursor d-flex align-items-center" data-toggle="collapse" data-target="#collapse'+schedule_detail_id+'">';
				}else{
					if(schedule_detail_is_ignore){
						vTime = "("+scheduleDetailList[i].modified+") ";
						vHtml += '<div class="card bg-blue text-white" id="notice_schedule_detail_'+schedule_detail_id+'">';
						vHtml += '	<div  id="notice_schedule_detail_header_'+schedule_detail_id+'" class="card-header bg-blue-darker pointer-cursor d-flex align-items-center" data-toggle="collapse" data-target="#collapse'+schedule_detail_id+'">';
					}else{
						if(schedule_detail_is_problem){
							vTime = "("+scheduleDetailList[i].modified+") ";
							vHtml += '<div class="card bg-yellow text-white" id="notice_schedule_detail_'+schedule_detail_id+'">';
							vHtml += '	<div  id="notice_schedule_detail_header_'+schedule_detail_id+'" class="card-header bg-yellow-darker pointer-cursor d-flex align-items-center" data-toggle="collapse" data-target="#collapse'+schedule_detail_id+'">';
						}else{
							vHtml += '<div class="card bg-danger text-white" id="notice_schedule_detail_'+schedule_detail_id+'">';
							vHtml += '	<div  id="notice_schedule_detail_header_'+schedule_detail_id+'" class="card-header bg-danger-darker pointer-cursor d-flex align-items-center" data-toggle="collapse" data-target="#collapse'+schedule_detail_id+'">';
						}
					}
				}
				
				var v_schedule_detail_reference_content = cfmNvl1(scheduleDetailList[i].schedule_detail_reference_content);
				v_schedule_detail_reference_content = v_schedule_detail_reference_content.replace(/(?:\r\n|\r|\n)/g, '<br />');
				vHtml += vTime + scheduleDetailList[i].schedule_detail_reference_title;
				vHtml += '	</div>';
				vHtml += '	<div id="collapse'+schedule_detail_id+'" class="bg-white text-dark collapse '+vShow+'" data-parent="#accordion">';
				vHtml += '		<div class="card-body">';
				vHtml += '			<input type="hidden" id="schedule_detail_use_report_image_'+schedule_detail_id+'" value="'+cfmBooleanToChar(schedule_detail_use_report_image)+'">';
				vHtml += '			<input type="hidden" id="schedule_detail_use_report_url_'+schedule_detail_id+'" value="'+cfmBooleanToChar(schedule_detail_use_report_url)+'">';
				vHtml += '			<input type="hidden" id="schedule_detail_use_report_ox_'+schedule_detail_id+'" value="'+cfmBooleanToChar(schedule_detail_use_report_ox)+'">';
				vHtml += '			<input type="hidden" id="schedule_detail_use_report_file_'+schedule_detail_id+'" value="'+cfmBooleanToChar(schedule_detail_use_report_file)+'">';
				vHtml += '			<div class="row">';
				vHtml += '				<div class="col-12 mb-3"><h5>'+v_schedule_detail_reference_content+'<h5></div>';
				if(scheduleDetailList[i].schedule_detail_reference_image){
					vHtml += '				<div class="col-12"><h4>참고이미지</h4></div>';
					vHtml += '				<div class="col-12 mb-3"><img src="'+scheduleDetailList[i].schedule_detail_reference_image+'" style="border:1px solid #000;width:100%;"></div>';
					
				}
				if(scheduleDetailList[i].schedule_detail_reference_url){
					vHtml += '				<div class="col-12"><h4>참고 URL</h4></div>';
					vHtml += '				<div class="col-12 mb-3"><a href="'+scheduleDetailList[i].schedule_detail_reference_url+'" class="text-dark" target="_blank"><h5>'+scheduleDetailList[i].schedule_detail_reference_url+'</h5></a></div>';
				}
				if(scheduleDetailList[i].schedule_detail_reference_file){
					vHtml += '				<div class="col-12"><h4>참고 파일</h4></div>';
					vHtml += '				<div class="col-12 mb-3"><a href="'+scheduleDetailList[i].schedule_detail_reference_file+'" class="text-dark" target="_blank"><h5>'+scheduleDetailList[i].schedule_detail_reference_file_name+'<h5></a></div>';
				}
				
				if(schedule_detail_use_report_image){
					vHtml += '				<div class="col-6"><h4 style="padding-top:8px;">사진등록</h4></div>';
					vHtml += '				<div class="col-6 mb-3">';
					vHtml += '					<button type="button" class="btn btn-primary" onclick="schedule_add_image('+schedule_detail_id+')">사진 등록</button>';
					vHtml += '					<input type="hidden" id="schedule_detail_image_'+schedule_detail_id+'" value="'+scheduleDetailList[i].schedule_detail_image+'">';
					vHtml += '					<input type="hidden" id="schedule_detail_image_name_'+schedule_detail_id+'" value="'+scheduleDetailList[i].schedule_detail_image_name+'">';					
					vHtml += '				</div>';
					vHtml += '				<div class="col-12 text-center  mb-3" id="div_image_'+schedule_detail_id+'">';
					if(scheduleDetailList[i].schedule_detail_image){
						vHtml += '<img src="'+scheduleDetailList[i].schedule_detail_image+'" style="border:1px solid #000;width:100%;">';
					}
					vHtml += '				</div>';
				}
				if(schedule_detail_use_report_file){
					vHtml += '				<div class="col-6"><h4 style="padding-top:8px;">파일등록</h4></div>';
					vHtml += '				<div class="col-6  mb-3">';
					vHtml += '					<button type="button" class="btn btn-primary" onclick="schedule_add_file('+schedule_detail_id+')">파일 등록</button>';
					vHtml += '					<input type="hidden" id="schedule_detail_file_'+schedule_detail_id+'" value="'+scheduleDetailList[i].schedule_detail_file+'">';
					vHtml += '					<input type="hidden" id="schedule_detail_file_name_'+schedule_detail_id+'" value="'+scheduleDetailList[i].schedule_detail_file_name+'">';
					vHtml += '				</div>';
					vHtml += '				<div class="col-12 text-center  mb-3" id="div_file_'+schedule_detail_id+'">';
					if(scheduleDetailList[i].schedule_detail_file){
						vHtml += '<a href="'+scheduleDetailList[i].schedule_detail_file_name+'" class="text-dark" target="_blank"><h5>'+scheduleDetailList[i].schedule_detail_file+'</h5></a>';
					}
					vHtml += '				</div>';
				}
				if(schedule_detail_use_report_url){
					vHtml += '				<div class="col-12"><h4>URL 등록</h4></div>';
					vHtml += '				<div class="col-12 mb-3">';
					vHtml += '					<input type="text" class="form-control"  id="schedule_detail_url_'+schedule_detail_id+'" value="'+scheduleDetailList[i].schedule_detail_url+'">';
					vHtml += '				</div>';
				}
				if(schedule_detail_use_report_ox){
					vHtml += '				<div class="col-12"><h4>O/X 등록</h4></div>';
					var checked = "";
					vHtml += '				<div class="col-12 mb-3">';
					vHtml += '					<div class="row" id="search_area">';
					vHtml += '						<div class="col-6">';
					checked = "";
					if(scheduleDetailList[i].schedule_detail_ox == "O") checked = "checked";
					vHtml += '							<input type="radio" class="css-input-radio-checkbox" name="schedule_detail_ox_'+schedule_detail_id+'" id="schedule_detail_ox_'+schedule_detail_id+'_o" value="O" '+checked+'>';
					vHtml += '							<label class="css-input-radio-checkbox-label" for="schedule_detail_ox_'+schedule_detail_id+'_o" style="padding:5px;">O</label>';
					vHtml += '						</div>';
					vHtml += '						<div class="col-6">';
					checked = "";
					if(scheduleDetailList[i].schedule_detail_ox == "X") checked = "checked";
					vHtml += '							<input type="radio" class="css-input-radio-checkbox" name="schedule_detail_ox_'+schedule_detail_id+'" id="schedule_detail_ox_'+schedule_detail_id+'_x" value="O" '+checked+'>';
					vHtml += '							<label class="css-input-radio-checkbox-label" for="schedule_detail_ox_'+schedule_detail_id+'_x" style="padding:5px;">X</label>';
					vHtml += '						</div>';
					vHtml += '					</div>';
					vHtml += '				</div>';
				}
				vHtml += '				<div class="col-12"><h4>코멘트</h4></div>';
				vHtml += '				<div class="col-12 mb-3"><textarea class="form-control" id="schedule_detail_content_'+schedule_detail_id+'">'+scheduleDetailList[i].schedule_detail_content+'</textarea></div>';
				if(current_date == schedule_date)
				{
					vHtml += '				<div class="col-12 text-right">';
					vHtml += '					<button type="button" class="btn btn-primary" onclick="schedule_save('+schedule_detail_id+',false, true)">문제보고</button>';
					vHtml += '					<button type="button" class="btn btn-primary" onclick="schedule_save('+schedule_detail_id+',true, false)">해당없음</button>';
					vHtml += '					<button type="button" class="btn btn-primary" onclick="schedule_save('+schedule_detail_id+',false, false)"><i class="fa fa-save fa-fw"></i> 저장</button>';
					vHtml += '				</div>';
				}
				vHtml += '			</div>';
				vHtml += '		</div>';
				vHtml += '	</div>';
				vHtml += '</div>';
					
			}
			$("#accordion").html(vHtml);
			$('#modal-notice-schedule').modal({backdrop: 'static', keyboard: false}); 
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

var file_type = "";
var file_seq;


function schedule_add_image(v_seq)
{
	file_type = "IMAGE";
	file_seq = v_seq;
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
		$("#schedule_detail_image_name_"+file_seq).val(array_file_name[1]);
		$("#schedule_detail_image_"+file_seq).val(aws_schedule_url+array_file_name[0]);
		$("#div_image_"+file_seq).html('<img src="'+aws_schedule_url+array_file_name[0]+'" style="border:1px solid #000;width:100%;">');
    }).fail(function (error) {
    	console.log(error);
    })

}
function schedule_add_file(v_seq)
{
	file_type = "FILE";
	file_seq = v_seq;
	//$("#form1").html('<input type="file" class="form-control" name="file" id="file">');
	$("#form1").html(getFileScript(""));
	initFileEvent();
	$("#modal-notice-schedule-file").modal({backdrop: 'static', keyboard: false});
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
function schedule_file_save()
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
    	if(file_type == "IMAGE"){
    		$("#schedule_detail_image_name_"+file_seq).val(array_file_name[1]);
    		$("#schedule_detail_image_"+file_seq).val(aws_schedule_url+array_file_name[0]);
    		$("#div_image_"+file_seq).html('<img src="'+aws_schedule_url+array_file_name[0]+'" style="border:1px solid #000;width:100%;">');
    	}else{
    		$("#schedule_detail_file_name_"+file_seq).val(array_file_name[1]);
    		$("#schedule_detail_file_"+file_seq).val(aws_schedule_url+array_file_name[0]);
    		$("#div_file_"+file_seq).html('<a href="'+aws_schedule_url+array_file_name[0]+'" class="text-dark" target="_blank"><h5>'+array_file_name[1]+'<h5></a>');
    	}
    	$("#modal-notice-schedule-file").modal("hide");
    }).fail(function (error) {
    	console.log(error);
    })
    
}


function schedule_save(v_id, is_ignore, is_problem)
{
	var schedule_detail_use_report_image = false;
	var schedule_detail_use_report_url = false;
	var schedule_detail_use_report_ox = false;
	var schedule_detail_use_report_file = false;
	var schedule_detail_content = $("#schedule_detail_content_"+v_id).val();
	var schedule_detail_is_report_image = false;
	var schedule_detail_is_report_url = false;
	var schedule_detail_is_report_ox = false;
	var schedule_detail_is_report_file = false;
	var schedule_detail_image = "";
	var schedule_detail_image_name = "";
	var schedule_detail_url = "";
	var schedule_detail_ox = "";
	var schedule_detail_file = "";
	var schedule_detail_file_name = "";
	if($("#schedule_detail_use_report_image_"+v_id).val() == "1"){
		schedule_detail_use_report_image = true;
	}
	if($("#schedule_detail_use_report_url_"+v_id).val() == "1"){
		schedule_detail_use_report_url = true;
	}
	if($("#schedule_detail_use_report_ox_"+v_id).val() == "1"){
		schedule_detail_use_report_ox = true;
	}
	if($("#schedule_detail_use_report_file_"+v_id).val() == "1"){
		schedule_detail_use_report_file = true;
	}
	
	if(schedule_detail_use_report_image){
		schedule_detail_image      = $("#schedule_detail_image_"+v_id).val();
		schedule_detail_image_name = $("#schedule_detail_image_name_"+v_id).val();
		if(schedule_detail_image){
			schedule_detail_is_report_image = true;
		}
	}
	
	if(schedule_detail_use_report_url){
		schedule_detail_url      = $("#schedule_detail_url_"+v_id).val();
		if(schedule_detail_url){
			schedule_detail_is_report_url = true;
		}
	}
	
	if(schedule_detail_use_report_ox){
		schedule_detail_ox      = $("input[name='schedule_detail_ox_"+v_id+"']:checked").val();
		if(schedule_detail_ox){
			schedule_detail_is_report_ox = true;
		}
	}
	
	if(schedule_detail_use_report_file){
		schedule_detail_file      = $("#schedule_detail_file_"+v_id).val();
		schedule_detail_file_name = $("#schedule_detail_file_name_"+v_id).val();
		if(schedule_detail_file){
			schedule_detail_is_report_file = true;
		}
	}
	
	var schedule_detail_is_success = true;
	if(schedule_detail_use_report_image){
		if(!schedule_detail_is_report_image) schedule_detail_is_success = false; 
	}
	if(schedule_detail_use_report_url){
		if(!schedule_detail_is_report_url) schedule_detail_is_success = false; 
	}
	if(schedule_detail_use_report_ox){
		if(!schedule_detail_is_report_ox) schedule_detail_is_success = false; 
	}
	if(schedule_detail_use_report_file){
		if(!schedule_detail_is_report_file) schedule_detail_is_success = false; 
	}
	
	var schedule_detail_is_ignore = is_ignore;
	var schedule_detail_is_problem = is_problem;
	
	if(schedule_detail_is_ignore) schedule_detail_is_success = false; 
	if(schedule_detail_is_problem) schedule_detail_is_success = false; 
	if(schedule_detail_is_success){
		$("#notice_schedule_detail_"+v_id).removeClass("bg-success");
		$("#notice_schedule_detail_"+v_id).removeClass("bg-danger");
		$("#notice_schedule_detail_"+v_id).removeClass("bg-blue");
		$("#notice_schedule_detail_"+v_id).removeClass("bg-yellow");
		$("#notice_schedule_detail_"+v_id).addClass("bg-success");
		$("#notice_schedule_detail_header_"+v_id).removeClass("bg-success-darker");
		$("#notice_schedule_detail_header_"+v_id).removeClass("bg-danger-darker");
		$("#notice_schedule_detail_header_"+v_id).removeClass("bg-blue-darker");
		$("#notice_schedule_detail_header_"+v_id).removeClass("bg-yellow-darker");
		$("#notice_schedule_detail_header_"+v_id).addClass("bg-success-darker");
	}else{
		if(schedule_detail_is_ignore){
			$("#notice_schedule_detail_"+v_id).removeClass("bg-success");
			$("#notice_schedule_detail_"+v_id).removeClass("bg-danger");
			$("#notice_schedule_detail_"+v_id).removeClass("bg-blue");
			$("#notice_schedule_detail_"+v_id).removeClass("bg-yellow");
			$("#notice_schedule_detail_"+v_id).addClass("bg-blue");
			$("#notice_schedule_detail_header_"+v_id).removeClass("bg-success-darker");
			$("#notice_schedule_detail_header_"+v_id).removeClass("bg-danger-darker");
			$("#notice_schedule_detail_header_"+v_id).removeClass("bg-blue-darker");
			$("#notice_schedule_detail_header_"+v_id).removeClass("bg-yellow-darker");
			$("#notice_schedule_detail_header_"+v_id).addClass("bg-blue-darker");
		}else{
			if(schedule_detail_is_problem){
				$("#notice_schedule_detail_"+v_id).removeClass("bg-success");
				$("#notice_schedule_detail_"+v_id).removeClass("bg-danger");
				$("#notice_schedule_detail_"+v_id).removeClass("bg-blue");
				$("#notice_schedule_detail_"+v_id).removeClass("bg-yellow");
				$("#notice_schedule_detail_"+v_id).addClass("bg-yellow");
				$("#notice_schedule_detail_header_"+v_id).removeClass("bg-success-darker");
				$("#notice_schedule_detail_header_"+v_id).removeClass("bg-danger-darker");
				$("#notice_schedule_detail_header_"+v_id).removeClass("bg-blue-darker");
				$("#notice_schedule_detail_header_"+v_id).removeClass("bg-yellow-darker");
				$("#notice_schedule_detail_header_"+v_id).addClass("bg-yellow-darker");
			}else{
				$("#notice_schedule_detail_"+v_id).removeClass("bg-success");
				$("#notice_schedule_detail_"+v_id).removeClass("bg-danger");
				$("#notice_schedule_detail_"+v_id).removeClass("bg-blue");
				$("#notice_schedule_detail_"+v_id).removeClass("bg-yellow");
				$("#notice_schedule_detail_"+v_id).addClass("bg-danger");
				$("#notice_schedule_detail_header_"+v_id).removeClass("bg-success-darker");
				$("#notice_schedule_detail_header_"+v_id).removeClass("bg-danger-darker");
				$("#notice_schedule_detail_header_"+v_id).removeClass("bg-blue-darker");
				$("#notice_schedule_detail_header_"+v_id).removeClass("bg-yellow-darker");
				$("#notice_schedule_detail_header_"+v_id).addClass("bg-danger-darker");
			}
		}
	}
	
	
	$.ajax({
		type : "POST",
		url : "/main/updateNoticesScheduleDetail.do",
		data:{
			id:v_id,
			schedule_detail_content:schedule_detail_content,
			schedule_detail_is_report_image:schedule_detail_is_report_image,
			schedule_detail_is_report_url:schedule_detail_is_report_url,
			schedule_detail_is_report_ox:schedule_detail_is_report_ox,
			schedule_detail_is_report_file:schedule_detail_is_report_file,
			schedule_detail_image:schedule_detail_image,
			schedule_detail_image_name:schedule_detail_image_name,
			schedule_detail_url:schedule_detail_url,
			schedule_detail_ox:schedule_detail_ox,
			schedule_detail_file:schedule_detail_file,
			schedule_detail_file_name:schedule_detail_file_name,
			schedule_id:schedule_id,
			schedule_detail_is_success:schedule_detail_is_success,
			schedule_detail_is_ignore:schedule_detail_is_ignore,
			schedule_detail_is_problem:schedule_detail_is_problem
		},
		success:function(data){
			alert("저장하였습니다.");
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
	
}