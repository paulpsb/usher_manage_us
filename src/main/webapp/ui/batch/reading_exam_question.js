var examInfo;
var a_arr=["A","B","C","D","E","F","G","H","I"];
/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	setTimeout(search_exam, 1000);
	
	$('#category').change(function(e){
		create_question();
	})
});

function search_exam()
{
	$.ajax({
		type : "POST",
		url : "/batch/getBatchExamReading.do",
		data:{
			type:$("#type").val(),
			num:$("#num").val(),
			sub_num:$("#sub_num").val()
		},
		success:function(data){
			examInfo = data;
			var q_num = data.q_num;
			var vHtml = "";
			for(var i=1; i<=q_num; i++)
			{
				vHtml += '<option value="'+i+'">'+i+'</option>';
			}
			$("#question_num").html(vHtml);
			
			$('#question_num').change(function(e){
				form_search();
			});
			
			form_search();
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
		url : "/batch/getBatchExamReadingQuestion.do",
		data:{
			type:$("#type").val(),
			num:$("#num").val(),
			sub_num:$("#sub_num").val(),
			question_num:$("#question_num").val()
		},
		success:function(data){
			if(data){
				$("#flag").val("U");
				
				$("#created").html(data.created_name+" / "+data.created);
				$("#modified").html(data.modified_name+" / "+data.modified);
				
				$("#question_type").val(data.question_type);
				$("#score").val(data.score);
				$("#category").val(data.category);
				
				$("#txt_passage").html(data.passage);
				$("#passage").val(data.passage);
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
				
				CKEDITOR.instances.question.setData(data.question);
			}else{
				$("#flag").val("I");

				$("#created").html("");
				$("#modified").html("");
				
				$("#question_type").val("VO");
				$("#score").val("1");
				$("#category").val("A");
				
				$("#txt_passage").html(examInfo.passage);
				$("#passage").val(examInfo.passage);
				CKEDITOR.instances.paragraph1.setData(examInfo.paragraph1);
				CKEDITOR.instances.paragraph2.setData(examInfo.paragraph2);
				CKEDITOR.instances.paragraph3.setData(examInfo.paragraph3);
				CKEDITOR.instances.paragraph4.setData(examInfo.paragraph4);
				CKEDITOR.instances.paragraph5.setData(examInfo.paragraph5);
				CKEDITOR.instances.paragraph6.setData(examInfo.paragraph6);
				CKEDITOR.instances.paragraph7.setData(examInfo.paragraph7);
				CKEDITOR.instances.paragraph8.setData(examInfo.paragraph8);
				CKEDITOR.instances.paragraph9.setData(examInfo.paragraph9);
				CKEDITOR.instances.paragraph10.setData(examInfo.paragraph10);
				
				CKEDITOR.instances.question.setData("");
			}
			create_question();
			
			if(data){
				$("#choice_a").val(data.choice_a);
				$("#choice_b").val(data.choice_b);
				$("#choice_c").val(data.choice_c);
				$("#choice_d").val(data.choice_d);
				$("#choice_e").val(data.choice_e);
				$("#choice_f").val(data.choice_f);
				$("#choice_g").val(data.choice_g);
				$("#choice_h").val(data.choice_h);
				$("#choice_i").val(data.choice_i);

				$("#score").val(data.score);
				$("#marker1").val(data.marker1);
				$("#marker2").val(data.marker2);
				$("#qcat1").val(data.qcat1);
				$("#qcat2").val(data.qcat2);
				$("#qcat1c").val(data.qcat1c);
				$("#qcat2c").val(data.qcat2c);
				var category = $("#category").val();
				var answer = data.answer;
				var answer1 = data.answer1;
				if(category == "A"){
					$("#answer_"+answer.toLowerCase()).prop("checked", true);
				}else if(category == "B"){
					var arr_answer = answer.split("|");
					for(var i=0; i<arr_answer.length; i++)
					{
						$("#answer_"+arr_answer[i].toLowerCase()).prop("checked", true);
					}
				}else if(category == "C"){
					$("#answer_"+answer.toLowerCase()).prop("checked", true);
				}else if(category == "D"){
					var arr_answer = answer.split("|");
					for(var i=0; i<arr_answer.length; i++)
					{
						$("#answer_"+arr_answer[i].toLowerCase()).prop("checked", true);
					}
				}else if(category == "E"){
					var arr_answer = answer.split("|");
					for(var i=0; i<arr_answer.length; i++)
					{
						$("#answer_"+arr_answer[i].toLowerCase()).prop("checked", true);
					}

					var arr_answer1 = answer1.split("|");
					for(var i=0; i<arr_answer1.length; i++)
					{
						$("#answer1_"+arr_answer1[i].toLowerCase()).prop("checked", true);
					}	
				}
			}
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function init_passage()
{
	$("#txt_passage").html(examInfo.passage);
	$("#passage").val(examInfo.passage);
	CKEDITOR.instances.paragraph1.setData(examInfo.paragraph1);
	CKEDITOR.instances.paragraph2.setData(examInfo.paragraph2);
	CKEDITOR.instances.paragraph3.setData(examInfo.paragraph3);
	CKEDITOR.instances.paragraph4.setData(examInfo.paragraph4);
	CKEDITOR.instances.paragraph5.setData(examInfo.paragraph5);
	CKEDITOR.instances.paragraph6.setData(examInfo.paragraph6);
	CKEDITOR.instances.paragraph7.setData(examInfo.paragraph7);
	CKEDITOR.instances.paragraph8.setData(examInfo.paragraph8);
	CKEDITOR.instances.paragraph9.setData(examInfo.paragraph9);
	CKEDITOR.instances.paragraph10.setData(examInfo.paragraph10);
}
function create_question()
{
	var category = $("#category").val();
	var vHtml = '';	

	if(category == "C"){
		vHtml += '<p>◎삽입형 문제의 삽입 위치표시■는 지문내 [SQ1], [SQ2], [SQ3], [SQ4] 형식으로 입력하면 시험에서 자동으로 ■로 대체됩니다.<br>';
		vHtml += '&nbsp;&nbsp;&nbsp;&nbsp;삽입될 문장은 &quot;문제&quot;란에 입력해 주세요. (선택지 입력 불필요, 정답만 체크)<br>';
		vHtml += '◎Summary형은 문제란에 입력 불필요. 디렉션 고정. 선택지만 입력. 답은 3개를 선택하는 유형임 (정답 3개 체크)<br>';
		vHtml += '◎Category형은 Direction을 &quot;질문&quot;란에 입력. </p>';
	}	
	if(category == "E"){
		vHtml += '<p>◎Category Chart형은 2개의 카테고리로 분류해야 하므로, 앞쪽이 1번 카테고리 정답, 뒤쪽에 2번 카테고리 정답을 체크하면 됨.<br>';
		vHtml += '◎Category형은 아래 내용도 입력해 주세요.</p>';
	}
	vHtml += '<div class="table-responsive">';
	vHtml += '	<table class="table table-bordered m-b-0 table-td-valign-middle">';
	vHtml += '		<colgroup>';
	vHtml += '			<col style="width:5%;" />';
	vHtml += '			<col style="width:5%;" />';
	vHtml += '			<col style="width:15%;" />';
	vHtml += '			<col style="width:25%;" />';
	vHtml += '			<col style="width:25%;" />';
	vHtml += '			<col style="width:5%;" />';
	vHtml += '			<col style="width:10%;" />';
	vHtml += '			<col style="width:10%;" />';
	vHtml += '		</colgroup>';								
	vHtml += '		<tbody>';
	//A/B타입 경우 문단표시
	if(category == "A" || category == "B"){
		vHtml += create_marker(false);
	}else{
		vHtml += create_marker(true);
	}

	//문제모양 가져오기
	if(category == "A"){
		vHtml += create_question_a();
	}else if(category == "B"){
		vHtml += create_question_b();
	}else if(category == "C"){
		vHtml += create_question_c();
	}else if(category == "D"){
		vHtml += create_question_d();
	}else if(category == "E"){
		vHtml += create_question_e();
	}
	
	vHtml += '		</tbody>';
	vHtml += '	</table>';
	vHtml += '</div>';	
	
	$("#div_question").html(vHtml);

}


function create_question_a()
{
	var vHtml = '';
	vHtml += '<input type="hidden" id="qcat1" name="qcat1" value="">';
	vHtml += '<input type="hidden" id="qcat1c" name="qcat1c" value="0">';
	vHtml += '<input type="hidden" id="qcat2" name="qcat2" value="">';
	vHtml += '<input type="hidden" id="qcat2c" name="qcat2c" value="0">';
	vHtml += '<input type="hidden" id="answer1" name="answer1" value="">';
	
	for(var i=0; i<a_arr.length; i++)
	{
		vHtml += '			<tr>';
		vHtml += '				<th class="text-center">'+a_arr[i]+'</th>';
		vHtml += '				<td class="with-radio text-center">';
		vHtml += '					<div class="radio radio-css">';
		vHtml += '						<input type="radio" id="answer_'+a_arr[i].toLowerCase()+'" name="answer" value="'+a_arr[i]+'">';
		vHtml += '						<label for="answer_'+a_arr[i].toLowerCase()+'">&nbsp;</label>';
		vHtml += '					</div>';
		vHtml += '				</td>';
		vHtml += '				<td class="with-form-control" colspan="6">';
		vHtml += '					<input type="text" class="form-control" id="choice_'+a_arr[i].toLowerCase()+'" name="choice_'+a_arr[i].toLowerCase()+'">';
		vHtml += '				</td>';
		vHtml += '			</tr>';		
	}
	return vHtml;
}

function create_question_b()
{
	var vHtml = '';
	vHtml += '<input type="hidden" id="qcat1" name="qcat1" value="">';
	vHtml += '<input type="hidden" id="qcat1c" name="qcat1c" value="0">';
	vHtml += '<input type="hidden" id="qcat2" name="qcat2" value="">';
	vHtml += '<input type="hidden" id="qcat2c" name="qcat2c" value="0">';
	vHtml += '<input type="hidden" id="answer1" name="answer1" value="">';
	for(var i=0; i<a_arr.length; i++)
	{
		vHtml += '			<tr>';
		vHtml += '				<th class="text-center">'+a_arr[i]+'</th>';
		vHtml += '				<td class="with-checkbox text-center">';
		vHtml += '					<div class="checkbox checkbox-css">';
		vHtml += '						<input type="checkbox" id="answer_'+a_arr[i].toLowerCase()+'" name="answer" value="'+a_arr[i]+'">';
		vHtml += '						<label for="answer_'+a_arr[i].toLowerCase()+'">&nbsp;</label>';
		vHtml += '					</div>';
		vHtml += '				</td>';
		vHtml += '				<td class="with-form-control" colspan="6">';
		vHtml += '					<input type="text" class="form-control" id="choice_'+a_arr[i].toLowerCase()+'" name="choice_'+a_arr[i].toLowerCase()+'">';
		vHtml += '				</td>';
		vHtml += '			</tr>';		
	}
	return vHtml;
}

function create_question_c()
{
	var vHtml = '';
	vHtml += '<input type="hidden" id="qcat1" name="qcat1" value="">';
	vHtml += '<input type="hidden" id="qcat1c" name="qcat1c" value="0">';
	vHtml += '<input type="hidden" id="qcat2" name="qcat2" value="">';
	vHtml += '<input type="hidden" id="qcat2c" name="qcat2c" value="0">';
	vHtml += '<input type="hidden" id="answer1" name="answer1" value="">';
	for(var i=0; i<a_arr.length; i++)
	{
		vHtml += '			<tr>';
		vHtml += '				<th class="text-center">'+a_arr[i]+'</th>';
		vHtml += '				<td class="with-radio text-center">';
		vHtml += '					<div class="radio radio-css">';
		vHtml += '						<input type="radio" id="answer_'+a_arr[i].toLowerCase()+'" name="answer" value="'+a_arr[i]+'">';
		vHtml += '						<label for="answer_'+a_arr[i].toLowerCase()+'">&nbsp;</label>';
		vHtml += '					</div>';
		vHtml += '				</td>';
		vHtml += '				<td class="with-form-control" colspan="6">';
		vHtml += '					&nbsp;<input type="hidden" id="choice_'+a_arr[i].toLowerCase()+'" name="choice_'+a_arr[i].toLowerCase()+'">';
		vHtml += '				</td>';
		vHtml += '			</tr>';		
	}
	return vHtml;
}

function create_question_d()
{
	var vHtml = '';
	vHtml += '<input type="hidden" id="qcat1" name="qcat1" value="">';
	vHtml += '<input type="hidden" id="qcat1c" name="qcat1c" value="0">';
	vHtml += '<input type="hidden" id="qcat2" name="qcat2" value="">';
	vHtml += '<input type="hidden" id="qcat2c" name="qcat2c" value="0">';
	vHtml += '<input type="hidden" id="answer1" name="answer1" value="">';
	for(var i=0; i<a_arr.length; i++)
	{
		vHtml += '			<tr>';
		vHtml += '				<th class="text-center">'+a_arr[i]+'</th>';
		vHtml += '				<td class="with-checkbox text-center">';
		vHtml += '					<div class="checkbox checkbox-css">';
		vHtml += '						<input type="checkbox" id="answer_'+a_arr[i].toLowerCase()+'" name="answer" value="'+a_arr[i]+'">';
		vHtml += '						<label for="answer_'+a_arr[i].toLowerCase()+'">&nbsp;</label>';
		vHtml += '					</div>';
		vHtml += '				</td>';
		vHtml += '				<td class="with-form-control" colspan="6">';
		vHtml += '					<input type="text" class="form-control" id="choice_'+a_arr[i].toLowerCase()+'" name="choice_'+a_arr[i].toLowerCase()+'">';
		vHtml += '				</td>';
		vHtml += '			</tr>';		
	}
	return vHtml;
}

function create_question_e()
{
	var vHtml = '';
	vHtml += '			<tr>';
	vHtml += '				<th colspan="2" class="text-center">카테고리1</th>';
	vHtml += '				<td class="with-form-control" colspan="4">';
	vHtml += '					<input type="text" class="form-control" id="qcat1" name="qcat1">';
	vHtml += '				</td>';
	vHtml += '				<th class="text-center">선택개수1</th>';
	vHtml += '				<td class="with-form-control">';
	vHtml += '					<select class="form-control" id="qcat1c" name="qcat1c">';
	vHtml += '						<option value="0">-</option>';
	vHtml += '						<option value="1">1</option>';
	vHtml += '						<option value="2">2</option>';
	vHtml += '						<option value="3">3</option>';
	vHtml += '						<option value="4">4</option>';
	vHtml += '						<option value="5">5</option>';
	vHtml += '					</select>';
	vHtml += '				</td>';
	vHtml += '			</tr>';	
	vHtml += '			<tr>';
	vHtml += '				<th colspan="2" class="text-center">카테고리2</th>';
	vHtml += '				<td class="with-form-control" colspan="4">';
	vHtml += '					<input type="text" class="form-control" id="qcat2" name="qcat2">';
	vHtml += '				</td>';
	vHtml += '				<th class="text-center">선택개수2</th>';
	vHtml += '				<td class="with-form-control">';
	vHtml += '					<select class="form-control" id="qcat2c" name="qcat2c">';
	vHtml += '						<option value="0">-</option>';
	vHtml += '						<option value="1">1</option>';
	vHtml += '						<option value="2">2</option>';
	vHtml += '						<option value="3">3</option>';
	vHtml += '						<option value="4">4</option>';
	vHtml += '						<option value="5">5</option>';
	vHtml += '					</select>';
	vHtml += '				</td>';
	vHtml += '			</tr>';	
	
	for(var i=0; i<a_arr.length; i++)
	{
		vHtml += '			<tr>';
		vHtml += '				<th class="text-center">'+a_arr[i]+'</th>';
		vHtml += '				<td class="with-form-control" colspan="5">';
		vHtml += '					<input type="text" class="form-control" id="choice_'+a_arr[i].toLowerCase()+'" name="choice_'+a_arr[i].toLowerCase()+'">';
		vHtml += '				</td>';
		vHtml += '				<td class="with-checkbox text-center">';
		vHtml += '					<div class="checkbox checkbox-css">';
		vHtml += '						<input type="checkbox" id="answer_'+a_arr[i].toLowerCase()+'" name="answer" value="'+a_arr[i]+'">';
		vHtml += '						<label for="answer_'+a_arr[i].toLowerCase()+'">&nbsp;</label>';
		vHtml += '					</div>';
		vHtml += '				</td>';
		vHtml += '				<td class="with-checkbox text-center">';
		vHtml += '					<div class="checkbox checkbox-css">';
		vHtml += '						<input type="checkbox" id="answer1_'+a_arr[i].toLowerCase()+'" name="answer1" value="'+a_arr[i]+'">';
		vHtml += '						<label for="answer1_'+a_arr[i].toLowerCase()+'">&nbsp;</label>';
		vHtml += '					</div>';
		vHtml += '				</td>';
		vHtml += '			</tr>';		
	}
	return vHtml;
}

function create_marker(isHidden)
{
	var vHtml = '';
	if(isHidden){
		vHtml += '<input type="hidden" id="marker1" name="marker1" value="0">';
		vHtml += '<input type="hidden" id="marker2" name="marker2" value="0">';
	}else{
		vHtml += '<tr>';
		vHtml += '	<th colspan="3" class="text-center">문단1</th>';
		vHtml += '	<td class="with-form-control">';
		vHtml += '		<select class="form-control" id="marker1" name="marker1">';
		vHtml += '			<option value="0">없음</option>';
		vHtml += '			<option value="1">1</option>';
		vHtml += '			<option value="2">2</option>';
		vHtml += '			<option value="3">3</option>';
		vHtml += '			<option value="4">4</option>';
		vHtml += '			<option value="5">5</option>';
		vHtml += '			<option value="6">6</option>';
		vHtml += '			<option value="7">7</option>';
		vHtml += '			<option value="8">8</option>';
		vHtml += '			<option value="9">9</option>';
		vHtml += '			<option value="10">10</option>';		
		vHtml += '		</select>';
		vHtml += '	</td>';
		vHtml += '	<th class="text-center">문단2</th>';
		vHtml += '	<td class="with-form-control" colspan="3">';
		vHtml += '		<select class="form-control" id="marker2" name="marker2">';
		vHtml += '			<option value="0">없음</option>';
		vHtml += '			<option value="1">1</option>';
		vHtml += '			<option value="2">2</option>';
		vHtml += '			<option value="3">3</option>';
		vHtml += '			<option value="4">4</option>';
		vHtml += '			<option value="5">5</option>';
		vHtml += '			<option value="6">6</option>';
		vHtml += '			<option value="7">7</option>';
		vHtml += '			<option value="8">8</option>';
		vHtml += '			<option value="9">9</option>';
		vHtml += '			<option value="10">10</option>';		
		vHtml += '		</select>';
		vHtml += '	</td>';
		vHtml += '</tr>';		
	}
	
	return vHtml;
}

function form_submit()
{
	var flag = $("#flag").val();
	
	var type = $("#type").val();
	var num = $("#num").val();
	var sub_num = $("#sub_num").val();
	var question_num = $("#question_num").val();
	var question_type = $("#question_type").val();
	
	var question = CKEDITOR.instances.question.getData();
	
	var choice_a = $("#choice_a").val();
	var choice_b = $("#choice_b").val();
	var choice_c = $("#choice_c").val();
	var choice_d = $("#choice_d").val();
	var choice_e = $("#choice_e").val();
	var choice_f = $("#choice_f").val();
	var choice_g = $("#choice_g").val();
	var choice_h = $("#choice_h").val();
	var choice_i = $("#choice_i").val();
	
	var score = $("#score").val();
	
	var category = $("#category").val();
	var marker1 = $("#marker1").val();
	var marker2 = $("#marker2").val();
	
	var passage = $("#passage").val();
	var paragraph1 = CKEDITOR.instances.paragraph1.getData();
	var paragraph2 = CKEDITOR.instances.paragraph2.getData();
	var paragraph3 = CKEDITOR.instances.paragraph3.getData();
	var paragraph4 = CKEDITOR.instances.paragraph4.getData();
	var paragraph5 = CKEDITOR.instances.paragraph5.getData();
	var paragraph6 = CKEDITOR.instances.paragraph6.getData();
	var paragraph7 = CKEDITOR.instances.paragraph7.getData();
	var paragraph8 = CKEDITOR.instances.paragraph8.getData();
	var paragraph9 = CKEDITOR.instances.paragraph9.getData();
	var paragraph10 = CKEDITOR.instances.paragraph10.getData();
	
	var qcat1 = $("#qcat1").val();
	var qcat2 = $("#qcat2").val();
	var qcat1c = $("#qcat1c").val();
	var qcat2c = $("#qcat2c").val();
	
	var answer = "";
	var answer1 = "";
	
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
		$('input[name="answer"]:checked').each(function(index,item){
			if(index > 0)
			{
				answer += "|";
			}
			answer += $(this).val();
		});
	}else if(category == "E"){
		$('input[name="answer"]:checked').each(function(index,item){
			if(index > 0)
			{
				answer += "|";
			}
			answer += $(this).val();
		});

		$('input[name="answer1"]:checked').each(function(index,item){
			if(index > 0)
			{
				answer1 += "|";
			}
			answer1 += $(this).val();
		});		
	}
	$.ajax({
		type : "POST",
		url : "/batch/saveBatchExamReadingQuestion.do",
		data:{
			flag:flag,
			type:type,
			num:num,
			sub_num:sub_num,
			question_num:question_num,
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
			score:score,
			answer:answer,
			answer1:answer1,
			category:category,
			marker1:marker1,
			marker2:marker2,
			passage:passage,
			paragraph1:paragraph1,
			paragraph2:paragraph2,
			paragraph3:paragraph3,
			paragraph4:paragraph4,
			paragraph5:paragraph5,
			paragraph6:paragraph6,
			paragraph7:paragraph7,
			paragraph8:paragraph8,
			paragraph9:paragraph9,
			paragraph10:paragraph10,
			qcat1:qcat1,
			qcat2:qcat2,
			qcat1c:qcat1c,
			qcat2c:qcat2c
		},
		success:function(data){
			alert("저장하였습니다.");
			form_search();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function move_exam()
{
	location.href = "/batch/reading_exam.do?type="+$("#type").val()+"&&num="+$("#num").val()+"&&sub_num="+$("#sub_num").val();
}