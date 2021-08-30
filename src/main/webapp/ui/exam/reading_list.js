var page = 1;
var row_num = 20;
var v_page = "";
var v_book = "";
var v_volume = "";

var section = "READING";

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
		url : "/exam/getExamReadingList.do",
		data:{
			section:section,
			book:$("#search_book").val(),
			volume:$("#search_volume").val(),
			page:vPage,
			row_num:row_num
		},
		success:function(data){
			var total_count = data.readingCount.total_count;
			var total_page = Math.ceil(total_count/row_num);
			
			var readingList = data.readingList;
			
			var vHtml = "";
			for(var i=0; i<readingList.length; i++){
				vHtml += "<tr>";
				vHtml += "<td>"+cfmNvl1(readingList[i].book)+"</td>";
				vHtml += "<td>"+cfmNvl1(readingList[i].volume)+"</td>";
				vHtml += "<td>"+cfmNvl1(readingList[i].group)+"</td>";
				vHtml += "<td>"+cfmNvl1(readingList[i].article)+"</td>";
				vHtml += "<td>"+cfmNvl1(readingList[i].passage)+"</td>";
				vHtml += "<td class='with-btn text-center' nowrap=''>";
				vHtml += "	<button type='button' class='btn btn-sm btn-primary m-r-2' onclick='go_detail(\""+readingList[i].id+"\")'>지문으로 이동</button>";
				vHtml += "	<button type='button' class='btn btn-sm btn-primary m-r-2' onclick='go_detail_question(\""+readingList[i].id+"\")'>문제로 이동</button>";
				vHtml += "	<button type='button' class='btn btn-sm btn-primary m-r-2' onclick='delete_form(\""+readingList[i].id+"\")'>삭제</button>";
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
	$("#reading_id").val("0");
	
	do_book();
	$("#modal-reading").modal();
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
	if($('#reading_id').val() == "0"){
		url = "/exam/insertExamReading.do";
	}else{
		url = "/exam/updateExamReading.do";
	}
	$.ajax({
		type : "POST",
		url : url,
		data:{
			id:$('#reading_id').val(),
			section:section,
			book:$('#book').val(),
			volume:$('#volume').val(),
			group:$('#group').val(),
			article:$('#article').val(),
			passage:$('#passage').val()
		},
		success:function(data){
			alert("저장하였습니다.");
			$("#modal-reading").modal("hide");
			search_list(page);
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

function delete_form(reading_id)
{
	if(!confirm("삭제하시겠습니까?")) return;
	
	$.ajax({
		type : "POST",
		url : "/exam/deleteExamReading.do",
		data:{
			id:reading_id
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

function go_detail(reading_id)
{
	location.href = "/exam/reading_form.do?id="+reading_id+"&&page="+page+"&&book="+$("#search_book").val()+"&&volume="+$("#search_volume").val();
}

function go_detail_question(reading_id)
{
	location.href = "/exam/reading_question.do?id="+reading_id+"&&page="+page+"&&book="+$("#search_book").val()+"&&volume="+$("#search_volume").val();
}
