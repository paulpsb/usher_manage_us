var sectionList;
var typeList;
/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	search_section();
});

function search_section(){

	$.ajax({
		type : "POST",
		url : "/subject/getSectionList.do",
		data:{
		},
		success:function(data){
			sectionList = data;
			search_type();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

function search_type(){

	$.ajax({
		type : "POST",
		url : "/subject/getTypeList.do",
		data:{
		},
		success:function(data){
			typeList = data;
			form_search()
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

function form_search(){

	$.ajax({
		type : "POST",
		url : "/subject/getSectionTypeList.do",
		data:{
		},
		success:function(data){
			var nSeq = 1;
			var sectionCount = sectionList.length;
			var width = 85/sectionCount;
			var vHtml = "";
			vHtml += '<table class="table table-striped table-th-valign-middle table-td-valign-middle m-b-0">';
			vHtml += '	<colgroup>';
			vHtml += '		<col style="width:15%;" />';
			for(var i=0; i<sectionCount; i++)
			{
				vHtml += '		<col style="width:'+width+'%;" />';
			}
			vHtml += '	</colgroup>';
			vHtml += '	<thead>';
			vHtml += '		<tr>';
			vHtml += '			<th class="text-center" >구분</th>';
			for(var i=0; i<sectionCount; i++)
			{
				vHtml += '		<th class="text-center">'+sectionList[i].section+'</th>';
			}
			vHtml += '		</tr>';
			vHtml += '	</thead>';
			vHtml += '	<tbody>';
			for(var i=0; i<typeList.length; i++)
			{
				vHtml += '		<tr>';
				vHtml += '		<th class="text-center">'+typeList[i].practice_name+'</th>';
				for(var j=0; j<sectionList.length; j++)
				{
					var checked = "";
					var section       = sectionList[j].section;
					var practice_type = typeList[i].practice_type;
					var idx = data.findIndex(t => t.section == section && t.practice_type == practice_type);
					if(idx >= 0) checked = "checked";
					vHtml += '		<td class="text-center">';
					vHtml += '			<input type="hidden" name="section" value="'+sectionList[j].section+'">';
					vHtml += '			<input type="hidden" name="practice_type" value="'+typeList[i].practice_type+'">';
					vHtml += '			<div class="switcher">';
					vHtml += '				<input type="checkbox" name="practice_type_use" id="practice_type_use_'+nSeq+'" value="1" '+checked+'>';
					vHtml += '				<label for="practice_type_use_'+nSeq+'"></label>';
					vHtml += '			</div>';
					vHtml += '		</td>';
					nSeq++;
				}
				vHtml += '		</tr>';
			}
			vHtml += '';
			vHtml += '	</tbody>';
			vHtml += '</table>';
			$("#tableList").html(vHtml);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

function form_save(){
	var $_section           = $("input[name=section]");
	var $_practice_type     = $("input[name=practice_type]");
	var $_practice_type_use = $("input[name=practice_type_use]");
	
	var section_list = Array();
	
	$_section.each(function(index) {
		var section        = $(this).val();
		var practice_type  = $_practice_type.eq(index).val();
		
		if($_practice_type_use.eq(index).is(":checked"))
		{
			var objSection = Object();
			objSection.section = section;
			objSection.practice_type = practice_type;
			section_list.push(objSection);
		}
		
	});
	console.log(section_list);
	
	var data_value = JSON.stringify(section_list);
	$.ajax({
		type : "POST",
		url : "/subject/saveSectionType.do",
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