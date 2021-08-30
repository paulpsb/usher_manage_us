var section = "DUOLINGO";

var v_book = "";
var v_volume = "";
var v_group = "";
var v_article = "";


/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	v_volume = $('#v_volume').val();
	v_group = $('#v_group').val();
	v_article = $('#v_article').val();
	
	$("#itemBoxWrap").sortable({
		start: function(event, ui) {
			ui.item.data('start_pos', ui.item.index());
		},
		stop: function(event, ui) {
			var spos = ui.item.data('start_pos');
			var epos = ui.item.index();
		}
	});
	
	search_volume();
});

/*
 * 설명 : 년/월 조회
 */
function search_volume()
{

	$.ajax({
		type : "POST",
		url : "/common/getProblemVolumeList.do",
		data:{
			section:section,
			book:$('#search_book').val()
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				var selected = "";
				if(v_volume == data[i].volume) selected = "selected";
				vHtml += "<option value='"+data[i].volume+"' "+selected+">"+data[i].volume+"</option>";
			}
			if(data.length == 0){
				vHtml += "<option value=''></option>";
			}
			$("#search_volume").html(vHtml);
			$('#search_volume').change(function(e){
				search_group();
			});	
			v_volume = "";
			search_group();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

/*
 * 설명 : 년/월 조회
 */
function search_group()
{

	$.ajax({
		type : "POST",
		url : "/common/getProblemGroupList.do",
		data:{
			section:section,
			book:$('#search_book').val(),
			volume:$('#search_volume').val()
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				var selected = "";
				if(v_group == data[i].group) selected = "selected";
				vHtml += "<option value='"+data[i].group+"' "+selected+">"+data[i].group+"</option>";
			}
			if(data.length == 0){
				vHtml += "<option value=''></option>";
			}
			$("#search_group").html(vHtml);
			$('#search_group').change(function(e){
				search_article();
			});	
			v_group = "";
			search_article();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

/*
 * 설명 : 년/월 조회
 */
function search_article()
{

	$.ajax({
		type : "POST",
		url : "/common/getProblemArticleList.do",
		data:{
			section:section,
			book:$('#search_book').val(),
			volume:$('#search_volume').val(),
			group:$('#search_group').val()
		},
		success:function(data){
			var vHtml = "";
			vHtml += "<option value=''></option>";
			for(var i=0; i<data.length; i++){
				var selected = "";
				if(v_article == data[i].article) selected = "selected";
				vHtml += "<option value='"+data[i].article+"' "+selected+">"+data[i].article+"</option>";
			}
			$("#search_article").html(vHtml);
			$('#search_article').change(function(e){
				form_search();
			});	
			v_article = "";
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
		url : "/exam/getExamsDuolingoBlankList.do",
		data:{
			section:section,
			book:$('#search_book').val(),
			volume:$('#search_volume').val(),
			group:$('#search_group').val(),
			article:$('#search_article').val()
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				vHtml += '<tr class="itemBox">';
				vHtml += '	<td class="text-with-form-control text-center"><i class="fas fa-arrows-alt"></i></td>';
				vHtml += '	<td>'+data[i].book+'</td>';
				vHtml += '		<input type="hidden" name="blank_id" value="'+data[i].id+'">';
				vHtml += '		<input type="hidden" name="blank_sort" value="'+data[i].blank_sort+'">';
				vHtml += '	</td>';
				vHtml += '	<td>'+data[i].volume+'</td>';
				vHtml += '	<td>'+data[i].group+'</td>';
				vHtml += '	<td>'+data[i].article+'</td>';
				vHtml += '	<td>'+data[i].blank_title+'</td>';
				vHtml += "	<td class='with-btn text-center' nowrap=''>";
				vHtml += "		<button type='button' class='btn btn-sm btn-primary' onclick='form_modify("+data[i].id+")'>수정</button>";
				vHtml += "		<button type='button' class='btn btn-sm btn-danger' onclick='form_delete("+data[i].id+")'>삭제</button>";
				vHtml += "	</td>";
				vHtml += '</tr>';
			}
			
			$("#itemBoxWrap").html(vHtml);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function form_add()
{
	var url = "";
	url += "/exam/duolingo_blank_form.do?id=0";
	url += "&&section="+section;
	url += "&&book="+$("#search_book").val();
	url += "&&volume="+$("#search_volume").val();
	url += "&&group="+$("#search_group").val();
	url += "&&article="+$("#search_article").val();
	location.href = url;
}

function form_modify(v_id)
{
	var url = "";
	url += "/exam/duolingo_blank_form.do?id="+v_id;
	url += "&&section="+section;
	url += "&&book="+$("#search_book").val();
	url += "&&volume="+$("#search_volume").val();
	url += "&&group="+$("#search_group").val();
	url += "&&article="+$("#search_article").val();
	location.href = url;	
}

function form_delete(v_id)
{
	if(!confirm("삭제하시겠습니까?")) return;
	
	$.ajax({
		type : "POST",
		url : "/exam/deleteExamsDuolingoBlank.do",
		data:{
			id:v_id
		},
		success:function(data){
			alert("삭제하였습니다.");
			form_search();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function form_save_sort()
{
	var $_blank_id           = $("input[name='blank_id']");
	var $_blank_sort         = $("input[name='blank_sort']");
	
	var array_data = Array();
	var blank_sort = 1;
	$_blank_id.each(function(index) {
		var blank_id              = $(this).val();
		var old_blank_sort        = $_blank_sort.eq(index).val();
		
		var objData = Object();
		objData.blank_id   = blank_id;
		objData.blank_sort = blank_sort;
		if(old_blank_sort != blank_sort){
			array_data.push(objData);
		}
		
		blank_sort++;
    });
var data_value = JSON.stringify(array_data);
	
	$.ajax({
		type : "POST",
		url : "/exam/updateExamsDuolingoBlankSort.do",
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
