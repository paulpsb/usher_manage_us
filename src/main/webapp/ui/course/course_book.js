var sectionList = [
	"ETC",
	"VOCA",
	"GRAMMAR",
	"READING",
	"LISTENING",
	"WRITING",
	"SPEAKING"
];

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
			var to_month = cfmGetToMonth();
			for(var i=0; i<data.length; i++){
				var selected = "";
				if(to_month == data[i].date) selected = "selected";
				vHtml += "<option value='"+data[i].id+"' "+selected+">"+data[i].date+"</option>";
			}
			
			$("#search_semester_id").html(vHtml);
			
			$("#input_semester_id").val("");
			
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
		url : "/common/getCoursegroupList.do",
		data:{
			semester_id:$("#search_semester_id").val(),
			test_type:$("#search_test_type").val()
		},
		success:function(data){
			var vHtml = "";
			
			for(var i=0; i<data.length; i++){
				var selected = "";
				vHtml += "<option value='"+data[i].id+"' "+selected+">"+data[i].name+"</option>";
			}
			
			if(data.length == 0){
				vHtml = "<option value=''>반 그룹</option>";
			}
			
			$("#search_course_group_id").html(vHtml);
			
			$('#search_course_group_id').change(function(e){
				search_course();
			});
			
			search_course();

		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});			
}

var course_list;
/*
 * 설명 : 반 조회.
 */
function search_course()
{
	if(!$("#search_course_group_id").val()){
		$("#courseList").html("");
		return;
	}
	$.ajax({
		type : "POST",
		url : "/common/getCourseList.do",
		data:{
			course_group_id:$("#search_course_group_id").val()
		},
		success:function(data){
			course_list = data;
			form_search();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

function form_search()
{
	if(!$("#search_course_group_id").val()){
		return;
	}
	
	$.ajax({
		type : "POST",
		url : "/course/getCourseGroupBookList.do",
		data:{
			course_group_id:$("#search_course_group_id").val()
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<course_list.length; i++)
			{
				var v_course_id = course_list[i].id;
				vHtml += '<tr>';
				vHtml += '	<td class="text-center">'+course_list[i].name+'<br>';
				vHtml += '(강사 : '+course_list[i].instructor_name+" / 매니저:"+course_list[i].manager_name+')</td>';
				vHtml += '	</td>';
				vHtml += '	<td>';
				vHtml += '		<div class="row" style="margin:0">';
				var array_book = data.filter(function(item, index){
					if(item.course_id == v_course_id){
						return true;
					}
				});
				for(var j=0; j<array_book.length; j++)
				{
					vHtml += '<div class="col-2">';
					vHtml += '	<img src="'+array_book[j].book_image+'" style="width:100%;border:1px solid #ccc;">';
					vHtml += '	<p class="text-center">'+array_book[j].book_name+'</p>';
					vHtml += '</div>';
				}
				vHtml += '		</div>';
				vHtml += '	</td>';
				vHtml += "	<td class='with-btn text-center' nowrap>";
				vHtml += "		<a href='javascript:open_book(\""+v_course_id+"\")' class='btn btn-sm btn-primary m-r-2'>교재 등록</a>";
				vHtml += "	</td>";
				vHtml += '</tr>';
			}
			$("#dataList").html(vHtml);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

var course_id;
function open_book(v_course_id)
{
	course_id = v_course_id;
	
	$.ajax({
		type : "POST",
		url : "/course/getCourseBookList.do",
		data:{
			course_id:course_id
		},
		success:function(data){
			var nSeq = 1;
			var courseBookList = data.courseBookList;
			var baseBookList   = data.baseBookList;
			var vHtml = "";
			for(var i=0; i<sectionList.length; i++)
			{
				var v_section = sectionList[i]
				vHtml += '<tr>';
				vHtml += '	<td class="text-center">'+v_section+'</td>';
				vHtml += '	<td>';
				vHtml += '		<div class="row" style="margin:0">';
				var array_book = baseBookList.filter(function(item, index){
					if(item.section == v_section){
						return true;
					}
				});
				for(var j=0; j<array_book.length; j++)
				{
					var v_book_id = array_book[j].id;
					var a_idx = courseBookList.findIndex(t => t.book_id == v_book_id);
					var checked = "";
					if(a_idx >= 0) checked = "checked";
					vHtml += '<div class="col-3 text-center">';
					vHtml += '	<img src="'+array_book[j].book_image+'" style="width:100%;border:1px solid #ccc;">';
					vHtml += '	<p>'+array_book[j].book_name+'</p>';
					vHtml += '	<div class="switcher">';
					vHtml += '		<input type="checkbox" name="use_yn" id="use_yn_'+nSeq+'" value="'+v_book_id+'" '+checked+'>';
					vHtml += '		<label for="use_yn_'+nSeq+'"></label>';
					vHtml += '	</div>';
					vHtml += '</div>';
					nSeq++;
				}
				vHtml += '		</div>';
				vHtml += '	</td>';

				vHtml += '</tr>';
			}
			$("#book_list").html(vHtml);
			$("#modal-book").modal();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

function save_book()
{
	var array_data = Array();
	$('input[name=use_yn]:checked').each(function(){
		var objData = Object();
		objData.book_id = $(this).val();
		array_data.push(objData);
	});
	
	var data_value = JSON.stringify(array_data);
	$.ajax({
		type : "POST",
		url : "/course/saveCourseBook.do",
		data:{
			course_id:course_id,
			data_value:data_value
		},
		success:function(data){
			$("#modal-book").modal("hide");
			form_search();

		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}