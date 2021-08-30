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
var rubric_score01 = 0;
var rubric_score02 = 0;
var rubric_score03 = 0;
var rubric_score04 = 0;
var rubric_score05 = 0;
var rubric_score06 = 0;
var rubric_score07 = 0;
var rubric_score08 = 0;
var rubric_score09 = 0;
var rubric_score10 = 0;

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
		url : "/test/correct/getSpeakingTestRubric.do",
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
			$("#speaking_answer").html(data.userAnswerInfo.answer.replace(/\n/g, '<br/>'));
			
			var vHtml = "";
			if(data.userAnswerInfo.result){
				vHtml += '<p style="margin:0;padding:0;width:100%;padding:10px;background:#a52626;color:#ffffff;">개인 첨삭 작성 일시 : '+data.userAnswerInfo.modified+'</p>';
				vHtml += '<div style="margin-top:20px;padding:30px;margin-bottom:20px;">'+data.userAnswerInfo.result.replace(/\n/g, '<br/>')+'</div>';
			}else{
				vHtml += '<p style="margin:0;padding:0;width:100%;padding:10px;background:#a52626;color:#ffffff;">개인 첨삭</p>';
				vHtml += '<p style="margin-top:20px;padding:30px;text-align:center"><b>개인 첨삭이 등록되어있지 않습니다.</b></p>';
			}
			$("#speaking_user_result").html(vHtml);
			
			if(data.rubricInfo){
				$("#rubric_date").html('작성 일시 : '+data.rubricInfo.modified);
				$("#rubric_writer").html('Rubric 채점자 : '+data.rubricInfo.rubric_name);
				
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
				
			}
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
		vHtml += '			<td style="text-align:center;border: 1px solid #000;vertical-align: middle;"><input type="radio" name="rubric_'+nId+'" id="rubric_'+nId+'_0" value="0"></td>';
		vHtml += '			<td style="text-align:center;border: 1px solid #000;vertical-align: middle;"><input type="radio" name="rubric_'+nId+'" id="rubric_'+nId+'_1" value="1"></td>';
		vHtml += '			<td style="text-align:center;border: 1px solid #000;vertical-align: middle;"><input type="radio" name="rubric_'+nId+'" id="rubric_'+nId+'_2" value="2"></td>';
		vHtml += '			<td style="text-align:center;border: 1px solid #000;vertical-align: middle;"><input type="radio" name="rubric_'+nId+'" id="rubric_'+nId+'_3" value="3"></td>';
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
		vHtml += '			<td style="text-align:center;border: 1px solid #000;vertical-align: middle;"><input type="radio" name="rubric_'+nId+'" id="rubric_'+nId+'_0" value="0"></td>';
		vHtml += '			<td style="text-align:center;border: 1px solid #000;vertical-align: middle;"><input type="radio" name="rubric_'+nId+'" id="rubric_'+nId+'_1" value="1"></td>';
		vHtml += '			<td style="text-align:center;border: 1px solid #000;vertical-align: middle;"><input type="radio" name="rubric_'+nId+'" id="rubric_'+nId+'_2" value="2"></td>';
		vHtml += '			<td style="text-align:center;border: 1px solid #000;vertical-align: middle;"><input type="radio" name="rubric_'+nId+'" id="rubric_'+nId+'_3" value="3"></td>';
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
		vHtml += '			<td style="text-align:center;border: 1px solid #000;vertical-align: middle;"><input type="radio" name="rubric_'+nId+'" id="rubric_'+nId+'_0" value="0"></td>';
		vHtml += '			<td style="text-align:center;border: 1px solid #000;vertical-align: middle;"><input type="radio" name="rubric_'+nId+'" id="rubric_'+nId+'_1" value="1"></td>';
		vHtml += '			<td style="text-align:center;border: 1px solid #000;vertical-align: middle;"><input type="radio" name="rubric_'+nId+'" id="rubric_'+nId+'_2" value="2"></td>';
		vHtml += '			<td style="text-align:center;border: 1px solid #000;vertical-align: middle;"><input type="radio" name="rubric_'+nId+'" id="rubric_'+nId+'_3" value="3"></td>';
		vHtml += '		</tr>';
	}
	vHtml += '	</tbody>';	
	vHtml += '</table>';
	$("#rubric_data").html(vHtml);
}

function save_rubric()
{
	rubric_score01 = parseInt($('input[name="rubric_01"]:checked').val());
	rubric_score02 = parseInt($('input[name="rubric_02"]:checked').val());
	rubric_score03 = parseInt($('input[name="rubric_03"]:checked').val());
	rubric_score04 = parseInt($('input[name="rubric_04"]:checked').val());
	rubric_score05 = parseInt($('input[name="rubric_05"]:checked').val());
	rubric_score06 = parseInt($('input[name="rubric_06"]:checked').val());
	rubric_score07 = parseInt($('input[name="rubric_07"]:checked').val());
	rubric_score08 = parseInt($('input[name="rubric_08"]:checked').val());
	rubric_score09 = parseInt($('input[name="rubric_09"]:checked').val());
	rubric_score10 = parseInt($('input[name="rubric_10"]:checked').val());
	
	var rubric_total_score = rubric_score01 + rubric_score02 + rubric_score03 + rubric_score04 + rubric_score05 + rubric_score06 + rubric_score07 + rubric_score08 + rubric_score09 + rubric_score10;
	$.ajax({
		type : "POST",
		url : "/test/correct/saveSpeakingTestRubric.do",
		data:{
			practice_result_id:$("#practice_result_id").val(),
			rubric_score01:rubric_score01,
			rubric_score02:rubric_score02,
			rubric_score03:rubric_score03,
			rubric_score04:rubric_score04,
			rubric_score05:rubric_score05,
			rubric_score06:rubric_score06,
			rubric_score07:rubric_score07,
			rubric_score08:rubric_score08,
			rubric_score09:rubric_score09,
			rubric_score10:rubric_score10,
			rubric_total_score:rubric_total_score,
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