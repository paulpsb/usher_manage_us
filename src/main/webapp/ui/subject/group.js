var page = 1;
var row_num = 15;

/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	$('#search_section').change(function(e){
		search_book();
	});	
	
	$('#search_volume').change(function(e){
		form_search();
	});	
	$('#search_book').change(function(e){
		search_volume();
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
			var vHtml = "<option value='0'>Section</option>";
			for(var i=0; i<data.length; i++){
				vHtml += "<option value='"+data[i].id+"'>"+data[i].section+"</option>";
			}
			
			$("#search_section").html(vHtml);

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
;	
			search_volume();
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
		url : "/common/getPracticeVolumeList.do",
		data:{
			practice_section_id:$("#search_section").val(),
			practice_book_id:$("#search_book").val()
		},
		success:function(data){
			sectionList = data;
			var vHtml = "<option value='0'>볼륨</option>";
			for(var i=0; i<data.length; i++){
				vHtml += "<option value='"+data[i].id+"'>"+data[i].volume+"</option>";
			}
			
			$("#search_volume").html(vHtml);

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
		url : "/subject/getGroupList.do",
		data:{
			practice_section_id:$("#search_section").val(),
			practice_book_id:$("#search_book").val(),
			practice_volume_id:$("#search_volume").val(),
			page:vPage,
			row_num:row_num
		},
		success:function(data){
			var total_count = data.groupCount.total_count;
			var total_page = Math.ceil(total_count/row_num);
			
			var groupList = data.groupList;
			
			var vHtml = "";
			for(var i=0; i<groupList.length; i++){
				vHtml += '<tr>';
				vHtml += '	<td class="with-form-control">'+groupList[i].section+'</td>';
				vHtml += '	<td class="with-form-control">'+groupList[i].book+'</td>';
				vHtml += '	<td class="with-form-control">'+groupList[i].volume+'</td>';
				vHtml += '	<td class="with-form-control">'+groupList[i].group+'</td>';
				vHtml += '	<td class="with-form-control">';
				vHtml += '		<input type="hidden" value="'+groupList[i].id+'" name="group_id_list" class="form-control">';
				vHtml += '		<input type="text" value="'+groupList[i].group_order+'" name="group_order_list" class="form-control">';
				vHtml += '	</td>';
				vHtml += "	<td class='with-btn' nowrap=''>";
				vHtml += "		<button type='button' class='btn btn-sm btn-primary width-60 m-r-2' onclick='form_modify(\""+groupList[i].id+"\")'>수정</a>";
				vHtml += "	</td>";
				vHtml += '</tr>';
			}
			
			$("#groupList").html(vHtml);
			
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
var volume_id = "";

function form_modify(group_id){
	$.ajax({
		type : "POST",
		url : "/subject/getPracticeGroup.do",
		data:{
			id:group_id
		},
		success:function(data){
			section_id = data.practice_section_id;
			book_id = data.practice_book_id;
			volume_id = data.practice_volume_id;
			$("#group_id").val(data.id);
			$("#group").val(data.group);
			$("#group_order").val(data.group_order);
			
			//$("#practice_section_id").attr("disabled", true);
			//$("#practice_book_id").attr("disabled", true);
			//$("#practice_volume_id").attr("disabled", true);
			do_section();
			$("#modal-group").modal();
			
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
			$('#practice_book_id').change(function(e){
				do_volume();
			});	
			do_volume();
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

/*
 * 설명 : 년/월 조회
 */
function do_volume()
{

	$.ajax({
		type : "POST",
		url : "/common/getPracticeVolumeList.do",
		data:{
			practice_section_id:$("#practice_section_id").val(),
			practice_book_id:$("#practice_book_id").val()
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				var selected = "";
				if(data[i].id == volume_id) selected = "selected";
				
				vHtml += "<option value='"+data[i].id+"' "+selected+">"+data[i].volume+"</option>";
			}
			
			$("#practice_volume_id").html(vHtml);
			volume_id = "";
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function form_add(){
	section_id = "";
	book_id = "";
	volume_id = "";
	$("#group_id").val("0");
	$("#group").val("");
	$("#group_order").val("1");
	
	//$("#practice_section_id").attr("disabled", false);
	//$("#practice_book_id").attr("disabled", false);
	//$("#practice_volume_id").attr("disabled", false);
	
	do_section();
	$("#modal-group").modal();
}

function form_save(){
	var url = "";
	if($("#group_id").val() == "0"){
		url = "/subject/insertPracticeGroup.do";
	}else{
		url = "/subject/updatePracticeGroup.do";
	}
	$.ajax({
		type : "POST",
		url : url,
		data:{
			id:$("#group_id").val(),
			practice_section_id:$("#practice_section_id").val(),
			practice_book_id:$("#practice_book_id").val(),
			practice_volume_id:$("#practice_volume_id").val(),			
			section:$("#practice_section_id option:checked").text(),
			book:$("#practice_book_id option:checked").text(),
			volume:$("#practice_volume_id option:checked").val(),			
			group:$("#group").val(),
			group_order:$("#group_order").val(),
			status:"ACTIVE"
		},
		success:function(data){
			alert("저장하였습니다.");
			$("#modal-group").modal("hide");
			search_list(page);

		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

function form_sort_save(){
	var $_group_id              = $("input[name=group_id_list]");
	var $_group_order            = $("input[name=group_order_list]");
	
	var group_list = Array();
	
	$_group_id.each(function(index) {
		var group_id              = $(this).val();
		var group_order           = $_group_order.eq(index).val();
		
		var objSection = Object();
		objSection.group_id = group_id;
		objSection.group_order = group_order;

		group_list.push(objSection);
	});
	
	var data_value = JSON.stringify(group_list);
	$.ajax({
		type : "POST",
		url : "/subject/saveGroupOrder.do",
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