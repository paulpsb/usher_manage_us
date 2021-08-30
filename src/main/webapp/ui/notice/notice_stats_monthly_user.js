var toYear;
var toMonth;
var user_id;
var user_name;
var stats_date;

var to_date;
var rates = [
	'bg-green-lighter', 
	'bg-blue-lighter', 
	'bg-yellow-lighter', 
	'bg-red-lighter'
];


jQuery(document).ready(function(){
	to_date = cfmGetToDate();
	search_oranization();
	user_id = parseInt($("#user_id").val());
	user_name = $("#user_name").val();
	stats_date = $("#stats_date").val();
	if(stats_date)
	{
		var array_stats_date = stats_date.split("-");
		toYear = parseInt(array_stats_date[0]);
		toMonth = parseInt(array_stats_date[1]);
	}else{
		var toDay = new Date();
		
		toYear = toDay.getFullYear();
		toMonth = toDay.getMonth()+1;
	}

	if(user_id > 0){
		$("#select_user_name").html(user_name);
		form_search();
	}else{
		showOraganization("N");
	}
	
});

function click_prev()
{
	if(toMonth > 1){
		toMonth--;
	}else{
		toMonth = 12;
		toYear--;
	}
	form_search()
}

function click_next()
{
	if(toMonth < 12){
		toMonth++;
	}else{
		toMonth = 1;
		toYear++;
	}
	form_search()
}

var auth_oragnization_list;
var auth_user_oragnization_list;
var oHtml = "";

