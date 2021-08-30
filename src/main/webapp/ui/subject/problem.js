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
			var vHtml = "";
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
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				var selected = "";
				if(data[i].section == section) selected = "selected";
				vHtml += "<option value='"+data[i].id+"'>"+data[i].book+"</option>";
			}
			
			$("#search_book").html(vHtml);
			
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
	var section1 = "";
	var book1    = "";
	var volume1  = "";
	
	if($('#search_section').val() != "0")
	{
		section1 = $("#search_section option:checked").text();
	}

	if($('#search_book').val() != "0")
	{
		book1 = $("#search_book option:checked").text();
	}
	
	if($('#search_volume').val() != "0")
	{
		volume1 = $("#search_volume option:checked").text();
	}
	
	$.ajax({
		type : "POST",
		url : "/subject/getProblemList.do",
		data:{
			section:section1,
			book:book1,
			volume:volume1
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				vHtml += "<tr>";
				vHtml += "<td>"+data[i].section+"</td>";
				vHtml += "<td>"+data[i].book+"</td>";
				vHtml += "<td>"+data[i].volume+"</td>";
				vHtml += "<td>"+data[i].group+"</td>";
				vHtml += "<td>"+data[i].article+"</td>";
				vHtml += "<td class='text-right'>"+data[i].total_score_voca+"</td>";
				vHtml += "<td class='text-right'>"+data[i].total_score_blueprint+"</td>";
				vHtml += "<td class='text-right'>"+data[i].total_score_grammar_syntax+"</td>";
				vHtml += "<td class='text-right'>"+data[i].total_score_passage_phrase+"</td>";
				vHtml += "<td class='text-right'>"+data[i].total_score_passage_voca+"</td>";
				vHtml += "<td class='text-right'>"+data[i].total_score+"</td>";
				vHtml += "<td>"+data[i].short_title+"</td>";
				vHtml += "<td class='with-btn' nowrap=''>";
				vHtml += "	<button type='button' class='btn btn-sm btn-primary width-60 m-r-2' onclick='go_detail(\""+data[i].id+"\")'>수정</a>";
				vHtml += "	<button type='button' class='btn btn-sm btn-primary width-60 m-r-2' onclick='delete_form(\""+data[i].id+"\")'>삭제</a>";
				vHtml += "</td>";
				vHtml += "</tr>";
			}
			$("#dataList").html(vHtml);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}
var section = "";
var book    = "";
var volume  = "";
var group  = "";

function add_form()
{
	$("#flag").val("I");
	$("#problem_id").val("0");

	$("#article").val("");
	$("#total_score_voca").val("");
	$("#total_score_blueprint").val("");
	$("#total_score_grammar_syntax").val("");
	$("#total_score_passage_phrase").val("");
	$("#total_score_passage_voca").val("");
	$("#total_score").val("");
	$("#short_title").val("");
	$("#correction_yn").val("N");

	section = "";
	book    = "";
	volume  = "";
	group  = "";

	do_section();
	$("#modal-problem").modal();

}



function go_detail(problem_id){
	speech_idx = 1;
	$.ajax({
		type : "POST",
		url : "/subject/getProblem.do",
		data:{
			id:problem_id
		},
		success:function(data){
			$("#flag").val("U");
			$("#problem_id").val(problem_id);
			//$("#section").val(data.section);
			//$("#book").val(data.book);
			//$("#volume").val(data.volume);
			//$("#group").val(data.group);
			
			section = data.section;
			book    = data.book;
			volume  = data.volume;
			group  = data.group;
			
			$("#article").val(data.article);
			$("#total_score_voca").val(data.total_score_voca);
			$("#total_score_blueprint").val(data.total_score_blueprint);
			$("#total_score_grammar_syntax").val(data.total_score_grammar_syntax);
			$("#total_score_passage_phrase").val(data.total_score_passage_phrase);
			$("#total_score_passage_voca").val(data.total_score_passage_voca);
			$("#total_score").val(data.total_score);
			$("#short_title").val(data.short_title);
			$("#correction_yn").val(data.correction_yn);
			
			do_section();
			
			$("#modal-problem").modal();
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
				if(data[i].section == section) selected = "selected";
				vHtml += "<option value='"+data[i].section+"' "+selected+">"+data[i].section+"</option>";
			}
			
			$("#section").html(vHtml);
			
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
		url : "/common/getPracticeBookList.do",
		data:{
			section:$("#section").val()
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				var selected = "";
				if(data[i].book == book) selected = "selected";
				
				vHtml += "<option value='"+data[i].book+"' "+selected+">"+data[i].book+"</option>";
			}
			
			$("#book").html(vHtml);
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
		url : "/common/getPracticeVolumeList.do",
		data:{
			section:$("#section").val(),
			book:$("#book").val()
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				var selected = "";
				if(data[i].volume == volume) selected = "selected";
				
				vHtml += "<option value='"+data[i].volume+"' "+selected+">"+data[i].volume+"</option>";
			}
			
			$("#volume").html(vHtml);
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
		url : "/common/getPracticeGroupList.do",
		data:{
			section:$("#section").val(),
			book:$("#book").val(),
			volume:$("#volume").val()
		},
		success:function(data){
			var vHtml = "";
			if(data.length > 0){
				for(var i=0; i<data.length; i++){
					var selected = "";
					if(data[i].group == group) selected = "selected";
					
					vHtml += "<option value='"+data[i].group+"' "+selected+">"+data[i].group+"</option>";
				}
			}else{
				vHtml += "<option value=''></option>";
			}
			
			$("#group").html(vHtml);
			group = "";
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function save_form()
{
	if(!confirm("변경하시겠습니까?")) return;
	var url = "";
	if($("#flag").val() == "U"){
		url = "/subject/updateProblem.do";
	}else{
		url = "/subject/insertProblem.do";
	}
	$.ajax({
		type : "POST",
		url : url,
		data:{
			id:$("#problem_id").val(),
			section:$("#section").val(),
			book:$("#book").val(),
			volume:$("#volume").val(),
			group:$("#group").val(),
			article:$("#article").val(),
			total_score_voca:$("#total_score_voca").val(),
			total_score_blueprint:$("#total_score_blueprint").val(),
			total_score_grammar_syntax:$("#total_score_grammar_syntax").val(),
			total_score_passage_phrase:$("#total_score_passage_phrase").val(),
			total_score_passage_voca:$("#total_score_passage_voca").val(),
			total_score:$("#total_score").val(),
			short_title:$("#short_title").val(),
			correction_yn:$("#correction_yn").val()
		},
		success:function(data){
			alert("저장하였습니다.");
			form_search();
			$("#modal-problem").modal("hide");
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}