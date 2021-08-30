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
				<h4 class="panel-title">출결/단어</h4>
				<div class="panel-heading-btn">
					<h4 class="panel-title">${teacherInfo.user_name}</h4>
				</div>
			</div>
			<div class="panel-body">
				<div class="form-group">
					<div class="col-12">
						<div class="form-check form-check-inline">
							<input name="check_show" type="radio" id="check_all" class="form-check-input" value="all" checked>
							<label class="form-check-label" for="check_all">전체</label>
						</div>
						<div class="form-check form-check-inline">
							<input name="check_show" type="radio" id="check_attend" class="form-check-input" value="attend">
							<label class="form-check-label" for="check_attend">출결</label>
						</div>
						<div class="form-check form-check-inline">
							<input name="check_show" type="radio" id="check_speech" class="form-check-input" value="speech">
							<label class="form-check-label" for="check_speech">발음</label>
						</div>
						<div class="form-check form-check-inline">
							<input name="check_show" type="radio" id="check_voca" class="form-check-input" value="voca">
							<label class="form-check-label" for="check_voca">단어</label>
						</div>
					</div>
				</div>
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
	$("input[name=check_show]").click(function(){
		create_table();
	});
	
	
	create_table();
});

var courseInfo;
var dateList;
var date_count;
var cur_date;

var scheduleList;

var attendList;
var speechList;
var vocaList;

var classCountList;

var nClassH;
var nClassM;

var student_type; 
var lecture_type; 
var difficulty; 

var show_type;

var column_length;

