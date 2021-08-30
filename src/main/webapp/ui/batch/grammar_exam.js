var select_num = 0;
var select_question_num = 0;
var a_arr=["A","B","C","D","E","F","G","H","I"];

/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	//CKEDITOR.replace( 'question' ); 
	create_choice();
	setTimeout(search_num, 1000);
});

/*
 * 설명 : 회차조회
 */
function search_num()
{
	$.ajax({
		type : "POST",
		url : "/batch/getBatchExamGrammarNumList.do",
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
					search_question_num();
				});
				search_question_num();
			}else{
				vHtml += "<option value=''>회차없음</option>";
				$("#search_num").html("<option value=''>회차없음</option>");
				$("#search_question_num").html("<option value=''>문제없음</option>");
			}
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

/*
 * 설명 : 문제조회
 */
function search_question_num()
{
	$.ajax({
		type : "POST",
		url : "/batch/getBatchExamGrammarQuestionList.do",
		data:{
			type:$("#search_type").val(),
			num:$("#search_num").val()
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				var selected = "";
				if(select_question_num == data[i].question_num) selected = "selected";
				vHtml += "<option value='"+data[i].question_num+"' "+selected+">"+data[i].question_num+"</option>";
			}
			$("#search_question_num").html(vHtml);

			$('#search_question_num').change(function(e){
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
		url : "/batch/getBatchExamGrammar.do",
		data:{
			type:$("#search_type").val(),
			num:$("#search_num").val(),
			question_num:$("#search_question_num").val()
		},
		success:function(data){
			create_choice();
			
			CKEDITOR.instances.question.setData(data.question);
			
			$("#choice_a").val(data.choice_a);
			$("#choice_b").val(data.choice_b);
			$("#choice_c").val(data.choice_c);
			$("#choice_d").val(data.choice_d);
			$("#choice_e").val(data.choice_e);
			$("#choice_f").val(data.choice_f);
			$("#choice_g").val(data.choice_g);
			$("#choice_h").val(data.choice_h);
			$("#choice_i").val(data.choice_i);
			
			if(data.answer)
			{
				$("#answer_"+data.answer.toLowerCase()).prop("checked", true);
			}

			if(data.score)
			{
				$("#score").val(data.score);
			}else{
				$("#score").val("1");
			}

		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function create_choice()
{
	var vHtml = "";
	vHtml += '<div class="table-responsive">';
	vHtml += '	<table class="table table-bordered m-b-0 table-td-valign-middle">';
	vHtml += '		<colgroup>';
	vHtml += '			<col style="width:5%;" />';
	vHtml += '			<col style="width:5%;" />';
	vHtml += '			<col style="width:90%;" />';
	vHtml += '		</colgroup>';								
	vHtml += '		<tbody>';
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
		vHtml += '				<td class="with-form-control">';
		vHtml += '					<input type="text" class="form-control" id="choice_'+a_arr[i].toLowerCase()+'" name="choice_'+a_arr[i].toLowerCase()+'">';
		vHtml += '				</td>';
		vHtml += '			</tr>';		
	}
	vHtml += '		</tbody>';
	vHtml += '	</table>';
	vHtml += '</div>';	
	
	$("#div_question").html(vHtml);

}

function create_num()
{
	$.ajax({
		type : "POST",
		url : "/batch/createBatchExamGrammarNum.do",
		data:{
			type:$("#search_type").val()
		},
		success:function(data){
			select_num = data.num;
			select_question_num = 0;
			
			search_num();

		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function create_question_num()
{
	if(!$("#search_num").val()) return;
	
	$.ajax({
		type : "POST",
		url : "/batch/createBatchExamGrammarQuestionNum.do",
		data:{
			type:$("#search_type").val(),
			num:$("#search_num").val()
		},
		success:function(data){
			select_question_num = data.question_num;

			search_question_num();

		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}


function form_submit()
{
	var flag = $("#flag").val();
	
	var type = $("#search_type").val();
	var num = $("#search_num").val();
	var question_num = $("#search_question_num").val();
	
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
	var answer = $('input[name="answer"]:checked').val();

	$.ajax({
		type : "POST",
		url : "/batch/updateBatchExamGrammar.do",
		data:{
			flag:flag,
			type:type,
			num:num,
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
			score:score,
			answer:answer
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