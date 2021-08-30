var page = 1;
var row_num = 20;

/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	if($("#search_test_type").val()){
		$("#test_type").val($("#search_test_type").val());
	}
	if($("#search_student_type").val()){
		$("#student_type").val($("#search_student_type").val());
	}
	if($("#search_modify_yn").val()){
		$("#modify_yn").val($("#search_modify_yn").val());
	}
	if($("#search_page").val() > 0){
		search_list($("#search_page").val());
	}else{
		search_list(1);
	}
	
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
		url : "/board/getBoardMemoirsList.do",
		data:{
			test_type:$("#test_type").val(),
			student_type:$("#student_type").val(),
			modify_yn:$("#modify_yn").val(),
			page:vPage,
			row_num:row_num
		},
		success:function(data){
			var total_count = data.memoirsCount.total_count;
			var total_page = Math.ceil(total_count/row_num);
			
			var momoirsList = data.momoirsList;
			var vHtml = "";
			for(var i=0; i<momoirsList.length; i++){
				var test_type = "";
				var student_type = "";
				var modify_yn = "수정완료";
				if(momoirsList[i].test_type == "TOEFL"){
					test_type = "토플";
				}else if(momoirsList[i].test_type == "TOEIC"){
					test_type = "토익";
				}
				if(momoirsList[i].student_type == "JUNIOR"){
					student_type = "중고등";
				}else if(momoirsList[i].student_type == "SENIOR"){
					student_type = "성인";
				}
				if(momoirsList[i].modify_yn == "N"){
					modify_yn = "미 수정";
				}
				vHtml += "<tr>";
				vHtml += "<td class='text-center'>"+momoirsList[i].id+"</td>";
				vHtml += "<td class='text-center'>"+test_type+"</td>";
				vHtml += "<td class='text-center'>"+student_type+"</td>";
				vHtml += "<td>"+momoirsList[i].title+"</td>";
				vHtml += "<td class='text-center'>"+momoirsList[i].created+"</td>";
				vHtml += "<td class='text-center'>"+momoirsList[i].write_name+"</td>";
				vHtml += "<td class='text-right'>"+momoirsList[i].end_toefl_score+"점</td>";
				vHtml += "<td class='text-right'>"+momoirsList[i].course_month+"개월</td>";
				vHtml += "<td class='text-right'>"+momoirsList[i].hit+"</td>";
				vHtml += "<td class='text-center'>"+modify_yn+"</td>";
				vHtml += "<td class='with-btn' nowrap=''>";
				vHtml += "	<a href='/board/memoirs_form.do?id="+momoirsList[i].id+"&&test_type="+$("#test_type").val()+"&&student_type="+$("#student_type").val()+"&&modify_yn="+$("#modify_yn").val()+"&&page="+page+"' class='btn btn-sm btn-primary width-60 m-r-2'>수정</a>";
				vHtml += "</td>";
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