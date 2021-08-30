var page = 1;
var row_num = 20;

/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	
	$('#search_school_foreign_gubun').change(function(e){
		search_school_area1();
	});
	
	$('#search_school_area1').change(function(e){
		search_school_area2();
	});
	
	$("#search_school_name").keydown(function(key) {
		if (key.keyCode == 13) {
			search_school();
		}
	});
	
	form_search();
    
});

function search_school_area1()
{
	$("#search_school_area2").html('<option value="">전체</option>');
	if(!$('#search_school_foreign_gubun').val()){
		$("#search_school_area1").html('<option value="">전체</option>');
		return;
	}
	var url = "";
	if($('#search_school_foreign_gubun').val() == "국내"){
		url = "/base/getBaseArea1List.do";
	}else{
		url = "/base/getBaseCountry1List.do";
	}
	$.ajax({
		type : "POST",
		url : url,
		data:{
		},
		success:function(data){
			var vHtml = '<option value="">전체</option>';
			for(var i=0; i<data.length; i++){
				var area1 = "";
				if($('#search_school_foreign_gubun').val() == "국내"){
					area1 = data[i].area1;
				}else{
					area1 = data[i].country1;
				}
				vHtml += "<option value='"+area1+"'>"+area1+"</option>";
			}
			
			$("#search_school_area1").html(vHtml);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

function search_school_area2()
{
	if(!$('#search_school_area1').val()){
		$("#search_school_area2").html('<option value="">전체</option>');
		return;
	}
	var url = "";
	if($('#search_school_foreign_gubun').val() == "국내"){
		url = "/base/getBaseArea2List.do";
	}else{
		url = "/base/getBaseCountry2List.do";
	}
	$.ajax({
		type : "POST",
		url : url,
		data:{
			area1:$('#search_school_area1').val(),
			country1:$('#search_school_area1').val()
		},
		success:function(data){
			var vHtml = '<option value="">전체</option>';
			for(var i=0; i<data.length; i++){
				var area2 = "";
				if($('#search_school_foreign_gubun').val() == "국내"){
					area2 = data[i].area2;
				}else{
					area2 = data[i].country2;
				}
				vHtml += "<option value='"+area2+"'>"+area2+"</option>";
			}
			
			$("#search_school_area2").html(vHtml);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function form_search()
{
	search_list(1);
}

function search_list(vPage)
{
	page = vPage;
	
	$.ajax({
		type : "POST",
		url : "/base/getUserSchoolList.do",
		data:{
			page:vPage,
			row_num:row_num
		},
		success:function(data){
			var total_count = data.schoolCount.total_count;
			var total_page = Math.ceil(total_count/row_num);
			
			var schoolList = data.schoolList;
			
			var vHtml = "";
			
			for(var i=0; i<schoolList.length; i++){
				vHtml += "<tr>";
				vHtml += "<td class='text-center'>"+cfmNvl1(schoolList[i].school_foreign_gubun)+"</td>";
				vHtml += "<td class='text-center'>"+cfmNvl1(schoolList[i].school_gubun)+"</td>";
				vHtml += "<td class='text-center'>"+cfmNvl1(schoolList[i].school_area1)+"</td>";
				vHtml += "<td class='text-center'>"+cfmNvl1(schoolList[i].school_area2)+"</td>";
				vHtml += "<td>"+cfmNvl1(schoolList[i].school_name)+"</td>";
				vHtml += "<td class='with-btn' nowrap=''>";
				vHtml += "	<a href='javascript:form_matching("+schoolList[i].user_school_id+")' class='btn btn-sm btn-primary width-60 m-r-2'>매칭</a>";
				vHtml += "	<a href='javascript:form_create("+schoolList[i].user_school_id+")' class='btn btn-sm btn-primary width-80 m-r-2'>신규생성</a>";
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

var user_school_id;
var school_id;
function form_matching(idx)
{
	user_school_id = idx;
	school_id = "";
	$("#modal-school-matching").modal();
}

function search_school()
{
	if(!$('#search_school_name').val()){
		alert("학교명을 입력하세요.");
		return;
	}
	$.ajax({
		type : "POST",
		url : "/base/getBaseSchoolMatchingList.do",
		data:{
			school_foreign_gubun:$('#search_school_foreign_gubun').val(),
			school_gubun:$('#search_school_gubun').val(),
			school_area1:$('#search_school_area1').val(),
			school_area2:$('#search_school_area2').val(),
			school_name:$('#search_school_name').val()
		},
		success:function(data){
			var vHtml = "";
			
			for(var i=0; i<data.length; i++){
				vHtml += "<tr class='matching_school matching_school_"+data[i].id+"' style='cursor:pointer;' onclick='select_matching("+data[i].id+")'>";
				vHtml += "<td class='text-center' style='vertical-align: middle;width:100px;'>"+cfmNvl1(data[i].school_foreign_gubun)+"</td>";
				vHtml += "<td class='text-center' style='vertical-align: middle;width:120px;'>"+cfmNvl1(data[i].school_gubun)+"</td>";
				vHtml += "<td class='text-center' style='vertical-align: middle;width:160px;'>"+cfmNvl1(data[i].school_area1)+"</td>";
				vHtml += "<td class='text-center' style='vertical-align: middle;width:160px;'>"+cfmNvl1(data[i].school_area2)+"</td>";
				vHtml += "<td style='vertical-align: middle;width:250px;'>"+cfmNvl1(data[i].school_name_kr)+"</td>";
				vHtml += "<td style='vertical-align: middle;width:250px;'>"+cfmNvl1(data[i].school_name_en)+"</td>";
				vHtml += "</tr>";
			}
			
			$("#matching_list").html(vHtml);
			school_id = "";
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function select_matching(idx)
{
	school_id = idx;
	$(".matching_school").removeClass("table-info");
	$(".matching_school_"+idx).addClass("table-info");
}
function form_create(idx)
{
	user_school_id = idx;
	$.ajax({
		type : "POST",
		url : "/base/getUserSchool.do",
		data:{
			user_school_id:idx
		},
		success:function(data){
			$("#school_foreign_gubun").val(cfmNvl1(data.school_foreign_gubun));
			$("#school_gubun").val(cfmNvl1(data.school_gubun));
			$("#school_area1").val(cfmNvl1(data.school_area1));
			$("#school_area2").val(cfmNvl1(data.school_area2));
			$("#school_name_kr").val(cfmNvl1(data.school_name));
			$("#school_name_en").val(cfmNvl1(data.school_name));
			
			$("#modal-school-create").modal();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

function add_school_foreign_gubun(vGubun)
{
	$("#school_foreign_gubun").val(vGubun);
	$("#school_area1").val("");
	$("#school_area2").val("");
	$("#ul_school_area2").html("");
	
	var url = "";
	if(vGubun == "국내"){
		url = "/base/getBaseArea1List.do";
	}else{
		url = "/base/getBaseCountry1List.do";
	}
	$.ajax({
		type : "POST",
		url : url,
		data:{
		},
		success:function(data){
			var vHtml = '';
			for(var i=0; i<data.length; i++){
				var area1 = "";
				if(vGubun == "국내"){
					area1 = data[i].area1;
				}else{
					area1 = data[i].country1;
				}
				vHtml += "<li onclick=\"add_school_area1('"+area1+"')\" style=\"cursor:pointer;\">"+area1+"</li>";
			}
			
			$("#ul_school_area1").html(vHtml);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function add_school_gubun(vGubun)
{
	$("#school_gubun").val(vGubun);
}

function add_school_area1(vArea1)
{
	$("#school_area1").val(vArea1);
	$("#school_area2").val("");
	var url = "";
	if($("#school_foreign_gubun").val() == "국내"){
		url = "/base/getBaseArea2List.do";
	}else{
		url = "/base/getBaseCountry2List.do";
	}
	$.ajax({
		type : "POST",
		url : url,
		data:{
			area1:vArea1,
			country1:vArea1
		},
		success:function(data){
			var vHtml = '';
			for(var i=0; i<data.length; i++){
				var area2 = "";
				if($("#school_foreign_gubun").val() == "국내"){
					area2 = data[i].area2;
				}else{
					area2 = data[i].country2;
				}
				vHtml += "<li onclick=\"add_school_area2('"+area2+"')\" style=\"cursor:pointer;\">"+area2+"</li>";
			}
			
			$("#ul_school_area2").html(vHtml);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

function add_school_area2(vArea2)
{
	$("#school_area2").val(vArea2);
}

function form_create_save()
{
	if(!$("#school_foreign_gubun").val()){
		alert("국/내외를 선택하세요.");
		return;
	}
	if(!$("#school_gubun").val()){
		alert("학교구분을 선택하세요");
		return;
	}
	if(!$("#school_area1").val()){
		alert("시도&대륙을 선택하세요");
		return;
	}
	if(!$("#school_area2").val()){
		alert("시구군&국가를 선택하세요.");
		return;
	}
	
	$.ajax({
		type : "POST",
		url : "/base/updateCreateSchool.do",
		data:{
			user_school_id:user_school_id,
			school_foreign_gubun:$("#school_foreign_gubun").val(),
			school_gubun:$("#school_gubun").val(),
			school_area1:$("#school_area1").val(),
			school_area2:$("#school_area2").val(),
			school_name_kr:$("#school_name_kr").val(),
			school_name_en:$("#school_name_en").val()
		},
		success:function(data){
			alert("저장하였습니다.");
			$("#modal-school-create").modal("hide");
			search_list(page)
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

function form_matching_save()
{
	if(!school_id){
		alert("학교를 선택하세요.");
		return;
	}
	
	$.ajax({
		type : "POST",
		url : "/base/updateMatchingSchool.do",
		data:{
			id:school_id,
			user_school_id:user_school_id
		},
		success:function(data){
			alert("저장하였습니다.");
			$("#modal-school-matching").modal("hide");
			search_list(page)
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}