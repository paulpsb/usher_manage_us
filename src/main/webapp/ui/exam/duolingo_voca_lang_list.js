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
	
	form_search();
});

function form_search()
{
	$.ajax({
		type : "POST",
		url : "/exam/getExamsDuolingoVocaLangList.do",
		data:{
			
		},
		success:function(data){
			array_delete = Array();
			$("#itemBoxWrap").html("");
			for(var i=0; i<data.length; i++){
				$(createItemContent("U", data[i].id, data[i].status, data[i].voca_lang_code, data[i].voca_lang_name, data[i].voca_lang_translation_code, data[i].voca_lang_sort)).appendTo("#itemBoxWrap");
			}
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function form_add()
{
	$(createItemContent("I", 0,"ACTIVE","","","",0)).appendTo("#itemBoxWrap");
}


function createItemContent(v_flag, v_id, v_status, v_voca_lang_code, v_voca_lang_name, v_voca_lang_translation_code, v_voca_lang_sort)
{
	var content = "";
	content += '<tr class="itemBox">';
	content += '	<td class="text-with-form-control text-center"><i class="fas fa-arrows-alt"></i></td>';
	content += '	<td class="text-with-form-control">';
	content += '		<input type="hidden" name="voca_lang_flag" value="'+v_flag+'">';
	content += '		<input type="hidden" name="voca_lang_id" value="'+v_id+'">';
	content += '		<input type="hidden" name="old_voca_lang_code" value="'+v_voca_lang_code+'">';
	content += '		<input type="hidden" name="old_voca_lang_name" value="'+v_voca_lang_name+'">';
	content += '		<input type="hidden" name="old_voca_lang_translation_code" value="'+v_voca_lang_translation_code+'">';
	content += '		<input type="hidden" name="old_voca_lang_sort" value="'+v_voca_lang_sort+'">';
	content += '		<input type="text" class="form-control" name="voca_lang_code" value="'+v_voca_lang_code+'">';
	content += '	</td>';
	content += '	<td class="text-center">';
	content += '		<input type="text" class="form-control" name="voca_lang_name" value="'+v_voca_lang_name+'">';
	content += '	</td>';
	content += '	<td class="text-with-form-control">';
	content += '		<input type="text" class="form-control" name="voca_lang_translation_code" value="'+v_voca_lang_translation_code+'">';
	content += "	</td>";
	content += "	<td class='with-btn text-center' nowrap=''>";
	content += "		<button type='button' class='btn btn-sm btn-danger' onclick='form_delete(this)'>삭제</button>";
	content += "	</td>";
	content += '</tr>';
	
	return content;
	
}

function form_delete(obj)
{
	var voca_lang_flag             = $(obj).closest("tr").find("input[name='voca_lang_flag']").val();
	var voca_lang_id               = $(obj).closest("tr").find("input[name='voca_lang_id']").val();
	var voca_lang_code             = $(obj).closest("tr").find("input[name='voca_lang_code']").val();
	var voca_lang_name             = $(obj).closest("tr").find("input[name='voca_lang_name']").val();
	var voca_lang_translation_code = $(obj).closest("tr").find("input[name='voca_lang_translation_code']").val();
	var voca_lang_sort             = $(obj).closest("tr").find("input[name='old_voca_lang_sort']").val();
	if(voca_lang_flag == "U"){
		var objData = Object();
		objData.flag                       = 'D';
		objData.status                     = "ACTIVE";
		objData.voca_lang_id               = voca_lang_id;
		objData.voca_lang_code             = voca_lang_code;
		objData.voca_lang_name             = voca_lang_name;
		objData.voca_lang_translation_code = voca_lang_translation_code;
		objData.voca_lang_sort             = voca_lang_sort;
		
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
	
	var $_voca_lang_flag                 = $("input[name='voca_lang_flag']");
	var $_voca_lang_id                   = $("input[name='voca_lang_id']");
	var $_voca_lang_code                 = $("input[name='voca_lang_code']");
	var $_voca_lang_name                 = $("input[name='voca_lang_name']");
	var $_voca_lang_translation_code     = $("input[name='voca_lang_translation_code']");
	var $_old_voca_lang_code             = $("input[name='old_voca_lang_code']");
	var $_old_voca_lang_name             = $("input[name='old_voca_lang_name']");
	var $_old_voca_lang_translation_code = $("input[name='old_voca_lang_translation_code']");
	var $_old_voca_lang_sort             = $("input[name='old_voca_lang_sort']");
	var voca_lang_sort    = 1;
	$_voca_lang_flag.each(function(index) {
		var voca_lang_flag                 = $(this).val();
		var voca_lang_id                   = $_voca_lang_id.eq(index).val();
		var voca_lang_code                 = $_voca_lang_code.eq(index).val();
		var voca_lang_name                 = $_voca_lang_name.eq(index).val();
		var voca_lang_translation_code     = $_voca_lang_translation_code.eq(index).val();
		var old_voca_lang_code             = $_old_voca_lang_code.eq(index).val();
		var old_voca_lang_name             = $_old_voca_lang_name.eq(index).val();
		var old_voca_lang_translation_code = $_old_voca_lang_translation_code.eq(index).val();
		var old_voca_lang_sort             = $_old_voca_lang_sort.eq(index).val();
		
		var objData = Object();
		objData.flag                       = voca_lang_flag;
		objData.status                     = "ACTIVE";
		objData.voca_lang_id               = voca_lang_id;
		objData.voca_lang_code             = voca_lang_code;
		objData.voca_lang_name             = voca_lang_name;
		objData.voca_lang_translation_code = voca_lang_translation_code;
		objData.voca_lang_sort             = voca_lang_sort;
		if(voca_lang_flag == "U"){
			if(voca_lang_code != old_voca_lang_code || voca_lang_name != old_voca_lang_name || voca_lang_translation_code != old_voca_lang_translation_code || voca_lang_sort != old_voca_lang_sort){
				array_data.push(objData);
			}
		}else{
			array_data.push(objData);
		}
		
		voca_lang_sort++;
    });

	var data_value = JSON.stringify(array_data);
	
	$.ajax({
		type : "POST",
		url : "/exam/saveExamsDuolingoVocaLang.do",
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