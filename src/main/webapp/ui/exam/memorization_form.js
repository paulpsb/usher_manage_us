var question_num;
jQuery(document).ready(function(){
	$.ajax({
		type : "POST",
		url : "/exam/getInternalExamsMemorization.do",
		data:{
			id:$("#memorization_id").val()
		},
		success:function(data){
			var memorizationInfo = data.memorizationInfo;
			var memorizationQuestionList  = data.memorizationQuestionList;
			var memorizationQuestionInfo  = data.memorizationQuestionInfo;
			
			CKEDITOR.instances.internal_memorization.setData(memorizationInfo.contents);
			
			question_num = memorizationQuestionInfo.question_num;
			
			$("#td_section").html(memorizationInfo.section);
			$("#td_practice_name").html(memorizationInfo.practice_name);
			$("#td_book").html(memorizationInfo.book);
			$("#td_volume").html(memorizationInfo.volume);
			$("#td_group").html(memorizationInfo.group);
			var v_article = memorizationInfo.article;
			if(memorizationInfo.short_title){
				v_article += " : " + memorizationInfo.short_title;
			}
			$("#td_article").html(v_article);
			$("#easy_mode_time").val(memorizationInfo.easy_mode_time);
			$("#hard_mode_time").val(memorizationInfo.hard_mode_time);
			var vHtml = "";
			var selected = "";
			for(var i=0; i<memorizationQuestionList.length; i++)
			{
				vHtml += '<tr>';
				vHtml += '<td>';
				vHtml += '	<input type="text" class="form-control" id="question_num" name="question_num" value="'+memorizationQuestionList[i].question_num+'">';
				vHtml += '</td>';
				vHtml += '<td colspan="5">';
				vHtml += '	<input type="text" class="form-control" id="question" name="question" value="'+memorizationQuestionList[i].question+'">';
				vHtml += '<div class="form-inline mt-1">';
				vHtml += '	<div class="form-group m-r-10" style="width:20%;">';
				vHtml += '	<select class="form-control" name="is_easy_mode" id="is_easy_mode" style="width:100%;">';
				selected = "";
				if(memorizationQuestionList[i].is_easy_mode == "Y") selected = "selected";
				vHtml += "		<option value='Y' "+selected+">Y</option>";
				selected = "";
				if(memorizationQuestionList[i].is_easy_mode == "N") selected = "selected";
				vHtml += "		<option value='N' "+selected+">N</option>";
				vHtml += '	</select>';
				vHtml += '	</div>';

				vHtml += '	<div class="form-group m-r-10" style="width:20%;">';
				vHtml += '	<select class="form-control" name="is_hard_mod" id="is_hard_mod" style="width:100%;">';
				selected = "";
				if(memorizationQuestionList[i].is_hard_mod == "Y") selected = "selected";
				vHtml += "		<option value='Y' "+selected+">Y</option>";
				selected = "";
				if(memorizationQuestionList[i].is_hard_mod == "N") selected = "selected";
				vHtml += "		<option value='N' "+selected+">N</option>";
				vHtml += '	</select>';
				vHtml += '	</div>';

				vHtml += '	<div class="form-group m-r-10" style="width:20%;">';
				vHtml += '	<select class="form-control" name="score_type" id="score_type" style="width:100%;">';
				selected = "";
				if(memorizationQuestionList[i].score_type == "SIMULATOR") selected = "selected";
				vHtml += "		<option value='SIMULATOR' "+selected+">유사도</option>";
				selected = "";
				if(memorizationQuestionList[i].score_type == "CORRECT") selected = "selected";
				vHtml += "		<option value='CORRECT' "+selected+">정확성</option>";
				vHtml += '	</select>';
				vHtml += '	</div>';

				vHtml += '	<div class="form-group m-r-10" style="width:20%;">';
				vHtml += '	<select class="form-control" name="score_weight" id="score_weight" style="width:100%;">';
				for(var j=1;j<=10; j++)
				{
					selected = "";
					if(memorizationQuestionList[i].score_weight == j) selected = "selected";
					vHtml += "		<option value='"+j+"' "+selected+">"+j+"</option>";
				}
				vHtml += '	</select>';
				vHtml += '	</div>';

				vHtml += '	<div class="form-group">';
				vHtml += "	<button type='button' class='btn btn-sm btn-primary width-60 m-r-2' onclick='delete_question(this)'>삭제</a>";
				vHtml += '	</div>';
				vHtml += '</div>';
				vHtml += '</td>';
				vHtml += '</tr>';
			}
			
			$("#question_list").html(vHtml);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
});

function clear_question()
{
	question_num = 1;
	$("#question_list").html("");
}
function add_question()
{
	var oEditor=CKEDITOR.instances.internal_memorization;
	
	var val = oEditor.getSelection().getRanges()[0];
	var text = oEditor.getSelection().getSelectedText();
	var value = '<span style="color:blue">[SQ'+question_num+']</span>';
	
	if( oEditor.mode == 'wysiwyg' )
	{
		create_question(text);
		oEditor.insertHtml( value );
	}else{
		alert( 'You must be in WYSIWYG mode!' );
	}
	
	question_num++;
}

function create_question(text)
{
	var vHtml = "";
	vHtml += '<tr>';
	vHtml += '<td>';
	vHtml += '	<input type="text" class="form-control" id="question_num" name="question_num" value="'+question_num+'">';
	vHtml += '</td>';
	vHtml += '<td colspan="5">';
	vHtml += '	<input type="text" class="form-control" id="question" name="question" value="'+text+'">';
	vHtml += '<div class="form-inline mt-1">';
	vHtml += '	<div class="form-group m-r-10" style="width:20%;">';
	vHtml += '	<select class="form-control" name="is_easy_mode" id="is_easy_mode" style="width:100%;">';
	vHtml += "		<option value='Y'>Y</option>";
	vHtml += "		<option value='N'>N</option>";
	vHtml += '	</select>';
	vHtml += '	</div>';

	vHtml += '	<div class="form-group m-r-10" style="width:20%;">';
	vHtml += '	<select class="form-control" name="is_hard_mod" id="is_hard_mod" style="width:100%;">';
	vHtml += "		<option value='Y'>Y</option>";
	vHtml += "		<option value='N'>N</option>";
	vHtml += '	</select>';
	vHtml += '	</div>';

	vHtml += '	<div class="form-group m-r-10" style="width:20%;">';
	vHtml += '	<select class="form-control" name="score_type" id="score_type" style="width:100%;">';
	vHtml += "		<option value='SIMULATOR'>유사도</option>";
	vHtml += "		<option value='CORRECT'>정확성</option>";
	vHtml += '	</select>';
	vHtml += '	</div>';

	vHtml += '	<div class="form-group m-r-10" style="width:20%;">';
	vHtml += '	<select class="form-control" name="score_weight" id="score_weight" style="width:100%;">';
	for(var j=1;j<=10; j++)
	{
		vHtml += "		<option value='"+j+"'>"+j+"</option>";
	}
	vHtml += '	</select>';
	vHtml += '	</div>';

	vHtml += '	<div class="form-group">';
	vHtml += "	<button type='button' class='btn btn-sm btn-primary width-60 m-r-2' onclick='delete_question(this)'>삭제</a>";
	vHtml += '	</div>';
	vHtml += '</div>';
	vHtml += '</td>';
	vHtml += '</tr>';

	$("#question_list").append(vHtml);
}

function move_list()
{
	location.href = "/exam/memorization_list.do?page="+$("#v_page").val()+"&&section="+$("#v_section").val()+"&&practice_type="+$("#v_practice_type").val()+"&&book="+$("#v_book").val()+"&&volume="+$("#v_volume").val();
}


function delete_question(obj)
{
	$(obj).closest("tr").remove();
	alert("지문에서 해당 문제번호를 지워주셔야 합니다.");
	
}

function save_form()
{
	var array_question = Array();

	var $el_question_num       = $("input[name=question_num]");
	var $el_question           = $("input[name=question]");
	var $el_is_easy_mode       = $("select[name=is_easy_mode]");
	var $el_is_hard_mod        = $("select[name=is_hard_mod]");
	var $el_score_type         = $("select[name=score_type]");
	var $el_score_weight       = $("select[name=score_weight]");

	$el_question_num.each(function(index) {
		var objQuestion = Object();
		objQuestion.question_num = $(this).val();
		objQuestion.question     = $el_question.eq(index).val();
		objQuestion.is_easy_mode = $el_is_easy_mode.eq(index).val();
		objQuestion.is_hard_mod  = $el_is_hard_mod.eq(index).val();
		objQuestion.score_type   = $el_score_type.eq(index).val();
		objQuestion.score_weight = $el_score_weight.eq(index).val();
	
		array_question.push(objQuestion);
	});
	console.log(array_question);
	$.ajax({
		type : "POST",
		url : "/exam/saveInternalExamsMemorization.do",
		data:{
			id:$("#memorization_id").val(),
			contents:CKEDITOR.instances.internal_memorization.getData(),
			easy_mode_time:$("#easy_mode_time").val(),
			hard_mode_time:$("#hard_mode_time").val(),
			data_value:JSON.stringify(array_question)
		},
		success:function(data){
			alert("저장하였습니다.");
			move_list();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}
