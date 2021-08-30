var array_test = [
	"READING",
	"LISTENING",
	"SPEAKING",
	"WRITING"
]

var array_fullset_test = [
	"READING",
	"LISTENING"
]
/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	(function($) {
		  $.fn.inputFilter = function(inputFilter) {
		    return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function() {
		      if (inputFilter(this.value)) {
		        this.oldValue = this.value;
		        this.oldSelectionStart = this.selectionStart;
		        this.oldSelectionEnd = this.selectionEnd;
		      } else if (this.hasOwnProperty("oldValue")) {
		        this.value = this.oldValue;
		        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
		      }
		    });
		  };
	}(jQuery));
	
	$("#mock_test_min").inputFilter(function(value) {
		  return /^\d*$/.test(value);
	});
	
	$("#mock_test_reading_min").inputFilter(function(value) {
		  return /^\d*$/.test(value);
	});
	
	$("#mock_test_listening_min").inputFilter(function(value) {
		  return /^\d*$/.test(value);
	});
	
	$("#mock_test_writing_min").inputFilter(function(value) {
		  return /^\d*$/.test(value);
	});
	
	$("#mock_test_speaking_min").inputFilter(function(value) {
		  return /^\d*$/.test(value);
	});
	
	$("#mock_test_reading_min").change(function(e){
		sum_minute();
	});			
	$("#mock_test_listening_min").change(function(e){
		sum_minute();
	});			
	$("#mock_test_writing_min").change(function(e){
		sum_minute();
	});			
	$("#mock_test_speaking_min").change(function(e){
		sum_minute();
	});	
	
	search_semester();
});

function sum_minute()
{
	var total_score = 0;
	total_score += parseInt(cfmNullToZero($("#mock_test_reading_min").val()));
	total_score += parseInt(cfmNullToZero($("#mock_test_listening_min").val()));
	total_score += parseInt(cfmNullToZero($("#mock_test_writing_min").val()));
	total_score += parseInt(cfmNullToZero($("#mock_test_speaking_min").val()));
	
	$("#mock_test_min").val(cfmZeroSpace(total_score));
}

function sum_minute_exam()
{
	var listening = 0;
	var reading = 0;
	var writting = 0;
	var speaking = 0;
	var $el_section            = $("input[name^=section]");
	var $el_mock_test_exam_min  = $("input[name^=mock_test_exam_min]");
	$el_section.each(function(index) {
		var section       = $el_section.eq(index).val();
		var mock_test_exam_min = parseInt(cfmNullToZero($el_mock_test_exam_min.eq(index).val()));

		if(section == "READING"){
			reading = reading + mock_test_exam_min;
		}else if(section == "LISTENING"){
			listening = listening + mock_test_exam_min;
		}else if(section == "WRITING"){
			writting = writting + mock_test_exam_min;
		}else if(section == "SPEAKING"){
			speaking = speaking + mock_test_exam_min;
		}
		$("#mock_test_reading_min").val(cfmZeroSpace(reading));
		$("#mock_test_listening_min").val(cfmZeroSpace(listening));
		$("#mock_test_writing_min").val(cfmZeroSpace(writting));
		$("#mock_test_speaking_min").val(cfmZeroSpace(speaking));
	});
	sum_minute();
}
/*
 * 설명 : 년/월 조회
 */
