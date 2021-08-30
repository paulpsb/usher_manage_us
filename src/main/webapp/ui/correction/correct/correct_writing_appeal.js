jQuery(document).ready(function(){
	editor1 = CKEDITOR.replace( 'writing_appeal_editor1',
	        {
	                toolbar :
	                [
	                    [ 'Bold', 'Strike','Italic', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink' ]
	                ]
	        });
	
	editor2 = CKEDITOR.replace( 'writing_comment_editor1',
	        {
	                toolbar :
	                [
	                    [ 'Bold', 'Strike','Italic', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink' ]
	                ]
	        });
	
    CKEDITOR.config.removePlugins = 'elementspath';
    

    
    window.resizeTo(800,1000);
});

function saveAppeal()
{
	$("#btn_appeal").hide();
	
	$.ajax({
		type : "POST",
		url : "/correction/correct/updateCorrectionExamsWritingAppeal.do",
		data:{
			id:$("#correction_exams_appeal_id").val(),
			correction_exams_answer_id:$("#correction_exams_answer_id").val(),
			appeal_answer:CKEDITOR.instances.writing_appeal_editor1.getData(),
			appeal_answer_comment:CKEDITOR.instances.writing_comment_editor1.getData()
		},
		success:function(data){
			alert("저장하였습니다.");
			opener.search_form();
			self.close();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}