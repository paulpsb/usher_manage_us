var section = "";
var book = "";
var volume = "";
var group = "";
var article = "";

var phrase_idx = 1;
var voca_idx = 1;
jQuery(document).ready(function(){
	var passage_id  = parseInt($("#passage_id").val());
	if(passage_id > 0)
	{
		$.ajax({
			type : "POST",
			url : "/exam/getPassage.do",
			data:{
				id:passage_id
			},
			success:function(data){
				section = cfmNvl1(data.passageInfo.section);
				book = cfmNvl1(data.passageInfo.book);
				volume = cfmNvl1(data.passageInfo.volume);
				group = cfmNvl1(data.passageInfo.group);
				article = cfmNvl1(data.passageInfo.article);
				$("#netpg_book").val(cfmNvl1(data.passageInfo.netpg_book));
				$("#netpg_jindo").val(cfmNvl1(data.passageInfo.netpg_jindo));
				
				$("#phrase_paragraph1").val(cfmZeroSpace(data.passageInfo.phrase_paragraph1));
				$("#phrase_paragraph2").val(cfmZeroSpace(data.passageInfo.phrase_paragraph2));
				$("#phrase_paragraph3").val(cfmZeroSpace(data.passageInfo.phrase_paragraph3));
				$("#phrase_paragraph4").val(cfmZeroSpace(data.passageInfo.phrase_paragraph4));
				$("#phrase_paragraph5").val(cfmZeroSpace(data.passageInfo.phrase_paragraph5));
				$("#phrase_paragraph6").val(cfmZeroSpace(data.passageInfo.phrase_paragraph6));
				$("#phrase_paragraph7").val(cfmZeroSpace(data.passageInfo.phrase_paragraph7));
				$("#phrase_paragraph8").val(cfmZeroSpace(data.passageInfo.phrase_paragraph8));
				$("#phrase_paragraph9").val(cfmZeroSpace(data.passageInfo.phrase_paragraph9));
				$("#phrase_paragraph10").val(cfmZeroSpace(data.passageInfo.phrase_paragraph10));

				$("#voca_paragraph1").val(cfmZeroSpace(data.passageInfo.voca_paragraph1));
				$("#voca_paragraph2").val(cfmZeroSpace(data.passageInfo.voca_paragraph2));
				$("#voca_paragraph3").val(cfmZeroSpace(data.passageInfo.voca_paragraph3));
				$("#voca_paragraph4").val(cfmZeroSpace(data.passageInfo.voca_paragraph4));
				$("#voca_paragraph5").val(cfmZeroSpace(data.passageInfo.voca_paragraph5));
				$("#voca_paragraph6").val(cfmZeroSpace(data.passageInfo.voca_paragraph6));
				$("#voca_paragraph7").val(cfmZeroSpace(data.passageInfo.voca_paragraph7));
				$("#voca_paragraph8").val(cfmZeroSpace(data.passageInfo.voca_paragraph8));
				$("#voca_paragraph9").val(cfmZeroSpace(data.passageInfo.voca_paragraph9));
				$("#voca_paragraph10").val(cfmZeroSpace(data.passageInfo.voca_paragraph10));
				
				var phraseList = data.phraseList;
				var vocaList = data.vocaList;
				
				var vHtml = "";
				for(var i=0; i<phraseList.length; i++){
					vHtml += '<tr id="phrase_idx_'+phrase_idx+'">';
					vHtml += "<td>";
					vHtml += '		<input type="text" class="form-control" name="phrase_paragraph[]" value="'+cfmNvl1(phraseList[i].paragraph)+'">';
					vHtml += "";
					vHtml += "</td>";
					vHtml += "<td>";
					vHtml += '		<input type="text" class="form-control" name="phrase_question_num[]" value="'+cfmNvl1(phraseList[i].question_num)+'">';
					vHtml += "";
					vHtml += "</td>";
					vHtml += "<td>";
					vHtml += '		<input type="hidden" name="phrase_id[]" value="'+cfmNvl1(phraseList[i].id)+'">';
					vHtml += '		<input type="text" class="form-control" name="phrase_spell[]" value="'+cfmNvl1(phraseList[i].spell)+'">';
					vHtml += "";
					vHtml += "</td>";
					vHtml += "<td>";
					vHtml += '		<input type="text" class="form-control" name="phrase_meaning[]" value="'+cfmNvl1(phraseList[i].meaning)+'">';
					vHtml += "";
					vHtml += "</td>";
					vHtml += "<td class='with-btn text-center' nowrap=''>";
					vHtml += '	<input type="hidden" name="phrase_delete[]" value="N">';
					vHtml += "	<button type='button' class='btn btn-sm btn-primary m-r-2' onclick='delete_phrase("+phrase_idx+")'>삭제</button>";
					vHtml += "</td>";
					vHtml += "</tr>";
					phrase_idx++;
				}
				
				$("#phrase_data_list").html(vHtml);
				
				vHtml = "";
				for(var i=0; i<vocaList.length; i++){
					vHtml += '<tr id="voca_idx_'+voca_idx+'">';
					vHtml += "<td>";
					vHtml += '		<input type="text" class="form-control" name="voca_paragraph[]" value="'+cfmNvl1(vocaList[i].paragraph)+'">';
					vHtml += "";
					vHtml += "</td>";
					vHtml += "<td>";
					vHtml += '		<input type="text" class="form-control" name="voca_question_num[]" value="'+cfmNvl1(vocaList[i].question_num)+'">';
					vHtml += "";
					vHtml += "</td>";
					vHtml += "<td>";
					vHtml += '		<input type="hidden" name="voca_id[]" value="'+cfmNvl1(vocaList[i].id)+'">';
					vHtml += '		<input type="text" class="form-control" name="voca_spell[]" value="'+cfmNvl1(vocaList[i].spell)+'">';
					vHtml += "";
					vHtml += "</td>";
					vHtml += "<td>";
					vHtml += '		<input type="text" class="form-control" name="voca_meaning[]" value="'+cfmNvl1(vocaList[i].meaning)+'">';
					vHtml += "";
					vHtml += "</td>";
					vHtml += "<td class='with-btn text-center' nowrap=''>";
					vHtml += '	<input type="hidden" name="voca_delete[]" value="N">';
					vHtml += "	<button type='button' class='btn btn-sm btn-primary m-r-2' onclick='delete_voca("+voca_idx+")'>삭제</button>";
					vHtml += "</td>";
					vHtml += "</tr>";
					voca_idx++;
				}
				
				$("#voca_data_list").html(vHtml);
				
				$('input[name^=voca_count_paragraph').change(function(e){
					create_voca();
				});	
				
				$('input[name^=phrase_count_paragraph]').change(function(e){
					create_phras();
				});	

				do_section();
				
			},
			error:function(event){				
				alert("잠시후 다시 시도 바랍니다.");
			}
		});
	}else{
		do_section();
	}
	
	//do_section();
});

