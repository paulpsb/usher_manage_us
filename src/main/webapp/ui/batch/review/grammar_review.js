var is_review = true;

var resultInfo;
var answerList;
var grammarList;

var grammar_type;
var grammar_num;

var currow_question_num = 0;
var max_question_count = 0;

jQuery(document).ready(function(){
	$.ajax({
		type : "POST",
		url : "/batch/review/getBatchGrammarReviewResult.do",
		data:{
			id:$("#result_id").val()
		},
		success:function(data){
			resultInfo = data.resultInfo;
			answerList = JSON.parse(data.answerInfo.result);
			grammarList = data.grammarList;
			
			max_question_count = grammarList.length;
			
			grammar_type = resultInfo.batch_grammar_type;
			grammar_num = resultInfo.batch_grammar_num;
			
			$(".subject").html(grammar_type + " "+ grammar_num);
			$("#totalCount").html(max_question_count);
			$(".time").html("SW1 : "+resultInfo.batch_grammar_score1+" / SW2 : "+resultInfo.batch_grammar_score2);
			create_review();
			
			create_question();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
});

function create_review()
{
	var vHtml = "";
	for(var i=0; i<grammarList.length; i++)
	{
		var tr_class="";
		var type = grammarList[i].type;
		var num = grammarList[i].num;
		var question_num = grammarList[i].question_num;
		
		var question = grammarList[i].question;
		question = question.replace(/(<([^>]+)>)/ig,"");
		
		var idx = answerList.findIndex(i => i.question_num == question_num);
		var answer = answerList[idx].answer;
		var useranswer = cfmNvl2(answerList[idx].useranswer,'-');
		var result = answerList[idx].result;
		if(!result){
			tr_class="not_answered";
		}
		
		vHtml += '<tr class="'+tr_class+'">';
		vHtml += '	<td align="center" style="border:1px solid #000;">'+(i+1)+'</td>';
		vHtml += '	<td style="border:1px solid #000;"><a style="text-decoration: none;" href="javascript:move_question('+i+')"  class="'+tr_class+'">'+question+'</a></td>';
		vHtml += '	<td align="center" style="border:1px solid #000;">'+answer+'</td>';
		vHtml += '	<td align="center" style="border:1px solid #000;">'+useranswer+'</td>';
		vHtml += '</tr>';
	}
	
	$("#questionList").html(vHtml);
}

function move_question(idx)
{
	currow_question_num = idx;
	create_question();
	
	is_review = false;
	$("#content").show();
	$("#review").hide();
}

function create_question()
{
	$("#qnum").html(currow_question_num+1);
	if(currow_question_num == 0){
		view_prev(false);
	}else{
		view_prev(true);
	}

	var question_num = grammarList[currow_question_num].question_num;
	
	//지문 화면으로 변경
	$.ajax({
		type : "POST",
		data:{
			type:grammar_type,
			num:grammar_num,
			question_num:question_num
		},
		url : "/popup/review/grammar_review_question.do",
		dataType : "html", //data 형식 text, html, json, xml
		success:function(data){	
			//지문 화면으로 변경
			$("#content").html(data);
			
			var idx = answerList.findIndex(i => i.question_num == question_num);
			var answer = answerList[idx].answer;
			var useranswer = answerList[idx].useranswer;

			$("#choice_"+answer).addClass("canswer");
			if(useranswer){
				$("#choice"+useranswer).prop("checked", true);
			}
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function go_help()
{
	
}


function go_prev()
{
	currow_question_num--;
	create_question();
}

function go_next()
{
	currow_question_num++;
	if(max_question_count == currow_question_num)
	{
		currow_question_num--;
	}else{
		create_question();
	}
}


function view_prev(isPrev)
{
	if(isPrev){
		$("#prevBtn").html('<a href="javascript:go_prev()"><img src="/assets/batch/img/tpo_back.png" /></a>');
	}else{
		$("#prevBtn").html('<img src="/assets/batch/img/tpo_back_no.png" />');
	}
}

function go_review()
{
	if(is_review){
		is_review = false;
		$("#content").show();
		$("#review").hide();
	}else{
		is_review = true;
		$("#content").hide();
		$("#review").show();		
	}
}