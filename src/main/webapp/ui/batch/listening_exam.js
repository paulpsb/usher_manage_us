var conversation_images = [
	["maletomale","남남"],
	["maletofemale","남여"],
	["femaletomale","여남"],
	["femaletofemale","여여"]	
];

var lecture_images = [
	["male","남자"],
	["female","여자"]
];

/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	$('#search_num').change(function(e){
		form_search();
	});	
	
	$('#search_type').change(function(e){
		form_search();
	});	
	
	$('#exam_type').change(function(e){
		setImageCombo($("#exam_type").val(), "");
	});	
	
	form_search();
	
});

function form_search()
{
	$.ajax({
		type : "POST",
		url : "/batch/getExamListeningList.do",
		data:{
			type:$("#search_type").val(),
			num:$("#search_num").val()
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				vHtml += "<tr>";
				vHtml += "<td>"+cfmNvl1(data[i].type)+"</td>";
				vHtml += "<td>"+cfmNvl1(data[i].num)+"</td>";
				vHtml += "<td>"+cfmNvl1(data[i].sub_num)+"</td>";
				vHtml += "<td>"+cfmNvl1(data[i].article_num)+"</td>";
				vHtml += "<td>"+cfmNvl1(data[i].exam_type)+"</td>";
				vHtml += "<td>"+getImageText(cfmNvl1(data[i].exam_type), cfmNvl1(data[i].image))+"</td>";
				vHtml += "<td class='with-btn text-center' nowrap=''>";
				vHtml += "	<button type='button' class='btn btn-sm btn-primary m-r-2' onclick='modify_form(\""+data[i].id+"\")'>수정</button>";
				vHtml += "	<button type='button' class='btn btn-sm btn-primary m-r-2' onclick='go_detail(\""+data[i].id+"\")'>문제로 이동</button>";
				vHtml += "</td>";
				vHtml += "</tr>";
			}
			
			$("#dataList").html(vHtml);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

function getImageText(v_type, v_image)
{
	var rtn = "";
	var array_images;
	if(v_type == "Conversation"){
		array_images = conversation_images;
	}else if(v_type == "Lecture"){
		array_images = lecture_images;
	}else{
		array_images = Array();
	}
	
	for(var i=0; i<array_images.length; i++)
	{
		if(v_image == array_images[i][0]){
			rtn = array_images[i][1];
			break;
		}
	}
	
	return rtn;
}

function setImageCombo(v_type, v_image)
{
	var vHtml = "";
	var array_images;
	if(v_type == "Conversation"){
		array_images = conversation_images;
	}else if(v_type == "Lecture"){
		array_images = lecture_images;
	}else{
		array_images = Array();
	}
	
	console.log(array_images);
	for(var i=0; i<array_images.length; i++)
	{
		var selected = "";
		if(v_image == array_images[i][0]) selected = "selected";
		vHtml += "<option value='"+array_images[i][0]+"' "+selected+">"+array_images[i][1]+"</option>";
	}
	
	$("#image").html(vHtml);
}

function add_form()
{
	$("#type").attr("disabled",false);
	$("#num").attr("disabled",false);
	$("#sub_num").attr("disabled",false);
	$("#article_num").attr("disabled",false);
	
	$("#listening_id").val("0");
	
	setImageCombo($("#exam_type").val(), "");
	$("#modal-listening").modal();
}

function modify_form(listening_id)
{
	$.ajax({
		type : "POST",
		url : "/batch/getBatchExamListening.do",
		data:{
			id:listening_id
		},
		success:function(data){
			
			$("#type").attr("disabled",true);
			$("#num").attr("disabled",true);
			$("#sub_num").attr("disabled",true);
			$("#article_num").attr("disabled",true);
			
			$("#listening_id").val(data.id);
			$("#type").val(data.type);
			$("#num").val(data.num);
			$("#sub_num").val(data.sub_num);
			$("#article_num").val(data.article_num);
			$("#exam_type").val(cfmNvl1(data.exam_type));
			
			setImageCombo(cfmNvl1(data.exam_type), cfmNvl1(data.image));

			$("#modal-listening").modal();

		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}
function save_form()
{
	var url;
	if($('#listening_id').val() == "0"){
		url = "/batch/insertBatchExamListening.do";
	}else{
		url = "/batch/updateBatchExamListening.do";
	}
	$.ajax({
		type : "POST",
		url : url,
		data:{
			id:$('#listening_id').val(),
			type:$('#type').val(),
			num:$('#num').val(),
			sub_num:$('#sub_num').val(),
			article_num:$('#article_num').val(),
			exam_type:$('#exam_type').val(),
			image:$('#image').val()
		},
		success:function(data){
			alert("저장하였습니다.");
			$("#modal-listening").modal("hide");
			form_search();
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

function go_detail(listening_id)
{
	location.href = "/batch/listening_exam_question.do?id="+listening_id;
}
