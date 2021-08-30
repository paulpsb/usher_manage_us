var page = 1;
var row_num = 20;
var v_page = "";
var v_book = "";
var v_volume = "";

var section = "SPEAKING";

var mp3_url = "https://s3.ap-northeast-2.amazonaws.com/usher.api.data.speaking/";

/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
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
				vHtml += "<option value='"+data[i].book+"'>"+data[i].book+"</option>";
			}
			
			$("#book").html(vHtml);
			$("#search_book").html('<option value="">book 선택</option>'+vHtml);
			$('#search_book').change(function(e){
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
	search_list(1);
}

function search_list(vPage)
{
	page = vPage;
	$.ajax({
		type : "POST",
		url : "/exam/getExamSpeakingList.do",
		data:{
			section:section,
			book:$("#search_book").val(),
			page:vPage,
			row_num:row_num
		},
		success:function(data){
			var total_count = data.speakingCount.total_count;
			var total_page = Math.ceil(total_count/row_num);
			
			var speakingList = data.speakingList;
			
			var vHtml = "";
			for(var i=0; i<speakingList.length; i++){
				vHtml += "<tr>";
				vHtml += "<td class='text-center'>"+cfmNvl1(speakingList[i].book)+"</td>";
				vHtml += "<td class='text-center'>"+cfmNvl1(speakingList[i].article)+"</td>";
				vHtml += "<td>"+cfmNvl1(speakingList[i].question)+"</td>";
				vHtml += "<td class='with-btn text-center' nowrap=''>";
				vHtml += "	<button type='button' class='btn btn-sm btn-primary m-r-2' onclick='modify_form(\""+speakingList[i].id+"\")'>수정</button>";
				vHtml += "	<button type='button' class='btn btn-sm btn-primary m-r-2' onclick='delete_form(\""+speakingList[i].id+"\")'>삭제</button>";
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

function add_form()
{
	$("#book").attr("disabled",false);
	$("#article").attr("disabled",false);

	$("#book").val("task1");
	$("#speaking_id").val("0");
	$("#article").val("");
	$("#title").val("");
	$("#passage").val("");
	$("#question").val("");
	$("#div_sound").html("");
	$("#sound_script").val("");
	$("#modal-speaking").modal();
}

function modify_form(speaking_id)
{
	$.ajax({
		type : "POST",
		url : "/exam/selectExamSpeaking.do",
		data:{
			id:speaking_id
		},
		success:function(data){
			$("#speaking_id").val(data.id);
			$("#book").val(data.book);
			$("#article").val(cfmNvl1(data.article));
			$("#title").val(cfmNvl1(data.title));
			$("#passage").val(cfmNvl1(data.passage));
			$("#question").val(cfmNvl1(data.question));
			$("#sound_script").val(cfmNvl1(data.sound_script));
			if(data.book != "task1"){
				var audio_url = mp3_url + data.book + "/" + data.article+".mp3";;
				$("#div_sound").html("<audio src='"+audio_url+"' style='width:100%;' controls>해당 브라우저는 audio 태그를 지원하지 않습니다.</audio>");
			}else{
				$("#div_sound").html("");
			}
			$("#book").attr("disabled",true);
			$("#article").attr("disabled",true);

			$("#modal-speaking").modal();

		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

function close_form()
{
	$("#div_sound").html("");
	$("#modal-speaking").modal("hide");
}
function save_form()
{
	$("#div_sound").html("");
	var url;
	if($('#speaking_id').val() == "0"){
		url = "/exam/insertExamSpeaking.do";
	}else{
		url = "/exam/updateExamSpeaking.do";
	}
	$.ajax({
		type : "POST",
		url : url,
		data:{
			id:$('#speaking_id').val(),
			section:section,
			book:$('#book').val(),
			volume:"",
			group:"",
			article:$('#article').val(),
			title:$('#title').val(),
			passage:$('#passage').val(),
			question:$('#question').val(),
			sound_script:$('#sound_script').val()
		},
		success:function(data){
			alert("저장하였습니다.");
			$("#modal-speaking").modal("hide");
			search_list(page);
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

function delete_form(speaking_id)
{
	if(!confirm("삭제하시겠습니까?")) return;
	
	$.ajax({
		type : "POST",
		url : "/exam/deleteExamSpeaking.do",
		data:{
			id:speaking_id
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

function form_excel()
{
	 var f = document.excelFrm;
     f.action = "excelExamSpeaking.do";
     f.submit();
}