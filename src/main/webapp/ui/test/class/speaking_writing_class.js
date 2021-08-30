var course_id;
var user_id;

var scheduleList;


var schedule_idx = 0;
var practice_problem_id;
var practice_schedule_id;
var section;
var practice_type="MOCK_TEST";
var book;
var volume;
var group;
var article;

var subject = "analysis";

var is_twelve = false;
var is_fiverules = false;

var page = 1;
var row_num = 15;

var week = [
	'일요일', 
	'월요일', 
	'화요일', 
	'수요일', 
	'목요일', 
	'금요일', 
	'토요일'
];

/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	$("input[name='radio_speking_book']").click(function(){
		search_speaking_list(1);
	});
	
	$("input[name='radio_writing_book']").click(function(){
		search_writing_list(1);
	});
	
	course_id = $("#course_id").val();
	user_id = $("#user_id").val();

	change_subject(subject);
	change_date();
	search_schedule();
    
});

function change_date(){
	var vDate = $("#search_date").val();
	var to_day = cfmGetToDate();
	if(vDate < to_day){
		$("#btn_next").attr("disabled", false);
	}else{
		$("#btn_next").attr("disabled", true);
	}
	var sDate = cfmGetDigit(vDate);
    var yy = parseInt(sDate.substr(0, 4), 10);
    var mm = parseInt(sDate.substr(4, 2), 10);
    var dd = parseInt(sDate.substr(6, 2), 10);

    var d = new Date(yy, mm - 1, dd);
    var w = d.getDay();
    $("#select_date_text").val(yy+"년 "+parseInt(mm)+"월"+parseInt(dd)+"일,"+week[w]);
    
}

function date_prev()
{
	var v_date = cfmAddDate($("#search_date").val(), -1);
	$("#search_date").val(v_date);
	change_date();
	search_reload();
}

function date_next()
{
	var v_date = cfmAddDate($("#search_date").val(), 1);
	$("#search_date").val(v_date);
	change_date();
	search_reload();
}

function search_reload()
{
	var to_day = cfmGetToDate();
	var v_search_date = $("#search_date").val();
	if(!v_search_date) v_search_date = to_day;
	var url = "/test/class/speaking_writing_class.do?";
	url += "course_id="+course_id;
	url += "&&section="+section;
	url += "&&user_id="+user_id;
	url += "&&date="+v_search_date;
	location.href=url;
}
/*
 * 설명 : 화면 사이즈 변경시 문제 영역 변경
 */
function resizeContents()
{
	//현재의 사이즈를 찾는다.
	var window_size = $(window).height();
	
	$(".cke_contents").height(window_size-350);

}

function change_subject(v_subject)
{
	if(v_subject == subject) return;
	
	$("."+subject).removeClass("btn-info");
	$("."+subject).addClass("btn-grey");
	$("."+v_subject).removeClass("btn-grey");
	$("."+v_subject).addClass("btn-info");
	$(".subject_content").hide();
	$("#subject_"+v_subject).show();
	
	subject = v_subject;
	create_subject();
	
}

function close_class()
{
	self.close();
}


/*
 * 설명 : 년/월 조회
 */