function search_oranization()
{
	$.ajax({
		type : "POST",
		url : "/base/getAuthOrganizationAllList.do",
		data:{
			
		},
		success:function(data){
			auth_user_oragnization_list = data.authUserOrganizationAllList;
			auth_oragnization_list = data.authOrganizationList;
			
			oHtml = "";
			oHtml += '<ul class="tree">';
			oHtml += '	<li>';
			oHtml += '		<span class="bg-red-lighter">';
			oHtml += '			<h5>어셔어학원</h5>';
			oHtml += '		</span>';
			create_down_organization(0);
			oHtml += '	</li>';
			oHtml += '</ul>';
			
			$("#organization_list").html(oHtml);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function create_down_organization(v_id)
{
	var array_auth_oragnization = auth_oragnization_list.filter(function(item, index){
		if(item.organization_up_id == v_id){
			return true;
		}
	});
	if(array_auth_oragnization.length > 0){
		oHtml += '<ul>';
		for(var i=0; i<array_auth_oragnization.length; i++)
		{
			var t_id    = array_auth_oragnization[i].id;
			var t_level = array_auth_oragnization[i].organization_level;
			var t_name  = array_auth_oragnization[i].organization_name;
			var t_class = array_auth_oragnization[i].organization_icon;
			
			var array_auth_user_oragnization = auth_user_oragnization_list.filter(function(item, index){
				if(item.organization_id == t_id){
					return true;
				}
			});
			
			oHtml += '	<li>';
			oHtml += '		<span>';
			oHtml += '			<h5 class="text-white '+t_class+'" style="padding:5px;">'+t_name+'</h5>';
			if(array_auth_user_oragnization.length > 0)
			{
				oHtml += '<dl>';
				for(var j=0; j<array_auth_user_oragnization.length; j++)
				{
					var v_user_id   = array_auth_user_oragnization[j].user_id;
					var v_user_name = array_auth_user_oragnization[j].last_name+array_auth_user_oragnization[j].first_name;
					oHtml += '<dd style="text-align:left;font-size:1rem;padding-left:5px;">';
					oHtml += '	<a href="javascript:organization_select('+v_user_id+',\''+v_user_name+'\')" class="text-dark">';
					oHtml += '-&nbsp;'+v_user_name;
					oHtml += '</a>';
					oHtml += '</dd>';
				}
				oHtml += '</dl>';
			}
			oHtml += '		</span>';
			create_down_organization(t_id);
			oHtml += '	</li>';
		}
		oHtml += '</ul>';
	}
}

function showOraganization(isCancel)
{
	if(isCancel == "Y"){
		$("#btn_cancel_organization").show();
	}else{
		$("#btn_cancel_organization").hide();
	}
	
	$('#select_oraganization').modal({backdrop: 'static', keyboard: false}); 
}

function organization_select(v_id, v_name)
{
	$('#select_oraganization').modal("hide"); 
	
	user_id = v_id;
	user_name = v_name;
	
	$("#select_user_name").html(user_name);
	form_search();
}

function form_oraganization_cancel()
{
	$('#select_oraganization').modal("hide"); 
}

var newStudentList;
var attendList;
var practiceList;
var monthlyList;
var dailyList;
var taskList;

function form_search()
{
	var v_stats_date = toYear+"-";
	if(toMonth < 10){
		v_stats_date += "0"+toMonth;
	}else{
		v_stats_date += ""+toMonth;
	}
	
	$.ajax({
		type : "POST",
		url : "/notice/getNoticeStatsMonthlyUserList.do",
		data : {
			user_id:user_id,
			stats_date:v_stats_date
		},
		dataType : "json",
		success:function(data){
			newStudentList = data.newStudentList;
			attendList = data.attendList;
			practiceList = data.practiceList;
			monthlyList = data.monthlyList;
			dailyList = data.dailyList;
			taskList = data.taskList;
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
	if(toMonth < 10){
		v_year_month += "0"+toMonth;
	}else{
		v_year_month += ""+toMonth;
	}
	
	var iMonth = toMonth - 1;
	var firstDate = new Date(toYear, iMonth,1);
	var lastDate = new Date(toYear, iMonth+1,0);
	var day = firstDate.getDay();
	//var week = Math.ceil(lastDate.getDate()/7) + 1;
	var week = 7;
	
	var leftDays = 7; // setDays 와 반비례 
	var setDays = 1;// leftDays 와 반비례 
	$("#calendar_title").html(toYear+"년 "+toMonth+"월");
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
				var isButton = false;
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
				
				//신규
				var array_new_student = newStudentList.filter(function(item, index){
					if(item.stats_date == v_date && item.total_count > 0){
						return true;
					}
				})
				if(array_new_student.length > 0)
				{
					isButton = true;
					vHtml += '<h5>●&nbsp;신규</h5>';
					for(var t=0; t<array_new_student.length; t++)
					{
						var v_total_count = array_new_student[t].total_count;
						var v_success_count = array_new_student[t].success_count;
						var v_name = array_new_student[t].course_group_name+' '+array_new_student[t].course_name;
						var v_rate = Math.round(v_success_count/v_total_count*100);
						var v_bg = "";
						if(v_rate > 80){
							v_bg = rates[0];
						}else if(v_rate > 60){
							v_bg = rates[1];
						}else if(v_rate > 40){
							v_bg = rates[2];
						}else{
							v_bg = rates[3];
						}
						vHtml += '			<div class="'+v_bg+' mb-1" style="text-align:center;font-size:0.7rem;">';
						vHtml += v_success_count+"/"+v_total_count+"("+v_name+")";
						vHtml += '			</div>';
					}
				}
				
				//출결
				var array_attend = attendList.filter(function(item, index){
					if(item.stats_date == v_date && item.total_count > 0){
						return true;
					}
				});
				if(array_attend.length > 0)
				{
					isButton = true;
					vHtml += '<h5>●&nbsp;출결</h5>';
					for(var t=0; t<array_attend.length; t++)
					{
						var v_total_count = array_attend[t].total_count;
						var v_success_count = array_attend[t].success_count;
						var v_name = array_attend[t].course_group_name+' '+array_attend[t].course_name;
						var v_rate = Math.round(v_success_count/v_total_count*100);
						var v_bg = "";
						if(v_rate > 80){
							v_bg = rates[0];
						}else if(v_rate > 60){
							v_bg = rates[1];
						}else if(v_rate > 40){
							v_bg = rates[2];
						}else{
							v_bg = rates[3];
						}
						vHtml += '			<div class="'+v_bg+' mb-1" style="text-align:center;font-size:0.7rem;">';
						vHtml += v_success_count+"/"+v_total_count+"("+v_name+")";
						vHtml += '			</div>';
					}
				}
				
				//성적
				var array_practice = practiceList.filter(function(item, index){
					if(item.stats_date == v_date && item.total_count > 0){
						return true;
					}
				});
				if(array_practice.length > 0)
				{
					isButton = true;
					vHtml += '<h5>●&nbsp;성적</h5>';
					for(var t=0; t<array_practice.length; t++)
					{
						var v_total_count = array_practice[t].total_count - array_practice[t].giveup_count;
						var v_success_count = array_practice[t].success_count;
						var v_name = array_practice[t].course_group_name+' '+array_practice[t].course_name;
						var v_rate = Math.round(v_success_count/v_total_count*100);
						var v_bg = "";
						if(v_rate > 80){
							v_bg = rates[0];
						}else if(v_rate > 60){
							v_bg = rates[1];
						}else if(v_rate > 40){
							v_bg = rates[2];
						}else{
							v_bg = rates[3];
						}
						vHtml += '			<div class="'+v_bg+' mb-1" style="text-align:center;font-size:0.7rem;">';
						vHtml += v_success_count+"/"+v_total_count+"("+v_name+")";
						vHtml += '			</div>';
					}
				}
				
				//Daily 루틴
				var array_daily = dailyList.filter(function(item, index){
					if(item.stats_date == v_date && item.total_count > 0){
						return true;
					}
				});
				if(array_daily.length > 0)
				{
					isButton = true;
					vHtml += '<h5>●&nbsp;Daily 루틴</h5>';
					for(var t=0; t<array_daily.length; t++)
					{
						var v_total_count = array_daily[t].total_count;
						var v_success_count = array_daily[t].success_count;
						var v_ignore_count = array_daily[t].ignore_count;
						var v_problem_count = array_daily[t].problem_count;
						var v_name = array_daily[t].course_group_name+' '+array_daily[t].course_name;
						var v_rate = Math.round((v_success_count+v_ignore_count+v_problem_count)/v_total_count*100);
						var v_bg = "";
						if(v_rate > 80){
							v_bg = rates[0];
						}else if(v_rate > 60){
							v_bg = rates[1];
						}else if(v_rate > 40){
							v_bg = rates[2];
						}else{
							v_bg = rates[3];
						}
						vHtml += '			<div class="'+v_bg+' mb-1" style="text-align:center;font-size:0.7rem;">';
						vHtml += v_success_count+","+v_ignore_count+","+v_problem_count+"/"+v_total_count;
						if(v_name){
							vHtml += "("+v_name+")";
						}
						vHtml += '			</div>';
					}
				}
				
				//Monthly 루틴
				var array_monthly = monthlyList.filter(function(item, index){
					if(item.stats_date == v_date && item.total_count > 0){
						return true;
					}
				});
				if(array_monthly.length > 0)
				{
					isButton = true;
					vHtml += '<h5>●&nbsp;Monthly 루틴</h5>';
					for(var t=0; t<array_monthly.length; t++)
					{
						var v_total_count = array_monthly[t].total_count;
						var v_success_count = array_monthly[t].success_count;
						var v_ignore_count = array_monthly[t].ignore_count;
						var v_problem_count = array_monthly[t].problem_count;
						var v_name = array_monthly[t].course_group_name+' '+array_monthly[t].course_name;
						var v_rate = Math.round((v_success_count+v_ignore_count+v_problem_count)/v_total_count*100);
						var v_bg = "";
						if(v_rate > 80){
							v_bg = rates[0];
						}else if(v_rate > 60){
							v_bg = rates[1];
						}else if(v_rate > 40){
							v_bg = rates[2];
						}else{
							v_bg = rates[3];
						}
						vHtml += '			<div class="'+v_bg+' mb-1" style="text-align:center;font-size:0.7rem;">';
						vHtml += v_success_count+","+v_ignore_count+","+v_problem_count+"/"+v_total_count;
						if(v_name){
							vHtml += "("+v_name+")";
						}
						vHtml += '			</div>';
					}
				}

				//Task
				var array_task = taskList.filter(function(item, index){
					if(item.stats_date == v_date && item.total_count > 0){
						return true;
					}
				});
				if(array_task.length > 0)
				{
					isButton = true;
					vHtml += '<h5>●&nbsp;Task</h5>';
					for(var t=0; t<array_task.length; t++)
					{
						var v_total_count = array_task[t].total_count;
						var v_success_count = array_task[t].complete_count;
						var v_name = "";
						//var v_name = array_daily[t].course_group_name+' '+array_daily[t].course_name;
						var v_rate = Math.round((v_success_count)/v_total_count*100);
						var v_bg = "";
						if(v_rate > 80){
							v_bg = rates[0];
						}else if(v_rate > 60){
							v_bg = rates[1];
						}else if(v_rate > 40){
							v_bg = rates[2];
						}else{
							v_bg = rates[3];
						}
						vHtml += '			<div class="'+v_bg+' mb-1" style="text-align:center;font-size:0.7rem;">';
						vHtml += v_success_count+"/"+v_total_count;
						if(v_name){
							vHtml += "("+v_name+")";
						}
						vHtml += '			</div>';
					}
				}
				if(to_date >= v_date)
				{
					if(isButton)
					{
						vHtml += '<button type="button" class="btn btn-default btn-xs btn-block mt-2 mb-2" onClick="go_daily_user(\''+user_id+'\',\''+user_name+'\',\''+v_date+'\')">개인별 Day 바로가기</button>';
					}
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

function go_daily_user(v_user_id, v_user_nm, v_date)
{
	window.open("/notice/notice_stats_daily_user.do?stats_date="+v_date+"&&user_id="+v_user_id+"&&user_name="+v_user_nm,"notice_stats_daily_user");
}