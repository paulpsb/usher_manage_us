/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	search_semester();
});

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
			
			
			search_course_group();

		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function search_course_group()
{
	var vText = $("#search_semester_id option:selected").text();
	$("#tableTitle").html(vText+" 반 그룹");
	$.ajax({
		type : "POST",
		url : "/common/getCoursegroupList.do",
		data:{
			semester_id:$("#search_semester_id").val()
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				vHtml += "<tr>";
				vHtml += "<td>"+data[i].name+"</td>";
				vHtml += "<td class='text-center'>"+data[i].test_type+"</td>";
				vHtml += "<td class='text-center'>"+data[i].student_type+"</td>";
				vHtml += "<td class='text-center'>"+data[i].lecture_type+"</td>";
				vHtml += "<td class='text-center'>";
				vHtml += cfmNvl1(data[i].repetition_date)+"<br>";
				vHtml += "	<a href='javascript:do_repetition_date("+data[i].id+",\""+cfmNvl1(data[i].repetition_date)+"\")'  class='btn btn-sm btn-primary m-r-2'>재수강 일자변경</a>";
				vHtml += "</td>";
				vHtml += "<td>"+data[i].schedule+"</td>";
				vHtml += "<td class='with-btn text-center' nowrap>";
				vHtml += "	<a href='/course/course.do?semester_id="+data[i].semester_id+"&&test_type="+data[i].test_type+"&&course_group_id="+data[i].id+"' class='btn btn-sm btn-primary width-60 m-r-2'>반 이동</a>";
				vHtml += "</td>";
				vHtml += "</tr>";
			}
			$("#courseGroupList").html(vHtml);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

var course_group_id;
function do_repetition_date(v_course_group_id, v_repetition_date)
{
	course_group_id = v_course_group_id;
	$("#repetition_date").val(v_repetition_date);
	
	$("#modal-repetition-date").modal();
}

function save_repetition_date()
{
	$.ajax({
		type : "POST",
		url : "/course/updateCourseGroupRepetitionDate.do",
		data:{
			id:course_group_id,
			repetition_date:$("#repetition_date").val()
		},
		success:function(data){
			alert("변경하였습니다.");
			search_course_group();
			
			$("#modal-repetition-date").modal("hide");

		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}