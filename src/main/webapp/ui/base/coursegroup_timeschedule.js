/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	$('#search_test_type').change(function(e){
		form_search();
	});	
	
	$('#search_student_type').change(function(e){
		form_search();
	});	
	
	$('#search_lecture_type').change(function(e){
		form_search();
	});	
	
	form_search();
});

function form_search(){
	$.ajax({
		type : "POST",
		url : "/base/getBaseCoursegroupTimescheduleList.do",
		data:{
			test_type:$("#search_test_type").val(),
			student_type:$("#search_student_type").val(),
			lecture_type:$("#search_lecture_type").val()
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				vHtml += '<tr>';
				vHtml += '	<td class="text-center">'+(i+1)+'</td>';
				vHtml += '	<td class="text-center">'+$('#search_test_type option:selected').text()+'</td>';
				vHtml += '	<td class="text-center">'+$('#search_student_type option:selected').text()+'</td>';
				vHtml += '	<td class="text-center">'+$('#search_lecture_type option:selected').text()+'</td>';
				vHtml += '	<td class="with-form-control">';
				vHtml += '		<input type="text" value="'+data[i].start_time+'" name="start_time" class="form-control text-center">';
				vHtml += '	</td>';
				vHtml += '	<td class="with-form-control">';
				vHtml += '		<input type="text" value="'+data[i].end_time+'" name="end_time" class="form-control text-center">';
				vHtml += '	</td>';
				vHtml += '	<td><a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-danger remove_section"><i class="fa fa-times"></i></a></td>';
				vHtml += '</tr>';
				
			}
			
			$("#dataList").html(vHtml);
			
			$('.remove_section').click(function(e){
				$(this).closest("tr").remove();
			});
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

function form_add(){
	var vHtml = "";
	vHtml += '<tr>';
	vHtml += '	<td class="text-center">&nbsp;</td>';
	vHtml += '	<td class="text-center">'+$('#search_test_type option:selected').text()+'</td>';
	vHtml += '	<td class="text-center">'+$('#search_student_type option:selected').text()+'</td>';
	vHtml += '	<td class="text-center">'+$('#search_lecture_type option:selected').text()+'</td>';
	vHtml += '	<td class="with-form-control">';
	vHtml += '		<input type="text" value="" name="start_time" class="form-control text-center">';
	vHtml += '	</td>';
	vHtml += '	<td class="with-form-control">';
	vHtml += '		<input type="text" value="" name="end_time" class="form-control text-center">';
	vHtml += '	</td>';
	vHtml += '	<td><a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-danger remove_section"><i class="fa fa-times"></i></a></td>';
	vHtml += '</tr>';	
	$("#dataList").append(vHtml);
	
	$('.remove_section').click(function(e){
		$(this).closest("tr").remove();
	});
}

function form_save(){
	var $_start_time = $("input[name=start_time]");
	var $_end_time   = $("input[name=end_time]");
	
	var time_list = Array();
	
	$_start_time.each(function(index) {
		var start_time     = $(this).val();
		var end_time        = $_end_time.eq(index).val();
		
		var objSection = Object();
		objSection.start_time = start_time;
		objSection.end_time = end_time;
		time_list.push(objSection);
	});
	
	var data_value = JSON.stringify(time_list);
	$.ajax({
		type : "POST",
		url : "/base/saveBaseCoursegroupTimeschedule.do",
		data:{
			test_type:$("#search_test_type").val(),
			student_type:$("#search_student_type").val(),
			lecture_type:$("#search_lecture_type").val(),
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