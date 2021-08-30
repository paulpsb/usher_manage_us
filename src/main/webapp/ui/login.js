jQuery(document).ready(function(){
	var username = cfmGetCookie("username");
	if(username){
		$("#username").val(username);
		$("#save_username").attr("checked",true);
		$("#userpassword").focus();
	}else{
		$("#username").focus();
	}
	

	$("#username").keydown(function(){
		if(event.keyCode == 13) $("#userpassword").focus(); 
	});
});

function flogin_submit(f)
{

	$.ajax({
		type : "POST",
		url : "/loginCheck.do",
		data:{
			username:$("#username").val(),
			password:$("#userpassword").val()			
		},
		success:function(data){
			if(data.login_yn == "Y")
			{
				if($("#save_username").is(":checked")){
					var date = cfmGetExpDate(30, 12, 00);
					cfmSetCookie("username", $("#username").val(), date);
				} else {
					cfmDeleteCookie("username");
				}
				
				//location.replace("/main/dashboard.do");
				location.replace("/main/dashboard_teacher.do");
				
			}else{
				alert(data.login_fail_msg);
			}
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
	
	return false;
}


