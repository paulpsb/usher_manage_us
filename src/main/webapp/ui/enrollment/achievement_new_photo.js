/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	search_semester();
	form_init();
});

function form_init()
{
	var v_schedule = $("#course_schedule").val();
	
	var arr_schedule = v_schedule.split(",");
	var course_first_date = arr_schedule[0];
	
	$.ajax({
		type : "POST",
		url : "/enrollment/getAchieveOtList.do",
		data:{
			course_id : $("#course_id").val()
		},
		success:function(data){
			//상단화면을 그려준다.
			create_top_menu(data.sectionList, data.practiceAllList, "photo", "photo", $("#course_id").val(), data.courseInfo.student_type);
			
			var enrollmentList = data.enrollmentList;
			var courseInfo = data.courseInfo;
			var classCountList = data.classCountList;
			
			var vHtml = "";
			for(var i=0; i<enrollmentList.length; i++)
			{
				if(enrollmentList[i].class_gubun == "반이동"){
					if(enrollmentList[i].user_first_date == course_first_date){
						continue;
					}
				}
				
				var enrollmentInfo = enrollmentList[i];
				
				var course_enrollment_id = enrollmentInfo.course_enrollment_id;
				var student_id = enrollmentInfo.student_id;
				var user_id = enrollmentInfo.user_id;
				var photo = enrollmentInfo.photo;
				if(!photo) photo = "/assets/img/photo/no_photo.jpg";
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
				}else if(vClassType=="환불"){
					class_clazz = 'bg-black-transparent-5';
				}else{
					vClassType = "";
				}
				
				vHtml += '<div class="col-2 mb-2">';
				vHtml += '<table class="table table-bordered">';
				vHtml += '	<colgroup>';
				vHtml += '		<col style="width:25%;" />';
				vHtml += '		<col style="width:30%;" />';
				vHtml += '		<col style="width:45%;" />';
				vHtml += '	</colgroup>';
				vHtml += '	<tbody>';
				vHtml += '		<tr>';
				vHtml += '			<td colspan="3" style="text-align:center; vertical-align:middle;">';
				vHtml += '				<img src="'+photo+'" style="width:140px;">';
				vHtml += '			</td>';
				vHtml += '		</tr>';
				vHtml += '		<tr class="'+class_clazz+'">';
				vHtml += '			<td style="text-align:center; vertical-align:middle;">';
				vHtml += vClassType;
				vHtml += '			</td>';
				vHtml += '			<td style="text-align:center; vertical-align:middle;">';
				vHtml += '<a href="javascript:student_login(\''+enrollmentInfo.username+'\','+enrollmentInfo.course_enrollment_id+')">'+sUserNm+'</a>';
				vHtml += '			</td>';
				vHtml += '			<td style="text-align:center; vertical-align:middle;">';
				vHtml += cfmLpad(class_count+"",3," ")+'회 / '+cfmLpad(all_class_count+"",3," ")+'회('+sReg+')<br>';
				vHtml += '<button type="button" class="btn btn-primary btn-xs" onClick="move_counseling_card('+user_id+')">상담카드</button>';
				vHtml += '			</td>';
				vHtml += '		</tr>';
				vHtml += '	</tbody>';
				vHtml += '</table>';
				vHtml += '</div>';
			}
			
			$("#photo_info").html(vHtml);
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
	
}
