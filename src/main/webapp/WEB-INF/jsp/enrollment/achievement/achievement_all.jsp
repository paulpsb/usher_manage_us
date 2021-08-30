<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- ================== BEGIN PAGE LEVEL STYLE ================== -->
<link href="/assets/plugins/datatables.net-bs4/css/dataTables.bootstrap4.min.css" rel="stylesheet" />
<link href="/assets/plugins/datatables.net-fixedcolumns-bs4/css/fixedColumns.bootstrap4.css" rel="stylesheet" />
<!-- ================== END PAGE LEVEL STYLE ================== -->

<div class="row">
	<div class="col-xl-12">
		<div class="panel panel-inverse" data-sortable-id="table-basic-1">
			<div class="panel-heading">
				<h4 class="panel-title">한판보기</h4>
				<div class="panel-heading-btn">
					<h4 class="panel-title">${teacherInfo.user_name}</h4>
				</div>
			</div>
			<div class="panel-body">
				<div class="table-responsive" id="table_info">
					
				</div>
			</div>
		</div>
	</div>
</div>

<!-- ================== BEGIN PAGE LEVEL JS ================== -->
<script src="/assets/plugins/datatables.net/js/jquery.dataTables.min.js"></script>
<script src="/assets/plugins/datatables.net-bs4/js/dataTables.bootstrap4.min.js"></script>
<script src="/assets/plugins/datatables.net-fixedcolumns/js/dataTables.fixedColumns.js"></script>
<script src="/assets/plugins/datatables.net-fixedcolumns-bs4/js/fixedColumns.bootstrap4.js"></script>

<script>
jQuery(document).ready(function(){
	cfmShowLoadingBar();
	$("input[name=check_show]").click(function(){
		create_table();
	});
	
	
	create_table();
	
});

var courseInfo;
var dateList;
var date_count;
var cur_date;

var sectionList;
var practiceList;

var scheduleVocaList;
var scheduleList;

var attendList;
var speechList;
var vocaList;
var resultList;
var resultQuizList;

var classCountList;

var nClassH;
var nClassM;

var student_type; 
var lecture_type; 
var difficulty; 

var show_type;

var column_length;

var nWidth=130;

