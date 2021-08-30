var array_test = [
	["토플<br>전체"			,"TOEFL"	,"SENIOR"	,"NONE",	3],
	["주니어 토플<br>전체"	,"TOEFL"	,"JUNIOR"	,"NONE",	3],
	["토익<br>전체"		,"TOEIC"	,"SENIOR"	,"NONE",	2]
];

var array_test_sub = [
	["토플 종합반<br>&nbsp;"		,"TOEFL"	,"SENIOR"	,"REGULAR"			,1,	"종합반"],
	["토플 종합반<br>Light"			,"TOEFL"	,"SENIOR"	,"LIGHT"			,1,	"종합반 Light"],
	["토플 단과반<br>&nbsp;"		,"TOEFL"	,"SENIOR"	,"SINGLE"			,1,	"단과반"],
	["주니어 토플<br>정규 월/수/금"	,"TOEFL"	,"JUNIOR"	,"REGULAR_MON_FRI"	,1,	"정규 월/수/금"],
	["주니어 토플<br>정규 화/목"		,"TOEFL"	,"JUNIOR"	,"REGULAR_TUE_THU"	,1,	"정규 화/목"],
	["주니어 토플<br>방학특강"		,"TOEFL"	,"JUNIOR"	,"SPECIAL"			,1,	"방학특강"],
	["토익 종합반<br>&nbsp;"		,"TOEIC"	,"SENIOR"	,"REGULAR"			,1,	"종합반"],
	["토익 단과반<br>&nbsp;"		,"TOEIC"	,"SENIOR"	,"SINGLE"			,1,	"단과반"]
];

var test_type;
var student_type;
var course_group;
var search_type;
var course_days;
var start_ym;
var end_ym;

jQuery(document).ready(function(){
 
    var today = new Date();   

	var year = today.getFullYear(); // 년도
	var fYear = year - 2;
	var month = today.getMonth() + 1;  // 월
	
	var nSeq = 1;
	
	var vHtml = "";
	vHtml += '<div class="row">';
	for(var i=0; i<array_test.length; i++){
		var checked = "";
		if(i == 0 ) checked = "checked";
		vHtml += '	<div class="col-'+array_test[i][4]+' ">';
		vHtml += '		<input type="radio" class="css-input-radio-checkbox" name="search_test" id="search_test_'+nSeq+'" value="'+array_test[i][1]+','+array_test[i][2]+','+array_test[i][3]+'" '+checked+'>';
		vHtml += '		<label class="css-input-radio-checkbox-label" for="search_test_'+nSeq+'">'+array_test[i][0]+'</label>';
		vHtml += '	</div>';
		nSeq++;
	}
	vHtml += '	<div class="col-1">';
	vHtml += '		<input type="radio" class="css-input-radio-checkbox" name="search_type" id="search_type_1" value="ENROLLMENT" checked>';
	vHtml += '		<label class="css-input-radio-checkbox-label" for="search_type_1">수강학생<br>&nbsp;</label>';
	vHtml += '	</div>';
	vHtml += '	<div class="col-1">';
	vHtml += '		<input type="radio" class="css-input-radio-checkbox" name="search_type" id="search_type_2" value="BATCH">';
	vHtml += '		<label class="css-input-radio-checkbox-label" for="search_type_2">상담학생<br>&nbsp;</label>';
	vHtml += '	</div>';
	
	vHtml += '</div>';

	vHtml += '<div class="row">';
	for(var i=0; i<array_test_sub.length; i++){
		vHtml += '	<div class="col-'+array_test_sub[i][4]+'">';
		vHtml += '		<input type="radio" class="css-input-radio-checkbox" name="search_test" id="search_test_'+nSeq+'" value="'+array_test_sub[i][1]+','+array_test_sub[i][2]+','+array_test_sub[i][3]+'">';
		vHtml += '		<label class="css-input-radio-checkbox-label" for="search_test_'+nSeq+'">'+array_test_sub[i][0]+'</label>';
		vHtml += '	</div>';
		nSeq++;
	}	
	
	vHtml += '	<div class="col-3">';
	vHtml += '		<div class="form-inline">';
	vHtml += '			<div class="form-group m-r-10">';
	vHtml += '				<select id="start_year" class="form-control form-control-lg">';
	for(var i=year; i>= year-10; i--)
	{
		var selected = "";
		//if(i == fYear) selected = "selected";
		if(i == year) selected = "selected";
		vHtml += '<option value="'+i+'" '+selected+'>'+i+'년</option>';
	}
	vHtml += '				</select>';
	vHtml += '			</div>';
	vHtml += '			<div class="form-group m-r-10">';
	vHtml += '				<select  id="start_month" class="form-control form-control-lg">';
	for(var i=1; i<= 12; i++)
	{
		var vMon = ""+i;
		if(i< 10) vMon = "0"+i;
		
		var selected = "";
		if(i == month) selected = "selected";
		
		vHtml += '<option value="'+vMon+'" '+selected+'>'+i+'월</option>';
	}
	vHtml += '				</select>';
	vHtml += '			</div> ~ ';
	vHtml += '			<div class="form-group m-r-10 m-l-10">';
	vHtml += '				<select id="end_year" class="form-control form-control-lg">';
	for(var i=year; i>= year-10; i--)
	{
		var selected = "";
		if(i == year) selected = "selected";
		vHtml += '<option value="'+i+'" '+selected+'>'+i+'년</option>';
	}
	vHtml += '				</select>';
	vHtml += '			</div>';
	vHtml += '			<div class="form-group m-r-10">';
	vHtml += '				<select id="end_month" class="form-control form-control-lg">';
	for(var i=1; i<= 12; i++)
	{
		var vMon = ""+i;
		if(i< 10) vMon = "0"+i;
		
		var selected = "";
		if(i == month) selected = "selected";
		
		vHtml += '<option value="'+vMon+'" '+selected+'>'+i+'월</option>';
	}
	vHtml += '				</select>';
	vHtml += '			</div>';
	vHtml += '		</div>';
	vHtml += '	</div>';
	
	vHtml += '	<div class="col-1" style="padding-top:5px">';
	vHtml += '		<button type="button" class="btn btn-primary form-control" onclick="form_search()"><i class="fa fa-search fa-fw"></i> Search</button>';
	vHtml += '	</div>';
	vHtml += '</div>';
	
	
	$("#search_area").html(vHtml);
	
	$("input[name='search_test']").click(function(){
		form_search();
	});
	
	$("input[name='search_type']").click(function(){
		form_search();
	});
	
	form_search();
});

