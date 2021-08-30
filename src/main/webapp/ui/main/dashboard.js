var courseGroupInfo;
var course_count;

var show_private = false;

var show_refund = true;
var show_today_new_student = true;
var show_new_student = true;
var show_absend = true;
var show_late = true;
var show_speech = true;
var show_voca = true;
var show_goal= true;
var show_sylabus = true;
var show_achieve = true;
var show_confidence = true;
var show_noteffect = true;
var show_levelup = true;
var show_notsend = true;
var show_notschool = true;



var week = [
		'일요일', 
		'월요일', 
		'화요일', 
		'수요일', 
		'목요일', 
		'금요일', 
		'토요일'
];


var dashboard_timer_id;
/*
 * 설명 : 화면이 로딩후 
 */
jQuery(document).ready(function(){
	//버튼 컨트롤
	$('#chk_private').change(function(e){
		if($('#chk_private').is(":checked")){
			show_private = true;
			if($("input[name='search_main_type']:checked").val() == "dashboard_info")
			{
				create_dashboard();
			}else{
				create_dashboard_achieve();
			}
		}else{
			
			show_private = false;
			if($("input[name='search_main_type']:checked").val() == "dashboard_info")
			{
				create_dashboard();
			}else{
				create_dashboard_achieve();
			}
		}
	});
	
	$("input[name='search_main_type']").click(function(){
		search_dashboard();
	});
	
	var to_day = cfmGetToDate();
	$("#search_date").val(to_day);
	change_date();
    search_semester();
    
    setInterval(function(){
        console.log("Hello!!");
    }, 1000)
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
	search_dashboard();
}

function date_next()
{
	var v_date = cfmAddDate($("#search_date").val(), 1);
	$("#search_date").val(v_date);
	change_date();
	search_dashboard();
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
			course_group_list = data;
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				vHtml += "<option value='"+data[i].id+"'>"+data[i].name+"</option>";
			}
			
			if(data.length == 0){
				vHtml = "<option value=''>반 그룹</option>";
			}
			
			$("#search_course_group_id").html(vHtml);
			
			$('#search_course_group_id').change(function(e){
				if($("#search_course_group_id").val()){
					search_course();
				}
			});
			
			if(data.length > 0){
				search_course();
			}
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

/*
 * 설명 : 반 조회.
 */
function search_course()
{
	$.ajax({
		type : "POST",
		url : "/common/getCourseList.do",
		data:{
			course_group_id:$("#search_course_group_id").val()
		},
		success:function(data){
			courseList = data;
			search_dashboard();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

var timerId = null;

function search_dashboard()
{
	if(timerId != null) {
        clearInterval(timerId);
    }

	timerId = setInterval(search_dashboard, 600000);

	var search_main_type = $("input[name='search_main_type']:checked").val();
	if(search_main_type == "dashboard_info"){
		search_dashboard_info();
	}else if(search_main_type == "dashboard_achieve"){
		search_dashboard_achieve();
	}
	
	
}