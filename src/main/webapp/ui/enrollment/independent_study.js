var week = [
		'일요일', 
		'월요일', 
		'화요일', 
		'수요일', 
		'목요일', 
		'금요일', 
		'토요일'
];

/*
 * 설명 : 화면이 로딩후 
 */
jQuery(document).ready(function(){
	//버튼 컨트롤
	$('#chk_private').change(function(e){
		if($('#chk_private').is(":checked")){
			$(".refund").hide();
			show_private = true;
		}else{
			$(".refund").show();
			if(show_refund){
				$('.show_refund').html('<i class="fas fa-lg fa-fw m-r-10 fa-arrow-alt-circle-up"></i>');
				$('.show_refund_detail').show();
			}else{
				$('.show_refund').html('<i class="fas fa-lg fa-fw m-r-10 fa-arrow-circle-down"></i>');
				$('.show_refund_detail').hide();
			}
			show_private = false;
		}
	});
	
	var to_day = cfmGetToDate();
	$("#search_date").val(to_day);
	change_date();
    search_semester();
});

function change_date(){
	var vDate = $("#search_date").val();
	var to_day = cfmGetToDate();
	if(vDate < to_day){
		$("#btn_next").attr("disabled", false);
	}else{
		$("#btn_next").attr("disabled", true);
	}
	var sDate = cfmGetDigit(vDate);
    var yy = parseInt(sDate.substr(0, 4), 10);
    var mm = parseInt(sDate.substr(4, 2), 10);
    var dd = parseInt(sDate.substr(6, 2), 10);

    var d = new Date(yy, mm - 1, dd);
    var w = d.getDay();
    $("#select_date_text").val(yy+"년 "+parseInt(mm)+"월"+parseInt(dd)+"일,"+week[w]);
    
}

function date_prev()
{
	var v_date = cfmAddDate($("#search_date").val(), -1);
	$("#search_date").val(v_date);
	change_date();
	search_result();
}

function date_next()
{
	var v_date = cfmAddDate($("#search_date").val(), 1);
	$("#search_date").val(v_date);
	change_date();
	search_result();
}

/*
 * 설명 : 년/월 조회
 */
function search_semester()
{
	var to_month = cfmGetToMonth();
	
	$.ajax({
		type : "POST",
		url : "/common/getSemesterList.do",
		data:{
		},
		success:function(data){
			var vHtml = "";
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
			nSeq = 0;
			for(var i=0; i<data.length; i++){
				if(data[i].lecture_type == "SPECIAL")
				{
					vHtml += "<option value='"+data[i].id+"'>"+data[i].name+"</option>";
					nSeq++;
				}
			}
			
			if(nSeq == 0){
				vHtml = "<option value=''>반 그룹</option>";
			}
			
			$("#search_course_group_id").html(vHtml);
			
			$('#search_course_group_id').change(function(e){
				search_result();
			});
			
			if(nSeq > 0){
				search_result();
			}

		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

function search_result()
{
	$.ajax({
		type : "POST",
		url : "/enrollment/getIndependentPracticeResultList.do",
		data:{
			course_group_id:$("#search_course_group_id").val(),
			date:$("#search_date").val()
		},
		success:function(data){
			console.log(data);
			var vHtml ="";
			for(var i=0; i<data.length; i++)
			{
				vHtml += '<tr>';
				vHtml += '<td class="text-center">'+data[i].course_name+'</td>';
				vHtml += '<td class="text-center">'+data[i].student_name+'</td>';
				vHtml += '<td class="text-right">'+minusToEmpty(data[i].real_score)+'</td>';
				vHtml += '<td class="text-right">'+minusToEmpty(data[i].score)+'</td>';
				vHtml += '<td class="text-right">'+minusToEmptyUrl(data[i].score1, data[i].practice_result_id1)+'</td>';
				vHtml += '<td class="text-right">'+minusToEmptyUrl(data[i].score2, data[i].practice_result_id2)+'</td>';
				vHtml += '<td class="text-right">'+minusToEmptyUrl(data[i].score3, data[i].practice_result_id3)+'</td>';
				vHtml += '<td class="text-right">'+minusToEmptyUrl(data[i].score4, data[i].practice_result_id4)+'</td>';
				vHtml += '<td class="text-right">'+minusToEmptyUrl(data[i].score5, data[i].practice_result_id5)+'</td>';
				vHtml += '<td class="text-right">'+minusToEmptyUrl(data[i].score6, data[i].practice_result_id6)+'</td>';
				vHtml += '<td class="text-right">'+minusToEmptyUrl(data[i].score7, data[i].practice_result_id7)+'</td>';
				vHtml += '<td class="text-right">'+minusToEmptyUrl(data[i].score8, data[i].practice_result_id8)+'</td>';
				vHtml += '<td class="text-right">'+minusToEmptyUrl(data[i].score9, data[i].practice_result_id9)+'</td>';
				vHtml += '<td class="text-right">'+minusToEmptyUrl(data[i].score10, data[i].practice_result_id10)+'</td>';
				vHtml += '<td class="text-right">'+minusToEmptyUrl(data[i].score11, data[i].practice_result_id11)+'</td>';
				vHtml += '<td class="text-right">'+minusToEmptyUrl(data[i].score12, data[i].practice_result_id12)+'</td>';
				vHtml += '<td class="text-right">'+minusToEmptyUrl(data[i].score13, data[i].practice_result_id13)+'</td>';
				vHtml += '<td class="text-right">'+minusToEmptyUrl(data[i].score14, data[i].practice_result_id14)+'</td>';
				vHtml += '<td class="text-right">'+minusToEmptyUrl(data[i].score15, data[i].practice_result_id15)+'</td>';
				vHtml += '<td class="text-right">'+minusToEmptyUrl(data[i].score16, data[i].practice_result_id16)+'</td>';
				vHtml += '</tr>';
			}
			$("#dataList").html(vHtml);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

function minusToEmpty(val)
{
	if(val < 0) return "&nbsp";
	
	return val;
}

function minusToEmptyUrl(val, practice_result_id)
{
	if(val < 0) return "&nbsp";
	
	var exam_url = "http://exam.usher.co.kr/";
	
	url = exam_url + "/study/voca/result.do?id="+practice_result_id;
	
	return "<a href='"+url+"' target='_blank'>"+val+"</a>";
}