var resultInfo;
var ruburiInfo;
var penInfo;
var noteInfo;
var examRuburicInfo;

var rubric_score01 = 0;
var rubric_score02 = 0;
var rubric_score03 = 0;
var rubric_score04 = 0;
var rubric_score05 = 0;
var rubric_score06 = 0;
var rubric_score07 = 0;
var rubric_score08 = 0;
var rubric_score09 = 0;
var rubric_score10 = 0;

jQuery(document).ready(function(){
	$(window).resize(resizeContents);
    resizeContents();
    
	search_form();
});

/*
 * 설명 : 화면 사이즈 변경시 문제 영역 변경
 */
function resizeContents()
{
	//현재의 사이즈를 찾는다.
	var window_size = $(window).height();
	
	$("#div_container").height(window_size-150);

}

function search_form()
{
	$.ajax({
		type : "POST",
		url : "/correction/correct/getWritingResult.do",
		data:{
			id:$("#correction_exams_answer_id").val()
		},
		success:function(data){	
			resultInfo = data.resultInfo;
			ruburiInfo = data.ruburiInfo;;
			penInfo    = data.penInfo;;
			noteInfo   = data.noteInfo;
			
			examRuburicInfo =  data.examRuburicInfo;
			
			$("#rubric_standard").html(data.examRuburicStandardInfo.ruburic_standard);
			
			var remain_time = resultInfo.exam_time;
			
			var min;
			var sec;
			
			min = Math.floor( remain_time / 60 );
			sec = remain_time - (min*60);
			
			if(min < 10) min = "0" + min;
			if(sec < 10) sec = "0" + sec;
			
			$("#writing_question").html("<b>Question : </b>"+resultInfo.question);
			$("#reg_date").html("<b>작성일 : </b>"+resultInfo.date);
			$("#writing_exam_time").html("<b>남은제한시간 : </b>"+min+":"+sec);
			$("#writing_answer").html(resultInfo.answer.replace(/\n/g, '<br/>'));
			
			var vHtml = "";
			vHtml += '<p style="margin:0;padding:0;width:100%;padding:10px;background:#a52626;color:#ffffff;">개인 딕테이 작성 일시 : '+resultInfo.answer_pen_date+'</p>';
			vHtml += '<div style="margin-top:20px;padding:30px;margin-bottom:20px;">'+resultInfo.answer_pen.replace(/\n/g, '<br/>')+'</div>';
			$("#writing_user_result").html(vHtml);
			
			if(ruburiInfo){
				$("#rubric_date").html('작성 일시 : '+ruburiInfo.modified);
				$("#rubric_writer").html('Rubric 채점자 : '+ruburiInfo.rubric_name);
				
				rubric_score01 = ruburiInfo.rubric_score01;
				rubric_score02 = ruburiInfo.rubric_score02;
				rubric_score03 = ruburiInfo.rubric_score03;
				rubric_score04 = ruburiInfo.rubric_score04;
				rubric_score05 = ruburiInfo.rubric_score05;
				rubric_score06 = ruburiInfo.rubric_score06;
				rubric_score07 = ruburiInfo.rubric_score07;
				rubric_score08 = ruburiInfo.rubric_score08;
				rubric_score09 = ruburiInfo.rubric_score09;
				rubric_score10 = ruburiInfo.rubric_score10;
				
			}
			create_rubric();
			
			
			$('#rubric_01_'+rubric_score01).prop("checked", true);
			$('#rubric_02_'+rubric_score02).prop("checked", true);
			$('#rubric_03_'+rubric_score03).prop("checked", true);
			$('#rubric_04_'+rubric_score04).prop("checked", true);
			$('#rubric_05_'+rubric_score05).prop("checked", true);
			$('#rubric_06_'+rubric_score06).prop("checked", true);
			$('#rubric_07_'+rubric_score07).prop("checked", true);
			$('#rubric_08_'+rubric_score08).prop("checked", true);
			$('#rubric_09_'+rubric_score09).prop("checked", true);
			$('#rubric_10_'+rubric_score10).prop("checked", true);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function create_rubric()
{
	var vHtml = "";
	
	vHtml += '<table class="table table-bordered">';
	for(var i=0; i<examRuburicInfo.length; i++)
	{
		var ruburic_num = examRuburicInfo[i].ruburic_num;
		var ruburic_category_title = examRuburicInfo[i].ruburic_category_title;
		var ruburic_category_sub   = examRuburicInfo[i].ruburic_category_sub;
		var ruburic_content_title  = examRuburicInfo[i].ruburic_content_title;
		var ruburic_content_sub    = examRuburicInfo[i].ruburic_content_sub;
		var ruburic_num = examRuburicInfo[i].ruburic_num;
		if(i==0 || (ruburic_category_title != examRuburicInfo[i-1].ruburic_category_title || ruburic_category_sub != examRuburicInfo[i-1].ruburic_category_sub)){
			vHtml += '	<thead class="thead-light">';
			vHtml += '		<tr>';
			vHtml += '			<th style="text-align:center;border: 1px solid #000;vertical-align: middle;">'+ruburic_category_title+'</th>';
			vHtml += '			<th style="text-align:center;border: 1px solid #000;vertical-align: middle;">'+ruburic_category_sub+'</th>';
			vHtml += '			<th style="text-align:center;border: 1px solid #000;vertical-align: middle;">Weak</th>';
			vHtml += '			<th style="text-align:center;border: 1px solid #000;vertical-align: middle;">Limited</th>';
			vHtml += '			<th style="text-align:center;border: 1px solid #000;vertical-align: middle;">Fair</th>';
			vHtml += '			<th style="text-align:center;border: 1px solid #000;vertical-align: middle;">Good</th>';
			vHtml += '		</tr>';
			vHtml += '	</thead>';
		}
		vHtml += '	<tbody>';
		var nId = ""+ruburic_num;
		
		if(ruburic_num < 10) nId = "0"+ruburic_num;
		
		vHtml += '		<tr>';
		vHtml += '			<td style="text-align:center;border: 1px solid #000;vertical-align: middle;">'+ruburic_content_title+'</td>';
		vHtml += '			<td style="border: 1px solid #000;vertical-align: middle;">'+ruburic_content_sub+'</td>';
		vHtml += '			<td style="text-align:center;border: 1px solid #000;vertical-align: middle;"><input type="radio" name="rubric_'+nId+'" id="rubric_'+nId+'_0" value="0"></td>';
		vHtml += '			<td style="text-align:center;border: 1px solid #000;vertical-align: middle;"><input type="radio" name="rubric_'+nId+'" id="rubric_'+nId+'_1" value="1"></td>';
		vHtml += '			<td style="text-align:center;border: 1px solid #000;vertical-align: middle;"><input type="radio" name="rubric_'+nId+'" id="rubric_'+nId+'_2" value="2"></td>';
		vHtml += '			<td style="text-align:center;border: 1px solid #000;vertical-align: middle;"><input type="radio" name="rubric_'+nId+'" id="rubric_'+nId+'_3" value="3"></td>';
		vHtml += '		</tr>';
		vHtml += '	</tbody>';
	}
	vHtml += '</table>';
	$("#rubric_data").html(vHtml);
}

function save_rubric()
{
	rubric_score01 = parseInt($('input[name="rubric_01"]:checked').val());
	rubric_score02 = parseInt($('input[name="rubric_02"]:checked').val());
	rubric_score03 = parseInt($('input[name="rubric_03"]:checked').val());
	rubric_score04 = parseInt($('input[name="rubric_04"]:checked').val());
	rubric_score05 = parseInt($('input[name="rubric_05"]:checked').val());
	rubric_score06 = parseInt($('input[name="rubric_06"]:checked').val());
	rubric_score07 = parseInt($('input[name="rubric_07"]:checked').val());
	rubric_score08 = parseInt($('input[name="rubric_08"]:checked').val());
	rubric_score09 = parseInt($('input[name="rubric_09"]:checked').val());
	rubric_score10 = parseInt($('input[name="rubric_10"]:checked').val());
	
	var rubric_total_score = rubric_score01 + rubric_score02 + rubric_score03 + rubric_score04 + rubric_score05 + rubric_score06 + rubric_score07 + rubric_score08 + rubric_score09 + rubric_score10;
	$.ajax({
		type : "POST",
		url : "/correction/correct/saveWritingTestRubric.do",
		data:{
			correction_exams_answer_id:$("#correction_exams_answer_id").val(),
			rubric_score01:rubric_score01,
			rubric_score02:rubric_score02,
			rubric_score03:rubric_score03,
			rubric_score04:rubric_score04,
			rubric_score05:rubric_score05,
			rubric_score06:rubric_score06,
			rubric_score07:rubric_score07,
			rubric_score08:rubric_score08,
			rubric_score09:rubric_score09,
			rubric_score10:rubric_score10,
			rubric_total_score:rubric_total_score,
		},
		success:function(data){	
			alert("저장하였습니다.");
			opener.search_form();
			self.close();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}