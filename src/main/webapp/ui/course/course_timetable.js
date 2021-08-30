var course_group_list;
var course_group_id;
var course_list;
var array_etc = [
	{ study_type:"LUNCH", study_name:"점심시간" },
	{ study_type:"DINNER", study_name:"저녁시간" },
	{ study_type:"INDEPENDENT", study_name:"의무자습" }
] 

var sectionList = [
	"ETC",
	"VOCA",
	"GRAMMAR",
	"READING",
	"LISTENING",
	"WRITING",
	"SPEAKING"
];

var practice_section_color = {
		VOCA:{color:"bg-red-darker"},
		GRAMMAR:{color:"bg-green-darker"},
		READING:{color:"bg-purple-darker"},
		LISTENING:{color:"bg-orange-darker"},
		WRITING:{color:"bg-aqua-darker"},
		SPEAKING:{color:"bg-blue-darker"},
		ETC:{color:"bg-grey-darker"}
	};
/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	search_semester();
	$('#search_study_type').change(function(e){
		search_user();
	});
	
	$('#search_group_id').change(function(e){
		search_user();
	});
	
	$('#search_type').change(function(e){
		if($('#search_type').val()== "all"){
			$("#div_schedule").hide();
		}else{
			$("#div_schedule").show();
		}
		search_course();
	});
	
	$('#search_schedule').change(function(e){
		search_course();
	});

	$('#search_semester_id').change(function(e){
		search_course_group();
	});
	
	$('#search_test_type').change(function(e){
		search_course_group();
	});

	$('#search_course_group_id').change(function(e){
		if($("#search_course_group_id").val()){
			var arr_course_group = $("#search_course_group_id").val().split(",");
			var v_course_group_id = arr_course_group[0];
			var q_idx = course_group_list.findIndex(t => t.id == v_course_group_id);
			var arr_schedule = course_group_list[q_idx].schedule.split(",");
			var sHtml = "";
			for(var i=0; i<arr_schedule.length; i++)
			{
				sHtml += '<option value="'+arr_schedule[i]+'">'+arr_schedule[i]+'</option>';
			}
			$("#search_schedule").html(sHtml);
			
			search_group_timetable();
		}else{
			$("#search_course_id").html("<option>반</option>");				
		}
	});	
	search_user();
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
			

			
			search_course_group();

		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

/*
 * 설명 : 반 그룹 조회
 */
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
			course_group_list = data;
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				vHtml += "<option value='"+data[i].id+","+data[i].student_type+","+data[i].lecture_type+"'>"+data[i].name+"</option>";
			}
			
			if(data.length == 0){
				vHtml = "<option value=''>반 그룹</option>";
			}
			
			$("#search_course_group_id").html(vHtml);
			

			
			if(data.length > 0){
				var arr_course_group = $("#search_course_group_id").val().split(",");
				var v_course_group_id = arr_course_group[0];
				var q_idx = course_group_list.findIndex(t => t.id == v_course_group_id);
				var arr_schedule = course_group_list[q_idx].schedule.split(",");
				var sHtml = "";
				for(var i=0; i<arr_schedule.length; i++)
				{
					sHtml += '<option value="'+arr_schedule[i]+'">'+arr_schedule[i]+'</option>';
				}
				$("#search_schedule").html(sHtml);
				
				search_group_timetable();
			}else{
				$("#search_course_id").html("<option>반</option>");		
			}

		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

