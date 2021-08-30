var a_arr=["A","B","C","D","E","F","G","H","I"];

var section = "GRAMMAR";

/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	search_book();
});

/*
 * 설명 : 년/월 조회
 */
function search_book()
{

	$.ajax({
		type : "POST",
		url : "/common/getProblemBookList.do",
		data:{
			section:section
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				vHtml += "<option value='"+data[i].book+"'>"+data[i].book+"</option>";
			}
			$("#search_book").html(vHtml);
			$('#search_book').change(function(e){
				search_volume();
			});	
			search_volume();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

/*
 * 설명 : 년/월 조회
 */
function search_volume()
{

	$.ajax({
		type : "POST",
		url : "/common/getProblemVolumeList.do",
		data:{
			section:section,
			book:$('#search_book').val()
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				vHtml += "<option value='"+data[i].volume+"'>"+data[i].volume+"</option>";
			}
			if(data.length == 0){
				vHtml += "<option value=''></option>";
			}
			$("#search_volume").html(vHtml);
			$('#search_volume').change(function(e){
				search_group();
			});	
			search_group();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

/*
 * 설명 : 년/월 조회
 */
function search_group()
{

	$.ajax({
		type : "POST",
		url : "/common/getProblemGroupList.do",
		data:{
			section:section,
			book:$('#search_book').val(),
			volume:$('#search_volume').val()
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				vHtml += "<option value='"+data[i].group+"'>"+data[i].group+"</option>";
			}
			if(data.length == 0){
				vHtml += "<option value=''></option>";
			}
			$("#search_group").html(vHtml);
			$('#search_group').change(function(e){
				search_article();
			});	
			search_article();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

/*
 * 설명 : 년/월 조회
 */
function search_article()
{

	$.ajax({
		type : "POST",
		url : "/common/getProblemArticleList.do",
		data:{
			section:section,
			book:$('#search_book').val(),
			volume:$('#search_volume').val(),
			group:$('#search_group').val()
		},
		success:function(data){
			var vHtml = "";
			vHtml += "<option value=''></option>";
			for(var i=0; i<data.length; i++){
				vHtml += "<option value='"+data[i].article+"'>"+data[i].article+"</option>";
			}
			$("#search_article").html(vHtml);
			$('#search_article').change(function(e){
				form_search();
			});	
			form_search();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function clear_question()
{
	$('#question_num').val("");
	CKEDITOR.instances.grammar_question.setData("");
	$("#div_question").html("");
}


function form_search()
{
	clear_question();
	$.ajax({
		type : "POST",
		url : "/exam/getExamGrammarList.do",
		data:{
			section:section,
			book:$('#search_book').val(),
			volume:$('#search_volume').val(),
			group:$('#search_group').val(),
			article:$('#search_article').val()
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++)
			{
				var question = cfmNvl1(data[i].question);
				question = question.replace(/(<([^>]+)>)/gi, "");
				vHtml += '<tr>';
				vHtml += '<td class="text-center">'+data[i].question_num+'</td>';
				vHtml += '<td>'+question+'</td>';
				vHtml += '<td class="text-center">';
				vHtml += cfmNvl1(data[i].answer);
				vHtml += '</td>';
				vHtml += "<td class='with-btn' nowrap=''>";
				vHtml += "	<button type='button' class='btn btn-sm btn-primary width-60 m-r-2' onclick='modify_form(\""+data[i].question_num+"\")'>수정</a>";
				if(i == (data.length-1))
				{
					vHtml += "	<button type='button' class='btn btn-sm btn-danger width-60 m-r-2' onclick='delete_form(\""+data[i].question_num+"\")'>삭제</a>";
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

function add_question()
{
	$.ajax({
		type : "POST",
		url : "/exam/insertExamGrammar.do",
		data:{
			section:section,
			book:$('#search_book').val(),
			volume:$('#search_volume').val(),
			group:$('#search_group').val(),
			article:$('#search_article').val()
		},
		success:function(data){
			form_search();
			//alert(data.id);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
	
}

function search_question(question_num)
{
	$.ajax({
		type : "POST",
		url : "/exam/getExamGrammar.do",
		data:{
			section:section,
			book:$('#search_book').val(),
			volume:$('#search_volume').val(),
			group:$('#search_group').val(),
			article:$('#search_article').val(),
			question_num:question_num
		},
		success:function(data){
			$('#question_num').val(question_num);
			
			CKEDITOR.instances.grammar_question.setData(cfmNvl1(data.question));

			
			
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
			
			$("#div_question").html(vHtml);
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
			$('#answer_'+answer.toLowerCase()).prop("checked", true);

			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function modify_form(question_num)
{
	search_question(question_num);
}

function delete_form(question_num){
	if(!confirm("삭제하시겠습니까?")) return;
	

	$.ajax({
		type : "POST",
		url : "/exam/deleteExamGrammar.do",
		data:{
			section:section,
			book:$('#search_book').val(),
			volume:$('#search_volume').val(),
			group:$('#search_group').val(),
			article:$('#search_article').val(),
			question_num:question_num
		},
		success:function(data){
			alert("삭제하였습니다.");
			form_search();
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function save_question()
{
	if(!$("#question_num").val()) return;
	
	var question_num = $("#question_num").val();
	var question = CKEDITOR.instances.grammar_question.getData();
	var choice_a = $("#choice_a").val();
	var choice_b = $("#choice_b").val();
	var choice_c = $("#choice_c").val();
	var choice_d = $("#choice_d").val();
	var choice_e = $("#choice_e").val();
	var choice_f = $("#choice_f").val();
	var choice_g = $("#choice_g").val();
	var choice_h = $("#choice_h").val();
	var choice_i = $("#choice_i").val();
	var score = "1";
	var answer = $('input[name="answer"]:checked').val();

	$.ajax({
		type : "POST",
		url : "/exam/updateExamGrammar.do",
		data:{
			section:section,
			book:$('#search_book').val(),
			volume:$('#search_volume').val(),
			group:$('#search_group').val(),
			article:$('#search_article').val(),
			question_num:question_num,
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
			answer:answer,
			score:score
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