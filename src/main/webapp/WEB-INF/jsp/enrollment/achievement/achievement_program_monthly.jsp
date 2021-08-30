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
jQuery(document).ready(function(){
	$.ajax({
		type : "POST",
		url : "/enrollment/achievement/getProgramMonthlyList.do",
		data:{
			section:section,
			practice_type:practice_type,
			course_id : course_id
		},
		success:function(data){
			var vHtml = "";
			var enrollmentList = data.enrollmentList;
			var enrollment_count = enrollmentList.length;
			
			var courseInfo = data.courseInfo;
			var dateList = courseInfo.schedule.split(",");
			var date_count = dateList.length;
			var cur_date = courseInfo.cur_date;
			
			var scheduleList = data.scheduleList;
			
			var attendList = data.attendList;
			var resultList = data.resultList;
			
			var classCountList = data.classCountList;
			
			var nClassH = 0;
			var nClassM = 0;
			
			var student_type = courseInfo.student_type; 
			var lecture_type = courseInfo.lecture_type; 
			var difficulty = courseInfo.difficulty; 
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
			vHtml += '			<th class="text-center table-info" rowspan="2" style="width:60px;">번호</th>';
			vHtml += '			<th class="text-center table-info" rowspan="2" style="width:100px;">이름</th>';
			vHtml += '			<th class="text-center table-info" rowspan="2" style="width:80px;">기존/신규</th>';
			//for(var i=0; i<date_count; i++)
			for(var i=0; i<scheduleList.length; i++)
			{
				var v_title = '';
				/*
				if(scheduleList[i].short_title){
					v_title += scheduleList[i].short_title + '<br>';
				}
				
				v_title += scheduleList[i].book;
				*/
				
				if(scheduleList[i].volume){
					v_title += ' '+scheduleList[i].volume;
				}
				
				/*
				if(scheduleList[i].group){
					v_title += ' '+scheduleList[i].group;
				}
				if(scheduleList[i].article){
					v_title += ' '+scheduleList[i].article;
				}
				*/
				
				vHtml += '			<th class="text-center table-info" style="width:100px;">'+v_title+'</th>';
			}
			vHtml += '		</tr>';
			vHtml += '	</thead>';
			vHtml += '	<tbody>';
			for(var i=0; i<enrollment_count; i++)
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
				
				vHtml += '		<tr>';
				vHtml += '			<td class="text-center '+class_clazz+'" style="width:60px;">'+(i+1)+'</td>';
				vHtml += '			<td class="text-center '+class_clazz+'" style="width:100px;"><a href="javascript:student_login(\''+enrollmentList[i].username+'\')">'+enrollmentList[i].last_name+enrollmentList[i].first_name+'</a></td>';
				vHtml += '			<td class="text-center '+class_clazz+'" style="width:80px;">'+cfmLpad(class_count+"",3," ")+'회 / '+cfmLpad(all_class_count+"",3," ")+'회('+sReg+')</td>';
				//for(var j=0; j<date_count; j++)
				for(var j=0; j<scheduleList.length; j++)
				{
					var v_book = scheduleList[j].book;
					var v_volume = scheduleList[j].volume;
					var v_group = scheduleList[j].group;
					var v_article = scheduleList[j].article;
					var v_end_paragraph = scheduleList[j].end_paragraph;

					var r_idx = resultList.findIndex(t => t.course_enrollment_id == course_enrollment_id
							&& t.book == v_book
							&& t.volume == v_volume
							&& t.group == v_group
							&& t.article == v_article
							&& t.end_paragraph == v_end_paragraph); 
					if(r_idx >= 0)
					{
						var score1 = resultList[r_idx].score;
						var total_score1 = resultList[r_idx].total_score;
						var score = score1+"/"+total_score1;
						if(resultList[r_idx].pass_result)
						{
							vHtml += '<td class="click_practice bg-green text-center" style="width:100px;cursor:pointer;">';
							vHtml += '<input type="hidden" id="section" value="'+section+'">';
							vHtml += '<input type="hidden" id="practice_type" value="'+practice_type+'">';
							vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
							vHtml += '<input type="hidden" id="date" value="">';
							vHtml += '<input type="hidden" id="book" value="'+v_book+'">';
							vHtml += '<input type="hidden" id="volume" value="'+v_volume+'">';
							vHtml += '<input type="hidden" id="group" value="'+v_group+'">';
							vHtml += '<input type="hidden" id="article" value="'+v_article+'">';
							vHtml += '<input type="hidden" id="end_paragraph" value="'+v_end_paragraph+'">';
							vHtml += score;
							vHtml += '</td>';
							
							//vHtml += '			<td class="bg-green text-center" style="width:100px;">'+score+'</td>';
						}else{
							vHtml += '<td class="click_practice bg-red text-center" style="width:100px;cursor:pointer;">';
							vHtml += '<input type="hidden" id="section" value="'+section+'">';
							vHtml += '<input type="hidden" id="practice_type" value="'+practice_type+'">';
							vHtml += '<input type="hidden" id="course_enrollment_id" value="'+course_enrollment_id+'">';
							vHtml += '<input type="hidden" id="date" value="">';
							vHtml += '<input type="hidden" id="book" value="'+v_book+'">';
							vHtml += '<input type="hidden" id="volume" value="'+v_volume+'">';
							vHtml += '<input type="hidden" id="group" value="'+v_group+'">';
							vHtml += '<input type="hidden" id="article" value="'+v_article+'">';
							vHtml += '<input type="hidden" id="end_paragraph" value="'+v_end_paragraph+'">';
							vHtml += score;
							vHtml += '</td>';

							//vHtml += '			<td class="bg-red text-center" style="width:100px;">'+score+'</td>';
						}
					}else{
						vHtml += '			<td class="text-center" style="width:100px;">&nbsp;</td>';						
					}

				}
				vHtml += '		</tr>';
			}
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
			
			oTable = $('#example').DataTable( {
		        searching: false,
		        info:false,
		        scrollY:        '60vh',
		        scrollX:        true,
		        scrollCollapse: true,
		        paging:         false,
		        fixedColumns:   {
		            leftColumns: 3
		        }
		    } );
			$("#example tbody tr td").css("padding","0px");
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
	
});
</script>