function create_table()
{
	show_type = $("input[name=check_show]:checked").val();
	
	$("#table_info").html("");
	$.ajax({
		type : "POST",
		url : "/enrollment/achievement/getAllList.do",
		data:{
			course_id : course_id
		},
		success:function(data){
			var vHtml = "";
			
			courseInfo = data.courseInfo;
			dateList = courseInfo.schedule.split(",");
			date_count = dateList.length;
			cur_date = courseInfo.cur_date;
			
			sectionList = data.sectionList;
			practiceList = data.practiceList;
			
			scheduleVocaList = data.scheduleVocaList;
			scheduleList = data.scheduleList;
			
			attendList = data.attendList;
			speechList = data.speechList;
			vocaList = data.vocaList;
			resultList = data.resultList;
			resultQuizList = data.resultQuizList;
			classCountList = data.classCountList;
			
			nClassH = 0;
			nClassM = 0;
			
			student_type = courseInfo.student_type; 
			lecture_type = courseInfo.lecture_type; 
			difficulty = courseInfo.difficulty; 
			
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
			
			var dHtml = "";
			var sHtml = "";
			var pHtml = "";
			var aHtml = "";
			
			vHtml += '<table id="example"  class="table table-bordered table-td-valign-middle m-b-0">';
			vHtml += '	<thead>';
			vHtml += '		<tr>';
			vHtml += '			<th class="text-center table-info" rowspan="4" style="width:40px;">상태</th>';
			vHtml += '			<th class="text-center table-info" rowspan="4" style="width:40px;">번호</th>';
			vHtml += '			<th class="text-center table-info" rowspan="4" style="width:80px;">이름</th>';
			vHtml += '			<th class="text-center table-info" rowspan="4" style="width:80px;">기존/신규</th>';
			column_length = 3;
			for(var i=date_count-1; i>=0; i--)
			{
				var nDayCount = 3;
				
				var v_date = dateList[i];
				if(cur_date < v_date) continue;
				var dayOfWeek = new Date(dateList[i]).getDay();
				
				//출결
				if(dayOfWeek == 1){
					sHtml += '			<th class="text-center table-success" rowspan="3" style="width:'+nWidth+'px;">출결</th>';
				}else{
					sHtml += '			<th class="text-center table-info" rowspan="3" style="width:'+nWidth+'px;">출결</th>';
				}
				column_length++;
				
				//발음/단어 체크
				var a_idx = scheduleVocaList.findIndex(t => t.date == v_date); 
				var v_volume = "";
				if(a_idx >= 0){
					v_volume = scheduleVocaList[a_idx].volume;
				}
				
				if(dayOfWeek == 1){
					sHtml += '			<th class="text-center table-success" colspan="2" style="width:'+(nWidth*2)+'px;">VOCA</th>';
					pHtml += '			<th class="text-center table-success" style="width:'+nWidth+'px;">발음</th>';
					pHtml += '			<th class="text-center table-success" style="width:'+nWidth+'px;">단어</th>';
					aHtml += '			<th class="text-center table-success" style="width:'+nWidth+'px;">'+v_volume+'</th>';
					aHtml += '			<th class="text-center table-success" style="width:'+nWidth+'px;">'+v_volume+'</th>';
				}else{
					sHtml += '			<th class="text-center table-info"colspan="2" style="width:'+(nWidth*2)+'px;">VOCA</th>';
					pHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">발음</th>';
					pHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">단어</th>';
					aHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">'+v_volume+'</th>';
					aHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">'+v_volume+'</th>';
				}
				
				//세션별 가져오기.
				for(var j=0;j<sectionList.length; j++)
				{
					if(sectionList[j].section == "VOCA") continue;
					var v_section =  sectionList[j].section;
					var nSectionCount = 0;
					
					var a_practice_type_list = practiceList.filter(function(item, index){
						if(item.section == v_section){
							return true;
						}
					});
					
					if(a_practice_type_list.length == 0) continue;
					
					for(var k=0; k<a_practice_type_list.length; k++)
					{
						var v_practice_type = a_practice_type_list[k].practice_type;
						var v_practice_name = a_practice_type_list[k].practice_name;
						var a_schedule_list = scheduleList.filter(function(item, index){
							if(item.section == v_section && item.practice_type == v_practice_type  && item.date == v_date){
								return true;
							}
						});
						if(a_schedule_list.length > 0){
							var nScheduleCount = a_schedule_list.length;
							nSectionCount += nScheduleCount;
							nDayCount += nScheduleCount;
							if(dayOfWeek == 1){
								pHtml += '			<th class="text-center table-success" colspan="'+nScheduleCount+'" style="width:'+(nWidth*nScheduleCount)+'px;">'+v_practice_name+'</th>';
							}else{
								pHtml += '			<th class="text-center table-info" colspan="'+nScheduleCount+'" style="width:'+(nWidth*nScheduleCount)+'px;">'+v_practice_name+'</th>';
							}
							
							for(var a=0; a<nScheduleCount; a++)
							{
								var v_title = '';
								/*
								if(a_schedule_list[a].short_title){
									v_title += a_schedule_list[a].short_title + '<br>';
								}
								*/
								v_title += a_schedule_list[a].book;
								
								if(a_schedule_list[a].volume){
									v_title += ' '+a_schedule_list[a].volume;
								}
								
								if(a_schedule_list[a].group){
									v_title += ' '+a_schedule_list[a].group;
								}
							
								if(a_schedule_list[a].article){
									v_title += ' '+a_schedule_list[a].article;
								}
								if(a_schedule_list[a].end_paragraph > 0){
									v_title += ' '+a_schedule_list[a].end_paragraph+'문단';
								}
								
								if(dayOfWeek == 1){
									aHtml += '			<th class="text-center table-success" style="width:'+nWidth+'px;">'+v_title+'</th>';
								}else{
									aHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">'+v_title+'</th>';
								}
								
							}
							
						}else{
							nSectionCount++;
							nDayCount++;
							
							if(dayOfWeek == 1){
								pHtml += '			<th class="text-center table-success" style="width:'+nWidth+'px;">'+v_practice_name+'</th>';
								aHtml += '			<th class="text-center table-success" style="width:'+nWidth+'px;">&nbsp;</th>';
							}else{
								pHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">'+v_practice_name+'</th>';
								aHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">&nbsp;</th>';
							}
						}
						
					}
					
					if(dayOfWeek == 1){
						sHtml += '			<th class="text-center table-success" colspan="'+nSectionCount+'" style="width:'+(nWidth*nSectionCount)+'px;">'+v_section+'</th>';
					}else{
						sHtml += '			<th class="text-center table-info"colspan="'+nSectionCount+'" style="width:'+(nWidth*nSectionCount)+'px;">'+v_section+'</th>';
					}
					
				}
				//날짜값 넣기
				if(dayOfWeek == 1){
					dHtml += '			<th class="text-center table-success" colspan="'+nDayCount+'" style="width:'+(nWidth*nDayCount)+'px;">'+v_date+'</th>';
				}else{
					dHtml += '			<th class="text-center table-info"colspan="'+nDayCount+'" style="width:'+(nWidth*nDayCount)+'px;">'+v_date+'</th>';
				}
			}
			
			vHtml += dHtml;
			vHtml += '		</tr>';
			vHtml += '		<tr>';
			vHtml += sHtml;
			vHtml += '		</tr>';
			vHtml += '		<tr>';
			vHtml += pHtml;
			vHtml += '		</tr>';
			vHtml += '		<tr>';
			vHtml += aHtml;
			vHtml += '		</tr>';
			vHtml += '	</thead>';
			vHtml += '	<tbody>';
			vHtml += create_paid_student(data.enrollmentList);
			vHtml += create_move_student(data.enrollmentMoveList);
			vHtml += create_refund_student(data.enrollmentRefundList);			
			vHtml += '	</tbody>';
			vHtml += '</table>';			
			$("#table_info").html(vHtml);

			cfmHideLoadingBar();

			$(".click_practice").click(function(e){
				var v_section = $(this).find("#section").val();	
				var v_practice_type = $(this).find("#practice_type").val();
				var v_course_enrollment_id = $(this).find("#course_enrollment_id").val();
				var v_date = $(this).find("#date").val();
				move_result(v_section, v_practice_type,v_course_enrollment_id, v_date, "", "", "", "", 0);
			});
			
			$("#example").tooltip({
				content: function() {
					return $(this).prop('title');
				}
			});
			var window_size = $(window).height();
			
			var array_column_def = Array();
			var objColumnDef = new Object();
			objColumnDef.targets = 0;
			objColumnDef.orderable = false;
			array_column_def.push(objColumnDef);
			for(var i=1; i<column_length; i++)
			{
				var objColumn = new Object();
				objColumn.targets = i;
				objColumn.orderData = [0, i];
				array_column_def.push(objColumn);
			}
			oTable = $('#example').DataTable( {
				"columnDefs": array_column_def,
				orderFixed : [ 0, 'asc' ],
		        searching: false,
		        info:false,
		        scrollY:        '60vh',
		        scrollX:        true,
		        scrollCollapse: true,
		        paging:         false,
		        fixedColumns:   {
		            leftColumns: 4
		        }
		    } );
			$("#example tbody tr td").css("padding","0px");
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

function create_paid_student(enrollmentList)
{
	var vHtml = "";
	
	for(var i=0; i<enrollmentList.length; i++)
	{
		var student_id = enrollmentList[i].student_id;
		var course_enrollment_id = enrollmentList[i].course_enrollment_id;
		var sReg = "신규";
		if(enrollmentList[i].registration_type != "NEW"){
			sReg = "기존";
		}
		
		var arr_enrollment_schedule = enrollmentList[i].schedule.split(",");
		var first_date = arr_enrollment_schedule[0];

		var c_idx = classCountList.findIndex(t => t.student_id == student_id && t.student_type == student_type && t.difficulty == difficulty);
		var class_count = 0;
		if(c_idx >=0 ){
			class_count = classCountList[c_idx].class_count;	
		}
		
		
		var class_list = classCountList.filter(function(item, index){
			if(item.student_id == student_id && item.student_type == student_type){
				return true;
			}
		})
		
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
		if(enrollmentList[i].registration_type != "NEW"){
			sReg = "기존";
		}
		
		var sCham = "&nbsp;";
		if(enrollmentList[i].chamgang_yn == "Y"){
			sCham += "참강";
		}
		vHtml += '		<tr>';
		vHtml += '			<td class="text-center" style="width:40px;">'+sCham+'</td>';
		vHtml += '			<td class="text-center '+class_clazz+'" style="width:40px;">'+(i+1)+'</td>';
		vHtml += '			<td class="text-center '+class_clazz+'" style="width:80px;"><a href="javascript:student_login(\''+enrollmentList[i].username+'\')">'+enrollmentList[i].last_name+enrollmentList[i].first_name+'</a></td>';
		vHtml += '			<td class="text-center '+class_clazz+'" style="width:80px;">'+cfmLpad(class_count+"",3," ")+'회 / '+cfmLpad(all_class_count+"",3," ")+'회('+sReg+')</td>';
		for(var j=date_count-1; j>=0; j--)
		{
			var v_date = dateList[j];
			if(cur_date < v_date) continue;
			
			if(cur_date < v_date)
			{
				vHtml += '			<td class="text-center" style="width:'+nWidth+'px;"></td>';
				vHtml += '			<td class="text-center" style="width:'+nWidth+'px;"></td>';
				vHtml += '			<td class="text-center" style="width:'+nWidth+'px;"></td>';
			}else{
				if(v_date < enrollmentList[i].move_date)
				{
					vHtml += '			<td class="bg-grey-darker text-center" style="width:'+nWidth+'px;">반이동</td>';
					vHtml += '			<td class="bg-grey-darker text-center" style="width:'+nWidth+'px;">반이동</td>';
					vHtml += '			<td class="bg-grey-darker text-center" style="width:'+nWidth+'px;">반이동</td>';
				}else if(v_date < first_date)
				{
					vHtml += '			<td class="bg-grey-darker text-center" style="width:'+nWidth+'px;">중간등록</td>';
					vHtml += '			<td class="bg-grey-darker text-center" style="width:'+nWidth+'px;">중간등록</td>';
					vHtml += '			<td class="bg-grey-darker text-center" style="width:'+nWidth+'px;">중간등록</td>';
				}else{
					if(arr_enrollment_schedule.indexOf(v_date) < 0 ){
						vHtml += '			<td class="text-center" style="width:'+nWidth+'px;"></td>';
						vHtml += '			<td class="text-center" style="width:'+nWidth+'px;"></td>';
						vHtml += '			<td class="text-center" style="width:'+nWidth+'px;"></td>';
						continue;
					}
					//출결 체크
					var t_idx = attendList.findIndex(t => t.date == v_date && t.course_enrollment_id == course_enrollment_id); 
					if(t_idx >= 0){
						var v_status = attendList[t_idx].status;
						if(v_status == "REGULAR_ATTENDED")
						{
							vHtml += '			<td class="show_attend bg-green text-center" style="width:100px;">O</td>';
						}else{
							if(v_date == first_date)
							{
								vHtml += '			<td class="show_attend bg-grey-darker text-center" style="width:100px;">OT진행</td>';
							}else{
								if(v_status == "UNPERMITTED_LATE" || v_status == "PERMITTED_LATE"){
									vHtml += '			<td class="show_attend bg-grey-darker text-center" style="width:100px;">지각</td>';
								}else{
									if(attendList[t_idx].attendance_reason_type){
										vHtml += '			<td class="show_attend bg-grey-darker text-center" style="width:100px;">일반결석</td>';
									}else{
										vHtml += '			<td class="show_attend bg-grey-darker text-center" style="width:100px;">무단결석</td>';
									}
								}
							}
						} 
					}
					var a_idx = scheduleList.findIndex(t => t.date == v_date); 
					if(a_idx >= 0){
						var s_idx = speechList.findIndex(t => t.date == v_date && t.student_id == student_id);
						if(s_idx >= 0){
							if(speechList[s_idx].pass_result)
							{
								vHtml += '<td class="click_practice bg-green text-center" style="width:100px;cursor:pointer;">';
								vHtml += '<input type="hidden" id="section" value="VOCA">';
								vHtml += '<input type="hidden" id="practice_type" value="SPEECH">';
								vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
								vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
								vHtml += cfmLpad(speechList[s_idx].score+"",3," ");
								vHtml += '</td>';
							}else{
								vHtml += '<td class="click_practice bg-red text-center" style="width:100px;cursor:pointer;">';
								vHtml += '<input type="hidden" id="section" value="VOCA">';
								vHtml += '<input type="hidden" id="practice_type" value="SPEECH">';
								vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
								vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
								vHtml += cfmLpad(speechList[s_idx].score+"",3," ");
								vHtml += '</td>';
							}
						}else{
							vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">미시행</td>';
						}
						
						var v_idx = vocaList.findIndex(t => t.date == v_date && t.student_id == student_id);
						if(v_idx >= 0){
							if(vocaList[v_idx].pass_result){
								vHtml += '<td class="click_practice bg-green text-center" style="width:100px;cursor:pointer;">';
								vHtml += '<input type="hidden" id="section" value="VOCA">';
								vHtml += '<input type="hidden" id="practice_type" value="VOCA">';
								vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
								vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
								vHtml += cfmLpad(vocaList[v_idx].score+"",3," ");
								vHtml += '</td>';
							}else{
								vHtml += '<td class="click_practice bg-red text-center" style="width:100px;cursor:pointer;">';
								vHtml += '<input type="hidden" id="section" value="VOCA">';
								vHtml += '<input type="hidden" id="practice_type" value="VOCA">';
								vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
								vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
								vHtml += cfmLpad(vocaList[v_idx].score+"",3," ");
								vHtml += '</td>';
							}
						}else{
							vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">미시행</td>';
						}
					}else{
						vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">미시행</td>';
						vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">미시행</td>';
					}							
				}
			}
			vHtml += create_practice_paid_student(course_enrollment_id, enrollmentList[i], v_date);
		}
		vHtml += '		</tr>';
	}
	
	return vHtml;
}

function create_practice_paid_student(v_course_enrollment_id, enrollmentInfo, v_date)
{
	var arr_enrollment_schedule = enrollmentInfo.schedule.split(",");
	var first_date = arr_enrollment_schedule[0];
	
	var vHtml = "";
	//세션별 가져오기.
	for(var j=0;j<sectionList.length; j++)
	{
		if(sectionList[j].section == "VOCA") continue;
		var v_section =  sectionList[j].section;
		var a_practice_type_list = practiceList.filter(function(item, index){
			if(item.section == v_section){
				return true;
			}
		});
		
		if(a_practice_type_list.length == 0) continue;
		
		for(var k=0; k<a_practice_type_list.length; k++)
		{
			var v_practice_type = a_practice_type_list[k].practice_type;
			var v_practice_name = a_practice_type_list[k].practice_name;
			var a_schedule_list = scheduleList.filter(function(item, index){
				if(item.section == v_section && item.practice_type == v_practice_type  && item.date == v_date){
					return true;
				}
			});
			if(a_schedule_list.length > 0){
				for(var a=0; a<a_schedule_list.length; a++)
				{
					if(v_date < enrollmentInfo.move_date)
					{
						vHtml += '			<td class="bg-grey-darker text-center" style="width:'+nWidth+'px;">반이동</td>';
						
					}else{
						if(v_date < first_date)
						{
							vHtml += '			<td class="bg-grey-darker text-center" style="width:'+nWidth+'px;">중간등록</td>';
						}else{
							if(arr_enrollment_schedule.indexOf(v_date) < 0 ){
								vHtml += '			<td class="text-center" style="width:'+nWidth+'px;"></td>';
							}else{
								var v_section = a_schedule_list[a].section;
								var v_practice_type = a_schedule_list[a].practice_type;
								var v_book = a_schedule_list[a].book;
								var v_volume = a_schedule_list[a].volume;
								var v_group = a_schedule_list[a].group;
								var v_article = a_schedule_list[a].article;
								var v_end_paragraph = a_schedule_list[a].end_paragraph;
								var t_idx = attendList.findIndex(t => t.date == v_date && t.course_enrollment_id == v_course_enrollment_id); 
								var r_idx = resultList.findIndex(t => t.section == v_section 
																	&& t.practice_type == v_practice_type
																	&& t.date == v_date
																	&& t.course_enrollment_id == v_course_enrollment_id
																	&& t.book == v_book
																	&& t.volume == v_volume
																	&& t.group == v_group
																	&& t.article == v_article
																	&& t.end_paragraph == v_end_paragraph); 
								var q_idx = resultQuizList.findIndex(t => t.section == v_section 
																	&& t.practice_type == v_practice_type
																	&& t.date == v_date
																	&& t.course_enrollment_id == v_course_enrollment_id
																	&& t.book == v_book
																	&& t.volume == v_volume
																	&& t.group == v_group
																	&& t.article == v_article
																	&& t.end_paragraph == v_end_paragraph); 
								 
								if(r_idx >= 0){
									var score;
									if(v_section== "GRAMMAR" && v_practice_type == "MOCK_TEST"){
										var score1 = resultList[r_idx].score1;
										var score2 = resultList[r_idx].score2;
										var total_score1 = resultList[r_idx].total_score1;
										var total_score2 = resultList[r_idx].total_score2;
										score = "SW1:"+ score1+"/"+total_score1+" SW2:"+score2+"/"+total_score2;
									}else{
										var score1 = resultList[r_idx].score;
										var total_score1 = resultList[r_idx].total_score;
										score = score1+"/"+total_score1;
									}
									if(v_practice_type == "MOCK_TEST"){
										vHtml += '<td class="click_practice bg-green text-center" style="width:'+nWidth+'px;cursor:pointer;">';
										vHtml += '<input type="hidden" id="section" value="'+v_section+'">';
										vHtml += '<input type="hidden" id="practice_type" value="'+v_practice_type+'">';
										vHtml += '<input type="hidden" id="course_enrollment_id" value="'+v_course_enrollment_id+'">';
										vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
										vHtml += '<input type="hidden" id="book" value="'+v_book+'">';
										vHtml += '<input type="hidden" id="volume" value="'+v_volume+'">';
										vHtml += '<input type="hidden" id="group" value="'+v_group+'">';
										vHtml += '<input type="hidden" id="article" value="'+v_article+'">';
										vHtml += '<input type="hidden" id="end_paragraph" value="'+v_end_paragraph+'">';
										vHtml += score;
										vHtml += '</td>';
									}else{
										if(resultList[r_idx].pass_result){
											vHtml += '<td class="click_practice bg-green text-center" style="width:'+nWidth+'px;cursor:pointer;">';
											vHtml += '<input type="hidden" id="section" value="'+v_section+'">';
											vHtml += '<input type="hidden" id="practice_type" value="'+v_practice_type+'">';
											vHtml += '<input type="hidden" id="course_enrollment_id" value="'+v_course_enrollment_id+'">';
											vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
											vHtml += '<input type="hidden" id="book" value="'+v_book+'">';
											vHtml += '<input type="hidden" id="volume" value="'+v_volume+'">';
											vHtml += '<input type="hidden" id="group" value="'+v_group+'">';
											vHtml += '<input type="hidden" id="article" value="'+v_article+'">';
											vHtml += '<input type="hidden" id="end_paragraph" value="'+v_end_paragraph+'">';
											vHtml += score;
											vHtml += '</td>';
										}else{
											vHtml += '<td class="click_practice bg-red text-center" style="width:'+nWidth+'px;cursor:pointer;">';
											vHtml += '<input type="hidden" id="section" value="'+v_section+'">';
											vHtml += '<input type="hidden" id="practice_type" value="'+v_practice_type+'">';
											vHtml += '<input type="hidden" id="course_enrollment_id" value="'+v_course_enrollment_id+'">';
											vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
											vHtml += '<input type="hidden" id="book" value="'+v_book+'">';
											vHtml += '<input type="hidden" id="volume" value="'+v_volume+'">';
											vHtml += '<input type="hidden" id="group" value="'+v_group+'">';
											vHtml += '<input type="hidden" id="article" value="'+v_article+'">';
											vHtml += '<input type="hidden" id="end_paragraph" value="'+v_end_paragraph+'">';
											vHtml += score;
											vHtml += '</td>';
										}
									}
									
								}else if(q_idx >= 0){
									if(resultQuizList[q_idx].pass_result){
										vHtml += '			<td class="bg-green text-center" style="width:100px;">O</td>';
									}else{
										vHtml += '			<td class="bg-red text-center" style="width:100px;">X</td>';
									}
								}else{
									if(t_idx >= 0){
										var v_status = attendList[t_idx].status;
										if(v_status == "REGULAR_ATTENDED")
										{
											vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">미시행</td>';	
										}else if(v_status == "UNPERMITTED_LATE" || v_status == "PERMITTED_LATE"){
											vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">지각</td>';
										}else{
											vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">결석</td>';
											
										}
									}else{
										vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">결석</td>';
									}
								}
							}
						}
					} 
				}
				
			}else{
				if(v_date < enrollmentInfo.move_date)
				{
					vHtml += '			<td class="bg-grey-darker text-center" style="width:'+nWidth+'px;">반이동</td>';
					
				}else if(v_date < first_date)
				{
					vHtml += '			<td class="bg-grey-darker text-center" style="width:'+nWidth+'px;">중간등록</td>';
				}else{
					if(arr_enrollment_schedule.indexOf(v_date) < 0 ){
						vHtml += '			<td class="text-center" style="width:'+nWidth+'px;"></td>';
					}else{
						vHtml += '			<td class="bg-grey-darker text-center" style="width:'+nWidth+'px;">미시행</td>';
					}
				}
			}
		}
	}
	
	return vHtml;
		
		
}

function create_move_student(enrollmentList)
{
	var vHtml = "";
	
	for(var i=0; i<enrollmentList.length; i++)
	{
		var student_id = enrollmentList[i].student_id;
		var course_enrollment_id = enrollmentList[i].course_enrollment_id;
		var sReg = "신규";
		if(enrollmentList[i].registration_type != "NEW"){
			sReg = "기존";
		}
		
		var arr_enrollment_schedule = enrollmentList[i].schedule.split(",");
		var first_date = arr_enrollment_schedule[0];

		var c_idx = classCountList.findIndex(t => t.student_id == student_id && t.student_type == student_type && t.difficulty == difficulty);
		var class_count = 0;
		if(c_idx >=0 ){
			class_count = classCountList[c_idx].class_count;	
		}
		
		
		var class_list = classCountList.filter(function(item, index){
			if(item.student_id == student_id && item.student_type == student_type){
				return true;
			}
		})
		
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
		if(enrollmentList[i].registration_type != "NEW"){
			sReg = "기존";
		}
		
		class_clazz = 'bg-black-transparent-3';
		vHtml += '		<tr>';
		vHtml += '			<td class="text-center '+class_clazz+'" style="width:60px;">반이동</td>';
		vHtml += '			<td class="text-center '+class_clazz+'" style="width:60px;">'+(i+1)+'</td>';
		vHtml += '			<td class="text-center '+class_clazz+'" style="width:100px;"><a href="javascript:student_login(\''+enrollmentList[i].username+'\')">'+enrollmentList[i].last_name+enrollmentList[i].first_name+'</a></td>';
		vHtml += '			<td class="text-center '+class_clazz+'" style="width:80px;">'+cfmLpad(class_count+"",3," ")+'회 / '+cfmLpad(all_class_count+"",3," ")+'회('+sReg+')</td>';
		//for(var j=0; j<date_count; j++)
		for(var j=date_count-1; j>=0; j--)
		{
			var v_date = dateList[j];
			if(cur_date < v_date) continue;
			
			if(cur_date < v_date)
			{
				vHtml += '			<td class="text-center" style="width:100px;"></td>';
				vHtml += '			<td class="text-center" style="width:100px;"></td>';
				vHtml += '			<td class="text-center" style="width:100px;"></td>';
			}else{
				if(v_date >= enrollmentList[i].move_date)
				{
					vHtml += '			<td class="text-center" style="width:100px;"></td>';
					vHtml += '			<td class="text-center" style="width:100px;"></td>';
					vHtml += '			<td class="text-center" style="width:100px;"></td>';
				}else if(v_date < first_date)
				{
					vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">중간등록</td>';
					vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">중간등록</td>';
					vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">중간등록</td>';
				}else{
					if(arr_enrollment_schedule.indexOf(v_date) < 0 ){

						vHtml += '			<td class="text-center" style="width:100px;"></td>';
						vHtml += '			<td class="text-center" style="width:100px;"></td>';
						vHtml += '			<td class="text-center" style="width:100px;"></td>';
						continue;
					}
					//출결 체크
					var t_idx = attendList.findIndex(t => t.date == v_date && t.course_enrollment_id == course_enrollment_id); 
					if(t_idx >= 0){
						var v_status = attendList[t_idx].status;
						if(v_status == "REGULAR_ATTENDED")
						{
							vHtml += '			<td class="show_attend bg-green text-center" style="width:100px;">O</td>';
						}else{
							if(v_date == first_date)
							{
								vHtml += '			<td class="show_attend bg-grey-darker text-center" style="width:100px;">OT진행</td>';
							}else{
								if(v_status == "UNPERMITTED_LATE" || v_status == "PERMITTED_LATE"){
									vHtml += '			<td class="show_attend bg-grey-darker text-center" style="width:100px;">지각</td>';
								}else{
									if(attendList[t_idx].attendance_reason_type){
										vHtml += '			<td class="show_attend bg-grey-darker text-center" style="width:100px;">일반결석</td>';
									}else{
										vHtml += '			<td class="show_attend bg-grey-darker text-center" style="width:100px;">무단결석</td>';
									}
								}
							}
						} 
					}else{
						if(v_date == first_date)
						{
							vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">OT진행</td>';
						}else{
							vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">무단결석</td>';	
						}
						
					}
					var a_idx = scheduleList.findIndex(t => t.date == v_date); 
					if(a_idx >= 0){
						var s_idx = speechList.findIndex(t => t.date == v_date && t.student_id == student_id);
						if(s_idx >= 0){
							if(speechList[s_idx].pass_result)
							{
								vHtml += '<td class="click_practice bg-green text-center" style="width:100px;cursor:pointer;">';
								vHtml += '<input type="hidden" id="section" value="VOCA">';
								vHtml += '<input type="hidden" id="practice_type" value="SPEECH">';
								vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
								vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
								vHtml += cfmLpad(speechList[s_idx].score+"",3," ");
								vHtml += '</td>';
							}else{
								vHtml += '<td class="click_practice bg-red text-center" style="width:100px;cursor:pointer;">';
								vHtml += '<input type="hidden" id="section" value="VOCA">';
								vHtml += '<input type="hidden" id="practice_type" value="SPEECH">';
								vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
								vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
								vHtml += cfmLpad(speechList[s_idx].score+"",3," ");
								vHtml += '</td>';
							}
						}else{
							vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">미시행</td>';
						}
						
						var v_idx = vocaList.findIndex(t => t.date == v_date && t.student_id == student_id);
						if(v_idx >= 0){
							if(vocaList[v_idx].pass_result){
								vHtml += '<td class="click_practice bg-green text-center" style="width:100px;cursor:pointer;">';
								vHtml += '<input type="hidden" id="section" value="VOCA">';
								vHtml += '<input type="hidden" id="practice_type" value="VOCA">';
								vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
								vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
								vHtml += cfmLpad(vocaList[v_idx].score+"",3," ");
								vHtml += '</td>';
							}else{
								vHtml += '<td class="click_practice bg-red text-center" style="width:100px;cursor:pointer;">';
								vHtml += '<input type="hidden" id="section" value="VOCA">';
								vHtml += '<input type="hidden" id="practice_type" value="VOCA">';
								vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
								vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
								vHtml += cfmLpad(vocaList[v_idx].score+"",3," ");
								vHtml += '</td>';
							}
						}else{
							vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">미시행</td>';
						}
					}else{
							vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">미시행</td>';
							vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">미시행</td>';
					}							
				}
			}
			
			vHtml += create_practice_move_student(course_enrollment_id, enrollmentList[i], v_date);

		}
		vHtml += '		</tr>';
	}
	
	return vHtml;
}

function create_practice_move_student(v_course_enrollment_id, enrollmentInfo, v_date)
{
	var arr_enrollment_schedule = enrollmentInfo.schedule.split(",");
	var first_date = arr_enrollment_schedule[0];
	
	var vHtml = "";
	//세션별 가져오기.
	for(var j=0;j<sectionList.length; j++)
	{
		if(sectionList[j].section == "VOCA") continue;
		var v_section =  sectionList[j].section;
		var a_practice_type_list = practiceList.filter(function(item, index){
			if(item.section == v_section){
				return true;
			}
		});
		
		if(a_practice_type_list.length == 0) continue;
		
		for(var k=0; k<a_practice_type_list.length; k++)
		{
			var v_practice_type = a_practice_type_list[k].practice_type;
			var v_practice_name = a_practice_type_list[k].practice_name;
			var a_schedule_list = scheduleList.filter(function(item, index){
				if(item.section == v_section && item.practice_type == v_practice_type  && item.date == v_date){
					return true;
				}
			});
			if(a_schedule_list.length > 0){
				for(var a=0; a<a_schedule_list.length; a++)
				{
					if(v_date >= enrollmentInfo.move_date)
					{
						vHtml += '			<td class="bg-grey-darker text-center" style="width:'+nWidth+'px;">반이동</td>';
						
					}else{
						if(v_date < first_date)
						{
							vHtml += '			<td class="bg-grey-darker text-center" style="width:'+nWidth+'px;">중간등록</td>';
						}else{
							if(arr_enrollment_schedule.indexOf(v_date) < 0 ){
								vHtml += '			<td class="text-center" style="width:'+nWidth+'px;"></td>';
							}else{
								var v_section = a_schedule_list[a].section;
								var v_practice_type = a_schedule_list[a].practice_type;
								var v_book = a_schedule_list[a].book;
								var v_volume = a_schedule_list[a].volume;
								var v_group = a_schedule_list[a].group;
								var v_article = a_schedule_list[a].article;
								var v_end_paragraph = a_schedule_list[a].end_paragraph;
								var t_idx = attendList.findIndex(t => t.date == v_date && t.course_enrollment_id == v_course_enrollment_id); 
								var r_idx = resultList.findIndex(t => t.section == v_section 
																	&& t.practice_type == v_practice_type
																	&& t.date == v_date
																	&& t.course_enrollment_id == v_course_enrollment_id
																	&& t.book == v_book
																	&& t.volume == v_volume
																	&& t.group == v_group
																	&& t.article == v_article
																	&& t.end_paragraph == v_end_paragraph); 
								
								var q_idx = resultQuizList.findIndex(t => t.section == v_section 
																	&& t.practice_type == v_practice_type
																	&& t.date == v_date
																	&& t.course_enrollment_id == v_course_enrollment_id
																	&& t.book == v_book
																	&& t.volume == v_volume
																	&& t.group == v_group
																	&& t.article == v_article
																	&& t.end_paragraph == v_end_paragraph); 
								
								if(r_idx >= 0){
									var score;
									if(v_section== "GRAMMAR" && v_practice_type == "MOCK_TEST"){
										var score1 = resultList[r_idx].score1;
										var score2 = resultList[r_idx].score2;
										var total_score1 = resultList[r_idx].total_score1;
										var total_score2 = resultList[r_idx].total_score2;
										score = "SW1:"+ score1+"/"+total_score1+" SW2:"+score2+"/"+total_score2;
									}else{
										var score1 = resultList[r_idx].score;
										var total_score1 = resultList[r_idx].total_score;
										score = score1+"/"+total_score1;
									}
									if(v_practice_type == "MOCK_TEST"){
										vHtml += '<td class="click_practice bg-green text-center" style="width:'+nWidth+'px;cursor:pointer;">';
										vHtml += '<input type="hidden" id="section" value="'+section+'">';
										vHtml += '<input type="hidden" id="practice_type" value="'+v_practice_type+'">';
										vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
										vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
										vHtml += '<input type="hidden" id="book" value="'+v_book+'">';
										vHtml += '<input type="hidden" id="volume" value="'+v_volume+'">';
										vHtml += '<input type="hidden" id="group" value="'+v_group+'">';
										vHtml += '<input type="hidden" id="article" value="'+v_article+'">';
										vHtml += '<input type="hidden" id="end_paragraph" value="'+v_end_paragraph+'">';
										vHtml += score;
										vHtml += '</td>';
									}else{
										if(resultList[r_idx].pass_result){
											vHtml += '<td class="click_practice bg-green text-center" style="width:'+nWidth+'px;cursor:pointer;">';
											vHtml += '<input type="hidden" id="section" value="'+v_section+'">';
											vHtml += '<input type="hidden" id="practice_type" value="'+v_practice_type+'">';
											vHtml += '<input type="hidden" id="course_enrollment_id" value="'+v_course_enrollment_id+'">';
											vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
											vHtml += '<input type="hidden" id="book" value="'+v_book+'">';
											vHtml += '<input type="hidden" id="volume" value="'+v_volume+'">';
											vHtml += '<input type="hidden" id="group" value="'+v_group+'">';
											vHtml += '<input type="hidden" id="article" value="'+v_article+'">';
											vHtml += '<input type="hidden" id="end_paragraph" value="'+v_end_paragraph+'">';
											vHtml += score;
											vHtml += '</td>';
										}else{
											vHtml += '<td class="click_practice bg-red text-center" style="width:'+nWidth+'px;cursor:pointer;">';
											vHtml += '<input type="hidden" id="section" value="'+v_section+'">';
											vHtml += '<input type="hidden" id="practice_type" value="'+v_practice_type+'">';
											vHtml += '<input type="hidden" id="course_enrollment_id" value="'+v_course_enrollment_id+'">';
											vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
											vHtml += '<input type="hidden" id="book" value="'+v_book+'">';
											vHtml += '<input type="hidden" id="volume" value="'+v_volume+'">';
											vHtml += '<input type="hidden" id="group" value="'+v_group+'">';
											vHtml += '<input type="hidden" id="article" value="'+v_article+'">';
											vHtml += '<input type="hidden" id="end_paragraph" value="'+v_end_paragraph+'">';
											vHtml += score;
											vHtml += '</td>';
										}
									}
									
								}else if(q_idx >= 0){
									if(resultQuizList[q_idx].pass_result){
										vHtml += '			<td class="bg-green text-center" style="width:100px;">O</td>';
									}else{
										vHtml += '			<td class="bg-red text-center" style="width:100px;">X</td>';
									}
								}else{
									if(t_idx >= 0){
										var v_status = attendList[t_idx].status;
										if(v_status == "REGULAR_ATTENDED")
										{
											vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">미시행</td>';	
										}else if(v_status == "UNPERMITTED_LATE" || v_status == "PERMITTED_LATE"){
											vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">지각</td>';
										}else{
											vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">결석</td>';
											
										}
									}else{
										vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">결석</td>';
									}
								}
							}
						}
					} 
				}
				
			}else{
				if(v_date >= enrollmentInfo.move_date)
				{
					vHtml += '			<td class="bg-grey-darker text-center" style="width:'+nWidth+'px;">반이동</td>';
					
				}else if(v_date < first_date)
				{
					vHtml += '			<td class="bg-grey-darker text-center" style="width:'+nWidth+'px;">중간등록</td>';
				}else{
					if(arr_enrollment_schedule.indexOf(v_date) < 0 ){
						vHtml += '			<td class="text-center" style="width:'+nWidth+'px;"></td>';
					}else{
						vHtml += '			<td class="bg-grey-darker text-center" style="width:'+nWidth+'px;">미시행</td>';
					}
				}
			}
		}
	}
	
	return vHtml;
		
		
}

function create_refund_student(enrollmentList)
{
	var vHtml = "";
	
	for(var i=0; i<enrollmentList.length; i++)
	{
		var student_id = enrollmentList[i].student_id;
		var course_enrollment_id = enrollmentList[i].course_enrollment_id;
		var sReg = "신규";
		if(enrollmentList[i].registration_type != "NEW"){
			sReg = "기존";
		}
		
		var arr_enrollment_schedule = enrollmentList[i].schedule.split(",");
		var first_date = arr_enrollment_schedule[0];

		var c_idx = classCountList.findIndex(t => t.student_id == student_id && t.student_type == student_type && t.difficulty == difficulty);
		var class_count = 0;
		if(c_idx >=0 ){
			class_count = classCountList[c_idx].class_count;	
		}
		
		
		var class_list = classCountList.filter(function(item, index){
			if(item.student_id == student_id && item.student_type == student_type){
				return true;
			}
		})
		
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
		if(enrollmentList[i].registration_type != "NEW"){
			sReg = "기존";
		}
		
		class_clazz = 'bg-black-transparent-5';
		
		vHtml += '		<tr>';
		vHtml += '			<td class="text-center '+class_clazz+'" style="width:60px;">환불</td>';
		vHtml += '			<td class="text-center '+class_clazz+'" style="width:60px;">'+(i+1)+'</td>';
		vHtml += '			<td class="text-center '+class_clazz+'" style="width:100px;"><a href="javascript:student_login(\''+enrollmentList[i].username+'\')">'+enrollmentList[i].last_name+enrollmentList[i].first_name+'</a></td>';
		vHtml += '			<td class="text-center '+class_clazz+'" style="width:80px;">'+cfmLpad(class_count+"",3," ")+'회 / '+cfmLpad(all_class_count+"",3," ")+'회('+sReg+')</td>';
		//for(var j=0; j<date_count; j++)
		for(var j=date_count-1; j>=0; j--)
		{
			var v_date = dateList[j];
			if(cur_date < v_date) continue;
			
			if(cur_date < v_date)
			{
				vHtml += '			<td class="text-center" style="width:100px;"></td>';
				vHtml += '			<td class="text-center" style="width:100px;"></td>';
				vHtml += '			<td class="text-center" style="width:100px;"></td>';
			}else{
				if(v_date >= enrollmentList[i].move_date)
				{
					vHtml += '			<td class="text-center" style="width:100px;"></td>';
					vHtml += '			<td class="text-center" style="width:100px;"></td>';
					vHtml += '			<td class="text-center" style="width:100px;"></td>';
				}else if(v_date < first_date)
				{
					vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">중간등록</td>';
					vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">중간등록</td>';
					vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">중간등록</td>';
				}else{
					if(arr_enrollment_schedule.indexOf(v_date) < 0 ){
						vHtml += '			<td class="text-center" style="width:100px;"></td>';
						vHtml += '			<td class="text-center" style="width:100px;"></td>';
						vHtml += '			<td class="text-center" style="width:100px;"></td>';
						continue;
					}
					//출결 체크
					var t_idx = attendList.findIndex(t => t.date == v_date && t.course_enrollment_id == course_enrollment_id); 
					if(t_idx >= 0){
						var v_status = attendList[t_idx].status;
						if(v_status == "REGULAR_ATTENDED")
						{
							vHtml += '			<td class="show_attend bg-green text-center" style="width:100px;">O</td>';
						}else{
							if(v_date == first_date)
							{
								vHtml += '			<td class="show_attend bg-grey-darker text-center" style="width:100px;">OT진행</td>';
							}else{
								if(v_status == "UNPERMITTED_LATE" || v_status == "PERMITTED_LATE"){
									vHtml += '			<td class="show_attend bg-grey-darker text-center" style="width:100px;">지각</td>';
								}else{
									if(attendList[t_idx].attendance_reason_type){
										vHtml += '			<td class="show_attend bg-grey-darker text-center" style="width:100px;">일반결석</td>';
									}else{
										vHtml += '			<td class="show_attend bg-grey-darker text-center" style="width:100px;">무단결석</td>';
									}
								}
							}
						} 
					}else{
						if(v_date == first_date)
						{
							vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">OT진행</td>';
						}else{
							vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">무단결석</td>';	
						}
						
					}
					
					var a_idx = scheduleList.findIndex(t => t.date == v_date); 
					if(a_idx >= 0){
						var s_idx = speechList.findIndex(t => t.date == v_date && t.student_id == student_id);
						if(s_idx >= 0){
							if(speechList[s_idx].pass_result)
							{
								vHtml += '<td class="click_practice bg-green text-center" style="width:100px;cursor:pointer;">';
								vHtml += '<input type="hidden" id="section" value="VOCA">';
								vHtml += '<input type="hidden" id="practice_type" value="SPEECH">';
								vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
								vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
								vHtml += 'O('+cfmLpad(speechList[s_idx].score+"",3," ")+')';
								vHtml += '</td>';
							}else{
								vHtml += '<td class="click_practice bg-red text-center" style="width:100px;cursor:pointer;">';
								vHtml += '<input type="hidden" id="section" value="VOCA">';
								vHtml += '<input type="hidden" id="practice_type" value="SPEECH">';
								vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
								vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
								vHtml += 'X('+cfmLpad(speechList[s_idx].score+"",3," ")+')';
								vHtml += '</td>';
							}
						}else{
							vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">미시행</td>';
						}
						
						var v_idx = vocaList.findIndex(t => t.date == v_date && t.student_id == student_id);
						if(v_idx >= 0){
							if(vocaList[v_idx].pass_result){
								vHtml += '<td class="click_practice bg-green text-center" style="width:100px;cursor:pointer;">';
								vHtml += '<input type="hidden" id="section" value="VOCA">';
								vHtml += '<input type="hidden" id="practice_type" value="VOCA">';
								vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
								vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
								vHtml += 'O('+cfmLpad(vocaList[v_idx].score+"",3," ")+')';
								vHtml += '</td>';
							}else{
								vHtml += '<td class="click_practice bg-red text-center" style="width:100px;cursor:pointer;">';
								vHtml += '<input type="hidden" id="section" value="VOCA">';
								vHtml += '<input type="hidden" id="practice_type" value="VOCA">';
								vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
								vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
								vHtml += 'X('+cfmLpad(vocaList[v_idx].score+"",3," ")+')';
								vHtml += '</td>';
							}
						}else{
							vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">미시행</td>';
						}
					}else{
						vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">미시행</td>';
						vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">미시행</td>';
					}							
				}
			}
			vHtml += create_practice_refund_student(course_enrollment_id, enrollmentList[i], v_date);

		}
		vHtml += '		</tr>';
	}
	
	return vHtml;
}

function create_practice_refund_student(v_course_enrollment_id, enrollmentInfo, v_date)
{
	var arr_enrollment_schedule = enrollmentInfo.schedule.split(",");
	var first_date = arr_enrollment_schedule[0];
	
	var vHtml = "";
	//세션별 가져오기.
	for(var j=0;j<sectionList.length; j++)
	{
		if(sectionList[j].section == "VOCA") continue;
		var v_section =  sectionList[j].section;
		var a_practice_type_list = practiceList.filter(function(item, index){
			if(item.section == v_section){
				return true;
			}
		});
		
		if(a_practice_type_list.length == 0) continue;
		
		for(var k=0; k<a_practice_type_list.length; k++)
		{
			var v_practice_type = a_practice_type_list[k].practice_type;
			var v_practice_name = a_practice_type_list[k].practice_name;
			var a_schedule_list = scheduleList.filter(function(item, index){
				if(item.section == v_section && item.practice_type == v_practice_type  && item.date == v_date){
					return true;
				}
			});
			if(a_schedule_list.length > 0){
				for(var a=0; a<a_schedule_list.length; a++)
				{
					if(v_date >= enrollmentInfo.move_date)
					{
						vHtml += '			<td class="bg-grey-darker text-center" style="width:'+nWidth+'px;">반이동</td>';
						
					}else{
						if(v_date < first_date)
						{
							vHtml += '			<td class="bg-grey-darker text-center" style="width:'+nWidth+'px;">중간등록</td>';
						}else{
							if(arr_enrollment_schedule.indexOf(v_date) < 0 ){
								vHtml += '			<td class="text-center" style="width:'+nWidth+'px;"></td>';
							}else{
								var v_section = a_schedule_list[a].section;
								var v_practice_type = a_schedule_list[a].practice_type;
								var v_book = a_schedule_list[a].book;
								var v_volume = a_schedule_list[a].volume;
								var v_group = a_schedule_list[a].group;
								var v_article = a_schedule_list[a].article;
								var v_end_paragraph = a_schedule_list[a].end_paragraph;
								var t_idx = attendList.findIndex(t => t.date == v_date && t.course_enrollment_id == v_course_enrollment_id); 
								var r_idx = resultList.findIndex(t => t.section == v_section 
																	&& t.practice_type == v_practice_type
																	&& t.date == v_date
																	&& t.course_enrollment_id == v_course_enrollment_id
																	&& t.book == v_book
																	&& t.volume == v_volume
																	&& t.group == v_group
																	&& t.article == v_article
																	&& t.end_paragraph == v_end_paragraph); 
								
								var q_idx = resultQuizList.findIndex(t => t.section == v_section 
																	&& t.practice_type == v_practice_type
																	&& t.date == v_date
																	&& t.course_enrollment_id == v_course_enrollment_id
																	&& t.book == v_book
																	&& t.volume == v_volume
																	&& t.group == v_group
																	&& t.article == v_article
																	&& t.end_paragraph == v_end_paragraph); 
								
								if(r_idx >= 0){
									var score;
									if(v_section== "GRAMMAR" && v_practice_type == "MOCK_TEST"){
										var score1 = resultList[r_idx].score1;
										var score2 = resultList[r_idx].score2;
										var total_score1 = resultList[r_idx].total_score1;
										var total_score2 = resultList[r_idx].total_score2;
										score = "SW1:"+ score1+"/"+total_score1+" SW2:"+score2+"/"+total_score2;
									}else{
										var score1 = resultList[r_idx].score;
										var total_score1 = resultList[r_idx].total_score;
										score = score1+"/"+total_score1;
									}
									if(v_practice_type == "MOCK_TEST"){
										vHtml += '<td class="click_practice bg-green text-center" style="width:'+nWidth+'px;cursor:pointer;">';
										vHtml += '<input type="hidden" id="section" value="'+v_section+'">';
										vHtml += '<input type="hidden" id="practice_type" value="'+v_practice_type+'">';
										vHtml += '<input type="hidden" id="course_enrollment_id" value="'+v_course_enrollment_id+'">';
										vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
										vHtml += '<input type="hidden" id="book" value="'+v_book+'">';
										vHtml += '<input type="hidden" id="volume" value="'+v_volume+'">';
										vHtml += '<input type="hidden" id="group" value="'+v_group+'">';
										vHtml += '<input type="hidden" id="article" value="'+v_article+'">';
										vHtml += '<input type="hidden" id="end_paragraph" value="'+v_end_paragraph+'">';
										vHtml += score;
										vHtml += '</td>';
									}else{
										if(resultList[r_idx].pass_result){
											vHtml += '<td class="click_practice bg-green text-center" style="width:'+nWidth+'px;cursor:pointer;">';
											vHtml += '<input type="hidden" id="section" value="'+v_section+'">';
											vHtml += '<input type="hidden" id="practice_type" value="'+v_practice_type+'">';
											vHtml += '<input type="hidden" id="course_enrollment_id" value="'+v_course_enrollment_id+'">';
											vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
											vHtml += '<input type="hidden" id="book" value="'+v_book+'">';
											vHtml += '<input type="hidden" id="volume" value="'+v_volume+'">';
											vHtml += '<input type="hidden" id="group" value="'+v_group+'">';
											vHtml += '<input type="hidden" id="article" value="'+v_article+'">';
											vHtml += '<input type="hidden" id="end_paragraph" value="'+v_end_paragraph+'">';
											vHtml += score;
											vHtml += '</td>';
										}else{
											vHtml += '<td class="click_practice bg-red text-center" style="width:'+nWidth+'px;cursor:pointer;">';
											vHtml += '<input type="hidden" id="section" value="'+v_section+'">';
											vHtml += '<input type="hidden" id="practice_type" value="'+v_practice_type+'">';
											vHtml += '<input type="hidden" id="course_enrollment_id" value="'+v_course_enrollment_id+'">';
											vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
											vHtml += '<input type="hidden" id="book" value="'+v_book+'">';
											vHtml += '<input type="hidden" id="volume" value="'+v_volume+'">';
											vHtml += '<input type="hidden" id="group" value="'+v_group+'">';
											vHtml += '<input type="hidden" id="article" value="'+v_article+'">';
											vHtml += '<input type="hidden" id="end_paragraph" value="'+v_end_paragraph+'">';
											vHtml += score;
											vHtml += '</td>';
										}
									}
									
								}else if(q_idx >= 0){
									if(resultQuizList[q_idx].pass_result){
										vHtml += '			<td class="bg-green text-center" style="width:100px;">O</td>';
									}else{
										vHtml += '			<td class="bg-red text-center" style="width:100px;">X</td>';
									}
								}else{
									if(t_idx >= 0){
										var v_status = attendList[t_idx].status;
										if(v_status == "REGULAR_ATTENDED")
										{
											vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">미시행</td>';	
										}else if(v_status == "UNPERMITTED_LATE" || v_status == "PERMITTED_LATE"){
											vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">지각</td>';
										}else{
											vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">결석</td>';
											
										}
									}else{
										vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">결석</td>';
									}
								}
							}
						}
					} 
				}
				
			}else{
				if(v_date >= enrollmentInfo.move_date)
				{
					vHtml += '			<td class="bg-grey-darker text-center" style="width:'+nWidth+'px;">반이동</td>';
					
				}else if(v_date < first_date)
				{
					vHtml += '			<td class="bg-grey-darker text-center" style="width:'+nWidth+'px;">중간등록</td>';
				}else{
					if(arr_enrollment_schedule.indexOf(v_date) < 0 ){
						vHtml += '			<td class="text-center" style="width:'+nWidth+'px;"></td>';
					}else{
						vHtml += '			<td class="bg-grey-darker text-center" style="width:'+nWidth+'px;">미시행</td>';
					}
				}
			}
		}
	}
	
	return vHtml;
		
		
}
</script>
