var page = 1;
var row_num = 20;
var v_page = "";
var v_section = "";
var v_book = "";
var v_volume = "";

/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	v_page = parseInt($("#v_page").val());
	v_section = $("#v_section").val();
	v_book = $("#v_book").val();
	v_volume = $("#v_volume").val();
	
	search_section();
});

/*
 * 설명 : 년/월 조회
 */
function search_section()
{

	$.ajax({
		type : "POST",
		url : "/common/getProblemSectionList.do",
		data:{
			
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				var selected = "";
				if(data[i].section == v_section) selected = "selected";
				
				vHtml += "<option value='"+data[i].section+"' "+selected+">"+data[i].section+"</option>";
			}
			v_section = "";
			$("#search_section").html('<option value="">section 선택</option>'+vHtml);
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
		url : "/common/getProblemBookList.do",
		data:{
			section:$('#search_section').val()
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
			section:$('#search_section').val(),
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
		url : "/exam/getPassageList.do",
		data:{
			section:$("#search_section").val(),
			book:$("#search_book").val(),
			volume:$("#search_volume").val(),
			page:vPage,
			row_num:row_num
		},
		success:function(data){
			var total_count = data.passageCount.total_count;
			var total_page = Math.ceil(total_count/row_num);
			
			var passageList = data.passageList;
			
			var vHtml = "";
			for(var i=0; i<passageList.length; i++){
				vHtml += "<tr>";
				vHtml += "<td>"+cfmNvl1(passageList[i].section)+"</td>";
				vHtml += "<td>"+cfmNvl1(passageList[i].book)+"</td>";
				vHtml += "<td>"+cfmNvl1(passageList[i].volume)+"</td>";
				vHtml += "<td>"+cfmNvl1(passageList[i].group)+"</td>";
				vHtml += "<td>"+cfmNvl1(passageList[i].article)+"</td>";
				vHtml += "<td>"+cfmNvl1(passageList[i].netpg_book)+"</td>";
				vHtml += "<td>"+cfmNvl1(passageList[i].netpg_jindo)+"</td>";
				vHtml += "<td class='with-btn text-center' nowrap=''>";
				vHtml += "	<button type='button' class='btn btn-sm btn-primary m-r-2' onclick='modify_form(\""+passageList[i].id+"\")'>수정</button>";
				vHtml += "	<button type='button' class='btn btn-sm btn-primary m-r-2' onclick='delete_form(\""+passageList[i].id+"\")'>삭제</button>";
				vHtml += "	<button type='button' class='btn btn-sm btn-primary m-r-2' onclick='go_detail(\""+passageList[i].id+"\")'>문제로 이동</button>";
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

var section = "";
var book = "";
var volume = "";
var group = "";
var article = "";

function modify_form(passage_id)
{
	$.ajax({
		type : "POST",
		url : "/exam/selectPassage.do",
		data:{
			id:passage_id
		},
		success:function(data){
			section = cfmNvl1(data.section);
			book = cfmNvl1(data.book);
			volume = cfmNvl1(data.volume);
			group = cfmNvl1(data.group);
			article = cfmNvl1(data.article);
			
			$("#passage_id").val(data.id);
			$("#netpg_book").val(cfmNvl1(data.netpg_book));
			$("#netpg_jindo").val(cfmNvl1(data.netpg_jindo));
			
			do_section();
			$("#modal-passage").modal();

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
		url : "/common/getProblemSectionList.do",
		data:{
			
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				var selected = "";
				if(data[i].section == section) selected = "selected";
				vHtml += "<option value='"+data[i].section+"' "+selected+">"+data[i].section+"</option>";
			}
			
			$("#section").html('<option value="">선택</option>'+vHtml);
			section = "";
			$('#section').change(function(e){
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
		url : "/common/getProblemBookList.do",
		data:{
			section:$('#section').val()
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
			$('#book').change(function(e){
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
		url : "/common/getProblemVolumeList.do",
		data:{
			section:$('#section').val(),
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
			$('#volume').change(function(e){
				do_group();
			});	
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
			section:$('#section').val(),
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
			$('#group').change(function(e){
				do_article();
			});	
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
			section:$('#section').val(),
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
	$.ajax({
		type : "POST",
		url : "/exam/updatePassage.do",
		data:{
			id:$('#passage_id').val(),
			section:$('#section').val(),
			book:$('#book').val(),
			volume:$('#volume').val(),
			group:$('#group').val(),
			article:$('#article').val(),
			netpg_book:$('#netpg_book').val(),
			netpg_jindo:$('#netpg_jindo').val()
		},
		success:function(data){
			alert("저장하였습니다.");
			$("#modal-passage").modal("hide");
			search_list(page);
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

function delete_form(passage_id)
{
	if(!confirm("삭제하시겠습니까?")) return;
	
	$.ajax({
		type : "POST",
		url : "/exam/deletePassage.do",
		data:{
			id:passage_id
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

function go_detail(passage_id)
{
	location.href = "/exam/passage_form.do?id="+passage_id+"&&page="+page+"&&section="+$("#search_section").val()+"&&book="+$("#search_book").val()+"&&volume="+$("#search_volume").val();
}

function add_form()
{
	location.href = "/exam/passage_form.do?id=0&&page="+page+"&&section="+$("#search_section").val()+"&&book="+$("#search_book").val()+"&&volume="+$("#search_volume").val();
}