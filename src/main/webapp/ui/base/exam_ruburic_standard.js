var section = "";
var book = "";
isLoading = false;
/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	form_search();
    
});


function form_search()
{
	section = "";
	book = "";
	$("#div_section").html("");
	$("#div_book").html("");
	if(isLoading){
		CKEDITOR.instances.ruburic_standard.setData("");
	}
	$.ajax({
		type : "POST",
		url : "/base/getBaseExamRuburicStandardList.do",
		data:{
			
		},
		success:function(data){
			isLoading = true;
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				vHtml += "<tr>";
				vHtml += "	<td class='text-center'>"+data[i].section+"</td>";
				vHtml += "	<td class='text-center'>"+data[i].book+"</td>";
				vHtml += "	<td class='with-btn text-center' nowrap=''>";
				vHtml += "		<button type='button' class='btn btn-sm btn-primary' onclick='form_modify(\""+data[i].section+"\",\""+data[i].book+"\")'>기준 등록/수정</button>";
				vHtml += "	</td>";
				vHtml += "</tr>";
			}
			
			$("#data_list").html(vHtml);
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function form_modify(v_section, v_book)
{
	section = v_section;
	book = v_book;
	$("#div_section").html(section);
	$("#div_book").html(book);
	$.ajax({
		type : "POST",
		url : "/base/getBaseExamRuburicStandard.do",
		data:{
			section:section,
			book:book
		},
		success:function(data){
			var v_ruburic_standard = "";
			if(data){
				v_ruburic_standard = data.ruburic_standard;
			}
			CKEDITOR.instances.ruburic_standard.setData(v_ruburic_standard);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function form_save()
{
	if(!section) return;
	if(!book) return;
	
	var ruburic_standard = CKEDITOR.instances.ruburic_standard.getData();
	
	$.ajax({
		type : "POST",
		url : "/base/insertBaseExamRuburicStandard.do",
		data:{
			section:section,
			book:book,
			ruburic_standard:ruburic_standard
		},
		success:function(data){
			alert("저장 하였습니다.");
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}