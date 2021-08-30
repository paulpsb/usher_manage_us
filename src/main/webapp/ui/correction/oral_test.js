var array_delete;
/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	$('#search_section').change(function(e){
		search_book();
	});	
	
	$('#search_book').change(function(e){
		form_search();
	});	

	$('#search_oral_test_type').change(function(e){
		form_search();
	});	
	
	$("#itemBoxWrap").sortable({
		start: function(event, ui) {
			ui.item.data('start_pos', ui.item.index());
		},
		stop: function(event, ui) {
			var spos = ui.item.data('start_pos');
			var epos = ui.item.index();
		}
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
		url : "/correction/getCorrectionOralTestSectionList.do",
		data:{
			
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				vHtml += "<option value='"+data[i].section+"'>"+data[i].section+"</option>";
			}
			
			$("#search_section").html(vHtml);
			search_book();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function search_book()
{
	$.ajax({
		type : "POST",
		url : "/correction/getCorrectionOralTestBookList.do",
		data:{
			section:$("#search_section").val()
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				vHtml += "<option value='"+data[i].book+"'>"+data[i].book+"</option>";
			}
			
			$("#search_book").html(vHtml);
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
		url : "/correction/getCorrectionOralTestList.do",
		data:{
			section:$("#search_section").val(),
			book:$("#search_book").val(),
			oral_test_type:$("#search_oral_test_type").val()
		},
		success:function(data){
			array_delete = Array();
			$("#itemBoxWrap").html("");
			for(var i=0; i<data.length; i++){
				$(createItemContent("U", data[i].id,$("#search_section").val(),$("#search_book").val(),$("#search_oral_test_type").val(),$("#search_oral_test_type option:selected").text(),data[i].oral_test_title,data[i].oral_test_url)).appendTo("#itemBoxWrap");
			}
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function form_add()
{
	$(createItemContent("I", 0,$("#search_section").val(),$("#search_book").val(),$("#search_oral_test_type").val(),$("#search_oral_test_type option:selected").text(),"","")).appendTo("#itemBoxWrap");
}

function form_delete(obj)
{
	var oral_test_flag   = $(obj).closest("tr").find("input[name='oral_test_flag']").val();
	var oral_test_id     = $(obj).closest("tr").find("input[name='oral_test_id']").val();
	var section          = $(obj).closest("tr").find("input[name='section']").val();
	var book             = $(obj).closest("tr").find("input[name='book']").val();
	var oral_test_type   = $(obj).closest("tr").find("input[name='oral_test_type']").val();
	var oral_test_title  = $(obj).closest("tr").find("input[name='oral_test_title']").val();
	var oral_test_url    = $(obj).closest("tr").find("input[name='oral_test_url']").val();
	var oral_test_sort   = 0;
	if(oral_test_flag == "U"){
		var objData = Object();
		objData.flag            = 'D';
		objData.oral_test_id    = oral_test_id;
		objData.section         = section;
		objData.book            = book;
		objData.oral_test_type  = oral_test_type;
		objData.oral_test_title = oral_test_title;
		objData.oral_test_url   = oral_test_url;
		objData.oral_test_sort  = oral_test_sort;
		
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
	
	var $_oral_test_flag  = $("input[name='oral_test_flag']");
	var $_oral_test_id    = $("input[name='oral_test_id']");
	var $_section         = $("input[name='section']");
	var $_book            = $("input[name='book']");
	var $_oral_test_type  = $("input[name='oral_test_type']");
	var $_oral_test_title = $("input[name='oral_test_title']");
	var $_oral_test_url   = $("input[name='oral_test_url']");
	var oral_test_sort    = 1;
	$_oral_test_flag.each(function(index) {
		var oral_test_flag     = $(this).val();
		var oral_test_id       = $_oral_test_id.eq(index).val();
		var section            = $_section.eq(index).val();
		var book               = $_book.eq(index).val();
		var oral_test_type     = $_oral_test_type.eq(index).val();
		var oral_test_title    = $_oral_test_title.eq(index).val();
		var oral_test_url      = $_oral_test_url.eq(index).val();
		
		var objData = Object();
		objData.flag            = oral_test_flag;
		objData.oral_test_id    = oral_test_id;
		objData.section         = section;
		objData.book            = book;
		objData.oral_test_type  = oral_test_type;
		objData.oral_test_title = oral_test_title;
		objData.oral_test_url   = oral_test_url;
		objData.oral_test_sort  = oral_test_sort;
		oral_test_sort++;
		array_data.push(objData);
    });

	var data_value = JSON.stringify(array_data);
	
	$.ajax({
		type : "POST",
		url : "/correction/saveCorrectionOralTestList.do",
		data:{
			data_value:data_value
		},
		success:function(data){
			form_search();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

function createItemContent(v_flag, v_id, v_section, v_book, v_gubun, v_gubun_name, v_title, v_url)
{
	var content = "";
	content += '<tr class="itemBox">';
	content += '	<td class="text-center"><i class="fas fa-arrows-alt mt-3"></i></td>';
	content += '	<td class="text-center">';
	content += '		<input type="hidden" name="oral_test_flag" value="'+v_flag+'">';
	content += '		<input type="hidden" name="oral_test_id" value="'+v_id+'">';
	content += '		<input type="hidden" name="section" value="'+v_section+'">';
	content += v_section;
	content += '	</td>';
	content += '	<td class="text-center">';
	content += '		<input type="hidden" name="book" value="'+v_book+'">';
	content += v_book;
	content += '	</td>';
	content += '	<td class="text-center">';
	content += '		<input type="hidden" name="oral_test_type" value="'+v_gubun+'">';
	content += v_gubun_name;
	content += '	</td>';
	content += '	<td class="text-with-form-control">';
	content += '		<input type="text" class="form-control" name="oral_test_title" value="'+v_title+'">';
	content += "	</td>";
	content += '	<td class="text-with-form-control">';
	content += '		<input type="text" class="form-control" name="oral_test_url" value="'+v_url+'">';
	content += "	</td>";
	content += "	<td class='with-btn text-center' nowrap=''>";
	content += "		<button type='button' class='btn btn-sm btn-danger' onclick='form_delete(this)'>삭제</button>";
	content += "	</td>";
	content += '</tr>';
	
	return content;
	
}