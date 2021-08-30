var course_id;
var section;
var practice_type;
var notices_practice_id;
var schedule_date;
var current_date;
var user_id;
jQuery(document).ready(function(){
	user_id = $("#user_id").val();
	course_id = $("#course_id").val();
	section = $("#section").val();
	practice_type = $("#practice_type").val();
	schedule_date = $("#schedule_date").val();
	current_date = $("#current_date").val();
	if(schedule_date == current_date) $("#btn_save").show();
	search_form();
});

function go_home()
{
	location.href = "/main/dashboard_teacher.do?user_id="+user_id+"&&section=PRACTICE&&schedule_date="+schedule_date;
}
function search_form()
{
	$.ajax({
		type : "POST",
		url : "/main/getTeacherNoticePracticeList.do",
		data : {
			course_id:course_id,			
			section:section,			
			practice_type:practice_type,
			date:schedule_date
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++)
			{
				var checked = "";
				if(i==0) checked = "checked";
				
				var vTitle = "";
				if(data[i].section == "VOCA"){
					vTitle = data[i].practice_type;
				}else{
					if(data[i].book) vTitle += data[i].book; 
					if(data[i].volume) vTitle += " "+data[i].volume; 
					if(data[i].group) vTitle += " "+data[i].group; 
					if(data[i].article) vTitle += " "+data[i].article; 
					if(data[i].paragraph) vTitle += " "+data[i].paragraph+"문단"; 
				}
				vHtml += '<div class="radio radio-css">';
				vHtml += '	<input type="radio" name="notices_practice_id" id="notices_practice_id_'+i+'" value="'+data[i].id+'" '+checked+'>';
				vHtml += '	<label for="notices_practice_id_'+i+'">'+vTitle+'</label>';
				vHtml += '</div>';
				
				$("#search_practice_list").html(vHtml);
				
				$("input[name='notices_practice_id']").click(function(){
					search_practice(false);
				});
				
				search_practice(true);
				
				
			}
			 
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function search_practice(isOpen)
{
	notices_practice_id = $("input[name='notices_practice_id']:checked").val();
	$.ajax({
		type : "POST",
		url : "/main/getTeacherNoticePractice.do",
		data : {
			id:notices_practice_id			
		},
		success:function(data){
			var practiceInfo = data.practiceInfo;
			var practiceDetailList = data.practiceDetailList;
			
			$("#comments").val(practiceInfo.comments);
			
			var vHtml = "";
			for(var i=0; i<practiceDetailList.length; i++)
			{
				var first_fail_type = practiceDetailList[i].first_fail_type;
				var last_fail_type  = practiceDetailList[i].last_fail_type;
				
				var first_score = practiceDetailList[i].first_score;
				var first_score1 = practiceDetailList[i].first_score1;
				var first_score2 = practiceDetailList[i].first_score2;
				var first_total_score = practiceDetailList[i].first_total_score;
				var first_total_score1 = practiceDetailList[i].first_total_score1;
				var first_total_score2 = practiceDetailList[i].first_total_score2;
				var last_score = practiceDetailList[i].last_score;
				var last_score1 = practiceDetailList[i].last_score1;
				var last_score2 = practiceDetailList[i].last_score2;
				var last_total_score = practiceDetailList[i].last_total_score;
				var last_total_score1 = practiceDetailList[i].last_total_score1;
				var last_total_score2 = practiceDetailList[i].last_total_score2;
				
				var first_title = "";
				var last_title = "";
				if(section== "GRAMMAR" && practice_type == "MOCK_TEST"){ 
					first_title = "SW1:"+first_score1+"/"+first_total_score1+" "+"SW2:"+first_score2+"/"+first_total_score2;
					last_title = "SW1:"+last_score1+"/"+last_total_score1+" "+"SW2:"+last_score2+"/"+last_total_score2;
				}else if(practice_type == "TENTIMES"){
					first_title =  first_score1+"회/"+first_total_score1+"회"+first_score+"%";
					last_title =  last_score1+"회/"+last_total_score1+"회"+last_score+"%";
				}else if(section == "VOCA"){
					first_title =  first_score;
					last_title =  last_score;
				}else{
					if(first_total_score == 1){
						if(first_score == 1){
							first_title = "O";
						}else{
							first_title = "X";
						}
					}else{
						first_title =  first_score+"/"+first_total_score;
					}
					if(last_total_score == 1){
						if(last_score == 1){
							last_title = "O";
						}else{
							last_title = "X";
						}
					}else{
						last_title =  last_score+"/"+last_total_score;
					}
				}
					
				var no = i+1;
				vHtml += '<tr>';
				//vHtml += '	<td class="text-center">'+no+'</td>';
				vHtml += '	<td class="text-center">'+practiceDetailList[i].student_name+'</td>';
				if(first_fail_type == "Y"){
					//vHtml += '	<td class="text-center bg-success">'+first_title+'</td>';
					vHtml += '	<td class="text-center bg-success">성공</td>';
				}else if(first_fail_type == "N"){
					//vHtml += '	<td class="text-center bg-danger">'+first_title+'</td>';
					vHtml += '	<td class="text-center bg-danger">실패</td>';
				}else{
					vHtml += '	<td class="text-center bg-grey-darker">미시행</td>';
				}
				if(last_fail_type == "Y"){
					//vHtml += '	<td class="text-center bg-success">'+last_title+'</td>';
					vHtml += '	<td class="text-center bg-success">성공</td>';
				}else if(last_fail_type == "N"){
					//vHtml += '	<td class="text-center bg-danger">'+last_title+'</td>';
					vHtml += '	<td class="text-center bg-danger">실패</td>';
				}else{
					vHtml += '	<td class="text-center bg-grey-darker">미시행</td>';
				}
				vHtml += '	<td class="with-form-control">';
				vHtml += '		<input type="hidden" name="course_enrollment_id" value="'+practiceDetailList[i].course_enrollment_id+'">';
				vHtml += '		<input type="text" class="form-control" name="practice_detail_comments" value="'+practiceDetailList[i].comments+'">';
				vHtml += '	</td>';
				vHtml += '</tr>';
			}
			
			$("#practice_detail_list").html(vHtml);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

function practice_save()
{
	var is_comment = true;
	var v_comments = $("#comments").val();
	
	if(v_comments) is_comment = true;
	
	var $_course_enrollment_id                   = $("input[name=course_enrollment_id]");
	var $_practice_detail_comments               = $("input[name=practice_detail_comments]");
	
	var detail_list = Array();
	$_course_enrollment_id.each(function(index) {
		var objDetail = Object();
		var practice_detail_comments = $_practice_detail_comments.eq(index).val();
		var practice_detail_is_comments = false;
		if(practice_detail_comments){
			practice_detail_is_comments = true;
			
		}else{
			is_comment = false;
		}
		objDetail.course_enrollment_id    = $(this).val();
		objDetail.comments                = practice_detail_comments;
		objDetail.is_comments             = practice_detail_is_comments;

		detail_list.push(objDetail);
		
	});
	
	
	var data_value = JSON.stringify(detail_list);
	$.ajax({
		type : "POST",
		url : "/main/updatNoticesPracticeComment.do",
		data:{
			id:notices_practice_id,
			course_id:course_id,			
			section:section,			
			practice_type:practice_type,
			date:$("#search_date").val(),
			comments:v_comments,
			is_comments:is_comment,
			data_value:data_value
		},
		success:function(data){
			alert("저장하였습니다.");
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
	
}