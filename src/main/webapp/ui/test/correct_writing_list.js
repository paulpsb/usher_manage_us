var page = 1;
var row_num = 20;
var course_id = 0;

/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	if($('#search_book').val()) $('#book').val($('#search_book').val());
	if($('#search_student_pen_yn').val()) $('#student_pen_yn').val($('#search_student_pen_yn').val());
	if($('#search_answer_rublic_yn').val()) $('#answer_rublic_yn').val($('#search_answer_rublic_yn').val());
	if($('#search_answer_pen_yn').val()) $('#answer_pen_yn').val($('#search_answer_pen_yn').val());
	//if($('#search_answer_spk_yn').val()) $('#answer_spk_yn').val($('#search_answer_spk_yn').val());
	if($('#search_page').val()) page = parseInt($('#search_page').val());
	
	search_semester();
	
	$('#book,#student_pen_yn,#answer_rublic_yn,#answer_pen_yn,#answer_spk_yn').change(function(e){
		form_search();
	});	
	form_search();
	
});

function form_search()
{
	search_list(1);
}

function search_list(vPage)
{
	page = vPage;
	$.ajax({
		type : "POST",
		url : "/test/getCorrectWritingList.do",
		data:{
			section:"WRITING",
			practice_type:"MOCK_TEST",
			book:$("#search_book").val(),
			student_pen_yn:$("#search_student_pen_yn").val(),
			answer_rublic_yn:$("#search_answer_rublic_yn").val(),
			answer_pen_yn:$("#search_answer_pen_yn").val(),
			course_id:course_id,
			page:vPage,
			row_num:row_num
		},
		success:function(data){
			var total_count = data.correctWritingCount.total_count;
			var total_page = Math.ceil(total_count/row_num);
			
			var correctWritingList = data.correctWritingList;
			var vocaSpeechList = data.vocaSpeechList;
			
			var vHtml = "";
			for(var i=0; i<correctWritingList.length; i++){
				var v_book = "독립형";
				if(correctWritingList[i].book == "integrated") v_book = "통합형";
				vHtml += "<tr>";
				vHtml += "<td class='text-center'>"+v_book+"</td>";
				vHtml += "<td class='text-center'>"+correctWritingList[i].article+"</td>";
				vHtml += "<td>";
				vHtml += "<a href='javascript:open_writing("+correctWritingList[i].id+")'>";
				vHtml += correctWritingList[i].question;
				vHtml += "</a>";
				vHtml += "</td>";
				vHtml += "<td class='text-center'>"+correctWritingList[i].student_name+"</td>";
				vHtml += "<td class='text-center'>"+correctWritingList[i].date+"</td>";
				vHtml += "<td class='text-center'>"+correctWritingList[i].student_pen_yn+"</td>";
				vHtml += "<td class='text-center'>"+correctWritingList[i].answer_rublic_yn+"</td>";
				vHtml += "<td class='text-center'>"+correctWritingList[i].answer_pen_yn+"</td>";
				vHtml += "<td class='text-center'>"+correctWritingList[i].student_note_yn+"</td>";
				vHtml += "</tr>";
			}
			
			$("#dataList").html(vHtml);
			
			vHtml = cfmPage(10, vPage, total_page, "search_list");
			$("#pageList").html(vHtml);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function open_writing(practice_result_id){
	window.open("/test/correct/correct_writing.do?id="+practice_result_id, "writing");
	
}

/*
 * 설명 : 년/월 조회
 */
function search_semester()
{

	$.ajax({
		type : "POST",
		url : "/common/getSemesterList.do",
		data:{
		},
		success:function(data){
			var vHtml = "";
			var to_month = cfmGetToMonth();

			for(var i=0; i<data.length; i++){
				var selected = "";
				if(to_month == data[i].date) selected = "selected";
				vHtml += "<option value='"+data[i].id+"' "+selected+">"+data[i].date+"</option>";
			}
			$("#search_semester_id").html(vHtml);
			
			$('#search_semester_id').change(function(e){
				search_course_group();
			});
			
			$('#search_test_type').change(function(e){
				search_course_group();
			});
			
			search_course_group();

		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}


function search_course_group()
{
	$.ajax({
		type : "POST",
		url : "/common/getCourseAllList.do",
		data:{
			semester_id:$("#search_semester_id").val()
		},
		success:function(data){
			var vHtml = "";
			var coursegroupList = data.coursegroupList;
			courseList = data.courseList;
			for(var i=0; i<coursegroupList.length; i++)
			{
				var courseGorupId = coursegroupList[i].id;
				vHtml += '<div class="form-group row m-b-15">';
				vHtml += '	<div class="col-9">';
				vHtml += '		<h5>'+coursegroupList[i].name+'<h5>';
				vHtml += '	</div>';
				vHtml += '</div>';
				vHtml += '<div class="form-group row m-b-15">';
				
				var arr_course = courseList.filter(function(item, index){
					if(item.course_group_id == courseGorupId){
						return true;
					}
				});
				for(var j=0; j<arr_course.length; j++)
				{
					var vTitle = coursegroupList[i].name+' '+arr_course[j].name+'반';
					vHtml += '	<div class="col-2 text-center">';
					vHtml += '		<a href="javascript:form_sitemap_select(\''+vTitle+'\','+arr_course[j].id+')"><h5>'+arr_course[j].name+'반</h5></a>';
					vHtml += '	</div>';
				}
				vHtml += '</div>';
				$("#site_map").html(vHtml);
			}
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

function showCourses()
{
	$('#select_courses').modal(); 
}

function form_sitemap_select(v_title, v_course_id)
{
	course_id = v_course_id;
	$("#select_course_name").html(v_title);
	$('#select_courses').modal("hide"); 
	
	form_search(0);
}

function form_course_cancel()
{
	$('#select_courses').modal("hide"); 
}
function form_all_select()
{
	course_id = 0;
	$("#select_course_name").html("전체");
	$('#select_courses').modal("hide"); 
	
	form_search(0);
}
