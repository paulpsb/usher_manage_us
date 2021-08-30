var a_arr=["A","B","C","D","E","F","G","H","I"];
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
jQuery(document).ready(function(){
	search_listening();
	
	$('#category').change(function(e){
		create_question($(this).val(), 5);
	})

});

var audio_url = "https://s3.ap-northeast-2.amazonaws.com/usher.api.data.listening";

function search_listening()
{
	$.ajax({
		type : "POST",
		url : "/exam/getExamListeningQuestionList.do",
		data:{
			id:$("#listening_id").val()
		},
		success:function(data){
			var listeningInfo = data.listeningInfo;
			var questionList  = data.questionList;
			$("#book").val(listeningInfo.book);
			$("#volume").val(listeningInfo.volume);
			$("#group").val(listeningInfo.group);
			$("#article").val(listeningInfo.article);
			$("#type").val(listeningInfo.type);
			$("#image").val(getImageText(listeningInfo.type, listeningInfo.image));
			$("#short_title").val(listeningInfo.short_title);
			
			var vHtml = "";
			for(var i=0; i<questionList.length; i++)
			{
				var question = cfmNvl1(questionList[i].question);
				question = question.replace(/(<([^>]+)>)/gi, "");
				vHtml += '<tr>';
				vHtml += '<td class="text-center">'+questionList[i].question_num+'</td>';
				vHtml += '<td>'+question+'</td>';
				vHtml += '<td class="text-center">';
				vHtml += cfmNvl1(questionList[i].answer);
				console.log(questionList[i].question_num+"=>"+questionList[i].answer2)
				if(questionList[i].answer1){
					vHtml += ","+cfmNvl1(questionList[i].answer1);
				}
				if(questionList[i].answer2){
					vHtml += ","+cfmNvl1(questionList[i].answer2);
				}
				if(questionList[i].answer3){
					vHtml += ","+cfmNvl1(questionList[i].answer3);
				}
				vHtml += '</td>';
				vHtml += "<td class='with-btn text-center' nowrap=''>";
				if(questionList[i].category == "C"){
					vHtml += "	<button type='button' class='btn btn-sm btn-primary width-60 m-r-2' onclick='audio_form(\""+questionList[i].question_num+"\",\"repeat\")'>재청취</a>";
				}
				vHtml += "	<button type='button' class='btn btn-sm btn-primary width-60 m-r-2' onclick='audio_form(\""+questionList[i].question_num+"\",\"question\")'>문제</a>";
				vHtml += "</td>";
				
				vHtml += "<td class='with-btn' nowrap=''>";
				vHtml += "	<button type='button' class='btn btn-sm btn-primary width-60 m-r-2' onclick='modify_form(\""+questionList[i].question_num+"\")'>수정</a>";
				if(i == (questionList.length-1))
				{
					vHtml += "	<button type='button' class='btn btn-sm btn-danger width-60 m-r-2' onclick='delete_form(\""+questionList[i].question_num+"\")'>삭제</a>";
				}
				vHtml += "</td>";
				vHtml += '</tr>';
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

function modify_form(question_num)
{
	search_question(question_num);
}

function delete_form(question_num){
	if(!confirm("삭제하시겠습니까?")) return;
	

	$.ajax({
		type : "POST",
		url : "/exam/deleteExamListeningQuestion.do",
		data:{
			listening_id:$("#listening_id").val(),
			question_num:question_num
		},
		success:function(data){
			search_listening();
			clear_question();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function clear_question()
{
	$('#question_num').val("");
	$('#question_type').val("MA");
	$('#category').val("A");
	
	$("#div_question").html("");
}
function search_question(question_num)
{
	$.ajax({
		type : "POST",
		url : "/exam/getExamListeningQuestion.do",
		data:{
			listening_id:$("#listening_id").val(),
			question_num:question_num
		},
		success:function(data){
			var category = data.category;
			var question_count = data.question_count;
			var question_type = data.question_type;
			if(!category) category = "A";
			if(!question_type) question_type = "MA";
			if(!question_count){
				if(category == "D"){
					question_count = 5;
				}else{
					question_count = 2;
				}
				
			}

			$('#question_num').val(question_num);
			$('#question_type').val(question_type);
			$('#category').val(category);
			
			CKEDITOR.instances.listening_question.setData(cfmNvl1(data.question));

			
			create_question(category, question_count);
			
			$("#choice_a").val(cfmNvl1(data.choice_a));
			$("#choice_b").val(cfmNvl1(data.choice_b));
			$("#choice_c").val(cfmNvl1(data.choice_c));
			$("#choice_d").val(cfmNvl1(data.choice_d));
			$("#choice_e").val(cfmNvl1(data.choice_e));
			$("#choice_f").val(cfmNvl1(data.choice_f));
			$("#choice_g").val(cfmNvl1(data.choice_g));
			$("#choice_h").val(cfmNvl1(data.choice_h));
			$("#choice_i").val(cfmNvl1(data.choice_i)); 
			
			var answer = cfmNvl1(data.answer);
			var answer1 = cfmNvl1(data.answer1);
			var answer2 = cfmNvl1(data.answer2);
			var answer3 = cfmNvl1(data.answer3);
			if(answer || answer1|| answer2|| answer3)
			{
				if(category == "A"){
					$('#answer_'+answer.toLowerCase()).prop("checked", true);
				}else if(category == "B"){
					var tmpAnsArr=answer.split("|");
					
					for(var i=0; i<tmpAnsArr.length;i++) {
						var aid = '#answer_'+tmpAnsArr[i].toLowerCase();
						$(aid).prop("checked", true);
					}
				}else if(category == "C"){
					$('#answer_'+answer.toLowerCase()).prop("checked", true);
				}else if(category == "D"){
					var tmpAnsArr=answer.split("|");
					var tmpAnsArr1=answer1.split("|");
					
					for(var i=0; i<tmpAnsArr.length;i++) {
						var seq = i + 1;
						var aid = '#answer_'+seq+'_'+tmpAnsArr[i].toLowerCase();
						$(aid).prop("checked", true);
					}
					
					for(var i=0; i<tmpAnsArr1.length;i++) {
						var aid = '#choice_'+tmpAnsArr1[i].toLowerCase()+'_check';
						$(aid).prop("checked", true);
					}
					
				}else if(category == "E"){
					$("#qcat1").val(cfmNvl1(data.qcat1));
					$("#qcat2").val(cfmNvl1(data.qcat2));
					$("#qcat3").val(cfmNvl1(data.qcat3));
					$("#qcat4").val(cfmNvl1(data.qcat4));
					
					var tmpAnsArr=answer.split("|");
					var tmpAnsArr1=answer1.split("|");
					var tmpAnsArr2=answer2.split("|");
					var tmpAnsArr3=answer3.split("|");
					
					for(var i=0; i<tmpAnsArr.length;i++) {
						var aid = '#answer_'+tmpAnsArr[i].toLowerCase()+'_1';
						$(aid).prop("checked", true);
					}
					
					for(var i=0; i<tmpAnsArr1.length;i++) {
						var aid = '#answer_'+tmpAnsArr1[i].toLowerCase()+'_2';
						$(aid).prop("checked", true);
					}
					
					for(var i=0; i<tmpAnsArr2.length;i++) {
						var aid = '#answer_'+tmpAnsArr2[i].toLowerCase()+'_3';
						$(aid).prop("checked", true);
					}
					
					for(var i=0; i<tmpAnsArr3.length;i++) {
						var aid = '#answer_'+tmpAnsArr3[i].toLowerCase()+'_4';
						$(aid).prop("checked", true);
					}
					
					$('#question_count').val(question_count);

					if(question_count == 3){
						$(".category_3").show();
						$(".category_4").hide();
					}else if(question_count == 4){
						$(".category_3").show();
						$(".category_4").show();
					}else{
						$(".category_3").hide();
						$(".category_4").hide();
					}
				}				
			}

			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function create_question(category, question_count){
	var vHtml = "";
	//문제모양 가져오기
	if(category == "A"){
		vHtml = create_question_a();
	}else if(category == "B"){
		vHtml = create_question_b();
	}else if(category == "C"){
		vHtml = create_question_c();
	}else if(category == "D"){
		vHtml = create_question_d(question_count);
	}else if(category == "E"){
		vHtml = create_question_e();
	}
	$("#div_question").html(vHtml);

	
	$('#question_count').change(function(e){
		if($("#category").val() == "D")
		{
			create_question($("#category").val(), $(this).val());
		}else if($("#category").val() == "E"){
			for(var i=0; i<a_arr.length; i++)
			{
				$("#answer_"+a_arr[i].toLowerCase()+"_1").prop("checked", false);
				$("#answer_"+a_arr[i].toLowerCase()+"_2").prop("checked", false);
				$("#answer_"+a_arr[i].toLowerCase()+"_3").prop("checked", false);
			}
			if($('#question_count').val() == "3"){
				$(".category_3").show();
				$(".category_4").hide();
			}else if($('#question_count').val() == "4"){
				$(".category_3").show();
				$(".category_4").show();
			}else{
				$(".category_3").hide();
				$(".category_4").hide();
			}
		}
		
	});
	
}

function create_question_a()
{
	var vHtml = "";
	vHtml += '<div class="table-responsive">';
	vHtml += '	<table class="table table-bordered m-b-0 table-td-valign-middle">';
	vHtml += '		<colgroup>';
	vHtml += '			<col style="width:5%;" />';
	vHtml += '			<col style="width:7%;" />';
	vHtml += '			<col style="width:88%;" />';
	vHtml += '		</colgroup>';								
	vHtml += '		<tbody>';
	for(var i=0; i<a_arr.length; i++)
	{
		vHtml += '			<tr>';
		vHtml += '				<td class="text-center">'+a_arr[i]+'</td>';
		vHtml += '				<td class="with-radio text-center">';
		vHtml += '					<div class="radio radio-css text-center">';
		vHtml += '						<input type="radio" id="answer_'+a_arr[i].toLowerCase()+'" name="answer" value="'+a_arr[i]+'">';
		vHtml += '						<label for="answer_'+a_arr[i].toLowerCase()+'">&nbsp;</label>';
		vHtml += '					</div>';
		vHtml += '				</td>';
		vHtml += '				<td class="with-form-control">';
		vHtml += '					<input type="text" class="form-control" id="choice_'+a_arr[i].toLowerCase()+'" name="choice_'+a_arr[i].toLowerCase()+'">';
		vHtml += '				</td>';
		vHtml += '			</tr>';
	}
	vHtml += '		</tbody>';
	vHtml += '	</table>';
	vHtml += '</div>';	
	
	return vHtml;
}

function create_question_b()
{
	var vHtml = "";
	vHtml += '<div class="table-responsive">';
	vHtml += '	<table class="table table-bordered m-b-0 table-td-valign-middle">';
	vHtml += '		<colgroup>';
	vHtml += '			<col style="width:5%;" />';
	vHtml += '			<col style="width:7%;" />';
	vHtml += '			<col style="width:88%;" />';
	vHtml += '		</colgroup>';								
	vHtml += '		<tbody>';
	for(var i=0; i<a_arr.length; i++)
	{
		vHtml += '			<tr>';
		vHtml += '				<td class="text-center">'+a_arr[i]+'</td>';
		vHtml += '				<td class="with-checkbox text-center">';
		vHtml += '					<div class="checkbox checkbox-css text-center">';
		vHtml += '						<input type="checkbox" id="answer_'+a_arr[i].toLowerCase()+'" name="answer" value="'+a_arr[i]+'">';
		vHtml += '						<label for="answer_'+a_arr[i].toLowerCase()+'">&nbsp;</label>';
		vHtml += '					</div>';
		vHtml += '				</td>';
		vHtml += '				<td class="with-form-control">';
		vHtml += '					<input type="text" class="form-control" id="choice_'+a_arr[i].toLowerCase()+'" name="choice_'+a_arr[i].toLowerCase()+'">';
		vHtml += '				</td>';
		vHtml += '			</tr>';
	}
	vHtml += '		</tbody>';
	vHtml += '	</table>';
	vHtml += '</div>';	
	
	return vHtml;
}

function create_question_c()
{
	var vHtml = "";
	vHtml += '<div class="table-responsive">';
	vHtml += '	<table class="table table-bordered m-b-0 table-td-valign-middle">';
	vHtml += '		<colgroup>';
	vHtml += '			<col style="width:5%;" />';
	vHtml += '			<col style="width:7%;" />';
	vHtml += '			<col style="width:88%;" />';
	vHtml += '		</colgroup>';								
	vHtml += '		<tbody>';
	for(var i=0; i<a_arr.length; i++)
	{
		vHtml += '			<tr>';
		vHtml += '				<td class="text-center">'+a_arr[i]+'</td>';
		vHtml += '				<td class="with-radio text-center">';
		vHtml += '					<div class="radio radio-css text-center">';
		vHtml += '						<input type="radio" id="answer_'+a_arr[i].toLowerCase()+'" name="answer" value="'+a_arr[i]+'">';
		vHtml += '						<label for="answer_'+a_arr[i].toLowerCase()+'">&nbsp;</label>';
		vHtml += '					</div>';
		vHtml += '				</td>';
		vHtml += '				<td class="with-form-control">';
		vHtml += '					<input type="text" class="form-control" id="choice_'+a_arr[i].toLowerCase()+'" name="choice_'+a_arr[i].toLowerCase()+'">';
		vHtml += '				</td>';
		vHtml += '			</tr>';
	}
	vHtml += '		</tbody>';
	vHtml += '	</table>';
	vHtml += '</div>';	
	
	return vHtml;
}

function create_question_d(question_count)
{
	var q_width = 85 - ( 5 * question_count);
	var vHtml = "";
	vHtml += '<div class="table-responsive">';
	vHtml += '	<table class="table table-bordered m-b-0 table-td-valign-middle">';
	vHtml += '		<colgroup>';
	vHtml += '			<col style="width:5%;" />';
	vHtml += '			<col style="width:8%;" />';
	vHtml += '			<col style="width:'+q_width+'%;" />';
	for(var i=0; i<question_count; i++)
	{
		vHtml += '			<col style="width:5%;" />';
	}
	vHtml += '		</colgroup>';								
	vHtml += '		<tbody>';
	vHtml += '		<tr>';
	vHtml += '			<td class="text-center" colspan="2">문항수</td>';
	vHtml += '			<td class="text-with-form-control">';
	vHtml += '				<select class="form-control" name="question_count" id="question_count">';
	for(var i=0; i<9; i++)
	{
		var nSeq = i+1;
		var selected = "";
		if(nSeq == question_count) selected = "selected";
		vHtml += '				<option value="'+nSeq+'" '+selected+'>'+nSeq+'</option>';
	}
	vHtml += '				</select>';
	vHtml += '			</td>';	
	for(var i=0; i<question_count; i++)
	{
		vHtml += '			<td class="text-center">'+(i+1)+'</td>';
	}
	vHtml += '		</tr>';
	for(var i=0; i<question_count; i++)
	{
		vHtml += '			<tr>';
		vHtml += '				<td class="text-center">'+a_arr[i]+'</td>';
		vHtml += '				<td class="with-checkbox text-center">';
		vHtml += '					<div class="checkbox checkbox-css text-center">';
		vHtml += '						<input type="checkbox" id="choice_'+a_arr[i].toLowerCase()+'_check" name="choice_check" value="'+a_arr[i]+'">';
		vHtml += '						<label for="choice_'+a_arr[i].toLowerCase()+'_check">&nbsp;</label>';
		vHtml += '					</div>';
		vHtml += '				</td>';
		vHtml += '				<td class="with-form-control">';
		vHtml += '					<input type="text" class="form-control" id="choice_'+a_arr[i].toLowerCase()+'" name="choice_'+a_arr[i].toLowerCase()+'">';
		vHtml += '				</td>';
		for(var j=0; j<question_count; j++)
		{
			var nSeq = j+1;
			vHtml += '				<td class="with-radio text-center">';
			vHtml += '					<div class="radio radio-css text-center">';
			vHtml += '						<input type="radio" id="answer_'+nSeq+'_'+a_arr[i].toLowerCase()+'" name="answer_'+nSeq+'" value="'+a_arr[i]+'">';
			vHtml += '						<label for="answer_'+nSeq+'_'+a_arr[i].toLowerCase()+'">&nbsp;</label>';
			vHtml += '					</div>';
			vHtml += '				</td>';
		}
		vHtml += '			</tr>';
	}
	vHtml += '		</tbody>';
	vHtml += '	</table>';
	vHtml += '</div>';	
	
	return vHtml;
}

function create_question_e()
{
	var vHtml = "";
	vHtml += '<div class="table-responsive">';
	vHtml += '	<table class="table table-bordered m-b-0 table-td-valign-middle">';
	vHtml += '		<colgroup>';
	vHtml += '			<col style="width:5%;" />';
	vHtml += '			<col style="width:15%;" />';
	vHtml += '			<col style="width:30%;" />';
	vHtml += '			<col style="width:20%;" />';
	//vHtml += '			<col style="width:15%;" />';
	//vHtml += '			<col style="width:15%;" />';
	vHtml += '		</colgroup>';								
	vHtml += '		<tbody>';
	vHtml += '			<tr>';
	vHtml += '				<td class="text-center" colspan="2">카테고리 갯수</td>';
	vHtml += '				<td class="with-form-control">';
	vHtml += '					<select class="form-control" name="question_count" id="question_count">';
	vHtml += '						<option value="2">2</option>';
	vHtml += '						<option value="3">3</option>';
	vHtml += '						<option value="4">4</option>';
	vHtml += '					</select>';
	vHtml += '					</select>';
	vHtml += '				</td>';
	vHtml += '				<td class="with-form-control" colspan="3">&nbsp;</td>';
	vHtml += '			</tr>';	
	vHtml += '			<tr>';
	vHtml += '				<td class="text-center" colspan="2">카테고리1</td>';
	vHtml += '				<td class="with-form-control" colspan="4">';
	vHtml += '					<input type="text" class="form-control" id="qcat1" name="qcat1">';
	vHtml += '				</td>';
	vHtml += '			</tr>';	
	vHtml += '			<tr>';
	vHtml += '				<td class="text-center" colspan="2">카테고리2</td>';
	vHtml += '				<td class="with-form-control" colspan="4">';
	vHtml += '					<input type="text" class="form-control" id="qcat2" name="qcat2">';
	vHtml += '				</td>';
	vHtml += '			</tr>';	
	vHtml += '			<tr class="category_3" style="display:none">';
	vHtml += '				<td class="text-center" colspan="2">카테고리3</td>';
	vHtml += '				<td class="with-form-control" colspan="4">';
	vHtml += '					<input type="text" class="form-control" id="qcat3" name="qcat3">';
	vHtml += '				</td>';
	vHtml += '			</tr>';	
	vHtml += '			<tr class="category_4" style="display:none">';
	vHtml += '				<td class="text-center" colspan="2">카테고리4</td>';
	vHtml += '				<td class="with-form-control" colspan="4">';
	vHtml += '					<input type="text" class="form-control" id="qcat4" name="qcat4">';
	vHtml += '				</td>';
	vHtml += '			</tr>';	
	for(var i=0; i<a_arr.length; i++)
	{
		vHtml += '			<tr>';
		vHtml += '				<td class="text-center">'+a_arr[i]+'</td>';
		vHtml += '				<td class="with-form-control" colspan="3">';
		vHtml += '					<input type="text" class="form-control" id="choice_'+a_arr[i].toLowerCase()+'" name="choice_'+a_arr[i].toLowerCase()+'">';
		vHtml += '				</td>';
		vHtml += '				<td class="with-radio text-center">';
		vHtml += '					<div class="radio radio-css text-center">';
		vHtml += '						<input type="radio" id="answer_'+a_arr[i].toLowerCase()+'_1" name="answer_'+a_arr[i].toLowerCase()+'" value="1">';
		vHtml += '						<label for="answer_'+a_arr[i].toLowerCase()+'_1">&nbsp;</label>';
		vHtml += '					</div>';
		vHtml += '				</td>';
		vHtml += '				<td class="with-radio text-center">';
		vHtml += '					<div class="radio radio-css text-center">';
		vHtml += '						<input type="radio" id="answer_'+a_arr[i].toLowerCase()+'_2" name="answer_'+a_arr[i].toLowerCase()+'" value="2">';
		vHtml += '						<label for="answer_'+a_arr[i].toLowerCase()+'_2">&nbsp;</label>';
		vHtml += '					</div>';
		vHtml += '				</td>';
		vHtml += '				<td class="with-radio text-center category_3"  style="display:none">';
		vHtml += '					<div class="radio radio-css text-center">';
		vHtml += '						<input type="radio" id="answer_'+a_arr[i].toLowerCase()+'_3" name="answer_'+a_arr[i].toLowerCase()+'" value="3">';
		vHtml += '						<label for="answer_'+a_arr[i].toLowerCase()+'_3">&nbsp;</label>';
		vHtml += '					</div>';
		vHtml += '				</td>';
		vHtml += '				<td class="with-radio text-center category_4"  style="display:none">';
		vHtml += '					<div class="radio radio-css text-center">';
		vHtml += '						<input type="radio" id="answer_'+a_arr[i].toLowerCase()+'_4" name="answer_'+a_arr[i].toLowerCase()+'" value="4">';
		vHtml += '						<label for="answer_'+a_arr[i].toLowerCase()+'_4">&nbsp;</label>';
		vHtml += '					</div>';
		vHtml += '				</td>';
		vHtml += '			</tr>';
	}
	vHtml += '		</tbody>';
	vHtml += '	</table>';
	vHtml += '</div>';	
	
	return vHtml;
}

function add_question()
{
	$.ajax({
		type : "POST",
		url : "/exam/insertExamListeningQuestion.do",
		data:{
			listening_id:$("#listening_id").val()
		},
		success:function(data){
			search_listening();
			//alert(data.id);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
	
}

function save_question()
{
	var listening_id = $("#listening_id").val();
	var question_num = $("#question_num").val();
	var category = $("#category").val();
	var question_type = $("#question_type").val();
	var question = CKEDITOR.instances.listening_question.getData();
	var choice_a = $("#choice_a").val();
	var choice_b = $("#choice_b").val();
	var choice_c = $("#choice_c").val();
	var choice_d = $("#choice_d").val();
	var choice_e = $("#choice_e").val();
	var choice_f = $("#choice_f").val();
	var choice_g = $("#choice_g").val();
	var choice_h = $("#choice_h").val();
	var choice_i = $("#choice_i").val();
	var choice_a_check = "";
	var choice_b_check = "";
	var choice_c_check = "";
	var choice_d_check = "";
	var choice_e_check = "";
	var choice_f_check = "";
	var choice_g_check = "";
	var choice_h_check = "";
	var choice_i_check = "";
	var score = "1";
	var answer = "";
	var answer1 = "";
	var answer2 = "";
	var answer3 = "";
	var qcat1 = $("#qcat1").val();
	var qcat2 = $("#qcat2").val();
	var qcat3 = $("#qcat3").val();
	var qcat4 = $("#qcat4").val();
	var question_count = "0";
	if(category == "A"){
		answer = $('input[name="answer"]:checked').val();
	}else if(category == "B"){
		$('input[name="answer"]:checked').each(function(index,item){
			if(index > 0)
			{
				answer += "|";
			}
			answer += $(this).val();
		});
	}else if(category == "C"){
		answer = $('input[name="answer"]:checked').val();
	}else if(category == "D"){
		question_count = $("#question_count").val();
		for(var i=0; i<question_count; i++)
		{
			var nSeq = i+1;
			var answer_temp = $('input[name="answer_'+nSeq+'"]:checked').val();
			if(answer){
				answer += "|";
			}
			answer += answer_temp;
		}
		$('input[name="choice_check"]:checked').each(function(index,item){
			if(index > 0)
			{
				answer1 += "|";
			}
			answer1 += $(this).val();
		});
	}else if(category == "E"){
		question_count = $("#question_count").val();
		for(var i=0; i<a_arr.length; i++)
		{
			var answer_temp = $('input[name="answer_'+a_arr[i].toLowerCase()+'"]:checked').val();
			if(answer_temp == "1"){
				if(answer){
					answer += "|";
				}
				answer += a_arr[i];
			}else if(answer_temp == "2"){
				if(answer1){
					answer1 += "|";
				}
				answer1 += a_arr[i];
			}else if(answer_temp == "3"){
				if(answer2){
					answer2 += "|";
				}
				answer2 += a_arr[i];
			}else if(answer_temp == "4"){
				if(answer3){
					answer3 += "|";
				}
				answer3 += a_arr[i];
			}
			
		}
	}
	
	$.ajax({
		type : "POST",
		url : "/exam/updateExamListeningQuestion.do",
		data:{
			listening_id:listening_id,
			question_num:question_num,
			category:category,
			question_type:question_type,
			question:question,
			choice_a:choice_a,
			choice_b:choice_b,
			choice_c:choice_c,
			choice_d:choice_d,
			choice_e:choice_e,
			choice_f:choice_f,
			choice_g:choice_g,
			choice_h:choice_h,
			choice_i:choice_i,
			choice_a_check:choice_a_check,
			choice_b_check:choice_b_check,
			choice_c_check:choice_c_check,
			choice_d_check:choice_d_check,
			choice_e_check:choice_e_check,
			choice_f_check:choice_f_check,
			choice_g_check:choice_g_check,
			choice_h_check:choice_h_check,
			choice_i_check:choice_i_check,
			score:score,
			answer:answer,
			answer1:answer1,
			answer2:answer2,
			answer3:answer3,
			qcat1:qcat1,
			qcat2:qcat2,
			qcat3:qcat3,
			qcat4:qcat4,
			question_count:question_count
		},
		success:function(data){
			alert("저장하였습니다.");
			search_listening();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function audio_form(v_question_num, v_type)
{
	if(v_type == "question"){
		$("#div_audio").html('<audio src="'+audio_url+'/'+$("#volume").val()+'/'+$("#group").val()+'/'+$("#article").val()+'/question_'+v_question_num+'.mp3" controls autoplay style="width:100%" ></audio>');
	}else if(v_type == "repeat"){
		$("#div_audio").html('<audio src="'+audio_url+'/'+$("#volume").val()+'/'+$("#group").val()+'/'+$("#article").val()+'/question_'+v_question_num+'_repeat.mp3" controls autoplay style="width:100%" ></audio>');
	}
	
	$("#modal-audio").modal();
}

function audio_form_close()
{
	$("#div_audio").html('');
	$("#modal-audio").modal('hide');
}
function move_form()
{
	location.href = "/exam/listening_list.do?page="+$("#v_page").val()+"&&book="+$("#v_book").val()+"&&volume="+$("#v_volume").val();
}