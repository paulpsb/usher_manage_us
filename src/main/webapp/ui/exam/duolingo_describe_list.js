var section = "DUOLINGO";

/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	$("#itemBoxWrap").sortable({
		start: function(event, ui) {
			ui.item.data('start_pos', ui.item.index());
		},
		stop: function(event, ui) {
			var spos = ui.item.data('start_pos');
			var epos = ui.item.index();
		}
	});
	
	search_volume();
});

/*
 * 설명 : 년/월 조회
 */
function search_volume()
{

	$.ajax({
		type : "POST",
		url : "/common/getProblemVolumeList.do",
		data:{
			section:section,
			book:$('#search_book').val()
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				var selected = "";
				vHtml += "<option value='"+data[i].volume+"' "+selected+">"+data[i].volume+"</option>";
			}
			if(data.length == 0){
				vHtml += "<option value=''></option>";
			}
			$("#search_volume").html(vHtml);
			$('#search_volume').change(function(e){
				search_group();
			});	
			search_group();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

/*
 * 설명 : 년/월 조회
 */
function search_group()
{

	$.ajax({
		type : "POST",
		url : "/common/getProblemGroupList.do",
		data:{
			section:section,
			book:$('#search_book').val(),
			volume:$('#search_volume').val()
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				var selected = "";
				vHtml += "<option value='"+data[i].group+"' "+selected+">"+data[i].group+"</option>";
			}
			if(data.length == 0){
				vHtml += "<option value=''></option>";
			}
			$("#search_group").html(vHtml);
			$('#search_group').change(function(e){
				search_article();
			});	
			search_article();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

/*
 * 설명 : 년/월 조회
 */
function search_article()
{

	$.ajax({
		type : "POST",
		url : "/common/getProblemArticleList.do",
		data:{
			section:section,
			book:$('#search_book').val(),
			volume:$('#search_volume').val(),
			group:$('#search_group').val()
		},
		success:function(data){
			var vHtml = "";
			vHtml += "<option value=''></option>";
			for(var i=0; i<data.length; i++){
				var selected = "";
				vHtml += "<option value='"+data[i].article+"' "+selected+">"+data[i].article+"</option>";
			}
			$("#search_article").html(vHtml);
			$('#search_article').change(function(e){
				form_search();
			});	
			form_search();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function form_search()
{
	$.ajax({
		type : "POST",
		url : "/exam/getExamsDuolingoDescribeList.do",
		data:{
			section:section,
			book:$('#search_book').val(),
			volume:$('#search_volume').val(),
			group:$('#search_group').val(),
			article:$('#search_article').val()
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				vHtml += '<tr class="itemBox">';
				vHtml += '	<td class="text-with-form-control text-center"><i class="fas fa-arrows-alt"></i></td>';
				vHtml += '	<td>'+data[i].book+'</td>';
				vHtml += '		<input type="hidden" name="describe_id" value="'+data[i].id+'">';
				vHtml += '		<input type="hidden" name="describe_sort" value="'+data[i].describe_sort+'">';
				vHtml += '	</td>';
				vHtml += '	<td>'+data[i].volume+'</td>';
				vHtml += '	<td>'+data[i].group+'</td>';
				vHtml += '	<td>'+data[i].article+'</td>';
				vHtml += '	<td>'+data[i].describe_title+'</td>';
				vHtml += "	<td class='with-btn text-center' nowrap=''>";
				vHtml += "		<button type='button' class='btn btn-sm btn-primary' onclick='form_modify("+data[i].id+")'>수정</button>";
				vHtml += "		<button type='button' class='btn btn-sm btn-danger' onclick='form_delete("+data[i].id+")'>삭제</button>";
				vHtml += "	</td>";
				vHtml += '</tr>';
			}
			
			$("#itemBoxWrap").html(vHtml);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

var v_describe_id;
function form_add()
{
	v_describe_id = 0;
	$("#question_list").html("");
	$("#describe_title").val("");

	$("#modal-describe").modal();
}

function form_modify(v_id)
{
	v_describe_id = v_id;
	$.ajax({
		type : "POST",
		url : "/exam/getExamsDuolingoDescribe.do",
		data:{
			id:v_id
		},
		success:function(data){
			var describeInfo = data.describeInfo;
			var describeQuestionList = data.describeQuestionList;
			$("#question_list").html("");
			$("#describe_title").val(describeInfo.describe_title);
			
			for(var i=0; i<describeQuestionList.length; i++)
			{
				var v_describe_question               = describeQuestionList[i].describe_question;
				var v_describe_question_keyword       = describeQuestionList[i].describe_question_keyword;
				var v_describe_question_score_keyword = describeQuestionList[i].describe_question_score_keyword;
				var v_describe_question_score_word    = describeQuestionList[i].describe_question_score_word;
				var v_describe_question_sort          = describeQuestionList[i].describe_question_sort;
				
				add_question(v_describe_question, v_describe_question_keyword, v_describe_question_score_keyword, v_describe_question_score_word, v_describe_question_sort)
			}
			if(data.image_url){
				$("#div_image_url").html("<img src='"+data.image_url+"' style='width:100%;'>");
			}
			$("#modal-describe").modal();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

function form_add_question()
{
	add_question("","","","","");
}

function add_question(v_describe_question, v_describe_question_keyword, v_describe_question_score_keyword, v_describe_question_score_word, v_describe_question_sort)
{
	var vHtml = "";
	vHtml += '<tr>';
	vHtml += '	<td class="text-with-form-control" colspan="3">';
	vHtml += '		<input class="form-control" type="text" name="describe_question" value="'+v_describe_question+'">';
	vHtml += '	</td>';
	vHtml += '	<td class="text-with-form-control" rowspan="2">';
	vHtml += '		<textarea class="form-control" name="describe_question_keyword" style="height:80px;">'+v_describe_question_keyword+'</textarea>';
	vHtml += '	</td>';
	vHtml += "	<td class='with-btn text-center' nowrap=''  rowspan='2'>";
	vHtml += "		<button type='button' class='btn btn-sm btn-danger' onclick='form_delete_question(this)'>삭제</button>";
	vHtml += "	</td>";
	vHtml += '</tr>';
	vHtml += '<tr>';
	vHtml += '	<td class="text-with-form-control">';
	vHtml += '		<input class="form-control" type="text" name="describe_question_score_keyword" value="'+v_describe_question_score_keyword+'">';
	vHtml += '	</td>';
	vHtml += '	<td class="text-with-form-control">';
	vHtml += '		<input class="form-control" type="text" name="describe_question_score_word" value="'+v_describe_question_score_word+'">';
	vHtml += '	</td>';
	vHtml += '	<td class="text-with-form-control">';
	vHtml += '		<input class="form-control" type="text" name="describe_question_sort" value="'+v_describe_question_sort+'">';
	vHtml += '	</td>';
	vHtml += '</tr>';
	
	$("#question_list").append(vHtml);
}

function form_delete_question(obj)
{
	$(obj).closest("tr").remove();
}

function form_delete(v_id)
{
	if(!confirm("삭제하시겠습니까?")) return;
	
	$.ajax({
		type : "POST",
		url : "/exam/deleteExamsDuolingoDescribe.do",
		data:{
			id:v_id
		},
		success:function(data){
			alert("삭제하였습니다.");
			form_search();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function form_save()
{
	var $_describe_question                = $("input[name='describe_question']");
	var $_describe_question_keyword        = $("textarea[name='describe_question_keyword']");
	var $_describe_question_score_keyword  = $("input[name='describe_question_score_keyword']");
	var $_describe_question_score_word     = $("input[name='describe_question_score_word']");
	var $_describe_question_sort           = $("input[name='describe_question_sort']");
	
	var array_data = Array();
	$_describe_question.each(function(index) {
		var describe_question                = $(this).val();
		var describe_question_keyword        = $_describe_question_keyword.eq(index).val();
		var describe_question_score_keyword  = $_describe_question_score_keyword.eq(index).val();
		var describe_question_score_word     = $_describe_question_score_word.eq(index).val();
		var describe_question_sort           = $_describe_question_sort.eq(index).val();
		
		var objData = Object();
		objData.describe_question               = describe_question;
		objData.describe_question_keyword       = describe_question_keyword;
		objData.describe_question_score_keyword = describe_question_score_keyword;
		objData.describe_question_score_word    = describe_question_score_word;
		objData.describe_question_sort          = describe_question_sort;

		array_data.push(objData);
    });
	
	var data_value = JSON.stringify(array_data);
	
	var url = "/exam/insertExamsDuolingoDescribe.do";
	if(v_describe_id > 0) url = "/exam/updateExamsDuolingoDescribe.do";
	$.ajax({
		type : "POST",
		url : url,
		data:{
			id:v_describe_id,
			section:section,
			book:$('#search_book').val(),
			volume:$('#search_volume').val(),
			group:$('#search_group').val(),
			article:$('#search_article').val(),
			status:"ACTIVE",
			describe_title:$("#describe_title").val(),
			data_value:data_value
		},
		success:function(data){
			alert("저장하였습니다.");
			$("#modal-describe").modal("hide");
			form_search();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

function form_save_sort()
{
	var $_describe_id           = $("input[name='describe_id']");
	var $_describe_sort         = $("input[name='describe_sort']");
	
	var array_data = Array();
	var describe_sort = 1;
	$_describe_id.each(function(index) {
		var describe_id              = $(this).val();
		var old_describe_sort        = $_describe_sort.eq(index).val();
		
		var objData = Object();
		objData.describe_id   = describe_id;
		objData.describe_sort = describe_sort;
		if(old_describe_sort != describe_sort){
			array_data.push(objData);
		}
		
		describe_sort++;
    });
	
	var data_value = JSON.stringify(array_data);
	
	$.ajax({
		type : "POST",
		url : "/exam/updateExamsDuolingoDescribeSort.do",
		data:{
			data_value:data_value
		},
		success:function(data){
			alert("저장하였습니다.");
			form_search();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}