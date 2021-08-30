var section = "DUOLINGO";
var array_delete;
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
				vHtml += "<option value='"+data[i].volume+"'>"+data[i].volume+"</option>";
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
				vHtml += "<option value='"+data[i].group+"'>"+data[i].group+"</option>";
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
				vHtml += "<option value='"+data[i].article+"'>"+data[i].article+"</option>";
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
		url : "/exam/getExamsDuolingoSentenceList.do",
		data:{
			section:section,
			book:$('#search_book').val(),
			volume:$('#search_volume').val(),
			group:$('#search_group').val(),
			article:$('#search_article').val()
		},
		success:function(data){
			array_delete = Array();
			$("#itemBoxWrap").html("");
			for(var i=0; i<data.length; i++){
				$(createItemContent("U", data[i].id, data[i].status, data[i].sentence_doc, data[i].sentence_sort)).appendTo("#itemBoxWrap");
			}
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function form_add()
{
	$(createItemContent("I", 0,"ACTIVE","",0)).appendTo("#itemBoxWrap");
}

function form_add_multi()
{
	$("#add_multi_sentence").val("");
	$("#modal-add-multi").modal();
}

function add_multi()
{
	var v_add_multi_sentence = $("#add_multi_sentence").val();
	if(v_add_multi_sentence){
		var array_voca_sentences = v_add_multi_sentence.split("\n");
		for(var i=0; i<array_voca_sentences.length; i++){
			var voca_sentences = array_voca_sentences[i];
			if(voca_sentences){
				$(createItemContent("I", 0,"ACTIVE",voca_sentences,0)).appendTo("#itemBoxWrap");
				
			}
		}
	}
	$("#modal-add-multi").modal("hide");
}


function createItemContent(v_flag, v_id, v_status, v_sentence_doc, v_sentence_sort)
{
	var content = "";
	content += '<tr class="itemBox">';
	content += '	<td class="text-with-form-control text-center"><i class="fas fa-arrows-alt"></i></td>';
	content += '	<td class="text-with-form-control">';
	content += '		<input type="hidden" name="sentence_flag" value="'+v_flag+'">';
	content += '		<input type="hidden" name="sentence_id" value="'+v_id+'">';
	content += '		<input type="hidden" name="old_sentence_doc" value="'+v_sentence_doc+'">';
	content += '		<input type="hidden" name="old_sentence_sort" value="'+v_sentence_sort+'">';
	content += '		<input type="text" class="form-control" name="sentence_doc" value="'+v_sentence_doc+'">';
	content += '	</td>';
	content += "	<td class='with-btn text-center' nowrap=''>";
	content += "		<button type='button' class='btn btn-sm btn-danger' onclick='form_delete(this)'>삭제</button>";
	content += "	</td>";
	content += '</tr>';
	
	return content;
	
}

function form_delete(obj)
{
	var sentence_flag             = $(obj).closest("tr").find("input[name='sentence_flag']").val();
	var sentence_id               = $(obj).closest("tr").find("input[name='sentence_id']").val();
	var sentence_doc              = $(obj).closest("tr").find("input[name='sentence_doc']").val();
	var sentence_sort             = $(obj).closest("tr").find("input[name='old_sentence_sort']").val();
	if(sentence_flag == "U"){
		var objData = Object();
		objData.flag                      = 'D';
		objData.section                   = section,
		objData.book                      = $('#search_book').val();
		objData.volume                    = $('#search_volume').val();
		objData.group                     = $('#search_group').val();
		objData.article                   = $('#search_article').val();		
		objData.status                    = "ACTIVE";
		objData.sentence_id               = sentence_id;
		objData.sentence_doc              = sentence_doc;
		objData.sentence_sort             = sentence_sort;
		
		array_delete.push(objData);
	}
	
	$(obj).closest("tr").remove();
}


function form_save()
{
	var array_data = Array();
	for(var i=0; i<array_delete.length; i++)
	{
		array_data.push(array_delete[i]);
	}
	
	var $_sentence_flag         = $("input[name='sentence_flag']");
	var $_sentence_id           = $("input[name='sentence_id']");
	var $_sentence_doc          = $("input[name='sentence_doc']");
	var $_old_sentence_doc      = $("input[name='old_sentence_doc']");
	var $_old_sentence_sort     = $("input[name='old_sentence_sort']");
	var sentence_sort    = 1;
	$_sentence_flag.each(function(index) {
		var sentence_flag              = $(this).val();
		var sentence_id                = $_sentence_id.eq(index).val();
		var sentence_doc               = $_sentence_doc.eq(index).val();
		var old_sentence_doc           = $_old_sentence_doc.eq(index).val();
		var old_sentence_sort          = $_old_sentence_sort.eq(index).val();
		
		var objData = Object();
		objData.flag                       = sentence_flag;
		objData.section                    = section,
		objData.book                       = $('#search_book').val();
		objData.volume                     = $('#search_volume').val();
		objData.group                      = $('#search_group').val();
		objData.article                    = $('#search_article').val();
		objData.status                     = "ACTIVE";
		objData.sentence_id                = sentence_id;
		objData.sentence_doc               = sentence_doc;
		objData.sentence_sort              = sentence_sort;
		if(sentence_flag == "U"){
			if(sentence_doc != old_sentence_doc || sentence_sort != old_sentence_sort){
				array_data.push(objData);
			}
		}else{
			array_data.push(objData);
		}
		
		sentence_sort++;
    });

	var data_value = JSON.stringify(array_data);
	
	$.ajax({
		type : "POST",
		url : "/exam/saveExamsDuolingoSentence.do",
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