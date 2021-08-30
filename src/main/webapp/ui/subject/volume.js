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
			var vHtml = "<option value='0'>Section</option>";
			for(var i=0; i<data.length; i++){
				vHtml += "<option value='"+data[i].id+"'>"+data[i].section+"</option>";
			}
			
			$("#search_section").html(vHtml);
			$('#search_section').change(function(e){
				search_book();
			});	
			search_book();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

/*
 * 설명 : 년/월 조회
 */
function search_book()
{

	$.ajax({
		type : "POST",
		url : "/common/getPracticeBookList.do",
		data:{
			practice_section_id:$("#search_section").val()
		},
		success:function(data){
			sectionList = data;
			var vHtml = "<option value='0'>교재</option>";
			for(var i=0; i<data.length; i++){
				vHtml += "<option value='"+data[i].id+"'>"+data[i].book+"</option>";
			}
			
			$("#search_book").html(vHtml);
			$('#search_book').change(function(e){
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
		url : "/subject/getVolumeList.do",
		data:{
			practice_section_id:$("#search_section").val(),
			practice_book_id:$("#search_book").val(),
			page:vPage,
			row_num:row_num
		},
		success:function(data){
			var total_count = data.volumeCount.total_count;
			var total_page = Math.ceil(total_count/row_num);
			
			var volumeList = data.volumeList;
			
			var vHtml = "";
			for(var i=0; i<volumeList.length; i++){
				vHtml += '<tr>';
				vHtml += '	<td class="with-form-control">'+volumeList[i].section+'</td>';
				vHtml += '	<td class="with-form-control">'+volumeList[i].book+'</td>';
				vHtml += '	<td class="with-form-control">'+volumeList[i].volume+'</td>';
				vHtml += '	<td class="with-form-control">';
				vHtml += '		<input type="hidden" value="'+volumeList[i].id+'" name="volume_id_list" class="form-control">';
				vHtml += '		<input type="text" value="'+volumeList[i].volume_order+'" name="volume_order_list" class="form-control">';
				vHtml += '	</td>';
				vHtml += "	<td class='with-btn' nowrap=''>";
				vHtml += "		<button type='button' class='btn btn-sm btn-primary width-60 m-r-2' onclick='form_modify(\""+volumeList[i].id+"\")'>수정</a>";
				vHtml += "	</td>";
				vHtml += '</tr>';
			}
			
			$("#volumeList").html(vHtml);
			
			vHtml = cfmPage(10, vPage, total_page, "search_list");
			$("#pageList").html(vHtml);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

var section_id = "";
var book_id = "";

function form_modify(volume_id){
	$.ajax({
		type : "POST",
		url : "/subject/getPracticeVolume.do",
		data:{
			id:volume_id
		},
		success:function(data){
			section_id = data.practice_section_id;
			book_id = data.practice_book_id;
			$("#volume_id").val(data.id);
			$("#volume").val(data.volume);
			$("#volume_order").val(data.volume_order);
			//$("#practice_section_id").attr("disabled", true);
			//$("#practice_book_id").attr("disabled", true);
			
			do_section();
			$("#modal-volume").modal();
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}



/*
 * 설명 : 년/월 조회
 */
function do_section()
{

	$.ajax({
		type : "POST",
		url : "/common/getPracticeSectionList.do",
		data:{
			
		},
		success:function(data){
			var vHtml = "";
			
			for(var i=0; i<data.length; i++){
				var selected = "";
				if(data[i].id == section_id) selected = "selected";
				vHtml += "<option value='"+data[i].id+"' "+selected+">"+data[i].section+"</option>";
			}
			
			$("#practice_section_id").html(vHtml);
			
			section_id = "";
			$('#practice_section_id').change(function(e){
				do_book();
			});	
			do_book();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

/*
 * 설명 : 년/월 조회
 */
function do_book()
{

	$.ajax({
		type : "POST",
		url : "/common/getPracticeBookList.do",
		data:{
			practice_section_id:$("#practice_section_id").val()
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				var selected = "";
				if(data[i].id == book_id) selected = "selected";
				
				vHtml += "<option value='"+data[i].id+"' "+selected+">"+data[i].book+"</option>";
			}
			
			$("#practice_book_id").html(vHtml);
			book_id = "";
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function form_add(){
	section_id = "";
	book_id = "";
	$("#volume_id").val("0");
	$("#volume").val("");
	$("#volume_order").val("1");
	//$("#practice_section_id").attr("disabled", false);
	//$("#practice_book_id").attr("disabled", false);

	do_section();
	$("#modal-volume").modal();
}

function form_save(){
	var url = "";
	if($("#volume_id").val() == "0"){
		url = "/subject/insertPracticeVolume.do";
	}else{
		url = "/subject/updatePracticeVolume.do";
	}
	$.ajax({
		type : "POST",
		url : url,
		data:{
			id:$("#volume_id").val(),
			practice_section_id:$("#practice_section_id").val(),
			practice_book_id:$("#practice_book_id").val(),
			section:$("#practice_section_id option:checked").text(),
			book:$("#practice_book_id option:checked").text(),
			volume:$("#volume").val(),
			volume_order:$("#volume_order").val(),
			status:"ACTIVE"
		},
		success:function(data){
			alert("저장하였습니다.");
			$("#modal-volume").modal("hide");
			search_list(page);

		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

function form_sort_save(){
	var $_volume_id              = $("input[name=volume_id_list]");
	var $_volume_order            = $("input[name=volume_order_list]");
	
	var volume_list = Array();
	
	$_volume_id.each(function(index) {
		var volume_id              = $(this).val();
		var volume_order           = $_volume_order.eq(index).val();
		
		var objSection = Object();
		objSection.volume_id = volume_id;
		objSection.volume_order = volume_order;

		volume_list.push(objSection);
	});
	
	var data_value = JSON.stringify(volume_list);
	$.ajax({
		type : "POST",
		url : "/subject/saveVolumeOrder.do",
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