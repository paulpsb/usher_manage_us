var page = 1;
var row_num = 20;

var v_page = "";
var v_section = "";
var v_practice_type = "";
var v_book = "";
var v_volume = "";

/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	v_page = parseInt($("#v_page").val());
	v_section = $("#v_section").val();
	v_practice_type = $("#v_practice_type").val();
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
				search_section_type();
			});	
			search_book();
			search_section_type();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

/*
 * 설명 : 년/월 조회
 */
function search_section_type()
{
	if(!$('#search_section').val()){
		$("#search_practice_type").html('<option value="">시험과목 선택</option>');
	}else{
		$.ajax({
			type : "POST",
			url : "/common/getPracticeSectionTypeList.do",
			data:{
				section:$('#search_section').val()
			},
			success:function(data){
				var vHtml = "";
				for(var i=0; i<data.length; i++){
					var selected = "";
					if(data[i].practice_type == v_practice_type) selected = "selected";
					vHtml += "<option value='"+data[i].practice_type+"' "+selected+">"+data[i].practice_name+"</option>";
				}
				v_practice_type = "";
				$("#search_practice_type").html('<option value="">시험과목 선택</option>'+vHtml);
			},
			error:function(event){				
				alert("잠시후 다시 시도 바랍니다.");
			}
		});	
	}
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
				if(data[i].book != "암기시험") continue;
				var selected = "";
				if(data[i].book == v_book) selected = "selected";
				vHtml += "<option value='"+data[i].book+"' "+selected+">"+data[i].book+"</option>";
			}
			v_book= "";
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
		url : "/exam/getExamMemorizationList.do",
		data:{
			section:$("#search_section").val(),
			practice_type:$("#search_practice_type").val(),
			book:$("#search_book").val(),
			volume:$("#search_volume").val(),
			page:vPage,
			row_num:row_num
		},
		success:function(data){
			var total_count = data.memorizationCount.total_count;
			var total_page = Math.ceil(total_count/row_num);
			
			var memorizationList = data.memorizationList;
			
			var vHtml = "";
			for(var i=0; i<memorizationList.length; i++){
				vHtml += "<tr>";
				vHtml += "<td>"+cfmNvl1(memorizationList[i].section)+"</td>";
				vHtml += "<td>"+cfmNvl1(memorizationList[i].practice_name)+"</td>";
				vHtml += "<td>"+cfmNvl1(memorizationList[i].book)+"</td>";
				vHtml += "<td>"+cfmNvl1(memorizationList[i].volume)+"</td>";
				vHtml += "<td>"+cfmNvl1(memorizationList[i].group)+"</td>";
				vHtml += "<td>"+cfmNvl1(memorizationList[i].article);
				if(memorizationList[i].short_title){
					vHtml += " : "+cfmNvl1(memorizationList[i].short_title);
				}
				vHtml += "</td>";
				vHtml += "<td class='with-btn text-center' nowrap=''>";
				vHtml += "	<button type='button' class='btn btn-sm btn-primary m-r-2' onclick='modify_form(\""+memorizationList[i].id+"\")'>수정</button>";
				vHtml += "	<button type='button' class='btn btn-sm btn-primary m-r-2' onclick='delete_form(\""+memorizationList[i].id+"\")'>삭제</button>";
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

function add_form()
{
	section = "";
	book = "";
	volume = "";
	group = "";
	article = "";
	
	$("#memorization_id").val("0");
	
	do_section();
	$("#modal-memorization").modal();
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
				do_section_type();
			});	
			do_book();
			do_section_type();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

/*
 * 설명 : 년/월 조회
 */
function do_section_type()
{
	if(!$('#section').val()){
		$("#practice_type").html('<option value="">선택</option>');
	}else{
		$.ajax({
			type : "POST",
			url : "/common/getPracticeSectionTypeList.do",
			data:{
				section:$('#section').val()
			},
			success:function(data){
				var vHtml = "";
				for(var i=0; i<data.length; i++){
					var selected = "";
					vHtml += "<option value='"+data[i].practice_type+"' "+selected+">"+data[i].practice_name+"</option>";
				}
				$("#practice_type").html('<option value="">선택</option>'+vHtml);
			},
			error:function(event){				
				alert("잠시후 다시 시도 바랍니다.");
			}
		});	
	}
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
				if(data[i].book != "암기시험") continue;
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
				var v_article = data[i].article;
				if(data[i].short_title) v_article += " : "+data[i].short_title;
				vHtml += "<option value='"+data[i].article+"' "+selected+">"+v_article+"</option>";
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
	if(!$('#section').val()){
		alert("섹션을 선택하세요.");
		return;
	}
	if(!$('#practice_type').val()){
		alert("시험과목을 선택하세요.");
		return;
	}
	if(!$('#book').val()){
		alert("교재을 선택하세요.");
		return;
	}
	$.ajax({
		type : "POST",
		url :"/exam/insertInternalExamsMemorization.do",
		data:{
			section:$('#section').val(),
			practice_type:$('#practice_type').val(),
			book:$('#book').val(),
			volume:$('#volume').val(),
			group:$('#group').val(),
			article:$('#article').val()
		},
		success:function(data){
			alert("저장하였습니다.");
			modify_form(data.id);
			//$("#modal-memorization").modal("hide");
			//search_list(page);
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

function modify_form(memorization_id)
{
	location.href = "/exam/memorization_form.do?id="+memorization_id+"&&page="+page+"&&section="+$("#search_section").val()+"&&practice_type="+$("#search_practice_type").val()+"&&book="+$("#search_book").val()+"&&volume="+$("#search_volume").val();	
}

function delete_form(memorization_id)
{
	if(!confirm("삭제하시겠습니까?")) return;
	
	$.ajax({
		type : "POST",
		url : "/exam/deleteInternalExamsMemorization.do",
		data:{
			id:memorization_id
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
