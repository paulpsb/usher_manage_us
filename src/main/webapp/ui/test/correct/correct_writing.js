var independent_rubric = [
	["Grammar<br>(문법)","글을 문법에 맞게 썼는지를 판단합니다.<br>정확하면 good, 약간의 오류가 있으면 fair, 오류가 많으면 limited를 받습니다."],
	["Word Choice<br>(어휘선택)","상황에 맞는 정확한 단어가 구사되었는지를 판단합니다.<br>아주 정확하면 good, 대략 어울리면 fair, 약간 벗어나면 limited를 받습니다."],
	["Syntactic Variety<br>(표현의 다양성)","같은 표현을 반복하지 않고, 다양한 어휘를 구사했는지를 판단합니다.<br>다양하면 good, 비교적 단조로우면 fair, 계속 반복되면 limited를 받습니다."],
	["Idiomaticity<br>(관용표현 활용)","사전적 의미를 담고 있는 단어들 이외의 표현들을 썼는지를 판단합니다.<br>빈도가 높으면 good, 빈도가 낮으면 fair, 없을 경우는 limited를 받습니다."],
	["Sentence Structure<br>(문장구조)","효율적 표현을 위해 안정된 구조의 문장을 구사했는지를 판단합니다.<br>구조가 세련되면 good, 보통인 경우 fair, 너무 단조롭거나 이해가 어려우면 limited를 받습니다."],
	["Flow<br>(문맥의 흐름)","문장들간의 비약이 심하거나 처짐 또는 반복이 없는지를 판단합니다.<br>문제가 없으면 good, 보통인 경우 fair, 어색한 경우는 limited를 받습니다."],
	["Explanation<br>(설명)","Thesis나 topic sentences같은 main idea들을 얼마나 이해하기 쉽게 썼는지를 판단합니다.<br>그런 경우 good, 보통인 경우 fair, 아닌 경우는 limited를 받습니다."],
	["Exemplification<br>(예시)","Topic sentences와 관련된 example을 얼마나 설득력있게 풀어냈는지를 판단합니다.<br>그런 경우 good, 보통인 경우 fair, 아닌 경우는 limited를 받습니다."],
	["Coherence<br>(일관성)","글이 주제에 맞게 전개됐는지, main idea들간의 연결이 잘 되었는지를 판단합니다.<br>그런 경우 good, 보통인 경우 fair, 아닌 경우는 limited를 받습니다."],
	["Overall Organization<br>(전반적 구성)","서론, 본론, 결론 등 글 전체의 구조와 main idea들이 잘 어우러져 있는지를 판단합니다.<br>그런 경우 good, 보통인 경우 fair, 아닌 경우는 limited를 받습니다."]
];

