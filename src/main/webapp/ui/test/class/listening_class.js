var scheduleList;
var course_id;
var user_id;
var section;
var practice_type="MOCK_TEST";
var subject = "analysis";

var schedule_idx = 0;
var practice_problem_id;
var book;
var volume;
var group;
var article;

var examInfo;
var questionList;

var listening_question;
var exam_question_idx;
var exam_question_count;

var question_type = {
		MA:"Main Idea",
		DE:"Detail",
		IN:"Inferenc",
		CA:"Category"
	};

var week = [
	'일요일', 
	'월요일', 
	'화요일', 
	'수요일', 
	'목요일', 
	'금요일', 
	'토요일'
];

var mp3_url = "https://s3.ap-northeast-2.amazonaws.com/usher.api.data.listening/";
/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	course_id = $("#course_id").val();
	user_id = $("#user_id").val();
	section = $("#section").val();
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
	var url = "/test/class/listening_class.do?";
	url += "course_id="+course_id;
	url += "&&section="+section;
	url += "&&user_id="+user_id;
	url += "&&date="+v_search_date;
	location.href=url;
}

var audio;

$(document).keydown(function(e) {
	if(!audio) return;
	
    var unicode = e.charCode ? e.charCode : e.keyCode;
      // right arrow
    if (unicode == 39) {
      audio.currentTime += 1;
      // back arrow
    } else if (unicode == 37) {
      audio.currentTime -= 1;
      // spacebar
    } else if (unicode == 32) {
      if (audio.paused) {
        audio.play();
      } 
      else {
        audio.pause()
      }
    }
  });

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
		url : "/test/class/getListeningPracticeScheduleList.do",
		data:{
			course_id:$("#course_id").val(),
			section:$("#section").val(),
			date:$("#class_date").val(),
			practice_type:"MOCK_TEST"
		},
		success:function(data){
			var vHtml = "";
			scheduleList = data;
			for(var i=0; i<data.length; i++){
				var vTitle = data[i].book;
				if(data[i].volume) vTitle += " "+data[i].volume;
				if(data[i].group) vTitle += " "+data[i].group;
				if(data[i].article) vTitle += " "+data[i].article;
				if(data[i].short_title) vTitle += " : "+data[i].short_title;
				
				vHtml += "<option value='"+i+"'>"+vTitle+"</option>";
			}
			
			$("#search_schedule").html(vHtml);
			$('#search_schedule').change(function(e){
				schedule_idx = parseInt($('#search_schedule').val());
				book = scheduleList[schedule_idx].book;
				volume = scheduleList[schedule_idx].volume;
				group = scheduleList[schedule_idx].group;
				article = scheduleList[schedule_idx].article;
				practice_problem_id = scheduleList[schedule_idx].practice_problem_id;
				
				exam_question_idx = 0;
				search_listening_exam();
			});
			book = data[0].book;
			volume = data[0].volume;
			group = data[0].group;
			article = data[0].article;
			practice_problem_id = data[0].practice_problem_id;
			
			search_listening_exam();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function search_listening_exam()
{
	$.ajax({
		type : "POST",
		url : "/test/class/getListeningExamInfo.do",
		data:{
			section:section,
			book:book,
			volume:volume,
			group:group,
			article:article
		},
		success:function(data){
			examInfo = data.examInfo;
			questionList = data.questionList;
			exam_question_idx = 0;
			exam_question_count = questionList.length;
			create_subject();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
	
	
}

var sort_type = "listening_sort3";
var sort_id = "accept_rate";
var sort_asc = "desc";

function change_subject(v_subject)
{
	if(v_subject == subject) return;
	
	exam_question_idx = 0;
	$("."+subject).removeClass("btn-info");
	$("."+subject).addClass("btn-grey");
	$("."+v_subject).removeClass("btn-grey");
	$("."+v_subject).addClass("btn-info");
	
	subject = v_subject;
	create_subject();
}

function create_subject()
{
	sort_type = "listening_sort3";
	sort_id = "accept_rate";
	sort_asc = "desc";
	
	$("#listening_button").hide();
	if(subject == "analysis"){
		create_analysis();
	}else if(subject == "passage"){
		create_passage();
	}else if(subject == "exam"){
		create_exam();
	}else if(subject == "dictation"){
		create_dictation();
	}
}

//분석
function create_analysis()
{
	audio = null;
	$.ajax({
		type : "POST",
		url : "/test/class/getExamsListeningQuestionCourseList.do",
		data:{
			course_id:course_id,
			practice_problem_id:practice_problem_id,
			sort_id:sort_id,
			sort_asc:sort_asc
		},
		success:function(data){
			var vHtml = "";
			
			vHtml += '<div id="content" class="container" style="width:1019px;height:678px;border:1px solid #000;padding:0;margin-top:20px;">';
			vHtml += '	<div style="width:100%;height:678px;overflow-x:hidden;overflow-y:auto;padding:10px;">';
			vHtml += '<div class="table-responsive mt-2">';
			vHtml += '	<table class="table table-bordered m-b-0">';
			vHtml += '		<colgroup>';
			vHtml += '			<col style="width:10%;" />';
			vHtml += '			<col style="width:15%;" />';
			vHtml += '			<col style="width:10%;" />';
			vHtml += '			<col style="width:10%;" />';
			vHtml += '			<col style="width:15%;" />';
			vHtml += '			<col style="width:40%;" />';
			vHtml += '		</colgroup>';
			vHtml += '		<thead>';
			vHtml += '			<tr>';
			vHtml += '				<th class="listening_sort listening_sort1 text-center bg-black-transparent-5 text-white"><input type="hidden" name="sort_type" value="listening_sort1">문제번호<span class="show_sort"></span></th>';
			vHtml += '				<th class="listening_sort listening_sort2 text-center bg-black-transparent-5 text-white"><input type="hidden" name="sort_type" value="listening_sort2">문제유형<span class="show_sort"></span></th>';
			vHtml += '				<th class="listening_sort listening_sort3 text-center bg-black-transparent-5 text-white"><input type="hidden" name="sort_type" value="listening_sort3">정답률<span class="show_sort"></span></th>';
			vHtml += '				<th class="text-center bg-black-transparent-5 text-white">보기</th>';
			vHtml += '				<th class="listening_sort listening_sort4 text-center bg-black-transparent-5 text-white"><input type="hidden" name="sort_type" value="listening_sort4">틀린 학생 수(%)<span class="show_sort"></span></th>';
			vHtml += '				<th class="listening_sort listening_sort5 text-center bg-black-transparent-5 text-white"><input type="hidden" name="sort_type" value="listening_sort5">틀린 학생<span class="show_sort"></span></th>';
			vHtml += '			</tr>';
			vHtml += '		</thead>';
			vHtml += '		<tbody>';
			for(var i=0;i<data.length; i++)
			{
				vHtml += '			<tr>';
				vHtml += '				<td class="text-center">'+data[i].question_num+'</td>';
				vHtml += '				<td class="text-center">'+question_type[data[i].question_type]+'</td>';
				vHtml += '				<td class="text-center">'+data[i].accept_rate+'%</td>';
				vHtml += '				<td class="text-center">';
				vHtml += "					<button type='button' class='btn btn-sm btn-primary m-r-2' onclick='move_question("+data[i].question_num+")'>다시보기</a>";
				vHtml += '				</td>';
				vHtml += '				<td class="text-center">'+data[i].fail_count+'/'+data[i].total_count+'('+data[i].fail_rate+'%)</td>';
				vHtml += '				<td class="text-center">'+data[i].fail_users+'</td>';
				vHtml += '			</tr>';
			}
			vHtml += '		</tbody>';
			vHtml += '	</table>';
			vHtml += '</div>';
			vHtml += '</div>';
			vHtml += '</div>';
			$("#listening_content").html(vHtml);
			
			$(".listening_sort").css("cursor","pointer");
			$(".listening_sort").click(function(){
				var v_sort_type = $(this).find("input[name='sort_type']").val();
				if(v_sort_type == sort_type){
					if(sort_asc == "asc"){
						sort_asc = "desc";
					}else{
						sort_asc = "asc";
					}
				}else{
					sort_type = v_sort_type;
					sort_asc = "asc";
					if(sort_type == "listening_sort1"){
						sort_id = "question_num";
					}else if(sort_type == "listening_sort2"){
						sort_id = "question_type";
					}else if(sort_type == "listening_sort3"){
						sort_id = "accept_rate";
					}else if(sort_type == "listening_sort4"){
						sort_id = "fail_count";
					}else if(sort_type == "listening_sort5"){
						sort_id = "fail_users";
					}
				}
				create_analysis();
			});
			if(sort_asc == "asc"){
				$("."+sort_type).find(".show_sort").html('▲');
			}else{
				$("."+sort_type).find(".show_sort").html('▼');
			}
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
	
}

function move_question(question_num)
{
	$(".analysis").removeClass("btn-info");
	$(".analysis").addClass("btn-grey");
	$(".exam").removeClass("btn-grey");
	$(".exam").addClass("btn-info");
	
	subject = "exam";
	exam_question_idx = question_num -1;
	create_exam();
}

function create_passage()
{
	var passage_audio_url = mp3_url + examInfo.volume + "/" + examInfo.group + "/" + examInfo.article+"/passage.mp3";

	var vHtml = "";
	vHtml += '<div id="content" class="container" style="width:1019px;height:678px;border:1px solid #000;padding:0;margin-top:20px;">';
	vHtml += '	<div  style="margin:50px 50px 30px 180px;padding:20px;width:640px;border:1px solid #000;text-align:center">';
	vHtml += '		<img src="/common/exam/images/'+examInfo.image+'.jpeg" style="width:599px;height:452px;border:1px solid #000;">';
	vHtml += '	</div>';
	vHtml += '	<div style="margin-top:10px;text-align:center;">';
	vHtml += '		<audio controls src="'+passage_audio_url+'" style="width:90%;"></audio>';
	vHtml += '	</div>';
	vHtml += '</div>';
	$("#listening_content").html(vHtml);
	
	audio = $("audio")[0];
}

function create_dictation()
{
	$.ajax({
		type : "POST",
		url : "/test/class/getDictationOne.do",
		data:{
			section:examInfo.section,
			book:examInfo.book,
			volume:examInfo.volume,
			group:examInfo.group,
			article:examInfo.article
		},
		success:function(data){
			var vHtml = "";
			vHtml += '<div id="content" class="container" style="width:1019px;height:678px;border:1px solid #000;padding:20px;margin-top:20px;overflow-y:auto;">';
			var note_all = data.contents.split('\n');
			var t = '';
			for(var each_row in note_all){
				if(note_all[each_row]=='' || note_all[each_row]==' '){
					//console.log(note_all[each_row],'1111');
					continue;
				}
				var row_num = parseInt(each_row)+1;
				vHtml += row_num+") "+note_all[each_row].trim();
				vHtml += '&nbsp;&nbsp;<a href="javascript:dictation_play('+row_num+')" class="btn btn-inverse btn-icon btn-circle btn-sm">';
				vHtml += '	<i class="fa fa-volume-up"></i>';
				vHtml += '</a>';
				if(each_row != note_all.length-1){
					vHtml += '<br /><br />';
				}
			}
			vHtml += '</div>';
			$("#listening_content").html(vHtml);
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
	
}

var audioFile;
function dictation_play(nNum)
{
	if(audioFile) audioFile.pause();
	
	var audio_url = "https://s3.ap-northeast-2.amazonaws.com/usher.api.data.listening/dictation/"+examInfo.volume+"/"+examInfo.group+"/"+examInfo.article+"/"+nNum+".mp3";
	audioFile = new Audio(audio_url);
	
	audioFile.play();
}
var is_show_answer = false;

function create_exam()
{
	
	is_show_answer = false;
	var passage_audio_url = mp3_url + examInfo.volume + "/" + examInfo.group + "/" + examInfo.article+"/passage.mp3";

	var vHtml = "";

	vHtml += '<div class="container" style="width:1300px;height:678px;border:1px solid #000;padding:0;">'
	vHtml += '	<div id="content" style="float:left;width:50%;height:678px;padding:20px;overflow-x:hidden;overflow-y:auto;">';
	vHtml += '		<p id="qustion" style="font-size:16px;margin-bottom:20px;"></p>';
	vHtml += '		<div id="div_answer"style="font-size:16px;">';
	vHtml += '		</div>';
	vHtml += '	</div>';
	vHtml += '	<div style="float:left;width:50%;height:678px;border-left:1px solid #000;overflow-x:hidden;overflow-y:auto;padding:5px;">';
	vHtml += '		<img src="/common/exam/images/'+examInfo.image+'.jpeg" style="margin-top:50px;width:574px;height:452px;border:1px solid #000;">';
	vHtml += '		<div style="margin-top:10px;text-align:center;">';
	vHtml += '			<audio controls src="'+passage_audio_url+'" style="width:90%;"></audio>';
	vHtml += '		</div>';
	vHtml += '	</div>';		
	vHtml += '</div>'
	$("#listening_content").html(vHtml);
	$("#listening_button").show();
	go_question();
	audio = $("audio")[0];
}

function click_exam_prev()
{
	is_show_answer = false;
	exam_question_idx--;
	go_question();

}

function click_exam_next()
{
	is_show_answer = false;
	exam_question_idx++;
	go_question();
}

function click_exam_show_answer()
{
	is_show_answer = true;
	go_question();
}

function click_exam_sound()
{
	var question_num = listening_question.question_num;
	var audio_url = mp3_url + examInfo.volume + "/" + examInfo.group + "/" + examInfo.article+"/question_"+question_num+".mp3";
	var audioFile = new Audio(audio_url);
	audioFile.play();	
}

function click_repeat_sound()
{
	var question_num = listening_question.question_num;
	var audio_url = mp3_url + examInfo.volume + "/" + examInfo.group + "/" + examInfo.article+"/question_"+question_num+"_repeat.mp3";
	var audioFile = new Audio(audio_url);
	audioFile.play();	
}


function go_question()
{
	if(exam_question_idx == 0)
	{
		$("#btn_prev").hide();
	}else{
		$("#btn_prev").show();
	}

	if(exam_question_idx == (exam_question_count-1))
	{
		$("#btn_next").hide();
	}else{
		$("#btn_next").show();
	}

	$("#listening_review_question").html("Question ("+(exam_question_idx+1)+"/"+exam_question_count+")");
	$.ajax({
		type : "POST",
		url : "/test/class/getListeningExamQuestionReview.do",
		data:{
			listening_id:questionList[exam_question_idx].listening_id,
			question_num:questionList[exam_question_idx].question_num,
			course_id:course_id,
			practice_problem_id:practice_problem_id
		},
		success:function(data){	
			if(data.category == "C")
			{
				$("#btn_repeat_sound").show();
			}else{
				$("#btn_repeat_sound").hide();
			}
			listening_question = data;
			
			create_answer();
			var category = listening_question.category;
			
			var useranswer  = cfmNvl1(listening_question.answer);
			var useranswer1 = cfmNvl1(listening_question.answer1);
			var useranswer2 = cfmNvl1(listening_question.answer2);
			var useranswer3 = cfmNvl1(listening_question.answer3);
			var answer = cfmNvl1(listening_question.answer);
			var answer1 = cfmNvl1(listening_question.answer1);
			var answer2 = cfmNvl1(listening_question.answer2);
			var answer3 = cfmNvl1(listening_question.answer3);
			if(category == "A"){
				if(is_show_answer){
					$('#answer_'+useranswer.toLowerCase()).prop("checked", true);
				}
			}else if(category == "B"){
				if(is_show_answer){
					var tmpAnsArr=useranswer.split("|");
					for(var i=0; i<tmpAnsArr.length;i++) {
						var aid = '#answer_'+tmpAnsArr[i].toLowerCase();
						$(aid).prop("checked", true);
					}
				}
			}else if(category == "C"){
				if(is_show_answer){
					$('#answer_'+useranswer.toLowerCase()).prop("checked", true);
				}
			}else if(category == "D"){
				if(is_show_answer){
					var tmpAnsArr=useranswer.split("|");
					if(tmpAnsArr && tmpAnsArr.length > 0) {
						  for(var i=0; i<tmpAnsArr.length; i++) { //added loop line 190119
								var j=i+1;
							  if(tmpAnsArr[i] != "" && tmpAnsArr[i] != null) {
								  $('#a'+j).val(tmpAnsArr[i]); //hidden field value set
								  var txt= $('#'+tmpAnsArr[i]).text();
								  $('#d'+j).html(txt);
							  }
						  
						  } //added loop line
					  }
				}
			}else if(category == "E"){
				if(is_show_answer){
					var tmpAnsArr=useranswer.split("|");
					var tmpAnsArr1=useranswer1.split("|");
					var tmpAnsArr2=useranswer2.split("|");
					var tmpAnsArr3=useranswer3.split("|");
					for(var i=0; i<tmpAnsArr.length; i++)
					{
						$("#answer_"+tmpAnsArr[i].toLowerCase()+"_1").prop("checked", true);
					}
					
					for(var i=0; i<tmpAnsArr1.length; i++)
					{
						$("#answer_"+tmpAnsArr1[i].toLowerCase()+"_2").prop("checked", true);
					}
					
					for(var i=0; i<tmpAnsArr2.length; i++)
					{
						$("#answer_"+tmpAnsArr2[i].toLowerCase()+"_3").prop("checked", true);
					}
					
					for(var i=0; i<tmpAnsArr3.length; i++)
					{
						$("#answer_"+tmpAnsArr3[i].toLowerCase()+"_4").prop("checked", true);
					}
				}
			}
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function create_answer()
{
	$("#qustion").html(listening_question.question);
	$("#div_answer").html("");
	if(listening_question.category == "A")
	{
		$("#div_answer").html(create_answer_a());
	}else if(listening_question.category == "B"){
		$("#div_answer").html(create_answer_b());
	}else if(listening_question.category == "C"){
		$("#div_answer").html(create_answer_c());
	}else if(listening_question.category == "D"){
		$("#div_answer").html(create_answer_d());
	}else if(listening_question.category == "E"){
		$("#div_answer").html(create_answer_e());
	}
}

function create_answer_a()
{
	var answer = listening_question.answer;
	var total_count = listening_question.total_count;
	var accept_count = listening_question.accept_count;
	
	var arr_choices = ["a","b","c","d","e","f","g","h","i"];
	var vHtml = "";
	for(var i=0; i<arr_choices.length; i++)
	{
		var choice = "choice_"+arr_choices[i];
		if(listening_question[choice]){
			var select_count = listening_question["answer_count_"+arr_choices[i]];
			var rate = select_count / total_count * 100;
			
			var v_title = "";
			if(is_show_answer){
				v_title = "선택률("+cfmRemoveZeroToFloat(rate)+")% ";
				if(select_count > 0)
				{
					v_title += " ["+arr_choices[i].toUpperCase()+":"+select_count+"/"+total_count+"]";
				}
				var style = "";
				if(arr_choices[i].toUpperCase() == answer)
				{
					style = "border:solid 1px #ff0004;";
				}
			}
			vHtml += '<div class="form-check" style="padding-bottom:10px;'+style+'">';
			vHtml += '	<input class="form-check-input" type="radio" name="answer" id="answer_'+arr_choices[i]+'" value="'+arr_choices[i].toUpperCase()+'" disabled>';
			vHtml += '	<label class="form-check-label" for="answer_'+arr_choices[i]+'" style="color:#000;">'+listening_question[choice]+'</label>';
			vHtml += '	<p style="color:#ff0004;margin-bottom:0px;">'+v_title+'</p>';
			vHtml += '</div>';
		}
	}
	var total_rate = accept_count / total_count * 100;
	if(is_show_answer){
		vHtml += '<p style="margin:10px 0 0 5px;font-weight:bold;font-size:0.9em;text-align:right;">정답률('+cfmRemoveZeroToFloat(total_rate)+')%</p>';
	}
	
	return vHtml;
}

function create_answer_b()
{
	var answer = listening_question.answer;
	var answerArr=answer.split("|");
	var total_count = listening_question.total_count;
	var accept_count = listening_question.accept_count;
	
	var arr_choices = ["a","b","c","d","e","f","g","h","i"];
	var arr_answer = listening_question.answer.split("|");
	
	var vHtml = "";
	vHtml += '<p id="answer_txt" style="font-size:16px;background-color:#dddddd;color:#333;margin-top:25px;margin-bottom:25px;padding:5px;text-align:center;margin-left:150px;margin-right:180px;">';
	vHtml += 'Click on '+arr_answer.length+' answer';
	vHtml += '</p>';
	for(var i=0; i<arr_choices.length; i++)
	{
		var choice = "choice_"+arr_choices[i];
		if(listening_question[choice]){
			var idx = answerArr.indexOf(arr_choices[i].toUpperCase());

			var select_count = listening_question["answer_count_"+arr_choices[i]];
			
			var rate = select_count / total_count * 100;
			
			var v_title = "";
			if(is_show_answer){
				v_title = "선택률("+cfmRemoveZeroToFloat(rate)+")% ";
				if(select_count > 0)
				{
					v_title += " ["+arr_choices[i].toUpperCase()+":"+select_count+"/"+total_count+"]";
				}
				var style = "";
				if(idx >= 0)
				{
					style = "border:solid 1px #ff0004;";
				}
			}
			vHtml += '<div class="form-check" style="padding-bottom:10px;'+style+'">';
			vHtml += '	<input class="form-check-input" type="checkbox" name="answer" id="answer_'+arr_choices[i]+'" value="'+arr_choices[i].toUpperCase()+'" disabled>';
			vHtml += '	<label class="form-check-label" for="answer_'+arr_choices[i]+'" style="color:#000;">'+listening_question[choice]+'</label>';
			vHtml += '	<p style="color:#ff0004;margin-bottom:0px;">'+v_title+'</p>';
			vHtml += '</div>';
		}
	}
	var total_rate = accept_count / total_count * 100;
	if(is_show_answer){
		vHtml += '<p style="margin:10px 0 0 5px;font-weight:bold;font-size:0.9em;text-align:right;">정답률('+cfmRemoveZeroToFloat(total_rate)+')%</p>';
	}
	return vHtml;
}

function create_answer_c()
{
	var answer = listening_question.answer;
	var total_count = listening_question.total_count;
	var accept_count = listening_question.accept_count;
	
	var arr_choices = ["a","b","c","d","e","f","g","h","i"];
	var vHtml = "";
	for(var i=0; i<arr_choices.length; i++)
	{
		var choice = "choice_"+arr_choices[i];
		if(listening_question[choice]){
			var select_count = listening_question["answer_count_"+arr_choices[i]];
			var rate = select_count / total_count * 100;
			
			var v_title = "";
			if(is_show_answer){
				v_title = "선택률("+cfmRemoveZeroToFloat(rate)+")% ";
				if(select_count > 0)
				{
					v_title += " ["+arr_choices[i].toUpperCase()+":"+select_count+"/"+total_count+"]";
				}
				var style = "";
				if(arr_choices[i].toUpperCase() == answer)
				{
					style = "border:solid 1px #ff0004;";
				}
			}
			vHtml += '<div class="form-check" style="padding-bottom:10px;'+style+'">';
			vHtml += '	<input class="form-check-input" type="radio" name="answer" id="answer_'+arr_choices[i]+'" value="'+arr_choices[i].toUpperCase()+'" disabled>';
			vHtml += '	<label class="form-check-label" for="answer_'+arr_choices[i]+'" style="color:#000;">'+listening_question[choice]+'</label>';
			vHtml += '	<p style="color:#ff0004;margin-bottom:0px;">'+v_title+'</p>';
			vHtml += '</div>';
		}
	}
	var total_rate = accept_count / total_count * 100;
	if(is_show_answer){
		vHtml += '<p style="margin:10px 0 0 5px;font-weight:bold;font-size:0.9em;text-align:right;">정답률('+cfmRemoveZeroToFloat(total_rate)+')%</p>';
	}
	
	return vHtml;
}

function create_answer_d()
{
	var answer = listening_question.answer;
	var answerArr=answer.split("|");
	
	var total_count = listening_question.total_count;
	var accept_count = listening_question.accept_count;
	var total_rate = accept_count / total_count * 100;
	
	var arr_choices = ["a","b","c","d","e","f","g","h","i"];
	var vHtml = "";
	vHtml += '<input type="hidden" id="a1" name="answer[]" value="">';
	vHtml += '<input type="hidden" id="a2" name="answer[]" value="">';
	vHtml += '<input type="hidden" id="a3" name="answer[]" value="">';
	vHtml += '<input type="hidden" id="a4" name="answer[]" value="">';
	vHtml += '<input type="hidden" id="a5" name="answer[]" value="">';
	vHtml += '<input type="hidden" id="a6" name="answer[]" value="">';
	vHtml += '<input type="hidden" id="a7" name="answer[]" value="">';
	vHtml += '<input type="hidden" id="a8" name="answer[]" value="">';
	vHtml += '<input type="hidden" id="a9" name="answer[]" value="">';
	vHtml += '<p id="answer_txt" style="font-size:16px;background-color:#dddddd;color:#333;margin-top:25px;margin-bottom:25px;padding:5px;text-align:center;">';
	vHtml += 'Drag your answer choices to the spaces where they belong<br>';
	vHtml += 'To remove an answer choice, click on it.';
	vHtml += '</p>';
	
	var vHtml1 = "";
	var vHtml2 = "";
	var vHtml3 = "";
	var arr_except = Array();
	if(listening_question.answer1){
		arr_except = listening_question.answer1.split("|");
	}
	var nSeq = 1;
	for(var i=0; i<arr_choices.length; i++)
	{
		var choice = "choice_"+arr_choices[i];
		var upper_choice = arr_choices[i].toUpperCase();
		var idx = arr_except.indexOf(upper_choice);
		if(idx >= 0)
		{
			if(is_show_answer){
				vHtml1 += '<p style="font-size:16px;margin-bottom:5px;">'+listening_question[choice]+'</p>';
			}
		}else{
			if(listening_question[choice]){
				vHtml2 += '<div>';
				vHtml2 += '	<div id="d'+nSeq+'" class="droppable" style="border:1px solid #000;height:30px;margin-bottom:5px;"></div>';
				vHtml2 += '</div>';
				vHtml2 += '';
				
				nSeq++;
			}
		}
	}
	
	for(var i=0; i<answerArr.length; i++)
	{
		var choice = "choice_"+answerArr[i].toLowerCase();
		var upper_choice = answerArr[i].toUpperCase();
		vHtml3 += '<div style="margin-bottom:5px;">';
		vHtml3 += '	<div id="'+upper_choice+'" class="draggable" style="border:1px solid #ff0004;height:30px;margin-bottom:5px;color:#000;">'+listening_question[choice]+'</div>';
		vHtml3 += '</div>';
	}
	vHtml += vHtml1;
	vHtml += vHtml2;
	vHtml += '<div style="font-size:1.05em;font-weight:bold;margin:10px 0;clear:both;text-align:center;"><p>Answer Choices</p></div>';
	vHtml += vHtml3;
	if(is_show_answer){
		vHtml += '<p style="margin:10px 0 0 5px;font-weight:bold;font-size:0.9em;text-align:right;">정답률('+cfmRemoveZeroToFloat(total_rate)+')%</p>';
	}
	return vHtml;
}

function create_answer_e()
{
	var answer = listening_question.answer;
	var answerArr=answer.split("|");
	var answer1 = listening_question.answer1;
	var answerArr1=answer1.split("|");
	var answer2 = listening_question.answer2;
	var answerArr2 = Array();
	var answer3 = listening_question.answer3;
	var answerArr3 = Array();
	if(listening_question.question_count > 2){
		answerArr2=answer2.split("|");
	}
	if(listening_question.question_count > 3){
		answerArr3=answer3.split("|");
	}
	var total_count = listening_question.total_count;
	var accept_count = listening_question.accept_count;
	var total_rate = accept_count / total_count * 100;
	
	var arr_choices = ["a","b","c","d","e","f","g","h","i"];
	var vHtml = "";
	vHtml += '<p id="answer_txt" style="font-size:16px;background-color:#dddddd;color:#333;margin-top:25px;margin-bottom:25px;padding:10px;text-align:center;">';
	vHtml += 'Click in the correct box for each phrase. This item is worth 2 points';
	vHtml += '</p>';
	vHtml += '<table class="table">';
	vHtml += '	<colgroup>';
	if(listening_question.question_count == 2)
	{
		vHtml += '		<col style="width:70%;" />';
		vHtml += '		<col style="width:15%;" />';
		vHtml += '		<col style="width:15%;" />';
	}else if(listening_question.question_count == 3){
		vHtml += '		<col style="width:64%;" />';
		vHtml += '		<col style="width:12%;" />';
		vHtml += '		<col style="width:12%;" />';
		vHtml += '		<col style="width:12%;" />';
	}else{
		vHtml += '		<col style="width:60%;" />';
		vHtml += '		<col style="width:10%;" />';
		vHtml += '		<col style="width:10%;" />';
		vHtml += '		<col style="width:10%;" />';
		vHtml += '		<col style="width:10%;" />';
	}
	vHtml += '	</colgroup>';
	vHtml += '	<thead class="thead-light">';
	vHtml += '		<tr>';
	vHtml += '			<th scope="col">&nbsp;</th>';
	vHtml += '			<th scope="col" class="text-center">'+listening_question.qcat1+'</th>';
	vHtml += '			<th scope="col" class="text-center">'+listening_question.qcat2+'</th>';
	if(listening_question.question_count > 2)
	{
		vHtml += '			<th scope="col" class="text-center">'+listening_question.qcat3+'</th>';
	}	
	if(listening_question.question_count > 3)
	{
		vHtml += '			<th scope="col" class="text-center">'+listening_question.qcat4+'</th>';
	}	
	vHtml += '		</tr>';
	vHtml += '	</thead>';
	vHtml += '	<tbody>';
	for(var i=0; i<arr_choices.length; i++)
	{
		var choice = "choice_"+arr_choices[i];
		
		if(listening_question[choice]){
			var idx = answerArr.indexOf(arr_choices[i].toUpperCase());
			var idx1 = answerArr1.indexOf(arr_choices[i].toUpperCase());
			var idx2 = answerArr2.indexOf(arr_choices[i].toUpperCase());
			var idx3 = answerArr3.indexOf(arr_choices[i].toUpperCase());

			vHtml += '		<tr>';
			vHtml += '			<td>'+listening_question[choice]+'</td>';
			var div1 = "";
			var div2 = "";
			if(idx >= 0 && is_show_answer)
			{
				div1 = "<div style='border:solid 1px #ff0004;'>";
				div2 = "</div>";
			}
			vHtml += '			<td style="text-align:center;">';
			vHtml += div1;
			vHtml += '				<input type="radio" name="answer_'+arr_choices[i]+'" id="answer_'+arr_choices[i]+'_1" value="1" disabled>';
			vHtml += div2;
			vHtml += '			</td>';
			div1 = "";
			div2 = "";
			if(idx1 >= 0 && is_show_answer)
			{
				div1 = "<div style='border:solid 1px #ff0004;'>";
				div2 = "</div>";
			}
			vHtml += '			<td style="text-align:center;">';
			vHtml += div1;
			vHtml += '				<input type="radio" name="answer_'+arr_choices[i]+'" id="answer_'+arr_choices[i]+'_2" value="2" disabled>';
			vHtml += div2;
			vHtml += '			</td>';
			if(listening_question.question_count > 2)
			{
				div1 = "";
				div2 = "";
				if(idx2 >= 0 && is_show_answer)
				{
					div1 = "<div style='border:solid 1px #ff0004;'>";
					div2 = "</div>";
				}
				vHtml += '			<td style="text-align:center;">';
				vHtml += div1;
				vHtml += '				<input type="radio" name="answer_'+arr_choices[i]+'" id="answer_'+arr_choices[i]+'_3" value="3" disabled>';
				vHtml += div2;
				vHtml += '			</td>';
			}	
			if(listening_question.question_count > 3)
			{
				div1 = "";
				div2 = "";
				if(idx3 >= 0 && is_show_answer)
				{
					div1 = "<div style='border:solid 1px #ff0004;'>";
					div2 = "</div>";
				}
				vHtml += '			<td style="text-align:center;">';
				vHtml += div1;
				vHtml += '				<input type="radio" name="answer_'+arr_choices[i]+'" id="answer_'+arr_choices[i]+'_4" value="4" disabled>';
				vHtml += div2;
				vHtml += '			</td>';
			}		
			vHtml += '		</tr>';
		}
	}
	vHtml += '	</tbody>';
	vHtml += '</table>';
	if(is_show_answer){
		vHtml += '<p style="margin:10px 0 0 5px;font-weight:bold;font-size:0.9em;text-align:right;">정답률('+cfmRemoveZeroToFloat(total_rate)+')%</p>';
	}
	return vHtml;
}