function search_semester()
{

	$.ajax({
		type : "POST",
		url : "/common/getSemesterList.do",
		data:{
		},
		success:function(data){
			var vHtml = "";
			var to_month = cfmGetToMonth();

			for(var i=0; i<data.length; i++){
				var selected = "";
				if(to_month == data[i].date) selected = "selected";
				vHtml += "<option value='"+data[i].id+"' "+selected+">"+data[i].date+"</option>";
			}
			
			$("#search_semester_id").html(vHtml);
			
			$('#search_semester_id').change(function(e){
				search_course_group();
			});
			
			$('#search_test_type').change(function(e){
				search_course_group();
			});
			
			search_course_group();

		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

/*
 * 설명 : 반 그룹 조회
 */
function search_course_group()
{
	$.ajax({
		type : "POST",
		url : "/common/getCoursegroupList.do",
		data:{
			semester_id:$("#search_semester_id").val(),
			test_type:$("#search_test_type").val()
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				vHtml += "<option value='"+data[i].id+"'>"+data[i].name+"</option>";
			}
			
			if(data.length == 0){
				vHtml = "<option value=''>반 그룹</option>";
			}
			
			$("#search_course_group_id").html(vHtml);
			
			$('#search_course_group_id').change(function(e){
				if($("#search_course_group_id").val()){
					search_course();
				}else{
					$("#search_course_id").html("<option>반</option>");				
				}
			});
			
			if(data.length > 0){
				search_course();
			}else{
				$("#search_course_id").html("<option>반</option>");		
			}

		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

/*
 * 설명 : 반 조회.
 */
function search_course()
{
	$.ajax({
		type : "POST",
		url : "/common/getCourseList.do",
		data:{
			course_group_id:$("#search_course_group_id").val()
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				vHtml += "<option value='"+data[i].id+"'>"+data[i].name+"</option>";
			}
			if(data.length == 0){
				vHtml = "<option value=''>반</option>";
			}
			$("#search_course_id").html(vHtml);
			
			init_form();
			/*
			$('#search_course_id').change(function(e){
				if($("#search_course_id").val()){
					search_student();
				}
			});
			
			if(data.length > 0){
				search_student();
			}
			*/
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

var current_idx = 1;
function init_form()
{
	current_idx = 1;
	$("#mock_test_min").html("");
	$("#mock_test_reading_min").html("");
	$("#mock_test_listening_min").html("");
	$("#mock_test_writing_min").html("");
	$("#mock_test_speaking_min").html("");
	$("#dataList").html("");
	
}

var section = "";
var book = "";
var volume = "";
var group = "";
var article = "";

function add_form()
{
	section = "";
	book = "";
	volume = "";
	group = "";
	article = "";
	do_section();
	$("#modal-mock").modal();
}

function add_exam()
{
	section = $("#section").val();
	book = $("#book").val();
	volume = $("#volume").val();
	group = $("#group").val();
	article = $("#article").val();
	if(!article){
		alert("지문을 선택하세요.");
		return;
	}
	var article_text = article;
	if(article == "0"){
		article_text = "full set";
	}
	var vHtml = "";
	vHtml += '<tr id="data_'+current_idx+'">';
	vHtml += '<td>';
	vHtml += '	<input type="hidden" name="section[]" value="'+section+'">';
	vHtml += section;
	vHtml += '</td>';
	vHtml += '<td>';
	vHtml += '	<input type="hidden" name="book[]" value="'+book+'">';
	vHtml += book;
	vHtml += '</td>';
	vHtml += '<td>';
	vHtml += '	<input type="hidden" name="volume[]" value="'+volume+'">';
	vHtml += volume;
	vHtml += '</td>';
	vHtml += '<td>';
	vHtml += '	<input type="hidden" name="group[]" value="'+group+'">';
	vHtml += group;
	vHtml += '</td>';
	vHtml += '<td>';
	vHtml += '	<input type="hidden" name="article[]" value="'+article+'">';
	vHtml += article_text;
	vHtml += '</td>';
	vHtml += '<td>';
	vHtml += '	<input type="text" class="form-control" name="mock_test_exam_min[]">';
	vHtml += '</td>';
	vHtml += '<td class="with-btn" nowrap>';
	vHtml += '	<button type="button" onclick="delete_exam('+current_idx+')" class="btn btn-sm btn-primary width-60 m-r-2">삭제</button>';
	vHtml += '</td>';	
	vHtml += '</tr>';
	$("#dataList").append(vHtml);
	
	current_idx++;
	
	$("input[name^=mock_test_exam_min]").change(function(e){
		sum_minute_exam();
	});	
	
	$("#modal-mock").modal("hide");
}

function delete_exam(idx)
{
	$("#data_"+idx).remove();
	sum_minute_exam();
}
/*
*
* 설명 : 년/월 조회
*/
function do_section()
{

	$.ajax({
		type : "POST",
		url : "/common/getProblemSectionList.do",
		data:{
			
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				var idx = array_test.indexOf(data[i].section);
				if(idx >= 0)
				{
					var selected = "";
					if(data[i].section == section) selected = "selected";
					vHtml += "<option value='"+data[i].section+"' "+selected+">"+data[i].section+"</option>";
				}
			}
			
			$("#section").html('<option value="">선택</option>'+vHtml);
			section = "";
			$('#section').change(function(e){
				do_book();
			});	
			do_book();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

/*
* 설명 : 년/월 조회
*/
function do_book()
{

	$.ajax({
		type : "POST",
		url : "/common/getProblemBookList.do",
		data:{
			section:$('#section').val()
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				var selected = "";
				if(data[i].book == book) selected = "selected";
				vHtml += "<option value='"+data[i].book+"' "+selected+">"+data[i].book+"</option>";
			}
			
			$("#book").html('<option value="">선택</option>'+vHtml);
			book = "";
			$('#book').change(function(e){
				do_volume();
			});	
			do_volume();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

/*
* 설명 : 년/월 조회
*/
function do_volume()
{

	$.ajax({
		type : "POST",
		url : "/common/getProblemVolumeList.do",
		data:{
			section:$('#section').val(),
			book:$('#book').val()
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				var selected = "";
				if(data[i].volume == volume) selected = "selected";
				
				vHtml += "<option value='"+data[i].volume+"' "+selected+">"+data[i].volume+"</option>";
			}
			
			$("#volume").html('<option value="">선택</option>'+vHtml);
			volume = "";
			$('#volume').change(function(e){
				do_group();
			});	
			do_group();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

/*
* 설명 : 년/월 조회
*/
function do_group()
{

	$.ajax({
		type : "POST",
		url : "/common/getProblemGroupList.do",
		data:{
			section:$('#section').val(),
			book:$('#book').val(),
			volume:$('#volume').val()
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				var selected = "";
				if(data[i].group == group) selected = "selected";
				
				vHtml += "<option value='"+data[i].group+"' "+selected+">"+data[i].group+"</option>";
			}
			
			$("#group").html('<option value="">선택</option>'+vHtml);
			group = "";
			$('#group').change(function(e){
				do_article();
			});	
			do_article();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

/*
* 설명 : 년/월 조회
*/
function do_article()
{

	$.ajax({
		type : "POST",
		url : "/common/getProblemArticleList.do",
		data:{
			section:$('#section').val(),
			book:$('#book').val(),
			volume:$('#volume').val(),
			group:$('#group').val()
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				var selected = "";
				if(data[i].article == article) selected = "selected";
				
				vHtml += "<option value='"+data[i].article+"' "+selected+">"+data[i].article+"</option>";
			}
			if(data.length>0)
			{
				var idx = array_fullset_test.indexOf($('#section').val());
				if(idx >= 0)
				{
					$("#article").html('<option value="0">full set</option>'+vHtml);
				}else{
					$("#article").html(vHtml);

				}
			}else{
				$("#article").html('<option value="">선택</option>');
			}
			
			article = "";
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

var exam_time;
var timerID;
function start_form()
{
	if(!$("#mock_test_min").val()){
		alert("시험시간을 설정하세요.");
		return;
	}
	
	var array_exam = Array();
	
	var $el_section  = $("input[name^=section]");
	var $el_book     = $("input[name^=book]");
	var $el_volume   = $("input[name^=volume]");
	var $el_group    = $("input[name^=group]");
	var $el_article  = $("input[name^=article]");
	var $el_mock_test_exam_min  = $("input[name^=mock_test_exam_min]");
	var nCnt = 0;
	
	$el_section.each(function(index) {
		var objExam = Object();
		objExam.section = $(this).val();
		objExam.book    = $el_book.eq(index).val();
		objExam.volume  = $el_volume.eq(index).val();
		objExam.group   = $el_group.eq(index).val();
		objExam.article = $el_article.eq(index).val();
		objExam.mock_test_exam_min = cfmNullToZero($el_mock_test_exam_min.eq(index).val());
		
		array_exam.push(objExam);
		nCnt++;
	});
	
	if(nCnt == 0){
		alert("시험 지문을 선택하세요.");
		return;
	}
	//console.log(array_exam);
	
	 $.ajax({
		type : "POST",
		url : "/test/saveMockTestSchedule.do",
		data:{
			mock_test_min:cfmNullToZero($("#mock_test_min").val()),
			mock_test:true,
			mock_test_reading_min:cfmNullToZero($("#mock_test_reading_min").val()),
			mock_test_listening_min:cfmNullToZero($("#mock_test_listening_min").val()),
			mock_test_writing_min:cfmNullToZero($("#mock_test_writting_min").val()),
			mock_test_speaking_min:cfmNullToZero($("#mock_test_speaking_min").val()),
			course_id:$("#search_course_id").val(),
			data_value:JSON.stringify(array_exam)
		},
		success:function(data){
			
			exam_time = parseInt($("#mock_test_min").val()) * 60;
			timerID = setInterval("decrement_time()", 1000);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
	
}

function decrement_time()
{
	var min;
	var sec;
	
	// 정수로부터 남은 시, 분, 초 단위 계산
	hour = Math.floor(exam_time / 3600);
	min = Math.floor( (exam_time-(hour*3600)) / 60 );
	sec = exam_time - (hour*3600) - (min*60);
	
	if(hour < 10) hour = "0" + hour;
	if(min < 10) min = "0" + min;
	if(sec < 10) sec = "0" + sec;
	
	$('#timer').html(hour + ":" + min + ":" + sec);
	
	if(exam_time > 0)
	{
		exam_time--;
	}else{
		clearInterval(timerID);
		alert("시험 종료");
	}
}