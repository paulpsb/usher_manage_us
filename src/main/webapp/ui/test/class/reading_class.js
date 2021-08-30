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

var reading_question;
var exam_question_idx;
var exam_question_count;

var question_type = {
	VO:"Vocabulary",
	FA:"Fact &amp; Negative Fact",
	RE:"Reference",
	SS:"Sentence Simplification",
	IN:"Insertion",
	RP:"Rhetorical Purpose",
	IF:"Inference",
	SU:"Summary",
	CC:"Category Chart"
};

var s_arr=[];
s_arr['d1']="a1";
s_arr['d2']="a2";
s_arr['d3']="a3";
s_arr['d4']="a4";
s_arr['d5']="a5";
s_arr['d6']="a6";
s_arr['d7']="a7";
s_arr['d8']="a8";
s_arr['d9']="a9";

s_arr['e1']="b1";
s_arr['e2']="b2";
s_arr['e3']="b3";
s_arr['e4']="b4";
s_arr['e5']="b5";
s_arr['e6']="b6";
s_arr['e7']="b7";
s_arr['e8']="b8";
s_arr['e9']="b9";

var code=["SQA","SQB","SQC","SQD"];
var arr_choices = ["a","b","c","d","e","f","g","h","i"];

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
	course_id = $("#course_id").val();
	user_id = $("#user_id").val();
	section = $("#section").val();
	change_date();
	search_schedule();

});

function close_class()
{
	self.close();
}

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
	var url = "/test/class/reading_class.do?";
	url += "course_id="+course_id;
	url += "&&section="+section;
	url += "&&user_id="+user_id;
	url += "&&date="+v_search_date;
	location.href=url;
}
/*
 * 설명 : 년/월 조회
 */
