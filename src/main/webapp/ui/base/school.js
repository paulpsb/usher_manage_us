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
			form_search();
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
		url : "/base/getBaseSchoolList.do",
		data:{
			school_foreign_gubun:$('#search_school_foreign_gubun').val(),
			school_gubun:$('#search_school_gubun').val(),
			school_area1:$('#search_school_area1').val(),
			school_area2:$('#search_school_area2').val(),
			school_name:$('#search_school_name').val(),
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
				vHtml += "<td>"+cfmNvl1(schoolList[i].school_name_kr)+"</td>";
				vHtml += "<td>"+cfmNvl1(schoolList[i].school_name_en)+"</td>";
				vHtml += "<td class='with-btn' nowrap=''>";
				vHtml += "	<a href='javascript:form_modify("+schoolList[i].id+")' class='btn btn-sm btn-primary width-60 m-r-2'>수정</a>";
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

function form_add()
{
	$("#school_id").val("0");
	$("#school_foreign_gubun").val("");
	$("#school_gubun").val("");
	$("#school_area1").val("");
	$("#school_area2").val("");
	$("#school_name_kr").val("");
	$("#school_name_en").val("");
	
	$("#modal-school").modal();
}

function form_modify(idx)
{
	$.ajax({
		type : "POST",
		url : "/base/getBaseSchool.do",
		data:{
			id:idx
		},
		success:function(data){
			$("#school_id").val(data.id);
			$("#school_foreign_gubun").val(cfmNvl1(data.school_foreign_gubun));
			$("#school_gubun").val(cfmNvl1(data.school_gubun));
			$("#school_area1").val(cfmNvl1(data.school_area1));
			$("#school_area2").val(cfmNvl1(data.school_area2));
			$("#school_name_kr").val(cfmNvl1(data.school_name_kr));
			$("#school_name_en").val(cfmNvl1(data.school_name_en));
			
			$("#modal-school").modal();
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

function form_save()
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
	
	var url = "";
	if($("#school_id").val() == "0"){
		url = "/base/insertBaseSchool.do";
	}else{
		url = "/base/updateBaseSchool.do";
	}
	$.ajax({
		type : "POST",
		url : url,
		data:{
			id:$("#school_id").val(),
			school_foreign_gubun:$("#school_foreign_gubun").val(),
			school_gubun:$("#school_gubun").val(),
			school_area1:$("#school_area1").val(),
			school_area2:$("#school_area2").val(),
			school_name_kr:$("#school_name_kr").val(),
			school_name_en:$("#school_name_en").val()
		},
		success:function(data){
			alert("저장하였습니다.");
			$("#modal-school").modal("hide");
			search_list(page)
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}
