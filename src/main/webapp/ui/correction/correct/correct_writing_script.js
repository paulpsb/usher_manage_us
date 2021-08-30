var mp3_url = "https://s3.ap-northeast-2.amazonaws.com/usher.api.data.writing/";
jQuery(document).ready(function(){
	$.ajax({
		type : "POST",
		url : "/correction/correct/getInternalExamsWritingAsArticle.do",
		data:{
			section:$("#section").val(),
			book:$("#book").val(),
			volume:$("#volume").val(),
			group:$("#group").val(),
			article:$("#article").val()
		},
		success:function(data){	
			var question = cfmNvl1(data.question);
			question = question.replace(/\n/g, "<br>");//행바꿈제거
			question = question.replace(/\r/g, "<br>");//엔터제거
			$("#question").html(question);

			var passage = cfmNvl1(data.passage);
			passage = passage.replace(/\n/g, "<br>");//행바꿈제거
			passage = passage.replace(/\r/g, "<br>");//엔터제거
			$("#passage").html(passage);

			var sound_script = cfmNvl1(data.sound_script);
			sound_script = sound_script.replace(/\n/g, "<br>");//행바꿈제거
			sound_script = sound_script.replace(/\r/g, "<br>");//엔터제거
			$("#sound_script").html(sound_script);
			
			if(data.book == "integrated"){
				var audio_url = mp3_url + data.book + "/" + data.article+".mp3";;
				$("#div_sound").html("<audio src='"+audio_url+"' style='width:100%;' controls>해당 브라우저는 audio 태그를 지원하지 않습니다.</audio>");
			}
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
});