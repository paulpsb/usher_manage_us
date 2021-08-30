var editor;
var patternArray=new Array();
var current_correct = -1;
jQuery(document).ready(function(){
	editor = CKEDITOR.replace( 'writing_editor1',
	        {
	                toolbar :
	                [
	                    [ 'Bold', 'Strike','Italic', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink' ]
	                ]
	        });
    CKEDITOR.config.removePlugins = 'elementspath';
    

    
    window.resizeTo(800,560);
});

function saveComment()
{
	//console.log(CKEDITOR.instances.editor1.getData());
	$.ajax({
		type : "POST",
		url : "/correction/correct/saveWritingComment.do",
		data:{
			id:$("#correction_exams_comment_id").val(),
			comment:CKEDITOR.instances.writing_editor1.getData()
		},
		success:function(data){
			alert("답변을 등록하였습니다.");
			opener.search_form();
			self.close();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}