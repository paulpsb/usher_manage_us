var select_num = 0;

var array_number = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
var array_alpha = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V"];

var aws_url = "https://s3.ap-northeast-2.amazonaws.com/";
/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	$(window).resize(resizeContents);
    resizeContents();
    search_num();
});

/*
 * 설명 : 화면 사이즈 변경시 문제 영역 변경
 */
function resizeContents()
{
	//현재의 사이즈를 찾는다.
	var window_size = $(window).height();
	
	var v_height = window_size-340;
	$("#div_question").height(v_height-155);
	$("#div_view_image").height(v_height);
	$("#div_thumnail_list").height(v_height);

}

function create_num()
{
	$.ajax({
		type : "POST",
		url : "/batch/createBatchExamToeicNum.do",
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

/*
 * 설명 : 회차조회
 */
function search_num()
{
	$.ajax({
		type : "POST",
		url : "/batch/getBatchExamToeicNumList.do",
		data:{
			type:$("#search_type").val()
		},
		success:function(data){
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
					form_search();
				});
				form_search();
			}else{
				vHtml += "<option value=''>회차없음</option>";
				$("#search_num").html("<option value=''>회차없음</option>");
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
		url : "/batch/getBatchExamToeic.do",
		data:{
			type:$("#search_type").val(),
			num:$("#search_num").val()
		},
		success:function(data){
			var examToeicInfo = data.examToeicInfo;
			var examToeicImageList = data.examToeicImageList;
			var examToeicQuestionList = data.examToeicQuestionList;
			
			var objective_item_count = examToeicInfo.objective_item_count; 
			var objective_item_type = cfmNvl1(examToeicInfo.objective_item_type);
			if(examToeicInfo.question_count > 0)
			{
				$("#question_count").val(examToeicInfo.question_count);
			}else{
				$("#question_count").val("");
			}
			
			if(examToeicInfo.question_start_num > 0)
			{
				$("#question_start_num").val(examToeicInfo.question_start_num);
			}else{
				$("#question_start_num").val("");
			}

			if(objective_item_count > 0)
			{
				$("#objective_item_count").val(objective_item_count);
			}else{
				$("#objective_item_count").val("");
			}
			
			if(objective_item_type)
			{
				$("#objective_item_type").val(objective_item_type);
			}
			
			var group_name = cfmNvl1(examToeicInfo.group_name);
			var array_group_name = Array();
			if(group_name){
				array_group_name = group_name.split(",");
			}
			$("#group_name").val(group_name);
			
			//썸네일 이미지 추가.
			var vHtml = "";
			for(var i=0; i<examToeicImageList.length; i++)
			{
				var select_bg = "";
				if(i == 0) select_bg = "select-image";
				vHtml += '<div class="target col-6 '+select_bg+'">';
				vHtml += '	<input type="hidden" name="image_url" value="'+examToeicImageList[i].image_url+'">';
				vHtml += '	<image src="'+examToeicImageList[i].image_url+'" style="width:100%">';
				vHtml += '</div>';
			}
			
			$("#thumnail_list").html(vHtml);
			
			$("#thumnail_list").sortable({
				items: $(".target")
			});
			
			$('.target').click(function(e){
				$(".target").removeClass("select-image");
				$(this).addClass("select-image");
				var img_url = $(this).find("input[name='image_url']").val();
				$("#view_image").html('<image src="'+img_url+'" style="width:100%">');
			});
			
			vHtml = "";
			if(examToeicImageList.length > 0)
			{
				vHtml += '	<image src="'+examToeicImageList[0].image_url+'" style="width:100%">';
			}
			$("#view_image").html(vHtml);
			
			vHtml = "";
			for(var i=0; i<examToeicQuestionList.length; i++)
			{
				var question_num = examToeicQuestionList[i].question_num;
				var question_category = examToeicQuestionList[i].question_category;
				var answer = examToeicQuestionList[i].answer;
				vHtml += '<tr>';
				vHtml += '	<td class="text-center">';
				vHtml += '		<input type="hidden" name="question_num" id="question_num" value="'+question_num+'">';
				vHtml += '		<input type="hidden" name="question_type" id="question_type" value="M">';
				vHtml += question_num;
				vHtml += '	</td>';
				vHtml += '	<td>';
				vHtml += '		<select class="form-control" name="question_category" id="question_category">';
				for(var j=0; j<array_group_name.length; j++)
				{
					var selected = "";
					if(question_category == array_group_name[j]) selected = "selected";
					vHtml += '			<option value="'+array_group_name[j]+'" '+selected+'>'+array_group_name[j]+'</option>';
				}
				vHtml += '		</select>';
				vHtml += '	</td>';
				vHtml += '	<td class="with-radio">';
				var array_objective_item_type;
				if(objective_item_type == "A"){
					array_objective_item_type = array_alpha;
				}else{
					array_objective_item_type = array_number;
				}
				for(var j=0; j<objective_item_count; j++)
				{
					var checked = "";
					if(answer == array_objective_item_type[j]) checked = "checked";
					vHtml += '<div class="radio radio-css radio-inline">';
					vHtml += '	<input type="radio" name="answer_'+question_num+'" id="answer_'+question_num+'_'+j+'" value="'+array_objective_item_type[j]+'" '+checked+'>';
					vHtml += '	<label for="answer_'+question_num+'_'+j+'">'+array_objective_item_type[j]+'</label>';
					vHtml += '</div>';
				}
				vHtml += '	</td>';
				vHtml += '</tr>';
			}
			
			$("#toeic_question_list").html(vHtml);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function create_question()
{
	if(!$("#question_count").val()){
		alert("문항갯수를 입력하세요");
		return;
	}
	if(!$("#question_start_num").val()){
		alert("시작번호를 입력하세요");
		return;
	}
	if(!$("#objective_item_count").val()){
		alert("객관식 선지를 입력하세요");
		return;
	}
	if(!$("#objective_item_type").val()){
		alert("숫자/알파벳을 선택하세요");
		return;
	}
	if(!$("#group_name").val()){
		alert("그룹을 입력하세요");
		return;
	}
	var question_count = parseInt($("#question_count").val());
	var question_start_num = parseInt($("#question_start_num").val());
	var objective_item_count = parseInt($("#objective_item_count").val());
	var objective_item_type = $("#objective_item_type").val();
	var group_name = $("#group_name").val();
	
	var array_group_name = group_name.split(",");

	var vHtml = "";
	for(var i=0; i<question_count; i++)
	{
		var question_num = question_start_num + i;
		vHtml += '<tr>';
		vHtml += '	<td class="text-center">';
		vHtml += '		<input type="hidden" name="question_num" id="question_num" value="'+question_num+'">';
		vHtml += '		<input type="hidden" name="question_type" id="question_type" value="M">';
		vHtml += question_num;
		vHtml += '	</td>';
		vHtml += '	<td>';
		vHtml += '		<select class="form-control" name="question_category" id="question_category">';
		for(var j=0; j<array_group_name.length; j++)
		{
			var selected = "";
			vHtml += '			<option value="'+array_group_name[j]+'" '+selected+'>'+array_group_name[j]+'</option>';
		}
		vHtml += '		</select>';
		vHtml += '	</td>';
		vHtml += '	<td class="with-radio">';
		var array_objective_item_type;
		if(objective_item_type == "A"){
			array_objective_item_type = array_alpha;
		}else{
			array_objective_item_type = array_number;
		}
		for(var j=0; j<objective_item_count; j++)
		{
			vHtml += '<div class="radio radio-css radio-inline">';
			vHtml += '	<input type="radio" name="answer_'+question_num+'" id="answer_'+question_num+'_'+j+'" value="'+array_objective_item_type[j]+'">';
			vHtml += '	<label for="answer_'+question_num+'_'+j+'">'+array_objective_item_type[j]+'</label>';
			vHtml += '</div>';
		}
		vHtml += '	</td>';
		vHtml += '</tr>';
	}
	
	$("#toeic_question_list").html(vHtml);
}

function add_image()
{
	$("#div_file").html('<input type="file"   id="image_file" accept="image/*" style="display:none;" onChange="load_image(this);" multiple>')
	$("#image_file").click();
}

var file_seq = 0;
var file_size = 0;
var file_data;
function load_image(event)
{
	file_data = event.files;
	
	file_seq = 0;
	file_size = file_data.length;

	$(".target").removeClass("select-image");

	uploadFile();
}

function uploadFile()
{
	var image_file_name = file_data[file_seq].name;
	var array_file_name = image_file_name.split(".");
	var v_type_length   = array_file_name.length - 1;
	var v_type = array_file_name[v_type_length];
	
	var filename = new Date().getTime()+"."+v_type;
	
	var formData=new FormData();
	formData.append("file",file_data[file_seq], filename);
	
	$.ajax({
        type: 'POST',
        url: '/batch/uploadBatchToeicFileUpload.do',
        data: formData,
        processData: false,
        contentType: false
    }).done(function (data) {
    	file_seq++;
    	var vHtml ="";
    	if(file_seq == file_size)
		{
    		vHtml += '<div class="target col-6 select-image">';
		}else{
			vHtml += '<div class="target col-6">';
		}
		vHtml += '	<input type="hidden" name="image_url" value="'+aws_url+data+'">';
		vHtml += '	<image src="'+aws_url+data+'" style="width:100%">';
		vHtml += '</div>';
		
		$("#thumnail_list").append(vHtml);
		
		
		
		
		if(file_seq == file_size)
		{
			$("#thumnail_list").sortable({
				items: $(".target")
			});

			$('.target').click(function(e){
				$(".target").removeClass("select-image");
				$(this).addClass("select-image");
				var img_url = $(this).find("input[name='image_url']").val();
				$("#view_image").html('<image src="'+img_url+'" style="width:100%">');
			});
			
	    	$("#view_image").html('<image src="'+aws_url+data+'" style="width:100%">');
	    	alert("업르드 완료되었습니다.")
		}else{
			uploadFile();
		}
    	
    	
    }).fail(function (error) {
    	console.log(error);
    })
}

function form_submit()
{
	var $_image_url   = $("input[name=image_url]");
	var image_sorting = 1;
	var image_list = Array();
	$_image_url.each(function(index) {
		var objImage = Object();
		objImage.image_url     = $(this).val();
		objImage.image_sorting = image_sorting;

		image_list.push(objImage);
		
		image_sorting++;
	});
	
	var $_question_num      = $("input[name=question_num]");
	var $_question_type     = $("input[name=question_type]");
	var $_question_category = $("select[name=question_category]");
	
	var question_list = Array();
	$_question_num.each(function(index) {
		var objQuestion = Object();
		
		var question_num      = $(this).val();
		var question_type     = $_question_type.eq(index).val();
		var question_category = $_question_category.eq(index).val();
		var answer            = cfmNvl1($('input[name="answer_'+question_num+'"]:checked').val());
		objQuestion.question_num      = question_num;
		objQuestion.question_type     = question_type;
		objQuestion.question_category = question_category;
		objQuestion.answer            = answer;
		
		question_list.push(objQuestion);
		
	});
	
	var data_value_image    = JSON.stringify(image_list);
	var data_value_question = JSON.stringify(question_list);
	
	var question_count = parseInt($("#question_count").val());
	var question_start_num = parseInt($("#question_start_num").val());
	var objective_item_count = parseInt($("#objective_item_count").val());
	var objective_item_type = $("#objective_item_type").val();
	var group_name = $("#group_name").val();
	
	$.ajax({
		type : "POST",
		url : "/batch/saveBatchExamToeic.do",
		data:{
			type:$("#search_type").val(),
			num:$("#search_num").val(),
			question_count:question_count,
			question_start_num:question_start_num,
			objective_item_count:objective_item_count,
			objective_item_type:objective_item_type,
			group_name:group_name,
			data_value_image:data_value_image,
			data_value_question:data_value_question
		},
		success:function(data){
			alert("저장하였습니다.");
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}