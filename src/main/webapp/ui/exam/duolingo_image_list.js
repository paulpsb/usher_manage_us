var section = "DUOLINGO";

/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
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
				vHtml += "<option value='"+data[i].volume+"' "+selected+">"+data[i].volume+"</option>";
			}
			if(data.length == 0){
				vHtml += "<option value=''></option>";
			}
			$("#search_volume").html(vHtml);
			$('#search_volume').change(function(e){
				search_group();
			});	
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
				vHtml += "<option value='"+data[i].group+"' "+selected+">"+data[i].group+"</option>";
			}
			if(data.length == 0){
				vHtml += "<option value=''></option>";
			}
			$("#search_group").html(vHtml);
			$('#search_group').change(function(e){
				search_article();
			});	
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
				vHtml += "<option value='"+data[i].article+"' "+selected+">"+data[i].article+"</option>";
			}
			$("#search_article").html(vHtml);
			$('#search_article').change(function(e){
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
		url : "/exam/getExamsDuolingoImageList.do",
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
				vHtml += '		<input type="hidden" name="image_id" value="'+data[i].id+'">';
				vHtml += '		<input type="hidden" name="image_sort" value="'+data[i].image_sort+'">';
				vHtml += '	</td>';
				vHtml += '	<td>'+data[i].volume+'</td>';
				vHtml += '	<td>'+data[i].group+'</td>';
				vHtml += '	<td>'+data[i].article+'</td>';
				vHtml += '	<td>'+data[i].image_title+'</td>';
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

var v_image_id;
function form_add()
{
	v_image_id = 0;
	$("#div_image_url").html("");
	$("#image_url").val("");
	$("#image_title").val("");
	$("#score_word").val("");
	$("#score_keyword").val("");
	$("#image_keyword").val("");
	$("#modal-image").modal();
}

function add_image()
{
	$("#image_file").click();
}

function load_image(event)
{
    var formData=new FormData();
	formData.append("file",event.files[0], event.files[0].name);
	
	$.ajax({
        type: 'POST',
        url: '/exam/uploadExamsDuolingoFileUpload.do',
        data: formData,
        processData: false,
        contentType: false
    }).done(function (data) {
    	var bucketUrl = "https://s3.ap-northeast-2.amazonaws.com/"+data;
    	$("#image_url").val(bucketUrl);
    	$("#div_image_url").html("<img src='"+bucketUrl+"' style='width:100%;'>");
    }).fail(function (error) {
    	console.log(error);
    })
}

function form_modify(v_id)
{
	v_image_id = v_id;
	$.ajax({
		type : "POST",
		url : "/exam/getExamsDuolingoImage.do",
		data:{
			id:v_id
		},
		success:function(data){
			$("#div_image_url").html("");
			$("#image_url").val(data.image_url);
			$("#image_title").val(data.image_title);
			$("#score_word").val(data.score_word);
			$("#score_keyword").val(data.score_keyword);
			$("#image_keyword").val(data.image_keyword);
			if(data.image_url){
				$("#div_image_url").html("<img src='"+data.image_url+"' style='width:100%;'>");
			}
			$("#modal-image").modal();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

function form_delete(v_id)
{
	if(!confirm("삭제하시겠습니까?")) return;
	
	$.ajax({
		type : "POST",
		url : "/exam/deleteExamsDuolingoImage.do",
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

function form_save()
{
	var url = "/exam/insertExamsDuolingoImage.do";
	if(v_image_id > 0) url = "/exam/updateExamsDuolingoImage.do";
	$.ajax({
		type : "POST",
		url : url,
		data:{
			id:v_image_id,
			section:section,
			book:$('#search_book').val(),
			volume:$('#search_volume').val(),
			group:$('#search_group').val(),
			article:$('#search_article').val(),
			status:"ACTIVE",
			image_url:$("#image_url").val(),
			image_title:$("#image_title").val(),
			score_word:$("#score_word").val(),
			score_keyword:$("#score_keyword").val(),
			image_keyword:$("#image_keyword").val()
		},
		success:function(data){
			alert("저장하였습니다.");
			$("#modal-image").modal("hide");
			form_search();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

function form_save_sort()
{
	var $_image_id           = $("input[name='image_id']");
	var $_image_sort         = $("input[name='image_sort']");
	
	var array_data = Array();
	var image_sort = 1;
	$_image_id.each(function(index) {
		var image_id              = $(this).val();
		var old_image_sort        = $_image_sort.eq(index).val();
		
		var objData = Object();
		objData.image_id   = image_id;
		objData.image_sort = image_sort;
		if(old_image_sort != image_sort){
			array_data.push(objData);
		}
		
		image_sort++;
    });
	
	var data_value = JSON.stringify(array_data);
	
	$.ajax({
		type : "POST",
		url : "/exam/updateExamsDuolingoImageSort.do",
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