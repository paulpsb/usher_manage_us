var select_num = 0;
/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	$('#search_sub_num').change(function(e){
		form_search();
	});
	
	setTimeout(search_num, 1000);
});

/*
 * 설명 : 회차조회
 */
function search_num()
{
	$.ajax({
		type : "POST",
		url : "/batch/getBatchExamReadingNumList.do",
		data:{
			type:$("#search_type").val()
		},
		success:function(data){
			$("#search_sub_num").val("1");

			var vHtml = "";
			if(data.length> 0)
			{
				for(var i=0; i<data.length; i++){
					var selected = "";
					if(select_num == data[i].num) selected = "selected";
					vHtml += "<option value='"+data[i].num+"' "+selected+">"+data[i].num+"</option>";
				}
				$("#search_num").html(vHtml);

				$('#search_num').change(function(e){
					$("#search_sub_num").val("1");
					form_search();
				});
				
				form_search();
			}else{
				vHtml += "<option value=''>회차없음</option>";
				$("#search_num").html(vHtml);
			}
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function form_search()
{
	$.ajax({
		type : "POST",
		url : "/batch/getBatchExamReading.do",
		data:{
			type:$("#search_type").val(),
			num:$("#search_num").val(),
			sub_num:$("#search_sub_num").val()
		},
		success:function(data){
			$("#passage").val(data.passage);
			$("#q_num").val(data.q_num);
			$("#created_name").val(data.created_name);
			$("#created").val(data.created);
			$("#modified_name").val(data.modified_name);
			$("#modified").val(data.modified);
			
			CKEDITOR.instances.paragraph1.setData(data.paragraph1);
			CKEDITOR.instances.paragraph2.setData(data.paragraph2);
			CKEDITOR.instances.paragraph3.setData(data.paragraph3);
			CKEDITOR.instances.paragraph4.setData(data.paragraph4);
			CKEDITOR.instances.paragraph5.setData(data.paragraph5);
			CKEDITOR.instances.paragraph6.setData(data.paragraph6);
			CKEDITOR.instances.paragraph7.setData(data.paragraph7);
			CKEDITOR.instances.paragraph8.setData(data.paragraph8);
			CKEDITOR.instances.paragraph9.setData(data.paragraph9);
			CKEDITOR.instances.paragraph10.setData(data.paragraph10);

		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function create_num()
{
	$.ajax({
		type : "POST",
		url : "/batch/createBatchExamReading.do",
		data:{
			type:$("#search_type").val()
		},
		success:function(data){
			select_num = data.num;
			search_num();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

function form_save()
{
	$.ajax({
		type : "POST",
		url : "/batch/updateBatchExamReading.do",
		data:{
			type:$("#search_type").val(),
			num:$("#search_num").val(),
			sub_num:$("#search_sub_num").val(),
			q_num:$("#q_num").val(),
			passage:$("#passage").val(),
			paragraph1:CKEDITOR.instances.paragraph1.getData(),
			paragraph2:CKEDITOR.instances.paragraph2.getData(),
			paragraph3:CKEDITOR.instances.paragraph3.getData(),
			paragraph4:CKEDITOR.instances.paragraph4.getData(),
			paragraph5:CKEDITOR.instances.paragraph5.getData(),
			paragraph6:CKEDITOR.instances.paragraph6.getData(),
			paragraph7:CKEDITOR.instances.paragraph7.getData(),
			paragraph8:CKEDITOR.instances.paragraph8.getData(),
			paragraph9:CKEDITOR.instances.paragraph9.getData(),
			paragraph10:CKEDITOR.instances.paragraph10.getData()
		},
		success:function(data){
			alert("저장하였습니다.");
			search_num();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

function move_question()
{
	location.href = "/batch/reading_exam_question.do?type="+$("#search_type").val()+"&&num="+$("#search_num").val()+"&&sub_num="+$("#search_sub_num").val();
}