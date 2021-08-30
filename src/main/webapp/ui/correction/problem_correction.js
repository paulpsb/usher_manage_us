/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	$('#search_section').change(function(e){
		search_book();
	});	
	
	$('#search_volume').change(function(e){
		form_search();
	});	
	
	$('#search_book').change(function(e){
		search_volume();
	});
	
	$('#search_correction_yn').change(function(e){
		form_search();
	});	
	
	search_section();
});

/*
 * 설명 : 년/월 조회
 */
function search_section()
{

	$.ajax({
		type : "POST",
		url : "/common/getPracticeSectionList.do",
		data:{
			
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				vHtml += "<option value='"+data[i].id+"'>"+data[i].section+"</option>";
			}
			
			$("#search_section").html(vHtml);
			search_book();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}




/*
 * 설명 : 년/월 조회
 */
function search_book()
{

	$.ajax({
		type : "POST",
		url : "/common/getPracticeBookList.do",
		data:{
			practice_section_id:$("#search_section").val()
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				var selected = "";
				vHtml += "<option value='"+data[i].id+"'>"+data[i].book+"</option>";
			}
			
			$("#search_book").html(vHtml);
			
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
		url : "/common/getPracticeVolumeList.do",
		data:{
			practice_section_id:$("#search_section").val(),
			practice_book_id:$("#search_book").val()
		},
		success:function(data){
			sectionList = data;
			var vHtml = "<option value='0'>볼륨</option>";
			for(var i=0; i<data.length; i++){
				vHtml += "<option value='"+data[i].id+"'>"+data[i].volume+"</option>";
			}
			
			$("#search_volume").html(vHtml);
			form_search();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}



function form_search()
{
	var section1 = "";
	var book1    = "";
	var volume1  = "";
	
	if($('#search_section').val() != "0")
	{
		section1 = $("#search_section option:checked").text();
	}

	if($('#search_book').val() != "0")
	{
		book1 = $("#search_book option:checked").text();
	}
	
	if($('#search_volume').val() != "0")
	{
		volume1 = $("#search_volume option:checked").text();
	}
	
	$.ajax({
		type : "POST",
		url : "/subject/getProblemList.do",
		data:{
			section:section1,
			book:book1,
			volume:volume1,
			correction_yn:$('#search_correction_yn').val()
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				vHtml += "<tr>";
				vHtml += "<td>"+data[i].section+"</td>";
				vHtml += "<td>"+data[i].book+"</td>";
				vHtml += "<td>"+data[i].volume+"</td>";
				vHtml += "<td>"+data[i].group+"</td>";
				vHtml += "<td>"+data[i].article+"</td>";
				vHtml += "<td>"+data[i].short_title+"</td>";
				var checked = "";
				if(data[i].correction_yn == "Y") checked = "checked";
				vHtml += '		<td class="text-center">';
				vHtml += '			<input type="hidden" name="practice_problem_id" value="'+data[i].id+'">';
				vHtml += '			<div class="switcher">';
				vHtml += '				<input type="checkbox" name="correction_yn" id="correction_yn_'+i+'" value="1" '+checked+'>';
				vHtml += '				<label for="correction_yn_'+i+'"></label>';
				vHtml += '			</div>';
				vHtml += '		</td>';

				vHtml += "</tr>";
			}
			$("#dataList").html(vHtml);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function save_form()
{
	var $_practice_problem_id  = $("input[name=practice_problem_id]");
	var $_correction_yn        = $("input[name=correction_yn]");
	
	var data_list = Array();
	
	$_practice_problem_id.each(function(index) {
		var practice_problem_id      = $(this).val();
		var correction_yn            = 'N';
		if($_correction_yn.eq(index).is(":checked"))
		{
			correction_yn = 'Y';
		}
		var objData = Object();
		objData.practice_problem_id = practice_problem_id;
		objData.correction_yn       = correction_yn;
		data_list.push(objData);
		
	});
	
	var data_value = JSON.stringify(data_list);

	$.ajax({
		type : "POST",
		url : "/correction/saveProblemCorrection.do",
		data:{
			data_value:data_value
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