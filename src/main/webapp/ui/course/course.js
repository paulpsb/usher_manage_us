var sectionList = [
	"VOCA",
	"GRAMMAR",
	"READING",
	"LISTENING",
	"WRITING",
	"SPEAKING"
]
/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	$("#search_auth_username").keydown(function(key) {
		if (key.keyCode == 13) {
			auth_search();
		}
	});
	
	if($("#input_test_type").val()){
		$("#search_test_type").val($("#input_test_type").val());
		$("#input_test_type").val("");
	}
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
				if($("#input_semester_id").val() > 0)
				{
					if(data[i].id == $("#input_semester_id").val()){
						selected = "selected";
					}
				}else{
					if(to_month == data[i].date) selected = "selected";
				}
				vHtml += "<option value='"+data[i].id+"' "+selected+">"+data[i].date+"</option>";
			}
			
			$("#search_semester_id").html(vHtml);
			
			$("#input_semester_id").val("");
			
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
		url : "/common/getCoursegroupList.do",
		data:{
			semester_id:$("#search_semester_id").val(),
			test_type:$("#search_test_type").val()
		},
		success:function(data){
			var vHtml = "";
			
			for(var i=0; i<data.length; i++){
				var selected = "";
				if(data[i].id == $("#input_course_group_id").val()){
					selected = "selected";
				}
				vHtml += "<option value='"+data[i].id+"' "+selected+">"+data[i].name+"</option>";
			}
			
			if(data.length == 0){
				vHtml = "<option value=''>반 그룹</option>";
			}
			
			$("#search_course_group_id").html(vHtml);
			
			$('#search_course_group_id').change(function(e){
				search_course();
			});
			
			search_course();

		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});			
}

/*
 * 설명 : 반 조회.
 */