function create_phras()
{
	var phrase_paragraph1 = parseInt($("#phrase_paragraph1").val());
	var phrase_paragraph2 = parseInt($("#phrase_paragraph2").val());
	var phrase_paragraph3 = parseInt($("#phrase_paragraph3").val());
	var phrase_paragraph4 = parseInt($("#phrase_paragraph4").val());
	var phrase_paragraph5 = parseInt($("#phrase_paragraph5").val());
	var phrase_paragraph6 = parseInt($("#phrase_paragraph6").val());
	var phrase_paragraph7 = parseInt($("#phrase_paragraph7").val());
	var phrase_paragraph8 = parseInt($("#phrase_paragraph8").val());
	var phrase_paragraph9 = parseInt($("#phrase_paragraph9").val());
	var phrase_paragraph10 = parseInt($("#phrase_paragraph10").val());
	
	var $el_phrase_id                = $("input[name^=phrase_id]");
	var $el_phrase_question_num      = $("input[name^=phrase_question_num]");
	var $el_phrase_paragraph         = $("input[name^=phrase_paragraph]");
	
	$el_phrase_id.each(function(index) {
		var phrase_question_num = parseInt($el_phrase_question_num.eq(index).val());
		var phrase_paragraph = "";
		if(phrase_paragraph1 >= phrase_question_num)
		{
			phrase_paragraph = "1";
		}else if(phrase_paragraph2 >= phrase_question_num){
			phrase_paragraph = "2";
		}else if(phrase_paragraph3 >= phrase_question_num){
			phrase_paragraph = "3";
		}else if(phrase_paragraph4 >= phrase_question_num){
			phrase_paragraph = "4";
		}else if(phrase_paragraph5 >= phrase_question_num){
			phrase_paragraph = "5";
		}else if(phrase_paragraph6 >= phrase_question_num){
			phrase_paragraph = "6";
		}else if(phrase_paragraph7 >= phrase_question_num){
			phrase_paragraph = "7";
		}else if(phrase_paragraph8 >= phrase_question_num){
			phrase_paragraph = "8";
		}else if(phrase_paragraph9 >= phrase_question_num){
			phrase_paragraph = "9";
		}else if(phrase_paragraph10 >= phrase_question_num){
			phrase_paragraph = "10";
		}
		$el_phrase_paragraph.eq(index).val(phrase_paragraph);
	});
}

