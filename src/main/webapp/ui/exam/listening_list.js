var conversation_images = [
	["maletomale","남남"],
	["maletofemale","남여"],
	["femaletomale","여남"],
	["femaletofemale","여여"]	
];

var lecture_images = [
	["male","남자"],
	["female","여자"]
];

var page = 1;
var row_num = 20;
var v_page = "";
var v_book = "";
var v_volume = "";

var section = "LISTENING";

/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	$('#book').change(function(e){
		do_volume();
	});	
	
	$('#volume').change(function(e){
		do_group();
	});	
	
	$('#group').change(function(e){
		do_article();
	});	
	
	$('#type').change(function(e){
		setImageCombo($("#type").val(), "");
	});	
	
	
	v_page = parseInt($("#v_page").val());
	v_book = $("#v_book").val();
	v_volume = $("#v_volume").val();

	search_book();
});

/*
 * 설명 : 년/월 조회
 */
function search_book()
{

	$.ajax({
		type : "POST",
		url : "/common/getProblemBookList.do",
		data:{
			section:section
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				var selected = "";
				if(data[i].book == v_book) selected = "selected";
				
				vHtml += "<option value='"+data[i].book+"' "+selected+">"+data[i].book+"</option>";
			}
			v_book = "";
			$("#search_book").html('<option value="">book 선택</option>'+vHtml);
			$('#search_book').change(function(e){
				search_volume();
			});	
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
		url : "/common/getProblemVolumeList.do",
		data:{
			section:section,
			book:$('#search_book').val()
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				var selected = "";
				if(data[i].volume == v_volume) selected = "selected";
				
				vHtml += "<option value='"+data[i].volume+"' "+selected+">"+data[i].volume+"</option>";
			}
			v_volume = "";
			$("#search_volume").html('<option value="">volume 선택</option>'+vHtml);
			$('#search_volume').change(function(e){
				form_search();
			});	
			
			if(v_page > 0){
				search_list(v_page);
			}else{
				form_search();
			}
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

function search_list(vPage)
{
	page = vPage;
	$.ajax({
		type : "POST",
		url : "/exam/getExamListeningList.do",
		data:{
			section:section,
			book:$("#search_book").val(),
			volume:$("#search_volume").val(),
			page:vPage,
			row_num:row_num
		},
		success:function(data){
			var total_count = data.listeningCount.total_count;
			var total_page = Math.ceil(total_count/row_num);
			
			var listeningList = data.listeningList;
			
			var vHtml = "";
			for(var i=0; i<listeningList.length; i++){
				vHtml += "<tr>";
				vHtml += "<td>"+cfmNvl1(listeningList[i].book)+"</td>";
				vHtml += "<td>"+cfmNvl1(listeningList[i].volume)+"</td>";
				vHtml += "<td>"+cfmNvl1(listeningList[i].group)+"</td>";
				vHtml += "<td>"+cfmNvl1(listeningList[i].article)+"</td>";
				vHtml += "<td>"+cfmNvl1(listeningList[i].short_title)+"</td>";
				vHtml += "<td>"+cfmNvl1(listeningList[i].type)+"</td>";
				vHtml += "<td>"+getImageText(cfmNvl1(listeningList[i].type), cfmNvl1(listeningList[i].image))+"</td>";
				vHtml += "<td class='with-btn text-center' nowrap=''>";
				vHtml += "	<button type='button' class='btn btn-sm btn-primary m-r-2' onclick='modify_form(\""+listeningList[i].id+"\")'>수정</button>";
				vHtml += "	<button type='button' class='btn btn-sm btn-primary m-r-2' onclick='delete_form(\""+listeningList[i].id+"\")'>삭제</button>";
				vHtml += "	<button type='button' class='btn btn-sm btn-primary m-r-2' onclick='go_detail(\""+listeningList[i].id+"\")'>문제로 이동</button>";
				vHtml += "</td>";
				vHtml += "</tr>";
			}
			
			$("#dataList").html(vHtml);
			
			vHtml = cfmPage(10, vPage, total_page, "search_list");
			$("#pageList").html(vHtml);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function getImageText(v_type, v_image)
{
	var rtn = "";
	var array_images;
	if(v_type == "Conversation"){
		array_images = conversation_images;
	}else if(v_type == "Lecture"){
		array_images = lecture_images;
	}else{
		array_images = Array();
	}
	
	for(var i=0; i<array_images.length; i++)
	{
		if(v_image == array_images[i][0]){
			rtn = array_images[i][1];
			break;
		}
	}
	
	return rtn;
}

function setImageCombo(v_type, v_image)
{
	var vHtml = "";
	var array_images;
	if(v_type == "Conversation"){
		array_images = conversation_images;
	}else if(v_type == "Lecture"){
		array_images = lecture_images;
	}else{
		array_images = Array();
	}
	
	console.log(array_images);
	for(var i=0; i<array_images.length; i++)
	{
		var selected = "";
		if(v_image == array_images[i][0]) selected = "selected";
		vHtml += "<option value='"+array_images[i][0]+"' "+selected+">"+array_images[i][1]+"</option>";
	}
	
	$("#image").html(vHtml);
}

var book = "";
var volume = "";
var group = "";
var article = "";

function add_form()
{
	$("#book").attr("disabled",false);
	$("#volume").attr("disabled",false);
	$("#group").attr("disabled",false);
	$("#article").attr("disabled",false);
	
	book = "";
	volume = "";
	group = "";
	article = "";
	$("#listening_id").val("0");
	
	setImageCombo($("#type").val(), "");
	do_book();
	$("#modal-listening").modal();
}

function modify_form(listening_id)
{
	$.ajax({
		type : "POST",
		url : "/exam/selectExamListening.do",
		data:{
			id:listening_id
		},
		success:function(data){
			book = cfmNvl1(data.book);
			volume = cfmNvl1(data.volume);
			group = cfmNvl1(data.group);
			article = cfmNvl1(data.article);
			
			$("#book").attr("disabled",true);
			$("#volume").attr("disabled",true);
			$("#group").attr("disabled",true);
			$("#article").attr("disabled",true);

			$("#listening_id").val(data.id);
			$("#type").val(cfmNvl1(data.type));
			
			setImageCombo(cfmNvl1(data.type), cfmNvl1(data.image));
			
			do_book();
			$("#modal-listening").modal();

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
		url : "/common/getProblemBookList.do",
		data:{
			section:section
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				var selected = "";
				if(data[i].book == book) selected = "selected";
				vHtml += "<option value='"+data[i].book+"' "+selected+">"+data[i].book+"</option>";
			}
			
			$("#book").html('<option value="">선택</option>'+vHtml);
			book = "";

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
		url : "/common/getProblemVolumeList.do",
		data:{
			section:section,
			book:$('#book').val()
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				var selected = "";
				if(data[i].volume == volume) selected = "selected";
				
				vHtml += "<option value='"+data[i].volume+"' "+selected+">"+data[i].volume+"</option>";
			}
			
			$("#volume").html('<option value="">선택</option>'+vHtml);
			volume = "";

			do_group();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

/*
 * 설명 : 년/월 조회
 */
function do_group()
{

	$.ajax({
		type : "POST",
		url : "/common/getProblemGroupList.do",
		data:{
			section:section,
			book:$('#book').val(),
			volume:$('#volume').val()
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				var selected = "";
				if(data[i].group == group) selected = "selected";
				
				vHtml += "<option value='"+data[i].group+"' "+selected+">"+data[i].group+"</option>";
			}
			
			$("#group").html('<option value="">선택</option>'+vHtml);
			group = "";

			do_article();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

/*
 * 설명 : 년/월 조회
 */
function do_article()
{

	$.ajax({
		type : "POST",
		url : "/common/getProblemArticleList.do",
		data:{
			section:section,
			book:$('#book').val(),
			volume:$('#volume').val(),
			group:$('#group').val()
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				var selected = "";
				if(data[i].article == article) selected = "selected";
				
				vHtml += "<option value='"+data[i].article+"' "+selected+">"+data[i].article+"</option>";
			}
			
			$("#article").html('<option value="">선택</option>'+vHtml);
			article = "";
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function save_form()
{
	var url;
	if($('#listening_id').val() == "0"){
		url = "/exam/insertExamListening.do";
	}else{
		url = "/exam/updateExamListening.do";
	}
	$.ajax({
		type : "POST",
		url : url,
		data:{
			id:$('#listening_id').val(),
			section:section,
			book:$('#book').val(),
			volume:$('#volume').val(),
			group:$('#group').val(),
			article:$('#article').val(),
			type:$('#type').val(),
			image:$('#image').val()
		},
		success:function(data){
			alert("저장하였습니다.");
			$("#modal-listening").modal("hide");
			search_list(page);
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

function delete_form(listening_id)
{
	if(!confirm("삭제하시겠습니까?")) return;
	
	$.ajax({
		type : "POST",
		url : "/exam/deleteExamListening.do",
		data:{
			id:listening_id
		},
		success:function(data){
			alert("삭제하였습니다.");
			search_list(page);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

function go_detail(listening_id)
{
	location.href = "/exam/listening_question.do?id="+listening_id+"&&page="+page+"&&book="+$("#search_book").val()+"&&volume="+$("#search_volume").val();
}