function search_schedule()
{

	$.ajax({
		type : "POST",
		url : "/test/class/getReadingPracticeScheduleList.do",
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
				search_reading_exam();
			});
			book = data[0].book;
			volume = data[0].volume;
			group = data[0].group;
			article = data[0].article;
			practice_problem_id = data[0].practice_problem_id;
			search_reading_exam();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function search_reading_exam()
{
	$.ajax({
		type : "POST",
		url : "/test/class/getReadingExamInfo.do",
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

var sort_type = "reading_sort3";
var sort_id = "accept_rate";
var sort_asc = "desc";

function create_subject()
{
	sort_type = "reading_sort3";
	sort_id = "accept_rate";
	sort_asc = "desc";
	
	$("#reading_button").hide();
	if(subject == "analysis"){
		create_analysis();
	}else if(subject == "passage"){
		create_passage();
	}else if(subject == "passage_chain"){
		create_passage_chain();
	}else if(subject == "passage_chain_half"){
		passage_chain_half();
	}else if(subject == "exam"){
		create_exam();
	}
}

//분석
function create_analysis()
{
	$.ajax({
		type : "POST",
		url : "/test/class/getExamsReadingQuestionCourseList.do",
		data:{
			course_id:course_id,
			practice_problem_id:practice_problem_id,
			sort_id:sort_id,
			sort_asc:sort_asc
		},
		success:function(data){
			var sortHtml = ":";
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
			vHtml += '				<th class="reading_sort reading_sort1 text-center bg-black-transparent-5 text-white"><input type="hidden" name="sort_type" value="reading_sort1">문제번호<span class="show_sort"></span></th>';
			vHtml += '				<th class="reading_sort reading_sort2 text-center bg-black-transparent-5 text-white"><input type="hidden" name="sort_type" value="reading_sort2">문제유형<span class="show_sort"></span></th>';
			vHtml += '				<th class="reading_sort reading_sort3 text-center bg-black-transparent-5 text-white"><input type="hidden" name="sort_type" value="reading_sort3">정답률<span class="show_sort"></span></th>';
			vHtml += '				<th class="text-center bg-black-transparent-5 text-white">보기</th>';
			vHtml += '				<th class="reading_sort reading_sort4 text-center bg-black-transparent-5 text-white"><input type="hidden" name="sort_type" value="reading_sort4">틀린 학생 수(%)<span class="show_sort"></span></th>';
			vHtml += '				<th class="reading_sort reading_sort5 text-center bg-black-transparent-5 text-white"><input type="hidden" name="sort_type" value="reading_sort5">틀린 학생<span class="show_sort"></span></th>';
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
			$("#reading_content").html(vHtml);
			
			$(".reading_sort").css("cursor","pointer");
			$(".reading_sort").click(function(){
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
					if(sort_type == "reading_sort1"){
						sort_id = "question_num";
					}else if(sort_type == "reading_sort2"){
						sort_id = "question_type";
					}else if(sort_type == "reading_sort3"){
						sort_id = "accept_rate";
					}else if(sort_type == "reading_sort4"){
						sort_id = "fail_count";
					}else if(sort_type == "reading_sort5"){
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
	var passage = "";
	for(var i=1; i<=10; i++)
	{
		if(examInfo["paragraph"+i])
		{
			if(passage){
				passage += '<br/><br/>';
			}
			var v_passage = examInfo["paragraph"+i];
			
			v_passage = v_passage.replace(/(<([^>]+)>)/ig,"");
			
			passage += '<p style="font-size:25px;">'+v_passage+'</p>';
		}
		
	}
	var vHtml = "";
	vHtml += '<div id="content" class="container" style="width:1019px;height:678px;border:1px solid #000;padding:0;margin-top:20px;">'
	vHtml += '	<div style="width:100%;height:678px;overflow-x:hidden;overflow-y:auto;padding:10px;">';
	vHtml += '	<div style="font-weight:bold; text-align:center; padding:10px 0;font-size:27px;">'+examInfo.passage+'</div>';
	vHtml += '	<div style="padding:10px 0;">'+passage+'</div>';
	vHtml += '	</div>';
	vHtml += '</div>'
	$("#reading_content").html(vHtml);
}

var arrow = [];
var color_set;
var modifier_set;
var contents;
function create_passage_chain()
{
	arrow = [];
	$.ajax({
		type : "POST",
		url : "/test/class/getReadingExamChain.do",
		data:{
			section:section,
			book:book,
			volume:volume,
			group:group,
			article:article
		},
		success:function(data){
			var vHtml = "";
			vHtml += '<div id="main_wrap" style="margin: 0 auto; width: 1366px; position: relative;  height: 768px;">'
			vHtml += '	<div id="contents" style="height: 638px;margin-top:20px;">';
			vHtml += '		<div id="wrap" style="text-align: center;">';
			vHtml += '			<div class="voca_cont" style="border: 1px solid rgb(0, 0, 0);">';
			vHtml += '				<div class="basic">';
			vHtml += '					<div class="text_wrap" id="note" style="clear: both;">';
			vHtml += '					</div>';
			vHtml += '				</div>';
			vHtml += '			</div>';
			vHtml += '		</div>';
			vHtml += '	</div>';
			vHtml += '</div>';
			$("#reading_content").html(vHtml);
			
			$('#wrap').css('line-height','40px');
			$('#wrap').addClass('voca_test_wrap');
			$('#wrap').css({padding: '0px'});
			$('#note').css({marginTop: '0px'});
			
			color_set = data.color_set;
			modifier_set = data.modifier_set;
			contents = data.contents;
			createChainExam(data.contents);
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

function createChainExam(note)
{
	var note_all = note.split('\n');
	var span_num=0;
	var line_num=0;
	
	var t = '';
	for(var each_row in note_all){
		if(note_all[each_row]=='' || note_all[each_row]==' '){
			continue;
		}
		
		var row_num = parseInt(each_row)+1;
		row_num = ++line_num;
		t+= '<span id="line_number'+row_num+'" class="line_number">'+row_num+'. </span>';
		var each_line = note_all[each_row].trim().split(' ');
		for(var each_note in each_line){
			t += '<span id="w'+span_num+'" class="">'+each_line[each_note]+' </span>';
			span_num++;
		}
		if(each_row != note_all.length-1){
			t += '<br />';
		}
	}
	$('#note').html(t);
	
	create_chain_rst();

}

function create_chain_rst()
{
	
	if(!color_set) color_set = "{}";
	color_set = JSON.parse(color_set);
	//우선 세팅을 해준다.
	for(var each_color in color_set){
        var pos = color_set[each_color].split(',');
        for(var each_pos in pos){
            $('#w'+pos[each_pos]).addClass(each_color);
        }
    }
	if(!modifier_set) modifier_set = "{}";
	arrow = eval('('+modifier_set+')');


    for(var each_line in arrow){
        if(arrow[each_line] == -2){
            continue;
        }
        var note_offset = $('#note').offset();
        var t1 = $('#w'+each_line).offset();
        t1.left -= note_offset.left;
        t1.top -= note_offset.top;
        t1.top += $('#note').scrollTop();
        var t1_w = $('#w'+each_line).width()/2;

        if(arrow[each_line] == -1){
            $('#note').line(t1.left+t1_w-10, t1.top-10, t1.left+t1_w+10, t1.top-10, {color:"#D60004", stroke:2, zindex:1001});
            $('#note').line(t1.left+t1_w-10, t1.top-10, t1.left+t1_w-5, t1.top-15, {color:"#D60004", stroke:2, zindex:1001});
            $('#note').line(t1.left+t1_w-10, t1.top-10, t1.left+t1_w-5, t1.top-5, {color:"#D60004", stroke:2, zindex:1001});
            continue;
        }else if(arrow[each_line] == -3){
            $('#note').line(t1.left+t1_w-10, t1.top-10, t1.left+t1_w+10, t1.top-10, {color:"#D60004", stroke:2, zindex:1001});
            $('#note').line(t1.left+t1_w+5, t1.top-15, t1.left+t1_w+10, t1.top-10, {color:"#D60004", stroke:2, zindex:1001});
            $('#note').line(t1.left+t1_w+5, t1.top-5, t1.left+t1_w+10, t1.top-10, {color:"#D60004", stroke:2, zindex:1001});
            continue;
        }

        var t2 = $('#w'+rst_arrow[each_line]).offset();

        t2.left -= note_offset.left;
        t2.top -= note_offset.top;
        t2.top += $('#note').scrollTop();
        var t2_w = parseInt($('#w'+rst_arrow[each_line]).width()/2);


        $('#note').line(t1.left+t1_w, t1.top, t1.left+t1_w, t1.top-10, {color:"#D60004", stroke:2, zindex:1001}, function(){
            $(this).addClass('l');
        });
        $('#note').line(t1.left+t1_w, t1.top-10, t2.left+t2_w, t2.top-10, {color:"#D60004", stroke:2, zindex:1001}, function(){
            $(this).addClass('l');
        });
        $('#note').line(t2.left+t2_w, t2.top-10, t2.left+t2_w, t2.top, {color:"#D60004", stroke:2, zindex:1001}, function(){
            $(this).addClass('l');
        });

        $('#note').line(t2.left+t2_w-5, t2.top-5, t2.left+t2_w, t2.top, {color:"#D60004", stroke:2, zindex:1001}, function(){
            $(this).addClass('l');
        });
        $('#note').line(t2.left+t2_w+5, t2.top-5, t2.left+t2_w, t2.top, {color:"#D60004", stroke:2, zindex:1001}, function(){
            $(this).addClass('l');
        });
    }
    
  //사이즈조절이나 창 크기 달라질때 화살표 갱신
	$( window ).resize(function() {
		$('#note div').remove();
		for(var each_line in arrow){
			if(arrow[each_line] == -2){
				continue;
			}
			var note_offset = $('#note').offset();

			var t1 = $('#w'+each_line).offset();
			t1.left -= note_offset.left;
			t1.top -= note_offset.top;
			t1.top += $('#note').scrollTop();

			var t1_w = parseInt($('#w'+each_line).width()/2);

			if(arrow[each_line] == -1){
				$('#note').line(t1.left+t1_w-10, t1.top-10, t1.left+t1_w+10, t1.top-10, {color:"#D60004", stroke:2, zindex:10});
				$('#note').line(t1.left+t1_w-10, t1.top-10, t1.left+t1_w-5, t1.top-15, {color:"#D60004", stroke:2, zindex:10});
				$('#note').line(t1.left+t1_w-10, t1.top-10, t1.left+t1_w-5, t1.top-5, {color:"#D60004", stroke:2, zindex:10});
				continue;
			}else if(arrow[each_line] == -3){
				$('#note').line(t1.left+t1_w-10, t1.top-10, t1.left+t1_w+10, t1.top-10, {color:"#D60004", stroke:2, zindex:10});
				$('#note').line(t1.left+t1_w+5, t1.top-15, t1.left+t1_w+10, t1.top-10, {color:"#D60004", stroke:2, zindex:10});
				$('#note').line(t1.left+t1_w+5, t1.top-5, t1.left+t1_w+10, t1.top-10, {color:"#D60004", stroke:2, zindex:10});
				continue;
			}

			var t2 = $('#w'+arrow[each_line]).offset();
			t2.left -= note_offset.left;
			t2.top -= note_offset.top;
			t2.top +=$('#note').scrollTop();
		
			var t2_w = parseInt($('#w'+arrow[each_line]).width()/2);
		
			$('#note').line(t1.left+t1_w, t1.top, t1.left+t1_w, t1.top-10, {color:"#D60004", stroke:2, zindex:10}, function(){
				$(this).addClass('l');
			});
			
			$('#note').line(t1.left+t1_w, t1.top-10, t2.left+t2_w, t2.top-10, {color:"#D60004", stroke:2, zindex:10}, function(){
				$(this).addClass('l');
			});
			$('#note').line(t2.left+t2_w, t2.top-10, t2.left+t2_w, t2.top, {color:"#D60004", stroke:2, zindex:10}, function(){
				$(this).addClass('l');
			});
		
			$('#note').line(t2.left+t2_w-5, t2.top-5, t2.left+t2_w, t2.top, {color:"#D60004", stroke:2, zindex:10}, function(){
				$(this).addClass('l');
			});
			$('#note').line(t2.left+t2_w+5, t2.top-5, t2.left+t2_w, t2.top, {color:"#D60004", stroke:2, zindex:10}, function(){
				$(this).addClass('l');
			});
		}
	});
}

function passage_chain_half()
{
	arrow = [];
	$.ajax({
		type : "POST",
		url : "/test/class/getReadingExamChain.do",
		data:{
			section:section,
			book:book,
			volume:volume,
			group:group,
			article:article
		},
		success:function(data){
			var vHtml = "";
			vHtml += '<div id="main_wrap" style="margin: 0 auto; width: 1366px; position: relative;  height: 768px;">'
			vHtml += '	<div id="contents" style="height: 638px;margin-top:20px;border: 1px solid rgb(0, 0, 0);">';
			vHtml += '		<div id="wrap" style="text-align: center; line-height: 40px; padding: 30px 60px;" class="voca_test_wrap">';
			vHtml += '			<div id="rst" style="width: 45%;height: 470px; float:left;padding:0px; text-align:left;overflow-y: scroll;"></div>';
			vHtml += '			<div id="note" style="width: 45%;height: 470px;overflow-y: scroll;float:left;padding:0px;margin-left:10px; text-align:left;position:relative"></div>';
			vHtml += '		</div>';
			vHtml += '	</div>';
			vHtml += '</div>';
			$("#reading_content").html(vHtml);
			
			/*
			$('#wrap').css('line-height','40px');
			$('#wrap').addClass('voca_test_wrap');
			$('#wrap').css({padding: '0px'});
			$('#note').css({marginTop: '0px'});
			*/
			color_set = data.color_set;
			modifier_set = data.modifier_set;
			contents = data.contents;
			createChainExamHalf(data.contents);
			
			//스크롤
		    $('#note').scroll(function(e) {
		        $('#rst').scrollTop($('#note').scrollTop());
		    });
		    
		    $('#rst').scroll(function(e) {
		        $('#note').scrollTop($('#rst').scrollTop());
		    });
		    
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

function createChainExamHalf(note)
{
	var note_all = note.split('\n');
	var span_num=0;
	var line_num=0;
	
	var t = '';
	var r = ''; 
	for(var each_row in note_all){
		if(note_all[each_row]=='' || note_all[each_row]==' '){
			continue;
		}
		
		var row_num = parseInt(each_row)+1;
		row_num = ++line_num;
		t += '<span id="line_number'+row_num+'" class="line_number">'+row_num+'. </span>';
		r += '<span id="line_number'+row_num+'" class="line_number">'+row_num+'. </span>';
		var each_line = note_all[each_row].trim().split(' ');
		for(var each_note in each_line){
			t += '<span id="w'+span_num+'" class="">'+each_line[each_note]+' </span>';
			r += '<span id="r'+span_num+'" class="">'+each_line[each_note]+' </span>';
			span_num++;
		}
		if(each_row != note_all.length-1){
			t += '<br />';
			r += '<br />';
		}
	}
	$('#note').html(t);
	$('#rst').html(r);
	
	create_chain_rst();

}

var is_show_answer = false;
function create_exam()
{
	is_show_answer = false;
	var vHtml = "";

	vHtml += '<div id="content" class="container" style="width:1019px;height:678px;border:1px solid #000;padding:0;">'
	vHtml += '</div>'
	$("#reading_content").html(vHtml);
	$("#reading_button").show();
	go_question();
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

	$("#reading_review_question").html("Question ("+(exam_question_idx+1)+"/"+exam_question_count+")");
	$.ajax({
		type : "POST",
		url : "/test/class/getReadingExamQuestionReview.do",
		data:{
			reading_id:questionList[exam_question_idx].reading_id,
			question_num:questionList[exam_question_idx].question_num,
			course_id:course_id,
			practice_problem_id:practice_problem_id
		},
		success:function(data){	
			reading_question = data;
			create_question();
			var category = data.category;
			
			if(category=="D" || category == "E"){
				$("#btn_view").show();
			}else{
				$("#btn_view").hide();
			}
			
			var useranswer  = cfmNvl1(reading_question.answer);
			var useranswer1 = cfmNvl1(reading_question.answer1);
			var answer = cfmNvl1(reading_question.answer);
			var answer1 = cfmNvl1(reading_question.answer1);
			if(category == "A"){
				if(is_show_answer){
					$('#choice'+useranswer).prop("checked", true);
				}
				
			}else if(category == "B"){
				if(is_show_answer){
					var tmpAnsArr=useranswer.split("|");
					for(var i=0; i<tmpAnsArr.length;i++) {
						var aid = '#choice'+tmpAnsArr[i];
						$(aid).prop("checked", true);
					}
				}
			}else if(category == "C"){
				if(is_show_answer){
					var total_count = reading_question.total_count;
					$('#answer').val(useranswer);
					var selected = 'SQ'+useranswer;
					var resulted = 'SQ'+answer;
					var code=["SQA","SQB","SQC","SQD"];
					for(i=0; i < 4; i++) {
						var select_count = reading_question["answer_count_"+arr_choices[i]];
						
						var rate = select_count / total_count * 100;
						
						
						var v_title = "선택률("+cfmRemoveZeroToFloat(rate)+")% ";
						if(select_count > 0)
						{
							v_title += " ["+arr_choices[i].toUpperCase()+":"+select_count+"/"+total_count+"]";
						}
						
						if(code[i] == selected) {
							$('#'+code[i]).html($("#inserted_value").text());
							$('#'+code[i]).css('background-color','#CCC');
							$('#'+code[i]).css('font-weight','bold');
						}
						/*
						if(code[i] == resulted) {
							$('#'+code[i]).html($("#inserted_value").text());
							$('#'+code[i]).css('background-color','#ff0004');
							$('#'+code[i]).css('color','#fff');
							$('#'+code[i]).css('font-weight','bold');
						}
						*/
						$('#'+code[i]).append(v_title);
					}
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
					for(var i=0; i<tmpAnsArr.length;i++) {
						  var j=i+1;
					  	  $('#a'+j).val(tmpAnsArr[i]); //hidden field value set
						  var txt= $('#'+tmpAnsArr[i]).text();
						  $('#d'+j).html(txt+"<span class='hh'>"+tmpAnsArr[i]+"</span>");
						  
					  }
					  
					  for(var i=0; i<tmpAnsArr1.length;i++) {
						  var j=i+1;
					  	  $('#b'+j).val(tmpAnsArr1[i]); //hidden field value set
						  var txt= $('#'+tmpAnsArr1[i]).text();
						  $('#e'+j).html(txt+"<span class='hh'>"+tmpAnsArr1[i]+"</span>");
					  }
				}
			}
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function create_question()
{
	$("#content").html("");
	if(reading_question.category == "A")
	{
		$("#content").html(create_answer_a());
	}else if(reading_question.category == "B")
	{
		$("#content").html(create_answer_b());
	}else if(reading_question.category == "C")
	{
		$("#content").html(create_answer_c());
	}else if(reading_question.category == "D")
	{
		$("#content").html(create_answer_d());
	}else if(reading_question.category == "E")
	{
		$("#content").html(create_answer_e());
	}
	
	$('#tmain_right').on('scroll', function() {
        if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
			window.parent.scrolled = true;
        }
    });
	if($('#tmain_right span.marker1').length > 0) {
		$('#tmain_right').animate({
			scrollTop:$('#tmain_right span.marker1').offset().top-180
		}, 500);
	}
	
	if($('#tmain_right .arrow').length > 0) {
		$('#tmain_right').animate({
			scrollTop:$('#tmain_right .arrow').offset().top-180
		}, 500);
	}
}
function create_answer_a()
{
	var answer = reading_question.answer;
	
	var vHtml = "";
	vHtml += '<div style="float:left;width:50%;height:678px;padding:10px;overflow-x:hidden;overflow-y:auto;">';
	if(reading_question.question)
	{
		vHtml += '<p style="margin:10px 0; font-size:1.05em !important; font-weight:bold !important; padding:5px; clear:left;">'+reading_question.question+'</p>';
		var total_count = reading_question.total_count;
		var accept_count = reading_question.accept_count;
		for(var i=0; i<arr_choices.length; i++)
		{
			var choice = "choice_"+arr_choices[i];
			if(reading_question[choice]){
				var select_count = reading_question["answer_count_"+arr_choices[i]];
				
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
				vHtml += '<div class="form-check" style="margin-bottom:10px; '+style+'">';
				vHtml += '	<input class="form-check-input" type="radio" name="answer" id="choice'+arr_choices[i].toUpperCase()+'" value="'+arr_choices[i].toUpperCase()+'" disabled>';
				vHtml += '	<label class="form-check-label" for="choice'+arr_choices[i].toUpperCase()+'" style="color:#000;">'+reading_question[choice]+'</label>';
				vHtml += '	<p style="color:#ff0004;margin-bottom:0px;">'+v_title+'</p>';
				vHtml += '</div>';
			}
		}
		if(reading_question.marker)
		{
			vHtml += '<p style="margin:10px 0 0 5px;font-weight:bold;font-size:0.9em;">'+reading_question.marker+'</p>';
		}
		if(is_show_answer){
			var total_rate = accept_count / total_count * 100;
			vHtml += '<p style="margin:10px 0 0 5px;font-weight:bold;font-size:0.9em;text-align:right;">정답률('+cfmRemoveZeroToFloat(total_rate)+')%</p>';
		}
	}
	vHtml += '</div>';
	vHtml += '<div id="tmain_right" style="float:left;width:50%;height:678px;border-left:1px solid #000;overflow-x:hidden;overflow-y:auto;padding:5px;">';
	vHtml += '<div style="font-weight:bold; font-size:1.15em; text-align:center; padding:10px 0;">'+reading_question.passage+'</div>';
	vHtml += '<div style="padding:10px 0;">'+reading_question.paragraph+'</div>';
	vHtml += '</div>';	
	vHtml += '</div>';

	
	return vHtml;
}

function create_answer_b()
{
	var answer = reading_question.answer;
	var answerArr=answer.split("|");
	var vHtml = "";
	vHtml += '<div style="float:left;width:50%;height:678px;padding:10px;overflow-x:hidden;overflow-y:auto;">';
	if(reading_question.question)
	{
		var total_count = reading_question.total_count;
		var accept_count = reading_question.accept_count;
		
		vHtml += '<p style="margin:10px 0; font-size:1.05em !important; font-weight:bold !important; padding:5px; clear:left;">'+reading_question.question+'</p>';
		for(var i=0; i<arr_choices.length; i++)
		{
			var choice = "choice_"+arr_choices[i];
			if(reading_question[choice]){
				
				var idx = answerArr.indexOf(arr_choices[i].toUpperCase());

				var select_count = reading_question["answer_count_"+arr_choices[i]];
				
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
				vHtml += '<div class="form-check" style="padding-bottom:10px;margin-bottom:5px; '+style+'">';
				vHtml += '	<input class="form-check-input" type="checkbox" name="answer" id="choice'+arr_choices[i].toUpperCase()+'" value="'+arr_choices[i].toUpperCase()+'" disabled>';
				vHtml += '	<label class="form-check-label" for="choice'+arr_choices[i].toUpperCase()+'" style="color:#000;">'+reading_question[choice]+'</label>';
				vHtml += '	<p style="color:#ff0004;margin-bottom:0px;">'+v_title+'</p>';
				vHtml += '</div>';
			}
		}
		if(is_show_answer){
			var total_rate = accept_count / total_count * 100;
			vHtml += '<p style="margin:10px 0 0 5px;font-weight:bold;font-size:0.9em;text-align:right;">정답률('+cfmRemoveZeroToFloat(total_rate)+')%</p>';
		}
		vHtml += '<p style="margin:10px 0 0 5px;font-weight:bold;font-size:0.9em;">'+reading_question.marker+'</p>';
	}
	vHtml += '</div>';
	vHtml += '<div id="tmain_right" style="float:left;width:50%;height:678px;border-left:1px solid #000;overflow-x:hidden;overflow-y:auto;padding:5px;">';
	vHtml += '<p style="font-weight:bold; font-size:1.15em; text-align:center; padding:10px 0;">'+reading_question.passage+'</p>';
	vHtml += '<p style="padding:10px 0;">'+reading_question.paragraph+'</p>';
	vHtml += '</div>';	
	vHtml += '</div>';

	
	return vHtml;
}

function create_answer_c()
{
	var total_count = reading_question.total_count;
	var accept_count = reading_question.accept_count;
	var total_rate = accept_count / total_count * 100;
	
	var vHtml = "";
	vHtml += '<div style="float:left;width:50%;height:678px;padding:15px;overflow-x:hidden;overflow-y:auto;">';
	vHtml += '<input type="hidden" id="answer" name="answer" value="" />';
	if(reading_question.question)
	{
		vHtml += '<p class="square_fixed">';
		vHtml += '	Look at the four squares[■] that indicate where the following sentence could be added to the passage. Where would the sentence best fit? Click on a square to add the sentence to the passage.';
		vHtml += '</p>';
		vHtml += '<p style="margin:10px 0;font-size:1.05em !important;font-weight:bold !important;padding:5px;clear:left;background-color:#ccc;">'+reading_question.question+'</p>';
	}
	if(is_show_answer){
		vHtml += '<p style="margin:10px 0 0 5px;font-weight:bold;font-size:0.9em;text-align:right;">정답률('+cfmRemoveZeroToFloat(total_rate)+')%</p>';
	}
	vHtml += '<div id="inserted_value" style="display:none;">'+reading_question.question+'</div>';
	vHtml += '</div>';
	vHtml += '<div id="tmain_right" style="float:left;width:50%;height:678px;border-left:1px solid #000;overflow-x:hidden;overflow-y:auto;padding:5px;">';
	vHtml += '<p style="font-weight:bold; font-size:1.15em; text-align:center; padding:10px 0;">'+reading_question.passage+'</p>';
	vHtml += '<p style="padding:10px 0;">'+reading_question.paragraph+'</p>';
	vHtml += '</div>';	
	vHtml += '</div>';

	
	return vHtml;
}

function create_answer_d()
{
	var answer = reading_question.answer;
	var answerArr=answer.split("|");
	
	var total_count = reading_question.total_count;
	var accept_count = reading_question.accept_count;
	var total_rate = accept_count / total_count * 100;
	
	var vHtml = "";
	vHtml += '<div style="width:100%;height:678px;padding:15px;overflow-x:hidden;overflow-y:auto;">';
	vHtml += '	<input type="hidden" id="a1" name="answer[]" value="">';
	vHtml += '	<input type="hidden" id="a2" name="answer[]" value="">';
	vHtml += '	<input type="hidden" id="a3" name="answer[]" value="">';
	vHtml += '	<p style="font-weight:bold;font-size:1.03em;margin:5px;padding-bottom:5px;">Directions:An introductory sentence for a brief summary of the passage is provided below.Complete the summary by selecting THREE answer choices that express the most important ideas in the passage.Some answer choices do not belong in summary because they express ideas that are not presented in the passage or are minor ideas in the passage.The Question is worth 2 points.</p>';
	vHtml += '	<div style="text-align:center">';
	vHtml += '		<p style="font-size:16px;background-color:#dddddd;color:#333;margin-top:25px;margin-bottom:25px;padding:5px;text-align:center;">Drag your answer choices to the spaces where they belong. To review the passage, click on <span class="bold">View Text</span>.</p>';
	vHtml += '	</div>';
	if(reading_question.question)
	{
		vHtml += '<div style="font-weight:bold;font-size:1.03em;margin:5px;padding-bottom:5px;">'+reading_question.question+'</div>';
	}
	vHtml += '<div style="width:88%;margin:0 auto;">';
	vHtml += '	<div >';
	vHtml += '		<div id="d1" style="width: 90%;margin: 1px 10px;min-height: 30px;border:#CCC solid 1px;" class="droppable"></div>';
	vHtml += '	</div>';
	vHtml += '	<div>';
	vHtml += '		<div id="d2" style="width: 90%;margin: 1px 10px;min-height: 30px;border:#CCC solid 1px;" class="droppable"></div>';
	vHtml += '	</div>';
	vHtml += '	<div>';
	vHtml += '		<div id="d3" style="width: 90%;margin: 1px 10px;min-height: 30px;border:#CCC solid 1px;" class="droppable"></div>';
	vHtml += '	</div>';
	vHtml += '</div>';
	vHtml += '<div style="font-size:1.05em;font-weight:bold;margin:10px 0;clear:both;text-align:center;"><p>Answer Choices</p></div>';
	vHtml += '<div style="width:100%;margin:0 auto;">';
	for(var i=0; i<arr_choices.length; i++)
	{
		var choice = "choice_"+arr_choices[i];
		if(reading_question[choice]){
			var idx = answerArr.indexOf(arr_choices[i].toUpperCase());

			var select_count = reading_question["answer_count_"+arr_choices[i]];
			
			var rate = select_count / total_count * 100;
			
			var v_title = "";
			if(is_show_answer){
				v_title = "선택률("+cfmRemoveZeroToFloat(rate)+")% ";
				if(select_count > 0)
				{
					v_title += " ["+arr_choices[i].toUpperCase()+":"+select_count+"/"+total_count+"]";
				}
			}
			var style = "border:#CCC solid 1px;";
			if(idx >= 0)
			{
				if(is_show_answer){
					style = "border:solid 1px #ff0004;";
				}
			}
			
			vHtml += '<div>';
			vHtml += '	<div  style="width: 90%;margin: 1px 10px;min-height: 30px;padding:5px;'+style+'" id="'+arr_choices[i].toUpperCase()+'" class="draggable">'+reading_question[choice]+'</div>';
			vHtml += '	<p style="color:#ff0004;margin-left:10px;margin-bottom:0px;">'+v_title+'</p>';
			
			vHtml += '</div>';
		}
	}	
	vHtml += '</div>';
	vHtml += '<div style="font-size:1.05em;font-weight:bold;margin:10px 0;clear:both;text-align:center;">';
	vHtml += '	<p>To review passage, Click "VIEW TEXT".</p>';
	vHtml += '</div>';
	vHtml += '<p style="margin:10px 0 0 5px;font-weight:bold;font-size:0.9em;text-align:right;">정답률('+cfmRemoveZeroToFloat(total_rate)+')%</p>';

	return vHtml;
}

function create_answer_e()
{
	var answer = reading_question.answer;
	var answerArr=answer.split("|");
	var answer1 = reading_question.answer1;
	var answerArr1=answer1.split("|");
	
	var total_count = reading_question.total_count;
	var accept_count = reading_question.accept_count;
	var total_rate = accept_count / total_count * 100;
	
	var vHtml = "";
	vHtml += '<div style="width:100%;height:678px;padding:15px;overflow-x:hidden;overflow-y:auto;">';
	vHtml += '	<input type="hidden" id="a1" name="answer[]" value="">';
	vHtml += '	<input type="hidden" id="a2" name="answer[]" value="">';
	vHtml += '	<input type="hidden" id="a3" name="answer[]" value="">';
	vHtml += '	<input type="hidden" id="a4" name="answer[]" value="">';
	vHtml += '	<input type="hidden" id="a5" name="answer[]" value="">';
	vHtml += '	<input type="hidden" id="b1" name="answer1[]" value="">';
	vHtml += '	<input type="hidden" id="b2" name="answer1[]" value="">';
	vHtml += '	<input type="hidden" id="b3" name="answer1[]" value="">';
	vHtml += '	<input type="hidden" id="b4" name="answer1[]" value="">';
	vHtml += '	<input type="hidden" id="b5" name="answer1[]" value="">';
	vHtml += '	<div style="margin:20px 25px;font-size:1.05em !important;font-weight:bold !important;padding:5px;clear:left;">';
	vHtml += '		<p style="font-weight:bold;font-size:1.03em;margin:5px;padding-bottom:5px;">'+reading_question.question+'</p>';
	vHtml += '	</div>';
	vHtml += '	<div style="text-align:center">';
	vHtml += '		<p style="font-size:16px;background-color:#dddddd;color:#333;margin:25px;padding:5px;text-align:center;">Drag your answer choices to the spaces where they belong. To review the passage, click on <span style="font-weight:bold;">View Text</span>.</p>';
	vHtml += '	</div>';
	vHtml += '	<table style="border:none; width:100%">';
	vHtml += '		<tr>';
	vHtml += '			<td width="46%">';
	for(var i=0; i<arr_choices.length; i++)
	{
		var choice = "choice_"+arr_choices[i];
		if(reading_question[choice]){
			var idx = answerArr.indexOf(arr_choices[i].toUpperCase());
			var idx1 = answerArr1.indexOf(arr_choices[i].toUpperCase());

			var select_count = reading_question["answer_count_"+arr_choices[i]];
			
			var rate = select_count / total_count * 100;
			var v_title = ""
			if(is_show_answer){
				v_title = "선택률("+cfmRemoveZeroToFloat(rate)+")% ";
			
				if(select_count > 0)
				{
					v_title += " ["+arr_choices[i].toUpperCase()+":"+select_count+"/"+total_count+"]";
				}
			}
			var style = "border:#CCC solid 1px;";
			if(idx >= 0 && idx1 >= 0)
			{
				if(is_show_answer){
					style = "border:solid 1px #ff0004;";
				}
			}
			
			vHtml += '<div >';
			vHtml += '	<div style="width: 90%;margin: 1px 10px;min-height: 30px;padding:5px;'+style+'" id="'+arr_choices[i].toUpperCase()+'" class="draggable">'+reading_question[choice]+'</div>';
			vHtml += '	<p style="color:#ff0004;margin-left:10px;margin-bottom:0px;">'+v_title+'</p>';
			vHtml += '</div>';
		}
	}	
	vHtml += '			</td>';
	vHtml += '			<td width="46%">';
	vHtml += '				<div>';
	vHtml += '					<p>'+reading_question.qcat1+'</p>';
	for(var i=1; i<=reading_question.qcat1c; i++)
	{
		vHtml += '<div>';
		vHtml += '	<div style="width: 90%;margin: 1px 10px;min-height: 30px;border:#CCC solid 1px;padding:5px" id="d'+i+'" class="droppable"></div>';
		vHtml += '</div>';
	}
	vHtml += '				</div>';
	vHtml += '				<div style="margin-top:10px;">';
	vHtml += '					<p>'+reading_question.qcat2+'</p>';
	for(var i=1; i<=reading_question.qcat2c; i++)
	{
		vHtml += '<div>';
		vHtml += '	<div style="width: 90%;margin: 1px 10px;min-height: 30px;border:#CCC solid 1px;padding:5px" id="e'+i+'" class="droppable1"></div>';
		vHtml += '</div>';
	}
	vHtml += '				</div>';
	vHtml += '			</td>';
	vHtml += '		</tr>';
	vHtml += '	</table>';
	vHtml += '	<div style="font-size:1.05em;font-weight:bold;margin:10px 0;clear:both;text-align:center;">';
	vHtml += '		<p>To review passage, Click "VIEW TEXT".</p>';
	vHtml += '	</div>';
	vHtml += '</div>';
	vHtml += '<p style="margin:10px 0 0 5px;font-weight:bold;font-size:0.9em;text-align:right;">정답률('+cfmRemoveZeroToFloat(total_rate)+')%</p>';
	return vHtml;
}