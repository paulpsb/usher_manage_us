var exam_info;

var mp3_url = "https://s3.ap-northeast-2.amazonaws.com/usher.api.data.speaking/";

var audioFile;

var exam_time;
var timerID;

//webkitURL is deprecated but nevertheless
var URL = window.URL || window.webkitURL;

var gumStream; 						//stream from getUserMedia()
var rec; 							//Recorder.js object
var input; 							//MediaStreamAudioSourceNode we'll be recording

// shim for AudioContext when it's not avb. 
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext //audio context to help us record
/*
* 설명 : 화면이 로딩후 진행중인 시험이 있는지 파악 후 화면 이동여부 체크
 */
jQuery(document).ready(function(){
	$.ajax({
		type : "POST",
		url : "/exam/selectExamSpeaking.do",
		data:{
			id:$("#practice_problem_id").val()
		},
		success:function(data){	
			//if(!data) self.close();
			
			exam_info = data;
			
			//최초에는 direction으로 간다.
			go_direction();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});

});

function hide_form()
{
	$("#direction").hide();
	$("#content").hide();
}

function go_direction()
{
	hide_form();
	$("#direction").show();
	$("#btn_skip_direction").show();
	$("#speaking_label").html("Speaking Section");
	//음원재생을 시킨다.
	
	audioFile = new Audio("/audio/speaking_direction.mp3");
	
	audioFile.play();
}

function click_skip_direction()
{
	$("#btn_skip_direction").hide();
	audioFile.pause();
	go_question();
}

function click_next()
{
	clearInterval(timerID);
	$("#btn_next").hide();
	//tell the recorder to stop the recording
	rec.stop();

	//stop microphone access
	gumStream.getAudioTracks()[0].stop();
	
	rec.exportWAV(file_upload);
}

function go_question()
{
	$("#speaking_label").html("Question 1 of 1");
	hide_form();
	var task = exam_info.book;
	if(task == "task1"){
		exam_task1();
	}else if(task == "task4"){
		exam_task3();
	}else{
		exam_task2();
	}
}

function exam_task1()
{
	var vHtml = "";
	vHtml += '<p style="font-size:16px;">'+exam_info.question+'</p>';
	vHtml += '<div style="height:2px;background-color:#000;"></div>';
	vHtml += '<div style="text-align:center;margin-top:20px;">';
	vHtml += '	<span style="padding:5px 15px;background-color:#000;color:#fff;">Preparation time : 15 seconds</span>';
	vHtml += '</div>';
	vHtml += '<div style="text-align:center;margin-top:15px;margin-bottom:50px;">';
	vHtml += '	<span style="padding:5px 22px;background-color:#000;color:#fff;">Response time : 45 seconds</span>';
	vHtml += '</div>';
	vHtml += '<div style="width:215px;height:55px;background-color:#000;color:#fff;margin-left:300px;text-align:center;padding-top:17px;">';
	vHtml += '	<p id="task1_title">PREPARATION TIME</p>';
	vHtml += '</div>';
	vHtml += '<div style="width:215px;height:55px;border:1px solid #000;color:#000;margin-left:300px;text-align:center;padding-top:17px;">';
	vHtml += '	<p id="task1_timer">00:15</p>';
	vHtml += '</div>';
	
	$("#content").html(vHtml);
	$("#content").show();
	
	exam_task1_step1();
}

function exam_task1_step1()
{
	$("#task1_title").html("PREPARATION TIME");
	exam_time = 15;
	audioFile = new Audio("/audio/speaking_prepare.mp3");
	audioFile.onended = function() {
		timerID = setInterval("exam_task1_step1_time()", 1000);
	};
	audioFile.play();
}

function exam_task1_step1_time()
{
	var min;
	var sec;
	
	min = Math.floor( exam_time / 60 );
	sec = exam_time - (min*60);
	
	if(min < 10) min = "0" + min;
	if(sec < 10) sec = "0" + sec;
	
	$('#task1_timer').text(min + ":" + sec);

	if(exam_time > 0)
	{
		exam_time--;
	}else{
		clearInterval(timerID);
		exam_task1_step2();
	}
}

function exam_task1_step2()
{
	$("#task1_title").html("RESPONSE TIME");
	exam_time = 45;
	audioFile = new Audio("/audio/speaking_record.mp3");
	audioFile.onended = function() {
		timerID = setInterval("exam_task1_step2_time()", 1000);
		exam_task1_step3();
	};
	audioFile.play();
}

function exam_task1_step2_time()
{
	var min;
	var sec;
	
	min = Math.floor( exam_time / 60 );
	sec = exam_time - (min*60);
	
	if(min < 10) min = "0" + min;
	if(sec < 10) sec = "0" + sec;
	
	$('#task1_timer').text(min + ":" + sec);

	if(exam_time > 0)
	{
		exam_time--;
	}else{
		clearInterval(timerID);
	}
}


function exam_task2()
{
	var vHtml = "";
	vHtml += '<p id="task2_timer" style="text-align:right;">Reading Time : 45 seconds</p>';
	vHtml += '<div style="text-align:center;background-color: rgb(238,238,238);height: 450px;padding:30px;">';
	vHtml += '	<p style="font-size:16px;"><b>'+exam_info.title+'</b></p>';
	vHtml += '	<p style="font-size:14px;text-align:left;">'+exam_info.passage+'</p>';
	vHtml += '</div>';
	
	$("#content").html(vHtml);
	$("#content").show();
	
	$("#btn_exam_task2_step1").show();
}

function exam_task2_step1()
{
	$("#btn_exam_task2_step1").hide();
	var vHtml = "";
	vHtml += '<div style="padding:20px;width:640px;border:1px solid #000;text-align:center;margin-left: 80px;">';
	vHtml += '	<img src="/common/exam/images/speaking_listening.jpg" style="width:599px;height:452px;border:1px solid #000;">';
	vHtml += '</div>';
	vHtml += '<div id="div_progressbar" style="width:313px;height:10px;border:1px solid #000;margin-left: 250px;margin-top: 10px;"></div>';
	vHtml += '<div id="time_listening" style="width:100%;text-align:center">00:00 / 00:00</div>';
	
	$("#content").html(vHtml);
	$("#content").show();
	
	$("#btn_skip_passage2").show();
	var url = mp3_url + exam_info.book + "/" + exam_info.article+".mp3";
	
	 $( "#div_progressbar" ).progressbar({value: 0});
	    
		audioFile = new Audio(url);
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
			$("#time_listening").html(timer1+" / "+timer2);
		};
		audioFile.play();
}

