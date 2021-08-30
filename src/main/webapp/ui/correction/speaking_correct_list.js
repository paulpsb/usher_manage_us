var page = 1;
var row_num = 20;


/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	
	var today = new Date();   

	var year = today.getFullYear(); // 년도
	var month = today.getMonth() + 1;  // 월
	
	var vHtml = "";
	for(var i=year; i>= 2007; i--)
	{
		var selected = "";
		if(i == year) selected = "selected";
		vHtml += '<option value="'+i+'" '+selected+'>'+i+'년</option>';
	}
	
	$('#search_year').html(vHtml);
	
	vHtml = "";
	for(var i=1; i<= 12; i++)
	{
		var selected = "";
		if(i == month) selected = "selected";
		var v_mon = ""+i;
		if(i<10) v_mon = "0"+v_mon;
		vHtml += '<option value="'+v_mon+'" '+selected+'>'+v_mon+'월</option>';
	}
	
	$('#search_month').html(vHtml);
	
	$('#search_year,#search_month').change(function(e){
		search_ta_list();
	});
	
	$('#search_out_yn').click(function(e){
		form_search();
	});
	
	$('#search_book,#search_status,#search_course_name,#search_comment_answer_yn,#search_answer_appeal_status').change(function(e){
		form_search();
	});	
	
	$("#search_user_name").keydown(function(key) {
		if (key.keyCode == 13) {
			form_search();
		}
	});
	
	form_search();
	
});

function form_search()
{
	search_list(1);
}

function search_list(vPage)
{
	var out_yn = "";
	if($("#search_out_yn").is(":checked")){
		out_yn = "Y";
	}
	
	page = vPage;
	$.ajax({
		type : "POST",
		url : "/correction/getSpeakingCorrectionList.do",
		data:{
			section:"SPEAKING",
			book:$("#search_book").val(),
			status:$("#search_status").val(),
			course_name:$("#search_course_name").val(),
			comment_answer_yn:$("#search_comment_answer_yn").val(),
			user_name:$("#search_user_name").val(),
			answer_appeal_status:$("#search_answer_appeal_status").val(),
			out_yn:out_yn,
			page:vPage,
			row_num:row_num
		},
		success:function(data){
			var total_count = data.resultCount.total_count;
			var total_page = Math.ceil(total_count/row_num);
			
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
				var no = total_count - (row_num * (vPage-1)) - i;
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
				vHtml += "<a href='javascript:open_writing("+resultList[i].id+")'>";
				vHtml += resultList[i].question;
				vHtml += "</a>";
				vHtml += "</td>";
				vHtml += "<td class='text-center'>"+resultList[i].date+"</td>";
				vHtml += "<td class='text-center'>"+resultList[i].user_username+"<br>"+resultList[i].user_name+"</td>";
				vHtml += "<td class='text-center'>"+cfmNvl1(resultList[i].course_name)+"</td>";
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
			
			vHtml = cfmPage(10, vPage, total_page, "search_list");
			$("#pageList").html(vHtml);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function open_writing(v_id){
	window.open("/correction/correct/correct_speaking.do?id="+v_id, "speaking");
	
}

function open_ta_pen()
{
	search_ta_list();
	$("#modal-ta-pen").modal();
}
function search_ta_list()
{
	$.ajax({
		type : "POST",
		url : "/correction/getSpeakingCorrectionPenCountList.do",
		data:{
			section:"SPEAKING",
			answer_correct_pen_date:$("#search_year").val()+"-"+$("#search_month").val()
		},
		success:function(data){
			var v_year = $("#search_year").val();
			var v_month = $("#search_month").val();
			
			var lastDay = ( new Date( parseInt(v_year), parseInt(v_month), 0) ).getDate();

			var monthlyList = data.monthlyList;
			var dailyList = data.dailyList;
			var monthly_count = monthlyList.length;
			var vHtml = "";
			var cHtml = "";
			cHtml += '<colgroup>';
			cHtml += '	<col style="width:20%;" />';
			for(var i=0; i<monthly_count; i++)
			{
				cHtml += '	<col style="width:'+(80/monthly_count)+'%;" />';
			}
			cHtml += '</colgroup>';
			
			vHtml += cHtml;
			vHtml += '<thead>';
			vHtml += '<tr>';
			vHtml += '	<th class="text-center table-info">구분</th>';
			for(var i=0; i<monthly_count; i++)
			{
				vHtml += '	<th class="text-center table-info">'+monthlyList[i].answer_correct_pen_name+'</th>';
			}
			vHtml += '</tr>';
			vHtml += '</thead>';
			$("#ta_head_list").html(vHtml);
			
			vHtml = "";
			vHtml += cHtml;
			vHtml += '<tbody>';
			for(var k=1; k<=lastDay; k++)
			{
				var v_day = "";
				if(k < 10){
					v_day = "0"+k;
				}else{
					v_day = ""+k;
				}
				
				var v_short_date = v_month+"-"+v_day;
				var v_date = v_year+"-"+v_month+"-"+v_day;
				vHtml += '<tr>';
				vHtml += '	<th class="text-center">'+v_short_date+'</th>';
				for(var i=0; i<monthly_count; i++)
				{
					var v_answer_correct_pen_name = monthlyList[i].answer_correct_pen_name;
					var v_answer_correct_pen_user_id = monthlyList[i].answer_correct_pen_user_id;
					var p_idx = dailyList.findIndex(t => t.answer_correct_pen_name == v_answer_correct_pen_name && t.answer_correct_pen_date == v_date);
					if(p_idx < 0 ){
						vHtml += '	<td class="text-center">&nbsp;</td>';
					}else{
						vHtml += '	<td class="text-center">';
						vHtml += '		<a href="javascript:open_ta_correct_date(\''+v_answer_correct_pen_user_id+'\',\''+v_date+'\')">'+dailyList[p_idx].total_count+'</a>';
						vHtml += '	</td>';
					}
				}
				vHtml += '</tr>';
			}
			vHtml += '</tbody>';
			$("#ta_data_list").html(vHtml);
			
			vHtml = "";
			vHtml += cHtml;
			vHtml += '<thead>';
			vHtml += '<tr>';
			vHtml += '	<th class="text-center table-info">합계</th>';
			for(var i=0; i<monthly_count; i++)
			{
				var v_answer_correct_pen_user_id = monthlyList[i].answer_correct_pen_user_id;
				
				vHtml += '	<th class="text-center table-info">';
				vHtml += '		<a href="javascript:open_ta_correct_month(\''+v_answer_correct_pen_user_id+'\',\''+v_year+"-"+v_month+'\')">'+monthlyList[i].total_count+'</a>';
				vHtml += '	</th>';
			}
			vHtml += '</tr>';
			vHtml += '</thead>';
			$("#ta_tile_list").html(vHtml);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function open_ta_correct_date(v_answer_correct_pen_user_id, v_date)
{
	window.open("/correction/ta_correct_list.do?section=SPEAKING&&answer_correct_pen_user_id="+v_answer_correct_pen_user_id+"&&answer_correct_pen_date="+v_date, "correct_list");
}

function open_ta_correct_month(v_answer_correct_pen_user_id, v_month)
{
	window.open("/correction/ta_correct_list.do?section=SPEAKING&&answer_correct_pen_user_id="+v_answer_correct_pen_user_id+"&&answer_correct_pen_month="+v_month, "correct_list");
}