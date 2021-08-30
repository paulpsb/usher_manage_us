var page = 1;
var row_num = 15;

/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	$("#search_group").change(function(e){
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
	page = vPage;
	$.ajax({
		type : "POST",
		url : "/base/getAuthUserList.do",
		data:{
			group_id:$("#search_group").val(),
			is_active:true,
			username:$("#search_username").val(),
			page:vPage,
			row_num:row_num
		},
		success:function(data){
			var total_count = data.userCount.total_count;
			var total_page = Math.ceil(total_count/row_num);
			
			var userList = data.userList;
			var vHtml = "";
			for(var i=0; i<userList.length; i++){
				var v_group = "";
				if(userList[i].group_id == "2"){
					v_group = "직원";
				}else if(userList[i].group_id == "3"){
					v_group = "매니저";
				}else if(userList[i].group_id == "4"){
					v_group = "강사";
				}
				
				
				vHtml += "<tr>";
				vHtml += "<td class='text-center'>"+v_group+"</td>";
				vHtml += "<td class='text-center'>"+userList[i].username+"</td>";
				vHtml += "<td class='text-center'>"+userList[i].last_name+userList[i].first_name+"</td>";
				vHtml += "<td class='with-btn text-center' nowrap=''>";
				vHtml += "	<a href='/main/dashboard_teacher.do?user_id="+userList[i].user_id+"' target='_blank' class='btn btn-sm btn-primary m-r-2'>개인홈으로 이동</a>";
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