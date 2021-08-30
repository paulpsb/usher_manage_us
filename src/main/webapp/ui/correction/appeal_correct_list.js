var page = 1;
var row_num = 20;


/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	$('#search_section,#search_course_name,#search_appeal_answer_yn').change(function(e){
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
	page = vPage;
	$.ajax({
		type : "POST",
		url : "/correction/getAppealCorrectionList.do",
		data:{
			section:$("#search_section").val(),
			course_name:$("#search_course_name").val(),
			user_name:$("#search_user_name").val(),
			appeal_answer_yn:$("#search_appeal_answer_yn").val(),
			page:vPage,
			row_num:row_num
		},
		success:function(data){
			var total_count = data.resultCount.total_count;
			var total_page = Math.ceil(total_count/row_num);
			
			var resultList = data.resultList;
			
			var vHtml = "";
			for(var i=0; i<resultList.length; i++){
				var v_id = resultList[i].id;
				
				var no = total_count - (row_num * (vPage-1)) - i;
				vHtml += "<tr>";
				vHtml += "<td class='text-center'>"+no+"</td>";
				vHtml += "<td class='text-center'>"+resultList[i].section+"</td>";
				vHtml += "<td class='text-center'>"+resultList[i].book+"</td>";
				vHtml += "<td class='text-center'>"+resultList[i].article+"</td>";
				vHtml += "<td>";
				vHtml += "<a href='javascript:open_correction(\""+resultList[i].section+"\","+resultList[i].id+")'>";
				vHtml += resultList[i].question;
				vHtml += "</a>";
				vHtml += "</td>";
				vHtml += "<td class='text-center'>"+resultList[i].answer_correct_pen_date+"</td>";
				vHtml += "<td class='text-center'>"+resultList[i].answer_correct_pen_name+"</td>";
				vHtml += "<td class='text-center'>"+resultList[i].date+"</td>";
				vHtml += "<td class='text-center'>"+resultList[i].user_username+"<br>"+resultList[i].user_name+"</td>";
				
				if(resultList[i].appeal_answer_review_yn == "Y"){
					vHtml += "<td class='text-center'>"+resultList[i].appeal_answer_review_score+"점</td>";
				}else{
					vHtml += "<td class='text-center'></td>";
				}
				
				vHtml += "<td>"+resultList[i].appeal_comment+"</td>";
				if(resultList[i].appeal_answer_yn == "Y"){
					vHtml += "<td>"+resultList[i].appeal_answer_comment+"</td>";
				}else{
					vHtml += "<td class='text-center'></td>";
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

function open_correction(v_section, v_id){
	if(v_section == "SPEAKING"){
		window.open("/correction/correct/correct_speaking.do?id="+v_id, "correction");
	}else{
		window.open("/correction/correct/correct_writing.do?id="+v_id, "correction");
	}
	
}