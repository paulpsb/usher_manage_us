var area1 = "";
/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	form_search();
    
});

/*
 * 설명 : 년/월 조회
 */
function form_search()
{

	$.ajax({
		type : "POST",
		url : "/base/getBaseArea1List.do",
		data:{
		},
		success:function(data){
			area1 = "";
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				vHtml += "<tr>";
				vHtml += "	<td class='text-center'>";
				vHtml += "		<a href='javascript:form_detail_search(\""+data[i].area1+"\")'>"+data[i].area1+"</a>";
				vHtml += "	</td>";
				vHtml += "	<td class='with-btn text-center' nowrap=''>";
				vHtml += "		<button type='button' class='btn btn-sm btn-primary width-60 m-r-2' onclick='form_modify_area1(\""+data[i].id+"\")'>수정</a>";
				vHtml += "	</td>";
				vHtml += "</tr>";
			}
			
			$("#area1List").html(vHtml);
			$("#area2List").html("");
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function form_detail_search(vArea1)
{
	area1 = vArea1;
	$.ajax({
		type : "POST",
		url : "/base/getBaseArea2List.do",
		data:{
			area1:vArea1
		},
		success:function(data){
			area1 = "";
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				vHtml += "<tr>";
				vHtml += "	<td class='text-center'>";
				vHtml += data[i].area2;
				vHtml += "	</td>";
				vHtml += "	<td class='with-btn text-center' nowrap=''>";
				vHtml += "		<button type='button' class='btn btn-sm btn-primary width-60 m-r-2' onclick='form_modify_area2(\""+data[i].id+"\")'>수정</a>";
				vHtml += "	</td>";
				vHtml += "</tr>";
			}
			
			$("#area2List").html(vHtml);
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

function form_add_area1()
{
	$("#area1").val("");
	$("#area1_id").val(0);
	$("#modal-area1").modal();
}

function form_modify_area1(idx)
{
	$.ajax({
		type : "POST",
		url : "/base/getBaseArea1.do",
		data:{
			id:idx
		},
		success:function(data){
			$("#area1").val(data.area1);
			$("#area1_id").val(data.id);
			$("#modal-area1").modal();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

function form_add_area2()
{
	$("#area2").val("");
	$("#area2_id").val(0);
	$("#modal-area2").modal();
}

function form_modify_area2(idx)
{
	$.ajax({
		type : "POST",
		url : "/base/getBaseArea2.do",
		data:{
			id:idx
		},
		success:function(data){
			$("#area2").val(data.area2);
			$("#area2_id").val(data.id);
			$("#modal-area2").modal();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

function form_save_area1()
{
	var url="";
	if($("#area1_id").val() == "0")
	{
		url="/base/insertBaseArea1.do";
	}else{
		url="/base/updateBaseArea1.do";
	}
	$.ajax({
		type : "POST",
		url : url,
		data:{
			id:$("#area1_id").val(),
			area1:$("#area1").val()
		},
		success:function(data){
			alert("저장하였습니다.");
			$("#modal-area1").modal("hide");
			form_search();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

function form_save_area2()
{
	var url="";
	if($("#area2_id").val() == "0")
	{
		url="/base/insertBaseArea2.do";
	}else{
		url="/base/updateBaseArea2.do";
	}
	$.ajax({
		type : "POST",
		url : url,
		data:{
			id:$("#area2_id").val(),
			area1:area1,
			area2:$("#area2").val()
		},
		success:function(data){
			alert("저장하였습니다.");
			$("#modal-area2").modal("hide");
			form_detail_search(area1);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}