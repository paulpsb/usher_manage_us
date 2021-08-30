var page = 1;
var row_num = 15;

/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	$("#search_group").change(function(e){
		search_list(1);
	});
	$("#search_actice").change(function(e){
		search_list(1);
	});
	
	
	$("#search_username").keydown(function(key) {
		if (key.keyCode == 13) {
			search_list(1);
		}
	});
	
	$("#search_auth_username").keydown(function(key) {
		if (key.keyCode == 13) {
			auth_search();
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
		url : "/base/getAuthUserList.do",
		data:{
			group_id:$("#search_group").val(),
			is_active:search_is_actice,
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
				
				var is_active = "";
				var is_voca = "";
				var is_grammar = "";
				var is_reading = "";
				var is_listening = "";
				var is_speaking = "";
				var is_writing = "";
				
				if(userList[i].is_active)    is_active = "checked";
				if(userList[i].is_voca)      is_voca = "checked";
				if(userList[i].is_grammar)   is_grammar = "checked";
				if(userList[i].is_reading)   is_reading = "checked";
				if(userList[i].is_listening) is_listening = "checked";
				if(userList[i].is_speaking)  is_speaking = "checked";
				if(userList[i].is_writing)   is_writing = "checked";
				
				vHtml += "<tr>";
				vHtml += "<td class='text-center'>"+v_group+"</td>";
				vHtml += "<td class='text-center'>"+userList[i].username+"</td>";
				vHtml += "<td class='text-center'>"+userList[i].last_name+userList[i].first_name+"</td>";
				
				vHtml += '<td class="text-center">';
				vHtml += '	<div class="switcher">';
				vHtml += '		<input type="hidden" name="user_id" value="'+userList[i].user_id+'">';
				vHtml += '		<input type="checkbox" name="is_active" id="is_active_'+i+'" value="1" '+is_active+'>';
				vHtml += '		<label for="is_active_'+i+'"></label>';
				vHtml += '	</div>';
				vHtml += '</td>';

				vHtml += '<td class="text-center">';
				vHtml += '	<div class="switcher">';
				vHtml += '		<input type="checkbox" name="is_voca" id="is_voca_'+i+'" value="1" '+is_voca+'>';
				vHtml += '		<label for="is_voca_'+i+'"></label>';
				vHtml += '	</div>';
				vHtml += '</td>';
				
				vHtml += '<td class="text-center">';
				vHtml += '	<div class="switcher">';
				vHtml += '		<input type="checkbox" name="is_grammar" id="is_grammar_'+i+'" value="1" '+is_grammar+'>';
				vHtml += '		<label for="is_grammar_'+i+'"></label>';
				vHtml += '	</div>';
				vHtml += '</td>';

				vHtml += '<td class="text-center">';
				vHtml += '	<div class="switcher">';
				vHtml += '		<input type="checkbox" name="is_reading" id="is_reading_'+i+'" value="1" '+is_reading+'>';
				vHtml += '		<label for="is_reading_'+i+'"></label>';
				vHtml += '	</div>';
				vHtml += '</td>';

				vHtml += '<td class="text-center">';
				vHtml += '	<div class="switcher">';
				vHtml += '		<input type="checkbox" name="is_listening" id="is_listening_'+i+'" value="1" '+is_listening+'>';
				vHtml += '		<label for="is_listening_'+i+'"></label>';
				vHtml += '	</div>';
				vHtml += '</td>';

				vHtml += '<td class="text-center">';
				vHtml += '	<div class="switcher">';
				vHtml += '		<input type="checkbox" name="is_speaking" id="is_speaking_'+i+'" value="1" '+is_speaking+'>';
				vHtml += '		<label for="is_speaking_'+i+'"></label>';
				vHtml += '	</div>';
				vHtml += '</td>';
				
				vHtml += '<td class="text-center">';
				vHtml += '	<div class="switcher">';
				vHtml += '		<input type="checkbox" name="is_writing" id="is_writing_'+i+'" value="1" '+is_writing+'>';
				vHtml += '		<label for="is_writing_'+i+'"></label>';
				vHtml += '	</div>';
				vHtml += '</td>';

				vHtml += '<td class="text-center">';
				vHtml += '	<input type="text" class="form-control" name="user_color" value="'+cfmNvl1(userList[i].user_color)+'">';
				vHtml += '</td>';
				
				vHtml += '<td class="text-center">';
				vHtml += '	<input type="text" class="form-control" name="start_time" value="'+cfmNvl1(userList[i].start_time)+'">';
				vHtml += '</td>';

				vHtml += '<td class="text-center">';
				vHtml += '	<input type="text" class="form-control" name="end_time" value="'+cfmNvl1(userList[i].end_time)+'">';
				vHtml += '</td>';

				vHtml += "<td class='with-btn text-center' nowrap=''>";
				if(userList[i].group_id != "2"){
					vHtml += "	<a href='javascript:change_group("+userList[i].user_id+",2)' class='btn btn-sm btn-primary m-r-2'>직원으로 변경</a>";
				}
				
				if(userList[i].group_id != "3"){
					vHtml += "	<a href='javascript:change_group("+userList[i].user_id+",3)' class='btn btn-sm btn-primary m-r-2'>매니저로 변경</a>";
				}
				
				if(userList[i].group_id != "4"){
					vHtml += "	<a href='javascript:change_group("+userList[i].user_id+",4)' class='btn btn-sm btn-primary m-r-2'>강사로 변경</a>";
				}
				vHtml += "</td>";
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

function change_group(user_id, group_id)
{
	$.ajax({
		type : "POST",
		url : "/base/updateUserGroup.do",
		data:{
			user_id:user_id,
			group_id:group_id
		},
		success:function(data){
			alert("변경하였습니다.");
			search_list(page);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

function form_add()
{
	$("#authList").html("");
	$("#search_auth_username").val("");
	$("#modal-auth").modal();
}


function auth_search()
{
	var v_username = $("#search_auth_username").val();
	if(!v_username || v_username.length < 2){
		alert("검색어는 2글자 이상 입력하세요.");
		return;
	}
	
	$.ajax({
		type : "POST",
		url : "/base/getAuthUserStudentList.do",
		data:{
			group_id:1,
			username:v_username
		},
		success:function(data){
			var vHtml = "";
			if(data.length > 0){
				for(var i=0; i<data.length; i++)
				{
					vHtml += "<tr>";
					vHtml += "<td class='text-center'>"+data[i].username+"</td>";
					vHtml += "<td class='text-center'>"+data[i].last_name+data[i].first_name+"</td>";
					vHtml += "<td class='with-btn text-center' nowrap=''>";
					vHtml += "	<a href='javascript:auth_change_group("+data[i].user_id+",2)' class='btn btn-sm btn-primary m-r-2'>직원으로 등록</a>";
					vHtml += "	<a href='javascript:auth_change_group("+data[i].user_id+",3)' class='btn btn-sm btn-primary m-r-2'>매니저로 등록</a>";
					vHtml += "	<a href='javascript:auth_change_group("+data[i].user_id+",4)' class='btn btn-sm btn-primary m-r-2'>강사로 등록</a>";
					vHtml += "</td>";
					vHtml += "</tr>";
				}
			}else{
				vHtml += "<tr><td class='text-center' colspan='3'>조회된 자료가 없습니다.</td></tr>";
			}
			$("#authList").html(vHtml);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

function auth_change_group(user_id, group_id)
{
	$.ajax({
		type : "POST",
		url : "/base/updateUserGroup.do",
		data:{
			user_id:user_id,
			group_id:group_id
		},
		success:function(data){
			alert("등록하였습니다.");
			$("#modal-auth").modal("hide");
			search_list(page);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

function form_save()
{
	var $_user_id      = $("input[name=user_id]");
	var $_is_active    = $("input[name=is_active]");
	var $_is_voca      = $("input[name=is_voca]");
	var $_is_grammar   = $("input[name=is_grammar]");
	var $_is_reading   = $("input[name=is_reading]");
	var $_is_listening = $("input[name=is_listening]");
	var $_is_speaking  = $("input[name=is_speaking]");
	var $_is_writing   = $("input[name=is_writing]");
	var $_user_color   = $("input[name=user_color]");
	var $_start_time   = $("input[name=start_time]");
	var $_end_time     = $("input[name=end_time]");
	
	var data_list = Array();
	
	$_user_id.each(function(index) {
		var objData = Object();
		var user_id        = $(this).val();
		var user_color     = $_user_color.eq(index).val();
		var start_time     = $_start_time.eq(index).val();
		var end_time       = $_end_time.eq(index).val();
		
		console.log(user_color);
		objData.user_id = user_id;
		objData.user_color = user_color;
		objData.start_time = start_time;
		objData.end_time = end_time;
		
		
		if($_is_active.eq(index).is(":checked"))
		{
			objData.is_active = true;
		}else{
			objData.is_active = false;
		}

		if($_is_voca.eq(index).is(":checked"))
		{
			objData.is_voca = true;
		}else{
			objData.is_voca = false;
		}
		
		if($_is_grammar.eq(index).is(":checked"))
		{
			objData.is_grammar = true;
		}else{
			objData.is_grammar = false;
		}
		
		if($_is_reading.eq(index).is(":checked"))
		{
			objData.is_reading = true;
		}else{
			objData.is_reading = false;
		}
		
		if($_is_listening.eq(index).is(":checked"))
		{
			objData.is_listening = true;
		}else{
			objData.is_listening = false;
		}
		
		if($_is_speaking.eq(index).is(":checked"))
		{
			objData.is_speaking = true;
		}else{
			objData.is_speaking = false;
		}		
		
		if($_is_writing.eq(index).is(":checked"))
		{
			objData.is_writing = true;
		}else{
			objData.is_writing = false;
		}
		
		data_list.push(objData);
	});
	
	var data_value = JSON.stringify(data_list);
	$.ajax({
		type : "POST",
		url : "/base/updateUser.do",
		data:{
			data_value:data_value
		},
		success:function(data){
			alert("저장하였습니다.");
			search_list(page);

		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}