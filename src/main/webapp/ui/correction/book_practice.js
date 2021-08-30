/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	$('#search_section').change(function(e){
		form_search();
	});	
	
		
	search_section();
});

/*
 * 설명 : 년/월 조회
 */
function search_section()
{

	$.ajax({
		type : "POST",
		url : "/common/getPracticeSectionList.do",
		data:{
			
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				vHtml += "<option value='"+data[i].section+"'>"+data[i].section+"</option>";
			}
			
			$("#search_section").html(vHtml);
			form_search();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}


function form_search()
{
	$.ajax({
		type : "POST",
		url : "/correction/getCorrectionTestBookList.do",
		data:{
			section: $("#search_section").val()
		},
		success:function(data){
			var nCnt = 1;
			var bookList     = data.bookList;
			var testTypeList = data.testTypeList;
			var testBookList = data.testBookList;
			
			var nSeq = 5;
			var nSize = testTypeList.length;
			if(nSize > 5) nSeq = nSize;
			var nWidth = 80/nSeq;
			
			var vHtml = "";
			vHtml += '<table class="table table-bordered table-th-valign-middle table-td-valign-middle m-b-0">';
			vHtml += '	<colgroup>';
			vHtml += '		<col style="width:10%;" />';
			vHtml += '		<col style="width:10%;" />';
			for(var i=0; i<nSeq; i++)
			{
				vHtml += '		<col style="width:'+nWidth+'%;" />';
			}
			vHtml += '	</colgroup>';
			vHtml += '	<thead>';
			vHtml += '		<tr class="table-active">';
			vHtml += '			<th class="text-center">section</th>';
			vHtml += '			<th class="text-center">book</th>';
			for(var i=0; i<nSeq; i++)
			{
				if(nSize > i){
					vHtml += '			<th class="text-center">'+testTypeList[i].test_name+'</th>';
				}else{
					vHtml += '			<th class="text-center">&nbsp;</th>';
				}
			}
			vHtml += '		</tr>';
			vHtml += '	</thead>';
			vHtml += '	<tbody>';
			for(var i=0; i<bookList.length; i++)
			{
				vHtml += '		<tr>';
				vHtml += '			<td class="text-center">'+$("#search_section").val()+'</td>';
				vHtml += '			<td class="text-center">'+bookList[i].book+'</td>';
				for(var j=0; j<nSeq; j++)
				{
					if(nSize > j){
						var checked = "";
						var section        = $("#search_section").val();
						var book           = bookList[i].book;
						var practice_type  = testTypeList[j].practice_type;
						var test_type      = testTypeList[j].test_type;
						var idx = testBookList.findIndex(t => t.section == section && t.book == book && t.practice_type == practice_type && t.test_type == test_type);
						if(idx >= 0) checked = "checked";
						vHtml += '		<td class="text-center">';
						vHtml += '			<input type="hidden" name="section" value="'+section+'">';
						vHtml += '			<input type="hidden" name="book" value="'+book+'">';
						vHtml += '			<input type="hidden" name="practice_type" value="'+practice_type+'">';
						vHtml += '			<input type="hidden" name="test_type" value="'+test_type+'">';
						vHtml += '			<div class="switcher">';
						vHtml += '				<input type="checkbox" name="test_type_use" id="test_type_use_'+nCnt+'" value="1" '+checked+'>';
						vHtml += '				<label for="test_type_use_'+nCnt+'"></label>';
						vHtml += '			</div>';
						vHtml += '		</td>';
						nCnt++;
						
					}else{
						vHtml += '			<td class="text-center">&nbsp;</td>';
					}
				}
				vHtml += '		</tr>';
			}
			vHtml += '	</tbody>';
			vHtml += '</table>';
			
			
			$("#div_table").html(vHtml);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function form_save()
{
	var array_data = Array();
	var $_section                 = $("input[name='section']");
	var $_practice_type           = $("input[name='practice_type']");
	var $_test_type               = $("input[name='test_type']");
	var $_book                    = $("input[name='book']");
	var $_test_type_use           = $("input[name='test_type_use']");

	$_section.each(function(index) {
		var section            = $(this).val();
		var practice_type      = $_practice_type.eq(index).val();
		var test_type          = $_test_type.eq(index).val();
		var book               = $_book.eq(index).val();
		var use_yn             = "N";
		if($_test_type_use.eq(index).is(":checked"))
		{
			use_yn             = "Y";
		}
		var objData = Object();
		objData.section          = section;
		objData.practice_type    = practice_type;
		objData.test_type        = test_type;
		objData.book             = book;
		objData.use_yn           = use_yn;

		array_data.push(objData);
    });

	if(array_data.length == 0) return;
	
	var data_value = JSON.stringify(array_data);
	
	$.ajax({
		type : "POST",
		url : "/correction/saveCorrectionTestBookList.do",
		data:{
			data_value:data_value
		},
		success:function(data){
			alert("저장하였습니다.");
			form_search();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}