var array_toefl_junior= [
	"U",
	"S",
	"H",
	"E"
];


var array_toefl_senior= [
	"완초1",
	"완초2",
	"Intermediate",
	"K1"
];

var array_toeic_junior= [
	"800",
	"900"
];

var array_toeic_senior= [
	"800",
	"900"
];

var array_batch;
/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	form_search();
});

function form_search()
{
	create_course();
	$.ajax({
		type : "POST",
		url : "/batch/getBatchVideoList.do",
		data:{
			test_type:$("#search_test_type").val(),
			student_type:$("#search_student_type").val(),
			select_course:$("#search_select_course").val()
		},
		success:function(data){
		    var $el_test_type         = $("input[name^=test_type]");
		    var $el_student_type      = $("input[name^=student_type]");
		    var $el_base_batch_course = $("input[name^=base_batch_course]");
		    var $el_base_user_course  = $("input[name^=base_user_course]");
		    var $el_select_course     = $("input[name^=select_course]");
		    var $el_select_type       = $("input[name^=select_type]");
		    var $el_finally_course    = $("input[name^=finally_course]");
		    var $el_video_url         = $("input[name^=video_url]");
		    
		    $el_test_type.each(function(index) {
		    	var test_type         = $(this).val();
		    	var student_type      = $el_student_type.eq(index).val();
		    	var base_batch_course = $el_base_batch_course.eq(index).val();
		    	var base_user_course  = $el_base_user_course.eq(index).val();
		    	var select_course     = $el_select_course.eq(index).val();
		    	var select_type       = $el_select_type.eq(index).val();
		    	var finally_course    = $el_finally_course.eq(index).val();
		    	var idx = data.findIndex(i => i.test_type == test_type && 
		    										i.student_type == student_type && 
		    										i.base_batch_course == base_batch_course && 
		    										i.base_user_course == base_user_course && 
		    										i.select_course == select_course && 
		    										i.select_type == select_type && 
		    										i.finally_course == finally_course);
		    	if(idx >= 0){
		    		$el_video_url.eq(index).val(data[idx].video_url);
		    	}
		    });
		    
		    $("input[name^=video_url]").change(function(e){
		    	$(this).closest("tr").find("input[name^=flag]").val("U");
			});			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
	
}

function form_save()
{
	var array_result = Array();
	var $el_flag              = $("input[name^=flag]");
    var $el_test_type         = $("input[name^=test_type]");
    var $el_student_type      = $("input[name^=student_type]");
    var $el_base_batch_course = $("input[name^=base_batch_course]");
    var $el_base_user_course  = $("input[name^=base_user_course]");
    var $el_select_course     = $("input[name^=select_course]");
    var $el_select_type       = $("input[name^=select_type]");
    var $el_finally_course    = $("input[name^=finally_course]");
    var $el_video_url         = $("input[name^=video_url]");
    
    $el_test_type.each(function(index) {
    	if($el_flag.eq(index).val() == "U"){
    		var objResult = Object();
    		objResult.test_type         = $(this).val();
    		objResult.student_type      = $el_student_type.eq(index).val();
    		objResult.base_batch_course = $el_base_batch_course.eq(index).val();
    		objResult.base_user_course  = $el_base_user_course.eq(index).val();
    		objResult.select_course     = $el_select_course.eq(index).val();
    		objResult.select_type       = $el_select_type.eq(index).val();
    		objResult.finally_course    = $el_finally_course.eq(index).val();
    		objResult.video_url         = $el_video_url.eq(index).val();
    		array_result.push(objResult);
    	}    	
    });
	
    $.ajax({
		type : "POST",
		url : "/batch/saveBatchVideo.do",
		data:{
			data_value:JSON.stringify(array_result)
		},
		success:function(data){
			form_search();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

function create_course()
{
	var test_type = $("#search_test_type").val();
	var student_type = $("#search_student_type").val();
	var select_course = $("#search_select_course").val();
	var vHtml = "";
	if(test_type == "TOEFL" && student_type=="SENIOR" && select_course == "batch")
	{
		array_batch = array_toefl_senior;
		vHtml = create_course_batch(test_type, student_type);
	}
	
	if(test_type == "TOEFL" && student_type=="SENIOR" && select_course == "user")
	{
		array_batch = array_toefl_senior;
		vHtml = create_course_user(test_type, student_type);
	}

	if(test_type == "TOEFL" && student_type=="JUNIOR" && select_course == "batch")
	{
		array_batch = array_toefl_junior;
		vHtml = create_course_batch(test_type, student_type);
	}

	if(test_type == "TOEFL" && student_type=="JUNIOR" && select_course == "user")
	{
		array_batch = array_toeic_junior;
		vHtml = create_course_user(test_type, student_type);
	}

	if(test_type == "TOEIC" && student_type=="SENIOR" && select_course == "batch")
	{
		array_batch = array_toeic_senior;
		vHtml = create_course_batch(test_type, student_type);
	}
	
	if(test_type == "TOEIC" && student_type=="SENIOR" && select_course == "user")
	{
		array_batch = array_toeic_senior;
		vHtml = create_course_user(test_type, student_type);
	}

	if(test_type == "TOEIC" && student_type=="JUNIOR" && select_course == "batch")
	{
		array_batch = array_toeic_junior;
		vHtml = create_course_batch(test_type, student_type);
	}

	if(test_type == "TOEIC" && student_type=="JUNIOR" && select_course == "user")
	{
		array_batch = array_toeic_junior;
		vHtml = create_course_user(test_type, student_type);
	}
	
	$("#dataList").html(vHtml);
}

function create_course_batch(test, student){
	var vHtml = "";
	var max_row = array_batch.length - 1;
	for(var i=0; i<array_batch.length; i++)
	{
		for(var j=0; j<array_batch.length; j++){
			//배치고사 기준
			//높은반
			if(i < max_row){
				vHtml += "<tr>";
				vHtml += "<td class='text-center'>";
				vHtml += "<input type='hidden' name='flag[]' value='N'>";
				vHtml += "<input type='hidden' name='test_type[]' value='"+test+"'>";
				vHtml += "<input type='hidden' name='student_type[]' value='"+student+"'>";
				vHtml += "<input type='hidden' name='base_batch_course[]' value='"+array_batch[i]+"'>";
				vHtml += array_batch[i]+"반";
				vHtml += "</td>";
				vHtml += "<td class='text-center'>";
				vHtml += "<input type='hidden' name='base_user_course[]' value='"+array_batch[j]+"'>";
				vHtml += array_batch[j]+"반";
				vHtml += "</td>";				
				vHtml += "<td class='text-center'>";
				vHtml += "<input type='hidden' name='select_course[]' value='batch'>";
				vHtml += "배치고사";
				vHtml += "</td>";				
				vHtml += "<td class='text-center'>";
				vHtml += "<input type='hidden' name='select_type[]' value='H'>";
				vHtml += "높은반";
				vHtml += "</td>";				
				vHtml += "<td class='text-center'>";
				vHtml += "<input type='hidden' name='finally_course[]' value='"+array_batch[i+1]+"'>";
				vHtml += array_batch[i+1]+"반";
				vHtml += "</td>";				
				vHtml += "<td class='with-form-control'>";
				vHtml += "<input type='text' class='form-control' name='video_url[]'> ";
				vHtml += "</td>";				
				vHtml += "</tr>";
			}
			//해당반
			vHtml += "<tr>";
			vHtml += "<td class='text-center'>";
			vHtml += "<input type='hidden' name='flag[]' value='N'>";
			vHtml += "<input type='hidden' name='test_type[]' value='"+test+"'>";
			vHtml += "<input type='hidden' name='student_type[]' value='"+student+"'>";
			vHtml += "<input type='hidden' name='base_batch_course[]' value='"+array_batch[i]+"'>";
			vHtml += array_batch[i]+"반";
			vHtml += "</td>";
			vHtml += "<td class='text-center'>";
			vHtml += "<input type='hidden' name='base_user_course[]' value='"+array_batch[j]+"'>";
			vHtml += array_batch[j]+"반";
			vHtml += "</td>";				
			vHtml += "<td class='text-center'>";
			vHtml += "<input type='hidden' name='select_course[]' value='batch'>";
			vHtml += "배치고사";
			vHtml += "</td>";				
			vHtml += "<td class='text-center'>";
			vHtml += "<input type='hidden' name='select_type[]' value='B'>";
			vHtml += "해당반";
			vHtml += "</td>";				
			vHtml += "<td class='text-center'>";
			vHtml += "<input type='hidden' name='finally_course[]' value='"+array_batch[i]+"'>";
			vHtml += array_batch[i]+"반";
			vHtml += "</td>";				
			vHtml += "<td class='with-form-control'>";
			vHtml += "<input type='text' class='form-control' name='video_url[]'> ";
			vHtml += "</td>";				
			vHtml += "</tr>";			
			//낮은반
			if(i > 0){
				vHtml += "<tr>";
				vHtml += "<td class='text-center'>";
				vHtml += "<input type='hidden' name='flag[]' value='N'>";
				vHtml += "<input type='hidden' name='test_type[]' value='"+test+"'>";
				vHtml += "<input type='hidden' name='student_type[]' value='"+student+"'>";
				vHtml += "<input type='hidden' name='base_batch_course[]' value='"+array_batch[i]+"'>";
				vHtml += array_batch[i]+"반";
				vHtml += "</td>";
				vHtml += "<td class='text-center'>";
				vHtml += "<input type='hidden' name='base_user_course[]' value='"+array_batch[j]+"'>";
				vHtml += array_batch[j]+"반";
				vHtml += "</td>";				
				vHtml += "<td class='text-center'>";
				vHtml += "<input type='hidden' name='select_course[]' value='batch'>";
				vHtml += "배치고사";
				vHtml += "</td>";				
				vHtml += "<td class='text-center'>";
				vHtml += "<input type='hidden' name='select_type[]' value='D'>";
				vHtml += "낮은반";
				vHtml += "</td>";				
				vHtml += "<td class='text-center'>";
				vHtml += "<input type='hidden' name='finally_course[]' value='"+array_batch[i-1]+"'>";
				vHtml += array_batch[i-1]+"반";
				vHtml += "</td>";				
				vHtml += "<td class='with-form-control'>";
				vHtml += "<input type='text' class='form-control' name='video_url[]'> ";
				vHtml += "</td>";				
				vHtml += "</tr>";				
			}
			//보유점수 기준
			
		}
	}
	
	return vHtml;
}

function create_course_user(test, student){
	var vHtml = "";
	var max_row = array_batch.length - 1;
	for(var i=0; i<array_batch.length; i++)
	{
		for(var j=0; j<array_batch.length; j++){
			//보유점수 기준
			//높은반
			if(j < max_row){
				vHtml += "<tr>";
				vHtml += "<td>";
				vHtml += "<input type='hidden' name='flag[]' value='N'>";
				vHtml += "<input type='hidden' name='test_type[]' value='"+test+"'>";
				vHtml += "<input type='hidden' name='student_type[]' value='"+student+"'>";
				vHtml += "<input type='hidden' name='base_batch_course[]' value='"+array_batch[i]+"'>";
				vHtml += array_batch[i];
				vHtml += "</td>";
				vHtml += "<td>";
				vHtml += "<input type='hidden' name='base_user_course[]' value='"+array_batch[j]+"'>";
				vHtml += array_batch[j];
				vHtml += "</td>";				
				vHtml += "<td>";
				vHtml += "<input type='hidden' name='select_course[]' value='batch'>";
				vHtml += "배치고사";
				vHtml += "</td>";				
				vHtml += "<td>";
				vHtml += "<input type='hidden' name='select_type[]' value='H'>";
				vHtml += "높은반";
				vHtml += "</td>";				
				vHtml += "<td>";
				vHtml += "<input type='hidden' name='finally_course[]' value='"+array_batch[j+1]+"'>";
				vHtml += array_batch[j+1];
				vHtml += "</td>";				
				vHtml += "<td class='with-form-control'>";
				vHtml += "<input type='text' class='form-control' name='video_url[]'> ";
				vHtml += "</td>";				
				vHtml += "</tr>";
			}
			//해당반
			vHtml += "<tr>";
			vHtml += "<td>";
			vHtml += "<input type='hidden' name='flag[]' value='N'>";
			vHtml += "<input type='hidden' name='test_type[]' value='"+test+"'>";
			vHtml += "<input type='hidden' name='student_type[]' value='"+student+"'>";
			vHtml += "<input type='hidden' name='base_batch_course[]' value='"+array_batch[i]+"'>";
			vHtml += array_batch[i];
			vHtml += "</td>";
			vHtml += "<td>";
			vHtml += "<input type='hidden' name='base_user_course[]' value='"+array_batch[j]+"'>";
			vHtml += array_batch[j];
			vHtml += "</td>";				
			vHtml += "<td>";
			vHtml += "<input type='hidden' name='select_course[]' value='batch'>";
			vHtml += "배치고사";
			vHtml += "</td>";				
			vHtml += "<td>";
			vHtml += "<input type='hidden' name='select_type[]' value='B'>";
			vHtml += "해당반";
			vHtml += "</td>";				
			vHtml += "<td>";
			vHtml += "<input type='hidden' name='finally_course[]' value='"+array_batch[j]+"'>";
			vHtml += array_batch[j];
			vHtml += "</td>";				
			vHtml += "<td class='with-form-control'>";
			vHtml += "<input type='text' class='form-control' name='video_url[]'> ";
			vHtml += "</td>";				
			vHtml += "</tr>";			
			//낮은반
			if(i > 0){
				vHtml += "<tr>";
				vHtml += "<td>";
				vHtml += "<input type='hidden' name='flag[]' value='N'>";
				vHtml += "<input type='hidden' name='test_type[]' value='"+test+"'>";
				vHtml += "<input type='hidden' name='student_type[]' value='"+student+"'>";
				vHtml += "<input type='hidden' name='base_batch_course[]' value='"+array_batch[i]+"'>";
				vHtml += array_batch[i];
				vHtml += "</td>";
				vHtml += "<td>";
				vHtml += "<input type='hidden' name='base_user_course[]' value='"+array_batch[j]+"'>";
				vHtml += array_batch[j];
				vHtml += "</td>";				
				vHtml += "<td>";
				vHtml += "<input type='hidden' name='select_course[]' value='batch'>";
				vHtml += "배치고사";
				vHtml += "</td>";				
				vHtml += "<td>";
				vHtml += "<input type='hidden' name='select_type[]' value='D'>";
				vHtml += "낮은반";
				vHtml += "</td>";				
				vHtml += "<td>";
				vHtml += "<input type='hidden' name='finally_course[]' value='"+array_batch[j-1]+"'>";
				vHtml += array_batch[j-1];
				vHtml += "</td>";				
				vHtml += "<td class='with-form-control'>";
				vHtml += "<input type='text' class='form-control' name='video_url[]'> ";
				vHtml += "</td>";				
				vHtml += "</tr>";				
			}
			//보유점수 기준
			
		}
	}
	
	return vHtml;
}
