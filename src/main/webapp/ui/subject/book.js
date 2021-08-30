var sectionList;

var page = 1;
var row_num = 15;

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
			sectionList = data;
			var vHtml = "<option value='0'>Section</option>";
			for(var i=0; i<data.length; i++){
				vHtml += "<option value='"+data[i].id+"'>"+data[i].section+"</option>";
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
	search_list(1);
}

function search_list(vPage){

	page = vPage;
	
	$.ajax({
		type : "POST",
		url : "/subject/getBookList.do",
		data:{
			practice_section_id:$("#search_section").val(),
			page:vPage,
			row_num:row_num
		},
		success:function(data){
			var total_count = data.bookCount.total_count;
			var total_page = Math.ceil(total_count/row_num);
			
			var bookList = data.bookList;
			
			var vHtml = "";
			for(var i=0; i<bookList.length; i++){
				vHtml += '<tr>';
				vHtml += '	<td class="with-form-control">';
				vHtml += '		<input type="hidden" value="'+bookList[i].id+'" name="book_id" class="form-control">';
				vHtml += '		<select name="practice_section_id" class="form-control" disabled>';
				for(var j=0; j<sectionList.length; j++)
				{
					var selected = "";
					if(sectionList[j].id == bookList[i].practice_section_id) selected = "selected";
					vHtml += '			<option value="'+sectionList[j].id+'" '+selected+'>'+sectionList[j].section+'</option>';
				}
				vHtml += '		</select>';
				vHtml += '	</td>';
				vHtml += '	<td class="with-form-control">';
				vHtml += '		<input type="text" value="'+bookList[i].book+'" name="book" class="form-control">';
				vHtml += '	</td>';
				vHtml += '	<td class="with-form-control">';
				vHtml += '		<input type="text" value="'+bookList[i].book_order+'" name="book_order" class="form-control">';
				vHtml += '	</td>';
				vHtml += '	<td>&nbsp;</td>';
				vHtml += '</tr>';
			}
			
			$("#bookList").html(vHtml);
			
			vHtml = cfmPage(10, vPage, total_page, "search_list");
			$("#pageList").html(vHtml);
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
	vHtml += '		<input type="hidden" value="0" name="book_id" class="form-control">';
	vHtml += '		<select name="practice_section_id" class="form-control">';
	for(var j=0; j<sectionList.length; j++)
	{
		vHtml += '			<option value="'+sectionList[j].id+'">'+sectionList[j].section+'</option>';
	}
	vHtml += '		</select>';
	vHtml += '	</td>';
	vHtml += '	<td class="with-form-control">';
	vHtml += '		<input type="text" value="" name="book" class="form-control">';
	vHtml += '	</td>';
	vHtml += '	<td class="with-form-control">';
	vHtml += '		<input type="text" value="1" name="book_order" class="form-control">';
	vHtml += '	</td>';
	vHtml += '	<td><a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-danger remove_section"><i class="fa fa-times"></i></a></td>';
	vHtml += '</tr>';	
	$("#bookList").append(vHtml);
	
	$('.remove_section').click(function(e){
		$(this).closest("tr").remove();
	});
}

function form_save(){
	var $_book_id              = $("input[name=book_id]");
	var $_practice_section_id  = $("select[name=practice_section_id]");
	var $_book                 = $("input[name=book]");
	var $_book_order            = $("input[name=book_order]");
	
	var book_list = Array();
	
	$_book_id.each(function(index) {
		var book_id              = $(this).val();
		var practice_section_id  = $_practice_section_id.eq(index).val();
		var book                 = $_book.eq(index).val();
		var book_order           = $_book_order.eq(index).val();
		
		var objSection = Object();
		objSection.book_id = book_id;
		objSection.practice_section_id = practice_section_id;
		objSection.book = book;
		objSection.book_order = book_order;

		book_list.push(objSection);
	});
	
	var data_value = JSON.stringify(book_list);
	$.ajax({
		type : "POST",
		url : "/subject/saveBook.do",
		data:{
			data_value:data_value
		},
		success:function(data){
			alert("저장하였습니다.");
			search_list(page);

		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}