function click_skip_passage2()
{
	audioFile.pause();
	$("#btn_skip_passage2").hide();
	exam_task2_step2();
}

function exam_task2_step2()
{
	var vHtml = "";
	vHtml += '<p style="font-size:16px;">'+exam_info.question+'</p>';
	vHtml += '<div style="height:2px;background-color:#000;"></div>';
	vHtml += '<div style="text-align:center;margin-top:20px;">';
	vHtml += '	<span style="padding:5px 15px;background-color:#000;color:#fff;">Preparation time : 30 seconds</span>';
	vHtml += '</div>';
	vHtml += '<div style="text-align:center;margin-top:15px;margin-bottom:50px;">';
	vHtml += '	<span style="padding:5px 22px;background-color:#000;color:#fff;">Response time : 60 seconds</span>';
	vHtml += '</div>';
	vHtml += '<div style="width:215px;height:55px;background-color:#000;color:#fff;margin-left:300px;text-align:center;padding-top:17px;">';
	vHtml += '	<p id="task1_title">PREPARATION TIME</p>';
	vHtml += '</div>';
	vHtml += '<div style="width:215px;height:55px;border:1px solid #000;color:#000;margin-left:300px;text-align:center;padding-top:17px;">';
	vHtml += '	<p id="task1_timer">00:00</p>';
	vHtml += '</div>';
	
	$("#content").html(vHtml);
	$("#content").show();
	
	exam_task2_step3();
}

function exam_task2_step3()
{
	$("#task1_title").html("PREPARATION TIME");
	exam_time = 30;
	audioFile = new Audio("/audio/speaking_prepare.mp3");
	audioFile.onended = function() {
		timerID = setInterval("exam_task2_step3_time()", 1000);
	};
	audioFile.play();
}

