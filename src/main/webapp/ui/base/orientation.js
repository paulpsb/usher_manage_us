/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	form_search();
	
	$('#search_orientation_gubun').change(function(e){
		form_search();
	});
});

var row_seq = 1;
function form_search(){
	row_seq = 1;
	$.ajax({
		type : "POST",
		url : "/base/getOrientationList.do",
		data:{
			orientation_gubun:$("#search_orientation_gubun").val()
		},
		success:function(data){
			var vHtml = "";
			var checked = "";
			for(var i=0; i<data.length; i++){
				var selected = "";
				vHtml += '<tr>';
				vHtml += '	<td class="with-form-control">';
				vHtml += '		<select class="form-control" name="orientation_gubun">';
				
				if(data[i].orientation_gubun == "BASE") selected = "selected";
				vHtml += '			<option value="BASE" '+selected+'>학원 생활 안내</option>';
				
				selected = "";
				if(data[i].orientation_gubun == "PROGRAM") selected = "selected";
				vHtml += '			<option value="PROGRAM" '+selected+'>프로그램 안내</option>';
				vHtml += '		</select>';
				vHtml += '	</td>';
				vHtml += '	<td class="with-form-control">';
				vHtml += '		<input type="hidden" value="'+data[i].id+'" name="orientation_id" class="form-control">';
				vHtml += '		<input type="text" value="'+data[i].orientation_code+'" name="orientation_code" class="form-control">';
				vHtml += '	</td>';
				vHtml += '	<td class="with-form-control">';
				vHtml += '		<input type="text" value="'+data[i].orientation_name+'" name="orientation_name" class="form-control">';
				vHtml += '	</td>';
				vHtml += '	<td class="with-form-control">';
				vHtml += '		<input type="text" value="'+data[i].orientation_sort+'" name="orientation_sort" class="form-control">';
				vHtml += '	</td>';
				
				checked = "";
				if(data[i].senior_institute == "Y") checked = "checked";
				vHtml += '	<td class="text-center">';
				vHtml += '		<div class="switcher">';
				vHtml += '			<input type="checkbox" name="senior_institute" id="senior_institute_'+row_seq+'" value="1" '+checked+'>';
				vHtml += '			<label for="senior_institute_'+row_seq+'"></label>';
				vHtml += '		</div>';
				vHtml += '	</td>';

				checked = "";
				if(data[i].senior_chamgang == "Y") checked = "checked";
				vHtml += '	<td class="text-center">';
				vHtml += '		<div class="switcher">';
				vHtml += '			<input type="checkbox" name="senior_chamgang" id="senior_chamgang_'+row_seq+'" value="1" '+checked+'>';
				vHtml += '			<label for="senior_chamgang_'+row_seq+'"></label>';
				vHtml += '		</div>';
				vHtml += '	</td>';
				
				checked = "";
				if(data[i].junior_institute == "Y") checked = "checked";
				vHtml += '	<td class="text-center">';
				vHtml += '		<div class="switcher">';
				vHtml += '			<input type="checkbox" name="junior_institute" id="junior_institute_'+row_seq+'" value="1" '+checked+'>';
				vHtml += '			<label for="junior_institute_'+row_seq+'"></label>';
				vHtml += '		</div>';
				vHtml += '	</td>';

				checked = "";
				if(data[i].junior_chamgang == "Y") checked = "checked";
				vHtml += '	<td class="text-center">';
				vHtml += '		<div class="switcher">';
				vHtml += '			<input type="checkbox" name="junior_chamgang" id="junior_chamgang_'+row_seq+'" value="1" '+checked+'>';
				vHtml += '			<label for="junior_chamgang_'+row_seq+'"></label>';
				vHtml += '		</div>';
				vHtml += '	</td>';
				
				checked = "";
				if(data[i].junior_special_institute == "Y") checked = "checked";
				vHtml += '	<td class="text-center">';
				vHtml += '		<div class="switcher">';
				vHtml += '			<input type="checkbox" name="junior_special_institute" id="junior_special_institute_'+row_seq+'" value="1" '+checked+'>';
				vHtml += '			<label for="junior__specialinstitute_'+row_seq+'"></label>';
				vHtml += '		</div>';
				vHtml += '	</td>';

				checked = "";
				if(data[i].junior_special_chamgang == "Y") checked = "checked";
				vHtml += '	<td class="text-center">';
				vHtml += '		<div class="switcher">';
				vHtml += '			<input type="checkbox" name="junior_special_chamgang" id="junior_special_chamgang_'+row_seq+'" value="1" '+checked+'>';
				vHtml += '			<label for="junior_special_chamgang_'+row_seq+'"></label>';
				vHtml += '		</div>';
				vHtml += '	</td>';				
				
				vHtml += '	<td class="with-form-control">';
				vHtml += '		<input type="text" value="'+data[i].orientation_video_time+'" name="orientation_video_time" class="form-control">';
				vHtml += '	</td>';

				
				
				checked = "";
				if(data[i].use_yn == "Y") checked = "checked";
				vHtml += '	<td class="text-center">';
				vHtml += '		<div class="switcher">';
				vHtml += '			<input type="checkbox" name="use_yn" id="use_yn_'+row_seq+'" value="1" '+checked+'>';
				vHtml += '			<label for="use_yn_'+row_seq+'"></label>';
				vHtml += '		</div>';
				vHtml += '	</td>';
				
				vHtml += '	<td>&nbsp;</td>';
				vHtml += '</tr>';
				row_seq++;
			}
			
			$("#data_list").html(vHtml);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

function form_add(){
	var vHtml = "";
	vHtml += '<tr>';
	vHtml += '	<td class="with-form-control">';
	vHtml += '		<select class="form-control" name="orientation_gubun">';
	var selected = "";
	if($("#search_orientation_gubun").val() == "BASE") selected = "selected";
	vHtml += '			<option value="BASE" '+selected+'>학원 생활 안내</option>';
	
	selected = "";
	if($("#search_orientation_gubun").val() == "PROGRAM") selected = "selected";
	vHtml += '			<option value="PROGRAM" '+selected+'>프로그램 안내</option>';
	vHtml += '		</select>';
	vHtml += '	</td>';	
	vHtml += '	<td class="with-form-control">';
	vHtml += '		<input type="hidden" value="0" name="orientation_id" class="form-control">';
	vHtml += '		<input type="text" value="" name="orientation_code" class="form-control">';
	vHtml += '	</td>';
	vHtml += '	<td class="with-form-control">';
	vHtml += '		<input type="text" value="" name="orientation_name" class="form-control">';
	vHtml += '	</td>';
	vHtml += '	<td class="with-form-control">';
	vHtml += '		<input type="text" value="" name="orientation_sort" class="form-control">';
	vHtml += '	</td>';
	
	vHtml += '	<td class="text-center">';
	vHtml += '		<div class="switcher">';
	vHtml += '			<input type="checkbox" name="senior_institute" id="senior_institute_'+row_seq+'" value="1" checked>';
	vHtml += '			<label for="senior_institute_'+row_seq+'"></label>';
	vHtml += '		</div>';
	vHtml += '	</td>';

	vHtml += '	<td class="text-center">';
	vHtml += '		<div class="switcher">';
	vHtml += '			<input type="checkbox" name="senior_chamgang" id="senior_chamgang_'+row_seq+'" value="1" checked>';
	vHtml += '			<label for="senior_chamgang_'+row_seq+'"></label>';
	vHtml += '		</div>';
	vHtml += '	</td>';
	
	vHtml += '	<td class="text-center">';
	vHtml += '		<div class="switcher">';
	vHtml += '			<input type="checkbox" name="junior_institute" id="junior_institute_'+row_seq+'" value="1" checked>';
	vHtml += '			<label for="junior_institute_'+row_seq+'"></label>';
	vHtml += '		</div>';
	vHtml += '	</td>';

	vHtml += '	<td class="text-center">';
	vHtml += '		<div class="switcher">';
	vHtml += '			<input type="checkbox" name="junior_chamgang" id="junior_chamgang_'+row_seq+'" value="1" checked>';
	vHtml += '			<label for="junior_chamgang_'+row_seq+'"></label>';
	vHtml += '		</div>';
	vHtml += '	</td>';
	
	vHtml += '	<td class="text-center">';
	vHtml += '		<div class="switcher">';
	vHtml += '			<input type="checkbox" name="junior_special_institute" id="junior_special_institute_'+row_seq+'" value="1" checked>';
	vHtml += '			<label for="junior__specialinstitute_'+row_seq+'"></label>';
	vHtml += '		</div>';
	vHtml += '	</td>';

	vHtml += '	<td class="text-center">';
	vHtml += '		<div class="switcher">';
	vHtml += '			<input type="checkbox" name="junior_special_chamgang" id="junior_special_chamgang_'+row_seq+'" value="1" checked>';
	vHtml += '			<label for="junior_special_chamgang_'+row_seq+'"></label>';
	vHtml += '		</div>';
	vHtml += '	</td>';				
	
	vHtml += '	<td class="with-form-control">';
	vHtml += '		<input type="text" name="orientation_video_time" id="orientation_video_time" class="form-control">';
	vHtml += '	</td>';
	
	vHtml += '	<td class="text-center">';
	vHtml += '		<div class="switcher">';
	vHtml += '			<input type="checkbox" name="use_yn" id="use_yn_'+row_seq+'" value="1" checked>';
	vHtml += '			<label for="use_yn_'+row_seq+'"></label>';
	vHtml += '		</div>';
	vHtml += '	</td>';
	
	vHtml += '	<td><a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-danger remove_section"><i class="fa fa-times"></i></a></td>';
	vHtml += '</tr>';	
	$("#data_list").append(vHtml);
	
	$('.remove_section').click(function(e){
		$(this).closest("tr").remove();
	});
	row_seq++;
}

function form_save(){
	var $_orientation_id   = $("input[name=orientation_id]");
	var $_orientation_code = $("input[name=orientation_code]");
	var $_orientation_name = $("input[name=orientation_name]");
	var $_orientation_sort = $("input[name=orientation_sort]");
	var $_senior_institute = $("input[name=senior_institute]");
	var $_senior_chamgang  = $("input[name=senior_chamgang]");
	var $_junior_institute = $("input[name=junior_institute]");
	var $_junior_chamgang  = $("input[name=junior_chamgang]");
	var $_junior_special_institute = $("input[name=junior_special_institute]");
	var $_junior_special_chamgang  = $("input[name=junior_special_chamgang]");
	var $_orientation_gubun      = $("select[name=orientation_gubun]");
	var $_orientation_video_time      = $("input[name=orientation_video_time]");
	var $_use_yn      = $("input[name=use_yn]");
	
	var orientation_list = Array();
	
	$_orientation_id.each(function(index) {
		var orientation_id      = $(this).val();
		var orientation_code    = $_orientation_code.eq(index).val();
		var orientation_name    = $_orientation_name.eq(index).val();
		var orientation_sort    = $_orientation_sort.eq(index).val();
		var orientation_gubun   = $_orientation_gubun.eq(index).val();
		var orientation_video_time = $_orientation_video_time.eq(index).val();
		var objOrientaion = Object();
		objOrientaion.orientation_id    = orientation_id;
		objOrientaion.orientation_code  = orientation_code;
		objOrientaion.orientation_name  = orientation_name;
		objOrientaion.orientation_sort  = orientation_sort;
		objOrientaion.orientation_gubun = orientation_gubun;
		objOrientaion.orientation_video_time = orientation_video_time;
		
		if($_senior_institute.eq(index).is(":checked"))
		{
			objOrientaion.senior_institute = "Y";
		}else{
			objOrientaion.senior_institute = "N";
		}
		
		if($_senior_chamgang.eq(index).is(":checked"))
		{
			objOrientaion.senior_chamgang = "Y";
		}else{
			objOrientaion.senior_chamgang = "N";
		}

		if($_junior_institute.eq(index).is(":checked"))
		{
			objOrientaion.junior_institute = "Y";
		}else{
			objOrientaion.junior_institute = "N";
		}

		if($_junior_chamgang.eq(index).is(":checked"))
		{
			objOrientaion.junior_chamgang = "Y";
		}else{
			objOrientaion.junior_chamgang = "N";
		}

		if($_junior_special_institute.eq(index).is(":checked"))
		{
			objOrientaion.junior_special_institute = "Y";
		}else{
			objOrientaion.junior_special_institute = "N";
		}

		if($_junior_special_chamgang.eq(index).is(":checked"))
		{
			objOrientaion.junior_special_chamgang = "Y";
		}else{
			objOrientaion.junior_special_chamgang = "N";
		}
		
		if($_use_yn.eq(index).is(":checked"))
		{
			objOrientaion.use_yn = "Y";
		}else{
			objOrientaion.use_yn = "N";
		}
		
		orientation_list.push(objOrientaion);
	});
	console.log(orientation_list);
	var data_value = JSON.stringify(orientation_list);
	$.ajax({
		type : "POST",
		url : "/base/saveOrientation.do",
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
