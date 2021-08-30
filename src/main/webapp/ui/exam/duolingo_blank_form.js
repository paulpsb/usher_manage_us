var v_section = "";
var v_book = "";
var v_volume = "";
var v_group = "";
var v_article = "";
var v_blank_id = "";

var question_num;
/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	v_section  = $('#v_section').val();
	v_book     = $('#v_book').val();
	v_volume   = $('#v_volume').val();
	v_group    = $('#v_group').val();
	v_article  = $('#v_article').val();
	v_blank_id = parseInt($('#v_blank_id').val());
	question_num = 1;
	if(v_blank_id > 0)
	{
		$.ajax({
			type : "POST",
			url : "/exam/getExamsDuolingoBlank.do",
			data:{
				id:v_blank_id
			},
			success:function(data){
				var blankInfo = data.blankInfo;
				var blankQuestionInfo = data.blankQuestionInfo;
				var blankQuestionList  = data.blankQuestionList;

				$("#blank_title").val(blankInfo.blank_title);
				
				CKEDITOR.instances.blank_contents.setData(blankInfo.blank_contents);
				
				question_num = blankQuestionInfo.question_num;
				
				var vHtml = "";
				for(var i=0; i<blankQuestionList.length; i++)
				{
					vHtml += '<tr>';
					vHtml += '<td>';
					vHtml += '	<input type="text" class="form-control" id="question_num" name="question_num" value="'+blankQuestionList[i].question_num+'">';
					vHtml += '</td>';
					vHtml += '<td>';
					vHtml += '	<input type="text" class="form-control" id="question" name="question" value="'+blankQuestionList[i].question+'">';
					vHtml += '</td>';
					vHtml += '</tr>';
				}
				
				$("#question_list").html(vHtml);
			},
			error:function(event){				
				alert("잠시후 다시 시도 바랍니다.");
			}
		});	
	}
});

function clear_question()
{
	question_num = 1;
	$("#question_list").html("");
}
function add_question()
{
	var oEditor=CKEDITOR.instances.blank_contents;
	
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
	vHtml += '<td>';
	vHtml += '	<input type="text" class="form-control" id="question" name="question" value="'+text+'">';
	vHtml += '</td>';
	vHtml += '</tr>';

	$("#question_list").append(vHtml);
}

function move_list()
{
	var url = "";
	url += "/exam/duolingo_blank_list.do?";
	url += "section="+v_section;
	url += "&&book="+v_book;
	url += "&&volume="+v_volume;
	url += "&&group="+v_group;
	url += "&&article="+v_article;
	location.href = url;
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

	$el_question_num.each(function(index) {
		var objQuestion = Object();
		objQuestion.question_num = $(this).val();
		objQuestion.question     = $el_question.eq(index).val();
	
		array_question.push(objQuestion);
	});

	var url = "/exam/insertExamsDuolingoBlank.do";
	if(v_blank_id > 0) url = "/exam/updateExamsDuolingoBlank.do";
	$.ajax({
		type : "POST",
		url : url,
		data:{
			id:v_blank_id,
			section:v_section,
			book:v_book,
			volume:v_volume,
			group:v_group,
			article:v_article,
			status:"ACTIVE",
			blank_title:$("#blank_title").val(),
			blank_contents:CKEDITOR.instances.blank_contents.getData(),
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
