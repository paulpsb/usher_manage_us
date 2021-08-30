var archieve_list = ["OT", "GOAL", "ALL", "VOCA"];
var archieve = {
	OT:{ name:"OT명단",code:"ot"},
	GOAL:{ name:"목표설정",code:"goal"},
	ALL:{ name:"한판보기/성취표 전송",code:"all"},
	VOCA:{ name:"출결/단어", code:"voca"}
};

var oTable;

var monthly_list = [
//	"TWELVE",
//	"APPENDIX",
//	"CONJUCTION",
//	"FIVERULES",
	"VERBAL_BLUEPRINT",
//	"IRREGULAR"
]

var monthly_list_type = [
	"GRAMMAR_TRANSLATION",
	"GRAMMAR_TRANSLATION_ACUTAL",
	"EXPLANATION"
]

var section_exam_type1 = {
		SPEAKING:{
			//뼈대
			BACKBONE:[
				"Task1",
				"Task2",
				"Task3",
				"Task4",
			]
		},
		WRITING:{
			//뼈대
			BACKBONE:[
				"5분 뼈대/독립",
				"3분 뼈대/통합"
			]
		}
	}

var exam_type1 = {
		//12간지
		TWELVE:[
				"academic",
				"saving time",
				"money",
				"stress",
				"good at it",
				"love",
				"bike",
				"parents",
				"environment",
				"government",
				"advertisement",
				"great memory"
		],
		//별지
		APPENDIX:[
			"That vs. those",
			"To-부정사 부사적 용법",
			"도치",
			"의미상 주어",
			"끼워넣기 문제 풀이 방법",
			"As 관계대명사",
			"out of",
			";(세미콜론)",
			"of which",
			"be to 용법"
		],
		//접속사 암기
		CONJUCTION:[
			"when",
			"because",
			"since",
			"whereas",
			"where",
			"although",
			"whose",
			"how",
			"while",
			"if",
			"whether",
			"though",
			"unless",
			"once",
			"as long as",
			"why",
			"providing",
			"provided",
			"after",
			"as far as",
			"by the time",
			"as soon as",
			"as if",
			"as though",
			"at the time",
			"now that",
			"even if",
			"even though",
			"every time",
			"except that",
			"however",
			"in case",
			"in order that",
			"in that",
			"so that",
			"so ~ that",
			"so that",
			"what",
			"whenever",
			"which",
			"as",
			"than",
			"before",
			"whatever",
			"that"
		],
		FIVERULES:[
			"Rule1",
			"Rule2",
			"Rule3",
			"Rule4",
			"Rule5"
		],
		VERBAL_BLUEPRINT:[
			"1일차",
			"2일차",
			"3일차",
			"4일차",
			"5일차"
		],
		IRREGULAR:[
			"a-a-a",
			"a-b-a",
			"a-b-b",
			"a-b-c"
		],
		EXPLANATION:[
			"1번",
			"2번",
			"3번",
			"4번",
			"5번",
			"6번",
			"7번",
			"8번",
			"9번",
			"10번",
			"11번",
			"12번",
			"13번",
			"14번",
			"15번",
			"16번",
			"17번",
			"18번",
			"19번",
			"20번",
			"21번",
			"22번",
			"23번",
			"24번",
			"25번",
			"26번",
			"27번",
			"28번",
			"29번",
			"30번",
			"31번",
			"32번",
			"33번",
			"34번",
			"35번",
			"36번",
			"37번",
			"38번",
			"39번",
			"40번"
		],
		GRAMMAR_TRANSLATION_ACUTAL:[
			"1번",
			"2번",
			"3번",
			"4번",
			"5번",
			"6번",
			"7번",
			"8번",
			"9번",
			"10번",
			"11번",
			"12번",
			"13번",
			"14번",
			"15번",
			"16번",
			"17번",
			"18번",
			"19번",
			"20번",
			"21번",
			"22번",
			"23번",
			"24번",
			"25번",
			"26번",
			"27번",
			"28번",
			"29번",
			"30번",
			"31번",
			"32번",
			"33번",
			"34번",
			"35번",
			"36번",
			"37번",
			"38번",
			"39번",
			"40번"
		],
		GRAMMAR_TRANSLATION:[
			"1-15",
			"16-40"
		]
	};

	var section_exam_type = {
		SPEAKING:{
			//뼈대
			BACKBONE:[
				"Task1",
				"Task2",
				"Task3",
				"Task4",
			]
		},
		WRITING:{
			//뼈대
			BACKBONE:[
				"5분 뼈대/독립",
				"3분 뼈대/통합"
			]
		}
	}
	