var integrated_rubric = [
	["Overall",""],
	["Reading #1","Paraphrasing"],
	["Listening #1","Quality of Writing"],
	["","Completeness & Accuracy of Content"],
	["Reading #2","Paraphrasing"],
	["Listening #2","Quality of Writing"],
	["","Completeness & Accuracy of Content"],
	["Reading #3","Paraphrasing"],
	["Listening #3","Quality of Writing"],
	["","Completeness & Accuracy of Content"],
];
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
		url : "/test/correct/getWritingTestResult.do",
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
			
			$("#writing_question").html("<b>Question : </b>"+data.answerInfo.answer);
			$("#reg_date").html("<b>작성일 : </b>"+data.resultInfo.created);
			$("#writing_exam_time").html("<b>남은제한시간 : </b>"+min+":"+sec);
			$("#writing_answer").html(data.userAnswerInfo.answer.replace(/\n/g, '<br/>'));
			
			var vHtml = "";
			if(data.userAnswerInfo.result){
				$("#writing_user_date").html('<b>개인 첨삭 작성 일시 : </b>'+data.userAnswerInfo.modified);
				$("#writing_user_data").html(data.userAnswerInfo.result.replace(/\n/g, '<br/>'));
			}else{
				$("#writing_user_data").html('<b>개인 첨삭이 등록되어있지 않습니다.</b>');
			}
			
			
			vHtml = "";
			if(data.commentInfo){
				$("#writing_comment_date").html('<b>첨삭 작성 일시 : </b>'+data.commentInfo.modified);
				$("#writing_comment_writer").html('<b>첨삭자 : </b>'+data.commentInfo.comment_name);
				$("#writing_comment_data").html(data.commentInfo.comment.replace(/\n/g, '<br/>'));
			}else{
				$("#writing_comment_data").html('<b>첨삭이 등록되어있지 않습니다.</b>');
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
				
				if(data.resultInfo.book == "independent"){
					create_independent_rubric();
				}else{
					create_integrated_rubric();
				}
				
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
			if(data.noteInfo){
				$("#writing_note_date").html('<b>오답노트 작성 일시 : </b>'+data.noteInfo.modified);
				vHtml += "<p style='font-size:18px;'><b>나의 깨달음</b></p>";
				vHtml += data.noteInfo.note_comment.replace(/\n/g, '<br/>');
				vHtml += "<p style='font-size:18px;'><b>나의 정리</b></p>";
				vHtml += data.noteInfo.arrange_comment.replace(/\n/g, '<br/>');
				$("#writing_note_data").html(vHtml);
			}else{
				$("#writing_note_data").html('<b>오답노트가 등록되어있지 않습니다.</b>');
			}
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function create_independent_rubric()
{
	var vHtml = "";
	
	vHtml += '<table class="table table-bordered">';
	vHtml += '	<thead class="thead-light">';
	vHtml += '		<tr>';
	vHtml += '			<th style="text-align:center;border: 1px solid #000;vertical-align: middle;">Expression</th>';
	vHtml += '			<th style="text-align:center;border: 1px solid #000;vertical-align: middle;">&nbsp;</th>';
	vHtml += '			<th style="text-align:center;border: 1px solid #000;vertical-align: middle;">Weak</th>';
	vHtml += '			<th style="text-align:center;border: 1px solid #000;vertical-align: middle;">Limited</th>';
	vHtml += '			<th style="text-align:center;border: 1px solid #000;vertical-align: middle;">Fair</th>';
	vHtml += '			<th style="text-align:center;border: 1px solid #000;vertical-align: middle;">Good</th>';
	vHtml += '		</tr>';
	vHtml += '	</thead>';
	vHtml += '	<body>';
	for(var i=0; i<6; i++)
	{
		var nId = ""+(i+1);
		
		if(i < 9) nId = "0"+(i+1);
		
		vHtml += '		<tr>';
		vHtml += '			<td style="text-align:center;border: 1px solid #000;vertical-align: middle;">'+independent_rubric[i][0]+'</td>';
		vHtml += '			<td style="border: 1px solid #000;vertical-align: middle;">'+independent_rubric[i][1]+'</td>';
		vHtml += '			<td style="text-align:center;border: 1px solid #000;vertical-align: middle;"><input type="radio" name="rubric_'+nId+'" id="rubric_'+nId+'_0" value="0" disabled></td>';
		vHtml += '			<td style="text-align:center;border: 1px solid #000;vertical-align: middle;"><input type="radio" name="rubric_'+nId+'" id="rubric_'+nId+'_1" value="1" disabled></td>';
		vHtml += '			<td style="text-align:center;border: 1px solid #000;vertical-align: middle;"><input type="radio" name="rubric_'+nId+'" id="rubric_'+nId+'_2" value="2" disabled></td>';
		vHtml += '			<td style="text-align:center;border: 1px solid #000;vertical-align: middle;"><input type="radio" name="rubric_'+nId+'" id="rubric_'+nId+'_3" value="3" disabled></td>';
		vHtml += '		</tr>';
	}
	vHtml += '	</body>';
	vHtml += '	<thead class="thead-light">';
	vHtml += '		<tr>';
	vHtml += '			<th style="text-align:center;border: 1px solid #000;vertical-align: middle;">Content</th>';
	vHtml += '			<th style="text-align:center;border: 1px solid #000;vertical-align: middle;">&nbsp;</th>';
	vHtml += '			<th style="text-align:center;border: 1px solid #000;vertical-align: middle;">0</th>';
	vHtml += '			<th style="text-align:center;border: 1px solid #000;vertical-align: middle;">1</th>';
	vHtml += '			<th style="text-align:center;border: 1px solid #000;vertical-align: middle;">2</th>';
	vHtml += '			<th style="text-align:center;border: 1px solid #000;vertical-align: middle;">3</th>';
	vHtml += '		</tr>';
	vHtml += '	</thead>';
	vHtml += '	<body>';
	for(var i=6; i<10; i++)
	{
		var nId = ""+(i+1);
		
		if(i < 9) nId = "0"+(i+1);
		
		vHtml += '		<tr>';
		vHtml += '			<td style="text-align:center;border: 1px solid #000;vertical-align: middle;">'+independent_rubric[i][0]+'</td>';
		vHtml += '			<td style="border: 1px solid #000;vertical-align: middle;">'+independent_rubric[i][1]+'</td>';
		vHtml += '			<td style="text-align:center;border: 1px solid #000;vertical-align: middle;"><input type="radio" name="rubric_'+nId+'" id="rubric_'+nId+'_0" value="0" disabled></td>';
		vHtml += '			<td style="text-align:center;border: 1px solid #000;vertical-align: middle;"><input type="radio" name="rubric_'+nId+'" id="rubric_'+nId+'_1" value="1" disabled></td>';
		vHtml += '			<td style="text-align:center;border: 1px solid #000;vertical-align: middle;"><input type="radio" name="rubric_'+nId+'" id="rubric_'+nId+'_2" value="2" disabled></td>';
		vHtml += '			<td style="text-align:center;border: 1px solid #000;vertical-align: middle;"><input type="radio" name="rubric_'+nId+'" id="rubric_'+nId+'_3" value="3" disabled></td>';
		vHtml += '		</tr>';
	}
	vHtml += '	</body>';
	vHtml += '</table>';
	$("#rubric_data").html(vHtml);
}

function create_integrated_rubric()
{
	var vHtml = "";
	
	vHtml += '<table class="table table-bordered">';
	vHtml += '	<thead class="thead-light">';
	vHtml += '		<tr>';
	vHtml += '			<th style="text-align:center;border: 1px solid #000;vertical-align: middle;">Introduction</th>';
	vHtml += '			<th style="text-align:center;border: 1px solid #000;vertical-align: middle;">&nbsp;</th>';
	vHtml += '			<th style="text-align:center;border: 1px solid #000;vertical-align: middle;">Weak</th>';
	vHtml += '			<th style="text-align:center;border: 1px solid #000;vertical-align: middle;">Limited</th>';
	vHtml += '			<th style="text-align:center;border: 1px solid #000;vertical-align: middle;">Fair</th>';
	vHtml += '			<th style="text-align:center;border: 1px solid #000;vertical-align: middle;">Good</th>';
	vHtml += '		</tr>';
	vHtml += '	</thead>';
	vHtml += '	<body>';
	for(var i=0; i<1; i++)
	{
		var nId = ""+(i+1);
		
		if(i < 9) nId = "0"+(i+1);
		
		vHtml += '		<tr>';
		vHtml += '			<td style="text-align:center;border: 1px solid #000;vertical-align: middle;">'+integrated_rubric[i][0]+'</td>';
		vHtml += '			<td style="border: 1px solid #000;vertical-align: middle;">'+integrated_rubric[i][1]+'</td>';
		vHtml += '			<td style="text-align:center;border: 1px solid #000;vertical-align: middle;"><input type="radio" name="rubric_'+nId+'" id="rubric_'+nId+'_0" value="0" disabled></td>';
		vHtml += '			<td style="text-align:center;border: 1px solid #000;vertical-align: middle;"><input type="radio" name="rubric_'+nId+'" id="rubric_'+nId+'_1" value="1" disabled></td>';
		vHtml += '			<td style="text-align:center;border: 1px solid #000;vertical-align: middle;"><input type="radio" name="rubric_'+nId+'" id="rubric_'+nId+'_2" value="2" disabled></td>';
		vHtml += '			<td style="text-align:center;border: 1px solid #000;vertical-align: middle;"><input type="radio" name="rubric_'+nId+'" id="rubric_'+nId+'_3" value="3" disabled></td>';
		vHtml += '		</tr>';
	}
	vHtml += '	</body>';
	vHtml += '	<thead class="thead-light">';
	vHtml += '		<tr>';
	vHtml += '			<th style="text-align:center;border: 1px solid #000;vertical-align: middle;">Paragraphs</th>';
	vHtml += '			<th style="text-align:center;border: 1px solid #000;vertical-align: middle;">&nbsp;</th>';
	vHtml += '			<th style="text-align:center;border: 1px solid #000;vertical-align: middle;">0</th>';
	vHtml += '			<th style="text-align:center;border: 1px solid #000;vertical-align: middle;">1</th>';
	vHtml += '			<th style="text-align:center;border: 1px solid #000;vertical-align: middle;">2</th>';
	vHtml += '			<th style="text-align:center;border: 1px solid #000;vertical-align: middle;">3</th>';
	vHtml += '		</tr>';
	vHtml += '	</thead>';
	vHtml += '	<body>';
	for(var i=1; i<10; i++)
	{
		var nId = ""+(i+1);
		
		if(i < 9) nId = "0"+(i+1);
		
		vHtml += '		<tr>';
		vHtml += '			<td style="text-align:center;border: 1px solid #000;vertical-align: middle;">'+integrated_rubric[i][0]+'</td>';
		vHtml += '			<td style="border: 1px solid #000;vertical-align: middle;">'+integrated_rubric[i][1]+'</td>';
		vHtml += '			<td style="text-align:center;border: 1px solid #000;vertical-align: middle;"><input type="radio" name="rubric_'+nId+'" id="rubric_'+nId+'_0" value="0" disabled></td>';
		vHtml += '			<td style="text-align:center;border: 1px solid #000;vertical-align: middle;"><input type="radio" name="rubric_'+nId+'" id="rubric_'+nId+'_1" value="1" disabled></td>';
		vHtml += '			<td style="text-align:center;border: 1px solid #000;vertical-align: middle;"><input type="radio" name="rubric_'+nId+'" id="rubric_'+nId+'_2" value="2" disabled></td>';
		vHtml += '			<td style="text-align:center;border: 1px solid #000;vertical-align: middle;"><input type="radio" name="rubric_'+nId+'" id="rubric_'+nId+'_3" value="3" disabled></td>';
		vHtml += '		</tr>';
	}
	vHtml += '	</body>';
	vHtml += '</table>';
	$("#rubric_data").html(vHtml);
}

function click_rubric()
{
	var options = 'toolbar=no,location=no,width=1020,height=760,resizable=no,scrollbars=no,status=no';
	window.open('/test/correct/correct_writing_rubric.do?id=' + $("#practice_result_id").val(),'correct_rubric',options);
}

function click_comment_twe()
{
	var options = 'toolbar=no,location=no,width=800,height=550,resizable=no,scrollbars=no,status=no';
	window.open('/test/correct/correct_writing_comment_twe.do?id=' + $("#practice_result_id").val(),'correct_comment',options);
}