var course_id;

var practice_section_color = {
		VOCA:{color:"bg-red-darker"},
		GRAMMAR:{color:"bg-green-darker"},
		READING:{color:"bg-purple-darker"},
		LISTENING:{color:"bg-orange-darker"},
		WRITING:{color:"bg-aqua-darker"},
		SPEAKING:{color:"bg-blue-darker"}
	};

/*
* 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	search_semester();
	
	showCourses("N");
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

function showCourses(isCancel)
{
	if(isCancel == "Y"){
		$("#btn_cancel_course").show();
	}else{
		$("#btn_cancel_course").hide();
	}
	/*
	var maskHeight = $(document).height(); 
	var maskWidth = window.document.body.clientWidth; 
	var mask = "<div id='mask' style='position:absolute; z-index:9000; background-color:#000000; display:none; left:0; top:0;'></div>"; 
	$('body').append(mask); 
	$('#mask').css({ 'width' : maskWidth , 'height': maskHeight , 'opacity' : '0.3' }); 
	$('#mask').show();
	$('#select_courses').show(); 
	*/ 
	$('#select_courses').modal({backdrop: 'static', keyboard: false}); 
}


function form_sitemap_select(v_title, v_course_id)
{
	course_id = v_course_id;
	$("#select_course_name").html(v_title);
	/*
	$('#select_courses').hide(); 
	$('#mask').hide(); 
	$('#mask').remove();
	*/
	$('#select_courses').modal("hide"); 
	form_search();
}

function form_course_cancel()
{
	/*
	$('#select_courses').hide(); 
	$('#mask').hide(); 
	$('#mask').remove();
	*/
	$('#select_courses').modal("hide"); 
}


