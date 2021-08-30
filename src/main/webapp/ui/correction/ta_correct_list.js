var section;
var book;
var answer_correct_pen_user_id;
var answer_correct_pen_date;
var answer_correct_pen_month;
var appeal_answer_date;
var appeal_answer_month;
var marketin_correction_answer_type;
jQuery(document).ready(function(){
	
	section                    = $("#section").val();;
	book                       = $("#book").val();;
	answer_correct_pen_user_id = $("#answer_correct_pen_user_id").val();
	answer_correct_pen_date    = $("#answer_correct_pen_date").val();
	answer_correct_pen_month   = $("#answer_correct_pen_month").val();
	appeal_answer_date         = $("#appeal_answer_date").val();
	appeal_answer_month        = $("#appeal_answer_month").val();
	marketin_correction_answer_type = $("#marketin_correction_answer_type").val();
	marketin_correction_answer_date = $("#marketin_correction_answer_date").val();
	search_list();
	
});

function search_list()
{
	$.ajax({
		type : "POST",
		url : "/correction/getTACorrectionList.do",
		data:{
			section:section,
			book:book,
			answer_correct_pen_user_id:answer_correct_pen_user_id,
			answer_correct_pen_date:answer_correct_pen_date,
			answer_correct_pen_month:answer_correct_pen_month,
			appeal_answer_date:appeal_answer_date,
			appeal_answer_month:appeal_answer_month,
			marketin_correction_answer_type:marketin_correction_answer_type,
			marketin_correction_answer_date:marketin_correction_answer_date
		},
		success:function(data){
			var resultList = data.resultList;
			var reviewList = data.reviewList;
			
			var vHtml = "";
			for(var i=0; i<resultList.length; i++){
				var v_id = resultList[i].id;
				var v_class = "bg-grey";
				if(resultList[i].status == "REQUEST"){
					v_class = "bg-yellow-transparent-3";
				}else if(resultList[i].status == "COMPLETE"){
					v_class = "bg-green-transparent-3";
				}
				var no = i + 1;
				vHtml += "<tr class='"+v_class+"'>";
				vHtml += "<td class='text-center'>"+no+"</td>";
				vHtml += "<td class='text-center'>"+resultList[i].book.toUpperCase()+"</td>";
				vHtml += "<td class='text-center'>"+resultList[i].article+"</td>";
				if(resultList[i].status == "REQUEST"){
					vHtml += "<td class='text-center'>첨삭대기</td>";
				}else if(resultList[i].status == "COMPLETE"){
					vHtml += "<td class='text-center'>첨삭완료</td>";
				}else{
					vHtml += "<td class='text-center text-danger'>첨삭안함</td>";
				}
				vHtml += "<td>";
				vHtml += "<a href='javascript:open_correct(\""+resultList[i].section+"\","+resultList[i].id+")'>";
				vHtml += resultList[i].question;
				vHtml += "</a>";
				vHtml += "</td>";
				vHtml += "<td class='text-center'>"+resultList[i].date+"</td>";
				vHtml += "<td class='text-center'>"+resultList[i].user_username+"<br>"+resultList[i].user_name+"</td>";
				vHtml += "<td class='text-center'>"+resultList[i].course_name+"</td>";
				if(resultList[i].answer_student_pen_yn == "Y"){
					vHtml += "<td class='text-center text-success'>"+resultList[i].answer_student_pen_yn+"<br>"+resultList[i].answer_pen_date+"</td>";
				}else{
					vHtml += "<td class='text-center text-danger'>"+resultList[i].answer_student_pen_yn+"</td>";
				}
				
				if(resultList[i].status == "REQUEST" || resultList[i].status == "COMPLETE"){
					vHtml += "<td class='text-center'>"+cfmNvl1(resultList[i].request_date)+"</td>";
				}else{
					vHtml += "<td class='text-center'>&nbsp;</td>";
				}
				
				if(resultList[i].answer_rublic_yn == "Y"){
					vHtml += "<td class='text-center text-success'>"+resultList[i].answer_rublic_score+"<br>"+resultList[i].answer_rublic_date+"<br>"+resultList[i].answer_rublic_name+"</td>";
				}else{
					vHtml += "<td class='text-center text-danger'>"+resultList[i].answer_rublic_yn+"</td>";
				}
				
				if(resultList[i].answer_correct_pen_yn == "Y"){
					var rublic_time = resultList[i].rublic_time;
					var rublic_hour = parseInt(rublic_time/60);
					var rublic_min = rublic_time%60;
					var v_rublic_time = "";
					if(rublic_hour > 0) v_rublic_time += rublic_hour+"시간";
					if(rublic_min > 0) v_rublic_time += " "+rublic_min+"분";
					vHtml += "<td class='text-center text-success'>"+resultList[i].answer_correct_pen_yn+"<br>"+resultList[i].answer_correct_pen_date+"<br>"+resultList[i].answer_correct_pen_name+"<br>("+v_rublic_time+")</td>";
				}else{
					vHtml += "<td class='text-center text-danger'>"+resultList[i].answer_correct_pen_yn;
					if(resultList[i].status == "REQUEST" || resultList[i].status == "COMPLETE"){
						var rublic_time = resultList[i].rublic_time;
						var rublic_hour = parseInt(rublic_time/60);
						var rublic_min = rublic_time%60;
						var v_rublic_time = "";
						if(rublic_hour > 0) v_rublic_time += rublic_hour+"시간";
						if(rublic_min > 0) v_rublic_time += " "+rublic_min+"분";
						
						vHtml += "<br>("+v_rublic_time+")";
					}
					vHtml += "</td>";
				}
				if(resultList[i].answer_student_note_yn == "Y"){
					vHtml += "<td class='text-center text-success'>"+resultList[i].answer_student_note_yn+"</td>";
				}else{
					vHtml += "<td class='text-center text-danger'>"+resultList[i].answer_student_note_yn+"</td>";
				}
				
				var array_review = reviewList.filter(function(item, index){
					//if(item.current_status == "OK" && item.course_id == course_id && item.refund_status != "FULL_REFUND" && item.status != "REFUND_COMPLETED"){
					if(item.id == v_id){
						return true;
					}
				});
				
				vHtml += "<td class='text-center'>";
				if(resultList[i].answer_review_yn == "Y"){
					vHtml += resultList[i].answer_review_score+'점<br>';
				}
				for(var r=0; r<array_review.length; r++)
				{
					if(array_review[r].answer_review_yn == "Y"){
						vHtml += (r+1)+'차 : '+array_review[r].answer_review_score+'점<br>';
					}
				}
				if(resultList[i].answer_appeal_status == "REQUEST"){
					vHtml += '이의 신청중<br>';
					var answer_appeal_time = resultList[i].answer_appeal_time;
					var answer_appeal_hour = parseInt(answer_appeal_time/60);
					var answer_appeal_min = answer_appeal_time%60;
					var v_answer_appeal_time = "";
					if(answer_appeal_hour > 0) v_answer_appeal_time += answer_appeal_hour+"시간";
					if(answer_appeal_min > 0) v_answer_appeal_time += " "+answer_appeal_min+"분";
					
					vHtml += "("+v_answer_appeal_time+")";
				}
				vHtml += "</td>";
				if(resultList[i].comment_answer_yn == "Y"){
					vHtml += "<td class='text-center text-danger'>답변대기</td>";
				}else{
					vHtml += "<td class='text-center'>&nbsp;</td>";
				}
				
				vHtml += "</tr>";
			}
			
			$("#dataList").html(vHtml);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function open_correct(v_section, v_id)
{
	if(v_section == "SPEAKING"){
		window.open("/correction/correct/correct_speaking.do?id="+v_id, "speaking");
	}else{
		window.open("/correction/correct/correct_writing.do?id="+v_id, "writing");
	}
}