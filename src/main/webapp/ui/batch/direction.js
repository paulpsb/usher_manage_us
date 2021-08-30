/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	$('#search_section').change(function(e){
		form_search();
	});
	
	setTimeout(form_search, 1000);
});

/*
 * 설명 : 년/월 조회
 */
function form_search()
{

	$.ajax({
		type : "POST",
		url : "/batch/getDirection.do",
		data:{
			section:$("#search_section").val()
		},
		success:function(data){
			if(data){
				$("#direction_id").val(data.id);
				$("#title").val(data.title);
				$("#usher_title").val(data.usher_title);
				
				CKEDITOR.instances.direction.setData(data.direction);
				CKEDITOR.instances.usher_direction.setData(data.usher_direction);
			}else{
				$("#direction_id").val("0");
				$("#title").val("");
				$("#usher_title").val("");
				CKEDITOR.instances.direction.setData("");
				CKEDITOR.instances.usher_direction.setData("");
			}

		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function form_save()
{
	var direction = CKEDITOR.instances.direction.getData();
	var usher_direction = CKEDITOR.instances.usher_direction.getData();
	$.ajax({
		type : "POST",
		url : "/batch/saveDirection.do",
		data:{
			id:$("#direction_id").val(),
			section:$("#search_section").val(),
			title:$("#title").val(),
			direction:direction,
			usher_title:$("#usher_title").val(),
			usher_direction:usher_direction
		},
		success:function(data){
			
			alert("저장하였습니다.");
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}