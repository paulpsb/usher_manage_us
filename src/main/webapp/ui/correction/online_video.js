var section = "";
var book    = "";
var volume  = "";
var group  = "";
var practice_problem_id = "";

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
				if(data[i].section == section) selected = "selected";
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
	practice_problem_id = "";
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
			volume:volume1
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
				vHtml += "<td class='with-btn' nowrap=''>";
				vHtml += "	<button type='button' class='btn btn-sm btn-primary width-60 m-r-2' onclick='form_detail("+data[i].id+")'>보기</a>";
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

var array_delete = Array();
function form_detail(v_id)
{
	array_delete = Array();
	practice_problem_id = v_id;
	
	$.ajax({
		type : "POST",
		url : "/correction/getCorrectionOnlineVideoList.do",
		data:{
			practice_problem_id:practice_problem_id
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				vHtml += "<tr>";
				vHtml += "	<td class='with-form-control'>";
				vHtml += "		<input type='hidden' name='online_video_flag' value='U'> ";
				vHtml += "		<input type='hidden' name='online_video_id' value='"+data[i].id+"'> ";
				vHtml += "		<input type='hidden' name='practice_problem_id' value='"+practice_problem_id+"'> ";
				vHtml += "		<input type='text' class='form-control' name='online_lesson_title' value='"+data[i].online_lesson_title+"'> ";
				vHtml += "	</td>";
				vHtml += "	<td class='with-form-control'>";
				vHtml += "		<input type='text' class='form-control' name='online_lesson_video' value='"+data[i].online_lesson_video+"'> ";
				vHtml += "	</td>";
				vHtml += "	<td class='with-form-control'>";
				vHtml += "		<input type='text' class='form-control' name='online_lesson_time' value='"+data[i].online_lesson_time+"'> ";
				vHtml += "	</td>";
				vHtml += "	<td class='with-form-control'>";
				vHtml += "		<input type='text' class='form-control' name='online_lesson_sort' value='"+data[i].online_lesson_sort+"'> ";
				vHtml += "	</td>";
				vHtml += "<td class='with-btn' nowrap=''>";
				vHtml += "	<button type='button' class='btn btn-sm btn-danger width-60 m-r-2' onclick='form_delete(this)'>삭제</button>";
				vHtml += "</td>";
				vHtml += "</tr>";
				
			}
			$("#videoList").html(vHtml);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function form_add()
{
	if(!practice_problem_id) return;
	var vHtml = "";
	vHtml += "<tr>";
	vHtml += "	<td class='with-form-control'>";
	vHtml += "		<input type='hidden' name='online_video_flag' value='I'> ";
	vHtml += "		<input type='hidden' name='online_video_id' value='0'> ";
	vHtml += "		<input type='hidden' name='practice_problem_id' value='"+practice_problem_id+"'> ";
	vHtml += "		<input type='text' class='form-control' name='online_lesson_title' value=''> ";
	vHtml += "	</td>";
	vHtml += "	<td class='with-form-control'>";
	vHtml += "		<input type='text' class='form-control' name='online_lesson_video' value=''> ";
	vHtml += "	</td>";
	vHtml += "	<td class='with-form-control'>";
	vHtml += "		<input type='text' class='form-control' name='online_lesson_time' value=''> ";
	vHtml += "	</td>";
	vHtml += "	<td class='with-form-control'>";
	vHtml += "		<input type='text' class='form-control' name='online_lesson_sort' value=''> ";
	vHtml += "	</td>";
	vHtml += "<td class='with-btn' nowrap=''>";
	vHtml += "	<button type='button' class='btn btn-sm btn-danger width-60 m-r-2' onclick='form_delete(this)'>삭제</button>";
	vHtml += "</td>";
	vHtml += "</tr>";
	
	$("#videoList").append(vHtml);
}

function form_delete(obj)
{
	var online_video_flag   = $(obj).closest("tr").find("input[name='online_video_flag']").val();
	var online_video_id     = $(obj).closest("tr").find("input[name='online_video_id']").val();
	var practice_problem_id = $(obj).closest("tr").find("input[name='practice_problem_id']").val();
	var online_lesson_title = $(obj).closest("tr").find("input[name='online_lesson_title']").val();
	var online_lesson_video = $(obj).closest("tr").find("input[name='online_lesson_video']").val();
	var online_lesson_time  = $(obj).closest("tr").find("input[name='online_lesson_time']").val();
	var online_lesson_sort  = $(obj).closest("tr").find("input[name='online_lesson_sort']").val();
	
	if(online_video_flag == "U"){
		var objData = Object();
		objData.online_video_flag   = 'D';
		objData.online_video_id     = online_video_id;
		objData.practice_problem_id = practice_problem_id;
		objData.online_lesson_title = online_lesson_title;
		objData.online_lesson_video = online_lesson_video;
		objData.online_lesson_time  = online_lesson_time;
		objData.online_lesson_sort  = online_lesson_sort;
		
		array_delete.push(objData);
	}
	
	$(obj).closest("tr").remove();
}

function form_save()
{
	var $_online_video_flag   = $("input[name='online_video_flag']");
	var $_online_video_id     = $("input[name='online_video_id']");
	var $_practice_problem_id = $("input[name='practice_problem_id']");
	var $_online_lesson_title = $("input[name='online_lesson_title']");
	var $_online_lesson_video = $("input[name='online_lesson_video']");
	var $_online_lesson_time  = $("input[name='online_lesson_time']");
	var $_online_lesson_sort  = $("input[name='online_lesson_sort']");

	var array_data = Array();
	
	for(var i=0; i<array_delete.length; i++){
		array_data.push(array_delete[i]);
	}
	
	$_online_video_flag.each(function(index) {
		var online_video_flag     = $(this).val();
		var online_video_id       = $_online_video_id.eq(index).val();
		var practice_problem_id   = $_practice_problem_id.eq(index).val();
		var online_lesson_title   = $_online_lesson_title.eq(index).val();
		var online_lesson_video   = $_online_lesson_video.eq(index).val();
		var online_lesson_time    = $_online_lesson_time.eq(index).val();
		var online_lesson_sort    = $_online_lesson_sort.eq(index).val();
		
		var objData = Object();
		objData.online_video_flag    = online_video_flag;
		objData.online_video_id      = online_video_id;
		objData.practice_problem_id  = practice_problem_id;
		objData.online_lesson_title  = online_lesson_title;
		objData.online_lesson_video  = online_lesson_video;
		objData.online_lesson_time   = online_lesson_time;
		objData.online_lesson_sort   = online_lesson_sort;
		array_data.push(objData);
    });

	
	var data_value = JSON.stringify(array_data);
	
	$.ajax({
		type : "POST",
		url : "/correction/saveCorrectionOnlineVideo.do",
		data:{
			data_value:data_value
		},
		success:function(data){
			form_detail(practice_problem_id);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}