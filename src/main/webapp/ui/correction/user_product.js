var page = 1;
var row_num = 15;

var testTypeList;
var productList;

jQuery(document).ready(function(){
	$('#search_section,#search_practice_type,#search_status').change(function(e){
		form_search();
	});	
	
	$("#search_user_name").keydown(function(key) {
		if (key.keyCode == 13) {
			form_search();
		}
	});
	
	$("#search_auth_username").keydown(function(key) {
		if (key.keyCode == 13) {
			auth_search();
		}
	});
	
	
	search_product_test();
});

function search_product_test()
{
	$.ajax({
		type : "POST",
		url : "/correction/getShopProductTestList.do",
		data:{ },
		success:function(data){
			testTypeList = data.testTypeList;
			productList  = data.productList;
			var vHtml = "";
			for(var i=0; i<testTypeList.length; i++)
			{
				vHtml += '<tr>';
				vHtml += '	<td class="text-center">'+testTypeList[i].section+'</td>';
				vHtml += '	<td class="text-center">'+testTypeList[i].test_type+'</td>';
				vHtml += '	<td class="text-center">'+testTypeList[i].test_name+'</td>';
				vHtml += "	<td class='with-btn text-center' nowrap=''>";
				vHtml += "		<button type='button' class='btn btn-sm btn-primary m-r-2' onclick='select_test_type(\""+testTypeList[i].section+"\",\""+testTypeList[i].test_type+"\",\""+testTypeList[i].test_name+"\")'>선택</button>";
				vHtml += "	</td>";
				vHtml += '</tr>';
			}
			$("#test_list").html(vHtml);
			form_search();
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
		url : "/correction/getUserProductList.do",
		data:{
			section:$("#search_section").val(),
			practice_type:$("#search_practice_type").val(),
			status:$("#search_status").val(),
			user_name:$("#search_user_name").val(),
			page:vPage,
			row_num:row_num
		},
		success:function(data){
			var total_count = data.productCount.total_count;
			var total_page = Math.ceil(total_count/row_num);
			
			var productList = data.productList;
			
			var vHtml = "";
			for(var i=0; i<productList.length; i++){
				vHtml += "<tr>";
				vHtml += "<td class='text-center'>"+cfmNvl1(productList[i].section)+"</td>";
				vHtml += "<td class='text-center'>"+getPracticeType(productList[i].section, productList[i].practice_type)+"</td>";
				vHtml += "<td class='text-center'>"+cfmNvl1(productList[i].book)+"</td>";
				vHtml += "<td class='text-center'>"+cfmNvl1(productList[i].user_username)+"<br>"+cfmNvl1(productList[i].user_name)+"</td>";
				vHtml += "<td class='text-center'>"+getProductType(productList[i].product_type)+"</td>";
				vHtml += "<td class='text-center'>"+getUseType(productList[i].use_type)+"</td>";
				vHtml += "<td class='text-center'>"+getStatus(productList[i].status)+"</td>";
				vHtml += "<td class='text-center'>"+cfmNvl1(productList[i].expire_date)+"</td>";
				vHtml += "<td class='text-right'>"+cfmNvl1(productList[i].product_count)+"</td>";
				vHtml += "<td class='text-right'>"+cfmNvl1(productList[i].use_count)+"</td>";
				vHtml += "<td class='text-right'>"+cfmNvl1(productList[i].expire_count)+"</td>";
				vHtml += "<td class='text-right'>"+cfmNvl1(productList[i].remain_count)+"</td>";
				vHtml += "<td>"+cfmNvl1(productList[i].created_name)+"<br>"+cfmNvl1(productList[i].created)+"</td>";
				vHtml += "<td>"+cfmNvl1(productList[i].modified_name)+"<br>"+cfmNvl1(productList[i].modified)+"</td>";
				vHtml += "<td class='with-btn text-center' nowrap=''>";
				vHtml += "	<button type='button' class='btn btn-sm btn-primary m-r-2' onclick='modify_form(\""+productList[i].id+"\")'>수정</button>";
				vHtml += "	<button type='button' class='btn btn-sm btn-primary m-r-2' onclick='delete_form(\""+productList[i].id+"\")'>삭제</button>";
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

function getUseType(v_use_type){
	if(v_use_type == "COUNT")	return "차감";
	if(v_use_type == "DATE")	return "기간";
	return cfmNvl1(v_use_type);
	
}
function getPracticeType(v_section, v_practice_type)
{
	//if(v_practice_type == "MOCK_TEST")	return "첨삭/이용권";
	//if(v_practice_type == "ONLINE")	return "인강";
	var idx = testTypeList.findIndex(t => t.section == v_section && t.practice_type == v_practice_type);
	
	if(idx >= 0 ){
		return testTypeList[idx].test_name;
	}
	return v_practice_type;
}

function getProductType(v_product_type)
{
	if(v_product_type == "BUY"){
		return "구매";
	}else if(v_product_type == "BONUS"){
		return "보너스";
	}
	
	return "";
			
}

function getProductType(v_product_type) 
{
	if(v_product_type == "ETC")	return "기본";
	if(v_product_type == "TEST")	return "모의고사";
	
	return v_product_type;
}


function getStatus(v_status)
{
	if(v_status == "ACTIVE"){
		return "사용중";
	}else if(v_status == "COMPLETE"){
		return "사용완료";
	}else if(v_status == "EXPIRE"){
		return "유효기간 만료";
	}
	
	return "";
}

var user_product_id;
var product_count;
var use_count;
var expire_count;
var remain_count;


function add_form()
{
	user_product_id = 0;
	product_count = 0;
	use_count = 0;
	expire_count = 0;
	remain_count = 0;
	
	$("#search_auth_username").val("");
	$("#authList").html("");
	
	$("#div_search_user").show();
	$("#div_test_type").hide();
	$("#div_user_product").hide();
	
	
	$("#modal-user-product").modal();
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
		url : "/common/getUserSearchAllList.do",
		data:{
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
					vHtml += "<td class='with-btn text-center' nowrap=''>";
					vHtml += "	<a href='javascript:auth_select("+data[i].user_id+",\""+data[i].username+"\",\""+data[i].last_name+data[i].first_name+"\")' class='btn btn-sm btn-primary m-r-2'>선택</a>";
					vHtml += "</td>";
					vHtml += "</tr>";
				}
			}else{
				vHtml += "<tr><td class='text-center' colspan='3'>조회된 자료가 없습니다.</td></tr>";
			}
			$("#authList").html(vHtml);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

function auth_select(v_user_id, v_user_username, v_user_name)
{
	$("#update_user_username").html(v_user_username);
	$("#update_user_name").html(v_user_name);
	$("#update_user_id").val(v_user_id);
	
	$("#div_search_user").hide();
	$("#div_test_type").show();
	$("#div_user_product").hide();
}

function select_test_type(v_section, v_test_type, v_test_name)
{
	$("#update_section_name").html(v_section);
	$("#update_practice_type_name").html(v_test_name);
	$("#update_section").val(v_section);
	$("#update_practice_type").val(v_test_type);
	
	var array_product = productList.filter(function(item, index){
		if(item.section == v_section && item.test_type == v_test_type){
			return true;
		}
	});
	
	var vHtml = "";
	vHtml += '			<option value="all">모두</option>';
	for(var i=0; i<array_product.length; i++)
	{
		vHtml += '			<option value="'+array_product[i].book+'">'+array_product[i].book+'</option>';
	}
	$("#update_book").html(vHtml);
	$("#div_search_user").hide();
	$("#div_test_type").hide();
	$("#div_user_product").show();
}



function modify_form(v_id)
{
	user_product_id = v_id;
	$.ajax({
		type : "POST",
		url : "/correction/getUserProduct.do",
		data:{
			id:v_id
		},
		success:function(data){
			product_count = data.product_count;
			use_count = data.use_count;
			expire_count = data.expire_count;
			remain_count = data.remain_count;
			
			$("#update_user_username").html(data.user_username);
			$("#update_user_name").html(data.user_name);
			$("#update_user_id").val(data.user_id);
			$("#update_section_name").html(data.section);
			$("#update_practice_type_name").html(getPracticeType(data.section, data.practice_type));
			$("#update_section").val(data.section);
			$("#update_practice_type").val(data.practice_type);
			
			
			$("#update_product_type").val(data.product_type);
			$("#update_use_type").val(data.use_type);
			$("#update_expire_date").val(data.expire_date);
			$("#update_product_count").val(data.product_count);

			var array_product = productList.filter(function(item, index){
				if(item.section == data.section && item.test_type == data.practice_type){
					return true;
				}
			});
			
			
			var vHtml = "";
			vHtml += '			<option value="all">모두</option>';
			for(var i=0; i<array_product.length; i++)
			{
				var checked = "";
				if(array_product[i].book == data.book) checked = "checked";
				vHtml += '			<option value="'+array_product[i].book+'" '+checked+'>'+array_product[i].book+'</option>';
			}
			$("#update_book").html(vHtml);
			$("#div_search_user").hide();
			$("#div_test_type").hide();
			$("#div_user_product").show();
			
			$("#modal-user-product").modal();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}


function save_form()
{
	product_count = parseInt($("#update_product_count").val());
	remain_count = product_count - use_count - expire_count;
	
	if(remain_count < 0){
		alert("사용가능한 첨삭권이 0보다 작을 수 없습니다.");
		return;
	}
	
	var url = "/correction/insertUserProduct.do";
	if(user_product_id > 0){
		url = "/correction/updateUserProduct.do";
	}
	$.ajax({
		type : "POST",
		url : url,
		data:{
			id:user_product_id,
			status:"ACTIVE",
			section:$("#update_section").val(),
			practice_type:$("#update_practice_type").val(),
			product_type:$("#update_product_type").val(),
			use_type:$("#update_use_type").val(),
			user_id:$("#update_user_id").val(),
			expire_date:$("#update_expire_date").val(),
			product_count:product_count,
			use_count:use_count,
			expire_count:expire_count,
			remain_count:remain_count,
			book:$("#update_book").val()
		},
		success:function(data){
			alert("저장하였습니다.");
			$("#modal-user-product").modal("hide");
			search_list(page);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

function delete_form(v_id)
{
	$.ajax({
		type : "POST",
		url : "/correction/getUserProduct.do",
		data:{
			id:v_id
		},
		success:function(data){
			var v_product_count = data.product_count;
			var v_remain_count = data.remain_count;
			if(v_product_count != v_remain_count){
				alert("사용중인 첨삭권은 삭제하실수 없습니다.");
				return;
				
			}
			if(!confirm("삭제하시겠습니까?")) return;
			
			$.ajax({
				type : "POST",
				url : "/correction/deleteUserProduct.do",
				data:{
					id:v_id
				},
				success:function(data){
					alert("삭제하였습니다.");
					search_list(page);
				},
				error:function(event){				
					alert("잠시후 다시 시도 바랍니다.");
				}
			});
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}