function create_voca()
{
	var voca_paragraph1 = parseInt($("#voca_paragraph1").val());
	var voca_paragraph2 = parseInt($("#voca_paragraph2").val());
	var voca_paragraph3 = parseInt($("#voca_paragraph3").val());
	var voca_paragraph4 = parseInt($("#voca_paragraph4").val());
	var voca_paragraph5 = parseInt($("#voca_paragraph5").val());
	var voca_paragraph6 = parseInt($("#voca_paragraph6").val());
	var voca_paragraph7 = parseInt($("#voca_paragraph7").val());
	var voca_paragraph8 = parseInt($("#voca_paragraph8").val());
	var voca_paragraph9 = parseInt($("#voca_paragraph9").val());
	var voca_paragraph10 = parseInt($("#voca_paragraph10").val());
	
	var $el_voca_id                = $("input[name^=voca_id]");
	var $el_voca_question_num      = $("input[name^=voca_question_num]");
	var $el_voca_paragraph         = $("input[name^=voca_paragraph]");
	
	$el_voca_id.each(function(index) {
		var voca_question_num = parseInt($el_voca_question_num.eq(index).val());
		var voca_paragraph = "";
		if(voca_paragraph1 >= voca_question_num)
		{
			voca_paragraph = "1";
		}else if(voca_paragraph2 >= voca_question_num){
			voca_paragraph = "2";
		}else if(voca_paragraph3 >= voca_question_num){
			voca_paragraph = "3";
		}else if(voca_paragraph4 >= voca_question_num){
			voca_paragraph = "4";
		}else if(voca_paragraph5 >= voca_question_num){
			voca_paragraph = "5";
		}else if(voca_paragraph6 >= voca_question_num){
			voca_paragraph = "6";
		}else if(voca_paragraph7 >= voca_question_num){
			voca_paragraph = "7";
		}else if(voca_paragraph8 >= voca_question_num){
			voca_paragraph = "8";
		}else if(voca_paragraph9 >= voca_question_num){
			voca_paragraph = "9";
		}else if(voca_paragraph10 >= voca_question_num){
			voca_paragraph = "10";
		}
		$el_voca_paragraph.eq(index).val(voca_paragraph);
	});
}

function add_phrase()
{
	var vHtml = "";
	vHtml += '<tr id="phrase_idx_'+phrase_idx+'">';
	vHtml += "<td>";
	vHtml += '		<input type="text" class="form-control" name="phrase_paragraph[]" >';
	vHtml += "";
	vHtml += "</td>";
	vHtml += "<td>";
	vHtml += '		<input type="text" class="form-control" name="phrase_question_num[]" >';
	vHtml += "";
	vHtml += "</td>";	
	vHtml += "<td>";
	vHtml += '		<input type="hidden" name="phrase_id[]" value="0">';
	vHtml += '		<input type="text" class="form-control" name="phrase_spell[]" >';
	vHtml += "";
	vHtml += "</td>";
	vHtml += "<td>";
	vHtml += '		<input type="text" class="form-control" name="phrase_meaning[]">';
	vHtml += "";
	vHtml += "</td>";
	vHtml += "<td class='with-btn text-center' nowrap=''>";
	vHtml += '	<input type="hidden" name="phrase_delete[]" value="N">';
	vHtml += "	<button type='button' class='btn btn-sm btn-primary m-r-2' onclick='delete_phrase("+phrase_idx+")'>삭제</button>";
	vHtml += "</td>";
	vHtml += "</tr>";
	phrase_idx++;
	
	$("#phrase_data_list").append(vHtml);
}

