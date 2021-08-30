var exam_info;

var mp3_url = "https://s3.ap-northeast-2.amazonaws.com/usher.api.data.writing/";

var audioFile;

var exam_time;
var timerID;

var current_stat;
/*
* 설명 : 화면이 로딩후 진행중인 시험이 있는지 파악 후 화면 이동여부 체크
 */
jQuery(document).ready(function(){
	$.ajax({
		type : "POST",
		url : "/exam/selectExamWriting.do",
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

function hide_button()
{
	$("#btn_continue").hide();
	$("#btn_next").hide();
}

function go_direction()
{
	hide_form();
	hide_button();
	$("#direction").show();
	$("#btn_continue").show();
}

function click_continue()
{
	go_question();
}

function click_next()
{
	if(current_stat == "writing"){
		form_submit();
	}else if(current_stat == "reading"){
		exam_task2_step1();
	}else if(current_stat == "listening"){
		audioFile.pause();
		exam_task2_step2();
	}
}

function go_question()
{
	$("#writing_label").html("Question 1 of 1");
	hide_form();
	hide_button();
	var task = exam_info.book;
	if(task == "independent"){
		exam_task1();
	}else if(task == "integrated"){
		exam_task2();
	}
}

function exam_task1()
{
	hide_form();
	hide_button();
	$("#btn_next").show();

	var vHtml = "";
	vHtml += '<div style="width:100%;height:80px;border-bottom:1px solid #000;margin:0px;">';
	vHtml += '	<p style="padding:30px;font-size:16px;"><b>Directions : </b>You have 30 minutes to plan and write your response.</p>';
	vHtml += '</div>';
	vHtml += '<div style="float:left;width:50%;height:597px;overflow-x:hidden;padding-top:20px;overflow-y:auto;">';
	vHtml += '	<p style="padding:0px 30px;font-size:16px;"><b>Question : </b></p>';
	vHtml += '	<p style="padding:0px 30px;font-size:16px;"><b>'+exam_info.question+'</b></p>';
	vHtml += '	<p style="padding:0px 30px;font-size:16px;">Use specific reasons and examples to support your opinion.</p>';
	vHtml += '</div>';
	vHtml += '<div style="float:left;width:50%;height:597px;border-left:1px solid #000;overflow-x:hidden;overflow-y:auto;padding:5px;">';
	vHtml += '	<p style="float:left;width:50%;padding:10px 5px;font-size:16px;" id="word_count">0 words</p>';
	vHtml += '	<p style="float:left;width:50%;padding:10px 5px;font-size:16px;text-align:right" id="task1_timer">00:00</p>';
	vHtml += '	<textarea style="width:100%;height:526px;" id="useranswer" onKeyUp="checkWordsLength(this)" onKeyDown="blockPaste()"></textarea>';
	vHtml += '</div>';
	$("#content").html(vHtml);
	$("#content").show();
	current_stat = "writing";
}

function exam_task2()
{
	hide_form();
	hide_button();
	$("#btn_next").show();

	var passage = exam_info.passage;
	passage = passage.replace(/\n/g, "<br>");//행바꿈제거
	passage = passage.replace(/\r/g, "<br>");//엔터제거
	var vHtml = "";
	vHtml += '<div style="width:100%;height:80px;border-bottom:1px solid #000;margin:0px;">';
	vHtml += '	<p style="padding:30px;font-size:16px;text-align:right" id="task2_timer">00:00</p>';
	vHtml += '</div>';
	vHtml += '<div style="float:left;width:50%;height:597px;overflow-x:hidden;padding-top:20px;overflow-y:auto;">';
	vHtml += '	<p style="padding:0px 10px;font-size:14px;">'+passage+'</p>';
	vHtml += '</div>';
	vHtml += '<div style="float:left;width:50%;height:597px;border-left:1px solid #000;overflow-x:hidden;overflow-y:auto;padding:5px;">';
	vHtml += '</div>';

	$("#content").html(vHtml);
	$("#content").show();
	current_stat = "reading";
}

function exam_task2_step1()
{
	var vHtml = "";
	vHtml += '<div style="padding:20px;width:640px;border:1px solid #000;text-align:center;margin-left: 190px;margin-top:80px;">';
	vHtml += '	<img src="/common/exam/images/writing_listening.jpg" style="width:599px;height:452px;border:1px solid #000;">';
	vHtml += '</div>';
	vHtml += '<div id="div_progressbar" style="width:313px;height:10px;border:1px solid #000;margin-left: 350px;margin-top: 10px;"></div>';
	vHtml += '<div id="time_listening" style="width:100%;text-align:center">00:00 / 00:00</div>';

	$("#content").html(vHtml);
	$("#content").show();
	
	current_stat = "listening";
	
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

function exam_task2_step2()
{
	hide_form();
	hide_button();
	$("#btn_next").show();

	var passage = exam_info.passage;
	passage = passage.replace(/\n/g, "<br>");//행바꿈제거
	passage = passage.replace(/\r/g, "<br>");//엔터제거
	
	var vHtml = "";
	vHtml += '<div style="width:100%;height:80px;border-bottom:1px solid #000;margin:0px;">';
	vHtml += '	<p style="padding:5px 30px;font-size:16px;"><b>Directions : </b>You have 20 minutes to plan and write your response. Your response will be judged on the basis of the quality of your writing and on how well your response presents the points in the lecture and their relationship to the reading passage. Typically, an effective response will be 150 to 225 words.</p>';
	vHtml += '</div>';
	vHtml += '<div style="float:left;width:50%;height:597px;overflow-x:hidden;padding-top:20px;overflow-y:auto;">';
	vHtml += '	<p style="padding:0px 10px;font-size:16px;"><b>Questions  : '+exam_info.question+'</b></p>';
	vHtml += '	<p style="padding:0px 10px;font-size:14px;">'+passage+'</p>';
	vHtml += '</div>';
	vHtml += '<div style="float:left;width:50%;height:597px;border-left:1px solid #000;overflow-x:hidden;overflow-y:auto;padding:5px;">';
	vHtml += '	<p style="float:left;width:50%;padding:10px 5px;font-size:16px;" id="word_count">0 words</p>';
	vHtml += '	<p style="float:left;width:50%;padding:10px 5px;font-size:16px;text-align:right" id="task2_timer">00:00</p>';
	vHtml += '	<textarea style="width:100%;height:526px;" id="useranswer" onKeyUp="checkWordsLength(this)" onKeyDown="blockPaste()"></textarea>';
	vHtml += '</div>';
	$("#content").html(vHtml);
	$("#content").show();
	current_stat = "writing";
}

//Presenting the total counted number what students typed.
function checkWordsLength(obj) {
	strlen = getStrlen(obj.value);
	$("#word_count").html(strlen+" words");
}

//Block the Ctrl + C , Ctrl + V
function blockPaste() {
  var pressedKey = String.fromCharCode(event.keyCode).toLowerCase();

  if (event.ctrlKey && (pressedKey == "c" || pressedKey == "v" || pressedKey == "x")) {
    event.returnValue = false;
  }
}

function getStrlen(str) {
	if(str==null || str=='') return 0;
	
	var strlen=0;
	for (var i=0; i<str.length; i++) {
		var c = str.charCodeAt(i);
		var p = str.charCodeAt(i-1);
		// 스페이스키만 인식해서 단어 갯수 셈
		if(p != 0x0020 && c == 0x0020)
			strlen++;
	}
	
	return strlen;
 }