function exam_task2_step3_time()
{
	var min;
	var sec;
	
	min = Math.floor( exam_time / 60 );
	sec = exam_time - (min*60);
	
	if(min < 10) min = "0" + min;
	if(sec < 10) sec = "0" + sec;
	
	$('#task1_timer').text(min + ":" + sec);

	if(exam_time > 0)
	{
		exam_time--;
	}else{
		clearInterval(timerID);
		exam_task2_step4();
	}
}

function exam_task2_step4()
{
	$("#task1_title").html("RESPONSE TIME");
	exam_time = 60;
	audioFile = new Audio("/audio/speaking_record.mp3");
	audioFile.play();
}


function exam_task3()
{
	var vHtml = "";
	vHtml += '<div style="padding:20px;width:640px;border:1px solid #000;text-align:center;margin-left: 80px;">';
	vHtml += '	<img src="/common/exam/images/speaking_listening.jpg" style="width:599px;height:452px;border:1px solid #000;">';
	vHtml += '</div>';
	vHtml += '<div id="div_progressbar" style="width:313px;height:10px;border:1px solid #000;margin-left: 250px;margin-top: 10px;"></div>';
	vHtml += '<div id="time_listening" style="width:100%;text-align:center">00:00 / 00:00</div>';
	
	$("#content").html(vHtml);
	$("#content").show();
	$("#btn_skip_passage3").show();
	var url = mp3_url + exam_info.book + "/" + exam_info.article+".mp3";
	
	 $( "#div_progressbar" ).progressbar({value: 0});
	    
		audioFile = new Audio(url);
		
		
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
			$("#time_listening").html(timer1+" / "+timer2);
		};
		
		audioFile.play();
}

function click_skip_passage3()
{
	audioFile.pause();
	$("#btn_skip_passage3").hide();
	exam_task3_step1();
}

function exam_task3_step1()
{
	var vHtml = "";
	vHtml += '<p style="font-size:16px;">'+exam_info.question+'</p>';
	vHtml += '<div style="height:2px;background-color:#000;"></div>';
	vHtml += '<div style="text-align:center;margin-top:20px;">';
	vHtml += '	<span style="padding:5px 15px;background-color:#000;color:#fff;">Preparation time : 20 seconds</span>';
	vHtml += '</div>';
	vHtml += '<div style="text-align:center;margin-top:15px;margin-bottom:50px;">';
	vHtml += '	<span style="padding:5px 22px;background-color:#000;color:#fff;">Response time : 60 seconds</span>';
	vHtml += '</div>';
	vHtml += '<div style="width:215px;height:55px;background-color:#000;color:#fff;margin-left:300px;text-align:center;padding-top:17px;">';
	vHtml += '	<p id="task1_title">PREPARATION TIME</p>';
	vHtml += '</div>';
	vHtml += '<div style="width:215px;height:55px;border:1px solid #000;color:#000;margin-left:300px;text-align:center;padding-top:17px;">';
	vHtml += '	<p id="task1_timer">00:00</p>';
	vHtml += '</div>';
	
	$("#content").html(vHtml);
	$("#content").show();
	
	exam_task3_step2();
}

function exam_task3_step2()
{
	$("#task1_title").html("PREPARATION TIME");
	exam_time = 20;
	audioFile = new Audio("/audio/speaking_prepare.mp3");
	audioFile.onended = function() {
		timerID = setInterval("exam_task3_step2_time()", 1000);
	};
	audioFile.play();
}

function exam_task3_step2_time()
{
	var min;
	var sec;
	
	min = Math.floor( exam_time / 60 );
	sec = exam_time - (min*60);
	
	if(min < 10) min = "0" + min;
	if(sec < 10) sec = "0" + sec;
	
	$('#task1_timer').text(min + ":" + sec);

	if(exam_time > 0)
	{
		exam_time--;
	}else{
		clearInterval(timerID);
		exam_task3_step3();
	}
}

function exam_task3_step3()
{
	$("#task1_title").html("RESPONSE TIME");
	exam_time = 60;
	audioFile = new Audio("/audio/speaking_record.mp3");
	audioFile.play();
}
