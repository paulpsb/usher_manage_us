var page = 1;
var row_num = 20;

/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	$("#search_toefl_excel_matching").val("N");
	$("#search_auth_username").keydown(function(key) {
		if (key.keyCode == 13) {
			auth_search();
		}
	});

	$('#search_toefl_excel_matching').change(function(e){
		form_search();
	});	
	form_search();
});

function form_search()
{
	search_list(1);
}


function search_list(vPage)
{
	page = vPage;
	$.ajax({
		type : "POST",
		url : "/enrollment/getToeflExcelList.do",
		data:{
			toefl_excel_matching:$("#search_toefl_excel_matching").val(),
			page:vPage,
			row_num:row_num
		},
		success:function(data){
			var total_count = data.dataCount.total_count;
			var total_page = Math.ceil(total_count/row_num);
			
			var dataList = data.dataList;
			
			var vHtml = "";
			for(var i=0; i<dataList.length; i++){
				var v_class = "";
				if(dataList[i].toefl_excel_matching != "Y"){
					v_class = "class='bg-yellow-transparent-3'";
				}
				
				vHtml += "<tr "+v_class+">";
				vHtml += "<td>"+cfmNvl1(dataList[i].toefl_excel_user_id)+"</td>";
				vHtml += "<td>"+cfmNvl1(dataList[i].toefl_excel_user_name)+"</td>";
				vHtml += "<td>"+cfmNvl1(dataList[i].date)+"</td>";
				vHtml += "<td>"+cfmNvl1(dataList[i].reading)+"</td>";
				vHtml += "<td>"+cfmNvl1(dataList[i].listening)+"</td>";
				vHtml += "<td>"+cfmNvl1(dataList[i].speaking)+"</td>";
				vHtml += "<td>"+cfmNvl1(dataList[i].writing)+"</td>";
				vHtml += "<td>"+cfmNvl1(dataList[i].total_score)+"</td>";
				if(dataList[i].toefl_excel_matching == "Y"){
					vHtml += "<td>매칭</td>";
				}else{
					vHtml += "<td>미매칭</td>";
				}
				vHtml += "<td class='with-btn text-center' nowrap=''>";
				vHtml += "	<button type='button' class='btn btn-sm btn-primary m-r-2' onclick='modify_student(\""+dataList[i].id+"\")'>학생 등록</button>";
				vHtml += "</td>";
				vHtml += "</tr>";
			}
			
			$("#dataList").html(vHtml);
			
			vHtml = cfmPage(10, vPage, total_page, "search_list");
			$("#pageList").html(vHtml);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function excel_form()
{
	$("#modal-toefl-excel").modal();
}

function form_excel_save()
{
	var formData=new FormData(document.getElementById('form1'));
	
	$.ajax({
        type: 'POST',
        url: '/enrollment/uploadExcelToeflExam.do',
        data: formData,
        processData: false,
        contentType: false
    }).done(function (data) {
    	alert("업로드 하였습니다.");
    	$("#modal-toefl-excel").modal("hide");
		search_list(page);
    }).fail(function (error) {
    	console.log(error);
    })
}

var toefl_exam_id;
function modify_student(v_id)
{
	toefl_exam_id = v_id;
	
	$("#authList").html("");
	$("#search_auth_username").val("");
	$("#modal-student").modal();
}

function auth_search()
{
	var v_username = $("#search_auth_username").val();
	if(!v_username || v_username.length < 2){
		alert("검색어는 2글자 이상 입력하세요.");
		return;
	}
	
	$.ajax({
		type : "POST",
		url : "/base/getAuthUserStudentList.do",
		data:{
			group_id:1,
			username:v_username
		},
		success:function(data){
			var vHtml = "";
			if(data.length > 0){
				for(var i=0; i<data.length; i++)
				{
					vHtml += "<tr>";
					vHtml += "<td class='text-center'>"+data[i].username+"</td>";
					vHtml += "<td class='text-center'>"+data[i].last_name+data[i].first_name+"</td>";
					vHtml += "<td class='text-center'>"+cfmNvl1(data[i].gender)+"</td>";
					vHtml += "<td class='text-center'>"+cfmNvl1(data[i].email)+"</td>";
					vHtml += "<td class='text-center'>"+cfmNvl1(data[i].birthday)+"</td>";
					vHtml += "<td class='text-center'>"+cfmNvl1(data[i].mobile_no)+"</td>";
					vHtml += "<td class='with-btn text-center' nowrap=''>";
					vHtml += "	<a href='javascript:change_student("+data[i].user_id+")' class='btn btn-sm btn-primary m-r-2'>등록</a>";
					vHtml += "</td>";
					vHtml += "</tr>";
				}
			}else{
				vHtml += "<tr><td class='text-center' colspan='7'>조회된 자료가 없습니다.</td></tr>";
			}
			$("#authList").html(vHtml);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

function change_student(v_user_id)
{
	$.ajax({
		type : "POST",
		url : "/enrollment/updateExamsToeflExcel.do",
		data:{
			id:toefl_exam_id,
			user_id:v_user_id
		},
		success:function(data){
			alert("저장하였습니다.");
			$("#modal-student").modal("hide");
			search_list(page);

		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}