function delete_phrase(idx)
{
	var phrase_id = $("#phrase_idx_"+idx).find("input[name^=phrase_id]").val();
	if(parseInt(phrase_id) > 0){
		$("#phrase_idx_"+idx).find("input[name^=phrase_delete]").val("Y");
		$("#phrase_idx_"+idx).hide();
	}else{
		$("#phrase_idx_"+idx).remove();
	}
}

function add_voca()
{
	var vHtml = "";
	vHtml += '<tr id="voca_idx_'+voca_idx+'">';
	vHtml += "<td>";
	vHtml += '		<input type="text" class="form-control" name="voca_paragraph[]" >';
	vHtml += "";
	vHtml += "</td>";
	vHtml += "<td>";
	vHtml += '		<input type="text" class="form-control" name="voca_question_num[]" >';
	vHtml += "";
	vHtml += "</td>";
	vHtml += "<td>";
	vHtml += '		<input type="hidden" name="voca_id[]" value="0">';
	vHtml += '		<input type="text" class="form-control" name="voca_spell[]" >';
	vHtml += "";
	vHtml += "</td>";
	vHtml += "<td>";
	vHtml += '		<input type="text" class="form-control" name="voca_meaning[]">';
	vHtml += "";
	vHtml += "</td>";
	vHtml += "<td class='with-btn text-center' nowrap=''>";
	vHtml += '	<input type="hidden" name="voca_delete[]" value="N">';
	vHtml += "	<button type='button' class='btn btn-sm btn-primary m-r-2' onclick='delete_voca("+voca_idx+")'>삭제</button>";
	vHtml += "</td>";
	vHtml += "</tr>";
	voca_idx++;
	
	$("#voca_data_list").append(vHtml);
}

function delete_voca(idx)
{
	var voca_id = $("#voca_idx_"+idx).find("input[name^=voca_id]").val();
	if(parseInt(voca_id) > 0){
		$("#voca_idx_"+idx).find("input[name^=voca_delete]").val("Y");
		$("#voca_idx_"+idx).hide();
	}else{
		$("#voca_idx_"+idx).remove();
	}
}

/*
 * 설명 : 년/월 조회
 */
