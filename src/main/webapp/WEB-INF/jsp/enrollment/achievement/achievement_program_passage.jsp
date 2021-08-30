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
				<h4 class="panel-title">${practiceInfo.short_title_kr} ${practiceInfo.practice_name}</h4>
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
var courseInfo;
var dateList;
var date_count;
var cur_date;

var scheduleList;

var attendList;
var phraseList;
var vocaList;

var classCountList;

var nClassH;
var nClassM;

var student_type; 
var lecture_type; 
var difficulty;

var column_length;
jQuery(document).ready(function(){
	$.ajax({
		type : "POST",
		url : "/enrollment/achievement/getProgramPassageList.do",
		data:{
			section:section,
			practice_type:practice_type,
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
			phraseList = data.phraseList;
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
			vHtml += '			<th class="text-center table-info" rowspan="3" style="width:60px;">상태</th>';
			vHtml += '			<th class="text-center table-info" rowspan="3" style="width:60px;">번호</th>';
			vHtml += '			<th class="text-center table-info" rowspan="3" style="width:100px;">이름</th>';
			vHtml += '			<th class="text-center table-info" rowspan="3" style="width:80px;">기존/신규</th>';
			//for(var i=0; i<date_count; i++)
			column_length = 3;
			for(var i=date_count-1; i>=0; i--)
			{
				var v_date = dateList[i];
				if(cur_date < v_date) continue;
				var s_count = scheduleList.filter(function(item, index){
									if(item.date == v_date){
										return true;
									}
							}).length;
				if(s_count == 0){
					s_count = 1;
				}
				
				s_count = s_count * 2;
				var s_width = 100 * s_count;
				
				vHtml += '			<th class="text-center table-info" colspan="'+s_count+'" style="width:'+s_width+'px;">'+dateList[i]+'</th>';
			}
			vHtml += '		</tr>';
			vHtml += '		<tr>';
			//for(var i=0; i<date_count; i++)
			for(var i=date_count-1; i>=0; i--)
			{
				var v_date = dateList[i];
				if(cur_date < v_date) continue;
				var arr_schedule = scheduleList.filter(function(item, index){
									if(item.date == v_date){
										return true;
									}
							});
				if(arr_schedule.length == 0){
					vHtml += '			<th class="text-center table-info" colspan="2" style="width:200px;">&nbsp;</th>';
				}else{
					for(var j=0; j<arr_schedule.length; j++)
					{
						var v_title = '';
						if(arr_schedule[j].short_title){
							v_title += arr_schedule[j].short_title + '<br>';
						}
						
						v_title += arr_schedule[j].book;
						
						if(arr_schedule[j].volume){
							v_title += ' '+arr_schedule[j].volume;
						}
						
						if(arr_schedule[j].group){
							v_title += ' '+arr_schedule[j].group;
						}
					
						if(arr_schedule[j].article){
							v_title += ' '+arr_schedule[j].article;
						}
						
						vHtml += '			<th class="text-center table-info" colspan="2" style="width:200px;">'+v_title+'</th>';
					}
				}
			}
			vHtml += '		</tr>';
			vHtml += '		<tr>';
			//for(var i=0; i<date_count; i++)
			for(var i=date_count-1; i>=0; i--)
			{
				var v_date = dateList[i];
				if(cur_date < v_date) continue;
				var arr_schedule = scheduleList.filter(function(item, index){
									if(item.date == v_date){
										return true;
									}
							});
				if(arr_schedule.length == 0){
					vHtml += '			<th class="text-center table-info" style="width:100px;">구문</th>';
					column_length++;
					vHtml += '			<th class="text-center table-info" style="width:100px;">단어</th>';
					column_length++;
				}else{
					for(var j=0; j<arr_schedule.length; j++)
					{
						vHtml += '			<th class="text-center table-info" style="width:100px;">구문</th>';
						column_length++;
						vHtml += '			<th class="text-center table-info" style="width:100px;">단어</th>';
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
				var v_book = $(this).find("#book").val();
				var v_volume = $(this).find("#volume").val();
				var v_group = $(this).find("#group").val();
				var v_article = $(this).find("#article").val();
				var v_end_paragraph = $(this).find("#end_paragraph").val();
				move_result(v_section, v_practice_type,v_course_enrollment_id, v_date, v_book, v_volume, v_group, v_article, v_end_paragraph);
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
	
});

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
		vHtml += '			<td class="text-center '+class_clazz+'" style="width:60px;">'+(i+1)+'</td>';
		vHtml += '			<td class="text-center '+class_clazz+'" style="width:100px;"><a href="javascript:student_login(\''+enrollmentList[i].username+'\')">'+enrollmentList[i].last_name+enrollmentList[i].first_name+'</a></td>';
		vHtml += '			<td class="text-center '+class_clazz+'" style="width:80px;">'+cfmLpad(class_count+"",3," ")+'회 / '+cfmLpad(all_class_count+"",3," ")+'회('+sReg+')</td>';
		//for(var j=0; j<date_count; j++)
		for(var j=date_count-1; j>=0; j--)
		{
			var v_date = dateList[j];
			if(cur_date < v_date) continue;
			
			var arr_schedule = scheduleList.filter(function(item, index){
								if(item.date == v_date){
									return true;
								}
						});
			
			if(arr_schedule.length == 0){
				if(cur_date < v_date)
				{
					vHtml += '			<td class="text-center" style="width:100px;">&nbsp;</td>';
					vHtml += '			<td class="text-center" style="width:100px;">&nbsp;</td>';
				}else{
					if(v_date < enrollmentList[i].move_date)
					{
						vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">반이동</td>';
						vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">반이동</td>';
						
					}else if(v_date < first_date)
					{
						vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">중간등록</td>';
						vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">중간등록</td>';
					}else{
						if(arr_enrollment_schedule.indexOf(v_date) < 0 ){
							vHtml += '			<td class="text-center" style="width:100px;"></td>';
							vHtml += '			<td class="text-center" style="width:100px;"></td>';
							continue;
						}
						vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">미시행</td>';
						vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">미시행</td>';
					}
				}
			}else{
				for(var k=0; k<arr_schedule.length; k++)
				{
					if(cur_date < v_date)
					{
						vHtml += '			<td class="text-center" style="width:100px;">&nbsp;</td>';
						vHtml += '			<td class="text-center" style="width:100px;">&nbsp;</td>';
					}else{
						if(v_date < enrollmentList[i].move_date)
						{
							vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">반이동</td>';
							vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">반이동</td>';
							
						}else if(v_date < first_date)
						{
							vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">중간등록</td>';
							vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">중간등록</td>';
						}else{
							if(arr_enrollment_schedule.indexOf(v_date) < 0 ){
								vHtml += '			<td class="text-center" style="width:100px;"></td>';
								vHtml += '			<td class="text-center" style="width:100px;"></td>';
								continue;
							}
							var v_book = arr_schedule[k].book;
							var v_volume = arr_schedule[k].volume;
							var v_group = arr_schedule[k].group;
							var v_article = arr_schedule[k].article;
							var v_end_paragraph = arr_schedule[k].end_paragraph;
							var t_idx = attendList.findIndex(t => t.date == v_date && t.course_enrollment_id == course_enrollment_id); 
							var r_idx = phraseList.findIndex(t => t.date == v_date 
																&& t.course_enrollment_id == course_enrollment_id
																&& t.book == v_book
																&& t.volume == v_volume
																&& t.group == v_group
																&& t.article == v_article
																&& t.end_paragraph == v_end_paragraph); 

							var v_idx = vocaList.findIndex(t => t.date == v_date 
																&& t.course_enrollment_id == course_enrollment_id
																&& t.book == v_book
																&& t.volume == v_volume
																&& t.group == v_group
																&& t.article == v_article
																&& t.end_paragraph == v_end_paragraph); 

							if(r_idx >= 0)
							{
								if(phraseList[r_idx].pass_result){
									vHtml += '<td class="click_practice bg-green text-center" style="width:100px;cursor:pointer;">';
									vHtml += '<input type="hidden" id="section" value="'+section+'">';
									vHtml += '<input type="hidden" id="practice_type" value="PASSAGE_PHRASE">';
									vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
									vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
									vHtml += '<input type="hidden" id="book" value="'+v_book+'">';
									vHtml += '<input type="hidden" id="volume" value="'+v_volume+'">';
									vHtml += '<input type="hidden" id="group" value="'+v_group+'">';
									vHtml += '<input type="hidden" id="article" value="'+v_article+'">';
									vHtml += '<input type="hidden" id="end_paragraph" value="'+v_end_paragraph+'">';
									vHtml += cfmLpad(phraseList[r_idx].score+"",3," ")+'/'+cfmLpad(phraseList[r_idx].total_score+"",3," ");
									vHtml += '</td>';
									//vHtml += '			<td class="bg-green text-center" style="width:100px;">O</td>';
								}else{
									vHtml += '<td class="click_practice bg-red text-center" style="width:100px;cursor:pointer;">';
									vHtml += '<input type="hidden" id="section" value="'+section+'">';
									vHtml += '<input type="hidden" id="practice_type" value="PASSAGE_PHRASE">';
									vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
									vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
									vHtml += '<input type="hidden" id="book" value="'+v_book+'">';
									vHtml += '<input type="hidden" id="volume" value="'+v_volume+'">';
									vHtml += '<input type="hidden" id="group" value="'+v_group+'">';
									vHtml += '<input type="hidden" id="article" value="'+v_article+'">';
									vHtml += '<input type="hidden" id="end_paragraph" value="'+v_end_paragraph+'">';
									vHtml += cfmLpad(phraseList[r_idx].score+"",3," ")+'/'+cfmLpad(phraseList[r_idx].total_score+"",3," ");
									vHtml += '</td>';
									//vHtml += '			<td class="bg-red text-center" style="width:100px;">X</td>';
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
							
							if(v_idx >= 0)
							{
								if(vocaList[v_idx].pass_result){
									vHtml += '<td class="click_practice bg-green text-center" style="width:100px;cursor:pointer;">';
									vHtml += '<input type="hidden" id="section" value="'+section+'">';
									vHtml += '<input type="hidden" id="practice_type" value="PASSAGE_VOCA">';
									vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
									vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
									vHtml += '<input type="hidden" id="book" value="'+v_book+'">';
									vHtml += '<input type="hidden" id="volume" value="'+v_volume+'">';
									vHtml += '<input type="hidden" id="group" value="'+v_group+'">';
									vHtml += '<input type="hidden" id="article" value="'+v_article+'">';
									vHtml += '<input type="hidden" id="end_paragraph" value="'+v_end_paragraph+'">';
									vHtml += cfmLpad(vocaList[v_idx].score+"",3," ")+'/'+cfmLpad(vocaList[v_idx].total_score+"",3," ");
									vHtml += '</td>';
									//vHtml += '			<td class="bg-green text-center" style="width:100px;">O</td>';
								}else{
									vHtml += '<td class="click_practice bg-red text-center" style="width:100px;cursor:pointer;">';
									vHtml += '<input type="hidden" id="section" value="'+section+'">';
									vHtml += '<input type="hidden" id="practice_type" value="PASSAGE_VOCA">';
									vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
									vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
									vHtml += '<input type="hidden" id="book" value="'+v_book+'">';
									vHtml += '<input type="hidden" id="volume" value="'+v_volume+'">';
									vHtml += '<input type="hidden" id="group" value="'+v_group+'">';
									vHtml += '<input type="hidden" id="article" value="'+v_article+'">';
									vHtml += '<input type="hidden" id="end_paragraph" value="'+v_end_paragraph+'">';
									vHtml += cfmLpad(vocaList[v_idx].score+"",3," ")+'/'+cfmLpad(vocaList[v_idx].total_score+"",3," ");
									vHtml += '</td>';
									//vHtml += '			<td class="bg-red text-center" style="width:100px;">X</td>';
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
			
			var arr_schedule = scheduleList.filter(function(item, index){
								if(item.date == v_date){
									return true;
								}
						});
			
			if(arr_schedule.length == 0){
				if(cur_date < v_date)
				{
					vHtml += '			<td class="text-center" style="width:100px;">&nbsp;</td>';
					vHtml += '			<td class="text-center" style="width:100px;">&nbsp;</td>';
				}else{
					if(v_date >= enrollmentList[i].move_date)
					{
						vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">반이동</td>';
						vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">반이동</td>';
						
					}else if(v_date < first_date)
					{
						vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">중간등록</td>';
						vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">중간등록</td>';
					}else{
						if(arr_enrollment_schedule.indexOf(v_date) < 0 ){
							vHtml += '			<td class="text-center" style="width:100px;"></td>';
							vHtml += '			<td class="text-center" style="width:100px;"></td>';
							continue;
						}
						vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">미시행</td>';
						vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">미시행</td>';
					}
				}
			}else{
				for(var k=0; k<arr_schedule.length; k++)
				{
					if(cur_date < v_date)
					{
						vHtml += '			<td class="text-center" style="width:100px;">&nbsp;</td>';
						vHtml += '			<td class="text-center" style="width:100px;">&nbsp;</td>';
					}else{
						if(v_date >= enrollmentList[i].move_date)
						{
							vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">반이동</td>';
							vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">반이동</td>';
							
						}else if(v_date < first_date)
						{
							vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">중간등록</td>';
							vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">중간등록</td>';
						}else{
							if(arr_enrollment_schedule.indexOf(v_date) < 0 ){
								vHtml += '			<td class="text-center" style="width:100px;"></td>';
								vHtml += '			<td class="text-center" style="width:100px;"></td>';
								continue;
							}
							var v_book = arr_schedule[k].book;
							var v_volume = arr_schedule[k].volume;
							var v_group = arr_schedule[k].group;
							var v_article = arr_schedule[k].article;
							var v_end_paragraph = arr_schedule[k].end_paragraph;
							var t_idx = attendList.findIndex(t => t.date == v_date && t.course_enrollment_id == course_enrollment_id); 
							var r_idx = phraseList.findIndex(t => t.date == v_date 
																&& t.course_enrollment_id == course_enrollment_id
																&& t.book == v_book
																&& t.volume == v_volume
																&& t.group == v_group
																&& t.article == v_article
																&& t.end_paragraph == v_end_paragraph); 

							var v_idx = vocaList.findIndex(t => t.date == v_date 
																&& t.course_enrollment_id == course_enrollment_id
																&& t.book == v_book
																&& t.volume == v_volume
																&& t.group == v_group
																&& t.article == v_article
																&& t.end_paragraph == v_end_paragraph); 

							if(r_idx >= 0)
							{
								if(phraseList[r_idx].pass_result){
									vHtml += '<td class="click_practice bg-green text-center" style="width:100px;cursor:pointer;">';
									vHtml += '<input type="hidden" id="section" value="'+section+'">';
									vHtml += '<input type="hidden" id="practice_type" value="PASSAGE_PHRASE">';
									vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
									vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
									vHtml += '<input type="hidden" id="book" value="'+v_book+'">';
									vHtml += '<input type="hidden" id="volume" value="'+v_volume+'">';
									vHtml += '<input type="hidden" id="group" value="'+v_group+'">';
									vHtml += '<input type="hidden" id="article" value="'+v_article+'">';
									vHtml += '<input type="hidden" id="end_paragraph" value="'+v_end_paragraph+'">';
									vHtml += cfmLpad(phraseList[r_idx].score+"",3," ")+'/'+cfmLpad(phraseList[r_idx].total_score+"",3," ");
									vHtml += '</td>';
									//vHtml += '			<td class="bg-green text-center" style="width:100px;">O</td>';
								}else{
									vHtml += '<td class="click_practice bg-red text-center" style="width:100px;cursor:pointer;">';
									vHtml += '<input type="hidden" id="section" value="'+section+'">';
									vHtml += '<input type="hidden" id="practice_type" value="PASSAGE_PHRASE">';
									vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
									vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
									vHtml += '<input type="hidden" id="book" value="'+v_book+'">';
									vHtml += '<input type="hidden" id="volume" value="'+v_volume+'">';
									vHtml += '<input type="hidden" id="group" value="'+v_group+'">';
									vHtml += '<input type="hidden" id="article" value="'+v_article+'">';
									vHtml += '<input type="hidden" id="end_paragraph" value="'+v_end_paragraph+'">';
									vHtml += cfmLpad(phraseList[r_idx].score+"",3," ")+'/'+cfmLpad(phraseList[r_idx].total_score+"",3," ");
									vHtml += '</td>';
									//vHtml += '			<td class="bg-red text-center" style="width:100px;">X</td>';
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
							
							if(v_idx >= 0)
							{
								if(vocaList[v_idx].pass_result){
									vHtml += '<td class="click_practice bg-green text-center" style="width:100px;cursor:pointer;">';
									vHtml += '<input type="hidden" id="section" value="'+section+'">';
									vHtml += '<input type="hidden" id="practice_type" value="PASSAGE_VOCA">';
									vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
									vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
									vHtml += '<input type="hidden" id="book" value="'+v_book+'">';
									vHtml += '<input type="hidden" id="volume" value="'+v_volume+'">';
									vHtml += '<input type="hidden" id="group" value="'+v_group+'">';
									vHtml += '<input type="hidden" id="article" value="'+v_article+'">';
									vHtml += '<input type="hidden" id="end_paragraph" value="'+v_end_paragraph+'">';
									vHtml += cfmLpad(vocaList[v_idx].score+"",3," ")+'/'+cfmLpad(vocaList[v_idx].total_score+"",3," ");
									vHtml += '</td>';
									//vHtml += '			<td class="bg-green text-center" style="width:100px;">O</td>';
								}else{
									vHtml += '<td class="click_practice bg-red text-center" style="width:100px;cursor:pointer;">';
									vHtml += '<input type="hidden" id="section" value="'+section+'">';
									vHtml += '<input type="hidden" id="practice_type" value="PASSAGE_VOCA">';
									vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
									vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
									vHtml += '<input type="hidden" id="book" value="'+v_book+'">';
									vHtml += '<input type="hidden" id="volume" value="'+v_volume+'">';
									vHtml += '<input type="hidden" id="group" value="'+v_group+'">';
									vHtml += '<input type="hidden" id="article" value="'+v_article+'">';
									vHtml += '<input type="hidden" id="end_paragraph" value="'+v_end_paragraph+'">';
									vHtml += cfmLpad(vocaList[v_idx].score+"",3," ")+'/'+cfmLpad(vocaList[v_idx].total_score+"",3," ");
									vHtml += '</td>';
									//vHtml += '			<td class="bg-red text-center" style="width:100px;">X</td>';
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
			
			var arr_schedule = scheduleList.filter(function(item, index){
								if(item.date == v_date){
									return true;
								}
						});
			
			if(arr_schedule.length == 0){
				if(cur_date < v_date)
				{
					vHtml += '			<td class="text-center" style="width:100px;">&nbsp;</td>';
					vHtml += '			<td class="text-center" style="width:100px;">&nbsp;</td>';
				}else{
					if(v_date >= enrollmentList[i].move_date)
					{
						vHtml += '			<td class="text-center" style="width:100px;">&nbsp;</td>';
						vHtml += '			<td class="text-center" style="width:100px;">&nbsp;</td>';
						
					}else if(v_date < first_date)
					{
						vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">중간등록</td>';
						vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">중간등록</td>';
					}else{
						if(arr_enrollment_schedule.indexOf(v_date) < 0 ){
							vHtml += '			<td class="text-center" style="width:100px;"></td>';
							vHtml += '			<td class="text-center" style="width:100px;"></td>';
							continue;
						}
						vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">미시행</td>';
						vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">미시행</td>';
					}
				}
			}else{
				for(var k=0; k<arr_schedule.length; k++)
				{
					if(cur_date < v_date)
					{
						vHtml += '			<td class="text-center" style="width:100px;">&nbsp;</td>';
						vHtml += '			<td class="text-center" style="width:100px;">&nbsp;</td>';
					}else{
						if(v_date >= enrollmentList[i].move_date)
						{
							vHtml += '			<td class="text-center" style="width:100px;">&nbsp;</td>';
							vHtml += '			<td class="text-center" style="width:100px;">&nbsp;</td>';
							
						}else if(v_date < first_date)
						{
							vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">중간등록</td>';
							vHtml += '			<td class="bg-grey-darker text-center" style="width:100px;">중간등록</td>';
						}else{
							if(arr_enrollment_schedule.indexOf(v_date) < 0 ){
								vHtml += '			<td class="text-center" style="width:100px;"></td>';
								vHtml += '			<td class="text-center" style="width:100px;"></td>';
								continue;
							}
							var v_book = arr_schedule[k].book;
							var v_volume = arr_schedule[k].volume;
							var v_group = arr_schedule[k].group;
							var v_article = arr_schedule[k].article;
							var v_end_paragraph = arr_schedule[k].end_paragraph;
							var t_idx = attendList.findIndex(t => t.date == v_date && t.course_enrollment_id == course_enrollment_id); 
							var r_idx = phraseList.findIndex(t => t.date == v_date 
																&& t.course_enrollment_id == course_enrollment_id
																&& t.book == v_book
																&& t.volume == v_volume
																&& t.group == v_group
																&& t.article == v_article
																&& t.end_paragraph == v_end_paragraph); 

							var v_idx = vocaList.findIndex(t => t.date == v_date 
																&& t.course_enrollment_id == course_enrollment_id
																&& t.book == v_book
																&& t.volume == v_volume
																&& t.group == v_group
																&& t.article == v_article
																&& t.end_paragraph == v_end_paragraph); 

							if(r_idx >= 0)
							{
								if(phraseList[r_idx].pass_result){
									vHtml += '<td class="click_practice bg-green text-center" style="width:100px;cursor:pointer;">';
									vHtml += '<input type="hidden" id="section" value="'+section+'">';
									vHtml += '<input type="hidden" id="practice_type" value="PASSAGE_PHRASE">';
									vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
									vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
									vHtml += '<input type="hidden" id="book" value="'+v_book+'">';
									vHtml += '<input type="hidden" id="volume" value="'+v_volume+'">';
									vHtml += '<input type="hidden" id="group" value="'+v_group+'">';
									vHtml += '<input type="hidden" id="article" value="'+v_article+'">';
									vHtml += '<input type="hidden" id="end_paragraph" value="'+v_end_paragraph+'">';
									vHtml += cfmLpad(phraseList[r_idx].score+"",3," ")+'/'+cfmLpad(phraseList[r_idx].total_score+"",3," ");
									vHtml += '</td>';
									//vHtml += '			<td class="bg-green text-center" style="width:100px;">O</td>';
								}else{
									vHtml += '<td class="click_practice bg-red text-center" style="width:100px;cursor:pointer;">';
									vHtml += '<input type="hidden" id="section" value="'+section+'">';
									vHtml += '<input type="hidden" id="practice_type" value="PASSAGE_PHRASE">';
									vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
									vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
									vHtml += '<input type="hidden" id="book" value="'+v_book+'">';
									vHtml += '<input type="hidden" id="volume" value="'+v_volume+'">';
									vHtml += '<input type="hidden" id="group" value="'+v_group+'">';
									vHtml += '<input type="hidden" id="article" value="'+v_article+'">';
									vHtml += '<input type="hidden" id="end_paragraph" value="'+v_end_paragraph+'">';
									vHtml += cfmLpad(phraseList[r_idx].score+"",3," ")+'/'+cfmLpad(phraseList[r_idx].total_score+"",3," ");
									vHtml += '</td>';
									//vHtml += '			<td class="bg-red text-center" style="width:100px;">X</td>';
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
							
							if(v_idx >= 0)
							{
								if(vocaList[v_idx].pass_result){
									vHtml += '<td class="click_practice bg-green text-center" style="width:100px;cursor:pointer;">';
									vHtml += '<input type="hidden" id="section" value="'+section+'">';
									vHtml += '<input type="hidden" id="practice_type" value="PASSAGE_VOCA">';
									vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
									vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
									vHtml += '<input type="hidden" id="book" value="'+v_book+'">';
									vHtml += '<input type="hidden" id="volume" value="'+v_volume+'">';
									vHtml += '<input type="hidden" id="group" value="'+v_group+'">';
									vHtml += '<input type="hidden" id="article" value="'+v_article+'">';
									vHtml += '<input type="hidden" id="end_paragraph" value="'+v_end_paragraph+'">';
									vHtml += cfmLpad(vocaList[v_idx].score+"",3," ")+'/'+cfmLpad(vocaList[v_idx].total_score+"",3," ");
									vHtml += '</td>';
									//vHtml += '			<td class="bg-green text-center" style="width:100px;">O</td>';
								}else{
									vHtml += '<td class="click_practice bg-red text-center" style="width:100px;cursor:pointer;">';
									vHtml += '<input type="hidden" id="section" value="'+section+'">';
									vHtml += '<input type="hidden" id="practice_type" value="PASSAGE_VOCA">';
									vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
									vHtml += '<input type="hidden" id="date" value="'+v_date+'">';
									vHtml += '<input type="hidden" id="book" value="'+v_book+'">';
									vHtml += '<input type="hidden" id="volume" value="'+v_volume+'">';
									vHtml += '<input type="hidden" id="group" value="'+v_group+'">';
									vHtml += '<input type="hidden" id="article" value="'+v_article+'">';
									vHtml += '<input type="hidden" id="end_paragraph" value="'+v_end_paragraph+'">';
									vHtml += cfmLpad(vocaList[v_idx].score+"",3," ")+'/'+cfmLpad(vocaList[v_idx].total_score+"",3," ");
									vHtml += '</td>';
									//vHtml += '			<td class="bg-red text-center" style="width:100px;">X</td>';
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

		}
		vHtml += '		</tr>';
	}
	
	return vHtml;
	
}

</script>