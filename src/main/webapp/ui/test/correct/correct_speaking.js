var speaking_rubric = [
	["Consonants<br>(자음 발음)","자음을 올바르게 발음했는지를 판단합니다. (b-v f-p j-z l-r s-f th)<br>올바르면 good, 약간의 오류가 있으면 fair, 오류가 많으면 limited를 받습니다."],
	["Vowels<br>(모음 발음)","모음을 올바르게 발음했는지를 판단합니다. ( i: I e o ou u u: )<br>올바르면 good, 약간의 오류가 있으면 fair, 오류가 많으면 limited를 받습니다."],
	["Stress & Intonation<br>(강세 / 억양)","음절이나 단어의 강약이 제대로 표현되었는지를 판단합니다.<br>정확하면 good, 약간의 오류가 있으면 fair, 오류가 많으면 limited를 받습니다."],
	["Punctuating & Speed<br>(띄어쓰기 / 속도)","적당한 곳에서 쉬면서 막힘없이 일정한 속도를 유지했는지를 판단합니다.<br>정확하면 good, 약간의 오류가 있으면 fair, 오류가 많으면 limited를 받습니다."],
	["Grammar<br>(문법)","문법에 맞게 내용을 전달했는지를 판단합니다.<br>정확하면 good, 약간의 오류가 있으면 fair, 오류가 많으면 limited를 받습니다."],
	["Expression<br>(표현력)","다양한 어휘와 표현을 적절하게 썼는지를 판단합니다.<br>그런 경우 good, 보통인 경우 fair, 아닌 경우는 limited를 받습니다."],
	["Structure<br>(문장구조)","어순에 맞게 체계적인 문장구조를 갖추었는지를 판단합니다.<br>그런 경우 good, 문장이 단순하면 fair, 문장이 미완성이면 limited를 받습니다."],
	["Coherence<br>(일관성)","답안의 내용과 흐름에 일관성이 있는지를 판단합니다.<br>그런 경우 good, 보통인 경우 fair, 아닌 경우는 limited를 받습니다."],
	["Accuracy<br>(정확도)","내용이 정확하게 전달되었는지를 판단합니다.<br>그런 경우 good, 보통인 경우 fair, 아닌 경우는 limited를 받습니다."],
	["Completeness<br>(완성도)","중요한 내용이나 세부사항을 빠뜨리지 않았는지를 판단합니다.<br>그런 경우 good, 보통인 경우 fair, 아닌 경우는 limited를 받습니다."]
];

var aws_url = "https://s3.ap-northeast-2.amazonaws.com/";
jQuery(document).ready(function(){
	$(window).resize(resizeContents);
    resizeContents();
    
	search_form();
});

/*
 * 설명 : 화면 사이즈 변경시 문제 영역 변경
 */
function resizeContents()
{
	//현재의 사이즈를 찾는다.
	var window_size = $(window).height();
	
	$("#div_container").height(window_size-150);

}

