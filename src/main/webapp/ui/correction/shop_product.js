var page = 1;
var row_num = 15;

var testTypeList;
var productList;

jQuery(document).ready(function(){
	$('#search_status').change(function(e){
		form_search();
	});	
	
	$("#search_product_name").keydown(function(key) {
		if (key.keyCode == 13) {
			form_search();
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
		url : "/correction/getShopProductList.do",
		data:{
			status:$("#search_status").val(),
			product_name:$("#search_product_name").val(),
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
				vHtml += "<td class='text-center'>"+getProductType(productList[i].product_type)+"</td>";
				vHtml += "<td>"+cfmNvl1(productList[i].product_name)+"</td>";
				vHtml += "<td>"+cfmNvl1(productList[i].product_desc)+"</td>";
				vHtml += "<td class='text-right'>"+cfmNvl1(productList[i].product_basic_price)+"</td>";
				vHtml += "<td class='text-right'>"+cfmNvl1(productList[i].product_price)+"</td>";
				vHtml += "<td class='text-right'>"+cfmNvl1(productList[i].sorting)+"</td>";
				vHtml += "<td class='text-center'>"+getStatus(productList[i].status)+"</td>";
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

function getProductType(v_product_type) 
{
	if(v_product_type == "ETC")	return "기본";
	if(v_product_type == "TEST")	return "모의고사";
	
	return v_product_type;
}

function getStatus(v_status)
{
	if(v_status == "ACTIVE"){
		return "판매중";
	}
	
	return "판매대기";
}

function add_form()
{
	
	$("#product_id").val("0");
	$("#status").val("ACTIVE");
	$("#section").val("VOCA");
	$("#practice_type").val("MOCK_TEST");
	$("#product_type").val("ETC");
	$("#product_name").val("");
	$("#product_desc").val("");
	$("#product_basic_price").val("");
	$("#product_price").val("");
	$("#product_image").val("");
	$("#product_limit_date").val("15");
	$("#sorting").val("1")
	$("#reading_yn").prop("checked", false);
	$("#listening_yn").prop("checked", false);
	$("#speaking_yn").prop("checked", false);
	$("#writing_yn").prop("checked", false);
	$("#detail_list").html("");
	$("#modal-shop-product").modal();
}

function modify_form(v_id)
{
	$.ajax({
		type : "POST",
		url : "/correction/getShopProduct.do",
		data:{
			id:v_id
		},
		success:function(data){
			var shopProduct = data.shopProduct;
			var shopProductDetailList = data.shopProductDetailList;
			
			$("#product_id").val(shopProduct.id);
			$("#status").val(shopProduct.status);
			$("#section").val(shopProduct.section);
			$("#practice_type").val(shopProduct.practice_type);
			$("#product_type").val(shopProduct.product_type);
			$("#product_name").val(shopProduct.product_name);
			$("#product_desc").val(shopProduct.product_desc);
			$("#product_basic_price").val(shopProduct.product_basic_price);
			$("#product_price").val(shopProduct.product_price);
			$("#product_image").val(shopProduct.product_image);
			$("#use_qty").val(shopProduct.use_qty);
			$("#sorting").val(shopProduct.sorting)
			if(shopProduct.reading_yn == "Y"){
				$("#reading_yn").prop("checked", true);
			}else{
				$("#reading_yn").prop("checked", false);
			}
			if(shopProduct.listening_yn == "Y"){
				$("#listening_yn").prop("checked", true);
			}else{
				$("#listening_yn").prop("checked", false);
			}
			if(shopProduct.speaking_yn == "Y"){
				$("#speaking_yn").prop("checked", true);
			}else{
				$("#speaking_yn").prop("checked", false);
			}
			if(shopProduct.writing_yn == "Y"){
				$("#writing_yn").prop("checked", true);
			}else{
				$("#writing_yn").prop("checked", false);
			}
			
			var vHtml = "";
			for(var i=0; i<shopProductDetailList.length; i++)
			{
				var v_section   = shopProductDetailList[i].section;
				var v_test_type = shopProductDetailList[i].practice_type;
				var v_test_name = shopProductDetailList[i].practice_name;
				
				var array_product = productList.filter(function(item, index){
					if(item.section == v_section && item.test_type == v_test_type){
						return true;
					}
				});
				
				var checked = "";
				vHtml += '<tr>';
				vHtml += '	<td class="text-center">'+v_section+'</td>';
				vHtml += '	<td class="text-center">'+v_test_name;
				vHtml += '		<input type="hidden" name="detail_section" value="'+v_section+'">';
				vHtml += '		<input type="hidden" name="detail_practice_type" value="'+v_test_type+'">';
				vHtml += '		<input type="hidden" name="detail_practice_name" value="'+v_test_name+'">';
				vHtml += '	</td>';
				vHtml += '	<td class="text-with-form-control">';
				vHtml += '		<select class="form-control" name="detail_book">';
				
				checked = "";
				if(shopProductDetailList[i].book == "all") checked = "selected";
				vHtml += '			<option value="all" '+checked+'>모두</option>';
				
				for(var j=0; j<array_product.length; j++)
				{
					checked = "";
					if(shopProductDetailList[i].book == array_product[j].book) checked = "selected";
					vHtml += '			<option value="'+array_product[j].book+'" '+checked+'>'+array_product[j].book+'</option>';
				}
				vHtml += '		</select>';
				vHtml += '	</td>';
				vHtml += '	<td class="text-with-form-control">';
				vHtml += '		<select class="form-control" name="detail_product_type">';
				
				console.log(shopProductDetailList[i].product_type);
				checked = "";
				if(shopProductDetailList[i].product_type == "COUNT") checked = "selected";
				vHtml += '			<option value="COUNT" '+checked+'>차감</option>';
				
				checked = "";
				if(shopProductDetailList[i].product_type == "DATE") checked = "selected";
				vHtml += '			<option value="DATE" '+checked+'>기간</option>';
				
				vHtml += '		</select>';
				vHtml += '	</td>';
				vHtml += '	<td class="text-with-form-control">';
				vHtml += '		<input type="text" class="form-control" name="detail_product_limit_date" value="'+shopProductDetailList[i].product_limit_date+'">';
				vHtml += '	</td>';
				vHtml += '	<td class="text-with-form-control">';
				vHtml += '		<input type="text" class="form-control" name="detail_product_qty" value="'+shopProductDetailList[i].product_qty+'">';
				vHtml += '	</td>';
				vHtml += "	<td class='with-btn text-center' nowrap=''>";
				vHtml += "		<button type='button' class='btn btn-sm btn-primary m-r-2' onclick='delete_detail_form(this)'>삭제</button>";
				vHtml += "	</td>";
				vHtml += '</tr>';
			}
			
			$("#detail_list").html(vHtml);
			$("#modal-shop-product").modal();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}

function add_detail_form()
{
	$("#modal-test-type").modal();
}

function select_test_type(v_section, v_test_type, v_test_name)
{
	var array_product = productList.filter(function(item, index){
		if(item.section == v_section && item.test_type == v_test_type){
			return true;
		}
	});
	
	var vHtml = "";

	vHtml += '<tr>';
	vHtml += '	<td class="text-center">'+v_section+'</td>';
	vHtml += '	<td class="text-center">'+v_test_name;
	vHtml += '		<input type="hidden" name="detail_section" value="'+v_section+'">';
	vHtml += '		<input type="hidden" name="detail_practice_type" value="'+v_test_type+'">';
	vHtml += '		<input type="hidden" name="detail_practice_name" value="'+v_test_name+'">';
	vHtml += '	</td>';
	vHtml += '	<td class="text-with-form-control">';
	vHtml += '		<select class="form-control" name="detail_book">';
	vHtml += '			<option value="all">모두</option>';
	for(var i=0; i<array_product.length; i++)
	{
		vHtml += '			<option value="'+array_product[i].book+'">'+array_product[i].book+'</option>';
	}
	vHtml += '		</select>';
	vHtml += '	</td>';
	vHtml += '	<td class="text-with-form-control">';
	vHtml += '		<select class="form-control" name="detail_product_type">';
	vHtml += '			<option value="COUNT">차감</option>';
	vHtml += '			<option value="DATE">기간</option>';
	vHtml += '		</select>';
	vHtml += '	</td>';
	vHtml += '	<td class="text-with-form-control">';
	vHtml += '		<input type="text" class="form-control" name="detail_product_limit_date">';
	vHtml += '	</td>';
	vHtml += '	<td class="text-with-form-control">';
	vHtml += '		<input type="text" class="form-control" name="detail_product_qty" value="1">';
	vHtml += '	</td>';
	vHtml += "	<td class='with-btn text-center' nowrap=''>";
	vHtml += "		<button type='button' class='btn btn-sm btn-primary m-r-2' onclick='delete_detail_form(this)'>삭제</button>";
	vHtml += "	</td>";
	vHtml += '</tr>';
	
	$("#detail_list").append(vHtml);
	$("#modal-test-type").modal("hide");
}

function delete_detail_form(obj)
{
	$(obj).closest("tr").remove();
}

function save_form()
{
	var $_detail_section            = $("input[name='detail_section']");
	var $_detail_practice_type      = $("input[name='detail_practice_type']");
	var $_detail_practice_name      = $("input[name='detail_practice_name']");
	var $_detail_book               = $("select[name='detail_book']");
	var $_detail_product_type       = $("select[name='detail_product_type']");
	var $_detail_product_limit_date = $("input[name='detail_product_limit_date']");
	var $_detail_product_qty        = $("input[name='detail_product_qty']");
	
	var array_data = Array();
	$_detail_section.each(function(index) {
		var detail_section              = $(this).val();
		var detail_practice_type        = $_detail_practice_type.eq(index).val();
		var detail_practice_name        = $_detail_practice_name.eq(index).val();
		var detail_book                 = $_detail_book.eq(index).val();
		var detail_product_type         = $_detail_product_type.eq(index).val();
		var detail_product_limit_date   = $_detail_product_limit_date.eq(index).val();
		var detail_product_qty          = $_detail_product_qty.eq(index).val();
		
		var objData = Object();
		objData.status              = "ACTIVE";
		objData.section             = detail_section;
		objData.practice_type       = detail_practice_type;
		objData.practice_name       = detail_practice_name;
		objData.book                = detail_book;
		objData.product_type        = detail_product_type;
		objData.product_limit_date  = detail_product_limit_date;
		objData.product_qty         = detail_product_qty;
		array_data.push(objData);
    });
	
	if(array_data.length == 0){
		alert("상세 상품을 선택하세요.");
		return;
	}
	
	var data_value = JSON.stringify(array_data);
	
	var reading_yn = "N";
	var listening_yn = "N";
	var speaking_yn = "N";
	var writing_yn = "N";

	if($("#reading_yn").prop("checked")) reading_yn = "Y";
	if($("#listening_yn").prop("checked")) listening_yn = "Y";
	if($("#speaking_yn").prop("checked")) speaking_yn = "Y";
	if($("#writing_yn").prop("checked")) writing_yn = "Y";

	var url = "/correction/insertShopProduct.do";
	if($("#product_id").val() != "0") url = "/correction/updateShopProduct.do";
	$.ajax({
		type : "POST",
		url : url,
		data:{
			id:$("#product_id").val(),
			status:$("#status").val(),
			section:$("#section").val(),
			practice_type:$("#practice_type").val(),
			product_type:$("#product_type").val(),
			product_name:$("#product_name").val(),
			product_desc:$("#product_desc").val(),
			product_basic_price:$("#product_basic_price").val(),
			product_price:$("#product_price").val(),
			product_image:$("#product_image").val(),
			product_limit_date:$("#product_limit_date").val(),
			use_qty:$("#use_qty").val(),
			book:$("#book").val(),
			sorting:$("#sorting").val(),
			reading_yn:reading_yn,
			listening_yn:listening_yn,
			speaking_yn:speaking_yn,
			writing_yn:writing_yn,
			data_value:data_value
		},
		success:function(data){
			alert("저장하였습니다.");
			$("#modal-shop-product").modal("hide");
			search_list(page);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}


function delete_form(v_id)
{
	if(!confirm("삭제하시겠습니까?")) return;
	
	$.ajax({
		type : "POST",
		url : "/correction/deleteShopProduct.do",
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
}