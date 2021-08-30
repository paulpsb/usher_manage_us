var authOrganizationList;
var authUserOrganizationAllList;
var newStudentList;
var attendList;
var practiceList;
var monthlyList;
var dailyList;
var taskList;

var toYear;
var toMonth;

var rates = [
	'bg-green-lighter', 
	'bg-blue-lighter', 
	'bg-yellow-lighter', 
	'bg-red-lighter'
];

var badge_rates = [
	'badge-success text-dark', 
	'badge-primary text-dark', 
	'badge-yellow text-dark', 
	'badge-danger text-dark'
];

var view_gubun = "summery";
/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	$("input[name='view_gubun']").click(function(){
		view_gubun = $("input[name='view_gubun']:checked").val();
		form_search();
	});
	
	var toDay = new Date();
	
	toYear = toDay.getFullYear();
	toMonth = toDay.getMonth()+1;
	
	form_search();
    
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

var vHtml = "";
function form_search()
{
	$("#stats_month").html(toYear+"년 "+toMonth+"월");
	var v_stats_date = toYear+"-";
	if(toMonth < 10){
		v_stats_date += "0"+toMonth;
	}else{
		v_stats_date += ""+toMonth;
	}
	
	$.ajax({
		type : "POST",
		url : "/notice/getNoticeStatsMonthlyOraganizationList.do",
		data:{
			stats_date:v_stats_date
		},
		success:function(data){
			authOrganizationList = data.authOrganizationList;
			authUserOrganizationAllList = data.authUserOrganizationAllList;
			
			newStudentList = data.newStudentList;
			attendList = data.attendList;
			practiceList = data.practiceList;
			monthlyList = data.monthlyList;
			dailyList = data.dailyList;
			taskList = data.taskList;
			
			vHtml = "";
			vHtml += '<ul class="tree">';
			vHtml += '	<li>';
			vHtml += '		<span class="bg-red-lighter" style="min-width:150px;">';
			vHtml += '			<h3 class="text-white">어셔어학원</h3>';
			vHtml += '		</span>';
			if(view_gubun == "summery")
			{
				create_down_organization_summery(0);
			}else{
				create_down_organization_detail(0);
			}
			vHtml += '	</li>';
			vHtml += '</ul>';
			
			$("#organization_list").html(vHtml);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function create_down_organization_summery(v_id)
{
	var array_auth_oragnization = authOrganizationList.filter(function(item, index){
		if(item.organization_up_id == v_id){
			return true;
		}
	});
	if(array_auth_oragnization.length > 0){
		vHtml += '<ul>';
		for(var i=0; i<array_auth_oragnization.length; i++)
		{
			var t_id    = array_auth_oragnization[i].id;
			var t_level = array_auth_oragnization[i].organization_level;
			var t_name  = array_auth_oragnization[i].organization_name;
			var t_class = array_auth_oragnization[i].organization_icon;
			vHtml += '	<li>';
			vHtml += '		<span style="min-width:145px;">';
			vHtml += '			<h3 class="text-white '+t_class+'">'+t_name+'</h3>';
			var array_auth_user_oragnization = authUserOrganizationAllList.filter(function(item, index){
				if(item.organization_id == t_id){
					return true;
				}
			});
			if(array_auth_user_oragnization.length > 0)
			{
				vHtml += '<dl>';
				for(var j=0; j<array_auth_user_oragnization.length; j++)
				{
					var v_user_id   = array_auth_user_oragnization[j].user_id;
					var v_user_name = array_auth_user_oragnization[j].last_name+array_auth_user_oragnization[j].first_name;
					
					var n_study_total_count = 0;
					var n_study_success_count = 0;
					
					var n_routine_total_count = 0;
					var n_routine_success_count = 0;
					
					//신규
					var array_new_student = newStudentList.filter(function(item, index){
						if(item.user_id == v_user_id && item.total_count > 0){
							return true;
						}
					})
					for(var t=0; t<array_new_student.length; t++)
					{
						var v_total_count = array_new_student[t].total_count;
						var v_success_count = array_new_student[t].success_count;
						
						n_study_total_count += v_total_count;
						n_study_success_count += v_success_count;
					}
					
					//출결
					var array_attend = attendList.filter(function(item, index){
						if(item.user_id == v_user_id && item.total_count > 0){
							return true;
						}
					});
					
					for(var t=0; t<array_attend.length; t++)
					{
						var v_total_count = array_attend[t].total_count;
						var v_success_count = array_attend[t].success_count;
						
						n_study_total_count += v_total_count;
						n_study_success_count += v_success_count;
					}
					
					//성적
					var array_practice = practiceList.filter(function(item, index){
						if(item.user_id == v_user_id && item.total_count > 0){
							return true;
						}
					});
					for(var t=0; t<array_practice.length; t++)
					{
						var v_total_count = array_practice[t].total_count - array_practice[t].giveup_count;
						var v_success_count = array_practice[t].success_count;
						
						n_study_total_count += v_total_count;
						n_study_success_count += v_success_count;
					}
					
					//Daily 루틴
					var array_daily = dailyList.filter(function(item, index){
						if(item.user_id == v_user_id && item.total_count > 0){
							return true;
						}
					});
					for(var t=0; t<array_daily.length; t++)
					{
						var v_total_count = array_daily[t].total_count;
						var v_success_count = array_daily[t].success_count + array_daily[t].ignore_count + array_daily[t].problem_count;
						
						n_routine_total_count += v_total_count;
						n_routine_success_count += v_success_count;
					}
					
					//Monthly 루틴
					var array_monthly = monthlyList.filter(function(item, index){
						if(item.user_id == v_user_id && item.total_count > 0){
							return true;
						}
					});
					for(var t=0; t<array_monthly.length; t++)
					{
						var v_total_count = array_monthly[t].total_count;
						var v_success_count = array_monthly[t].success_count + array_monthly[t].ignore_count + array_monthly[t].problem_count;
						
						n_routine_total_count += v_total_count;
						n_routine_success_count += v_success_count;
					}
					
					//TASK
					var array_task = taskList.filter(function(item, index){
						if(item.user_id == v_user_id && item.total_count > 0){
							return true;
						}
					});
					for(var t=0; t<array_task.length; t++)
					{
						var v_total_count = array_task[t].total_count;
						var v_success_count = array_task[t].complete_count;
						
						n_routine_total_count += v_total_count;
						n_routine_success_count += v_success_count;
					}
					
					var v_study_rate = Math.round(n_study_success_count/n_study_total_count*100);
					var v_routine_rate = Math.round(n_routine_success_count/n_routine_total_count*100);
					
					var t_user_name = v_user_name;
					
					var t_style = " style='font-size:0.7rem;' ";
					var t_study_name = '<label class="badge badge-default"'+t_style+'>X</label>';
					if(n_study_total_count > 0)
					{
						if(v_study_rate > 80){
							t_study_name = '<label class="badge '+badge_rates[0]+'"'+t_style+'>'+v_study_rate+'%</label>';
						}else if(v_study_rate > 60){
							t_study_name = '<label class="badge '+badge_rates[1]+'"'+t_style+'>'+v_study_rate+'%</label>';
						}else if(v_study_rate > 40){
							t_study_name = '<label class="badge '+badge_rates[2]+'"'+t_style+'>'+v_study_rate+'%</label>';
						}else{
							t_study_name = '<label class="badge '+badge_rates[3]+'"'+t_style+'>'+v_study_rate+'%</label>';
						}
					}
					
					var t_routine_name = '<label class="badge badge-default"'+t_style+'>X</label>';
					if(n_routine_total_count > 0)
					{
						if(v_routine_rate > 80){
							t_routine_name = '<label class="badge '+badge_rates[0]+'"'+t_style+'>'+v_routine_rate+'%</label>';
						}else if(v_routine_rate > 60){
							t_routine_name = '<label class="badge '+badge_rates[1]+'"'+t_style+'>'+v_routine_rate+'%</label>';
						}else if(v_routine_rate > 40){
							t_routine_name = '<label class="badge '+badge_rates[2]+'"'+t_style+'>'+v_routine_rate+'%</label>';
						}else{
							t_routine_name = '<label class="badge '+badge_rates[3]+'"'+t_style+'>'+v_routine_rate+'%</label>';
						}
					}

					vHtml += '<dd style="text-align:left;font-size:1rem;padding-left:5px;">';
					vHtml += '<a href="javascript:move_monthly_user('+v_user_id+',\''+v_user_name+'\')" class="text-dark">';
					vHtml += t_user_name+"&nbsp;"+t_study_name+"&nbsp;"+t_routine_name;
					vHtml += '</a>';
					vHtml += '</dd>';
					/*
					var v_rate = Math.round(n_success_count/n_total_count*100);
					var v_bg = "";
					if(n_total_count > 0)
					{
						if(v_rate > 80){
							v_bg = rates[0];
						}else if(v_rate > 60){
							v_bg = rates[1];
						}else if(v_rate > 40){
							v_bg = rates[2];
						}else{
							v_bg = rates[3];
						}
						t_user_name += " ("+v_rate+"%)";
					}
					vHtml += '<dd class="'+v_bg+'" style="text-align:left;font-size:1rem;padding-left:5px;">';
					vHtml += '<a href="javascript:move_monthly_user('+v_user_id+',\''+v_user_name+'\')" class="text-dark">';
					vHtml += t_user_name;
					vHtml += '</a>';
					vHtml += '</dd>';
					*/
				}
				vHtml += '</dl>';
			}
			vHtml += '		</span>';
			create_down_organization_summery(t_id);
			vHtml += '	</li>';
		}
		vHtml += '</ul>';
	}
}

function create_down_organization_detail(v_id)
{
	var array_auth_oragnization = authOrganizationList.filter(function(item, index){
		if(item.organization_up_id == v_id){
			return true;
		}
	});
	if(array_auth_oragnization.length > 0){
		vHtml += '<ul>';
		for(var i=0; i<array_auth_oragnization.length; i++)
		{
			var t_id    = array_auth_oragnization[i].id;
			var t_level = array_auth_oragnization[i].organization_level;
			var t_name  = array_auth_oragnization[i].organization_name;
			var t_class = array_auth_oragnization[i].organization_icon;
			vHtml += '	<li>';
			vHtml += '		<span style="min-width:145px;">';
			vHtml += '			<h3 class="text-white '+t_class+'">'+t_name+'</h3>';
			var array_auth_user_oragnization = authUserOrganizationAllList.filter(function(item, index){
				if(item.organization_id == t_id){
					return true;
				}
			});
			if(array_auth_user_oragnization.length > 0)
			{
				vHtml += '<dl>';
				for(var j=0; j<array_auth_user_oragnization.length; j++)
				{
					var v_user_id   = array_auth_user_oragnization[j].user_id;
					var v_user_name = array_auth_user_oragnization[j].last_name+array_auth_user_oragnization[j].first_name;
					if(j>0){
						vHtml += '<dd style="border-top:1px solid #ccc;text-align:left;font-size:1rem;padding-left:5px;">';
					}else{
						vHtml += '<dd style="text-align:left;font-size:1rem;padding-left:5px;">';
					}
					vHtml += '<a href="javascript:move_monthly_user('+v_user_id+',\''+v_user_name+'\')" class="text-dark">';
					vHtml += v_user_name;
					
					//신규
					var array_new_student = newStudentList.filter(function(item, index){
						if(item.user_id == v_user_id && item.total_count > 0){
							return true;
						}
					})
					if(array_new_student.length > 0)
					{
						vHtml += '<dl>';
						vHtml += '	<dd style="text-align:left;font-size:1rem;padding-left:10px;">● 신규';
						vHtml += '		<dl>';
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
							vHtml += '			<dd class="'+v_bg+'" style="text-align:center;font-size:0.7rem;">';
							vHtml += v_success_count+"/"+v_total_count+"("+v_rate+"%)<br>"+v_name;
							vHtml += '			</dd>';
						}
						vHtml += '		</dl>';
						vHtml += '	</dd>';
						vHtml += '</dl>';
					}
					
					//출결
					var array_attend = attendList.filter(function(item, index){
						if(item.user_id == v_user_id && item.total_count > 0){
							return true;
						}
					});
					if(array_attend.length > 0)
					{
						vHtml += '<dl>';
						vHtml += '	<dd style="text-align:left;font-size:1rem;padding-left:10px;">● 출결';
						vHtml += '		<dl>';
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
							vHtml += '			<dd class="'+v_bg+'" style="text-align:center;font-size:0.7rem;">';
							vHtml += v_success_count+"/"+v_total_count+"("+v_rate+"%)<br>"+v_name;
							vHtml += '			</dd>';
						}
						vHtml += '		</dl>';
						vHtml += '	</dd>';
						vHtml += '</dl>';
					}
					
					//성적
					var array_practice = practiceList.filter(function(item, index){
						if(item.user_id == v_user_id && item.total_count > 0){
							return true;
						}
					});
					if(array_practice.length > 0)
					{
						vHtml += '<dl>';
						vHtml += '	<dd style="text-align:left;font-size:1rem;padding-left:10px;">● 성적';
						vHtml += '		<dl>';
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
							vHtml += '			<dd class="'+v_bg+'" style="text-align:center;font-size:0.7rem;">';
							vHtml += v_success_count+"/"+v_total_count+"("+v_rate+"%)<br>"+v_name;
							vHtml += '			</dd>';
						}
						vHtml += '		</dl>';
						vHtml += '	</dd>';
						vHtml += '</dl>';
					}
					
					//Daily 루틴
					var array_daily = dailyList.filter(function(item, index){
						if(item.user_id == v_user_id && item.total_count > 0){
							return true;
						}
					});
					if(array_daily.length > 0)
					{
						vHtml += '<dl>';
						vHtml += '	<dd style="text-align:left;font-size:1rem;padding-left:10px;">● Daily 루틴';
						vHtml += '		<dl>';
						for(var t=0; t<array_daily.length; t++)
						{
							var v_total_count = array_daily[t].total_count;
							var v_success_count = array_daily[t].success_count;
							var v_ignore_count = array_daily[t].ignore_count;
							var v_problem_count = array_daily[t].problem_count;
							var v_name = "";
							if(array_daily[t].course_group_name)
							{
								v_name = "<br>"+array_daily[t].course_group_name+' '+array_daily[t].course_name;;
							}
							
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
							vHtml += '			<dd class="'+v_bg+'" style="text-align:center;font-size:0.7rem;">';
							vHtml += v_success_count+","+v_ignore_count+","+v_problem_count+"/"+v_total_count+"("+v_rate+"%)"+v_name;
							vHtml += '			</dd>';
						}
						vHtml += '		</dl>';
						vHtml += '	</dd>';
						vHtml += '</dl>';
					}
					
					//Monthly 루틴
					var array_monthly = monthlyList.filter(function(item, index){
						if(item.user_id == v_user_id && item.total_count > 0){
							return true;
						}
					});
					if(array_monthly.length > 0)
					{
						vHtml += '<dl>';
						vHtml += '	<dd style="text-align:left;font-size:1rem;padding-left:10px;">● Monthly 루틴';
						vHtml += '		<dl>';
						for(var t=0; t<array_monthly.length; t++)
						{
							var v_total_count = array_monthly[t].total_count;
							var v_success_count = array_monthly[t].success_count;
							var v_ignore_count = array_monthly[t].ignore_count;
							var v_problem_count = array_monthly[t].problem_count;
							
							var v_name = "";
							if(array_monthly[t].course_group_name)
							{
								v_name = "<br>"+array_monthly[t].course_group_name+' '+array_monthly[t].course_name;;
							}
							
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
							vHtml += '			<dd class="'+v_bg+'" style="text-align:center;font-size:0.7rem;">';
							vHtml += v_success_count+","+v_ignore_count+","+v_problem_count+"/"+v_total_count+"("+v_rate+"%)"+v_name;
							vHtml += '			</dd>';
						}
						vHtml += '		</dl>';
						vHtml += '	</dd>';
						vHtml += '</dl>';
					}
					
					//TASK
					var array_task = taskList.filter(function(item, index){
						if(item.user_id == v_user_id && item.total_count > 0){
							return true;
						}
					});
					if(array_task.length > 0)
					{
						vHtml += '<dl>';
						vHtml += '	<dd style="text-align:left;font-size:1rem;padding-left:10px;">● TASK';
						vHtml += '		<dl>';
						for(var t=0; t<array_task.length; t++)
						{
							var v_total_count = array_task[t].total_count;
							var v_success_count = array_task[t].complete_count;
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
							vHtml += '			<dd class="'+v_bg+'" style="text-align:center;font-size:0.7rem;">';
							vHtml += v_success_count+"/"+v_total_count+"("+v_rate+"%)";
							vHtml += '			</dd>';
						}
						vHtml += '		</dl>';
						vHtml += '	</dd>';
						vHtml += '</dl>';
					}

					
					vHtml += '</a>';
					vHtml += '</dd>';
				}
				vHtml += '</dl>';
			}
			vHtml += '		</span>';
			create_down_organization_detail(t_id);
			vHtml += '	</li>';
		}
		vHtml += '</ul>';
	}
}

function move_monthly_user(v_user_id, v_user_nm)
{
	var v_stats_date = toYear+"-";
	if(toMonth < 10){
		v_stats_date += "0"+toMonth;
	}else{
		v_stats_date += ""+toMonth;
	}
	window.open("/notice/notice_stats_monthly_user.do?stats_date="+v_stats_date+"&&user_id="+v_user_id+"&&user_name="+v_user_nm,"notice_stats_monthly_user");
}