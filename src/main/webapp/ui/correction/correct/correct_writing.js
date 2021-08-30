var resultInfo;
var ruburiInfo;
var penInfo;
var noteInfo;
var commentList;

var examRuburicInfo;
var appealList;

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
		url : "/correction/correct/getWritingResult.do",
		data:{
			id:$("#correction_exams_answer_id").val()
		},
		success:function(data){	
			resultInfo = data.resultInfo;
			ruburiInfo = data.ruburiInfo;;
			penInfo    = data.penInfo;;
			noteInfo   = data.noteInfo;
			commentList = data.commentList;
			appealList  = data.appealList;
			
			examRuburicInfo = data.examRuburicInfo;
			if(resultInfo.legacy_id > 0)
			{
				$("#btn_script").hide();
				$("#btn_rubric").hide();
				$("#btn_comment_twe").hide();
			}else{
				$("#btn_script").show();
				if(resultInfo.status == "REQUEST" || resultInfo.status == "COMPLETE"){
					$("#btn_rubric").show();
					$("#btn_comment_twe").show();
				}else{
					$("#btn_rubric").hide();
					$("#btn_comment_twe").hide();
				}
			}
			
			
			var remain_time = resultInfo.exam_time;
			
			var min;
			var sec;
			
			min = Math.floor( remain_time / 60 );
			sec = remain_time - (min*60);
			
			if(min < 10) min = "0" + min;
			if(sec < 10) sec = "0" + sec;
			
			$("#writing_question").html("<b>Question : </b>"+resultInfo.question);
			$("#reg_date").html("<b>작성일 : </b>"+resultInfo.date);
			$("#writing_exam_time").html("<b>남은제한시간 : </b>"+min+":"+sec);
			$("#writing_answer").html(resultInfo.answer.replace(/\n/g, '<br/>'));
			
			var vHtml = "";
			if(resultInfo.answer_student_pen_yn == "Y"){
				$("#writing_user_date").html('<b>개인 첨삭 작성 일시 : </b>'+resultInfo.answer_pen_date);
				$("#writing_user_data").html(resultInfo.answer_pen.replace(/\n/g, '<br/>'));
				
			}else{
				$("#writing_user_data").html('<b>개인 첨삭을 등록해주세요.</b>');
			}
			
			if(resultInfo.answer_rublic_yn == "Y"){
				$("#rubric_date").html('<b>작성 일시 : </b>'+ruburiInfo.modified);
				$("#rubric_writer").html('<b>Rubric 채점자 : </b>'+ruburiInfo.rubric_name);
				$("#rubric_score").html('<b>Evaluation : </b>'+ruburiInfo.rubric_total_score);
				create_rubric();
				var rubric_score01 = ruburiInfo.rubric_score01;
				var rubric_score02 = ruburiInfo.rubric_score02;
				var rubric_score03 = ruburiInfo.rubric_score03;
				var rubric_score04 = ruburiInfo.rubric_score04;
				var rubric_score05 = ruburiInfo.rubric_score05;
				var rubric_score06 = ruburiInfo.rubric_score06;
				var rubric_score07 = ruburiInfo.rubric_score07;
				var rubric_score08 = ruburiInfo.rubric_score08;
				var rubric_score09 = ruburiInfo.rubric_score09;
				var rubric_score10 = ruburiInfo.rubric_score10;
				
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
			if(resultInfo.answer_correct_pen_yn == "Y"){
				$("#writing_comment_date").html('<b>첨삭 작성 일시 : </b>'+penInfo.modified);
				$("#writing_comment_writer").html('<b>첨삭자 : </b>'+penInfo.pen_name);
				$("#writing_comment_data").html(penInfo.pen_comment.replace(/\n/g, '<br/>'));
				if(penInfo.pen_comment_review){
					$("#writing_pen_comment_title").show();
					$("#writing_pen_comment_data").show();
					$("#writing_pen_comment_data").html(penInfo.pen_comment_review.replace(/\n/g, '<br/>'));
				}
			}else{
				$("#writing_comment_data").html('<b>첨삭이 등록되어있지 않습니다.</b>');
			}
			
			if(resultInfo.answer_rublic_yn == "Y" && resultInfo.answer_correct_pen_yn == "Y"){
				vHtml = "";
				vHtml += '<div class="container" style="width:1019px;padding:0px;border:1px solid #e7e2e2;color:#000000;margin-bottom:20px;">';
				vHtml += '	<p style="margin:0;padding:0;width:100%;padding:10px;background:#a52626;color:#ffffff;"><b>첨삭 만족도 조사 / 이의제기</b></p>';
				
				if(resultInfo.answer_review_yn == "Y"){
					var v_answer_review_score = resultInfo.answer_review_score;
					var disabled = "disabled";
					
					vHtml += '	<div style="margin:25px;">';
					vHtml += '		<div class="startRadio">';
					for(var s=1; s<=5; s++)
					{
						var checked = "";
						if(s==v_answer_review_score) checked = "checked";
						vHtml += '<label class="startRadio__box">';
						vHtml += '	<input type="radio" name="answer_review_score" id="answer_review_score_'+s+'" value="'+s+'" '+checked+' '+disabled+'>';
						vHtml += '	<span class="startRadio__img"><span class="blind">별 '+s+'개</span></span>';
						vHtml += '</label>';
					}
					vHtml += '		</div>';
					if(resultInfo.answer_review_yn != "Y"){
						vHtml += '		<button class="btn btn-primary" onclick="do_review()" style="height:40px;margin-left:15px;">첨삭 만족도 주기</button>';
					}
					vHtml += '	</div>';
					
				}
				
				for(var a=0; a<appealList.length; a++)
				{
					vHtml += "<p style='font-size:18px;padding:0px 30px;'><b>이의신청 질문</b></p>";
					vHtml += '<div style="padding:0px 30px;">'+appealList[a].appeal_comment+'</div>';
					if(appealList[a].appeal_answer_yn == "Y"){
						vHtml += "<p style='font-size:18px;padding:0px 30px;'><b>이의신청 답변</b></p>";
						vHtml += "<p style='padding:0px 30px;'>";
						vHtml += '<div style="padding:0px 30px;">'+appealList[a].appeal_answer+'</div>';
						vHtml += '</p>';
						vHtml += "<p style='font-size:18px;padding:0px 30px;'><b>이의신청 커멘트</b></p>";
						vHtml += '<div style="padding:0px 30px;">'+appealList[a].appeal_answer_comment+'</div>';
						
					}else{
						vHtml += '	<p style="font-size:18px;padding:0px 30px;padding-top:30px;text-align:right;">';
						vHtml += '		<button class="btn btn-primary" onclick="open_user_appeal('+appealList[a].id+')" style="height:40px;margin-left:15px;">이의 신청 답변 달기</button>';
						vHtml += '	</p>';
					}
				}
				
				vHtml += '</div>';
				$("#div_review").html(vHtml);
			}
			
			if(commentList.length > 0){
				vHtml = "";
				for(var i=0; i<commentList.length; i++)
				{
					vHtml += '<div class="container" style="width:1019px;padding:0px;text-align:right;">';
					vHtml += '	<button class="btn btn-primary" onclick="open_comment('+commentList[i].id+')" style="margin-bottom:10px;">답변하기</button>';
					vHtml += '</div>';
					vHtml += '<div class="container" style="width:1019px;padding:0px;background:#e7e2e2;color:#000000;margin-bottom:20px;">';
					vHtml += '	<p style="margin:0;padding:0;width:100%;padding:10px;background:#a52626;color:#ffffff;"><b>질문과 답변</b></p>';
					vHtml += '	<p style="font-size:18px;padding:0px 30px;padding-top:30px;"><b>질문</b></p>';
					vHtml += '	<p style="padding:0px 30px;text-align:right"><b>작성일 : </b>'+commentList[i].date+'</p>';
					vHtml += '	<div style="padding:0px 30px;padding-bottom:30px;">'+commentList[i].question+'</div>';
					if(commentList[i].comment_yn == "Y")
					{
						vHtml += '	<p style="font-size:18px;padding:0px 30px;"><b>답변</b></p>';
						vHtml += '	<p style="padding:0px 30px;text-align:right"><b>작성자 : </b>'+commentList[i].comment_name+' / <b>작성일 : </b>'+commentList[i].comment_date+'</p>';
						vHtml += '	<div style="padding:0px 30px;">'+commentList[i].comment+'</div>';
						vHtml += '	<p style="padding:0px 30px;padding-bottom:30px;"></p>';
					}
					vHtml += '</div>';
				}
				$("#div_comment").html(vHtml);
			}
			
			vHtml = "";
			if(resultInfo.answer_student_note_yn == "Y"){
				$("#writing_note_date").html('<b>오답노트 작성 일시 : </b>'+noteInfo.modified);
				vHtml += "<p style='font-size:18px;'><b>나의 깨달음</b></p>";
				vHtml += noteInfo.note_comment.replace(/\n/g, '<br/>');
				vHtml += "<p style='font-size:18px;'><b>나의 정리</b></p>";
				vHtml += noteInfo.arrange_comment.replace(/\n/g, '<br/>');
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

function create_rubric()
{
	var vHtml = "";
	
	vHtml += '<table class="table table-bordered">';
	for(var i=0; i<examRuburicInfo.length; i++)
	{
		var ruburic_num = examRuburicInfo[i].ruburic_num;
		var ruburic_category_title = examRuburicInfo[i].ruburic_category_title;
		var ruburic_category_sub   = examRuburicInfo[i].ruburic_category_sub;
		var ruburic_content_title  = examRuburicInfo[i].ruburic_content_title;
		var ruburic_content_sub    = examRuburicInfo[i].ruburic_content_sub;
		var ruburic_num = examRuburicInfo[i].ruburic_num;
		if(i==0 || (ruburic_category_title != examRuburicInfo[i-1].ruburic_category_title || ruburic_category_sub != examRuburicInfo[i-1].ruburic_category_sub)){
			vHtml += '	<thead class="thead-light">';
			vHtml += '		<tr>';
			vHtml += '			<th style="text-align:center;border: 1px solid #000;vertical-align: middle;">'+ruburic_category_title+'</th>';
			vHtml += '			<th style="text-align:center;border: 1px solid #000;vertical-align: middle;">'+ruburic_category_sub+'</th>';
			vHtml += '			<th style="text-align:center;border: 1px solid #000;vertical-align: middle;">Weak</th>';
			vHtml += '			<th style="text-align:center;border: 1px solid #000;vertical-align: middle;">Limited</th>';
			vHtml += '			<th style="text-align:center;border: 1px solid #000;vertical-align: middle;">Fair</th>';
			vHtml += '			<th style="text-align:center;border: 1px solid #000;vertical-align: middle;">Good</th>';
			vHtml += '		</tr>';
			vHtml += '	</thead>';
		}
		vHtml += '	<tbody>';
		var nId = ""+ruburic_num;
		
		if(ruburic_num < 10) nId = "0"+ruburic_num;
		
		vHtml += '		<tr>';
		vHtml += '			<td style="text-align:center;border: 1px solid #000;vertical-align: middle;">'+ruburic_content_title+'</td>';
		vHtml += '			<td style="border: 1px solid #000;vertical-align: middle;">'+ruburic_content_sub+'</td>';
		vHtml += '			<td style="text-align:center;border: 1px solid #000;vertical-align: middle;"><input type="radio" name="rubric_'+nId+'" id="rubric_'+nId+'_0" value="0" disabled></td>';
		vHtml += '			<td style="text-align:center;border: 1px solid #000;vertical-align: middle;"><input type="radio" name="rubric_'+nId+'" id="rubric_'+nId+'_1" value="1" disabled></td>';
		vHtml += '			<td style="text-align:center;border: 1px solid #000;vertical-align: middle;"><input type="radio" name="rubric_'+nId+'" id="rubric_'+nId+'_2" value="2" disabled></td>';
		vHtml += '			<td style="text-align:center;border: 1px solid #000;vertical-align: middle;"><input type="radio" name="rubric_'+nId+'" id="rubric_'+nId+'_3" value="3" disabled></td>';
		vHtml += '		</tr>';
		vHtml += '	</tbody>';
	}
	vHtml += '</table>';
	$("#rubric_data").html(vHtml);
}

function click_rubric()
{
	var options = 'toolbar=no,location=no,width=1500,height=800,resizable=no,scrollbars=no,status=no';
	window.open('/correction/correct/correct_writing_rubric.do?id=' + $("#correction_exams_answer_id").val(),'correct_rubric',options);
}

function click_comment_twe()
{
	var options = 'toolbar=no,location=no,width=800,height=550,resizable=no,scrollbars=no,status=no';
	window.open('/correction/correct/correct_writing_pen.do?id=' + $("#correction_exams_answer_id").val(),'correct_pen',options);
}

function open_user_appeal(v_id)
{
	var options = 'toolbar=no,location=no,width=500,height=600,resizable=no,scrollbars=no,status=no';
	window.open('/correction/correct/correct_writing_appeal.do?id=' + v_id,'correct_appeal',options);	
}

function open_comment(v_id)
{
	var options = 'toolbar=no,location=no,width=800,height=560,resizable=no,scrollbars=no,status=no';
	window.open('/correction/correct/correct_writing_comment.do?id=' + v_id,'correct_comment',options);

}

function click_script()
{
	var options = 'toolbar=no,location=no,width=1020,height=760,resizable=no,scrollbars=no,status=no';
	window.open('/correction/correct/correct_writing_script.do?id=' + $("#correction_exams_answer_id").val(),'correct_script',options);
}