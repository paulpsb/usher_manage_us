var section = "DUOLINGO";
var array_delete;
var lang_list;
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
	
	search_lang();
});

function search_lang()
{
	$.ajax({
		type : "POST",
		url : "/exam/getExamsDuolingoVocaLangList.do",
		data:{
			
		},
		success:function(data){
			lang_list = data;
			search_volume()
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

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
		url : "/exam/getExamsDuolingoVocaList.do",
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
				$(createItemContent("U", data[i].id, data[i].status, data[i].voca_lang_code, data[i].voca_word, data[i].voca_word_translation, data[i].voca_word_sort)).appendTo("#itemBoxWrap");
			}
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function form_add()
{
	$(createItemContent("I", 0,"ACTIVE","en-US","","Y",0)).appendTo("#itemBoxWrap");
}

function form_add_multi()
{
	$("#add_multi_voca").val("");
	$("#modal-add-multi").modal();
}

function add_multi()
{
	var v_add_multi_voca = $("#add_multi_voca").val();
	if(v_add_multi_voca){
		var array_voca_words = v_add_multi_voca.split("\n");
		for(var i=0; i<array_voca_words.length; i++){
			var voca_words = array_voca_words[i];
			if(voca_words){
				var array_voca_word = voca_words.split("\t");
				var v_voca_word = array_voca_word[0];
				var v_voca_lang_code = array_voca_word[1];
				if(!v_voca_lang_code) v_voca_lang_code =  "en-US";
				$(createItemContent("I", 0,"ACTIVE",v_voca_lang_code,v_voca_word,"Y",0)).appendTo("#itemBoxWrap");
				
			}
		}
	}
	$("#modal-add-multi").modal("hide");
}


function createItemContent(v_flag, v_id, v_status, v_voca_lang_code, v_voca_word, v_voca_word_translation, v_voca_word_sort)
{
	var content = "";
	content += '<tr class="itemBox">';
	content += '	<td class="text-with-form-control text-center"><i class="fas fa-arrows-alt"></i></td>';
	content += '	<td class="text-with-form-control">';
	content += '		<input type="hidden" name="voca_word_flag" value="'+v_flag+'">';
	content += '		<input type="hidden" name="voca_word_id" value="'+v_id+'">';
	content += '		<input type="hidden" name="old_voca_lang_code" value="'+v_voca_lang_code+'">';
	content += '		<input type="hidden" name="old_voca_word" value="'+v_voca_word+'">';
	content += '		<input type="hidden" name="old_voca_word_translation" value="'+v_voca_word_translation+'">';
	content += '		<input type="hidden" name="voca_word_translation" value="'+v_voca_word_translation+'">';
	content += '		<input type="hidden" name="old_voca_word_sort" value="'+v_voca_word_sort+'">';
	content += '		<input type="text" class="form-control" name="voca_word" value="'+v_voca_word+'">';
	content += '	</td>';
	content += '	<td class="text-center">';
	content += '		<select class="form-control" name="voca_lang_code">';
	var selected = "";
	for(var i=0; i<lang_list.length; i++)
	{
		selected = "";
		var lang_code = lang_list[i].voca_lang_code;
		var lang_name = lang_list[i].voca_lang_name;
		if(lang_code == v_voca_lang_code) selected = "selected";
		content += '			<option value="'+lang_code+'" '+selected+'>'+lang_name+'</option>';
	}
	content += '		</select>';
	content += '	</td>';
	content += "	<td class='with-btn text-center' nowrap=''>";
	content += "		<button type='button' class='btn btn-sm btn-danger' onclick='form_delete(this)'>삭제</button>";
	content += "	</td>";
	content += '</tr>';
	
	return content;
	
}

function form_delete(obj)
{
	var voca_word_flag             = $(obj).closest("tr").find("input[name='voca_word_flag']").val();
	var voca_word_id               = $(obj).closest("tr").find("input[name='voca_word_id']").val();
	var voca_lang_code             = $(obj).closest("tr").find("select[name='voca_lang_code']").val();
	var voca_word                  = $(obj).closest("tr").find("input[name='voca_word']").val();
	var voca_word_translation      = $(obj).closest("tr").find("input[name='voca_word_translation']").val();
	var voca_word_sort             = $(obj).closest("tr").find("input[name='old_voca_word_sort']").val();
	if(voca_word_flag == "U"){
		var objData = Object();
		objData.flag                       = 'D';
		objData.section                    = section,
		objData.book                       = $('#search_book').val();
		objData.volume                     = $('#search_volume').val();
		objData.group                      = $('#search_group').val();
		objData.article                    = $('#search_article').val();		
		objData.status                     = "ACTIVE";
		objData.voca_word_id               = voca_word_id;
		objData.voca_lang_code             = voca_lang_code;
		objData.voca_word                  = voca_word;
		objData.voca_word_translation      = voca_word_translation;
		objData.voca_word_sort             = voca_word_sort;
		
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
	
	var $_voca_word_flag                 = $("input[name='voca_word_flag']");
	var $_voca_word_id                   = $("input[name='voca_word_id']");
	var $_voca_lang_code                 = $("select[name='voca_lang_code']");
	var $_voca_word                      = $("input[name='voca_word']");
	var $_voca_word_translation          = $("input[name='voca_word_translation']");
	var $_old_voca_lang_code             = $("input[name='old_voca_lang_code']");
	var $_old_voca_word                  = $("input[name='old_voca_word']");
	var $_old_voca_word_translation      = $("input[name='old_voca_word_translation']");
	var $_old_voca_word_sort             = $("input[name='old_voca_word_sort']");
	var voca_word_sort    = 1;
	$_voca_word_flag.each(function(index) {
		var voca_word_flag                 = $(this).val();
		var voca_word_id                   = $_voca_word_id.eq(index).val();
		var voca_lang_code                 = $_voca_lang_code.eq(index).val();
		var voca_word                      = $_voca_word.eq(index).val();
		var voca_word_translation          = $_voca_word_translation.eq(index).val();
		var old_voca_lang_code             = $_old_voca_lang_code.eq(index).val();
		var old_voca_word                  = $_old_voca_word.eq(index).val();
		var old_voca_word_translation      = $_old_voca_word_translation.eq(index).val();
		var old_voca_word_sort             = $_old_voca_word_sort.eq(index).val();
		
		var objData = Object();
		objData.flag                       = voca_word_flag;
		objData.section                    = section,
		objData.book                       = $('#search_book').val();
		objData.volume                     = $('#search_volume').val();
		objData.group                      = $('#search_group').val();
		objData.article                    = $('#search_article').val();
		objData.status                     = "ACTIVE";
		objData.voca_word_id               = voca_word_id;
		objData.voca_lang_code             = voca_lang_code;
		objData.voca_word                  = voca_word;
		objData.voca_word_translation      = voca_word_translation;
		objData.voca_word_sort             = voca_word_sort;
		if(voca_word_flag == "U"){
			if(voca_lang_code != old_voca_lang_code || voca_word != old_voca_word || voca_word_translation != old_voca_word_translation || voca_word_sort != old_voca_word_sort){
				array_data.push(objData);
			}
		}else{
			array_data.push(objData);
		}
		
		voca_word_sort++;
    });

	var data_value = JSON.stringify(array_data);
	
	$.ajax({
		type : "POST",
		url : "/exam/saveExamsDuolingoVoca.do",
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