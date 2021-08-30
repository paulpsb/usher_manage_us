var country1 = "";
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
		url : "/base/getBaseCountry1List.do",
		data:{
		},
		success:function(data){
			country1 = "";
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				vHtml += "<tr>";
				vHtml += "	<td class='text-center'>";
				vHtml += "		<a href='javascript:form_detail_search(\""+data[i].country1+"\")'>"+data[i].country1+"</a>";
				vHtml += "	</td>";
				vHtml += "	<td class='with-btn text-center' nowrap=''>";
				vHtml += "		<button type='button' class='btn btn-sm btn-primary width-60 m-r-2' onclick='form_modify_country1(\""+data[i].id+"\")'>수정</a>";
				vHtml += "	</td>";
				vHtml += "</tr>";
			}
			
			$("#country1List").html(vHtml);
			$("#country2List").html("");
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function form_detail_search(vCountry1)
{
	country1 = vCountry1;
	$.ajax({
		type : "POST",
		url : "/base/getBaseCountry2List.do",
		data:{
			country1:vCountry1
		},
		success:function(data){
			country1 = "";
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				vHtml += "<tr>";
				vHtml += "	<td class='text-center'>";
				vHtml += data[i].country2;
				vHtml += "	</td>";
				vHtml += "	<td class='with-btn text-center' nowrap=''>";
				vHtml += "		<button type='button' class='btn btn-sm btn-primary width-60 m-r-2' onclick='form_modify_country2(\""+data[i].id+"\")'>수정</a>";
				vHtml += "	</td>";
				vHtml += "</tr>";
			}
			
			$("#country2List").html(vHtml);
			
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

function form_add_country1()
{
	$("#country1").val("");
	$("#country1_id").val(0);
	$("#modal-country1").modal();
}

function form_modify_country1(idx)
{
	$.ajax({
		type : "POST",
		url : "/base/getBaseCountry1.do",
		data:{
			id:idx
		},
		success:function(data){
			$("#country1").val(data.country1);
			$("#country1_id").val(data.id);
			$("#modal-country1").modal();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

function form_add_country2()
{
	$("#country2").val("");
	$("#country2_id").val(0);
	$("#modal-country2").modal();
}

function form_modify_country2(idx)
{
	$.ajax({
		type : "POST",
		url : "/base/getBaseCountry2.do",
		data:{
			id:idx
		},
		success:function(data){
			$("#country2").val(data.country2);
			$("#country2_id").val(data.id);
			$("#modal-country2").modal();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

function form_save_country1()
{
	var url="";
	if($("#country1_id").val() == "0")
	{
		url="/base/insertBaseCountry1.do";
	}else{
		url="/base/updateBaseCountry1.do";
	}
	$.ajax({
		type : "POST",
		url : url,
		data:{
			id:$("#country1_id").val(),
			country1:$("#country1").val()
		},
		success:function(data){
			alert("저장하였습니다.");
			$("#modal-country1").modal("hide");
			form_search();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

function form_save_country2()
{
	var url="";
	if($("#country2_id").val() == "0")
	{
		url="/base/insertBaseCountry2.do";
	}else{
		url="/base/updateBaseCountry2.do";
	}
	$.ajax({
		type : "POST",
		url : url,
		data:{
			id:$("#country2_id").val(),
			country1:country1,
			country2:$("#country2").val()
		},
		success:function(data){
			alert("저장하였습니다.");
			$("#modal-country2").modal("hide");
			form_detail_search(country1);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}