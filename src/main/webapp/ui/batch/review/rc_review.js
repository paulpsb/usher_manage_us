var is_review = true;

var is_btn_view = false;
var is_btn_help = true;
var is_btn_review = false;
var is_btn_prev = false;
var is_btn_next = false;

var is_view = false;

var resultInfo;
var answerList;
var readingList;

var answerList1;
var answerList2;
var answerList3;

var readingQuestionList1;
var readingQuestionList2;
var readingQuestionList3;


var batch_reading_type;
var batch_reading_num;

var currow_reading = 0;
var max_reading_count = 0;

var currow_reading_question = 0;
var max_reading_question = 0;

jQuery(document).ready(function(){

	$.ajax({
		type : "POST",
		url : "/batch/review/getBatchReadingReviewResult.do",
		data:{
			id:$("#result_id").val()
		},
		success:function(data){
			resultInfo = data.resultInfo;
			answerList = JSON.parse(data.answerInfo.result);
			console.log(data.answerInfo.result);
			readingList = data.readingList;
			max_reading_count = readingList.length;
			
			readingQuestionList1 = data.readingQuestionList1;
			readingQuestionList2 = data.readingQuestionList2;
			readingQuestionList3 = data.readingQuestionList3;
			answerList1 = answerList[0].answer;
			answerList2 = answerList[1].answer;
			answerList3 = answerList[2].answer;
			max_question_count = readingQuestionList1.length;
			
			batch_reading_type = resultInfo.batch_reading_type;
			batch_reading_num = resultInfo.batch_reading_num;
			
			$(".subject").html(batch_reading_type + " "+ batch_reading_num);
			$("#totalCount").html(max_question_count);
			$(".time").html(resultInfo.batch_reading_score+" / "+resultInfo.batch_reading_total_score);
			
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
	for(var i=0; i<readingList.length; i++)
	{
		var answerList;
		var readingQuestionList;
		if(i==0){
			answerList = answerList1;
			readingQuestionList = readingQuestionList1;
		}else if(i==1){
			answerList = answerList2;
			readingQuestionList = readingQuestionList2;
		}else if(i==2){
			answerList = answerList3;
			readingQuestionList = readingQuestionList3;
		}
		for(var j=0; j<readingQuestionList.length; j++)
		{
			var tr_class="";
			var question_num = readingQuestionList[j].question_num;
			var category = readingQuestionList[j].category;
			var question = readingQuestionList[j].question;
			question = question.replace(/(<([^>]+)>)/ig,"");
			var idx = answerList.findIndex(i => i.question_num == question_num);
			var answer = answerList[idx].answer;
			var answer1 = answerList[idx].answer1;
			/*
			if(answer1){
				answer += "," + answer1;
			}
			*/
			var useranswer = cfmNvl1(answerList[idx].useranswer);
			var useranswer1 = cfmNvl1(answerList[idx].useranswer1);
			/*
			if(useranswer1){
				useranswer += "," + useranswer1;
			}
			var result = answerList[idx].result;
			if(!result){
				tr_class="not_answered";
			}
			*/

			var result = true;
			if(category =="A"){
				if(answer != useranswer){
					result = false;
				}
			}else if(category =="B"){
				if(useranswer){
					var arr_useranswer = useranswer.split("|");
					var arr_answer = answer.split("|");
					if(arr_useranswer.length == arr_answer.length){
						for(var k=0; k<arr_useranswer.length; k++){
							if(arr_answer.indexOf(arr_useranswer[k]) < 0){
								result = false;
								break;
							}
						}
					}else{
						result = false;
					}
				}else{
					result = false;
				}
			}else if(category =="C"){
				if(answer != useranswer){
					result = false;
				}
			}else if(category =="D"){
				if(useranswer){
					var arr_useranswer = useranswer.split("|");
					var arr_answer = answer.split("|");
					if(arr_useranswer.length == arr_answer.length){
						for(var k=0; k<arr_useranswer.length; k++){
							if(arr_answer.indexOf(arr_useranswer[k]) < 0){
								result = false;
								break;
							}
						}
					}else{
						result = false;
					}
				}else{
					result = false;
				}
			}else if(category =="E"){
				if(useranswer){
					var arr_useranswer = useranswer.split("|");
					var arr_answer = answer.split("|");
					if(arr_useranswer.length == arr_answer.length){
						for(var k=0; k<arr_useranswer.length; k++){
							if(arr_answer.indexOf(arr_useranswer[k]) < 0){
								result = false;
								break;
							}
						}
					}else{
						result = false;
					}
				}else{
					result = false;
				}
				if(useranswer1){
					var arr_useranswer1 = useranswer1.split("|");
					var arr_answer1 = answer1.split("|");
					if(arr_useranswer1.length == arr_answer1.length){
						for(var k=0; k<arr_useranswer1.length; k++){
							if(arr_answer1.indexOf(arr_useranswer1[k]) < 0){
								result = false;
								break;
							}
						}
					}else{
						result = false;
					}
				}else{
					result = false;
				}
			}
			
			if(!result){
				tr_class="not_answered";
			}
			vHtml += '<tr class="'+tr_class+'">';
			vHtml += '	<td align="center" style="border:1px solid #000;">'+(i+1)+'-'+question_num+'</td>';
			vHtml += '	<td style="border:1px solid #000;"><a style="text-decoration: none;" href="javascript:move_question('+i+','+j+')"  class="'+tr_class+'">'+question+'</a></td>';
			vHtml += '	<td align="center" style="border:1px solid #000;">'+answer+'</td>';
			vHtml += '	<td align="center" style="border:1px solid #000;">'+useranswer+'</td>';
			vHtml += '</tr>';
			
		}
	}
	
	$("#questionList").html(vHtml);	
}

function move_question(idx1, idx2)
{
	currow_reading = idx1;
	currow_reading_question = idx2;
	
	is_review = false;
	$("#content").show();
	$("#review").hide();
	$("#view").hide();
	
	create_question();
}
function create_question()
{
	var answerList;
	var readingQuestionList;
	
	if(currow_reading==0){
		answerList = answerList1;
		readingQuestionList = readingQuestionList1;
	}else if(currow_reading==1){
		answerList = answerList2;
		readingQuestionList = readingQuestionList2;
	}else if(currow_reading==2){
		answerList = answerList3;
		readingQuestionList = readingQuestionList3;
	}	
	
	$("#qtxt").html("Question");
	$("#qnum").html(currow_reading_question+1);
	$("#totalCount").html(readingQuestionList.length);
	
	is_btn_review = true;
	if(currow_reading > 0 || currow_reading_question > 0){
		is_btn_prev = true;
	}else{
		is_btn_prev = false;
	}
	
	if(readingQuestionList[currow_reading_question].category == "D" || readingQuestionList[currow_reading_question].category == "E"){
		is_btn_view = true;
	}else{
		is_btn_view = false;
	}
	is_btn_next = true;
	change_head_button();
	
	$.ajax({
		type : "POST",
		url : "/batch/review/rc_review_question.do",
		data:{
			type:readingList[currow_reading].type,
			num:readingList[currow_reading].num,
			sub_num:readingList[currow_reading].sub_num,
			question_num:readingQuestionList[currow_reading_question].question_num
		},
		dataType : "html", //data 형식 text, html, json, xml
		success:function(data){	
			$("#content").html(data);

			var category = readingQuestionList[currow_reading_question].category;
			var question_num = readingQuestionList[currow_reading_question].question_num;
			var idx = answerList.findIndex(i => i.question_num == question_num);
			var answer = answerList[idx].answer;
			var answer1 = answerList[idx].answer1;
			var useranswer = answerList[idx].useranswer;
			var useranswer1 = answerList[idx].useranswer1;
			
			if(category == "A"){
				$("#choice_"+answer).addClass("canswer");
				if(useranswer){
					$("#choice"+useranswer).prop("checked", true);
				}
			}else if(category == "B"){
				var arr_answer = answer.split("|");
				var arr_useranswer = useranswer.split("|");
				for(var i=0; i<arr_answer.length;i++){
					$("#choice_"+arr_answer[i]).addClass("canswer");
				}
				for(var i=0; i<arr_useranswer.length;i++){
					$("#choice"+arr_useranswer[i]).prop("checked", true);
				}
			}else if(category == "C"){
				$('#answer').val(answer);
				var selected='SQ'+answer;
				var code=["SQA","SQB","SQC","SQD"];
				for(i=0; i < 4; i++) {
					if(code[i]!= selected) {
						$('#'+code[i]).text("■");
						$('#'+code[i]).css('background-color','');
					} else {
						$('#'+code[i]).html($("#inserted_value").html());
						$('#'+code[i]).css('background-color','#CCC');
						$('#'+code[i]).css('font-weight','bold');
					}
					
				}
				$('#SQ'+useranswer).addClass('canswer');
			}else if(category == "D"){
				var arr_answer = answer.split("|");
				var arr_useranswer = useranswer.split("|");
				for(var i=0; i<arr_answer.length;i++){
					$("#"+arr_answer[i]).addClass("canswer");
				}
				for(var i=0; i<arr_useranswer.length;i++){
					var v_id = "d"+(i+1);
					
					$("#"+v_id).html($("#"+arr_useranswer[i]).html());
				}
			}else if(category == "E"){
				var arr_answer = answer.split("|");
				var arr_answer1 = answer1.split("|");
				for(var i=0; i<arr_answer.length;i++){
					$("#"+arr_answer[i]).addClass("canswer");
				}
				for(var i=0; i<arr_answer1.length;i++){
					$("#"+arr_answer1[i]).addClass("canswer");
				}
			}
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function change_head_button()
{
	if(is_btn_view)
	{
		$("#viewBtn").html('<a href="javascript:go_view()"><img src="/assets/batch/img/view_text.png" /></a>');
	}else{
		$("#viewBtn").html('<img src="/assets/batch/img/view_text_no.png" />');
	}
	if(is_btn_help)
	{
		$("#helpBtn").html('<a href="javascript:go_help()"><img src="/assets/batch/img/tpo_help.png" /></a>');
	}else{
		$("#helpBtn").html('<img src="/assets/batch/img/tpo_help_no.png" />');
	}

	if(is_btn_review)
	{
		$("#reviewBtn").html('<a href="javascript:go_review()"><img src="/assets/batch/img/tpo_review.png" /></a>');
	}else{
		$("#reviewBtn").html('<img src="/assets/batch/img/tpo_review_no.png" />');
	}
	
	if(is_btn_prev)
	{
		$("#prevBtn").html('<a href="javascript:go_prev()"><img src="/assets/batch/img/tpo_back.png" /></a>');
	}else{
		$("#prevBtn").html('<img src="/assets/batch/img/tpo_back_no.png" />');
	}
	
	if(is_btn_next)
	{
		$("#nextBtn").html('<a href="javascript:go_next()"><img src="/assets/batch/img/tpo_next.png" /></a>');
	}else{
		$("#nextBtn").html('<img src="/assets/batch/img/tpo_next_no.png" /></a>');
	}
}

function go_prev(){
	if(currow_reading_question == 0)
	{
		currow_reading--;
		if(currow_reading==0){
			currow_reading_question = readingQuestionList1.length-1;
		}else if(currow_reading==1){
			currow_reading_question = readingQuestionList2.length-1;
		}else if(currow_reading==2){
			currow_reading_question = readingQuestionList3.length-1;
		}
		
	}else{
		currow_reading_question--;
	}
	create_question();
}

function go_next(){
	currow_reading_question++;
	var current_cnt;
	if(currow_reading==0){
		current_cnt = readingQuestionList1.length;
	}else if(currow_reading==1){
		current_cnt = readingQuestionList2.length;
	}else if(currow_reading==2){
		current_cnt = readingQuestionList3.length;
	}
	if(currow_reading_question == current_cnt)
	{
		currow_reading++;
		currow_reading_question = 0;
		
		if(currow_reading == max_reading_count){
			alert("마지막 문제입니다.");
			currow_reading--;
			currow_reading_question = readingQuestionList3.length-1;
		}
	}

	create_question();
}
function go_review(){
	if(is_review){
		is_review = false;
		$("#content").show();
		$("#review").hide();
		$("#view").hide();
	}else{
		is_review = true;
		$("#content").hide();
		$("#review").show();	
		$("#view").hide();

	}	
}

function go_view(){
	if(is_view){
		is_view = false;
		$("#content").show();
		$("#review").hide();
		$("#view").hide();
	}else{
		is_view = true;
		//문제를 조회해온다.
		$.ajax({
			type : "POST",
			url : "/batch/review/rc_review_passage.do",
			data:{
				type:readingList[currow_reading].type,
				num:readingList[currow_reading].num,
				sub_num:readingList[currow_reading].sub_num
			},
			dataType : "html", //data 형식 text, html, json, xml
			success:function(data){	
				$("#view").html(data);
				$("#content").hide();
				$("#review").hide();	
				$("#view").show();
			},
			error:function(event){				
				alert("잠시후 다시 시도 바랍니다.");
			}
		});	
	}	

}