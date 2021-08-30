/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	form_search();
});

function form_search(){

	$.ajax({
		type : "POST",
		url : "/subject/getTypeList.do",
		data:{
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				vHtml += '<tr>';
				vHtml += '	<td class="with-form-control">';
				vHtml += '		<input type="hidden" value="'+data[i].id+'" name="type_id" class="form-control">';
				vHtml += '		<input type="text" value="'+data[i].practice_type+'" name="practice_type" class="form-control" disabled>';
				vHtml += '	</td>';
				vHtml += '	<td class="with-form-control">';
				vHtml += '		<input type="text" value="'+data[i].practice_name+'" name="practice_name" class="form-control">';
				vHtml += '	</td>';
				vHtml += '	<td class="with-form-control">';
				vHtml += '		<select name="program_use" class="form-control">';
				var checked = "";
				if(data[i].program_use == "Y") checked = "selected";
				vHtml += '			<option value="Y" '+checked+'>사용</option>';

				checked = "";
				if(data[i].program_use != "Y") checked = "selected";
				vHtml += '			<option value="N" '+checked+'>미사용</option>';
				vHtml += '		</select>';
				vHtml += '	</td>';
				vHtml += '	<td class="with-form-control">';
				vHtml += '		<select name="paragraph_use" class="form-control">';
				var checked = "";
				if(data[i].paragraph_use == "Y") checked = "selected";
				vHtml += '			<option value="Y" '+checked+'>사용</option>';

				checked = "";
				if(data[i].paragraph_use != "Y") checked = "selected";
				vHtml += '			<option value="N" '+checked+'>미사용</option>';
				vHtml += '		</select>';
				vHtml += '	</td>';
				vHtml += '	<td class="with-form-control">';
				vHtml += '		<input type="text" value="'+cfmNvl1(data[i].type_comment)+'" name="type_comment" class="form-control">';
				vHtml += '	</td>';
				vHtml += '	<td class="with-form-control">';
				vHtml += '		<input type="text" value="'+data[i].type_order+'" name="type_order" class="form-control">';
				vHtml += '	</td>';
				vHtml += '	<td>&nbsp;</td>';
				vHtml += '</tr>';
			}
			
			$("#sectionList").html(vHtml);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

function form_add(){
	var vHtml = "";
	vHtml += '<tr>';
	vHtml += '	<td class="with-form-control">';
	vHtml += '		<input type="hidden" value="0" name="type_id" class="form-control">';
	vHtml += '		<input type="text" value="" name="practice_type" class="form-control">';
	vHtml += '	</td>';
	vHtml += '	<td class="with-form-control">';
	vHtml += '		<input type="text" value="" name="practice_name" class="form-control">';
	vHtml += '	</td>';
	vHtml += '	<td class="with-form-control">';
	vHtml += '		<select name="program_use" class="form-control">';
	vHtml += '			<option value="Y">사용</option>';
	vHtml += '			<option value="N">미사용</option>';
	vHtml += '		</select>';
	vHtml += '	</td>';
	vHtml += '	<td class="with-form-control">';
	vHtml += '		<select name="paragraph_use" class="form-control">';
	vHtml += '			<option value="Y">사용</option>';
	vHtml += '			<option value="N">미사용</option>';
	vHtml += '		</select>';
	vHtml += '	</td>';
	vHtml += '	<td class="with-form-control">';
	vHtml += '		<input type="text" value="" name="type_comment" class="form-control">';
	vHtml += '	</td>';
	vHtml += '	<td class="with-form-control">';
	vHtml += '		<input type="text" value="" name="type_order" class="form-control">';
	vHtml += '	</td>';
	vHtml += '	<td><a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-danger remove_section"><i class="fa fa-times"></i></a></td>';
	vHtml += '</tr>';	
	$("#sectionList").append(vHtml);
	
	$('.remove_section').click(function(e){
		$(this).closest("tr").remove();
	});
}

function form_save(){
	var $_type_id       = $("input[name=type_id]");
	var $_practice_type = $("input[name=practice_type]");
	var $_practice_name = $("input[name=practice_name]");
	var $_stype_order   = $("input[name=type_order]");
	var $_program_use   = $("select[name=program_use]");
	var $_paragraph_use = $("select[name=paragraph_use]");
	var $_type_comment  = $("input[name=type_comment]");
	
	var section_list = Array();
	
	$_type_id.each(function(index) {
		var type_id        = $(this).val();
		var practice_type  = $_practice_type.eq(index).val();
		var practice_name  = $_practice_name.eq(index).val();
		var program_use    = $_program_use.eq(index).val();
		var type_order     = $_stype_order.eq(index).val();
		var paragraph_use  = $_paragraph_use.eq(index).val();
		var type_comment   = $_type_comment.eq(index).val();
		
		var objSection = Object();
		objSection.type_id = type_id;
		objSection.practice_type = practice_type;
		objSection.practice_name = practice_name;
		objSection.program_use   = program_use;
		objSection.type_order = type_order;
		objSection.paragraph_use = paragraph_use;
		objSection.type_comment = type_comment;
		section_list.push(objSection);
	});
	
	var data_value = JSON.stringify(section_list);
	$.ajax({
		type : "POST",
		url : "/subject/saveType.do",
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