function search_course()
{
	if(!$("#search_course_group_id").val()){
		$("#courseList").html("");
		return;
	}
	$.ajax({
		type : "POST",
		url : "/common/getCourseList.do",
		data:{
			course_group_id:$("#search_course_group_id").val()
		},
		success:function(data){
			
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				var course_section = "";
				for(var j=0; j<sectionList.length; j++)
				{
					var section_id = "is_"+sectionList[j].toLowerCase();
					if(data[i][section_id]){
						course_section = sectionList[j];
					}
				}
				var rate = data[i].difficulty / 5 * 100;
				vHtml += "<tr>";
				vHtml += "<td>"+data[i].name+"</td>";
//				vHtml += "<td>"+data[i].difficulty+"</td>";
				vHtml += "<td>";
				vHtml += "<div class='progress rounded-corner'>";
				vHtml += "  <div class='progress-bar' style='width: "+rate+"%'>"+data[i].difficulty+"</div>";
				vHtml += "</div>";
				vHtml += "</td>";
				vHtml += "<td>"+data[i].building_name+"</td>";
				vHtml += "<td>"+data[i].room_no+"</td>";
				vHtml += "<td>"+data[i].open+"</td>";
				vHtml += "<td>"+cfmNvl1(data[i].zoom_url)+"</td>";
				vHtml += "<td>"+cfmNvl1(data[i].zoom_ot_url)+"</td>";
				vHtml += "<td>VOCA ~ "+course_section+"</td>";
				vHtml += "<td>"+data[i].instructor_name+"</td>";
				vHtml += "<td>"+data[i].manager_name+"</td>";
				vHtml += "<td class='with-btn' nowrap>";
				//vHtml += "	<a href='/course/course.do?semester_id="+data[i].semester_id+"&&test_type="+data[i].test_type+"&&course_group_id="+data[i].id+"' class='btn btn-sm btn-primary width-60 m-r-2'>반 이동</a>";
				vHtml += "	<a href='javascript:change_room(\""+data[i].id+"\")' class='btn btn-sm btn-primary m-r-2'>강의실 등록</a>";
				vHtml += "	<a href='javascript:change_zoom_url(\""+data[i].id+"\",\""+cfmNvl1(data[i].zoom_url)+"\",\""+cfmNvl1(data[i].zoom_ot_url)+"\")' class='btn btn-sm btn-primary m-r-2'>첨강 URL 등록</a>";
				vHtml += "	<a href='javascript:change_section(\""+data[i].id+"\")' class='btn btn-sm btn-primary m-r-2'>집중과목 등록</a>";
				vHtml += "	<a href='javascript:change_instructor(\""+data[i].id+"\")' class='btn btn-sm btn-primary m-r-2'>강사 등록</a>";
				vHtml += "	<a href='javascript:change_manager(\""+data[i].id+"\")' class='btn btn-sm btn-primary m-r-2'>매니저 등록</a>";
				vHtml += "</td>";
				vHtml += "</tr>";
			}
			$("#courseList").html(vHtml);
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

var course_id;
var change_type;

function change_room(v_idx)
{
	course_id = v_idx;
	$.ajax({
		type : "POST",
		url : "/course/getCourse.do",
		data:{
			id:v_idx
		},
		success:function(data){
			var v_building_name = data.building_name;
			var v_room_no = data.room_no;
			var v_chamgang_building_name = data.chamgang_building_name;
			var v_chamgang_room_no = data.chamgang_room_no;
			
			if(v_building_name){
				$("#building_name").val(v_building_name);
			}
			if(v_room_no){
				$("#room_no").val(v_room_no);
			}else{
				$("#room_no").val("");
			}
			
			if(v_chamgang_building_name){
				$("#chamgang_building_name").val(v_chamgang_building_name);
			}
			if(v_chamgang_room_no){
				$("#chamgang_room_no").val(v_chamgang_room_no);
			}else{
				$("#chamgang_room_no").val("");
			}
			
			$("#modal-room").modal();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

function save_room()
{
	$.ajax({
		type : "POST",
		url : "/course/updateCourseRoom.do",
		data:{
			course_id:course_id,
			building_name:$("#building_name").val(),
			room_no:$("#room_no").val(),
			chamgang_building_name:$("#chamgang_building_name").val(),
			chamgang_room_no:$("#chamgang_room_no").val()
			
		},
		success:function(data){
			alert("저장하였습니다.");
			$("#modal-room").modal("hide");
			search_course();
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}
function change_zoom_url(idx, zoom_url, zoom_ot_url)
{
	$("#course_id").val(idx);
	$("#zoom_url").val(zoom_url);
	$("#zoom_ot_url").val(zoom_ot_url);
	$("#modal-course-zoom").modal();
}

function change_section(idx)
{
	$("#course_id").val(idx);
	$.ajax({
		type : "POST",
		url : "/course/getCourse.do",
		data:{
			id:idx
		},
		success:function(data){
			
			var vHtml = "";
			for(var i=0; i<sectionList.length; i++)
			{
				var section_id = "is_"+sectionList[i].toLowerCase();
				var actice = "";
				var value = "0";
				if(data[section_id]){
					actice = "yellow";
					value = "1";
				}
				
				vHtml += '<li id="course_'+section_id+'" class="is_section '+actice+'" style="cursor:pointer;">';
				vHtml += sectionList[i];
				vHtml += '<input type="hidden" id="'+section_id+'" value="'+value+'">';
				vHtml += '<input type="hidden" name="section_id" value="'+sectionList[i]+'">';
				vHtml += '</li>';
			}
			$("#progressbar_section").html(vHtml);
			
			$(".is_section").click(function(){
				var section = $(this).find("input[name=section_id]").val();
				var t_idx = sectionList.indexOf(section);
				//우선 모두 active를 날려버린다.
				for(var i=0; i<sectionList.length; i++)
				{
					var section_id = "is_"+sectionList[i].toLowerCase();
					$("#course_"+section_id).removeClass("yellow");
					
					$("#"+section_id).val("0");
				}
				
				for(var i=0; i<=t_idx; i++)
				{
					var section_id = "is_"+sectionList[i].toLowerCase();
					$("#course_"+section_id).addClass("yellow");
					
					$("#"+section_id).val("1");
				}
			});
			
			$("#modal-course-section").modal();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}
function save_section()
{
	var objData = Object();
	objData.course_id = $("#course_id").val();
	//우선 모두 active를 날려버린다.
	for(var i=0; i<sectionList.length; i++)
	{
		var section_id = "is_"+sectionList[i].toLowerCase();
		
		if($("#"+section_id).val() == "1"){
			objData[section_id] = true;
		}else{
			objData[section_id] = false;
		}
	}
	
	$.ajax({
		type : "POST",
		url : "/course/updateCourseSection.do",
		data:objData,
		success:function(data){
			alert("저장하였습니다.");
			$("#modal-course-section").modal("hide");
			search_course();
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}
function save_course_zoom()
{
	if(!$("#zoom_url").val()){
		alert("참강 URL을 입력하세요.");
		return;
	}
	if(!$("#zoom_ot_url").val()){
		alert("OT URL을 입력하세요.");
		return;
	}
	$.ajax({
		type : "POST",
		url : "/course/updateCourseZommUrl.do",
		data:{
			id:$("#course_id").val(),
			zoom_url:$("#zoom_url").val(),
			zoom_ot_url:$("#zoom_ot_url").val()
		},
		success:function(data){
			alert("저장하였습니다.");
			$("#modal-course-zoom").modal("hide");
			search_course();
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}


function change_instructor(v_id)
{
	course_id = v_id;
	change_type = "instructor";
	show_auth();
}

function change_manager(v_id)
{
	course_id = v_id;
	change_type = "manager";
	show_auth();
}

function show_auth()
{
	$("#authList").html("");
	$("#search_auth_username").val("");
	$("#modal-auth").modal();
}

function auth_search()
{
	var v_username = $("#search_auth_username").val();
	if(!v_username || v_username.length < 2){
		alert("검색어는 2글자 이상 입력하세요.");
		return;
	}
	
	$.ajax({
		type : "POST",
		url : "/common/getUserSearchEmployeeList.do",
		data:{
			username:v_username
		},
		success:function(data){
			var vHtml = "";
			if(data.length > 0){
				for(var i=0; i<data.length; i++)
				{
					vHtml += "<tr>";
					vHtml += "<td class='text-center'>"+data[i].username+"</td>";
					vHtml += "<td class='text-center'>"+data[i].last_name+data[i].first_name+"</td>";
					vHtml += "<td class='with-btn text-center' nowrap=''>";
					vHtml += "	<a href='javascript:select_user("+data[i].user_id+")' class='btn btn-sm btn-primary m-r-2'>선택</a>";
					vHtml += "</td>";
					vHtml += "</tr>";
				}
			}else{
				vHtml += "<tr><td class='text-center' colspan='3'>조회된 자료가 없습니다.</td></tr>";
			}
			$("#authList").html(vHtml);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

function select_user(v_user_id)
{
	var v_url = "/course/updateCourseInstructor.do";
	if(change_type == "manager")
	{
		v_url = "/course/updateCourseManager.do";
	}
	$.ajax({
		type : "POST",
		url : v_url,
		data:{
			course_id:course_id,
			instructor_id:v_user_id,
			manager_id:v_user_id
		},
		success:function(data){
			alert("선택하였습니다.");
			$("#modal-auth").modal("hide");
			search_course();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}