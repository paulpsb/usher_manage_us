jQuery(document).ready(function(){
	$(window).resize(resizeContents);
    resizeContents();
    
	$.ajax({
		type : "POST",
		url : "/exam/selectExamReading.do",
		data:{
			id:$("#reading_id").val()
		},
		success:function(data){
			$("#book").val(data.book);
			$("#volume").val(data.volume);
			$("#group").val(data.group);
			$("#article").val(data.article);

			$("#passage").val(data.passage);
			CKEDITOR.instances.internal_reading_paragraph1.setData(data.paragraph1);
			CKEDITOR.instances.internal_reading_paragraph2.setData(data.paragraph2);
			CKEDITOR.instances.internal_reading_paragraph3.setData(data.paragraph3);
			CKEDITOR.instances.internal_reading_paragraph4.setData(data.paragraph4);
			CKEDITOR.instances.internal_reading_paragraph5.setData(data.paragraph5);
			CKEDITOR.instances.internal_reading_paragraph6.setData(data.paragraph6);
			CKEDITOR.instances.internal_reading_paragraph7.setData(data.paragraph7);
			CKEDITOR.instances.internal_reading_paragraph8.setData(data.paragraph8);
			CKEDITOR.instances.internal_reading_paragraph9.setData(data.paragraph9);
			CKEDITOR.instances.internal_reading_paragraph10.setData(data.paragraph10);
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	

});

/*
 * 설명 : 화면 사이즈 변경시 문제 영역 변경
 */
function resizeContents()
{
	//현재의 사이즈를 찾는다.
	var window_size = $(window).height();

	$("#passage_list").height(window_size-450);

}
function form_save()
{
	$.ajax({
		type : "POST",
		url : "/exam/updateExamReading.do",
		data:{
			id:$("#reading_id").val(),
			passage:$("#passage").val(),
			paragraph1:CKEDITOR.instances.internal_reading_paragraph1.getData(),
			paragraph2:CKEDITOR.instances.internal_reading_paragraph2.getData(),
			paragraph3:CKEDITOR.instances.internal_reading_paragraph3.getData(),
			paragraph4:CKEDITOR.instances.internal_reading_paragraph4.getData(),
			paragraph5:CKEDITOR.instances.internal_reading_paragraph5.getData(),
			paragraph6:CKEDITOR.instances.internal_reading_paragraph6.getData(),
			paragraph7:CKEDITOR.instances.internal_reading_paragraph7.getData(),
			paragraph8:CKEDITOR.instances.internal_reading_paragraph8.getData(),
			paragraph9:CKEDITOR.instances.internal_reading_paragraph9.getData(),
			paragraph10:CKEDITOR.instances.internal_reading_paragraph10.getData()
		},
		success:function(data){
			alert("저장하였습니다.");
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

function move_question_form()
{
	location.href = "/exam/reading_question.do?id="+$("#reading_id").val()+"&&page="+$("#v_page").val()+"&&book="+$("#v_book").val()+"&&volume="+$("#v_volume").val();
}

function move_form()
{
	location.href = "/exam/reading_list.do?page="+$("#v_page").val()+"&&book="+$("#v_book").val()+"&&volume="+$("#v_volume").val();
}