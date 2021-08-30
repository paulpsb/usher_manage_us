var aws_url = "https://s3.ap-northeast-2.amazonaws.com/";
var first_second = 0;
var is_play = true;
var is_play_end = false;
var is_play_stop = false;

var is_merge = false;

var audioFile;
var temp_file;

//webkitURL is deprecated but nevertheless
var URL = window.URL || window.webkitURL;

var gumStream; 						//stream from getUserMedia()
var rec; 							//Recorder.js object
var input; 							//MediaStreamAudioSourceNode we'll be recording

// shim for AudioContext when it's not avb. 
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext //audio context to help us record

var fileArray=new Array();

var audio_url;

var correction_exams_answer_id;
var appeal_answer = "";

jQuery(document).ready(function(){
	editor = CKEDITOR.replace( 'speaking_appeal_editor1',
	        {
	                toolbar :
	                [
	                    [ 'Bold', 'Strike','Italic', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink' ]
	                ]
	        });
    CKEDITOR.config.removePlugins = 'elementspath';
    

    
    window.resizeTo(600,900);
    
	search_form();
});

function search_form()
{
	$.ajax({
		type : "POST",
		url : "/correction/correct/getCorrectionExamsSpeakingAppeal.do",
		data:{
			id:$("#correction_exams_appeal_id").val()
		},
		success:function(data){	
			correction_exams_answer_id = data.correction_exams_answer_id;
			file_temp_upload(data.appeal_question);
			//alert(audio_url);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function file_temp_upload(v_file_url)
{
	$.ajax({
		type : "POST",
		url : "/common/getAwsDownload.do",
		data:{
			awsFileName:v_file_url
		},
		success:function(data){	
			temp_file = data.fileName;
			//audio_url = aws_url + v_file_url;
			audio_url = "/common/downloadFile.do?fileName="+data.mp3FileName;
			audioFile = new Audio(audio_url);
			audioFile.onended = function() {
				is_play_end = true;
				audio_cutter(Math.round(audioFile.duration));
			};
			audioFile.ontimeupdate = function() {
				var rate = audioFile.currentTime / audioFile.duration * 100;
				
				$( "#div_progressbar" ).progressbar({value: rate});
				 
				var min;
				var sec;
					
				var time1 = Math.round(audioFile.currentTime);
				var time2 = Math.round(audioFile.duration);
				
				min = Math.floor(time1/ 60);
				sec = time1 - (min*60);
				
				if(min < 10) min = "0" + min;
				if(sec < 10) sec = "0" + sec;
				
				var timer1 =  min + ":" + sec;
				
				min = Math.floor(time2/ 60);
				sec = time2 - (min*60);
				
				if(min < 10) min = "0" + min;
				if(sec < 10) sec = "0" + sec;
				
				var timer2 =  min + ":" + sec;
				$("#speaking_time").html(timer1+" / "+timer2);
			};
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function btn_record_click()
{
	$("#btn_record").attr("disabled", true);
	$("#btn_pause").attr("disabled", false);
	
	$("#div_result").html("Playing...");
	is_play = true;
	audioFile.play();
}

function btn_pause_click()
{
	if(is_play){
		audioFile.pause();
		var currentSecond = Math.round(audioFile.currentTime);
		audio_cutter(currentSecond);
	}else{
		rec.stop();

		//stop microphone access
		gumStream.getAudioTracks()[0].stop();
		
		rec.exportWAV(record_file_upload);

	}
}

function audio_cutter(currentSecond)
{
	var secondsToCopy = currentSecond - first_second;
	$.ajax({
		type : "POST",
		url : "/common/getMp3Cutter.do",
		data:{
			wavFileName:temp_file,
			startSecond:first_second,
			secondsToCopy:secondsToCopy
		},
		success:function(data){	
			first_second = currentSecond;
			var objFile = Object();
			objFile.fileName = data.fileName;
			fileArray.push(objFile);
			if(is_merge){
				set_merge();
			}else{
				is_play = false;
				$("#div_result").html("Voice Recording");
				voice_record();
			}
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}
function voice_record()
{
	//녹음시작
	var constraints = { audio: true, video:false }
	navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
		audioContext = new AudioContext();
		/*  assign to gumStream for later use  */
		gumStream = stream;
		
		/* use the stream */
		input = audioContext.createMediaStreamSource(stream);

		/* 
			Create the Recorder object and configure to record mono sound (1 channel)
			Recording 2 channels  will double the file size
		*/
		rec = new Recorder(input,{numChannels:1})

		rec.record()

	}).catch(function(err) {
	  
	});
}

function record_file_upload(blob)
{
	var filename = new Date().toISOString();
	
	var formData=new FormData();
	formData.append("file",blob, filename);
	
	$.ajax({
        type: 'POST',
        url: '/common/getFileUpload.do',
        data: formData,
        processData: false,
        contentType: false
    }).done(function (data) {
    	var objFile = Object();
		objFile.fileName = data;
		fileArray.push(objFile);
		
		if(is_merge){
			set_merge();
		}else{
			if(is_play_end){
				is_play_stop = true;
				$("#div_result").html("PRESS STOP BUTTON TO SAVE CORRECTION");
				$("#btn_pause").attr("disabled", true);
	    	}else{
	        	is_play = true;
	        	$("#div_result").html("Playing...");
	        	audioFile.play();
	    	}
		}
    }).fail(function (error) {
    	console.log(error);
    })
	
}


function btn_stop_click()
{
	if(fileArray.length > 0)
	{
		is_merge = true;
		if(is_play_stop)
		{
			set_merge();
		}else{
			if(is_play_end){
				rec.stop();

				//stop microphone access
				gumStream.getAudioTracks()[0].stop();
				
				rec.exportWAV(record_file_upload);
			}else{
				if(is_play){
					audioFile.pause();
					var currentSecond = Math.round(audioFile.currentTime);
					audio_cutter(currentSecond);
				}else{
					rec.stop();

					//stop microphone access
					gumStream.getAudioTracks()[0].stop();
					
					rec.exportWAV(record_file_upload);
				}
			}
		}
		
	}else{
		alert("저장할 음성이 존재하지 않습니다.");
		$("#btn_pause").attr("disabled", false);
	}
}

function set_merge()
{
	$("#btn_record").attr("disabled", true);
	$("#btn_pause").attr("disabled", true);
	$("#btn_stop").attr("disabled", true);
	
	$.ajax({
		type : "POST",
		url : "/common/setMergeWav.do",
		data:{
			fileName:temp_file,
			data_value:JSON.stringify(fileArray)
		},
		success:function(data){
			appeal_answer = data.awsFileName;
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}


function saveAppeal()
{
	if(!appeal_answer) return;
	$("#btn_appeal").hide();
	
	$.ajax({
		type : "POST",
		url : "/correction/correct/updateCorrectionExamsSpeakingAppeal.do",
		data:{
			id:$("#correction_exams_appeal_id").val(),
			correction_exams_answer_id:correction_exams_answer_id,
			appeal_answer:appeal_answer,
			appeal_answer_comment:CKEDITOR.instances.speaking_editor1.getData()
		},
		success:function(data){
			alert("저장하였습니다.");
			opener.search_form();
			self.close();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}