function create_table()
{
	show_type = $("input[name=check_show]:checked").val();
	
	$("#table_info").html("");
	$.ajax({
		type : "POST",
		url : "/enrollment/achievement/getVocaList.do",
		data:{
			course_id : course_id
		},
		success:function(data){
			var vHtml = "";
			
			courseInfo = data.courseInfo;
			dateList = courseInfo.schedule.split(",");
			date_count = dateList.length;
			cur_date = courseInfo.cur_date;
			
			scheduleList = data.scheduleList;
			
			attendList = data.attendList;
			speechList = data.speechList;
			vocaList = data.vocaList;
			
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
			
			vHtml += '<table id="example"  class="table table-bordered table-td-valign-middle m-b-0">';
			vHtml += '	<thead>';
			vHtml += '		<tr>';
			vHtml += '			<th class="text-center table-info" rowspan="2" style="width:60px;">상태</th>';
			vHtml += '			<th class="text-center table-info" rowspan="2" style="width:60px;">번호</th>';
			vHtml += '			<th class="text-center table-info" rowspan="2" style="width:100px;">이름</th>';
			vHtml += '			<th class="text-center table-info" rowspan="2" style="width:80px;">기존/신규</th>';
			column_length = 3;
			//for(var i=0; i<date_count; i++)
			for(var i=date_count-1; i>=0; i--)
			{
				var v_date = dateList[i];
				if(cur_date < v_date) continue;
				
				var colspan=1;
				var nWidth=100;
				if(show_type == "all"){
					colspan=3;
					nWidth=300;
				}
				var dayOfWeek = new Date(dateList[i]).getDay();
				if(dayOfWeek == 1){
					vHtml += '			<th class="text-center table-success" colspan="'+colspan+'" style="width:'+nWidth+'px;">'+dateList[i]+'</th>';
				}else{
					vHtml += '			<th class="text-center table-info" colspan="'+colspan+'" style="width:'+nWidth+'px;">'+dateList[i]+'</th>';
				}
			}
			vHtml += '		</tr>';
			vHtml += '		<tr>';
			//for(var i=0; i<date_count; i++)
			for(var i=date_count-1; i>=0; i--)
			{
				var v_date = dateList[i];
				if(cur_date < v_date) continue;
				
				var dayOfWeek = new Date(dateList[i]).getDay();
				var a_idx = scheduleList.findIndex(t => t.date == v_date); 
				var v_volume = "";
				if(a_idx >= 0){
					v_volume = scheduleList[a_idx].volume;
				}
				if(dayOfWeek == 1){
					if(show_type == "all" || show_type == "attend"){
						vHtml += '			<th class="text-center table-success" style="width:100px;">출결</th>';
						column_length++;
					}
					if(show_type == "all" || show_type == "speech"){
						vHtml += '			<th class="text-center table-success" style="width:100px;">발음 '+v_volume+'</th>';
						column_length++;
					}
					if(show_type == "all" || show_type == "voca"){
						vHtml += '			<th class="text-center table-success" style="width:100px;">단어 '+v_volume+'</th>';
						column_length++;
					}
				}else{
					if(show_type == "all" || show_type == "attend"){
						vHtml += '			<th class="text-center table-info" style="width:100px;">출결</th>';
						column_length++;
					}
					if(show_type == "all" || show_type == "speech"){
						vHtml += '			<th class="text-center table-info" style="width:100px;">발음 '+v_volume+'</th>';
						column_length++;
					}
					if(show_type == "all" || show_type == "voca"){
						vHtml += '			<th class="text-center table-info" style="width:100px;">단어 '+v_volume+'</th>';
						column_length++;
					}
				}
			}
			vHtml += '		</tr>';
			vHtml += '	</thead>';
			vHtml += '	<tbody>';
			vHtml += create_paid_student(data.enrollmentList);
			vHtml += create_move_student(data.enrollmentMoveList);
			vHtml += create_refund_student(data.enrollmentRefundList);
			
			vHtml += '	</tbody>';
			vHtml += '</table>';
			$("#table_info").html(vHtml);

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
		vHtml += '			<td class="text-center" style="width:60px;">'+sCham+'</td>';
		//vHtml += '			<td class="text-center '+class_clazz+'" style="width:60px;">'+(i+1)+'</td>';
		//vHtml += '			<td class="text-center '+class_clazz+'" style="width:100px;"><a href="javascript:student_login(\''+enrollmentList[i].username+'\')">'+enrollmentList[i].last_name+enrollmentList[i].first_name+'</a></td>';
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
				if(show_type == "all"){
					vHtml += '			<td class="text-center" style="width:100px;"></td>';
					vHtml += '			<td class="text-center" style="width:100px;"></td>';
					vHtml += '			<td class="text-center" style="width:100px;"></td>';
				}else{
					vHtml += '			<td class="text-center" style="width:100px;"></td>';
				}
			}else{
				if(v_date < enrollmentList[i].move_date)
				{
					if(show_type == "all"){
						vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">반이동</td>';
						vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">반이동</td>';
						vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">반이동</td>';
					}else{
						vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">반이동</td>';
					}
				}else if(v_date < first_date)
				{
					if(show_type == "all"){
						vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">중간등록</td>';
						vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">중간등록</td>';
						vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">중간등록</td>';
					}else{
						vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">중간등록</td>';
					}
				}else{
					if(arr_enrollment_schedule.indexOf(v_date) < 0 ){

						if(show_type == "all"){
							vHtml += '			<td class="text-center" style="width:100px;"></td>';
							vHtml += '			<td class="text-center" style="width:100px;"></td>';
							vHtml += '			<td class="text-center" style="width:100px;"></td>';
						}else{
							vHtml += '			<td class="text-center" style="width:100px;"></td>';
						}
						
						continue;
					}
					//출결 체크
					if(show_type == "all" || show_type == "attend"){
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
					}
					var a_idx = scheduleList.findIndex(t => t.date == v_date); 
					if(a_idx >= 0){
						var s_idx = speechList.findIndex(t => t.date == v_date && t.student_id == student_id);
						if(show_type == "all" || show_type == "speech"){
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
						}
						
						var v_idx = vocaList.findIndex(t => t.date == v_date && t.student_id == student_id);
						if(show_type == "all" || show_type == "voca"){
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
						}
					}else{
						if(show_type == "all" || show_type == "speech"){
							vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">미시행</td>';
						}
						if(show_type == "all" || show_type == "voca"){
							vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">미시행</td>';
						}
					}							
				}
			}

		}
		vHtml += '		</tr>';
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
				if(show_type == "all"){
					vHtml += '			<td class="text-center" style="width:100px;"></td>';
					vHtml += '			<td class="text-center" style="width:100px;"></td>';
					vHtml += '			<td class="text-center" style="width:100px;"></td>';
				}else{
					vHtml += '			<td class="text-center" style="width:100px;"></td>';
				}
			}else{
				if(v_date >= enrollmentList[i].move_date)
				{
					if(show_type == "all"){
						vHtml += '			<td class="text-center" style="width:100px;"></td>';
						vHtml += '			<td class="text-center" style="width:100px;"></td>';
						vHtml += '			<td class="text-center" style="width:100px;"></td>';
					}else{
						vHtml += '			<td class="text-center" style="width:100px;"></td>';
					}
				}else if(v_date < first_date)
				{
					if(show_type == "all"){
						vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">중간등록</td>';
						vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">중간등록</td>';
						vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">중간등록</td>';
					}else{
						vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">중간등록</td>';
					}
				}else{
					if(arr_enrollment_schedule.indexOf(v_date) < 0 ){

						if(show_type == "all"){
							vHtml += '			<td class="text-center" style="width:100px;"></td>';
							vHtml += '			<td class="text-center" style="width:100px;"></td>';
							vHtml += '			<td class="text-center" style="width:100px;"></td>';
						}else{
							vHtml += '			<td class="text-center" style="width:100px;"></td>';
						}
						
						continue;
					}
					//출결 체크
					if(show_type == "all" || show_type == "attend"){
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
					}
					var a_idx = scheduleList.findIndex(t => t.date == v_date); 
					if(a_idx >= 0){
						var s_idx = speechList.findIndex(t => t.date == v_date && t.student_id == student_id);
						if(show_type == "all" || show_type == "speech"){
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
						}
						
						var v_idx = vocaList.findIndex(t => t.date == v_date && t.student_id == student_id);
						if(show_type == "all" || show_type == "voca"){
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
						}
					}else{
						if(show_type == "all" || show_type == "speech"){
							vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">미시행</td>';
						}
						if(show_type == "all" || show_type == "voca"){
							vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">미시행</td>';
						}
					}							
				}
			}

		}
		vHtml += '		</tr>';
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
				if(show_type == "all"){
					vHtml += '			<td class="text-center" style="width:100px;"></td>';
					vHtml += '			<td class="text-center" style="width:100px;"></td>';
					vHtml += '			<td class="text-center" style="width:100px;"></td>';
				}else{
					vHtml += '			<td class="text-center" style="width:100px;"></td>';
				}
			}else{
				if(v_date >= enrollmentList[i].move_date)
				{
					if(show_type == "all"){
						vHtml += '			<td class="text-center" style="width:100px;"></td>';
						vHtml += '			<td class="text-center" style="width:100px;"></td>';
						vHtml += '			<td class="text-center" style="width:100px;"></td>';
					}else{
						vHtml += '			<td class="text-center" style="width:100px;"></td>';
					}
				}else if(v_date < first_date)
				{
					if(show_type == "all"){
						vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">중간등록</td>';
						vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">중간등록</td>';
						vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">중간등록</td>';
					}else{
						vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">중간등록</td>';
					}
				}else{
					if(arr_enrollment_schedule.indexOf(v_date) < 0 ){

						if(show_type == "all"){
							vHtml += '			<td class="text-center" style="width:100px;"></td>';
							vHtml += '			<td class="text-center" style="width:100px;"></td>';
							vHtml += '			<td class="text-center" style="width:100px;"></td>';
						}else{
							vHtml += '			<td class="text-center" style="width:100px;"></td>';
						}
						
						continue;
					}
					//출결 체크
					if(show_type == "all" || show_type == "attend"){
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
					}
					var a_idx = scheduleList.findIndex(t => t.date == v_date); 
					if(a_idx >= 0){
						var s_idx = speechList.findIndex(t => t.date == v_date && t.student_id == student_id);
						if(show_type == "all" || show_type == "speech"){
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
						}
						
						var v_idx = vocaList.findIndex(t => t.date == v_date && t.student_id == student_id);
						if(show_type == "all" || show_type == "voca"){
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
						}
					}else{
						if(show_type == "all" || show_type == "speech"){
							vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">미시행</td>';
						}
						if(show_type == "all" || show_type == "voca"){
							vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">미시행</td>';
						}
					}							
				}
			}

		}
		vHtml += '		</tr>';
	}
	
	return vHtml;
}
</script>