var exam_type = {
		//12간지
		TWELVE:[
				"academic",
				"saving time",
				"money",
				"stress",
				"good at it",
				"love",
				"bike",
				"parents",
				"environment",
				"government",
				"advertisement",
				"great memory"
		],
		//별지
		APPENDIX:[
			"That vs. those",
			"To-부정사 부사적 용법",
			"도치",
			"의미상 주어",
			"끼워넣기 문제 풀이 방법",
			"As 관계대명사",
			"out of",
			";(세미콜론)",
			"of which",
			"be to 용법"
		],
		//접속사 암기
		CONJUCTION:[
			"when",
			"because",
			"since",
			"whereas",
			"where",
			"although",
			"whose",
			"how",
			"while",
			"if",
			"whether",
			"though",
			"unless",
			"once",
			"as long as",
			"why",
			"providing",
			"provided",
			"after",
			"as far as",
			"by the time",
			"as soon as",
			"as if",
			"as though",
			"at the time",
			"now that",
			"even if",
			"even though",
			"every time",
			"except that",
			"however",
			"in case",
			"in order that",
			"in that",
			"so that",
			"so ~ that",
			"so that",
			"what",
			"whenever",
			"which",
			"as",
			"than",
			"before",
			"whatever",
			"that"
		],
		FIVERULES:[
			"Rule1",
			"Rule2",
			"Rule3",
			"Rule4",
			"Rule5"
		],
		VERBAL_BLUEPRINT:[
			"1일차",
			"2일차",
			"3일차",
			"4일차",
			"5일차"
		],
		IRREGULAR:[
			"a-a-a",
			"a-b-a",
			"a-b-b",
			"a-b-c"
		],
		EXPLANATION:[
			"1번",
			"2번",
			"3번",
			"4번",
			"5번",
			"6번",
			"7번",
			"8번",
			"9번",
			"10번",
			"11번",
			"12번",
			"13번",
			"14번",
			"15번",
			"16번",
			"17번",
			"18번",
			"19번",
			"20번",
			"21번",
			"22번",
			"23번",
			"24번",
			"25번",
			"26번",
			"27번",
			"28번",
			"29번",
			"30번",
			"31번",
			"32번",
			"33번",
			"34번",
			"35번",
			"36번",
			"37번",
			"38번",
			"39번",
			"40번"
		],
		GRAMMAR_TRANSLATION_ACUTAL:[
			"1번",
			"2번",
			"3번",
			"4번",
			"5번",
			"6번",
			"7번",
			"8번",
			"9번",
			"10번",
			"11번",
			"12번",
			"13번",
			"14번",
			"15번",
			"16번",
			"17번",
			"18번",
			"19번",
			"20번",
			"21번",
			"22번",
			"23번",
			"24번",
			"25번",
			"26번",
			"27번",
			"28번",
			"29번",
			"30번",
			"31번",
			"32번",
			"33번",
			"34번",
			"35번",
			"36번",
			"37번",
			"38번",
			"39번",
			"40번"
		],
		GRAMMAR_TRANSLATION:[
			"1-15",
			"16-40"
		]
	};
var junior_regular_class_list = [
	[10, 15],
	[20, 30],
	[36, 48],
	[36, 48],
	[36, 48]
]

var junior_special_class_list = [
	[10, 15],
	[15, 30],
	[15, 30],
	[15, 30],
	[15, 30]
]

var senior_regular_class_list = [
	[1, 2],
	[1, 2],
	[1, 2],
	[1, 2],
	[1, 2]
]