function form_search()
{
	$.ajax({
		type : "POST",
		url : "/course/getCourseAchieveList.do",
		data:{
			course_id:course_id
		},
		success:function(data){
			var sectionList = data.sectionList;
			var sectionTypeList = data.sectionTypeList;
			var courseAchieveList = data.courseAchieveList;
			
			var vHtml = "";
			vHtml += '<tr>';
			vHtml += '	<th class="text-center">출결</th>';
			vHtml += '	<td>';
			vHtml += '		<div class="schedule row ml-2 mr-2">';
			vHtml += '			<div class="col-1 mb-2 mr-1 text-center bg-teal-darker text-white" style="padding:5px;">';
			vHtml += "				출결<br>";
			vHtml += "				<input type='hidden' value='BASE' name='section'>";
			vHtml += "				<input type='hidden' value='ATTEND' name='practice_type'>";
			var c_idx = courseAchieveList.findIndex(t => t.section == "BASE" && t.practice_type == "ATTEND");
			var v_achieve_point = 10;
			var v_late_amt = 5000;
			var v_absent_amt = 10000;
			if(c_idx >= 0){
				v_achieve_point = courseAchieveList[c_idx].achieve_point;
			}
			vHtml += "				<select name='achieve_point' style='width:100%;'>";
			for(var k=1; k<=10; k++){
				var checked = "";
				if(k == v_achieve_point) checked = "selected";
				vHtml += "<option value='"+k+"' "+checked+">"+k+"점</option>";
			}
			vHtml += "				</select><br>";
			vHtml += "				결석&nbsp;<select name='absent_amt' style='width:60%;'>";
			for(var k=10; k>=1; k--){
				var v_amt = 1000 * k;
				var checked = "";
				if(v_amt == v_absent_amt) checked = "selected";
				vHtml += "<option value='"+v_amt+"' "+checked+">"+v_amt+"원 차감</option>";
			}
			vHtml += "				</select><br>";
			vHtml += "				지각&nbsp;<select name='late_amt' style='width:60%;'>";
			for(var k=10; k>=0; k--){
				var v_amt = 1000 * k;
				var checked = "";
				if(v_amt == v_late_amt) checked = "selected";
				vHtml += "<option value='"+v_amt+"' "+checked+">"+v_amt+"원 차감</option>";
			}
			vHtml += "				</select>";
			vHtml += "<select name='scholarship' style='display:none;'><option value='0'>0</option></select>";
			vHtml += '			</div>';
			vHtml += '		</div>';			
			vHtml += '	</td>';
			vHtml += '</tr>';			
			for(var i=0; i<sectionList.length; i++)
			{
				var v_section = sectionList[i].section;
				var section_type_list = sectionTypeList.filter(function(item, index){
					if(item.section == v_section){
						return true;
					}
				});
				
				vHtml += '<tr>';
				vHtml += '	<th class="text-center">'+v_section+'</th>';
				vHtml += '	<td>';
				vHtml += '		<div class="schedule row ml-2 mr-2">';
				for(var j=0; j<section_type_list.length; j++)
				{
					var v_practice_type = section_type_list[j].practice_type;
					var v_achieve_point = 5;
					var v_scholarship = 2000;
					var c_idx = courseAchieveList.findIndex(t => t.section == v_section && t.practice_type == v_practice_type);
					if(c_idx >= 0){
						v_achieve_point = courseAchieveList[c_idx].achieve_point;
						v_scholarship = courseAchieveList[c_idx].scholarship;
					}
					vHtml += '<div class="col-1 mb-2 mr-1 text-center '+practice_section_color[sectionList[i].section].color+' text-white" style="padding:5px;">';
					vHtml += section_type_list[j].short_title_kr+"<br>";
					vHtml += section_type_list[j].practice_name;
					vHtml += "<input type='hidden' value='"+section_type_list[j].section+"' name='section'>";
					vHtml += "<input type='hidden' value='"+section_type_list[j].practice_type+"' name='practice_type'>";
					vHtml += "<select name='achieve_point' style='width:100%;'>";
					for(var k=1; k<=10; k++){
						var checked = "";
						if(k == v_achieve_point) checked = "selected";
						vHtml += "<option value='"+k+"' "+checked+">"+k+"점</option>";
					}
					vHtml += "</select>";
					vHtml += "<select name='scholarship' style='width:100%;'>";
					for(var k=10; k>=0; k--){
						var v_amt = k * 1000;
						var checked = "";
						if(v_amt == v_scholarship) checked = "selected";
						vHtml += "<option value='"+v_amt+"' "+checked+">"+v_amt+"원 차감</option>";
					}
					vHtml += "</select>";
					vHtml += "<select name='late_amt' style='display:none;'><option value='0'>0</option></select>";
					vHtml += "<select name='absent_amt' style='display:none;'><option value='0'>0</option></select>";
					vHtml += '</div>';
				}
				vHtml += '		</div>';
				vHtml += '	</td>';
				vHtml += '</tr>';
			}
			$("#achievetableDataList").html(vHtml);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

function form_save()
{
	var $_section           = $("input[name=section]");
	var $_practice_type     = $("input[name=practice_type]");
	var $_achieve_point     = $("select[name=achieve_point]");
	var $_scholarship       = $("select[name=scholarship]");
	var $_late_amt          = $("select[name=late_amt]");
	var $_absent_amt        = $("select[name=absent_amt]");
	
	var achieve_list = Array();
	
	$_section.each(function(index) {
		var section        = $(this).val();
		var practice_type  = $_practice_type.eq(index).val();
		var achieve_point  = $_achieve_point.eq(index).val();
		var scholarship    = $_scholarship.eq(index).val();
		var late_amt       = $_late_amt.eq(index).val();
		var absent_amt     = $_absent_amt.eq(index).val();
		
		var objAchieve = Object();
		objAchieve.section        = section;
		objAchieve.practice_type  = practice_type;
		objAchieve.achieve_point  = achieve_point;
		objAchieve.scholarship    = scholarship;
		objAchieve.late_amt       = late_amt;
		objAchieve.absent_amt     = absent_amt;

		achieve_list.push(objAchieve);
	});
	
	$.ajax({
			type : "POST",
			url : "/course/saveCourseAchieve.do",
			data:{
				course_id:course_id,
				data_value:JSON.stringify(achieve_list)
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