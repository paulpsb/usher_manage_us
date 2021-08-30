

/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	
	(function($) {
		  $.fn.inputFilter = function(inputFilter) {
		    return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function() {
		      if (inputFilter(this.value)) {
		        this.oldValue = this.value;
		        this.oldSelectionStart = this.selectionStart;
		        this.oldSelectionEnd = this.selectionEnd;
		      } else if (this.hasOwnProperty("oldValue")) {
		        this.value = this.oldValue;
		        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
		      }
		    });
		  };
	}(jQuery));
	
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
		url : "/enrollment/getAchieveToeflExamMockList.do",
		data:{
			course_id : $("#course_id").val()
		},
		success:function(data){
			//상단화면을 그려준다.
			create_top_menu(data.sectionList, data.practiceAllList, "exam", "toefl_mock_exam", $("#course_id").val(), data.courseInfo.student_type);
			
			var enrollmentList = data.enrollmentList;
			var courseInfo = data.courseInfo;
			var classCountList = data.classCountList;
			
			var semesterInfo = data.semesterInfo;
			
			var nWidth=80;
			var vHtml = "";
			vHtml += '<table id="example"  class="table table-bordered table-td-valign-middle m-b-0">';
			vHtml += '	<thead>';
			vHtml += '		<tr>';
			vHtml += '			<th class="text-center table-info" rowspan="2" style="width:60px;">상태</th>';
			vHtml += '			<th class="text-center table-info" rowspan="2" style="width:60px;">번호</th>';
			vHtml += '			<th class="text-center table-info" rowspan="2" style="width:100px;">이름</th>';
			vHtml += '			<th class="text-center table-info" rowspan="2" style="width:80px;">기존/신규</th>';
			vHtml += '			<th class="text-center table-info" colspan="5" style="width:'+(nWidth*5)+'px;">'+semesterInfo.date+' 모의토플 성적</th>';
			vHtml += '			<th class="text-center table-info" colspan="5" style="width:'+(nWidth*5)+'px;">'+semesterInfo.pre_date1+' 모의토플 성적</th>';
			vHtml += '			<th class="text-center table-info" colspan="5" style="width:'+(nWidth*5)+'px;">'+semesterInfo.pre_date2+' 모의토플 성적</th>';
			vHtml += '			<th class="text-center table-info" colspan="5" style="width:'+(nWidth*5)+'px;">'+semesterInfo.pre_date3+' 모의토플 성적</th>';
			vHtml += '			<th class="text-center table-info" colspan="5" style="width:'+(nWidth*5)+'px;">'+semesterInfo.pre_date4+' 모의토플 성적</th>';
			vHtml += '			<th class="text-center table-info" colspan="5" style="width:'+(nWidth*5)+'px;">'+semesterInfo.pre_date5+' 모의토플 성적</th>';
			vHtml += '		</tr>';
			vHtml += '		<tr>';
			vHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">RC</th>';
			vHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">LC</th>';
			vHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">SP</th>';
			vHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">WR</th>';
			vHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">Total</th>';
			vHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">RC</th>';
			vHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">LC</th>';
			vHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">SP</th>';
			vHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">WR</th>';
			vHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">Total</th>';
			vHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">RC</th>';
			vHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">LC</th>';
			vHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">SP</th>';
			vHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">WR</th>';
			vHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">Total</th>';
			vHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">RC</th>';
			vHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">LC</th>';
			vHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">SP</th>';
			vHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">WR</th>';
			vHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">Total</th>';
			vHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">RC</th>';
			vHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">LC</th>';
			vHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">SP</th>';
			vHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">WR</th>';
			vHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">Total</th>';
			vHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">RC</th>';
			vHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">LC</th>';
			vHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">SP</th>';
			vHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">WR</th>';
			vHtml += '			<th class="text-center table-info" style="width:'+nWidth+'px;">Total</th>';
			vHtml += '		</tr>';
			vHtml += '	</thead>';
			vHtml += '	<tbody>';
			for(var i=0; i<enrollmentList.length; i++)
			{
				if(enrollmentList[i].class_gubun == "반이동"){
					if(enrollmentList[i].user_first_date == course_first_date){
						continue;
					}
				}
				var course_enrollment_id = enrollmentList[i].course_enrollment_id;
				var student_id = enrollmentList[i].student_id;
				
				vHtml += '		<tr>';
				vHtml += create_student_info(enrollmentList[i], courseInfo, classCountList);
				
				var v_user_id = enrollmentList[i].user_id;
				var v_user_nm = enrollmentList[i].last_name+enrollmentList[i].first_name;
				
				for(var j=0; j<6; j++)
				{
					var v_date = "";
					if(j==0){
						v_date = semesterInfo.date;
					}else{
						v_date = eval("semesterInfo.pre_date"+j);
					}
					
					var rc_score = -1;
					var lc_score = -1;
					var sp_score = -1;
					var wr_score = -1;
					var tt_score = -1;
					
					var rc_score_prev = -1;
					var lc_score_prev = -1;
					var sp_score_prev = -1;
					var wr_score_prev = -1;
					var tt_score_prev = -1;
					
					var arr_to_list;
					var arr_prev_list;
					
					var mockList;
					if(j > 0){
						mockList = eval("data.mockList"+j);
					}else{
						mockList = eval("data.mockList");
					}
					arr_to_list = mockList.filter(function(item, index){
						if(item.user_id == v_user_id){
							return true;
						}
					});
					
					if(j < 5){
						var mockPrevList = eval("data.mockList"+(j+1));
						arr_prev_list = mockPrevList.filter(function(item, index){
							if(item.user_id == v_user_id){
								return true;
							}
						});
					}else{
						arr_prev_list = Array();
					}
					
					if(arr_to_list.length > 0){
						rc_score = arr_to_list[0].reading;
						lc_score = arr_to_list[0].listening;
						sp_score = arr_to_list[0].speaking;
						wr_score = arr_to_list[0].writing;
						tt_score = arr_to_list[0].total_score;
					}
					
					if(arr_prev_list.length > 0){
						rc_score_prev = arr_prev_list[0].reading;
						lc_score_prev = arr_prev_list[0].listening;
						sp_score_prev = arr_prev_list[0].speaking;
						wr_score_prev = arr_prev_list[0].writing;
						tt_score_prev = arr_prev_list[0].total_score;
					}
					
					for(var k=0; k<5; k++){
						var class_bg = "";
						var score = -1;
						var score_prev = -1;
						var vTitle = "";
						if(k == 0){
							score = rc_score;
							score_prev = rc_score_prev;
						}else if(k == 1){
							score = lc_score;
							score_prev = lc_score_prev;
						}else if(k == 2){
							score = sp_score;
							score_prev = sp_score_prev;
						}else if(k == 3){
							score = wr_score;
							score_prev = wr_score_prev;
						}else if(k == 4){
							score = tt_score;
							score_prev = tt_score_prev;
						}
						for(var t=0; t<arr_to_list.length; t++)
						{
							if(t > 0) vTitle += "<br>";
							if(k == 0){
								vTitle += arr_to_list[t].reading+"("+arr_to_list[t].date+")";
							}else if(k == 1){
								vTitle += arr_to_list[t].listening+"("+arr_to_list[t].date+")";
							}else if(k == 2){
								vTitle += arr_to_list[t].speaking+"("+arr_to_list[t].date+")";
							}else if(k == 3){
								vTitle += arr_to_list[t].writing+"("+arr_to_list[t].date+")";
							}else if(k == 4){
								vTitle += arr_to_list[t].total_score+"("+arr_to_list[t].date+")";
							}
						}
						if(score > -1 && score_prev > -1){
							if(score > score_prev){
								class_bg = "bg-green";
							}else if(score < score_prev){
								class_bg = "bg-red";
							}else{
								class_bg = "bg-yellow";
							}
						}else{
							if(score > -1)
							{
								class_bg = "";
							}else{
								class_bg = "bg-grey-darker";
								vTitle = "미시행"
							}
						}
						vHtml += '			<td class="'+class_bg+' text-center" style="width:'+nWidth+'px;">';
						if(k == 4){
							vHtml += '				<button class="btn btn-info btn-xs" style="float:right" onClick="add_toefl('+v_user_id+',\''+v_date+'\',\''+v_user_nm+'\')">';
							vHtml += '					<i class="fa fa-edit"></i>';
							vHtml += '				</button>';
						}
						vHtml += vTitle;
						vHtml += '</td>';
					}
					
				}
				vHtml += '		</tr>';
			}
			vHtml += '	</tbody>';
			vHtml += '</table>';
			$("#table_info").html(vHtml);
			
			var column_length = 30 + 4;
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

var v_exam_user_id;
var v_exam_date;

function add_toefl(v_user_id, v_date, v_user_nm)
{
	v_exam_user_id = v_user_id;
	v_exam_date = v_date;
	
	$("#exam_user").html(v_user_nm+"("+v_exam_date+") 모의 시험");
	$.ajax({
		type : "POST",
		url : "/enrollment/getExamsToeflUserMonthList.do",
		data:{
			user_id:v_user_id,
			date:v_date,
			exams_toefl_type:"MOCK"
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++)
			{
				vHtml += '<tr>';
				vHtml += '	<td class="with-form-control">';
				vHtml += '		<input type="text" value="'+data[i].date+'" name="date" class="exam_date form-control">';
				vHtml += '	</td>';
				vHtml += '	<td class="with-form-control">';
				vHtml += '		<input type="text" value="'+data[i].reading+'" name="reading" class="exam_score exam_input_score form-control">';
				vHtml += '	</td>';
				vHtml += '	<td class="with-form-control">';
				vHtml += '		<input type="text" value="'+data[i].listening+'" name="listening" class="exam_score exam_input_score form-control">';
				vHtml += '	</td>';
				vHtml += '	<td class="with-form-control">';
				vHtml += '		<input type="text" value="'+data[i].speaking+'" name="speaking" class="exam_score exam_input_score form-control">';
				vHtml += '	</td>';
				vHtml += '	<td class="with-form-control">';
				vHtml += '		<input type="text" value="'+data[i].writing+'" name="writing" class="exam_score exam_input_score form-control">';
				vHtml += '	</td>';
				vHtml += '	<td class="with-form-control">';
				vHtml += '		<input type="text" value="'+data[i].total_score+'" name="total_score" class="exam_score form-control">';
				vHtml += '	</td>';
				vHtml += '	<td><a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-danger remove_course"><i class="fa fa-times"></i></a></td>';
				vHtml += '</tr>';
			}
			$("#examList").html(vHtml);
			initEvent();
			$("#modal-exam").modal();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
	$("#modal-exam").modal();
}

function exam_add()
{
	var vHtml = "";
	vHtml += '<tr>';
	vHtml += '	<td class="with-form-control">';
	vHtml += '		<input type="text" value="" name="date" class="exam_date form-control">';
	vHtml += '	</td>';
	vHtml += '	<td class="with-form-control">';
	vHtml += '		<input type="text" value="" name="reading" class="exam_score exam_input_score form-control">';
	vHtml += '	</td>';
	vHtml += '	<td class="with-form-control">';
	vHtml += '		<input type="text" value="" name="listening" class="exam_score exam_input_score form-control">';
	vHtml += '	</td>';
	vHtml += '	<td class="with-form-control">';
	vHtml += '		<input type="text" value="" name="speaking" class="exam_score exam_input_score form-control">';
	vHtml += '	</td>';
	vHtml += '	<td class="with-form-control">';
	vHtml += '		<input type="text" value="" name="writing" class="exam_score exam_input_score form-control">';
	vHtml += '	</td>';
	vHtml += '	<td class="with-form-control">';
	vHtml += '		<input type="text" value="" name="total_score" class="exam_score form-control">';
	vHtml += '	</td>';
	vHtml += '	<td><a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-danger remove_course"><i class="fa fa-times"></i></a></td>';
	vHtml += '</tr>';
	
	$("#examList").append(vHtml);
	initEvent();
}
function initEvent()
{
	$(".exam_score").inputFilter(function(value) {
		  return /^\d*$/.test(value);
	});
	
	$('.exam_date').datepicker({
		todayHighlight: false,
		autoclose : true,
		dateFormat: "yy-mm-dd",
		orientation: "bottom left"
	});
	
	$(".exam_input_score").change(function(e){
		var rc = $(this).closest("tr").find("input[name=reading]").val();
		var lc = $(this).closest("tr").find("input[name=listening]").val();
		var sp = $(this).closest("tr").find("input[name=speaking]").val();
		var wr = $(this).closest("tr").find("input[name=writing]").val();
		
		var total_score = 0;
		total_score += parseInt(cfmNullToZero(rc));
		total_score += parseInt(cfmNullToZero(lc));
		total_score += parseInt(cfmNullToZero(sp));
		total_score += parseInt(cfmNullToZero(wr));
		
		$(this).closest("tr").find("input[name=total_score]").val(cfmZeroSpace(total_score));
		
	});
	
	$('.remove_course').click(function(e){
		$(this).closest("tr").remove();
	});
}
function save_exam()
{
	if(!confirm("저장 하시겠습니까?")) return;
	var $_date         = $("input[name=date]");
	var $_reading      = $("input[name=reading]");
	var $_listening    = $("input[name=listening]");
	var $_speaking     = $("input[name=speaking]");
	var $_writing      = $("input[name=writing]");
	var $_total_score  = $("input[name=total_score]");
	
	var data_list = Array();
	
	$_date.each(function(index) {
		var date            = $(this).val();
		var reading         = $_reading.eq(index).val();
		var listening       = $_listening.eq(index).val();
		var speaking        = $_speaking.eq(index).val();
		var writing         = $_writing.eq(index).val();
		var total_score   = $_total_score.eq(index).val();
		
		var objData = Object();
		
		objData.user_id          = v_exam_user_id;
		objData.date             = date;
		objData.exams_toefl_type = "MOCK";
		objData.reading          = reading;
		objData.listening        = listening;
		objData.speaking         = speaking;
		objData.writing          = writing;
		objData.total_score      = total_score;
		
		data_list.push(objData);
	});
	
	var data_value = JSON.stringify(data_list);
	$.ajax({
		type : "POST",
		url : "/enrollment/saveExamsToefl.do",
		data:{
			user_id:v_exam_user_id,
			date:v_exam_date,
			exams_toefl_type:"MOCK",
			data_value:data_value
		},
		success:function(data){
			$("#modal-exam").modal("hide");
			form_init();

		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}