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
	v_page = parseInt($("#page").val());
	v_section = $("#section").val();
	v_book = $("#book").val();
	v_volume = $("#volume").val();
	
	search_section();
	
	$("#add_contents").on("change keyup paste", function() {
	    var currentVal = $(this).val();
	    var note_all = currentVal.split('\n');
		var t = '';
		for(var each_row in note_all){
			if(note_all[each_row]=='' || note_all[each_row]==' '){
				//console.log(note_all[each_row],'1111');
				continue;
			}
			var row_num = parseInt(each_row)+1;
			t += row_num+") "+note_all[each_row].trim();
			if(each_row != note_all.length-1){
				t += '<br />';
			}
		}
		$("#div_add_contents").html(t);
	});
	
	$("#mod_contents").on("change keyup paste", function() {
		var currentVal = $(this).val();
	    var note_all = currentVal.split('\n');
		var t = '';
		for(var each_row in note_all){
			if(note_all[each_row]=='' || note_all[each_row]==' '){
				//console.log(note_all[each_row],'1111');
				continue;
			}
			var row_num = parseInt(each_row)+1;
			t += row_num+") "+note_all[each_row].trim();
			if(each_row != note_all.length-1){
				t += '<br />';
			}
		}
		$("#div_mod_contents").html(t);
	});
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
		url : "/exam/getSttList.do",
		data:{
			section:$("#search_section").val(),
			book:$("#search_book").val(),
			volume:$("#search_volume").val(),
			page:vPage,
			row_num:row_num
		},
		success:function(data){
			var total_count = data.sttCount.total_count;
			var total_page = Math.ceil(total_count/row_num);
			
			var sttList = data.sttList;
			
			var vHtml = "";
			for(var i=0; i<sttList.length; i++){
				vHtml += "<tr>";
				vHtml += "<td>"+cfmNvl1(sttList[i].section)+"</td>";
				vHtml += "<td>"+cfmNvl1(sttList[i].book)+"</td>";
				vHtml += "<td>"+cfmNvl1(sttList[i].volume)+"</td>";
				vHtml += "<td>"+cfmNvl1(sttList[i].group)+"</td>";
				vHtml += "<td>"+cfmNvl1(sttList[i].article)+"</td>";
				vHtml += "<td>"+cfmNvl1(sttList[i].short_title)+"</td>";
				vHtml += "<td class='with-btn text-center' nowrap=''>";
				vHtml += "	<button type='button' class='btn btn-sm btn-primary m-r-2' onclick='modify_form(\""+sttList[i].id+"\")'>수정</button>";
				vHtml += "	<button type='button' class='btn btn-sm btn-primary m-r-2' onclick='form_delete(\""+sttList[i].id+"\")'>삭제</button>";
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

function modify_answer_form(stt_id)
{
	window.open('/exam/modify/stt_form.do?id='+stt_id,'modify_stt');
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
	
	$("#add_paragraph1").val("");
	$("#add_paragraph2").val("");
	$("#add_paragraph3").val("");
	$("#add_paragraph4").val("");
	$("#add_paragraph5").val("");
	$("#add_paragraph6").val("");
	$("#add_paragraph7").val("");
	$("#add_paragraph8").val("");
	$("#add_paragraph9").val("");
	$("#add_paragraph10").val("");
	$("#add_contents").val("");	
	
	do_section();
	$("#modal-add-stt").modal();
}

function modify_form(stt_id)
{
	$.ajax({
		type : "POST",
		url : "/exam/getStt.do",
		data:{
			id:stt_id
		},
		success:function(data){
			section = cfmNvl1(data.section);
			book = cfmNvl1(data.book);
			volume = cfmNvl1(data.volume);
			group = cfmNvl1(data.group);
			article = cfmNvl1(data.article);
			
			$("#stt_id").val(data.id);
			
			$("#mod_section").html(section);
			$("#mod_book").html(book);
			$("#mod_volume").html(volume);
			$("#mod_group").html(group);
			$("#mod_article").html(article);
			
			$("#mod_paragraph1").val(cfmZeroSpace(data.paragraph1));
			$("#mod_paragraph2").val(cfmZeroSpace(data.paragraph2));
			$("#mod_paragraph3").val(cfmZeroSpace(data.paragraph3));
			$("#mod_paragraph4").val(cfmZeroSpace(data.paragraph4));
			$("#mod_paragraph5").val(cfmZeroSpace(data.paragraph5));
			$("#mod_paragraph6").val(cfmZeroSpace(data.paragraph6));
			$("#mod_paragraph7").val(cfmZeroSpace(data.paragraph7));
			$("#mod_paragraph8").val(cfmZeroSpace(data.paragraph8));
			$("#mod_paragraph9").val(cfmZeroSpace(data.paragraph9));
			$("#mod_paragraph10").val(cfmZeroSpace(data.paragraph10));
			$("#mod_contents").val(cfmNvl1(data.contents));
			var note_all = data.contents.split('\n');
			var t = '';
			for(var each_row in note_all){
				if(note_all[each_row]=='' || note_all[each_row]==' '){
					//console.log(note_all[each_row],'1111');
					continue;
				}
				var row_num = parseInt(each_row)+1;
				t += row_num+") "+note_all[each_row].trim();
				if(each_row != note_all.length-1){
					t += '<br />';
				}
			}
			$("#div_mod_contents").html(t);
			$("#modal-mod-stt").modal();

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

function form_insert()
{
	$.ajax({
		type : "POST",
		url :"/exam/insertStt.do",
		data:{
			section:$('#section').val(),
			book:$('#book').val(),
			volume:$('#volume').val(),
			group:$('#group').val(),
			article:$('#article').val(),
			contents:$('#add_contents').val(),
			paragraph1:cfmNullToZero($('#add_paragraph1').val()),
			paragraph2:cfmNullToZero($('#add_paragraph2').val()),
			paragraph3:cfmNullToZero($('#add_paragraph3').val()),
			paragraph4:cfmNullToZero($('#add_paragraph4').val()),
			paragraph5:cfmNullToZero($('#add_paragraph5').val()),
			paragraph6:cfmNullToZero($('#add_paragraph6').val()),
			paragraph7:cfmNullToZero($('#add_paragraph7').val()),
			paragraph8:cfmNullToZero($('#add_paragraph8').val()),
			paragraph9:cfmNullToZero($('#add_paragraph9').val()),
			paragraph10:cfmNullToZero($('#add_paragraph10').val())
		},
		success:function(data){
			alert("저장하였습니다.");
			$("#modal-add-stt").modal("hide");
			search_list(page);
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

function form_modify()
{
	$.ajax({
		type : "POST",
		url :"/exam/updateStt.do",
		data:{
			id:$('#stt_id').val(),
			contents:$('#mod_contents').val(),
			paragraph1:cfmNullToZero($('#mod_paragraph1').val()),
			paragraph2:cfmNullToZero($('#mod_paragraph2').val()),
			paragraph3:cfmNullToZero($('#mod_paragraph3').val()),
			paragraph4:cfmNullToZero($('#mod_paragraph4').val()),
			paragraph5:cfmNullToZero($('#mod_paragraph5').val()),
			paragraph6:cfmNullToZero($('#mod_paragraph6').val()),
			paragraph7:cfmNullToZero($('#mod_paragraph7').val()),
			paragraph8:cfmNullToZero($('#mod_paragraph8').val()),
			paragraph9:cfmNullToZero($('#mod_paragraph9').val()),
			paragraph10:cfmNullToZero($('#mod_paragraph10').val())
		},
		success:function(data){
			alert("저장하였습니다.");
			$("#modal-mod-stt").modal("hide");
			search_list(page);
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}
function form_delete(stt_id)
{
	if(!confirm("삭제하시겠습니까?")) return;
	
	$.ajax({
		type : "POST",
		url : "/exam/deleteStt.do",
		data:{
			id:stt_id
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

