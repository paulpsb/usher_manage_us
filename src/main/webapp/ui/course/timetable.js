/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	search_semester();
});


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
			for(var i=0; i<data.length; i++){
				vHtml += "<option value='"+data[i].id+"'>"+data[i].date+"</option>";
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
				vHtml += "<option value='"+data[i].id+"'>"+data[i].name+"</option>";
			}
			
			if(data.length == 0){
				vHtml = "<option value=''>반 그룹</option>";
			}
			
			$("#search_course_group_id").html(vHtml);
			
			$('#search_course_group_id').change(function(e){
				if($("#search_course_group_id").val()){
					search_course();
				}else{
					$("#search_course_id").html("<option>반</option>");				
				}
			});
			
			if(data.length > 0){
				search_course();
			}else{
				$("#search_course_id").html("<option>반</option>");		
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
			var nCourseCnt = data.length;
			var vHtml = '';
			vHtml += '<colgroup>';
			vHtml += '<col style="width:15%;" />';
			for(var i=0; i<nCourseCnt; i++)
			{
				vHtml += '<col style="width:calc(85%/'+nCourseCnt+');" />';
			}
			vHtml += '</colgroup>';
			vHtml += '<thead>';
			vHtml += '<tr>';
			vHtml += '<th class="redips-mark text-center bg-black-transparent-5 text-white">시간표</th>';
			for(var i=0; i<nCourseCnt; i++)
			{
				vHtml += '<th class="redips-mark text-center bg-black-transparent-5 text-white">'+data[i].name+'</th>';
			}
			vHtml += '</tr>';
			vHtml += '</thead>';
			vHtml += '<tbody>';
			for(var i=9; i<22; i++)
			{
				var sTime = "";
				var sHour = i;
				var eHour = i+1;
				if(sHour<10){
					sTime += "0"+sHour+":00 ~";
				}else{
					sTime += sHour+":00 ~";
				}
				
				if(eHour<10){
					sTime += "0"+eHour+":00";
				}else{
					sTime += eHour+":00";
				}

				vHtml += '<tr  class="height-40">';
				vHtml += '<th class="redips-mark text-center bg-black-transparent-5 text-white" >'+sTime+'</th>';
				for(var j=0; j<nCourseCnt; j++)
				{
					vHtml += '<td class="text-center bg-grey"></td>';
				}
				vHtml += '</tr>';
			}
			vHtml += '</tbody>';
			$("#timetableList").html(vHtml);
			
			redips.init();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

//create redips container
let redips = {};

redips.init = function () {
	let rd = REDIPS.drag;
	rd.init();
	//rd.dropMode = 'single';			// dragged elements can be placed only to the empty cells
	rd.hover.colorTd = '#9BB3DA';	// set hover color
	rd.clone.keyDiv = true;			// enable cloning DIV elements with pressed SHIFT key
	redips.divNodeList = document.getElementById('timetableList').getElementsByTagName('div');
	rd.event.dropped = function () {
		let	objOld = rd.objNew;
		$(objOld).removeClass("redips-drag");
	};
};
