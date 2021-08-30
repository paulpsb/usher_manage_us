/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	search_section();
});

/*
 * 설명 : 년/월 조회
 */
function search_section()
{

	$.ajax({
		type : "POST",
		url : "/common/getPracticeSectionList.do",
		data:{
			
		},
		success:function(data){
			var vHtml = "<option value=''>Section</option>";
			for(var i=0; i<data.length; i++){
				vHtml += "<option value='"+data[i].section+"'>"+data[i].section+"</option>";
			}
			
			$("#search_section").html(vHtml);
			$('#search_section').change(function(e){
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
		url : "/subject/getSectionTypeList.do",
		data:{
			section:$("#search_section").val(),
			program_use:"Y"
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				var checked = "";
				vHtml += '<tr>';
				vHtml += '	<td class="with-form-control" rowspan="2">'+data[i].section+'</td>';
				vHtml += '	<td class="with-form-control" rowspan="2">'+data[i].practice_name+'<br>('+data[i].practice_type+')</td>';
				vHtml += '	<td class="with-checkbox" rowspan="2">';
				checked = "";
				if(data[i].is_study == "Y") checked = "checked";
				vHtml += '		<div class="checkbox checkbox-css" style="margin-bottom: 5px;">';
				vHtml += '			<input type="checkbox" value="1" id="is_study_'+i+'" name="is_study" '+checked+'>';
				vHtml += '			<label for="is_study_'+i+'">&nbsp;스터디</label>';
				vHtml += '		</div>';
				checked = "";
				if(data[i].is_exam == "Y") checked = "checked";
				vHtml += '		<div class="checkbox checkbox-css" style="margin-bottom: 5px;">';
				vHtml += '			<input type="checkbox" value="1" id="is_exam_'+i+'" name="is_exam" '+checked+'>';
				vHtml += '			<label for="is_exam_'+i+'">&nbsp;실전</label>';
				vHtml += '		</div>';
				checked = "";
				if(data[i].is_homework == "Y") checked = "checked";
				vHtml += '		<div class="checkbox checkbox-css">';
				vHtml += '			<input type="checkbox" value="1" id="is_homework_'+i+'" name="is_homework" '+checked+'>';
				vHtml += '			<label for="is_homework_'+i+'">&nbsp;과제</label>';
				vHtml += '		</div>';
				checked = "";
				if(data[i].is_homework_achieve == "Y") checked = "checked";
				vHtml += '		<div class="checkbox checkbox-css">';
				vHtml += '			<input type="checkbox" value="1" id="is_homework_achieve_'+i+'" name="is_homework_achieve" '+checked+'>';
				vHtml += '			<label for="is_homework_achieve_'+i+'">&nbsp;과제 성취표</label>';
				vHtml += '		</div>';
				
				vHtml += '	</td>';
				vHtml += '	<td class="with-form-control">';
				vHtml += '		<input type="hidden" value="'+data[i].id+'" name="section_type_id">';
				vHtml += '		<input type="text" value="'+cfmNvl1(data[i].study_url)+'" name="study_url" class="form-control">';
				vHtml += '	</td>';
				vHtml += '	<td class="with-form-control">';
				vHtml += '		<input type="text" value="'+cfmNvl1(data[i].exam_url)+'" name="exam_url" class="form-control">';
				vHtml += '	</td>';
				vHtml += '	<td class="with-form-control">';
				vHtml += '		<input type="text" value="'+cfmNvl1(data[i].homework_url)+'" name="homework_url" class="form-control">';
				vHtml += '	</td>';
				vHtml += '</tr>';
				vHtml += '<tr>';
				vHtml += '	<td class="with-form-control">';
				vHtml += '		<input type="text" value="'+cfmNvl1(data[i].study_result_url)+'" name="study_result_url" class="form-control">';
				vHtml += '	</td>';
				vHtml += '	<td class="with-form-control">';
				vHtml += '		<input type="text" value="'+cfmNvl1(data[i].exam_result_url)+'" name="exam_result_url" class="form-control">';
				vHtml += '	</td>';
				vHtml += '	<td class="with-form-control">';
				vHtml += '		<input type="text" value="'+cfmNvl1(data[i].homework_result_url)+'" name="homework_result_url" class="form-control">';
				vHtml += '	</td>';
				vHtml += '</tr>';
			}
			
			$("#data_list").html(vHtml);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function form_save(){
	var $_section_type_id     = $("input[name=section_type_id]");
	var $_is_study            = $("input[name=is_study]");
	var $_is_exam             = $("input[name=is_exam]");
	var $_is_homework         = $("input[name=is_homework]");
	var $_is_homework_achieve = $("input[name=is_homework_achieve]");
	var $_study_url           = $("input[name=study_url]");
	var $_exam_url            = $("input[name=exam_url]");
	var $_homework_url        = $("input[name=homework_url]");
	var $_study_result_url    = $("input[name=study_result_url]");
	var $_exam_result_url     = $("input[name=exam_result_url]");
	var $_homework_result_url = $("input[name=homework_result_url]");
	
	var section_type_list = Array();
	
	$_section_type_id.each(function(index) {
		var section_type_id      = $(this).val();
		var study_url            = $_study_url.eq(index).val();
		var exam_url             = $_exam_url.eq(index).val();
		var homework_url         = $_homework_url.eq(index).val();
		var study_result_url     = $_study_result_url.eq(index).val();
		var exam_result_url      = $_exam_result_url.eq(index).val();
		var homework_result_url  = $_homework_result_url.eq(index).val();
		
		var objSection = Object();
		objSection.section_type_id = section_type_id;
		objSection.study_url = study_url;
		objSection.exam_url = exam_url;
		objSection.homework_url = homework_url;
		objSection.study_result_url = study_result_url;
		objSection.exam_result_url = exam_result_url;
		objSection.homework_result_url = homework_result_url;
		if($_is_study.eq(index).is(":checked"))
		{
			objSection.is_study = "Y";
		}else{
			objSection.is_study = "N";
		}
		if($_is_exam.eq(index).is(":checked"))
		{
			objSection.is_exam = "Y";
		}else{
			objSection.is_exam = "N";
		}
		if($_is_homework.eq(index).is(":checked"))
		{
			objSection.is_homework = "Y";
		}else{
			objSection.is_homework = "N";
		}
		if($_is_homework_achieve.eq(index).is(":checked"))
		{
			objSection.is_homework_achieve = "Y";
		}else{
			objSection.is_homework_achieve = "N";
		}
		
		
		section_type_list.push(objSection);
	});
	
	var data_value = JSON.stringify(section_type_list);
	$.ajax({
		type : "POST",
		url : "/subject/updateSectionTypeUrl.do",
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