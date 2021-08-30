var toYear;
var toMonth;

jQuery(document).ready(function(){
	var toDay = new Date();
	
	toYear = toDay.getFullYear();
	toMonth = toDay.getMonth();
	
	selectSchedule();
});

function click_prev()
{
	if(toMonth > 0){
		toMonth--;
	}else{
		toMonth = 11;
		toYear--;
	}
	selectSchedule()
}

function click_next()
{
	if(toMonth < 11){
		toMonth++;
	}else{
		toMonth = 0;
		toYear++;
	}
	selectSchedule()
}

var resultList;
var prepareList;
function selectSchedule()
{
	var v_semester_date = toYear+"-";
	var iMonth = toMonth + 1;
	if(iMonth < 10){
		v_semester_date += "0"+iMonth;
	}else{
		v_semester_date += ""+iMonth;
	}
	
	$.ajax({
		type : "POST",
		url : "/batch/getBatchStatsScheduleList.do",
		data : {
			semester_date:v_semester_date
		},
		dataType : "json",
		success:function(data){
			resultList  = data.resultList;
			prepareList = data.prepareList;
			createCalendar();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

function createCalendar()
{
	var v_year_month = toYear+"-";
	var iMonth = toMonth + 1;
	if(iMonth < 10){
		v_year_month += "0"+iMonth;
	}else{
		v_year_month += ""+iMonth;
	}
	
	var firstDate = new Date(toYear, toMonth,1);
	var lastDate = new Date(toYear, toMonth+1,0);
	var day = firstDate.getDay();
	//var week = Math.ceil(lastDate.getDate()/7) + 1;
	var week = 7;
	
	var leftDays = 7; // setDays 와 반비례 
	var setDays = 1;// leftDays 와 반비례 
	$("#calendar_title").html(toYear+"년 "+(toMonth+1)+"월");
	var vHtml = "";
	for(i = 1; i < week; i++){
		vHtml += '<tr>';
		while(day != 0){
			vHtml += '<td><div style="min-height:125px;"></div></td>';
			day -= 1;
			leftDays -= 1;
		} // 1주
		while(leftDays != 0){
			if(setDays > lastDate.getDate()){
				vHtml += '<td><div style="min-height:125px;"></div></td>';
				leftDays -= 1;
			}else{
				var v_date = v_year_month;
				if(setDays < 10){
					v_date += "-0"+setDays;
				}else{
					v_date += "-"+setDays;
				}
				var v_class = "";
				if(leftDays == 7){
					v_class = "text-danger";
				}
				if(leftDays == 1){
					v_class = "text-primary";
				}
				vHtml += '<td class="text-right" style="vertical-align: top;">';
				vHtml += '<h5 class="'+v_class+'">'+setDays+'</h5>';
				vHtml += '<div style="min-height:100px;width:100%;text-align:left;">';
				//전화대상을 먼저 찾는다.
				var p_idx = prepareList.findIndex(t => t.batch_exam_date == v_date);
				if(p_idx >=0 ){
					var register_q_y_count = prepareList[p_idx].register_q_y_count;
					var register_q_n_count = prepareList[p_idx].register_q_n_count;
					var register_s_y_count = prepareList[p_idx].register_s_y_count;
					var register_s_n_count = prepareList[p_idx].register_s_n_count;
					vHtml += '<p style="margin:5px;">';
					vHtml += '<b><span class="text-danger">전화 대상(오늘,내일인원 전화)</span></b><br>';
					vHtml += '신규(오늘까지 등록예정) : <a href="javascript:go_detail(0,\''+v_date+'\',\'S\')"><span class="text-primary">'+register_s_y_count+'명/'+register_s_n_count+'명</span></a><br>';
					vHtml += '신규(오늘까지 고민) : <a href="javascript:go_detail(0,\''+v_date+'\',\'Q\')"><span class="text-primary">'+register_q_y_count+'명/'+register_q_n_count+'명</span></a>';
					vHtml += '</p>';
				}
				var arr_result = resultList.filter(function(item, index){
						if(item.batch_exam_date == v_date){
							return true;
						}
				});
				for(var j=0; j<arr_result.length; j++)
				{
					if(j>0){
						vHtml += '<hr style="margin:0;">';
					}else{
						if(p_idx >=0 ){
							vHtml += '<hr style="margin:0;">';
						}
					}
					
					var v_batch_schedule_id = arr_result[j].batch_schedule_id;
					var v_start_time = arr_result[j].start_time;
					var v_end_time   = arr_result[j].end_time;
					var v_batch_adviser_name = arr_result[j].batch_adviser_name;
					var n_success_count = arr_result[j].success_count;
					var n_fail_count = arr_result[j].fail_count;
					var n_total_count = n_success_count+n_fail_count;
					var n_rate = Math.round(n_success_count/n_total_count*100);
					vHtml += '<p style="margin:5px;">';
					vHtml += v_start_time + '~' + v_end_time + ' 상담 : <a href="javascript:go_detail('+v_batch_schedule_id+',\'\',\'\')"><span class="text-primary">'+n_total_count+'명</span></a><br>';
					vHtml += '상담자 : '+v_batch_adviser_name+'<br>';
					vHtml += '상담성공률 : <a href="javascript:go_detail('+v_batch_schedule_id+',\'\',\'\')"><span class="text-primary">'+n_rate+'% ( '+n_success_count+'명 / '+n_total_count+'명 )</a></span>';
					vHtml += '</p>';					
				}
				vHtml += '</div>';
				vHtml += '</td>';
				setDays +=1;
				leftDays -= 1;
			}
		}
		leftDays = 7;
		vHtml += '</tr>';
	}
	
	$("#data_list").html(vHtml);
}
function go_detail(batch_schedule_id, batch_adviser_register_date, batch_adviser_register_yn)
{
	window.open("/batch/consultation_schedule_detail.do?batch_schedule_id="+batch_schedule_id+"&&batch_adviser_register_date="+batch_adviser_register_date+"&&batch_adviser_register_yn="+batch_adviser_register_yn,"batch_schedule_detail");
}

function click_adviser()
{
	var v_start_date = toYear+"-";
	var iMonth = toMonth + 1;
	if(iMonth < 10){
		v_start_date += "0"+iMonth+"-01";
	}else{
		v_start_date += ""+iMonth+"-01";
	}
	
	var lastDate = new Date(toYear, iMonth, 0);
	var v_end_date = cfmDateChar(lastDate);
	
	$("#start_exam_date").val(v_start_date);
	$("#end_exam_date").val(v_end_date);
	search_adviser();
	$("#modal-adviser").modal();
	
}

function search_adviser()
{
	var v_start_date = $("#start_exam_date").val();
	var v_end_date = $("#end_exam_date").val();
	
	if(!v_start_date) v_start_date = '0000-00-00';
	if(!v_end_date) v_end_date = '9999-99-99';
	
	$.ajax({
		type : "POST",
		url : "/batch/getBatchStatsAdviserCountList.do",
		data : {
			start_exam_date:v_start_date,
			end_exam_date:v_end_date
		},
		dataType : "json",
		success:function(data){
			var vHtml = "";
			var v_total_count = 0;
			var v_success_count = 0;
			for(var i=0; i<data.length; i++)
			{
				var v_t_count = data[i].total_count;
				var v_s_count = data[i].success_count;
				var v_rate = Math.round(v_s_count/v_t_count*100);
				vHtml += '<tr>';
				vHtml += '	<td class="text-center">'+data[i].adviser_name+'</td>';
				vHtml += '	<td class="text-right">'+v_t_count+'</td>';
				vHtml += '	<td class="text-right">'+v_s_count+'</td>';
				vHtml += '	<td class="text-right">'+v_rate+'%</td>';
				vHtml += '</tr>';
				
				v_total_count += v_t_count;
				v_success_count += v_s_count;
			}
			if(v_total_count > 0){
				var v_total_rate = Math.round(v_success_count/v_total_count*100);
				
				vHtml += '<tr>';
				vHtml += '	<th class="text-center">합계</th>';
				vHtml += '	<th class="text-right">'+v_total_count+'</th>';
				vHtml += '	<th class="text-right">'+v_success_count+'</th>';
				vHtml += '	<th class="text-right">'+v_total_rate+'%</th>';
				vHtml += '</tr>';
				
			}
			
			$("#adviser_list").html(vHtml);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}