function search_form()
{
	$.ajax({
		type : "POST",
		url : "/test/correct/getSpeakingTestResult.do",
		data:{
			id:$("#practice_result_id").val()
		},
		success:function(data){	
			var remain_time = data.resultInfo.total_minitues;
			
			var min;
			var sec;
			
			min = Math.floor( remain_time / 60 );
			sec = remain_time - (min*60);
			
			if(min < 10) min = "0" + min;
			if(sec < 10) sec = "0" + sec;
			
			$("#speaking_question").html("<b>Question : </b>"+data.answerInfo.answer);
			$("#reg_date").html("<b>작성일 : </b>"+data.resultInfo.created);
			$("#speaking_exam_time").html("<b>남은제한시간 : </b>"+min+":"+sec);
			var audio_url = aws_url + data.userAnswerInfo.answer;
			$("#speaking_answer").html("<audio src='"+audio_url+"' style='width:100%;' controls>해당 브라우저는 audio 태그를 지원하지 않습니다.</audio>");
			
			var vHtml = "";
			if(data.userAnswerInfo.result){
				$("#speaking_user_date").html('<b>개인 첨삭 작성 일시 : </b>'+data.userAnswerInfo.modified);
				$("#speaking_user_data").html(data.userAnswerInfo.result.replace(/\n/g, '<br/>'));
			}else{
				$("#speaking_user_data").html('<b>개인 첨삭이 등록되어있지 않습니다.</b>');
			}
			
			
			if(data.rubricInfo){
				$("#rubric_date").html('<b>작성 일시 : </b>'+data.rubricInfo.modified);
				$("#rubric_writer").html('<b>Rubric 채점자 : </b>'+data.rubricInfo.rubric_name);
				$("#rubric_score").html('<b>Evaluation : </b>'+data.rubricInfo.rubric_total_score);
				rubric_score01 = data.rubricInfo.rubric_score01;
				rubric_score02 = data.rubricInfo.rubric_score02;
				rubric_score03 = data.rubricInfo.rubric_score03;
				rubric_score04 = data.rubricInfo.rubric_score04;
				rubric_score05 = data.rubricInfo.rubric_score05;
				rubric_score06 = data.rubricInfo.rubric_score06;
				rubric_score07 = data.rubricInfo.rubric_score07;
				rubric_score08 = data.rubricInfo.rubric_score08;
				rubric_score09 = data.rubricInfo.rubric_score09;
				rubric_score10 = data.rubricInfo.rubric_score10;
				
				create_rubric();
				
				$('#rubric_01_'+rubric_score01).prop("checked", true);
				$('#rubric_02_'+rubric_score02).prop("checked", true);
				$('#rubric_03_'+rubric_score03).prop("checked", true);
				$('#rubric_04_'+rubric_score04).prop("checked", true);
				$('#rubric_05_'+rubric_score05).prop("checked", true);
				$('#rubric_06_'+rubric_score06).prop("checked", true);
				$('#rubric_07_'+rubric_score07).prop("checked", true);
				$('#rubric_08_'+rubric_score08).prop("checked", true);
				$('#rubric_09_'+rubric_score09).prop("checked", true);
				$('#rubric_10_'+rubric_score10).prop("checked", true);
				
			}else{
				$("#rubric_data").html('<b>Rubric이 등록되어있지 않습니다.</b>');
			}
			
			vHtml = "";
			if(data.commentInfo){
				$("#speaking_comment_date").html('<b>첨삭 작성 일시 : </b>'+data.commentInfo.modified);
				$("#speaking_comment_writer").html('<b>첨삭자 : </b>'+data.commentInfo.comment_name);
				
				var audio_url1 = aws_url + data.commentInfo.comment;
				$("#speaking_comment_data").html("<audio src='"+audio_url1+"' style='width:100%;' controls>해당 브라우저는 audio 태그를 지원하지 않습니다.</audio>");
			}else{
				$("#speaking_comment_data").html('<b>믐성 첨삭이 등록되어있지 않습니다.</b>');
			}
			
			vHtml = "";
			if(data.noteInfo){
				$("#speaking_note_date").html('<b>오답노트 작성 일시 : </b>'+data.noteInfo.modified);
				vHtml += "<p style='font-size:18px;'><b>나의 깨달음</b></p>";
				vHtml += data.noteInfo.note_comment.replace(/\n/g, '<br/>');
				vHtml += "<p style='font-size:18px;'><b>나의 정리</b></p>";
				vHtml += data.noteInfo.arrange_comment.replace(/\n/g, '<br/>');
				$("#speaking_note_data").html(vHtml);
			}else{
				$("#speaking_note_data").html('<b>오답노트가 등록되어있지 않습니다.</b>');
			}

		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function create_rubric()
{
	var vHtml = "";
	
	vHtml += '<table class="table table-bordered">';
	vHtml += '	<thead class="thead-light">';
	vHtml += '		<tr>';
	vHtml += '			<th style="text-align:center;border: 1px solid #000;vertical-align: middle;">Delivery</th>';
	vHtml += '			<th style="text-align:center;border: 1px solid #000;vertical-align: middle;">전달력</th>';
	vHtml += '			<th style="text-align:center;border: 1px solid #000;vertical-align: middle;">Weak</th>';
	vHtml += '			<th style="text-align:center;border: 1px solid #000;vertical-align: middle;">Limited</th>';
	vHtml += '			<th style="text-align:center;border: 1px solid #000;vertical-align: middle;">Fair</th>';
	vHtml += '			<th style="text-align:center;border: 1px solid #000;vertical-align: middle;">Good</th>';
	vHtml += '		</tr>';
	vHtml += '	</thead>';
	vHtml += '	<tbody>';
	for(var i=0; i<4; i++)
	{
		var nId = ""+(i+1);
		
		if(i < 9) nId = "0"+(i+1);
		
		vHtml += '		<tr>';
		vHtml += '			<td style="text-align:center;border: 1px solid #000;vertical-align: middle;">'+speaking_rubric[i][0]+'</td>';
		vHtml += '			<td style="border: 1px solid #000;vertical-align: middle;">'+speaking_rubric[i][1]+'</td>';
		vHtml += '			<td style="text-align:center;border: 1px solid #000;vertical-align: middle;"><input type="radio" name="rubric_'+nId+'" id="rubric_'+nId+'_0" value="0" disabled></td>';
		vHtml += '			<td style="text-align:center;border: 1px solid #000;vertical-align: middle;"><input type="radio" name="rubric_'+nId+'" id="rubric_'+nId+'_1" value="1" disabled></td>';
		vHtml += '			<td style="text-align:center;border: 1px solid #000;vertical-align: middle;"><input type="radio" name="rubric_'+nId+'" id="rubric_'+nId+'_2" value="2" disabled></td>';
		vHtml += '			<td style="text-align:center;border: 1px solid #000;vertical-align: middle;"><input type="radio" name="rubric_'+nId+'" id="rubric_'+nId+'_3" value="3" disabled></td>';
		vHtml += '		</tr>';
	}
	vHtml += '	</tbody>';
	vHtml += '	<thead class="thead-light">';
	vHtml += '		<tr>';
	vHtml += '			<th style="text-align:center;border: 1px solid #000;vertical-align: middle;">Use of Language</th>';
	vHtml += '			<th style="text-align:center;border: 1px solid #000;vertical-align: middle;">언어의 사용</th>';
	vHtml += '			<th style="text-align:center;border: 1px solid #000;vertical-align: middle;">0</th>';
	vHtml += '			<th style="text-align:center;border: 1px solid #000;vertical-align: middle;">1</th>';
	vHtml += '			<th style="text-align:center;border: 1px solid #000;vertical-align: middle;">2</th>';
	vHtml += '			<th style="text-align:center;border: 1px solid #000;vertical-align: middle;">3</th>';
	vHtml += '		</tr>';
	vHtml += '	</thead>';
	vHtml += '	<tbody>';
	for(var i=4; i<7; i++)
	{
		var nId = ""+(i+1);
		
		if(i < 9) nId = "0"+(i+1);
		
		vHtml += '		<tr>';
		vHtml += '			<td style="text-align:center;border: 1px solid #000;vertical-align: middle;">'+speaking_rubric[i][0]+'</td>';
		vHtml += '			<td style="border: 1px solid #000;vertical-align: middle;">'+speaking_rubric[i][1]+'</td>';
		vHtml += '			<td style="text-align:center;border: 1px solid #000;vertical-align: middle;"><input type="radio" name="rubric_'+nId+'" id="rubric_'+nId+'_0" value="0" disabled></td>';
		vHtml += '			<td style="text-align:center;border: 1px solid #000;vertical-align: middle;"><input type="radio" name="rubric_'+nId+'" id="rubric_'+nId+'_1" value="1" disabled></td>';
		vHtml += '			<td style="text-align:center;border: 1px solid #000;vertical-align: middle;"><input type="radio" name="rubric_'+nId+'" id="rubric_'+nId+'_2" value="2" disabled></td>';
		vHtml += '			<td style="text-align:center;border: 1px solid #000;vertical-align: middle;"><input type="radio" name="rubric_'+nId+'" id="rubric_'+nId+'_3" value="3" disabled></td>';
		vHtml += '		</tr>';
	}
	vHtml += '	</tbody>';
	vHtml += '	<thead class="thead-light">';
	vHtml += '		<tr>';
	vHtml += '			<th style="text-align:center;border: 1px solid #000;vertical-align: middle;">Topic Development</th>';
	vHtml += '			<th style="text-align:center;border: 1px solid #000;vertical-align: middle;">주제의 전개</th>';
	vHtml += '			<th style="text-align:center;border: 1px solid #000;vertical-align: middle;">0</th>';
	vHtml += '			<th style="text-align:center;border: 1px solid #000;vertical-align: middle;">1</th>';
	vHtml += '			<th style="text-align:center;border: 1px solid #000;vertical-align: middle;">2</th>';
	vHtml += '			<th style="text-align:center;border: 1px solid #000;vertical-align: middle;">3</th>';
	vHtml += '		</tr>';
	vHtml += '	</thead>';
	vHtml += '	<tbody>';
	for(var i=7; i<10; i++)
	{
		var nId = ""+(i+1);
		
		if(i < 9) nId = "0"+(i+1);
		
		vHtml += '		<tr>';
		vHtml += '			<td style="text-align:center;border: 1px solid #000;vertical-align: middle;">'+speaking_rubric[i][0]+'</td>';
		vHtml += '			<td style="border: 1px solid #000;vertical-align: middle;">'+speaking_rubric[i][1]+'</td>';
		vHtml += '			<td style="text-align:center;border: 1px solid #000;vertical-align: middle;"><input type="radio" name="rubric_'+nId+'" id="rubric_'+nId+'_0" value="0" disabled></td>';
		vHtml += '			<td style="text-align:center;border: 1px solid #000;vertical-align: middle;"><input type="radio" name="rubric_'+nId+'" id="rubric_'+nId+'_1" value="1" disabled></td>';
		vHtml += '			<td style="text-align:center;border: 1px solid #000;vertical-align: middle;"><input type="radio" name="rubric_'+nId+'" id="rubric_'+nId+'_2" value="2" disabled></td>';
		vHtml += '			<td style="text-align:center;border: 1px solid #000;vertical-align: middle;"><input type="radio" name="rubric_'+nId+'" id="rubric_'+nId+'_3" value="3" disabled></td>';
		vHtml += '		</tr>';
	}
	vHtml += '	</tbody>';	
	vHtml += '</table>';
	$("#rubric_data").html(vHtml);
}


function click_rubric()
{
	var options = 'toolbar=no,location=no,width=1020,height=760,resizable=no,scrollbars=no,status=no';
	window.open('/test/correct/correct_speaking_rubric.do?id=' + $("#practice_result_id").val(),'correct_rubric',options);
}

function click_comment_spk()
{
	var options = 'toolbar=no,location=no,width=500,height=230,resizable=no,scrollbars=no,status=no';
	window.open('/test/correct/correct_speaking_comment_twe.do?id=' + $("#practice_result_id").val(),'correct_comment',options);
}