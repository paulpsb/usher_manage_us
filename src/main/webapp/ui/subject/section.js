/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	form_search();
});

function form_search(){

	$.ajax({
		type : "POST",
		url : "/subject/getSectionList.do",
		data:{
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				vHtml += '<tr>';
				vHtml += '	<td class="with-form-control">';
				vHtml += '		<input type="hidden" value="'+data[i].id+'" name="section_id" class="form-control">';
				vHtml += '		<input type="text" value="'+data[i].section+'" name="section" class="form-control">';
				vHtml += '	</td>';
				vHtml += '	<td class="with-form-control">';
				vHtml += '		<input type="text" value="'+data[i].short_title+'" name="short_title" class="form-control">';
				vHtml += '	</td>';
				vHtml += '	<td class="with-form-control">';
				vHtml += '		<input type="text" value="'+data[i].short_title_kr+'" name="short_title_kr" class="form-control">';
				vHtml += '	</td>';
				vHtml += '	<td class="with-form-control">';
				vHtml += '		<input type="text" value="'+data[i].section_order+'" name="section_order" class="form-control">';
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
	vHtml += '		<input type="hidden" value="0" name="section_id" class="form-control">';
	vHtml += '		<input type="text" value="" name="section" class="form-control">';
	vHtml += '	</td>';
	vHtml += '	<td class="with-form-control">';
	vHtml += '		<input type="text" value="" name="short_title" class="form-control">';
	vHtml += '	</td>';
	vHtml += '	<td class="with-form-control">';
	vHtml += '		<input type="text" value="" name="short_title_kr" class="form-control">';
	vHtml += '	</td>';
	vHtml += '	<td class="with-form-control">';
	vHtml += '		<input type="text" value="" name="section_order" class="form-control">';
	vHtml += '	</td>';
	vHtml += '	<td><a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-danger remove_section"><i class="fa fa-times"></i></a></td>';
	vHtml += '</tr>';	
	$("#sectionList").append(vHtml);
	
	$('.remove_section').click(function(e){
		$(this).closest("tr").remove();
	});
}

function form_save(){
	var $_section_id = $("input[name=section_id]");
	var $_section    = $("input[name=section]");
	var $_short_title = $("input[name=short_title]");
	var $_short_title_kr = $("input[name=short_title_kr]");
	var $_section_order = $("input[name=section_order]");
	
	var section_list = Array();
	
	$_section_id.each(function(index) {
		var section_id     = $(this).val();
		var section        = $_section.eq(index).val();
		var short_title    = $_short_title.eq(index).val();
		var short_title_kr = $_short_title_kr.eq(index).val();
		var section_order  = $_section_order.eq(index).val();
		
		var objSection = Object();
		objSection.section_id = section_id;
		objSection.section = section;
		objSection.short_title = short_title;
		objSection.short_title_kr = short_title_kr;
		objSection.section_order = section_order;
		section_list.push(objSection);
	});
	
	var data_value = JSON.stringify(section_list);
	$.ajax({
		type : "POST",
		url : "/subject/saveSection.do",
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
