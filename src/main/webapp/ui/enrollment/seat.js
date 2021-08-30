var course_id;
/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	search_semester();
	create_seat(11, 13);
	
	$(window).resize(resizeContents);
    
	resizeContents();
	
	showCourses("N");
});

/*
 * 설명 : 화면 사이즈 변경시
 */
function resizeContents()
{
	//현재의 사이즈를 찾는다.
	var window_size = $(window).height();

	$("#divSeat").height(window_size - 300);
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
			courseList = data.courseList;
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
					vHtml += '		<a href="javascript:form_sitemap_select(\''+vTitle+'\','+arr_course[j].id+',\''+arr_course[j].instructor_name+'\',\''+arr_course[j].manager_name+'\')"><h5>'+arr_course[j].name+'반</h5></a>';
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


function form_sitemap_select(v_title, v_course_id, v_instructor_name, v_manager_name)
{
	course_id = v_course_id;
	$("#select_course_name").html(v_title+"(담당강사:"+v_instructor_name+" / 담당매니저:"+v_manager_name+")");
	/*
	$('#select_courses').hide(); 
	$('#mask').hide(); 
	$('#mask').remove();
	*/
	$('#select_courses').modal("hide"); 
	
	search_student();
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

/*
 * 설명 : 반별 배치 조회.
 */
function search_student()
{
	$.ajax({
		type : "POST",
		url : "/enrollment/getSeatList.do",
		data:{
			id:course_id
		},
		success:function(data){
			var v_today = cfmGetToDate();
			$("#course_id").val(course_id);
			var column_count = 11;
			var row_count = 13;
			var use_seat_count = 0;
			var not_use_seat_count = 0;
			var total_seat_count = 0;
			/*
			if(data.courseInfo.column_count){
				column_count = data.courseInfo.column_count;
			}
			if(data.courseInfo.row_count){
				row_count = data.courseInfo.row_count;
			}
			*/
			total_seat_count = data.enrollmentList.length;
			not_use_seat_count = data.enrollmentList.length;
			init_seat(column_count, row_count);
			
			$("#column_count").val(column_count);
			$("#row_count").val(row_count);
			$("#use_seat_count").val(use_seat_count);
			$("#not_use_seat_count").val(not_use_seat_count);
			$("#total_seat_count").val(total_seat_count);
			
			//자리배정 학생
			var vHtml = '';
			for(var i=0;i<data.enrollmentList.length; i++)
			{
				var text_class = "text-success";
				var array_schedule = data.enrollmentList[i].schedule.split(",");
				var sSchedule = "";
				if(v_today < array_schedule[0]){
					sSchedule = ' '+array_schedule[0];
				}
				
				var sName = data.enrollmentList[i].last_name+data.enrollmentList[i].first_name;
				var sCourseId = data.enrollmentList[i].course_id;
				var sEnrollId = data.enrollmentList[i].semester_enrollment_id;
				var sReg = "신규";
				if(data.enrollmentList[i].registration_type != "NEW"){
					sReg = "기존";
				}
				
				var sChamgang = "";
				if(data.enrollmentList[i].chamgang_yn == "Y"){
					sChamgang = "-참강";
					text_class = "text-info";
				}
				
				var sRefund = "";
				if(data.enrollmentList[i].status == "REFUND_REQUESTED"){
					sRefund = "-환불요청";
					text_class = "text-purple";
				}

				vHtml += '<div id="student_'+sEnrollId+'" class="fc-event"  data-color="#00acac" style="width:45%;display:inline-block;margin-right:4.5%;" >';
				vHtml += '<input type="hidden" name="course_id[]" value="'+sCourseId+'">';
				vHtml += '<input type="hidden" name="semester_enrollment_id[]" value="'+sEnrollId+'">';
				vHtml += '<input type="hidden" name="student_name[]" value="'+sName+'">';
				vHtml += '<input type="hidden" name="registration[]" value="'+sReg+'">';
				vHtml += '<input type="hidden" name="course_id[]" value="'+sCourseId+'">';
				vHtml += '<input type="hidden" name="chamgang_yn[]" value="'+data.enrollmentList[i].chamgang_yn+'">';
				vHtml += '<input type="hidden" name="status[]" value="'+data.enrollmentList[i].status+'">';
				vHtml += '<div class="fc-event-icon"><i class="fas fa-circle fa-fw f-s-9 '+text_class+'"></i></div>';
				
				vHtml += sName+' ('+sReg+sSchedule+sChamgang+sRefund+')';
				
				vHtml += '</div>';
			}
			$("#external-events").html(vHtml);
			
			
			$('#external-events .fc-event').each(function() {
				$(this).draggable({
					zIndex: 999,
					revert: true,      // will cause the event to go back to its
					revertDuration: 0  //  original position after the drag
				});
			});	
			
			//배정된 학생 데이터 넣기.
			for(var i=0;i<data.seatEnrollmentList.length; i++)
			{
				var array_schedule = data.seatEnrollmentList[i].schedule.split(",");
				var sSchedule = "";
				if(v_today < array_schedule[0]){
					sSchedule = '<br/>'+'('+array_schedule[0]+')';
				}
				var nRow = data.seatEnrollmentList[i].seat_row;
				var nCol = data.seatEnrollmentList[i].seat_col;
				var sName = data.seatEnrollmentList[i].last_name+data.seatEnrollmentList[i].first_name;
				var sCourseId = data.seatEnrollmentList[i].course_id;
				var sEnrollId = data.seatEnrollmentList[i].semester_enrollment_id;
				var sReg = "신규";
				if(data.seatEnrollmentList[i].registration_type != "NEW"){
					sReg = "기존";
				}
				
				var vHtml = '';
				vHtml += '<input type="hidden" name="course_id[]" value="'+sCourseId+'">';
				vHtml += '<input type="hidden" name="semester_enrollment_id[]" value="'+sEnrollId+'">';
				vHtml += '<input type="hidden" name="student_name[]" value="'+sName+'">';
				vHtml += '<input type="hidden" name="registration[]" value="'+sReg+'">';
				vHtml += '<input type="hidden" name="chamgang_yn[]" value="'+data.seatEnrollmentList[i].chamgang_yn+'">';
				vHtml += '<input type="hidden" name="status[]" value="'+data.seatEnrollmentList[i].status+'">';
				vHtml += sName+'<br/>('+sReg+')'+sSchedule;
				$("#seat_"+nRow+"_"+nCol).html(vHtml);
				
				if(data.seatEnrollmentList[i].status == "REFUND_REQUESTED"){
					$("#seat_"+nRow+"_"+nCol).removeClass("bg-grey").addClass("bg-purple");
				}else{
					if(data.seatEnrollmentList[i].chamgang_yn == "Y"){
						$("#seat_"+nRow+"_"+nCol).removeClass("bg-grey").addClass("bg-info");
					}else{
						$("#seat_"+nRow+"_"+nCol).removeClass("bg-grey").addClass("bg-green");
					}
				}
				
				
				$("#student_"+sEnrollId).hide();
			}
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

/*
 * 설명 : 행/열 칸수 변경 초기화.
 */
function create_seat(nWidth, nHeight)
{
	
	$(".fc-event").show()
	//init_seat(nWidth, nHeight)
	init_seat(11, 13)
}
/*
 * 설명 : 행/열 칸수에 따라서 화면에 생성.
 */
function init_seat(nWidth, nHeight)
{
	nWidth = 11;
	nHeight = 13;
	$("#column_count").val(nWidth);
	$("#row_count").val(nHeight);
	
	$("#seat_setting").html("자리설정( "+nWidth+"X"+nHeight+" )");
	$("#seatList").html("");
	var vHtml = '';
	vHtml += '<colgroup>';
	vHtml += '<col style="width:2%;" />';
	for(var i=0; i<nWidth; i++)
	{
		vHtml += '<col style="width:calc(97%/'+nWidth+');" />';
	}
	vHtml += '</colgroup>';
	for(var i=nHeight;i> 0; i--)
	{
		vHtml += '<tr>';
		vHtml += '<td style="border:0px none #000;vertical-align:middle;" >'+i+'</td>';
		for(var j=1; j<=nWidth; j++)
		{
			vHtml += '<td style="border:0px none #000;" >';
			vHtml += '<div class="drop-wrap bg-grey text-white text-center" style="width:100%;padding-top:5%;font-size:0.9rem;" id="seat_'+i+'_'+j+'"></div>';
			vHtml += '</td>';
		}
		vHtml += '</tr>';
	}

	$("#seatList").html(vHtml);
	
	vHtml = '';
	vHtml += '<colgroup>';
	vHtml += '<col style="width:2%;" />';
	for(var i=0; i<nWidth; i++)
	{
		vHtml += '<col style="width:calc(97%/'+nWidth+');" />';
	}
	vHtml += '</colgroup>';
	vHtml += '<tr>';
	vHtml += '<td style="border:0px none #000;vertical-align:middle;" ></td>';
	for(var j=1; j<=nWidth; j++)
	{
		vHtml += '<td style="border:0px none #000;vertical-align:middle;text-align:center;" >'+j+'</td>';
	}
	vHtml += '</tr>';
	
	$("#seatLabelList").html(vHtml);
	
	var nDropZonHeight = $("#seat_1_1").width()
	$('.drop-wrap').width(nDropZonHeight);
	$('.drop-wrap').height(nDropZonHeight-(nDropZonHeight*0.2));
	$('.drop-wrap').each(function() {
		$(this).droppable({
	      drop: function( event, ui ) {
	    	  var courseId = $(this).find("input[name^=course_id]").val();
	    	  if(!courseId)
	    	  {
	    		  	var dragObject = ui.draggable;
					var sName = dragObject.find("input[name^=student_name]").val();
					var sCourseId = dragObject.find("input[name^=course_id]").val();
					var sEnrollId = dragObject.find("input[name^=semester_enrollment_id]").val();
					var sReg = dragObject.find("input[name^=registration]").val();
					var sChamgang_yn = dragObject.find("input[name^=sChamgang_yn]").val();
					var sStatus = dragObject.find("input[name^=status]").val();
					
					var vHtml = '';
					vHtml += '<input type="hidden" name="course_id[]" value="'+sCourseId+'">';
					vHtml += '<input type="hidden" name="semester_enrollment_id[]" value="'+sEnrollId+'">';
					vHtml += '<input type="hidden" name="student_name[]" value="'+sName+'">';
					vHtml += '<input type="hidden" name="registration[]" value="'+sReg+'">';
					vHtml += '<input type="hidden" name="sChamgang_yn[]" value="'+sChamgang_yn+'">';
					vHtml += '<input type="hidden" name="status[]" value="'+sStatus+'">';
					vHtml += sName+'<br/>('+sReg+')';
					$(this).html(vHtml);
					if(sStatus == "REFUND_REQUESTED"){
						$(this).removeClass("bg-grey").addClass("bg-purple");
					}else{
						if(sChamgang_yn == "Y"){
							$(this).removeClass("bg-grey").addClass("bg-info");
						}else{
							$(this).removeClass("bg-grey").addClass("bg-green");
						}
					}
					dragObject.hide();
	    	  }	
	    	
	        }
	    });
		$(this).dblclick(function(){
			 var courseId = $(this).find("input[name^=course_id]").val();
			 if(courseId)
	    	 {
				 var semester_enrollment_id = $(this).find("input[name^=semester_enrollment_id]").val();
				 $("#student_"+semester_enrollment_id).show();
				 $(this).empty();
				 $(this).removeClass("bg-purple").removeClass("bg-info").removeClass("bg-green").addClass("bg-grey")
	    	 }
		});
	});
	$("#divSeat").scrollTop($("#divSeat")[0].scrollHeight);
}

function form_submit()
{
	var course_id = $("#course_id").val();
	var row_count = parseInt($("#row_count").val());
	var column_count = parseInt($("#column_count").val());
	var result_arrray = Array();
	for(var i=1; i<=row_count; i++)
	{
		for(var j=1; j<=row_count; j++)
		{
			var objDiv = $("#seat_"+i+"_"+j);
			var courseId = objDiv.find("input[name^=course_id]").val();
			if(courseId)
			{
				var objSeat = Object();
				objSeat.seat_row = i;
				objSeat.seat_col = j;
				objSeat.course_id = course_id;
				objSeat.semester_enrollment_id = objDiv.find("input[name^=semester_enrollment_id]").val();
				result_arrray.push(objSeat);
			}
		}
	}
	var data_value = JSON.stringify(result_arrray);
	$.ajax({
		type : "POST",
		url : "/enrollment/saveSeatList.do",
		data:{
			id:course_id,
			row_count:row_count,
			column_count:column_count,
			data_value:data_value,
		},
		success:function(data){
			alert("저장하였습니다.");

		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}