function search_schedule()
{

	$.ajax({
		type : "POST",
		url : "/test/class/getSpeakingWritingPracticeScheduleList.do",
		data:{
			course_id:$("#course_id").val(),
			date:$("#class_date").val(),
			practice_type:"MOCK_TEST"
		},
		success:function(data){
			var vHtml = "";
			scheduleList = data;
			for(var i=0; i<data.length; i++){
				var vTitle = "WR";
				if(data[i].section == "SPEAKING"){
					vTitle = "SP";
				}
				
				if(data[i].book) vTitle += " "+data[i].book;
				if(data[i].volume) vTitle += " "+data[i].volume;
				if(data[i].group) vTitle += " "+data[i].group;
				if(data[i].article) vTitle += "-"+data[i].article;
				
				if(data[i].section == "SPEAKING"){
					if(data[i].book == "task1"){
						vTitle += "(독립형)";		
					}else{
						vTitle += "(통합형)";
					}
				}else{
					if(data[i].book == "independent"){
						vTitle += "(독립형)";		
					}else{
						vTitle += "(통합형)";
					}
				}
				
				
				vHtml += "<option value='"+i+"'>"+vTitle+"</option>";
			}
			
			$("#search_schedule").html(vHtml);
			$('#search_schedule').change(function(e){
				schedule_idx = parseInt($('#search_schedule').val());
				practice_schedule_id = scheduleList[schedule_idx].id;
				practice_problem_id = scheduleList[schedule_idx].practice_problem_id;

				section = scheduleList[schedule_idx].section;
				book = scheduleList[schedule_idx].book;
				volume = scheduleList[schedule_idx].volume;
				group = scheduleList[schedule_idx].group;
				article = scheduleList[schedule_idx].article;
				
				create_subject();
			});
			schedule_idx = 0;
			practice_schedule_id = scheduleList[0].id;
			practice_problem_id = data[0].practice_problem_id;

			section = scheduleList[0].section;
			book = data[0].book;
			volume = data[0].volume;
			group = data[0].group;
			article = data[0].article;
			create_subject();
			
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function create_subject()
{
	resizeContents();
	eval("create_"+subject+"()");
}

function create_speaking_problem()
{
	search_speaking_list(1);
}

function search_speaking_list(vPage)
{
	page = vPage;
	$.ajax({
		type : "POST",
		url : "/exam/getExamSpeakingList.do",
		data:{
			section:"SPEAKING",
			book:$("input[name='radio_speking_book']:checked").val(),
			page:vPage,
			row_num:row_num
		},
		success:function(data){
			var total_count = data.speakingCount.total_count;
			var total_page = Math.ceil(total_count/row_num);
			
			var speakingList = data.speakingList;
			
			var vHtml = "";
			for(var i=0; i<speakingList.length; i++){
				var no = total_count - (row_num * (vPage-1)) - i;
				
				vHtml += "<tr>";
				vHtml += "<td class='text-center'>"+no+"</td>";
				vHtml += "<td class='text-center'>"+cfmNvl1(speakingList[i].book)+"</td>";
				vHtml += "<td class='text-center'>"+cfmNvl1(speakingList[i].article)+"</td>";
				vHtml += "<td>"+cfmNvl1(speakingList[i].question)+"</td>";
				vHtml += "<td class='with-btn text-center' nowrap=''>";
				vHtml += "	<button type='button' class='btn btn-sm btn-primary m-r-2' onclick='go_speaking_exam(\""+speakingList[i].id+"\")'>시험보기</button>";
				vHtml += "</td>";
				vHtml += "</tr>";
			}
			
			$("#speaking_list").html(vHtml);
			
			vHtml = cfmPage(10, vPage, total_page, "search_speaking_list");
			$("#speaking_page").html(vHtml);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function go_speaking_exam(v_id)
{
	window.open("/test/class/exam/speaking.do?id="+v_id, "exam");
}
function create_writing_problem()
{
	search_writing_list(1);
}

function search_writing_list(vPage)
{
	page = vPage;
	$.ajax({
		type : "POST",
		url : "/exam/getExamWritingList.do",
		data:{
			section:"WRITING",
			book:$("input[name='radio_writing_book']:checked").val(),
			page:vPage,
			row_num:row_num
		},
		success:function(data){
			var total_count = data.writingCount.total_count;
			var total_page = Math.ceil(total_count/row_num);
			
			var writingList = data.writingList;
			
			var vHtml = "";
			for(var i=0; i<writingList.length; i++){
				var no = total_count - (row_num * (vPage-1)) - i;
				
				vHtml += "<tr>";
				vHtml += "<td class='text-center'>"+no+"</td>";
				vHtml += "<td class='text-center'>"+cfmNvl1(writingList[i].book)+"</td>";
				vHtml += "<td class='text-center'>"+cfmNvl1(writingList[i].article)+"</td>";
				vHtml += "<td>"+cfmNvl1(writingList[i].question)+"</td>";
				vHtml += "<td class='with-btn text-center' nowrap=''>";
				vHtml += "	<button type='button' class='btn btn-sm btn-primary m-r-2' onclick='go_writing_exam(\""+writingList[i].id+"\")'>시험보기</button>";
				vHtml += "</td>";
				vHtml += "</tr>";
			}
			
			$("#writing_list").html(vHtml);
			
			vHtml = cfmPage(10, vPage, total_page, "search_writing_list");
			$("#writing_page").html(vHtml);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function go_writing_exam(v_id)
{
	window.open("/test/class/exam/writing.do?id="+v_id, "exam");
}

function create_analysis()
{
	search_analysis_list(1);
}

function search_analysis_list(vPage)
{
	page = vPage;
	
	var url = "/correction/getSpeakingCorrectionList.do";
	if(section == "WRITING") "/correction/getWritingCorrectionList.do";
	
	$.ajax({
		type : "POST",
		url : url,
		data:{
			section:"SPEAKING",
			practice_schedule_id:practice_schedule_id,
			page:vPage,
			row_num:row_num
		},
		success:function(data){
			var total_count = data.resultCount.total_count;
			var total_page = Math.ceil(total_count/row_num);
			
			var resultList = data.resultList;
			
			var vHtml = "";
			for(var i=0; i<resultList.length; i++){
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
				vHtml += "<a href='javascript:open_analysis("+resultList[i].id+")'>";
				vHtml += resultList[i].question;
				vHtml += "</a>";
				vHtml += "</td>";
				vHtml += "<td class='text-center'>"+resultList[i].date+"</td>";
				vHtml += "<td class='text-center'>"+resultList[i].user_username+"<br>"+resultList[i].user_name+"</td>";
				if(resultList[i].answer_student_pen_yn == "Y"){
					vHtml += "<td class='text-center text-success'>"+resultList[i].answer_student_pen_yn+"<br>"+resultList[i].answer_pen_date+"</td>";
				}else{
					vHtml += "<td class='text-center text-danger'>"+resultList[i].answer_student_pen_yn+"</td>";
				}
				
				if(resultList[i].answer_rublic_yn == "Y"){
					vHtml += "<td class='text-center text-success'>"+resultList[i].answer_rublic_score+"<br>"+resultList[i].answer_rublic_date+"<br>"+resultList[i].answer_rublic_name+"</td>";
				}else{
					vHtml += "<td class='text-center text-danger'>"+resultList[i].answer_rublic_yn+"</td>";
				}
				
				if(resultList[i].answer_correct_pen_yn == "Y"){
					vHtml += "<td class='text-center text-success'>"+resultList[i].answer_correct_pen_yn+"<br>"+resultList[i].answer_correct_pen_date+"<br>"+resultList[i].answer_correct_pen_name+"</td>";
				}else{
					vHtml += "<td class='text-center text-danger'>"+resultList[i].answer_correct_pen_yn+"</td>";
				}
				if(resultList[i].answer_student_note_yn == "Y"){
					vHtml += "<td class='text-center text-success'>"+resultList[i].answer_student_note_yn+"</td>";
				}else{
					vHtml += "<td class='text-center text-danger'>"+resultList[i].answer_student_note_yn+"</td>";
				}
				
				vHtml += "</tr>";
			}
			
			$("#analysis_list").html(vHtml);
			
			vHtml = cfmPage(10, vPage, total_page, "search_analysis_list");
			$("#analysis_page").html(vHtml);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function open_analysis(v_id)
{
	if(section == "WRITING")
	{
		window.open("/correction/correct/correct_writing.do?id="+v_id, "analysis");
	}else{
		window.open("/correction/correct/correct_speaking.do?id="+v_id, "analysis");
	}
	
}
var mp3_speaking_url = "https://s3.ap-northeast-2.amazonaws.com/usher.api.data.speaking/";
var mp3_writing_url = "https://s3.ap-northeast-2.amazonaws.com/usher.api.data.writing/";
var mp3_url;
function create_exam_script()
{
	mp3_url = mp3_writing_url;
	var url = "/correction/correct/getInternalExamsWritingAsArticle.do";
	if(section == "SPEAKING"){
		mp3_url = mp3_speaking_url;
		url = "/correction/correct/getInternalExamsSpeakingAsArticle.do";
	}
	$.ajax({
		type : "POST",
		url : url,
		data:{
			section:section,
			book:book,
			volume:volume,
			group:group,
			article:article
		},
		success:function(data){
			var question = cfmNvl1(data.question);
			question = question.replace(/\n/g, "<br>");//행바꿈제거
			question = question.replace(/\r/g, "<br>");//엔터제거
			$("#question").html(question);

			var title = "";
			if(section == "SPEAKING"){
				title = cfmNvl1(data.title);
				title = title.replace(/\n/g, "<br>");//행바꿈제거
				title = title.replace(/\r/g, "<br>");//엔터제거
			}
			$("#title").html(title);
			
			var passage = cfmNvl1(data.passage);
			passage = passage.replace(/\n/g, "<br>");//행바꿈제거
			passage = passage.replace(/\r/g, "<br>");//엔터제거
			$("#passage").html(passage);

			var sound_script = cfmNvl1(data.sound_script);
			sound_script = sound_script.replace(/\n/g, "<br>");//행바꿈제거
			sound_script = sound_script.replace(/\r/g, "<br>");//엔터제거
			$("#sound_script").html(sound_script);
			
			if(data.book == "integrated" || data.book == "task2"|| data.book == "task3"|| data.book == "task4"){
				var audio_url = mp3_url + data.book + "/" + data.article+".mp3";;
				$("#div_sound").html("<audio src='"+audio_url+"' style='width:100%;' controls>해당 브라우저는 audio 태그를 지원하지 않습니다.</audio>");
			}
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
	
	$.ajax({
		type : "POST",
		url : "/test/class/getPracticeProblemBoard.do",
		data:{
			practice_problem_id:practice_problem_id
		},
		success:function(data){
			var board = data.board;
			CKEDITOR.instances.white_editor_script.setData(board);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function save_exam_script()
{
	var board = CKEDITOR.instances.white_editor_script.getData();
	$.ajax({
		type : "POST",
		url : "/test/class/savePracticeProblemBoard.do",
		data:{
			practice_problem_id:practice_problem_id,
			board:board
		},
		success:function(data){
			alert("저장하였습니다.");
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}
function create_white_board()
{
	$.ajax({
		type : "POST",
		url : "/test/class/getPracticeProblemBoard.do",
		data:{
			practice_problem_id:practice_problem_id
		},
		success:function(data){
			var board = data.board;
			CKEDITOR.instances.white_editor_borad.setData(board);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function save_white_board()
{
	var board = CKEDITOR.instances.white_editor_borad.getData();
	$.ajax({
		type : "POST",
		url : "/test/class/savePracticeProblemBoard.do",
		data:{
			practice_problem_id:practice_problem_id,
			board:board
		},
		success:function(data){
			alert("저장하였습니다.");
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}
function create_twelve()
{
	if(is_twelve) return ;
	
	$.ajax({
		type : "POST",
		url : "/test/class/getSpeakingWritingTwelve.do",
		data:{
			
		},
		success:function(data){
			$("#div_twelve").html(data);
			is_twelve = true;
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function create_five_rules()
{
	if(is_fiverules) return;
	$.ajax({
		type : "POST",
		url : "/test/class/getSpeakingWritingFiveRules.do",
		data:{
			
		},
		success:function(data){
			$("#div_five_rules").html(data);
			is_fiverules = true;
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}