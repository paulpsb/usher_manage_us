/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	$('#search_section').change(function(e){
		form_search();
	});	
	
		
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
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				vHtml += "<option value='"+data[i].section+"'>"+data[i].section+"</option>";
			}
			
			$("#search_section").html(vHtml);
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
		url : "/correction/getCorrectionTestTypeList.do",
		data:{
			section: $("#search_section").val()
		},
		success:function(data){
			var vHtml = "";
			var selected = "";
			for(var i=0; i<data.length; i++){
				vHtml += '<tr>';
				vHtml += '	<td>'+data[i].section;
				vHtml += '		<input type="hidden" name="correction_test_type_id" value="'+data[i].id+'">';
				vHtml += '		<input type="hidden" name="section" value="'+data[i].section+'">';
				vHtml += '	</td>';
				vHtml += '	<td class="with-input-control">';
				vHtml += '		<select class="form-control" name="practice_type" disabled>';
				selected = "";
				if(data[i].practice_type == "MOCK_TEST") selected = "selected";
				vHtml += '			<option value="MOCK_TEST" '+selected+'>시험</option>';
				selected = "";
				if(data[i].practice_type == "ONLINE") selected = "selected";
				vHtml += '			<option value="ONLINE" '+selected+'>인강</option>';
				vHtml += '		</select>';
				vHtml += '	</td>';
				vHtml += '	<td class="with-input-control">';
				vHtml += '		<input type="text" class="form-control" name="test_type" value="'+data[i].test_type+'" disabled>';
				vHtml += '	</td>';
				vHtml += '	<td class="with-input-control">';
				vHtml += '		<input type="text" class="form-control" name="test_name" value="'+data[i].test_name+'">';
				vHtml += '	</td>';
				vHtml += '	<td class="with-input-control">';
				vHtml += '		<input type="text" class="form-control" name="test_exam_url" value="'+data[i].test_exam_url+'">';
				vHtml += '	</td>';
				vHtml += '	<td class="with-input-control">';
				vHtml += '		<input type="text" class="form-control" name="test_result_url" value="'+data[i].test_result_url+'">';
				vHtml += '	</td>';
				vHtml += '	<td class="with-input-control">';
				vHtml += '		<input type="text" class="form-control" name="test_order" value="'+data[i].test_order+'">';
				vHtml += '	</td>';
				vHtml += '	<td class="with-input-control text-center">';
				vHtml += '		<button type="button" class="btn btn-sm btn-danger m-r-2" onclick="form_delete(this)">삭제</button>';
				vHtml += '	</td>';
				vHtml += '</tr>';
			}
			$("#dataList").html(vHtml);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function form_add()
{
	var vHtml = "";
	var selected = "";
	vHtml += '<tr>';
	vHtml += '	<td>'+$("#search_section").val();
	vHtml += '		<input type="hidden" name="correction_test_type_id" value="0">';
	vHtml += '		<input type="hidden" name="section" value="'+$("#search_section").val()+'">';
	vHtml += '	</td>';
	vHtml += '	<td class="with-input-control">';
	vHtml += '		<select class="form-control" name="practice_type">';
	selected = "";
	vHtml += '			<option value="MOCK_TEST" '+selected+'>시험</option>';
	vHtml += '			<option value="ONLINE" '+selected+'>인강</option>';
	vHtml += '		</select>';
	vHtml += '	</td>';
	vHtml += '	<td class="with-input-control">';
	vHtml += '		<input type="text" class="form-control" name="test_type" value="">';
	vHtml += '	</td>';
	vHtml += '	<td class="with-input-control">';
	vHtml += '		<input type="text" class="form-control" name="test_name" value="">';
	vHtml += '	</td>';
	vHtml += '	<td class="with-input-control">';
	vHtml += '		<input type="text" class="form-control" name="test_exam_url" value="">';
	vHtml += '	</td>';
	vHtml += '	<td class="with-input-control">';
	vHtml += '		<input type="text" class="form-control" name="test_result_url" value="">';
	vHtml += '	</td>';
	vHtml += '	<td class="with-input-control">';
	vHtml += '		<input type="text" class="form-control" name="test_order" value="">';
	vHtml += '	</td>';
	vHtml += '	<td class="with-input-control text-center">';
	vHtml += '		<button type="button" class="btn btn-sm btn-danger m-r-2" onclick="form_delete(this)">삭제</button>';
	vHtml += '	</td>';
	vHtml += '</tr>';
	
	$("#dataList").append(vHtml);

}

function form_delete(obj)
{
	var correction_test_type_id = parseInt($(obj).closest("tr").find("input[name='correction_test_type_id']").val());
	var section                 = $(obj).closest("tr").find("input[name='section']").val();
	var practice_type           = $(obj).closest("tr").find("select[name='practice_type']").val();
	var test_type               = $(obj).closest("tr").find("input[name='test_type']").val();
	if(correction_test_type_id > 0){
		$.ajax({
			type : "POST",
			url : "/correction/deleteCorrectionTestType.do",
			data:{
				id:correction_test_type_id,
				section:section,
				practice_type:practice_type,
				test_type:test_type
			},
			success:function(data){
				
			},
			error:function(event){				
				alert("잠시후 다시 시도 바랍니다.");
			}
		});	
	}
	
	$(obj).closest("tr").remove();
}

function form_delete(obj)
{
	var correction_test_type_id = parseInt($(obj).closest("tr").find("input[name='correction_test_type_id']").val());
	var section                 = $(obj).closest("tr").find("input[name='section']").val();
	var practice_type           = $(obj).closest("tr").find("select[name='practice_type']").val();
	var test_type               = $(obj).closest("tr").find("input[name='test_type']").val();
	if(correction_test_type_id > 0){
		$.ajax({
			type : "POST",
			url : "/correction/deleteCorrectionTestType.do",
			data:{
				id:correction_test_type_id,
				section:section,
				practice_type:practice_type,
				test_type:test_type
			},
			success:function(data){
				
			},
			error:function(event){				
				alert("잠시후 다시 시도 바랍니다.");
			}
		});	
	}
	
	$(obj).closest("tr").remove();
}

function form_save()
{
	var array_data = Array();
	var $_correction_test_type_id = $("input[name='correction_test_type_id']");
	var $_section                 = $("input[name='section']");
	var $_practice_type           = $("select[name='practice_type']");
	var $_test_type               = $("input[name='test_type']");
	var $_test_name               = $("input[name='test_name']");
	var $_test_exam_url           = $("input[name='test_exam_url']");
	var $_test_result_url         = $("input[name='test_result_url']");
	var $_test_order              = $("input[name='test_order']");

	$_correction_test_type_id.each(function(index) {
		var correction_test_type_id = $(this).val();
		var section                 = $_section.eq(index).val();
		var practice_type           = $_practice_type.eq(index).val();
		var test_type               = $_test_type.eq(index).val();
		var test_name               = $_test_name.eq(index).val();
		var test_exam_url           = $_test_exam_url.eq(index).val();
		var test_result_url         = $_test_result_url.eq(index).val();
		var test_order              = $_test_order.eq(index).val();
		
		var objData = Object();
		objData.correction_test_type_id  = correction_test_type_id;
		objData.section                  = section;
		objData.practice_type            = practice_type;
		objData.test_type                = test_type;
		objData.test_name                = test_name;
		objData.test_exam_url            = test_exam_url;
		objData.test_result_url          = test_result_url;
		objData.test_order               = test_order;

		array_data.push(objData);
    });

	if(array_data.length == 0) return;
	
	var data_value = JSON.stringify(array_data);
	
	$.ajax({
		type : "POST",
		url : "/correction/saveCorrectionTestType.do",
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