function form_search()
{
	search_type = $("input[name='search_type']:checked").val();
	var search_test = $("input[name='search_test']:checked").val();
	var array_search_test = search_test.split(",");
	test_type = array_search_test[0];
	student_type = array_search_test[1];
	course_group = array_search_test[2];
	if(test_type == "NONE") test_type = "";
	if(student_type == "NONE") student_type = "";
	if(course_group == "NONE") course_group = "";
	
	start_ym = $("#start_year").val()+"-"+$("#start_month").val();
	end_ym   = $("#end_year").val()+"-"+$("#end_month").val();
	course_days = "";
	if(search_type != "BATCH")
	{
		if(course_group == "REGULAR_MON_FRI"){
			course_group = "REGULAR";
			course_days = "2,4,6";
		}else if(course_group == "REGULAR_TUE_THU"){
			course_group = "REGULAR";
			course_days = "3,5";
		}
	}	
	var url = "/stats/getStatsSchoolAllList.do";
	if(search_type == "BATCH") url = "/stats/getStatsBatchSchoolAllList.do";
	$.ajax({
		type : "POST",
		url : url,
		data:{
			test_type:test_type,
			student_type:student_type,
			course_group:course_group,
			course_days:course_days,
			start_ym:start_ym,
			end_ym:end_ym
		},
		success:function(data){
			var tCnt = 0;
			var dCnt = 0;
			var fCnt = 0;
			for(var i=0; i<data.domesticArea1List.length; i++)
			{
				tCnt += data.domesticArea1List[i].stat_count1;
				dCnt += data.domesticArea1List[i].stat_count1;
			}
			
			for(var i=0; i<data.foreginArea1List.length; i++)
			{
				tCnt += data.foreginArea1List[i].stat_count1;
				fCnt += data.foreginArea1List[i].stat_count1;
			}
			
			createArea1(data.domesticArea1List, "D");
			createArea2(data.domesticArea2List, "D");
			createSchool(data.domesticSchoolList, "D")
			createArea1(data.foreginArea1List, "F");
			createArea2(data.foreginArea2List, "F");
			createSchool(data.foreginSchoolList, "F")
			
			$("#school_total_count").html("(합계 : "+tCnt+"명)");
			$("#school_total_d_count").html("(합계 : "+dCnt+"명)");
			$("#school_total_f_count").html("(합계 : "+fCnt+"명)");
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function createArea1(resultList, v_gubun)
{
	var vClass = "";
	if(v_gubun == "D"){
		vClass = "domestic_area1";
	}else{
		vClass = "foregin_area1";
	}
	
	var vHtml = "";
	for(var i=0; i<resultList.length; i++)
	{
		if(i==0){
			vHtml += '<tr class="'+vClass+' table-info" style="cursor:pointer">';
		}else{
			vHtml += '<tr class="'+vClass+'" style="cursor:pointer">';
		}
		vHtml += '<input type="hidden" name="area1" value="'+resultList[i].area1+'">';
		vHtml += '<td style="width:150px;">'+resultList[i].area1+'</td>';
		vHtml += '<td style="width:82px;">'+resultList[i].stat_count1+'명('+resultList[i].stat_rate1+'%)</td>';
		vHtml += '</tr>';
	}
	
	if(v_gubun == "D"){
		$("#domesticArea1").html(vHtml);
		$('.domestic_area1').click(function(e){
			$('.domestic_area1').removeClass("table-info");
			$(this).addClass("table-info");
			var v_area = $(this).find("input[name=area1]").val();
			search_area1("D", v_area);
		});
		
	}else{
		$("#foreginArea1").html(vHtml);
		$('.foregin_area1').click(function(e){
			$('.foregin_area1').removeClass("table-info");
			$(this).addClass("table-info");
			var v_area = $(this).find("input[name=area1]").val();
			search_area1("F", v_area);
		});
	}
}

function search_area1(v_gubun, area1)
{
	var foreign_gubun = "";
	if(v_gubun == "D"){
		foreign_gubun = "국내";
	}else{
		foreign_gubun = "해외";
	}
	
	var url = "/stats/getStatsSchoolArea1AllList.do";
	if(search_type == "BATCH") url = "/stats/getStatsBatchSchoolArea1AllList.do";
	
	$.ajax({
		type : "POST",
		url : url,
		data:{
			test_type:test_type,
			student_type:student_type,
			course_group:course_group,
			course_days:course_days,
			start_ym:start_ym,
			end_ym:end_ym,
			foreign_gubun:foreign_gubun,
			area1:area1
		},
		success:function(data){
			createArea2(data.area2List, v_gubun);
			createSchool(data.schoolList, v_gubun)

		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function createArea2(resultList, v_gubun)
{
	var vClass = "";
	if(v_gubun == "D"){
		vClass = "domestic_area2";
	}else{
		vClass = "foregin_area2";
	}
	
	var vHtml = "";
	for(var i=0; i<resultList.length; i++)
	{
		if(i==0){
			vHtml += '<tr class="'+vClass+' table-info" style="cursor:pointer">';
		}else{
			vHtml += '<tr class="'+vClass+'" style="cursor:pointer">';
		}
		vHtml += '<input type="hidden" name="area1" value="'+resultList[i].area1+'">';
		vHtml += '<input type="hidden" name="area2" value="'+resultList[i].area2+'">';
		vHtml += '<td style="width:150px;">'+resultList[i].area2+'</td>';
		vHtml += '<td style="width:82px;">'+resultList[i].stat_count1+'명('+resultList[i].stat_rate1+'%)</td>';
		vHtml += '</tr>';
	}

	if(v_gubun == "D"){
		$("#domesticArea2").html(vHtml);
		$('.domestic_area2').click(function(e){
			$('.domestic_area2').removeClass("table-info");
			$(this).addClass("table-info");
			var v_area1 = $(this).find("input[name=area1]").val();
			var v_area2 = $(this).find("input[name=area2]").val();
			search_area2("D", v_area1, v_area2);
		});
		
	}else{
		$("#foreginArea2").html(vHtml);
		$('.foregin_area2').click(function(e){
			$('.foregin_area2').removeClass("table-info");
			$(this).addClass("table-info");
			var v_area1 = $(this).find("input[name=area1]").val();
			var v_area2 = $(this).find("input[name=area2]").val();
			search_area2("F", v_area1, v_area2);
		});
	}
}

function search_area2(v_gubun, area1, area2)
{
	var foreign_gubun = "";
	if(v_gubun == "D"){
		foreign_gubun = "국내";
	}else{
		foreign_gubun = "해외";
	}
	
	var url = "/stats/getStatsSchoolArea2AllList.do";
	if(search_type == "BATCH") url = "/stats/getStatsBatchSchoolArea2AllList.do";
	
	$.ajax({
		type : "POST",
		url : url,
		data:{
			test_type:test_type,
			student_type:student_type,
			course_group:course_group,
			course_days:course_days,
			start_ym:start_ym,
			end_ym:end_ym,
			foreign_gubun:foreign_gubun,
			area1:area1,
			area2:area2
		},
		success:function(data){
			createSchool(data.schoolList, v_gubun)

		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function createSchool(resultList, v_gubun)
{
	console.log(resultList);
	var resultList1 = resultList.filter(function(item, index){
			if(item.school_gubun == "초등학교"){
				return true;
			}
	});
	var resultList2 = resultList.filter(function(item, index){
			if(item.school_gubun == "중학교"){
				return true;
			}
	});
	
	var resultList3 = resultList.filter(function(item, index){
			if(item.school_gubun == "고등학교"){
				return true;
			}
	});
	
	var resultList4 = resultList.filter(function(item, index){
			if(item.school_gubun == "대학교"){
				return true;
			}
	});
	
	var resultList5 = resultList.filter(function(item, index){
			if(item.school_gubun == "대학원"){
				return true;
			}
	});

	var resultList6 = resultList.filter(function(item, index){
			if(item.school_gubun == "기타" || item.school_gubun == "그외"){
				return true;
			}
	});
	var vHtml = "";
	var vCnt = 0;
	for(var i=0; i<resultList1.length; i++)
	{
		vCnt += resultList1[i].stat_count1;
		vHtml += '<tr>';
		vHtml += '<td style="width:150px;"><a href="javascript:go_school_form(\''+resultList1[i].foreign_gubun+'\',\''+resultList1[i].school_gubun+'\',\''+resultList1[i].area1+'\',\''+resultList1[i].area2+'\',\''+resultList1[i].school_name+'\')">'+resultList1[i].school_name+'</a></td>';
		vHtml += '<td style="width:82px;">'+resultList1[i].stat_count1+'명('+resultList1[i].stat_rate1+'%)</td>';
		vHtml += '</tr>';
	}
	if(v_gubun == "D"){
		$("#domesticSchoolCount1").html("(총 "+resultList1.length+"개 / "+vCnt+"명)");
		$("#domesticSchool1").html(vHtml);
	}else{
		$("#foreginSchoolCount1").html("(총 "+resultList1.length+"개 / "+vCnt+"명)");
		$("#foreginSchool1").html(vHtml);
	}
	
	vHtml = "";
	vCnt = 0;
	for(var i=0; i<resultList2.length; i++)
	{
		vCnt += resultList2[i].stat_count1;
		vHtml += '<tr>';
		vHtml += '<td style="width:150px;"><a href="javascript:go_school_form(\''+resultList2[i].foreign_gubun+'\',\''+resultList2[i].school_gubun+'\',\''+resultList2[i].area1+'\',\''+resultList2[i].area2+'\',\''+resultList2[i].school_name+'\')">'+resultList2[i].school_name+'</a></td>';
		vHtml += '<td style="width:82px;">'+resultList2[i].stat_count1+'명('+resultList2[i].stat_rate1+'%)</td>';
		vHtml += '</tr>';
	}
	if(v_gubun == "D"){
		$("#domesticSchoolCount2").html("(총 "+resultList2.length+"개 / "+vCnt+"명)");
		$("#domesticSchool2").html(vHtml);
	}else{
		$("#foreginSchoolCount2").html("(총 "+resultList2.length+"개 / "+vCnt+"명)");
		$("#foreginSchool2").html(vHtml);
	}

	vHtml = "";
	vCnt = 0;
	for(var i=0; i<resultList3.length; i++)
	{
		vCnt += resultList3[i].stat_count1;
		vHtml += '<tr>';
		vHtml += '<td style="width:150px;"><a href="javascript:go_school_form(\''+resultList3[i].foreign_gubun+'\',\''+resultList3[i].school_gubun+'\',\''+resultList3[i].area1+'\',\''+resultList3[i].area2+'\',\''+resultList3[i].school_name+'\')">'+resultList3[i].school_name+'</a></td>';
		vHtml += '<td style="width:82px;">'+resultList3[i].stat_count1+'명('+resultList3[i].stat_rate1+'%)</td>';
		vHtml += '</tr>';
	}
	if(v_gubun == "D"){
		$("#domesticSchoolCount3").html("(총 "+resultList3.length+"개 / "+vCnt+"명)");
		$("#domesticSchool3").html(vHtml);
	}else{
		$("#foreginSchoolCount3").html("(총 "+resultList3.length+"개 / "+vCnt+"명)");
		$("#foreginSchool3").html(vHtml);
	}
	
	vHtml = "";
	vCnt = 0;
	for(var i=0; i<resultList4.length; i++)
	{
		vCnt += resultList4[i].stat_count1;
		vHtml += '<tr>';
		vHtml += '<td style="width:150px;"><a href="javascript:go_school_form(\''+resultList4[i].foreign_gubun+'\',\''+resultList4[i].school_gubun+'\',\''+resultList4[i].area1+'\',\''+resultList4[i].area2+'\',\''+resultList4[i].school_name+'\')">'+resultList4[i].school_name+'</a></td>';
		vHtml += '<td style="width:82px;">'+resultList4[i].stat_count1+'명('+resultList4[i].stat_rate1+'%)</td>';
		vHtml += '</tr>';
	}
	if(v_gubun == "D"){
		$("#domesticSchoolCount4").html("(총 "+resultList4.length+"개 / "+vCnt+"명)");
		$("#domesticSchool4").html(vHtml);
	}else{
		$("#foreginSchoolCount4").html("(총 "+resultList4.length+"개 / "+vCnt+"명)");
		$("#foreginSchool4").html(vHtml);
	}
	
	vHtml = "";
	vCnt = 0;
	for(var i=0; i<resultList5.length; i++)
	{
		vCnt += resultList5[i].stat_count1;
		vHtml += '<tr>';
		vHtml += '<td style="width:150px;"><a href="javascript:go_school_form(\''+resultList5[i].foreign_gubun+'\',\''+resultList5[i].school_gubun+'\',\''+resultList5[i].area1+'\',\''+resultList5[i].area2+'\',\''+resultList5[i].school_name+'\')">'+resultList5[i].school_name+'</a></td>';
		vHtml += '<td style="width:82px;">'+resultList5[i].stat_count1+'명('+resultList5[i].stat_rate1+'%)</td>';
		vHtml += '</tr>';
	}
	if(v_gubun == "D"){
		$("#domesticSchoolCount5").html("(총 "+resultList5.length+"개 / "+vCnt+"명)");
		$("#domesticSchool5").html(vHtml);
	}else{
		$("#foreginSchoolCount5").html("(총 "+resultList5.length+"개 / "+vCnt+"명)");
		$("#foreginSchool5").html(vHtml);
	}
	
	vHtml = "";
	vCnt = 0;
	for(var i=0; i<resultList6.length; i++)
	{
		vCnt += resultList6[i].stat_count1;
		vHtml += '<tr>';
		vHtml += '<td style="width:150px;"><a href="javascript:go_school_form(\''+resultList6[i].foreign_gubun+'\',\''+resultList6[i].school_gubun+'\',\''+resultList6[i].area1+'\',\''+resultList6[i].area2+'\',\''+resultList6[i].school_name+'\')">'+resultList6[i].school_name+'</a></td>';
		vHtml += '<td style="width:82px;">'+resultList6[i].stat_count1+'명('+resultList6[i].stat_rate1+'%)</td>';
		vHtml += '</tr>';
	}
	if(v_gubun == "D"){
		$("#domesticSchoolCount6").html("(총 "+resultList6.length+"개 / "+vCnt+"명)");
		$("#domesticSchool6").html(vHtml);
	}else{
		$("#foreginSchoolCount6").html("(총 "+resultList6.length+"개 / "+vCnt+"명)");
		$("#foreginSchool6").html(vHtml);
	}
}

function go_school_form(school_foreign_gubun, school_gubun, school_area1, school_area2, school_name)
{
	window.open('http://manage.usher.co.kr/stats/school_detail.do?foreign_gubun='+school_foreign_gubun+"&&school_gubun="+school_gubun+"&&area1="+school_area1+"&&area2="+school_area2+"&&school_name="+school_name,'stats_school');
}