function do_section()
{

	$.ajax({
		type : "POST",
		url : "/common/getProblemSectionList.do",
		data:{
			
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				var selected = "";
				if(data[i].section == section) selected = "selected";
				vHtml += "<option value='"+data[i].section+"' "+selected+">"+data[i].section+"</option>";
			}
			
			$("#section").html('<option value="">선택</option>'+vHtml);
			section = "";
			$('#section').change(function(e){
				do_book();
			});	
			do_book();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

/*
 * 설명 : 년/월 조회
 */
function do_book()
{

	$.ajax({
		type : "POST",
		url : "/common/getProblemBookList.do",
		data:{
			section:$('#section').val()
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				var selected = "";
				if(data[i].book == book) selected = "selected";
				vHtml += "<option value='"+data[i].book+"' "+selected+">"+data[i].book+"</option>";
			}
			
			$("#book").html('<option value="">선택</option>'+vHtml);
			book = "";
			$('#book').change(function(e){
				do_volume();
			});	
			do_volume();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

/*
 * 설명 : 년/월 조회
 */
function do_volume()
{

	$.ajax({
		type : "POST",
		url : "/common/getProblemVolumeList.do",
		data:{
			section:$('#section').val(),
			book:$('#book').val()
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				var selected = "";
				if(data[i].volume == volume) selected = "selected";
				
				vHtml += "<option value='"+data[i].volume+"' "+selected+">"+data[i].volume+"</option>";
			}
			
			$("#volume").html('<option value="">선택</option>'+vHtml);
			volume = "";
			$('#volume').change(function(e){
				do_group();
			});	
			do_group();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

/*
 * 설명 : 년/월 조회
 */
function do_group()
{

	$.ajax({
		type : "POST",
		url : "/common/getProblemGroupList.do",
		data:{
			section:$('#section').val(),
			book:$('#book').val(),
			volume:$('#volume').val()
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				var selected = "";
				if(data[i].group == group) selected = "selected";
				
				vHtml += "<option value='"+data[i].group+"' "+selected+">"+data[i].group+"</option>";
			}
			
			$("#group").html('<option value="">선택</option>'+vHtml);
			group = "";
			$('#group').change(function(e){
				do_article();
			});	
			do_article();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

/*
 * 설명 : 년/월 조회
 */
function do_article()
{

	$.ajax({
		type : "POST",
		url : "/common/getProblemArticleList.do",
		data:{
			section:$('#section').val(),
			book:$('#book').val(),
			volume:$('#volume').val(),
			group:$('#group').val()
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				var selected = "";
				if(data[i].article == article) selected = "selected";
				
				vHtml += "<option value='"+data[i].article+"' "+selected+">"+data[i].article+"</option>";
			}
			
			$("#article").html('<option value="">선택</option>'+vHtml);
			article = "";
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function move_form()
{
	location.href = "/exam/passage_list.do?page="+$("#v_page").val()+"&&section="+$("#v_section").val()+"&&book="+$("#v_book").val()+"&&volume="+$("#v_volume").val();
}

function save_form()
{
	var array_phrase = Array();
	var $el_phrase_id           = $("input[name^=phrase_id]");
	var $el_phrase_paragraph    = $("input[name^=phrase_paragraph]");	
	var $el_phrase_question_num = $("input[name^=phrase_question_num]");
	var $el_phrase_spell        = $("input[name^=phrase_spell]");
	var $el_phrase_meaning      = $("input[name^=phrase_meaning]");
	var $el_phrase_delete       = $("input[name^=phrase_delete]");
	    
	$el_phrase_id.each(function(index) {
		var objPhrase= Object();
		objPhrase.phrase_id = $(this).val();
		objPhrase.phrase_paragraph = cfmNullToZero($el_phrase_paragraph.eq(index).val());
		objPhrase.phrase_question_num = cfmNullToZero($el_phrase_question_num.eq(index).val());
		objPhrase.phrase_spell = $el_phrase_spell.eq(index).val();
		objPhrase.phrase_meaning = $el_phrase_meaning.eq(index).val();
		objPhrase.phrase_delete = $el_phrase_delete.eq(index).val();
		
		array_phrase.push(objPhrase);
	});
	var array_voca = Array();
	var $el_voca_id           = $("input[name^=voca_id]");
	var $el_voca_paragraph    = $("input[name^=voca_paragraph]");	
	var $el_voca_question_num = $("input[name^=voca_question_num]");
	var $el_voca_spell        = $("input[name^=voca_spell]");
	var $el_voca_meaning      = $("input[name^=voca_meaning]");
	var $el_voca_delete  = $("input[name^=voca_delete]");
	    
	$el_voca_id.each(function(index) {
		var objVoca= Object();
		objVoca.voca_id = $(this).val();
		objVoca.voca_paragraph = cfmNullToZero($el_voca_paragraph.eq(index).val());
		objVoca.voca_question_num = cfmNullToZero($el_voca_question_num.eq(index).val());
		objVoca.voca_spell = $el_voca_spell.eq(index).val();
		objVoca.voca_meaning = $el_voca_meaning.eq(index).val();
		objVoca.voca_delete = $el_voca_delete.eq(index).val();
		
		array_voca.push(objVoca);
	});


	$.ajax({
		type : "POST",
		url : "/exam/savePassage.do",
		data:{
			id:$('#passage_id').val(),
			section:$('#section').val(),
			book:$('#book').val(),
			volume:$('#volume').val(),
			group:$('#group').val(),
			article:$('#article').val(),
			netpg_book:$('#netpg_book').val(),
			netpg_jindo:$('#netpg_jindo').val(),
			data_value_phrase:JSON.stringify(array_phrase),
			data_value_voca:JSON.stringify(array_voca)
		},
		success:function(data){
			alert("저장하였습니다.");
			move_form();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});
}