function create_top_menu(sectionList, practiceList, section_code, practice_code, course_id, student_type)
{
	var vHtml = "";
	vHtml+= '<div class="row mb-3">';
	vHtml+= '	<div class="col-12" id="section_area">';
	var nSeq = 1;
	var checked = "";
	for(var i=0; i<archieve_list.length; i++){
		var v_archieve = archieve_list[i];
		var v_archieve_name = archieve[v_archieve].name;
		var v_archieve_code = archieve[v_archieve].code;
		
		checked = "";
		if(section_code==v_archieve_code) checked = "checked";
		vHtml += '<input type="radio" class="css-input-radio-checkbox" name="search_section" id="search_section_'+nSeq+'" value="'+v_archieve+'" '+checked+'>';
		vHtml += '<label class="css-input-radio-checkbox-label" for="search_section_'+nSeq+'">'+v_archieve_name+'</label>';
		nSeq++;
	}
	
	for(var i=0; i<sectionList.length; i++){
		if(sectionList[i].section=="VOCA") continue;
		checked = "";
		if(sectionList[i].section==section_code) checked = "checked";
		vHtml += '<input type="radio" class="css-input-radio-checkbox" name="search_section" id="search_section_'+nSeq+'" value="'+sectionList[i].section+'" '+checked+'>';
		vHtml += '<label class="css-input-radio-checkbox-label" for="search_section_'+nSeq+'">'+sectionList[i].section+'</label>';
		nSeq++;
	}
	if(student_type == "JUNIOR"){
		checked = "";
		if(section_code=="send") checked = "checked";
		vHtml += '<input type="radio" class="css-input-radio-checkbox" name="search_section" id="search_section_'+nSeq+'" value="send" '+checked+'>';
		vHtml += '<label class="css-input-radio-checkbox-label" for="search_section_'+nSeq+'">성취표 발송</label>';
		nSeq++;
	}
	checked = "";
	if(section_code=="homework") checked = "checked";
	vHtml += '<input type="radio" class="css-input-radio-checkbox" name="search_section" id="search_section_'+nSeq+'" value="homework" '+checked+'>';
	vHtml += '<label class="css-input-radio-checkbox-label" for="search_section_'+nSeq+'">과제</label>';
	nSeq++;

	checked = "";
	if(section_code=="exam") checked = "checked";
	vHtml += '<input type="radio" class="css-input-radio-checkbox" name="search_section" id="search_section_'+nSeq+'" value="exam" '+checked+'>';
	vHtml += '<label class="css-input-radio-checkbox-label" for="search_section_'+nSeq+'">반배치/모의/실제</label>';
	nSeq++;

	checked = "";
	if(section_code=="photo") checked = "checked";
	vHtml += '<input type="radio" class="css-input-radio-checkbox" name="search_section" id="search_section_'+nSeq+'" value="photo" '+checked+'>';
	vHtml += '<label class="css-input-radio-checkbox-label" for="search_section_'+nSeq+'">사진모음</label>';
	nSeq++;
	
	vHtml+= '	</div>';
	vHtml+= '</div>';
	vHtml+= '<div class="row mb-3">';
	vHtml+= '	<div class="col-12" id="practice_area">';
	nSeq = 1;
	for(var i=0; i<practiceList.length; i++){
		if(section_code == "VOCA") continue;
		if(section_code != practiceList[i].section) continue;
		
		if(nSeq == 1){
			checked="";
			if(practice_code == "all_practice") checked = "checked";
			vHtml += '<input type="radio" class="css-input-radio-checkbox" name="search_practice" id="search_practice_0" value="all_practice" '+checked+'>';
			vHtml += '<label class="css-input-radio-checkbox-label" for="search_practice_0">한판보기</label>';
		}
		checked = "";
		if(practiceList[i].practice_type==practice_code) checked = "checked";
		vHtml += '<input type="radio" class="css-input-radio-checkbox" name="search_practice" id="search_practice_'+nSeq+'" value="'+practiceList[i].practice_type+'" '+checked+'>';
		vHtml += '<label class="css-input-radio-checkbox-label" for="search_practice_'+nSeq+'">'+practiceList[i].practice_name+'</label>';
		nSeq++;
	}
	
	if(section_code=="exam")
	{
		checked="";
		if(practice_code == "toefl_batch_exam") checked = "checked";
		vHtml += '<input type="radio" class="css-input-radio-checkbox" name="search_practice" id="search_practice_'+nSeq+'" value="toefl_batch_exam" '+checked+'>';
		vHtml += '<label class="css-input-radio-checkbox-label" for="search_practice_'+nSeq+'">반배치고사</label>';
		nSeq++;
		
		checked="";
		if(practice_code == "toefl_mock_exam") checked = "checked";
		vHtml += '<input type="radio" class="css-input-radio-checkbox" name="search_practice" id="search_practice_'+nSeq+'" value="toefl_mock_exam" '+checked+'>';
		vHtml += '<label class="css-input-radio-checkbox-label" for="search_practice_'+nSeq+'">모의토플</label>';
		nSeq++;
		
		checked="";
		if(practice_code == "toefl_real_exam") checked = "checked";
		vHtml += '<input type="radio" class="css-input-radio-checkbox" name="search_practice" id="search_practice_'+nSeq+'" value="toefl_real_exam" '+checked+'>';
		vHtml += '<label class="css-input-radio-checkbox-label" for="search_practice_'+nSeq+'">실제토플</label>';
		nSeq++;
		
	}
	vHtml+= '	</div>';
	vHtml+= '</div>';
	$("#search_archeive").html(vHtml);
	
	$("input[name='search_section']").click(function(){
		var section = $("input[name='search_section']:checked").val();
		if(section == "send"){
			location.href = "./achievement_new_action.do?orientation_code=send&&course_id="+course_id;
		}else if(section == "homework"){
			location.href = "./achievement_new_action.do?orientation_code=homework&&course_id="+course_id;
		}else if(section == "exam"){
			location.href = "./achievement_new_action.do?orientation_code=toefl_batch_exam&&course_id="+course_id;
		}else if(section == "photo"){
			location.href = "./achievement_new_action.do?orientation_code=photo&&course_id="+course_id;
		}else{
			if(archieve[section]){
				location.href = "./achievement_new_action.do?orientation_code="+archieve[section].code+"&&course_id="+course_id;
			}else{
				location.href = "./achievement_new_action.do?orientation_code=all_practice&&section="+section+"&&course_id="+course_id;
			}
		}
	});
	
	$("input[name='search_practice']").click(function(){
		var section = $("input[name='search_section']:checked").val();
		var practice_type = $("input[name='search_practice']:checked").val();
		if(section == "exam"){
			location.href = "./achievement_new_action.do?orientation_code="+practice_type+"&&course_id="+course_id;
		}else{
			if(practice_type == "all_practice")
			{
				location.href = "./achievement_new_action.do?orientation_code=all_practice&&section="+section+"&&course_id="+course_id;
			}else{
				if(practice_type == "BLUEPRINT"){
					location.href = "./achievement_new_action.do?orientation_code=practice_blueprint&&section="+section+"&&practice_type="+practice_type+"&&course_id="+course_id;
				}else{
					if(monthly_list.indexOf(practice_type) >= 0){
						location.href = "./achievement_new_action.do?orientation_code=practice_monthly&&section="+section+"&&practice_type="+practice_type+"&&course_id="+course_id;
					}else if(monthly_list_type.indexOf(practice_type) >= 0){
						location.href = "./achievement_new_action.do?orientation_code=practice_grammar&&section="+section+"&&practice_type="+practice_type+"&&course_id="+course_id;
					}else{
						location.href = "./achievement_new_action.do?orientation_code=practice&&section="+section+"&&practice_type="+practice_type+"&&course_id="+course_id;
					}
				}
			}
		}
	});
	
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
			var courseList = data.courseList;
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
	
	location.href = "./achievement_new_action.do?orientation_code=ot&&course_id="+course_id;
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

function form_course_cancel()
{
	/*
	$('#select_courses').hide(); 
	$('#mask').hide(); 
	$('#mask').remove();
	*/
	$('#select_courses').modal("hide"); 
}

var vStudentType = "";
var vSeq = 1;
function create_student_info_achieve(enrollmentInfo, courseInfo, classCountList, v_date)
{
	var course_enrollment_id = enrollmentInfo.course_enrollment_id;
	var student_id = enrollmentInfo.student_id;
	var user_id = enrollmentInfo.user_id;
	
	var nClassH = 0;
	var nClassM = 0;
	
	var student_type = courseInfo.student_type; 
	var lecture_type = courseInfo.lecture_type; 
	var difficulty = courseInfo.difficulty; 
	if(courseInfo.name == "S3") difficulty = 2;
	if(student_type == "SENIOR"){
		nClassH = senior_regular_class_list[difficulty-1][1];
		nClassM = senior_regular_class_list[difficulty-1][0];
	}else{
		if(lecture_type == "SPECIAL"){
			nClassH = junior_special_class_list[difficulty-1][1];
			nClassM = junior_special_class_list[difficulty-1][0];
		}else{
			nClassH = junior_regular_class_list[difficulty-1][1];
			nClassM = junior_regular_class_list[difficulty-1][0];
		}
	}
	
	var c_idx = classCountList.findIndex(t => t.student_id == student_id && t.student_type == student_type && t.difficulty == difficulty);
	
	var class_count = 0;
	
	if(c_idx >=0 ){
		class_count = classCountList[c_idx].class_count;	
	}
	
	var class_list = classCountList.filter(function(item, index){
		if(item.student_id == student_id && item.student_type == student_type){
			return true;
		}
	});
	
	var all_class_count = 0;
	for(var k=0; k<class_list.length; k++)
	{
		all_class_count += class_list[k].class_count;
	}
	var class_clazz = "";
	
	if(class_count > nClassH){
		class_clazz = "bg-red text-white";
	}else if(class_count > nClassM){
		class_clazz = "bg-yellow";
	}
	
	var sReg = "신규";
	if(enrollmentInfo.registration_type != "NEW"){
		sReg = "기존";
	}
	
	var sUserNm = enrollmentInfo.last_name+enrollmentInfo.first_name;
	if(enrollmentInfo.chamgang_yn == "Y"){
		sUserNm += "(참강)";
	}
	
	var vClassType = enrollmentInfo.class_gubun;
	if(vClassType != vStudentType){
		vStudentType = vClassType;
		vSeq = 1;
	}
	if(vClassType=="반이동"){
		class_clazz = 'bg-black-transparent-3';
	}
	if(vClassType=="환불"){
		class_clazz = 'bg-black-transparent-5';
	}
	var vHtml = "";
	vHtml += '			<td class="text-center '+class_clazz+'" style="width:60px;">'+vClassType+'</td>';
	vHtml += '			<td class="text-center '+class_clazz+'" style="width:60px;">'+vSeq+'</td>';
	vHtml += '			<td class="text-center '+class_clazz+'" style="width:100px;"><a href="javascript:student_achieve(\''+enrollmentInfo.username+'\','+enrollmentInfo.course_enrollment_id+',\''+v_date+'\')">'+sUserNm+'</a></td>';
	vHtml += '			<td class="text-center '+class_clazz+'" style="width:80px;">';
	vHtml += cfmLpad(class_count+"",3," ")+'회 / '+cfmLpad(all_class_count+"",3," ")+'회('+sReg+')<br>';
	vHtml += '<button type="button" class="btn btn-primary btn-xs" onClick="move_counseling_card('+user_id+')">상담카드</button>';
	vHtml += '			</td>';
	
	vSeq++;
	return vHtml;
}

function create_student_info(enrollmentInfo, courseInfo, classCountList)
{
	var course_enrollment_id = enrollmentInfo.course_enrollment_id;
	var student_id = enrollmentInfo.student_id;
	var user_id = enrollmentInfo.user_id;
	
	var nClassH = 0;
	var nClassM = 0;
	
	var student_type = courseInfo.student_type; 
	var lecture_type = courseInfo.lecture_type; 
	var difficulty = courseInfo.difficulty; 
	if(courseInfo.name == "S3") difficulty = 2;
	if(student_type == "SENIOR"){
		nClassH = senior_regular_class_list[difficulty-1][1];
		nClassM = senior_regular_class_list[difficulty-1][0];
	}else{
		if(lecture_type == "SPECIAL"){
			nClassH = junior_special_class_list[difficulty-1][1];
			nClassM = junior_special_class_list[difficulty-1][0];
		}else{
			nClassH = junior_regular_class_list[difficulty-1][1];
			nClassM = junior_regular_class_list[difficulty-1][0];
		}
	}
	
	var c_idx = classCountList.findIndex(t => t.student_id == student_id && t.student_type == student_type && t.difficulty == difficulty);
	
	var class_count = 0;
	
	if(c_idx >=0 ){
		class_count = classCountList[c_idx].class_count;	
	}
	
	var class_list = classCountList.filter(function(item, index){
		if(item.student_id == student_id && item.student_type == student_type){
			return true;
		}
	});
	
	var all_class_count = 0;
	for(var k=0; k<class_list.length; k++)
	{
		all_class_count += class_list[k].class_count;
	}
	var class_clazz = "";
	
	if(class_count > nClassH){
		class_clazz = "bg-red text-white";
	}else if(class_count > nClassM){
		class_clazz = "bg-yellow";
	}
	
	var sReg = "신규";
	if(enrollmentInfo.registration_type != "NEW"){
		sReg = "기존";
	}
	
	var sUserNm = enrollmentInfo.last_name+enrollmentInfo.first_name;
	if(enrollmentInfo.chamgang_yn == "Y"){
		sUserNm += "(참강)";
	}
	
	var vClassType = enrollmentInfo.class_gubun;
	if(vClassType != vStudentType){
		vStudentType = vClassType;
		vSeq = 1;
	}
	if(vClassType=="반이동"){
		class_clazz = 'bg-black-transparent-3';
	}
	if(vClassType=="환불"){
		class_clazz = 'bg-black-transparent-5';
	}
	var vHtml = "";
	vHtml += '			<td class="text-center '+class_clazz+'" style="width:60px;">'+vClassType+'</td>';
	vHtml += '			<td class="text-center '+class_clazz+'" style="width:60px;">'+vSeq+'</td>';
	vHtml += '			<td class="text-center '+class_clazz+'" style="width:100px;"><a href="javascript:student_login(\''+enrollmentInfo.username+'\','+enrollmentInfo.course_enrollment_id+')">'+sUserNm+'</a></td>';
	vHtml += '			<td class="text-center '+class_clazz+'" style="width:80px;">';
	vHtml += cfmLpad(class_count+"",3," ")+'회 / '+cfmLpad(all_class_count+"",3," ")+'회('+sReg+')<br>';
	vHtml += '<button type="button" class="btn btn-primary btn-xs" onClick="move_counseling_card('+user_id+')">상담카드</button>';
	vHtml += '			</td>';
	vSeq++;
	return vHtml;
}

function move_counseling_card(v_user_id)
{
	window.open("/enrollment/counseling_card.do?user_id="+v_user_id, "counseling_card");
}

function move_result(section, practice_type,course_enrollment_id, date, book, volume, group, article, end_paragraph)
{
	if(!end_paragraph) end_paragraph = 0;
	if((section == "SPEAKING" || section == "WRITING") && practice_type == "MOCK_TEST" )
	{
		go_result_correction(section, practice_type,course_enrollment_id, date, book, volume, group, article);
	}
	//지문 화면으로 변경
	$.ajax({
		type : "POST",
		data:{
			course_id:$("#course_id").val(),
			section:section,
			practice_type:practice_type,
			course_enrollment_id:course_enrollment_id,
			date:date,
			book:book,
			volume:volume,
			group:group,
			article:article,
			end_paragraph:end_paragraph,
		},
		url : "/enrollment/getPracticeResultList.do",
		success:function(data){	
			var practiceList = data.practiceList;
			var typeList = data.typeList;
			if(practiceList.length > 0){
				if(practiceList.length == 1){
					go_result(practiceList[0].section, practiceList[0].practice_type, practiceList[0].id);
				}else{
					var vHtml = "";
					for(var i=0; i<practiceList.length; i++)
					{
						var vTitle = "[";
						vTitle += practiceList[i].book;
						if(practiceList[i].volume) vTitle += ' '+practiceList[i].volume;
						if(practiceList[i].group) vTitle += ' '+practiceList[i].group;
						if(practiceList[i].article) vTitle += ' '+practiceList[i].article;
						vTitle += "]";
						
						if(practiceList[i].section=="GRAMMAR" && practiceList[i].practice_type=="MOCK_TEST"){
							vTitle += ' SW1:'+practiceList[i].score1+'/'+practiceList[i].total_score1+', SW2:'+practiceList[i].score2+'/'+practiceList[i].total_score2;
						}else{
							vTitle += ' '+practiceList[i].score+'/'+practiceList[i].total_score;
						}
						vTitle += ' ('+practiceList[i].date+')';
						vHtml += '<li>';
						vHtml += '<a href="javascript:go_result(\''+practiceList[i].section+'\',\''+practiceList[i].practice_type+'\',\''+practiceList[i].id+'\')">';
						vHtml += vTitle;
						vHtml += '</a>';
						vHtml += '</li>';
					}
					$("#result_list").html(vHtml);
					$("#modal-result").modal();
				}
			}else{
				var c_idx = typeList.findIndex(t => t.practice_type == practice_type);
				if(typeList[c_idx].program_use != "Y"){
					is_ox_test(section, practice_type,course_enrollment_id, date, book, volume, group, article, end_paragraph);
				}
				
			}
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

var v_course_enrollment_id;
var v_section;
var v_practice_type;
var v_practice_schedule_id;
var v_passage;
var v_result;
var v_pass_result;
var v_is_passage = true;

function is_ox_test(section, practice_type,course_enrollment_id, date, book, volume, group, article, end_paragraph)
{
	if(!date || date == cfmGetToDate())
	{
		//지문 화면으로 변경
		$.ajax({
			type : "POST",
			data:{
				course_enrollment_id:course_enrollment_id,
				section:section,
				practice_type:practice_type,
				book:book,
				volume:volume,
				group:group,
				article:article,
				end_paragraph:end_paragraph,
			},
			url : "/enrollment/getPracticeScheduleOxEnrollment.do",
			success:function(data){	
				if(data.id){
					v_course_enrollment_id = course_enrollment_id;
					v_section = section;
					v_practice_type = practice_type;
					v_practice_schedule_id = data.id;
					create_combo_exam();
					$("#modal-select-mode").modal();
				}
			},
			error:function(event){				
				alert("잠시후 다시 시도 바랍니다.");
			}
		});
	}
}

function complete_mode_student(vGubun)
{
	var pass_result = false;

	if(vGubun == "O"){
		pass_result = true;
	}
	var passage = "";
	if(v_is_passage){
		passage = $("#mode_select_passage").val();
	}
	$.ajax({
		type : "POST",
		url : "/enrollment/savePracticeQuizResult.do",
		data:{
			section:v_section,
			practice_type:v_practice_type,
			pass_result:pass_result,
			result:vGubun,
			course_enrollment_id:v_course_enrollment_id,
			practice_schedule_id:v_practice_schedule_id,
			passage:passage
		},
		success:function(data){
			close_select_mode();	
			location.reload();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
	
	
}

function close_select_mode()
{
	$("#modal-select-mode").modal("hide");
}

function create_combo_exam()
{
	if(exam_type1[v_practice_type]){
		v_is_passage = true;
		var vHtml2 = "";
		for(var i=0; i<exam_type1[v_practice_type].length;i++)
		{
			vHtml2 += '<option value="'+exam_type1[v_practice_type][i]+'">'+exam_type1[v_practice_type][i]+'</option>';
		}
		$("#mode_select_passage").html(vHtml2);
		
		$("#mode_select_passage").show();
	}else{
		if(section_exam_type1[v_section]){
			var section_exam_practice_type = section_exam_type1[v_section];
			if(section_exam_practice_type[v_practice_type])
			{
				v_is_passage = true;
				var vHtml2 = "";
				for(var i=0; i<section_exam_practice_type[v_practice_type].length;i++)
				{
					vHtml2 += '<option value="'+section_exam_practice_type[v_practice_type][i]+'">'+section_exam_practice_type[v_practice_type][i]+'</option>';
				}
				$("#mode_select_passage").html(vHtml2);
				
				$("#mode_select_passage").show();
			}else{
				v_is_passage = false;
				$("#mode_select_passage").hide();
			}
		}else{
			v_is_passage = false;
			$("#mode_select_passage").hide();
		}
	}	
}
function go_result(section, practice_type, practice_result_id)
{
	var url;
	var exam_url = "http://exam-us.usher.co.kr/";
	if(practice_type == "VOCA"){
		url = exam_url + "/exam/voca/result.do?id="+practice_result_id;
	}else if(practice_type == "VOCA_INTERVAL"){
		url = exam_url + "/exam/voca_interval/result.do?id="+practice_result_id;
	}else if(practice_type == "SPEECH"){
		url = exam_url + "/study/speech/result_exam.do?id="+practice_result_id;
	}else if(practice_type == "BLUEPRINT"){
		url = exam_url + "/exam/blueprint/test/result.do?id="+practice_result_id;
	}else if(practice_type == "PASSAGE_PHRASE"){
		url = exam_url + "/exam/passage/result.do?id="+practice_result_id;
	}else if(practice_type == "PASSAGE_VOCA"){
		url = exam_url + "/exam/passage/result.do?id="+practice_result_id;
	}else if(practice_type == "GRAMMAR_SYNTAX"){
		url = exam_url + "/exam/chain/test/result.do?id="+practice_result_id;
	}else if(practice_type == "DICTATION"){
		url = exam_url + "/exam/dictation/result.do?id="+practice_result_id;
	}else if(practice_type == "TENTIMES"){
		url = exam_url + "/exam/stt/result.do?id="+practice_result_id;
	}else if(section == "GRAMMAR" && practice_type == "MOCK_TEST"){
		url = exam_url + "/exam/grammar/test/review.do?id="+practice_result_id;
	}else if(section == "READING" && practice_type == "MOCK_TEST"){
		url = exam_url + "/exam/reading/test/review.do?id="+practice_result_id;
	}else if(section == "LISTENING" && practice_type == "MOCK_TEST"){
		url = exam_url + "/exam/listening/test/review.do?id="+practice_result_id;
	}else{
		url = exam_url + "/exam/memorization/result.do?id="+practice_result_id;
	}
	
	window.open(url, "exam");
}

function go_result_correction(section, practice_type,course_enrollment_id, date, book, volume, group, article)
{
	$.ajax({
		type : "POST",
		url : "/correction/getCorrectionExamsAnswerAsResult.do",
		data:{
			section:section,
			practice_type:practice_type,
			course_enrollment_id:course_enrollment_id,
			date:date,
			book:book,
			volume:volume,
			group:group,
			article:article
		},
		success:function(data){
			if(data){
				var url = "";
				if(section == "SPEAKING"){
					url = "/correction/correct/correct_speaking.do";
				}else if(section == "WRITING"){
					url = "/correction/correct/correct_writing.do";
				}
				window.open(url+"?id="+data.id, "exam");
			}
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}
var s_username;
var s_course_enrollment_id;
function student_login(username, course_enrollment_id)
{
	s_username = username;
	s_course_enrollment_id = course_enrollment_id;
	$.ajax({
		type : "POST",
		url : "/common/getCourseenrollmentAttend.do",
		data:{
			course_enrollment_id:course_enrollment_id
		},
		success:function(data){
			if(data.status == "UNPERMITTED_ABSENT" || data.status == "PERMITTED_ABSENT" ){
				swal({
					title: '미출석',
					text: '이 학생은 아직 출석처리되지 않은 학생입니다.\n직원이 로그인 하게되면 학생이 출석처리가 되어버립니다.\n그래도 로그인 하시겠습니까?',
					icon: 'info',
					buttons: {
						cancel: {
							text: '아니오',
							value: null,
							visible: true,
							className: 'btn btn-default',
							closeModal: true,
						},
						confirm: {
							text: '로그인',
							value: true,
							visible: true,
							className: 'btn btn-primary',
							closeModal: true
						}
					}
				}).then((confirm) => {
				    if (confirm) {
						var exam_url = "http://exam-us.usher.co.kr/";
						//var exam_url = "http://127.0.0.1:8080/";
						var url = exam_url + "/member/login_manage.do?username="+s_username+"&&course_enrollment_id="+s_course_enrollment_id;
						window.open(url, "student_exam");
				    }
				});
			}else{
				var exam_url = "http://exam-us.usher.co.kr/";
				//var exam_url = "http://127.0.0.1:8080/";
				var url = exam_url + "/member/login_manage.do?username="+s_username+"&&course_enrollment_id="+s_course_enrollment_id;
				window.open(url, "student_exam");
			}
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
	
}

function student_achieve(username, course_enrollment_id, v_datae)
{
	var exam_url = "http://exam-us.usher.co.kr/";
	//var exam_url = "http://127.0.0.1:8080/";
	var url = exam_url + "/achieve/achieve_main.do?username="+username+"&&course_enrollment_id="+course_enrollment_id+"&&date="+v_datae;
	window.open(url, "student_achieve");
}
function showAchieve(v_course_enrollment_id, v_date)
{
	var options = 'toolbar=no,location=no,width=450,height=600,resizable=no,scrollbars=no,status=no';
	window.open('https://exam-us.usher.co.kr/achieve/achieve.do?course_enrollment_id='+v_course_enrollment_id+'&&date='+v_date,'achieve',options);
}