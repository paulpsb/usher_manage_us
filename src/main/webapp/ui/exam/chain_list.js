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
		url : "/exam/getChainList.do",
		data:{
			section:$("#search_section").val(),
			book:$("#search_book").val(),
			volume:$("#search_volume").val(),
			page:vPage,
			row_num:row_num
		},
		success:function(data){
			var total_count = data.chainCount.total_count;
			var total_page = Math.ceil(total_count/row_num);
			
			var chainList = data.chainList;
			
			var vHtml = "";
			for(var i=0; i<chainList.length; i++){
				vHtml += "<tr>";
				vHtml += "<td>"+cfmNvl1(chainList[i].section)+"</td>";
				vHtml += "<td>"+cfmNvl1(chainList[i].book)+"</td>";
				vHtml += "<td>"+cfmNvl1(chainList[i].volume)+"</td>";
				vHtml += "<td>"+cfmNvl1(chainList[i].group)+"</td>";
				vHtml += "<td>"+cfmNvl1(chainList[i].article)+"</td>";
				vHtml += "<td>"+cfmNvl1(chainList[i].netpg_book)+"</td>";
				vHtml += "<td>"+cfmNvl1(chainList[i].netpg_jindo)+"</td>";
				vHtml += "<td class='with-btn text-center' nowrap=''>";
				vHtml += "	<button type='button' class='btn btn-sm btn-primary m-r-2' onclick='modify_answer_form(\""+chainList[i].id+"\")'>정답 확인/수정</button>";
				vHtml += "	<button type='button' class='btn btn-sm btn-primary m-r-2' onclick='modify_form(\""+chainList[i].id+"\")'>수정</button>";
				vHtml += "	<button type='button' class='btn btn-sm btn-primary m-r-2' onclick='modify_form_content(\""+chainList[i].id+"\")'>지문수정</button>";
				vHtml += "	<button type='button' class='btn btn-sm btn-primary m-r-2' onclick='delete_form(\""+chainList[i].id+"\")'>삭제</button>";
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

function modify_answer_form(chain_id)
{
	window.open('/exam/modify/chain_form.do?id='+chain_id,'modify_chain');
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
	
	$("#chain_id").val("0");
	$("#netpg_book").val("");
	$("#netpg_jindo").val("");
	
	$("#paragraph1").val("");
	$("#paragraph2").val("");
	$("#paragraph3").val("");
	$("#paragraph4").val("");
	$("#paragraph5").val("");
	$("#paragraph6").val("");
	$("#paragraph7").val("");
	$("#paragraph8").val("");
	$("#paragraph9").val("");
	$("#paragraph10").val("");
	$("#contents").val("");	
	
	do_section();
	$("#modal-chain").modal();
}
function modify_form(chain_id)
{
	$.ajax({
		type : "POST",
		url : "/exam/getChain.do",
		data:{
			id:chain_id
		},
		success:function(data){
			section = cfmNvl1(data.section);
			book = cfmNvl1(data.book);
			volume = cfmNvl1(data.volume);
			group = cfmNvl1(data.group);
			article = cfmNvl1(data.article);
			
			$("#chain_id").val(data.id);
			$("#netpg_book").val(cfmNvl1(data.netpg_book));
			$("#netpg_jindo").val(cfmNvl1(data.netpg_jindo));
			
			$("#paragraph1").val(cfmZeroSpace(data.paragraph1));
			$("#paragraph2").val(cfmZeroSpace(data.paragraph2));
			$("#paragraph3").val(cfmZeroSpace(data.paragraph3));
			$("#paragraph4").val(cfmZeroSpace(data.paragraph4));
			$("#paragraph5").val(cfmZeroSpace(data.paragraph5));
			$("#paragraph6").val(cfmZeroSpace(data.paragraph6));
			$("#paragraph7").val(cfmZeroSpace(data.paragraph7));
			$("#paragraph8").val(cfmZeroSpace(data.paragraph8));
			$("#paragraph9").val(cfmZeroSpace(data.paragraph9));
			$("#paragraph10").val(cfmZeroSpace(data.paragraph10));
			$("#contents").val(cfmNvl1(data.contents));
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
			$("#div_contents").html(t);
			do_section();
			$("#modal-chain").modal();

		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

function modify_form_content(chain_id)
{
	$.ajax({
		type : "POST",
		url : "/exam/getChain.do",
		data:{
			id:chain_id
		},
		success:function(data){
			$("#chain_content_id").val(data.id);
			$("#contents").val(cfmNvl1(data.contents));
			$("#modal-chain-content").modal();

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
	var url = "";
	if($('#chain_id').val() == "0")
	{
		url = "/exam/insertChain.do";
	}else{
		url = "/exam/updateChain.do";
	}
	$.ajax({
		type : "POST",
		url :url,
		data:{
			id:$('#chain_id').val(),
			section:$('#section').val(),
			book:$('#book').val(),
			volume:$('#volume').val(),
			group:$('#group').val(),
			article:$('#article').val(),
			contents:$('#contents').val(),
			netpg_book:$('#netpg_book').val(),
			netpg_jindo:$('#netpg_jindo').val(),
			paragraph1:cfmNullToZero($('#paragraph1').val()),
			paragraph2:cfmNullToZero($('#paragraph2').val()),
			paragraph3:cfmNullToZero($('#paragraph3').val()),
			paragraph4:cfmNullToZero($('#paragraph4').val()),
			paragraph5:cfmNullToZero($('#paragraph5').val()),
			paragraph6:cfmNullToZero($('#paragraph6').val()),
			paragraph7:cfmNullToZero($('#paragraph7').val()),
			paragraph8:cfmNullToZero($('#paragraph8').val()),
			paragraph9:cfmNullToZero($('#paragraph9').val()),
			paragraph10:cfmNullToZero($('#paragraph10').val())
		},
		success:function(data){
			alert("저장하였습니다.");
			$("#modal-chain").modal("hide");
			search_list(page);
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

function save_form_content()
{
	var url = "";
	url = "/exam/updateChainContent.do";
	$.ajax({
		type : "POST",
		url :url,
		data:{
			id:$('#chain_content_id').val(),
			contents:$('#contents').val()
		},
		success:function(data){
			alert("저장하였습니다.");
			$("#modal-chain-content").modal("hide");
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}
function delete_form(chain_id)
{
	if(!confirm("삭제하시겠습니까?")) return;
	
	$.ajax({
		type : "POST",
		url : "/exam/deleteChain.do",
		data:{
			id:chain_id
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

