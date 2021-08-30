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
var exam_type = {
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
jQuery(document).ready(function(){
	$.ajax({
		type : "POST",
		url : "/enrollment/achievement/getQuizMonthlyGrList.do",
		data:{
			section:section,
			practice_type:practice_type,
			course_id : course_id
		},
		success:function(data){
			var vHtml = "";
			var enrollmentList = data.enrollmentList;
			var enrollment_count = enrollmentList.length;
			var problemList = data.problemList;
			var scheduleList = exam_type[practice_type];
			var resultList = data.resultList;
			var courseInfo = data.courseInfo;
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
			for(var i=0; i<problemList.length; i++)
			{
				var nCol = scheduleList.length;
				var nWidth = 100 * nCol;
				vHtml += '			<th class="text-center table-info" colspan="'+nCol+'" style="width:'+nWidth+'px;">'+problemList[i].volume+'</th>';
			}
			vHtml += '		</tr>';
			vHtml += '		<tr>';
			for(var j=0; j<problemList.length; j++)
			{
				for(var i=0; i<scheduleList.length; i++)
				{
					vHtml += '			<th class="text-center table-info" style="width:100px;">'+scheduleList[i]+'</th>';
				}
			}
			vHtml += '		</tr>';
			vHtml += '	</thead>';
			vHtml += '	<tbody>';
			for(var i=0; i<enrollment_count; i++)
			{
				var course_enrollment_id = enrollmentList[i].course_enrollment_id;
				var student_id = enrollmentList[i].student_id;

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
				for(var t=0; t<problemList.length; t++)
				{
					var v_section = problemList[t].section;
					var v_book    = problemList[t].book;
					var v_volume  = problemList[t].volume;
					var v_group   = problemList[t].group;
					var v_article = problemList[t].article;
					for(var j=0; j<scheduleList.length; j++)
					{
						
						var v_passage = scheduleList[j];
						var t_idx = resultList.findIndex(t => t.passage == v_passage && 
															  t.section == v_section && 
															  t.book == v_book && 
															  t.volume == v_volume && 
															  t.group == v_group && 
															  t.article == v_article && 
															  t.course_enrollment_id == course_enrollment_id); 
						if(t_idx >= 0)
						{
							if(resultList[t_idx].pass_result){
								vHtml += '			<td class="bg-green text-center" style="width:100px;">O</td>';
							}else{
								vHtml += '			<td class="bg-red text-center" style="width:100px;">X</td>';
							}
						}else{
							vHtml += '			<td class="text-center" style="width:100px;">&nbsp;</td>';
						}
	
					}
				}
				vHtml += '		</tr>';
			}
			vHtml += '	</tbody>';
			vHtml += '</table>';
			$("#table_info").html(vHtml);
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