var course_group_timetable;
function search_group_timetable()
{
	var v_group = $("#search_course_group_id").val();
	var student_type = "";
	var lecture_type = "";
	if(v_group)
	{
		var arr_course_group = v_group.split(",");
		student_type = arr_course_group[1];
		lecture_type = arr_course_group[2];
	}
	
	$.ajax({
		type : "POST",
		url : "/common/getBaseCoursegroupTimescheduleList.do",
		data:{
			test_type:$("#search_test_type").val(),
			student_type:student_type,
			lecture_type,lecture_type
		},
		success:function(data){
			course_group_timetable = data;
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
	var v_group = $("#search_course_group_id").val();
	course_group_id = "";
	var student_type = "";
	var lecture_type = "";
	if(v_group)
	{
		var arr_course_group = v_group.split(",");
		course_group_id = arr_course_group[0];
		student_type = arr_course_group[1];
		lecture_type = arr_course_group[2];
	}
	
	$.ajax({
		type : "POST",
		url : "/common/getCourseList.do",
		data:{
			course_group_id:course_group_id
		},
		success:function(data){
			course_list = data;
			var nCourseCnt = data.length;
			var vHtml = '';
			vHtml += '<colgroup>';
			vHtml += '<col style="width:15%;" />';
			for(var i=0; i<nCourseCnt; i++)
			{
				vHtml += '<col style="width:calc(85%/'+nCourseCnt+');" />';
			}
			vHtml += '</colgroup>';
			vHtml += '<thead>';
			vHtml += '<tr>';
			vHtml += '<th class="text-center bg-black-transparent-5 text-white">시간표</th>';
			for(var i=0; i<nCourseCnt; i++)
			{
				vHtml += '<th class="text-center bg-black-transparent-5 text-white">'+data[i].name+'</th>';
			}
			vHtml += '</tr>';
			vHtml += '</thead>';
			vHtml += '<tbody>';
			for(var i=0; i<course_group_timetable.length; i++)
			{

				var sHour = course_group_timetable[i].start_time;
				var eHour = course_group_timetable[i].end_time;
				var sTime = sHour+" ~ "+eHour;
				
				vHtml += '<tr  class="height-40">';
				vHtml += '<th class="text-center bg-black-transparent-5 text-white" >'+sTime+'</th>';
				for(var j=0; j<nCourseCnt; j++)
				{
					vHtml += '<td class="droppable text-center" id="'+data[j].id+'_'+sHour.replace(":","")+'">';
					vHtml += '<input type="hidden" name="section" value="">';
					vHtml += '<input type="hidden" name="study_type" value="">';
					vHtml += '<input type="hidden" name="class_hour" value="'+sHour+'">';
					vHtml += '<input type="hidden" name="user_id" value="">';
					vHtml += '<input type="hidden" name="course_id" value="'+data[j].id+'">';
					vHtml += '</td>';
				}
				vHtml += '</tr>';
			}
			if($("#search_type").val() == "all"){
				vHtml += '<tr  class="height-40">';
				vHtml += '<th class="text-center bg-black-transparent-5 text-white" >교재</th>';
				for(var j=0; j<nCourseCnt; j++)
				{
					vHtml += '<td class="text-center">';
					vHtml += '	<button type="button" class="btn btn-sm btn-primary form-control" onclick="open_book('+data[j].id+')">교재 등록</button>';
					vHtml += '	<div id="div_book_'+data[j].id+'">';
					vHtml += '	</div>';
					vHtml += '</td>';
				}
				vHtml += '</tr>';
			}
			vHtml += '</tbody>';
			$("#timeTableList").html(vHtml);
			
			
			
			$(".droppable").droppable({
				drop: function (event, ui) {
					var section       = ui.draggable.find("input[name=search_section]").val();
					var section_short = ui.draggable.find("input[name=search_section_short]").val();
					var search_class  = ui.draggable.find("input[name=search_class]").val();
					var study_type    = ui.draggable.find("input[name=search_study_type]").val();
					var study_name    = ui.draggable.find("input[name=search_study_name]").val();
					var user_id       = ui.draggable.find("input[name=search_user_id]").val();
					var user_name     = ui.draggable.find("input[name=search_user_name]").val();
					var vHtml = "";
					
					$(this).find("input[name=section]").val(section);
					$(this).find("input[name=study_type]").val(study_type);
					$(this).find("input[name=user_id]").val(user_id);

					$(this).find(".section-drop").remove();
					
					vHtml += '<div class="section-drop '+search_class+' text-white">';
					if(section_short) vHtml += section_short + " ";
					if(study_name) vHtml += study_name;
					if(user_name) vHtml += " " + user_name;
					vHtml += '</div>';
					$(this).append(vHtml);
				}
			});
			
			$(".droppable").dblclick(function(){
				$(this).find("input[name=section]").val("");
				$(this).find("input[name=study_type]").val("");
				$(this).find("input[name=user_id]").val("");
				$(this).find(".section-drop").remove();
			});
			
			search_timetable();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

/*
 * 설명 : 반 조회.
 */
function search_timetable()
{
	var url = "/course/getCourseGroupTimeTableList.do";
	if($("#search_type").val() == "day"){
		url = "/course/getCourseGroupTimeTableDailyList.do";
	}
	$.ajax({
		type : "POST",
		url : url,
		data:{
			course_group_id:course_group_id,
			date:$("#search_schedule").val()
		},
		success:function(data){
			for(var i=0; i<data.length; i++)
			{
				var td_id = data[i].course_id+"_"+data[i].class_hour.replace(":","");
				var search_class = "";
				var search_section_short = "";
				var search_study_name = "";
				if(data[i].study_type == "CLASS"){
					search_study_name = "수업";
				}else{
					search_study_name = "스터디";
				}
				if(data[i].section == "VOCA"){
					search_section_short = "VC ";
					search_class = "bg-red-darker";
				}else if(data[i].section == "GRAMMAR"){
					search_section_short = "GR ";
					search_class = "bg-green-darker";
				}else if(data[i].section == "READING"){
					search_section_short = "RC ";
					search_class = "bg-purple-darker";
				}else if(data[i].section == "LISTENING"){
					search_section_short = "LC ";
					search_class = "bg-orange-darker";
				}else if(data[i].section == "WRITING"){
					search_section_short = "WR ";
					search_class = "bg-aqua-darker";
				}else if(data[i].section == "SPEAKING"){
					search_section_short = "SP ";
					search_class = "bg-blue-darker";
				}else{
					search_class = "bg-grey-darker";
					if(data[i].study_type == "LUNCH"){
						search_study_name = "점심시간";
					}else if(data[i].study_type == "DINNER"){
						search_study_name = "저녁시간";
					}else if(data[i].study_type == "INDEPENDENT"){
						search_study_name = "의무자습";
					}
				}
				
				search_class = "bg-grey-darker";
				if(data[i].user_color) search_class = data[i].user_color;
				
				var vHtml = "";
				vHtml += '<div class="section-drop '+search_class+'">';
				if(search_section_short) vHtml += search_section_short + " ";
				if(search_study_name) vHtml += search_study_name;
				if(data[i].user_name) vHtml += " " + data[i].user_name;
				vHtml += '</div>';
				
				$("#"+td_id).find("input[name=section]").val(data[i].section);
				$("#"+td_id).find("input[name=study_type]").val(data[i].study_type);
				$("#"+td_id).find("input[name=user_id]").val(data[i].user_id);
				$("#"+td_id).append(vHtml);
			}
			
			if($("#search_type").val() == "all"){
				search_book();
			}
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function search_book()
{
	$.ajax({
		type : "POST",
		url : "/course/getCourseGroupBookList.do",
		data:{
			course_group_id:course_group_id
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<course_list.length; i++)
			{
				vHtml = "";
				var v_course_id = course_list[i].id;
				var array_book = data.filter(function(item, index){
					if(item.course_id == v_course_id){
						return true;
					}
				});
				for(var j=0; j<array_book.length; j++)
				{
					v_section = array_book[j].section;
					vHtml += '<div class="section-drop '+practice_section_color[v_section].color+'" style="margin-top:5px;color:white;">';
					vHtml += array_book[j].book_name;
					vHtml += '</div>';
				}
				$("#div_book_"+v_course_id).html(vHtml);
			}
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}
function search_user()
{
	$.ajax({
		type : "POST",
		url : "/course/getAuthUserSearchList.do",
		data:{
			group_id:$("#search_group_id").val()
		},
		success:function(data){
			var voca_list = data.filter(function(item, index){
				if(item.is_voca == true || item.group_id == 3){
					return true;
				}
			});
			
			var gr_list = data.filter(function(item, index){
				if(item.is_grammar == true || item.group_id == 3){
					return true;
				}
			});

			var rc_list = data.filter(function(item, index){
				if(item.is_reading == true || item.group_id == 3){
					return true;
				}
			});

			var lc_list = data.filter(function(item, index){
				if(item.is_listening == true || item.group_id == 3){
					return true;
				}
			});

			var wr_list = data.filter(function(item, index){
				if(item.is_writing == true || item.group_id == 3){
					return true;
				}
			});
			
			var sp_list = data.filter(function(item, index){
				if(item.is_speaking == true || item.group_id == 3){
					return true;
				}
			});

			var n_count = 3;
			if(voca_list.length > n_count) n_count = voca_list.length;
			if(gr_list.length > n_count) n_count = gr_list.length;
			if(rc_list.length > n_count) n_count = rc_list.length;
			if(lc_list.length > n_count) n_count = lc_list.length;
			if(wr_list.length > n_count) n_count = wr_list.length;
			if(sp_list.length > n_count) n_count = sp_list.length;
			
			var study_type = $("#search_study_type").val();
			var study_name = $("#search_study_type option:selected").text();
			var vHtml = "";
			for(var i=0; i<n_count; i++)
			{
				vHtml += '<tr>';
				if(i >= voca_list.length){
					vHtml += '<td></td>';
				}else{
					var study_class = "bg-grey-darker";
					if(voca_list[i].user_color) study_class = voca_list[i].user_color;
					vHtml += '<td>';
					//vHtml += '<div class="draggable section-drag bg-red-darker">';
					vHtml += '<div class="draggable section-drag '+study_class+'">';
					vHtml += '<input type="hidden" name="search_section" value="VOCA">';
					vHtml += '<input type="hidden" name="search_section_short" value="VC">';
					//vHtml += '<input type="hidden" name="search_class" value="bg-red-darker">';
					vHtml += '<input type="hidden" name="search_class" value="'+study_class+'">';
					vHtml += '<input type="hidden" name="search_study_type" value="'+study_type+'">';
					vHtml += '<input type="hidden" name="search_study_name" value="'+study_name+'">';
					vHtml += '<input type="hidden" name="search_user_id" value="'+voca_list[i].user_id+'">';					
					vHtml += '<input type="hidden" name="search_user_name" value="'+voca_list[i].last_name+voca_list[i].first_name+'">';					
					vHtml += 'VC '+voca_list[i].last_name+voca_list[i].first_name;
					vHtml += '</div>';
					vHtml += '</td>';
					
				}
				
				if(i >= gr_list.length){
					vHtml += '<td></td>';
				}else{
					var study_class = "bg-grey-darker";
					if(gr_list[i].user_color) study_class = gr_list[i].user_color;
					vHtml += '<td>';
					//vHtml += '<div class="draggable section-drag bg-green-darker">';
					vHtml += '<div class="draggable section-drag '+study_class+'">';
					vHtml += '<input type="hidden" name="search_section" value="GRAMMAR">';
					vHtml += '<input type="hidden" name="search_section_short" value="GR">';
					//vHtml += '<input type="hidden" name="search_class" value="bg-green-darker">';
					vHtml += '<input type="hidden" name="search_class" value="'+study_class+'">';
					vHtml += '<input type="hidden" name="search_study_type" value="'+study_type+'">';
					vHtml += '<input type="hidden" name="search_study_name" value="'+study_name+'">';
					vHtml += '<input type="hidden" name="search_user_id" value="'+gr_list[i].user_id+'">';					
					vHtml += '<input type="hidden" name="search_user_name" value="'+gr_list[i].last_name+gr_list[i].first_name+'">';					
					vHtml += 'GR '+gr_list[i].last_name+gr_list[i].first_name;
					vHtml += '</div>';
					vHtml += '</td>';
					
				}

				if(i >= rc_list.length){
					vHtml += '<td></td>';
				}else{
					var study_class = "bg-grey-darker";
					if(rc_list[i].user_color) study_class = rc_list[i].user_color;
					vHtml += '<td>';
					//vHtml += '<div class="draggable section-drag bg-purple-darker">';
					vHtml += '<div class="draggable section-drag '+study_class+'">';
					vHtml += '<input type="hidden" name="search_section" value="READING">';
					vHtml += '<input type="hidden" name="search_section_short" value="RC">';
					//vHtml += '<input type="hidden" name="search_class" value="bg-purple-darker">';
					vHtml += '<input type="hidden" name="search_class" value="'+study_class+'">';
					vHtml += '<input type="hidden" name="search_study_type" value="'+study_type+'">';
					vHtml += '<input type="hidden" name="search_study_name" value="'+study_name+'">';
					vHtml += '<input type="hidden" name="search_user_id" value="'+rc_list[i].user_id+'">';					
					vHtml += '<input type="hidden" name="search_user_name" value="'+rc_list[i].last_name+rc_list[i].first_name+'">';					
					vHtml += 'RC '+rc_list[i].last_name+rc_list[i].first_name;
					vHtml += '</div>';
					vHtml += '</td>';
					
				}
				
				if(i >= lc_list.length){
					vHtml += '<td></td>';
				}else{
					var study_class = "bg-grey-darker";
					if(lc_list[i].user_color) study_class = lc_list[i].user_color;
					vHtml += '<td>';
					//vHtml += '<div class="draggable section-drag bg-orange-darker">';
					vHtml += '<div class="draggable section-drag '+study_class+'">';
					vHtml += '<input type="hidden" name="search_section" value="LISTENING">';
					vHtml += '<input type="hidden" name="search_section_short" value="LC">';
					//vHtml += '<input type="hidden" name="search_class" value="bg-orange-darker">';
					vHtml += '<input type="hidden" name="search_class" value="'+study_class+'">';
					vHtml += '<input type="hidden" name="search_study_type" value="'+study_type+'">';
					vHtml += '<input type="hidden" name="search_study_name" value="'+study_name+'">';
					vHtml += '<input type="hidden" name="search_user_id" value="'+lc_list[i].user_id+'">';					
					vHtml += '<input type="hidden" name="search_user_name" value="'+lc_list[i].last_name+lc_list[i].first_name+'">';					
					vHtml += 'LC '+lc_list[i].last_name+lc_list[i].first_name;
					vHtml += '</div>';
					vHtml += '</td>';
					
				}
				
				if(i >= wr_list.length){
					vHtml += '<td></td>';
				}else{
					var study_class = "bg-grey-darker";
					if(wr_list[i].user_color) study_class = wr_list[i].user_color;
					vHtml += '<td>';
					//vHtml += '<div class="draggable section-drag bg-blue-darker">';
					vHtml += '<div class="draggable section-drag '+study_class+'">';
					vHtml += '<input type="hidden" name="search_section" value="WRITING">';
					vHtml += '<input type="hidden" name="search_section_short" value="WR">';
					//vHtml += '<input type="hidden" name="search_class" value="bg-blue-darker">';
					vHtml += '<input type="hidden" name="search_class" value="'+study_class+'">';
					vHtml += '<input type="hidden" name="search_study_type" value="'+study_type+'">';
					vHtml += '<input type="hidden" name="search_study_name" value="'+study_name+'">';
					vHtml += '<input type="hidden" name="search_user_id" value="'+wr_list[i].user_id+'">';					
					vHtml += '<input type="hidden" name="search_user_name" value="'+wr_list[i].last_name+wr_list[i].first_name+'">';					
					vHtml += 'WR '+wr_list[i].last_name+wr_list[i].first_name;
					vHtml += '</div>';
					vHtml += '</td>';
					
				}
				
				if(i >= sp_list.length){
					vHtml += '<td></td>';
				}else{
					var study_class = "bg-grey-darker";
					if(sp_list[i].user_color) study_class = sp_list[i].user_color;
					
					vHtml += '<td>';
					//vHtml += '<div class="draggable section-drag bg-aqua-darker">';
					vHtml += '<div class="draggable section-drag '+study_class+'">';
					vHtml += '<input type="hidden" name="search_section" value="SPEAKING">';
					vHtml += '<input type="hidden" name="search_section_short" value="SP">';
					//vHtml += '<input type="hidden" name="search_class" value="bg-aqua-darker">';
					vHtml += '<input type="hidden" name="search_class" value="'+study_class+'">';
					vHtml += '<input type="hidden" name="search_study_type" value="'+study_type+'">';
					vHtml += '<input type="hidden" name="search_study_name" value="'+study_name+'">';
					vHtml += '<input type="hidden" name="search_user_id" value="'+sp_list[i].user_id+'">';					
					vHtml += '<input type="hidden" name="search_user_name" value="'+sp_list[i].last_name+sp_list[i].first_name+'">';					
					vHtml += 'SP '+sp_list[i].last_name+sp_list[i].first_name;
					vHtml += '</div>';
					vHtml += '</td>';
					
				}

				
				if(i >= array_etc.length){
					vHtml += '<td></td>';
				}else{
					vHtml += '<td>';
					vHtml += '<div class="draggable section-drag bg-grey-darker">';
					vHtml += '<input type="hidden" name="search_section" value="ETC">';
					vHtml += '<input type="hidden" name="search_section_short" value="">';
					vHtml += '<input type="hidden" name="search_class" value="bg-grey-darker">';
					vHtml += '<input type="hidden" name="search_study_type" value="'+array_etc[i].study_type+'">';
					vHtml += '<input type="hidden" name="search_study_name" value="'+array_etc[i].study_name+'">';
					vHtml += '<input type="hidden" name="search_user_id" value="">';					
					vHtml += '<input type="hidden" name="search_user_name" value="">';					
					vHtml += array_etc[i].study_name;
					vHtml += '</div>';
					vHtml += '</td>';
					
				}
				
				vHtml += '</tr>';
			}
			$("#employeeTableList").html(vHtml);
			
			$(".draggable").draggable({
				revert: true,
				zIndex: 9900
			});
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

function form_save()
{
	$("#btn_save").hide();
	var arr_timetable = Array();
	
	var $_section       = $("input[name=section]");
	var $_study_type    = $("input[name=study_type]");
	var $_class_hour    = $("input[name=class_hour]");
	var $_user_id       = $("input[name=user_id]");
	var $_course_id     = $("input[name=course_id]");
	
	
	$_section.each(function(index) {
		if($(this).val())
		{
			var objTimetable = Object();
			objTimetable.section = $(this).val();
			objTimetable.study_type = $_study_type.eq(index).val();
			objTimetable.class_hour = $_class_hour.eq(index).val();
			if($_user_id.eq(index).val()){
				objTimetable.user_id = $_user_id.eq(index).val();
			}else{
				objTimetable.user_id = 0;
			}
			
			objTimetable.course_id = $_course_id.eq(index).val();
			arr_timetable.push(objTimetable);
		}
	});

	
	var url = "/course/saveCourseTimeTable.do";
	if($("#search_type").val() == "day"){
		url = "/course/saveCourseTimeTableDaily.do";
	}
	 $.ajax({
		type : "POST",
		url : url,
		data:{
			course_group_id:course_group_id,
			date:$("#search_schedule").val(),
			data_value:JSON.stringify(arr_timetable)
		},
		success:function(data){
			alert("저장하였습니다.");
			$("#btn_save").show();
			search_course();
		},
		error:function(event){	
			$("#btn_save").show();
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
		
}

var course_id;
function open_book(v_course_id)
{
	course_id = v_course_id;
	
	$.ajax({
		type : "POST",
		url : "/course/getCourseBookList.do",
		data:{
			course_id:course_id
		},
		success:function(data){
			var nSeq = 1;
			var courseBookList = data.courseBookList;
			var baseBookList   = data.baseBookList;
			var vHtml = "";
			for(var i=0; i<sectionList.length; i++)
			{
				var v_section = sectionList[i]
				vHtml += '<tr>';
				vHtml += '	<td class="text-center">'+v_section+'</td>';
				vHtml += '	<td>';
				vHtml += '		<div class="row" style="margin:0">';
				var array_book = baseBookList.filter(function(item, index){
					if(item.section == v_section){
						return true;
					}
				});
				for(var j=0; j<array_book.length; j++)
				{
					var v_book_id = array_book[j].id;
					var a_idx = courseBookList.findIndex(t => t.book_id == v_book_id);
					var checked = "";
					if(a_idx >= 0) checked = "checked";
					vHtml += '<div class="col-3 text-center">';
					vHtml += '	<img src="'+array_book[j].book_image+'" style="width:100%;border:1px solid #ccc;">';
					vHtml += '	<p>'+array_book[j].book_name+'</p>';
					vHtml += '	<div class="switcher">';
					vHtml += '		<input type="checkbox" name="use_yn" id="use_yn_'+nSeq+'" value="'+v_book_id+'" '+checked+'>';
					vHtml += '		<label for="use_yn_'+nSeq+'"></label>';
					vHtml += '	</div>';
					vHtml += '</div>';
					nSeq++;
				}
				vHtml += '		</div>';
				vHtml += '	</td>';

				vHtml += '</tr>';
			}
			$("#book_list").html(vHtml);
			$("#modal-book").modal();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

function save_book()
{
	var array_data = Array();
	$('input[name=use_yn]:checked').each(function(){
		var objData = Object();
		objData.book_id = $(this).val();
		array_data.push(objData);
	});
	
	var data_value = JSON.stringify(array_data);
	$.ajax({
		type : "POST",
		url : "/course/saveCourseBook.do",
		data:{
			course_id:course_id,
			data_value:data_value
		},
		success:function(data){
			$("#modal-book").modal("hide");
			search_course_book(course_id);

		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

function search_course_book(v_course_id)
{
	$.ajax({
		type : "POST",
		url : "/course/getCourseBookList.do",
		data:{
			course_id:v_course_id
		},
		success:function(data){
			var courseBookList = data.courseBookList;
			var vHtml = "";
			for(var j=0; j<courseBookList.length; j++)
			{
				v_section = courseBookList[j].section;
				vHtml += '<div class="section-drop '+practice_section_color[v_section].color+'" style="margin-top:5px;color:white;">';
				vHtml += courseBookList[j].book_name;
				vHtml += '</div>';
			}
			$("#div_book_"+v_course_id).html(vHtml);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}