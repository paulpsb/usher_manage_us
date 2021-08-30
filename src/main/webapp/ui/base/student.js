var page = 1;
var row_num = 15;

/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	$("#search_actice").change(function(e){
		search_list(1);
	});
	
	
	$("#search_username").keydown(function(key) {
		if (key.keyCode == 13) {
			search_list(1);
		}
	});
	
	search_list(1);
	
});

function form_search()
{
	search_list(1);
}

function search_list(vPage)
{
	var search_is_actice = false;
	if($("#search_actice").val() == "Y") search_is_actice = true;
	page = vPage;
	$.ajax({
		type : "POST",
		url : "/base/getStudentList.do",
		data:{
			group_id:1,
			is_active:search_is_actice,
			username:$("#search_username").val(),
			page:vPage,
			row_num:row_num
		},
		success:function(data){
			var total_count = data.studentCount.total_count;
			var total_page = Math.ceil(total_count/row_num);
			
			var userList = data.studentList;
			var vHtml = "";
			for(var i=0; i<userList.length; i++){
				var gender = "남자";
				if(userList[i].gender == "FEMALE") gender = "여자";
				
				vHtml += "<tr>";
				vHtml += "<td class='text-center'>"+userList[i].username+"</td>";
				vHtml += "<td class='text-center'>"+userList[i].last_name+userList[i].first_name+"</td>";
				vHtml += "<td class='text-center'>"+gender+"</td>";
				vHtml += "<td class='text-center'>"+cfmNvl1(userList[i].birthday)+"</td>";
				vHtml += "<td class='text-center'>"+userList[i].email+"</td>";
				vHtml += "<td class='text-center'>"+userList[i].mobile_no+"</td>";
				vHtml += "<td class='with-btn text-center' nowrap=''>";
				vHtml += "	<a href='javascript:go_user_info(\""+userList[i].user_id+"\")' class='btn btn-sm btn-primary m-r-2'>개인정보 수정</a>";
				vHtml += "	<a href='javascript:go_user_score(\""+userList[i].user_id+"\")' class='btn btn-sm btn-primary m-r-2'>보유점수 수정</a>";
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
function go_user_info(user_id)
{
	window.open('http://batch.usher.co.kr/modify/modify_user.do?user_id='+user_id,'modify_user');
	//window.open('http://127.0.0.1:8070/modify/modify_user.do?user_id='+user_id,'modify_user');
}

function go_user_score(user_id)
{
	window.open('http://batch.usher.co.kr/modify/modify_user_score.do?user_id='+user_id,'modify_user_score');
	//window.open('http://127.0.0.1:8070/modify/modify_user_score.do?user_id='+user_id,'modify_user_score');
}