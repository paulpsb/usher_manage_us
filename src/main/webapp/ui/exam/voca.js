var page = 1;
var row_num = 20;
/*
 * 설명 : 화면 로딩시.
 */
jQuery(document).ready(function(){
	$('#search_book').change(function(e){
		search_day();
	});	
	search_day();
	

});

/*
 * 설명 : 년/월 조회
 */
function search_day()
{

	$.ajax({
		type : "POST",
		url : "/exam/getVocaWordDayList.do",
		data:{
			book:$('#search_book').val()
		},
		success:function(data){
			var vHtml = "";
			for(var i=0; i<data.length; i++){
				vHtml += "<option value='"+data[i].day+"'>Day "+data[i].day+"</option>";
			}
			
			$("#search_day").html(vHtml);
			$('#search_day').change(function(e){
				form_search();
			});	
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
		url : "/exam/getVocaList.do",
		data:{
			book:$("#search_book").val(),
			day:$("#search_day").val(),
			page:vPage,
			row_num:row_num
		},
		success:function(data){
			var total_count = data.vocaWordCount.total_count;
			var total_page = Math.ceil(total_count/row_num);
			
			var vocaWordList = data.vocaWordList;
			var vocaSpeechList = data.vocaSpeechList;
			
			var vHtml = "";
			for(var i=0; i<vocaWordList.length; i++){
				var array_speech_part = vocaSpeechList.filter(function(item, index){
					if(item.voca_word_id == vocaWordList[i].id){
						return true;
					}
				});
				
				var mHtml = "";
				for(var j=0; j<array_speech_part.length; j++){
					if(j > 0){
						mHtml += "<br>";
					}
					mHtml += array_speech_part[j].speech_part+". "+array_speech_part[j].meaning;
				}
				vHtml += "<tr>";
				vHtml += "<td>"+vocaWordList[i].audio_file_name+"</td>";
				vHtml += "<td>"+vocaWordList[i].spell+"</td>";
				vHtml += "<td>"+vocaWordList[i].phonetic_alphabet+"</td>";
				vHtml += "<td>"+mHtml+"</td>";
				if(vocaWordList[i].speech_difficulty == "Y"){
					vHtml += "<td class='text-center'>&nbsp;</td>";
					vHtml += "<td class='with-btn' nowrap=''>";
					vHtml += "	<button type='button' class='btn btn-sm btn-primary width-60 m-r-2' onclick='go_difficulty(\""+vocaWordList[i].id+"\",\"N\")'>아니오</a>";
					vHtml += "</td>";
				}else{
					vHtml += "<td class='with-btn' nowrap=''>";
					vHtml += "	<button type='button' class='btn btn-sm btn-primary width-60 m-r-2' onclick='go_difficulty(\""+vocaWordList[i].id+"\",\"Y\")'>예</a>";
					vHtml += "</td>";
					vHtml += "<td class='text-center'>&nbsp;</td>";
				}
				if(vocaWordList[i].speech_exception == "Y"){
					vHtml += "<td class='text-center'>&nbsp;</td>";
					vHtml += "<td class='with-btn' nowrap=''>";
					vHtml += "	<button type='button' class='btn btn-sm btn-primary width-60 m-r-2' onclick='go_Exception(\""+vocaWordList[i].id+"\",\"N\")'>아니오</a>";
					vHtml += "</td>";
				}else{
					vHtml += "<td class='with-btn' nowrap=''>";
					vHtml += "	<button type='button' class='btn btn-sm btn-primary width-60 m-r-2' onclick='go_Exception(\""+vocaWordList[i].id+"\",\"Y\")'>예</a>";
					vHtml += "</td>";
					vHtml += "<td class='text-center'>&nbsp;</td>";
				}
				vHtml += "<td class='with-btn' nowrap=''>";
				vHtml += "	<button type='button' class='btn btn-sm btn-primary width-60 m-r-2' onclick='go_detail(\""+vocaWordList[i].id+"\")'>수정</a>";
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

function go_difficulty(voca_id, speech_difficulty)
{
	$.ajax({
		type : "POST",
		url : "/exam/updateVocaWordSpeechDifficulty.do",
		data:{
			id:voca_id,
			speech_difficulty:speech_difficulty
		},
		success:function(data){
			search_list(page);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

function go_Exception(voca_id, speech_exception)
{
	$.ajax({
		type : "POST",
		url : "/exam/updateVocaWordSpeechException.do",
		data:{
			id:voca_id,
			speech_exception:speech_exception
		},
		success:function(data){
			search_list(page);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	
}

var speech_idx = 1;

function go_detail(voca_id){
	speech_idx = 1;
	$.ajax({
		type : "POST",
		url : "/exam/getVoca.do",
		data:{
			id:voca_id
		},
		success:function(data){
			var vHtml = "";
			vHtml += '<tr>';
			vHtml += '	<th class="text-center table-info">단어</th>';
			vHtml += '	<td colspan="3">'+data.vocaInfo.spell+'</td>';
			vHtml += '</tr>';
			vHtml += '<tr>';
			vHtml += '	<th class="text-center table-info">발음</th>';
			vHtml += '	<td class="text-with-form-control" colspan="3">';
			vHtml += '		<input type="hidden" id="voca_id" value="'+data.vocaInfo.id+'">';
			vHtml += '		<input type="text" class="form-control" id="phonetic_alphabet" name="phonetic_alphabet" value="'+data.vocaInfo.phonetic_alphabet+'">';
			vHtml += '	</td>';
			vHtml += '</tr>';
			vHtml += '<tr>';
			vHtml += '	<th class="text-center table-info">품사</th>';
			vHtml += '	<th class="text-center table-info">뜻</th>';
			vHtml += '	<th class="text-center table-info">동의어</th>';
			vHtml += '	<th class="text-center table-info with-btn" nowrap>';
			vHtml += '		<a href="javascript:add_speech()" class="btn btn-sm btn-primary width-60 m-r-2">뜻추가</a>';
			vHtml += '	</th>';
			vHtml += '</tr>';			
			var nCnt = data.vocaSpeechList.length;
			for(var i=0; i<nCnt; i++)
			{
				vHtml += '<tr id="sppech_idx_'+speech_idx+'">';
				vHtml += '		<input type="hidden" name="speech_id[]" value="'+data.vocaSpeechList[i].id+'">';
				vHtml += '		<td class="text-with-form-control">';
				vHtml += '			<select class="form-control" name="speech_part[]">';
				for(var j=0; j<array_speech_part.length; j++)
				{
					var selected = "";
					if(data.vocaSpeechList[i].speech_part == array_speech_part[j]) selected = "selected";
					
					vHtml += '			<option value="'+array_speech_part[j]+'" '+selected+'>'+array_speech_part[j]+'</option>';
				}
				vHtml += '		</select>';
				vHtml += '	</td>';
				vHtml += '	<td class="text-with-form-control">';
				vHtml += '		<input type="text" class="form-control" name="meaning[]" value="'+data.vocaSpeechList[i].meaning+'">';
				vHtml += '	</td>';
				vHtml += '	<td class="text-with-form-control">';
				vHtml += '		<input type="text" class="form-control" name="synonym[]" value="'+data.vocaSpeechList[i].synonym+'">';
				vHtml += '	</td>';
				vHtml += '	<td class="with-btn" nowrap>';
				vHtml += '		<input type="hidden" name="speech_delete[]" value="N">';
				vHtml += '		<button type="button" onclick="delete_speech('+speech_idx+')" class="speech_delete btn btn-sm btn-primary width-60 m-r-2">삭제</button>';
				vHtml += '	</td>';
				vHtml += '</tr>';
				speech_idx++;
			}
			$("#data_list").html(vHtml);
			$("#modal-voca").modal();
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});		
}

function add_speech()
{
	var vHtml = "";
	vHtml += '<tr id="sppech_idx_'+speech_idx+'">';
	vHtml += '		<input type="hidden" name="speech_id[]" value="0">';
	vHtml += '		<td class="text-with-form-control">';
	vHtml += '			<select class="form-control" name="speech_part[]">';
	for(var j=0; j<array_speech_part.length; j++)
	{
		vHtml += '			<option value="'+array_speech_part[j]+'">'+array_speech_part[j]+'</option>';
	}
	vHtml += '		</select>';
	vHtml += '	</td>';
	vHtml += '	<td class="text-with-form-control">';
	vHtml += '		<input type="text" class="form-control" name="meaning[]">';
	vHtml += '	</td>';
	vHtml += '		<td class="text-with-form-control">';
	vHtml += '			<input type="text" class="form-control" name="synonym[]">';
	vHtml += '		</td>';
	vHtml += '	<td class="with-btn" nowrap>';
	vHtml += '		<input type="hidden" name="speech_delete[]" value="N">';
	vHtml += '		<button type="button"  onclick="delete_speech('+speech_idx+')" class="speech_delete btn btn-sm btn-primary width-60 m-r-2">삭제</button>';
	vHtml += '	</td>';
	vHtml += '</tr>';	
	speech_idx++;
	$("#data_list").append(vHtml);
}


function delete_speech(idx)
{
	var speech_id = $("#sppech_idx_"+idx).find("input[name^=speech_id]").val();
	if(parseInt(speech_id) > 0){
		$("#sppech_idx_"+idx).find("input[name^=speech_delete]").val("Y");
		$("#sppech_idx_"+idx).hide();
	}else{
		$("#sppech_idx_"+idx).remove();
	}
}
function save_voca(){
	var array_speech = Array();
	
	 var $el_speech_id       = $("input[name^=speech_id]");
	 var $el_speech_part     = $("select[name^=speech_part]");
	 var $el_meaning         = $("input[name^=meaning]");
	 var $el_synonym         = $("input[name^=synonym]");
	 var $el_speech_delete   = $("input[name^=speech_delete]");
	    
	 $el_speech_id.each(function(index) {
		var objSpeech = Object();
		objSpeech.id = $(this).val();
		objSpeech.speech_part = $el_speech_part.eq(index).val();
		objSpeech.meaning = $el_meaning.eq(index).val();
		objSpeech.synonym = $el_synonym.eq(index).val();
		objSpeech.speech_delete = $el_speech_delete.eq(index).val();
		
		array_speech.push(objSpeech);
	});

	 $.ajax({
		type : "POST",
		url : "/exam/updateVoca.do",
		data:{
			id:$("#voca_id").val(),
			phonetic_alphabet:$("#phonetic_alphabet").val(),
			data_value:JSON.stringify(array_speech)
		},
		success:function(data){
			alert("저장하였습니다.");
			$("#modal-voca").modal("hide");
			search_list(page);
		},
		error:function(event){				
			alert("잠시후 다시 시도 바랍니다.");
		}
	});	

}