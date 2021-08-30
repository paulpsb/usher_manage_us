jQuery(document).ready(function(){
	$.ajax({
		type : "POST",
		url : "/batch/getBatchStatsExamMonthList.do",
		data : {
			
		},
		dataType : "json",
		success:function(data){
			var vHtml = "";
			for(var i=0; i < data.length; i++)
			{
				vHtml += '<option value="'+data[i].semester_date+'">'+data[i].semester_date+'</option>';
			}
			
			$("#semester_date").html(vHtml);
			
			$("#semester_date").change(function(){
				form_search();
			});
			
			$("#batch_finally_student_type").change(function(){
				form_search();
			});
			
			form_search();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
});

function form_search()
{
	$.ajax({
		type : "POST",
		url : "/batch/getBatchStatsMonthlyList.do",
		data : {
			semester_date:$("#semester_date").val(),
			batch_finally_student_type:$("#batch_finally_student_type").val()
		},
		dataType : "json",
		success:function(data){
			var monthlyList = data.monthlyList;
			var resultList = data.resultList;
			$("#result_count").html(resultList.length);
			var vHtml = "";
			for(var i=0; i<monthlyList.length; i++){
				vHtml += '<tr>';
				var v_semester_date = monthlyList[i].semester_date;
				var y_f_count = resultList.filter(function(item, index){
						if(item.semester_date == v_semester_date && item.finally_register == "등록"){
							return true;
						}
				}).length;

				var n_f_count = resultList.filter(function(item, index){
						if(item.semester_date == v_semester_date && item.finally_register == "미등록"){
							return true;
						}
				}).length;
				
				var f_count = y_f_count + n_f_count;
				var f_rate = Math.round(y_f_count/f_count*100);
				
				var s_r_count = resultList.filter(function(item, index){
						if(item.semester_date == v_semester_date && item.finally_register_detail == "예정"){
							return true;
						}
				}).length;
				
				var q_r_count = resultList.filter(function(item, index){
						if(item.semester_date == v_semester_date && item.finally_register_detail == "고민"){
							return true;
						}
				}).length;
				
				var n_r_count = resultList.filter(function(item, index){
						if(item.semester_date == v_semester_date && item.finally_register_detail == "거절"){
							return true;
						}
				}).length;
				
				vHtml += '<td rowspan="4" class="text-center">'+v_semester_date+'</td>';
				vHtml += '<td class="text-center">상담완료</td>';
				if(f_count > 0)
				{
					vHtml += '<td class="text-center bg-yellow"><a href="javascript:go_detail(\''+v_semester_date+'\',\'\',\'\')">'+f_count+'</a></td>';
				}else{
					vHtml += '<td class="text-center bg-yellow">&nbsp;</td>';
				}
				vHtml += '<td class="text-center">(미등록)예정</td>';
				if(s_r_count > 0)
				{
					vHtml += '<td class="text-center"><a href="javascript:go_detail(\''+v_semester_date+'\',\'\',\'예정\')">'+s_r_count+'</a></td>';
				}else{
					vHtml += '<td class="text-center">&nbsp;</td>';
				}
				vHtml += '</tr>';

				vHtml += '<tr>';
				vHtml += '<td class="text-center">등록</td>';
				if(y_f_count > 0)
				{
					vHtml += '<td class="text-center"><a href="javascript:go_detail(\''+v_semester_date+'\',\'등록\',\'\')">'+y_f_count+'</a></td>';
				}else{
					vHtml += '<td class="text-center">&nbsp;</td>';
				}
				vHtml += '<td class="text-center">(미등록)부재</td>';
				vHtml += '<td class="text-center">&nbsp;</td>';
				vHtml += '</tr>';

				vHtml += '<tr>';
				vHtml += '<td class="text-center">미등록</td>';
				if(n_f_count > 0)
				{
					vHtml += '<td class="text-center"><a href="javascript:go_detail(\''+v_semester_date+'\',\'미등록\',\'\')">'+n_f_count+'</a></td>';
				}else{
					vHtml += '<td class="text-center">&nbsp;</td>';
				}
				vHtml += '<td class="text-center">(미등록)고민</td>';
				if(q_r_count > 0)
				{
					vHtml += '<td class="text-center"><a href="javascript:go_detail(\''+v_semester_date+'\',\'\',\'고민\')">'+q_r_count+'</a></td>';
				}else{
					vHtml += '<td class="text-center">&nbsp;</td>';
				}
				vHtml += '</tr>';

				vHtml += '<tr>';
				vHtml += '<td class="text-center">등록률</td>';
				vHtml += '<td class="text-center">'+f_rate+'%</td>';
				vHtml += '<td class="text-center">(미등록)거절</td>';
				if(n_r_count > 0)
				{
					vHtml += '<td class="text-center"><a href="javascript:go_detail(\''+v_semester_date+'\',\'\',\'거절\')">'+n_r_count+'</a></td>';
				}else{
					vHtml += '<td class="text-center">&nbsp;</td>';
				}
				vHtml += '</tr>';
			}
			
			$("#data_list").html(vHtml);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function go_detail(v_semester_registration_date, v_finally_register, v_finally_register_detail)
{
	window.open("/batch/consultation_stats_form.do?semester_date="+$("#semester_date").val()+"&&batch_finally_student_type="+$("#batch_finally_student_type").val()+"&&semester_registration_date="+v_semester_registration_date+"&&finally_register="+v_finally_register+"&&finally_register_detail="+v_finally_register_detail,'consultation_stats');
}