var array_junior_full= [
	{course_name:"U",  course_level:0},
	{course_name:"U2", course_level:0},
	{course_name:"U3", course_level:0},
	{course_name:"S",  course_level:1},
	{course_name:"S2", course_level:1},
	{course_name:"S3", course_level:1},
	{course_name:"H",  course_level:2},
	{course_name:"H2", course_level:2},
	{course_name:"H3", course_level:2},
	{course_name:"E",  course_level:3},
	{course_name:"E2", course_level:3},
	{course_name:"E3", course_level:3},
	{course_name:"R",  course_level:4}
];


/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	search_semester();
	
	$(window).resize(resizeContents);
    resizeContents();
    
});

/*
 * 설명 : 화면 사이즈 변경시 문제 영역 변경
 */
function resizeContents()
{
	//현재의 사이즈를 찾는다.
	var window_size = $(window).height();
	
	$("#data_list").height(window_size-440);

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

/*
 * 설명 : 반 그룹 조회
 */
function search_course_group()
{
	$.ajax({
		type : "POST",
		url : "/common/getCoursegroupList.do",
		data:{
			semester_id:$("#search_semester_id").val(),
			test_type:$("#search_test_type").val()
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				vHtml += "<option value='"+data[i].id+","+data[i].student_type+"'>"+data[i].name+"</option>";
			}
			
			if(data.length == 0){
				vHtml = "<option value=''>반 그룹</option>";
			}
			
			$("#search_course_group_id").html(vHtml);
			
			$('#search_course_group_id').change(function(e){
				form_search();
			});
			form_search();
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}


function form_search()
{
	if($("#search_course_group_id").val()){
		var arr_course_group_id = $("#search_course_group_id").val().split(",");
		var student_type = arr_course_group_id[1];
		$.ajax({
			type : "POST",
			url : "/batch/getBatchResultCourseGroupList.do",
			data:{
				course_group_id:arr_course_group_id[0]
			},
			success:function(data){
				var arr_course;
				if(student_type == "JUNIOR"){
					arr_course = array_junior;
				}else{
					arr_course = array_senior;
				}
				
				for(var i=0; i<data.length; i++)
				{
					if(data[i].batch_grammar_exam_yn == "Y" && data[i].batch_reading_exam_yn == "Y"){
						var sw1 = data[i].batch_grammar_score1;
						var sw2 = data[i].batch_grammar_score2;
						var rc = data[i].batch_reading_score;
						var lc = data[i].batch_listening_score;
						
						var batch_level = getCourseLevel(sw1, sw2, rc, lc);
						data[i].batch_courses = arr_course[batch_level];
						data[i].batch_courses_level = batch_level;
					}else{
						data[i].batch_courses = null;
						data[i].batch_courses_level = -1;
					}
				}
				create_html(data, student_type);
			},
			error:function(event){				
				alert("잠시후 다시 시도 바랍니다.");
			}
		});
	}else{
		$("#data_list").html("");	
	}
}

function getCourseLevel(sw1, sw2, rc, lc)
{
	//배치고사 성적으로 갈수 있는 반 확인
	var batch_row = 0;
	
	var sw = sw1 + sw2;
	//성적으로 반배치
	if(rc >=35){
		batch_row = 3;
	}else{
		if(sw >= 33 || rc >= 30){
			if(rc >= 25){
				batch_row = 2;
			}else{
				batch_row = 1;
			}
		}else if(sw >= 30 || rc >= 25){
			batch_row = 1;
		}else{
			if(sw1 > 10 || sw >= 30){
				batch_row = 1;
			}
		}
	}	
	
	return batch_row;
}
function create_html(data, student_type)
{
	var vHtml = "";
	var arr_course;
	if(student_type == "JUNIOR"){
		arr_course = array_junior_full;
	}else{
		arr_course = array_senior;
	}
	
	for(var i=arr_course.length-1; i>=0; i--)
	{
		var current_course = i;
		var current_course_name = "";
		
		if(student_type == "JUNIOR"){
			current_course =      arr_course[i].course_level;
			current_course_name = arr_course[i].course_name;
		}else{
			current_course_name = arr_course[i];
		}

		var array_result = data.filter(function(item, index){
			if(item.course_name == current_course_name){
				return true;
			}
		});
		
		vHtml += create_batch(current_course, current_course_name, array_result);
	}
	/*
	var current_course = -1;
	var current_course_name = "미분류";
	var array_result = data.filter(function(item, index){
		if(item.batch_courses == null){
			return true;
		}
	});
	
	vHtml += create_batch(current_course, current_course_name, array_result);
	*/
	$("#data_list").html(vHtml);
}
function create_batch(current_course, current_course_name, array_result)
{
	var vHtml = "";
	var nRow = array_result.length;
	for(var j=0; j<array_result.length; j++)
	{
		var batch_class = "";
		//var user_course_level = get_course_level(array_result[j].course_name, arr_course);
		var user_course_level = array_result[j].batch_courses_level;
		if(user_course_level >= 0 )
		{
			if(current_course < user_course_level){
				batch_class ="bg-green-lighter";
			}else if(current_course > user_course_level){
				batch_class = "bg-red-lighter";
			}
		}
		vHtml += '<tr style="width:860px;">';
		if(j==0){
			vHtml += '<td class="text-center table-info" style="width:120px;" rowspan="'+nRow+'" style="vertical-align: middle;">'+current_course_name+'반<br>('+nRow+'명)'+'</td>';
		}
		vHtml += '<td class="text-center" style="vertical-align: middle;width:120px;">'+array_result[j].user_name+'</td>';
		vHtml += '<td class="text-center '+batch_class+'" style="vertical-align: middle;width:120px;">'+cfmNvl2(array_result[j].batch_courses,"미분류")+'반</td>';
		if(array_result[j].batch_grammar_exam_yn == "Y"){
			var v_herf = '<a href="javascript:open_result_grammar('+array_result[j].id+')">';
			vHtml += '<td class="text-center" style="vertical-align: middle;width:100px;">'+v_herf+array_result[j].batch_grammar_score1+'</a></td>';
			vHtml += '<td class="text-center" style="vertical-align: middle;width:100px;">'+v_herf+array_result[j].batch_grammar_score2+'</a></td>';
			vHtml += '<td class="text-center" style="vertical-align: middle;width:100px;">'+v_herf+(array_result[j].batch_grammar_score1+array_result[j].batch_grammar_score2)+'</a></td>';
		}else{
			vHtml += '<td class="text-center" style="vertical-align: middle;width:100px;">&nbsp;</td>';
			vHtml += '<td class="text-center" style="vertical-align: middle;width:100px;">&nbsp;</td>';
			vHtml += '<td class="text-center" style="vertical-align: middle;width:100px;">&nbsp;</td>';
		}
		if(array_result[j].batch_reading_exam_yn == "Y"){
			var v_herf = '<a href="javascript:open_result_reading('+array_result[j].id+')">';
			vHtml += '<td class="text-center" style="vertical-align: middle;width:100px;">'+v_herf+array_result[j].batch_reading_score+'</a></td>';
		}else{
			vHtml += '<td class="text-center" style="vertical-align: middle;width:100px;">&nbsp;</td>';
		}
		if(array_result[j].batch_listening_exam_yn == "Y"){
			vHtml += '<td class="text-center" style="vertical-align: middle;width:80px;">'+array_result[j].batch_listening_score+'</td>';
		}else{
			vHtml += '<td class="text-center" style="vertical-align: middle;width:80px;">&nbsp;</td>';
		}
		vHtml += '</tr>';
	}	
	return vHtml;
}
function get_course_level(course_name, arr_course)
{
	var rtn_level = -1;
	for(var i=0; i<arr_course.length; i++)
	{
		if(course_name == arr_course[i]){
			rtn_level = i;
			break;
		}
	}
	
	return rtn_level;
}

function form_excel()
{
	var dt = new Date(); 
	var year = itoStr( dt.getFullYear() ); 
	var month = itoStr( dt.getMonth() + 1 ); 
	var day = itoStr( dt.getDate() ); 
	var hour = itoStr( dt.getHours() ); 
	var mins = itoStr( dt.getMinutes() ); 
	var postfix = year + month + day + "_" + hour + mins; 
	var fileName = "MyTable_"+ postfix + ".xls"; 
	var a = document.createElement('a'); 
	var data_type = 'data:application/vnd.ms-excel;charset=utf-8'; 
	var table_div = document.getElementById( "tbl_result" ); 
	var table_html = table_div.outerHTML.replace(/ /g, '%20'); 
	a.href = data_type + ', ' + table_html; 
	a.download = fileName; 
	a.click();

}

function itoStr($num) { 
	$num < 10 ? $num = '0'+$num : $num; 
	return $num.toString(); 
}

function open_result_grammar(id){
	var url = '/batch/review/grammar_review.do?id='+id;
	var option = "scrollbars=no,toolbar=no,location=no,resizable=no,status=no,menubar=no,resizable=no,width=1024,height=750,left=0,top=0";
	window.open(url,'batchwin',option);		
}


function open_result_reading(id){
	var url = '/batch/review/rc_review.do?id='+id;
	var option = "scrollbars=no,toolbar=no,location=no,resizable=no,status=no,menubar=no,resizable=no,width=1024,height=750,left=0,top=0";
	window.open(url,'batchwin',option);			
}
