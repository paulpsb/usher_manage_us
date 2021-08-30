var courseList;
var course_id;
/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	$("#search_school_name").keydown(function(key) {
		if (key.keyCode == 13) {
			search_school_list();
		}
	});
	
	
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
					vHtml += '		<a href="javascript:form_sitemap_select(\''+vTitle+'\','+arr_course[j].id+','+arr_course[j].course_group_id+')"><h5>'+arr_course[j].name+'반</h5></a>';
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


function form_sitemap_select(v_title, v_course_id, v_group_id)
{
	course_id = v_course_id;
	$("#select_course_name").html(v_title);
	/*
	$('#select_courses').hide(); 
	$('#mask').hide(); 
	$('#mask').remove();
	*/
	$('#select_courses').modal("hide"); 
	search_course(v_group_id);
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
/*
 * 설명 : 반 조회.
 */
function search_course(v_group_id)
{
	$.ajax({
		type : "POST",
		url : "/common/getCourseList.do",
		data:{
			course_group_id:v_group_id
		},
		success:function(data){
			courseList = data;
			form_search();

		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

function form_search()
{
	$("#excel_course_id").val(course_id);
	$.ajax({
		type : "POST",
		url : "/enrollment/getCourseEnrollmentList.do",
		data:{
			course_id:course_id
		},
		success:function(data){
			var v_course_id = course_id;
			var c_idx = courseList.findIndex(i => i.id == v_course_id);
			var first_idx = 0;
			var last_idx = courseList.length - 1;
			
			
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				var sName = data[i].last_name+data[i].first_name;
				var sReg = "신규";
				if(data[i].registration_type != "NEW"){
					sReg = "기존";
				}
				
				var checked = "";
				var disabled = "";
				if(data[i].chamgang_yn == "Y"){
					checked  = "checked";
					disabled = "disabled";
				}
				vHtml += "<tr>";
				vHtml += "	<td class='text-center'>";
				vHtml += '			<input type="hidden" name="course_enrollment_id" value="'+data[i].course_enrollment_id+'">';
				vHtml += sName;
				vHtml += "	</td>";
				vHtml += "	<td class='text-center'>";
				vHtml += sReg;
				vHtml += "	</td>";
				vHtml += "	<td class='text-center'>";
				vHtml += data[i].username;
				vHtml += "	</td>";
				vHtml += "	<td class='text-center'>";
				vHtml += data[i].mobile_no;
				vHtml += "	</td>";
				vHtml += "	<td>";
				vHtml += cfmNvl1(data[i].school_name);
				vHtml += "	</td>";
				vHtml += "	<td class='with-btn text-center' nowrap=''>";
				vHtml += "	<button type='button' class='btn btn-sm btn-primary m-r-2 m-b-2' onclick='modify_user_school("+data[i].user_id+")'>학교수정</a>";
				vHtml += "	</td>";
				vHtml += "	<td class='with-btn text-center' nowrap=''>";
				if(cfmNvl1(data[i].program_not_use) == "Y"){
					vHtml += "<span class='text-danger'>Light 반</span>";
				}
				vHtml += "	<button type='button' class='btn btn-sm btn-primary m-r-2 m-b-2' onclick='modify_enrollment_program("+data[i].course_enrollment_id+")'>Light반 설정</a>";
				vHtml += "	</td>";
				vHtml += "	<td class='text-center'>";
				vHtml += '		<div class="switcher">';
				vHtml += '			<input type="checkbox" name="chamgang_yn" id="chamgang_yn_'+data[i].course_enrollment_id+'" value="1" '+checked+'>';
				vHtml += '			<label for="chamgang_yn_'+data[i].course_enrollment_id+'"></label>';
				vHtml += '		</div>';
				vHtml += "	</td>";
				vHtml += '	<td class="with-form-control">';
				vHtml += '		<input type="text" value="'+cfmNvl1(data[i].bag_no)+'" name="bag_no" class="form-control" '+disabled+'>';
				vHtml += '	</td>';
				vHtml += '	<td class="with-form-control">';
				vHtml += '		<input type="text" value="'+cfmNvl1(data[i].bag_sub_no)+'" name="bag_sub_no" class="form-control" '+disabled+'>';
				vHtml += '	</td>';
				vHtml += "<td class='with-btn text-center' nowrap=''>";
				vHtml += "	<button type='button' class='btn btn-sm btn-primary m-r-2 m-b-2' onclick='go_user_info("+data[i].user_id+")'>개인정보 수정</a>";
				vHtml += "	<button type='button' class='btn btn-sm btn-primary m-r-2 m-b-2' onclick='go_user_score("+data[i].user_id+")'>보유점수 수정</a>";
				vHtml += "</td>";
				vHtml += "<td class='with-btn text-center' nowrap=''>";
				if(c_idx > first_idx)
				{
					var d_idx = c_idx - 1;
					vHtml += "	<button type='button' class='btn btn-sm btn-danger m-r-2 m-b-2' onclick='go_user_down_course("+data[i].course_enrollment_id+","+courseList[d_idx].id+",\""+sName+"\",\""+courseList[d_idx].name+"\")'>"+courseList[d_idx].name+"반으로 강등</a>";
				}
				if(c_idx < last_idx)
				{
					var u_idx = c_idx + 1;
					vHtml += "	<button type='button' class='btn btn-sm btn-success m-r-2 m-b-2' onclick='go_user_up_course("+data[i].course_enrollment_id+","+courseList[u_idx].id+",\""+sName+"\",\""+courseList[u_idx].name+"\")'>"+courseList[u_idx].name+"반으로 승반</a>";
				}
				vHtml += "</td>";
				vHtml += "</tr>";
			}
			
			$("#data_list").html(vHtml);
			
			$("input[name='chamgang_yn']").click(function(){
				if($(this).is(":checked")){
					$(this).closest("tr").find("input[name=bag_no]").attr("disabled",true);
					$(this).closest("tr").find("input[name=bag_sub_no]").attr("disabled",true);
					$(this).closest("tr").find("input[name=bag_no]").val("");
					$(this).closest("tr").find("input[name=bag_sub_no]").val("");
				}else{
					$(this).closest("tr").find("input[name=bag_no]").attr("disabled",false);
					$(this).closest("tr").find("input[name=bag_sub_no]").attr("disabled",false);
				}
			});

		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

function go_user_down_course(v_course_enrollment_id,  v_course_id, v_user_name, v_course_name)
{
	if(!confirm(v_user_name+"학생 "+v_course_name+"반으로 강등시키겠습니까?")) return;
	
	$.ajax({
		type : "POST",
		url : "/enrollment/moveCourseEnrollment.do",
		data:{
			course_enrollment_id:v_course_enrollment_id,
			course_id:v_course_id
		},
		success:function(data){
			alert("반 변경하였습니다.");
			form_search();

		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
	
}

function go_user_up_course(v_course_enrollment_id,  v_course_id, v_user_name, v_course_name)
{
	if(!confirm(v_user_name+"학생 "+v_course_name+"반으로 승반시키겠습니까?")) return;
	
	$.ajax({
		type : "POST",
		url : "/enrollment/moveCourseEnrollment.do",
		data:{
			course_enrollment_id:v_course_enrollment_id,
			course_id:v_course_id
		},
		success:function(data){
			alert("반 변경하였습니다.");
			form_search();

		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}


function go_user_info(user_id)
{
	window.open('http://batch.usher.co.kr/modify/modify_user.do?user_id='+user_id,'modify_user');
	//window.open('http://127.0.0.1:8070/modify/modify_user.do?user_id='+user_id,'modify_user');
}

function go_user_score(user_id)
{
	window.open('http://batch.usher.co.kr/modify/modify_user_score.do?user_id='+user_id,'modify_user_score');
	//window.open('http://127.0.0.1:8070/modify/modify_user_score.do?user_id='+user_id,'modify_user_score');
}

function auto_number()
{
	var $_course_enrollment_id   = $("input[name=course_enrollment_id]");
	var $_chamgang_yn            = $("input[name=chamgang_yn]");
	var $_bag_no                 = $("input[name=bag_no]");
	var $_bag_sub_no             = $("input[name=bag_sub_no]");
	
	var nNum = 1;
	var nSubNum = 1;
	$_course_enrollment_id.each(function(index) {
		if(nSubNum > 30){
			nNum++;
			nSubNum=1;
		}
		
		if(!$_chamgang_yn.eq(index).is(":checked"))
		{
			$_bag_no.eq(index).val(nNum);
			$_bag_sub_no.eq(index).val(nSubNum);
			nSubNum++;
		}else{
			$_bag_no.eq(index).val("");
			$_bag_sub_no.eq(index).val("");
		}
	});
}

function form_save(){
	var $_course_enrollment_id   = $("input[name=course_enrollment_id]");
	var $_chamgang_yn            = $("input[name=chamgang_yn]");
	var $_bag_no                 = $("input[name=bag_no]");
	var $_bag_sub_no             = $("input[name=bag_sub_no]");
	
	var data_list = Array();
	
	$_course_enrollment_id.each(function(index) {
		var course_enrollment_id      = $(this).val();
		var bag_no    = $_bag_no.eq(index).val();
		var bag_sub_no    = $_bag_sub_no.eq(index).val();
		if(!bag_no) bag_no = 0;
		if(!bag_sub_no) bag_sub_no = 0;
		
		var objData = Object();
		objData.course_enrollment_id    = course_enrollment_id;
		objData.bag_no  = bag_no;
		objData.bag_sub_no  = bag_sub_no;
		
		if($_chamgang_yn.eq(index).is(":checked"))
		{
			objData.chamgang_yn  = "Y";
		}else{
			objData.chamgang_yn  = "N";
		}
		data_list.push(objData);
	});	
	
	var data_value = JSON.stringify(data_list);
	$.ajax({
		type : "POST",
		url : "/enrollment/saveCourseEnrollmentList.do",
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

function form_excel()
{
	 var f = document.excelFrm;
     f.action = "getCourseEnrollmentExcel.do";
     f.submit();
}

var user_id
var school_check;
var school_gubun;
var school_foreign_gubun;
var school_area1;
var school_area2;
var school_name;

function modify_user_school(v_user_id)
{
	user_id = v_user_id;
	$("#div_school_search").show();
	$("#div_school_list").show();
	$("#div_add_school_title").hide();
	$("#div_add_school").hide();
	$("#btn_add_school").hide();
	$("#modal-school").modal();
}

function search_school_list()
{
	var search_school_name = $("#search_school_name").val();
	if(search_school_name.length < 2){
		alert("2글자 이상 입력하세요.");
		return;
	}
	
	$.ajax({
		type : "POST",
		url : "/common/getBaseSchoolList.do",
		data:{
			school_name:search_school_name
		},
		success:function(data){
			var vHtml = '';
			for(var i=0; i<data.length ; i++)
			{
				vHtml += '<tr>';
				vHtml += '	<td style="width:85px;"class="text-center">'+data[i].school_foreign_gubun+'</td>';
				vHtml += '	<td style="width:100px;" class="text-center">'+data[i].school_gubun+'</td>';
				vHtml += '	<td style="width:150px;"class="text-center">'+data[i].school_area1+'</td>';
				vHtml += '	<td style="width:150px;"class="text-center">'+data[i].school_area1+'</td>';
				vHtml += '	<td style="width:135px;" class="text-center">';
				if(data[i].school_foreign_gubun == "국내")
				{
					vHtml += data[i].school_name_kr;
				}else{
					if(data[i].school_name_en){
						vHtml += data[i].school_name_en;
					}else{
						vHtml += data[i].school_name_kr;
					}
				}
				vHtml += 	'</td>';
				vHtml += '	<td style="width:125px;" class="text-center">';
				vHtml += '		<button onclick="select_school(\''+data[i].school_gubun+'\',\''+data[i].school_foreign_gubun+'\',\''+data[i].school_area1+'\',\''+data[i].school_area2+'\',\''+data[i].school_name_kr+'\',\''+data[i].school_name_en+'\')" class="btn btn-wide btn-blue btn-h-white btn-h-brc-tp btn-a-yellow radius-round">선택</button>';
				vHtml += '	</td>';
				vHtml += '</tr>';
			}
			$("#school_list").html(vHtml);
			$("#div_add_school_title").show();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	})
	
}

function select_school(v_school_gubun, v_school_foreign_gubun, v_school_area1, v_school_area2, v_school_name_kr, v_school_name_en)
{
	if(v_school_foreign_gubun == "국내")
	{
		school_name = v_school_name_kr;
	}else{
		if(v_school_name_en && v_school_name_en != 'null'){
			school_name = v_school_name_en;
		}else{
			school_name = v_school_name_kr;
		}
	}
	
	school_check = "Y";
	school_gubun = v_school_gubun;
	school_foreign_gubun = v_school_foreign_gubun;
	school_area1 = v_school_area1;
	school_area2 = v_school_area2;
	//school_name = v_school_name;
	
	save_school();
}

function add_school_show()
{
	$("#add_school_foreign_gubun").val("");
	$("#add_school_gubun").val("");
	$("#add_school_area1").html('<option value="">선택</option>');
	$("#add_school_area2").html('<option value="">선택</option>');
	$("#add_school_name").val("");
	
	$("#div_school_search").hide();
	$("#div_school_list").hide();
	$("#div_school_add_title").hide();
	$("#div_add_school").show();
	$("#btn_add_school").show();
	
	$("#add_school_foreign_gubun").change(function(e){
		if($(this).val()){
			search_school_area1();
		}else{
			$("#add_school_area1").html('<option value="">선택</option>');
			$("#add_school_area2").html('<option value="">선택</option>');
		}
	});
	
}

function search_school_area1()
{
	var url = "";
	var add_school_foreign_gubun = $("#add_school_foreign_gubun").val();
	if(add_school_foreign_gubun == "국내"){
		url = "/common/getArea1.do";
	}else{
		url = "/common/getCountry1.do";
	}
	$.ajax({
		type : "POST",
		url : url,
		data:{
		},
		success:function(data){
			var vHtml = '<option value="">선택</option>';
			for(var i=0; i<data.length ; i++)
			{
				if(add_school_foreign_gubun == "국내"){
					vHtml += '<option value="'+data[i].area1+'">'+data[i].area1+'</option>';
				}else{
					vHtml += '<option value="'+data[i].country1+'">'+data[i].country1+'</option>';
				}
			}
			
			$("#add_school_area1").html(vHtml);
			$("#add_school_area1").change(function(e){
				search_school_area2();
			});
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	})
}

function search_school_area2()
{
	var url = "";
	var add_school_foreign_gubun = $("#add_school_foreign_gubun").val();
	if(add_school_foreign_gubun == "국내"){
		url = "/common/getArea2.do";
	}else{
		url = "/common/getCountry2.do";
	}
	
	$.ajax({
		type : "POST",
		url : url,
		data:{
			area1:$("#add_school_area1").val(),
			country1:$("#add_school_area1").val()
		},
		success:function(data){
			console.log(data);
			var vHtml = '<option value="">선택</option>';
			for(var i=0; i<data.length ; i++)
			{
				if(add_school_foreign_gubun == "국내"){
					vHtml += '<option value="'+data[i].area2+'">'+data[i].area2+'</option>';
				}else{
					vHtml += '<option value="'+data[i].country2+'">'+data[i].country2+'</option>';
				}
			}
			$("#add_school_area2").html(vHtml);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

function add_school()
{
	var add_school_foreign_gubun = $("#add_school_foreign_gubun").val();
	var add_school_gubun = $("#add_school_gubun").val();
	var add_school_area1 = $("#add_school_area1").val();
	var add_school_area2 = $("#add_school_area2").val();
	var add_school_name = $("#add_school_name").val();
	if(!add_school_foreign_gubun){
		alert("국내/외를 선택하세요.");
		return;
	}
	if(!add_school_gubun){
		alert("구분을 선택하세요.");
		return;
	}
	if(!add_school_area1){
		alert("시도/대륙을 선택하세요.");
		return;
	}
	if(!add_school_area2){
		alert("시.군.구/나라를 선택하세요.");
		return;
	}
	if(!add_school_name){
		alert("학교명을 입력하세요.");
		return;
	}
	
	school_check = "N";
	school_gubun = add_school_gubun;
	school_foreign_gubun = add_school_foreign_gubun;
	school_area1 = add_school_area1;
	school_area2 = add_school_area2;
	school_name = add_school_name;
	
	save_school();
}

function save_school()
{
	if(!confirm("학교정보를 등록하시겠습니까?")) return;
	$.ajax({
		type : "POST",
		url : "/enrollment/saveUserSchool.do",
		data:{
			user_id:user_id,
			school_check:school_check,
			school_gubun:school_gubun,
			school_foreign_gubun:school_foreign_gubun,
			school_area1:school_area1,
			school_area2:school_area2,
			school_name:school_name
		},
		success:function(data){
			$("#modal-school").modal("hide");
			form_search();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

function modify_enrollment_program(v_course_enrollment_id)
{
	$("#practice_course_enrollment_id").val(v_course_enrollment_id);
	
	$("#program_not_use").change(function(){
		if($("#program_not_use").is(":checked")){
			$("#div_section_practice").show();
		}else{
			$("#div_section_practice").hide();
		}
	});
	
	$.ajax({
		type : "POST",
		url : "/enrollment/getCourseEnrollmentProgram.do",
		data:{
			course_enrollment_id:v_course_enrollment_id
		},
		success:function(data){
			var enrollmentInfo = data.enrollmentInfo;
			var sectionList = data.sectionList;
			var practiceList = data.practiceList;
			var enrollmentPracticeList = data.enrollmentPracticeList;

			$("#practice_student_name").html(enrollmentInfo.last_name+enrollmentInfo.first_name);
			
			if(enrollmentInfo.program_not_use == "Y"){
				$("#div_section_practice").show();
				$("#program_not_use").prop("checked", true);
			}else{
				$("#div_section_practice").hide();
				$("#program_not_use").prop("checked", false);
			}
			
			var vHtml = "";
			var nSeq = 1;
			
			for(var i=0; i<sectionList.length; i++)
			{
				var v_section = sectionList[i].section;
				var a_practice_type_list = practiceList.filter(function(item, index){
					if(item.section == v_section){
						return true;
					}
				}); 
				var n_practice_type = a_practice_type_list.length;
				if(n_practice_type > 0)
				{
					vHtml += '<tr>';
					vHtml += '	<td class="text-center">'+v_section+'</td>';
					vHtml += '	<td>';
					vHtml += '		<div class="row" style="margin:0px;">';
					for(var j=0; j<n_practice_type; j++)
					{
						var checked = "";
						var v_practice_type = a_practice_type_list[j].practice_type;
						var idx = enrollmentPracticeList.findIndex(t => t.section == v_section && t.practice_type == v_practice_type);
						if(idx >= 0) checked = "checked";
						
						vHtml += '		<div class="col-3 m-b-3">';
						vHtml += '			<input type="hidden" name="section" value="'+v_section+'">';
						vHtml += '			<input type="hidden" name="practice_type" value="'+v_practice_type+'">';
						vHtml += '			<div class="custom-control custom-switch">';
						vHtml += '				<input type="checkbox" class="custom-control-input" name="practice_type_use" id="practice_type_use_'+nSeq+'" value="1" '+checked+'>';
						vHtml += '				<label class="custom-control-label" for="practice_type_use_'+nSeq+'">'+a_practice_type_list[j].practice_name+'</label>';
						vHtml += '			</div>';
						vHtml += '		</div>';
						nSeq++;
					}
					vHtml += '		</div>';
					vHtml += '	</td>';
					vHtml += '</tr>';
				}
			}
			$("#section_practice_list").html(vHtml);
			$("#modal-practice").modal();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

function save_practice()
{
	var v_program_not_use = "N";
	if($("#program_not_use").is(":checked")){
		v_program_not_use = "Y";
	}
	var v_course_enrollment_id = $("#practice_course_enrollment_id").val();
	
	var $_section           = $("input[name=section]");
	var $_practice_type     = $("input[name=practice_type]");
	var $_practice_type_use = $("input[name=practice_type_use]");
	
	var section_list = Array();
	
	$_section.each(function(index) {
		var section        = $(this).val();
		var practice_type  = $_practice_type.eq(index).val();
		
		if($_practice_type_use.eq(index).is(":checked"))
		{
			var objSection = Object();
			objSection.status = "ACTIVE";
			objSection.section = section;
			objSection.practice_type = practice_type;
			section_list.push(objSection);
		}
		
	});
	
	var data_value = JSON.stringify(section_list);
	$.ajax({
		type : "POST",
		url : "/enrollment/saveCourseEnrollmentProgram.do",
		data:{
			course_enrollment_id:v_course_enrollment_id,
			program_not_use:v_program_not_use,
			data_value:data_value
		},
		success:function(data){
			alert("저장하였습니다.");
			$("#modal-practice").modal("hide");
			form_search();

		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}