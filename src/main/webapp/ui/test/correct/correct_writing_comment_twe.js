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
    
    CKEDITOR.on( 'instanceReady', function( ev ) {
   	 
    	iframes = document.getElementsByTagName("iframe");
    	if(iframes[0].contentWindow.document.body.addEventListener) {
    		iframes[0].contentWindow.document.body.addEventListener("keydown", catchKeyDown,true);
    	} else {
    		iframes[0].contentWindow.document.body.attachEvent("onkeydown", catchKeyDown);
    	}

    	function catchKeyDown (e) {
    		if(e.ctrlKey) {
    			//if(current_correct < 0){
    				InsertHTML();
    			//}else{
    			//	InsertHTML2(patternArray[current_correct].title +" "+ patternArray[current_correct].description );
    			//}
    			
    		} 

    	}
    	 
    });
    
    window.resizeTo(800,550);
    
    var pattern=new Object();

    pattern.id=0;
    pattern.title='0번 템플릿 오류';
    pattern.description='(난이도 하) 템플릿 암기 바랍니다.';
    patternArray.push(pattern);

    pattern=new Object();
    pattern.id=1;
    pattern.title='1번 이해불가';
    pattern.description='(난이도 하) 이해가 되지 않습니다.  한국어 문장으로 다시 한번 작성해 주세요.';
    patternArray.push(pattern);

    pattern=new Object();
    pattern.id=2;
    pattern.title='2번 오타';
    pattern.description='(난이도 하) 가장 기본 되는 실수입니다. 주의 바랍니다.';
    patternArray.push(pattern);

    pattern=new Object();
    pattern.id=3;
    pattern.title='3번 접속사 오류';
    pattern.description='(난이도 하) 한 문장에 동사 두개 불가 /  접속사 쓰임 서투름';
    patternArray.push(pattern);

    pattern=new Object();
    pattern.id=4;
    pattern.title='4번 동사 오류';
    pattern.description='(난이도 하) 시제 / 수 / 인칭 / 상 / 태 / 가정법 / 조동사 등 동사 쓰임새가 틀렸습니다.';
    patternArray.push(pattern);

    pattern=new Object();
    pattern.id=5;
    pattern.title='5번 명사 오류';
    pattern.description='(난이도 하) 명사 오류';
    patternArray.push(pattern);

    pattern=new Object();
    pattern.id=6;
    pattern.title='6번 구문 오류';
    pattern.description='(난이도 중) 담당자는 꼭 이곳에 수정내용을 입력해 주세요.';
    patternArray.push(pattern);

    pattern=new Object();
    pattern.id=7;
    pattern.title='7번 분사';
    pattern.description='(난이도 중) ing/ed 능동 수동으로 맞추셔야 합니다.';
    patternArray.push(pattern);

    pattern=new Object();
    pattern.id=8;
    pattern.title='8번 관사 오류';
    pattern.description='(난이도 상) 관사 오류';
    patternArray.push(pattern);

    pattern=new Object();
    pattern.id=9;
    pattern.title='9번 뉘앙스 오류';
    pattern.description='(난이도 상) 뉘앙스 오류';
    patternArray.push(pattern);

    pattern=new Object();
    pattern.id=10;
    pattern.title='10번 논리 오류';
    pattern.description='(난이도 상) 논리 오류';
    patternArray.push(pattern);
});

function correct(p)
{
	/*
	$(".button").removeClass("active");
	if(correct_id == current_correct){
		current_correct = -1;
	}else{
		current_correct = correct_id;
		$("#correct_"+correct_id).addClass("active");
	}
	*/
	
	InsertHTML2(patternArray[p].title +" "+ patternArray[p].description );
}
function InsertHTML()
{
	var oEditor = CKEDITOR.instances.writing_editor1;
	var val = oEditor.getSelection().getRanges()[0];
	var text = oEditor.getSelection().getSelectedText();
	var value;
	
	if(!text) 
		value = ' <strong><span style="color: rgb(255, 0, 0);">()</span></strong>';
	else 
		value = '<strike><strong>'+text+'<strong></strike> <span style="color: rgb(255, 0, 0);">()</span>';

	// Check the active editing mode.
	if ( oEditor.mode == 'wysiwyg' )
	{
		// Insert HTML code.
		oEditor.insertHtml( value );
	}
	else
		alert( 'You must be in WYSIWYG mode!' );
}

function InsertHTML2(str)
{
	var oEditor = CKEDITOR.instances.writing_editor1;
	var val = oEditor.getSelection().getRanges()[0];
	var text = oEditor.getSelection().getSelectedText();
	var value;
	if(!text) 
		value = ' <strong><span style="color: rgb(255, 0, 0);">()</span></strong>';
	else 
		value = '<strike><strong>'+text+'<strong></strike> <span style="color: rgb(255, 0, 0);"> ('+ str +') </span>';

	if ( oEditor.mode == 'wysiwyg' )
	{
		oEditor.insertHtml( value );
	}
	else
		alert( 'You must be in WYSIWYG mode!' );
}

function savePen()
{
	//console.log(CKEDITOR.instances.editor1.getData());
	$.ajax({
		type : "POST",
		url : "/test/correct/saveWritingTestComment.do",
		data:{
			practice_result_id:$("#practice_result_id").val(),
			comment_type:"twe",
			comment:CKEDITOR.instances.writing_editor1.getData()
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