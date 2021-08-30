$(document).ready(function(){

});
String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/gi, "");
}
var ex_map = {'1':'A','2':'B','3':'C','4':'D','5':'E','6':'F','7':'G','8':'H','9':'I'};
var API_SUCCESS = 'S000001';
var API_FAIL = 'E000001';
function requestApi(/*String*/_method, /*String*/_uri, /*Object*/_data, /*function*/_callback)
{
	$.ajax({
	    type: _method,
	    url: location.protocol+"//"+location.host + '/api/async/' + _uri,
	    data: _data,
	    beforeSend: function(request) {
	        request.setRequestHeader('Accept', 'application/json');
	        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	    },
	    success: function(data, textStatus, jqXHR) {
	    	if((typeof(_callback)).toLowerCase() == 'function') {
	    		_callback(data);
	    	}
	    },
	    error: function(jqXHR, textStatus, errorThrown) {}
	});

}

function apiList(name){
	var list = {
			rc: 'rc.php',
			lc: 'lc.php',
			sp: 'sp.php',
			wr: 'wr.php',
			getc: 'getc.php',
			lc_2: 'lc_2.php',
			rcAnswerInsert: 'rcAnswerInsert.php',
			lcAnswerInsert: 'lcAnswerInsert.php',
			grAnswerInsert: 'grAnswerInsert.php',
			rcCheckAnswer: 'rcCheckAnswer.php',
			tagging: 'tagging.php',
			taggingQ: 'taggingQ.php',
			rcResult2: 'rcResult2.php',
			grResult: 'grResult.php',
			rcResult: 'rcResult.php',
			lcResult: 'lcResult.php',
			rcTagging: 'rcTagging.php',
			rcNext: 'rcNext.php',
			examVocaChkReq: 'examVocaChkReq.php',
			getTagging: 'getTagging.php',
			studyList: 'study_list.php',
			'class': 'class.php',
			gr: 'gr.php',
			getChainMeta:'getChainMeta.php',
			classInfo: 'classInfo.php',
			uploadPhoto: 'uploadPhoto.php',
			dic: 'dic.php',
			
			rcIdiom: 'rcIdiom.php',
			
			getTest: 'getTest.php',
			getTestVC: 'getTestVC.php',
			getTestJS: 'getTestJS.php',
			getTestBJ: 'getTestBJ.php',
			getTestBK: 'getTestBK.php',
			getTestMA: 'getTestMA.php',
			getTestGD: 'getTestGD.php',
			getTestHS: 'getTestHS.php',
			getTestCC: 'getTestCC.php',
			
			testBJ: 'testBJ.php',
			testBK: 'testBK.php',
			testMA: 'testMA.php',
			testGD: 'testGD.php',
			testHS: 'testHS.php',
			testCC: 'testCC.php',
			
			insertTestJS: 'insertTestJS.php',
			insertTestBJ: 'insertTestBJ.php',
			insertTestBK: 'insertTestBK.php',
			insertTestMA: 'insertTestMA.php',
			insertTestGD: 'insertTestGD.php',
			insertTestHS: 'insertTestHS.php',
			insertTestCC: 'insertTestCC.php',
			
			insertTestJSAnswer: 'insertTestJSAnswer.php',
			insertTestBJAnswer: 'insertTestBJAnswer.php',
			insertTestBKAnswer: 'insertTestBKAnswer.php',
			insertTestMAAnswer: 'insertTestMAAnswer.php',
			insertTestGDAnswer: 'insertTestGDAnswer.php',
			insertTestHSAnswer: 'insertTestHSAnswer.php',
			insertTestCCAnswer: 'insertTestCCAnswer.php',
			
			resultTestJS: 'resultTestJS.php',
			resultTestBJ: 'resultTestBJ.php',
			resultTestBK: 'resultTestBK.php',
			resultTestMA: 'resultTestMA.php',
			resultTestGD: 'resultTestGD.php',
			resultTestHS: 'resultTestHS.php',
			resultTestCC: 'resultTestCC.php',
			
			getTestVCData: 'getTestVCData.php',
			getTestBKData: 'getTestBKData.php',
			
			insertTestVCData: 'insertTestVCData.php',
			
			insertTestVCScore: 'insertTestVCScore.php',
			insertTestMAScore: 'insertTestMAScore.php',
			insertTestGDScore: 'insertTestGDScore.php',
			insertTestBKScore: 'insertTestBKScore.php',
			
			updateTestVCData: 'updateTestVCData.php',
			updateTestBKData: 'updateTestBKData.php',
			
			
			getTestVCResult: 'getTestVCResult.php',
			getTestGDResult: 'getTestGDResult.php',
			getTestMAResult: 'getTestMAResult.php',
			getTestBKResult: 'getTestBKResult.php',
			sendVCReq: 'sendVCReq.php',
			
			insertBookData: 'insertBookData.php'
			
			
	};
	if(list[name]){
		return list[name];
	}
	else{
		alert("해당 페이지를 찾을수 없습니다.");
		return;
	}
}
function pageMove(page, pageOpt){
	var url = location.protocol+"//"+location.host;
	if(pageOpt){
		location.href = url+page;
	}
	else{
		location.href = url+pageList(page);
	}

}

function pageSubmit(page, frm, method, enctype){
	if(enctype){
		frm.attr({enctype: enctype});
	}
	var url = location.protocol+"//"+location.host;
	url = url+pageList(page);
	method = method || 'GET';
	frm.attr({action: url, method: method}).submit();
}
function pageList(page){

	var data = {
		home: "/",
		wordExamAction: '/student/action/wordExamAction.php',
		wordExamAction2: '/student/action/wordExamAction2.php',
		word: '/student/exam/word.php',
		word2: '/student/exam/word2.php',
		wordreview: '/student/exam/wordreview.php',
		wordreview2: '/student/exam/wordreview2.php',
		wordresult: '/student/exam/word_result.php',
		wordresult2: '/student/exam/word_result2.php',
		idiom: '/student/exam/idiom.php',
		idiomExamAction: '/student/action/idiomExamAction.php',
		idiomresult: '/student/exam/idiom_result.php',
		interpret: '/student/exam/interpret.php',
		interpretExamAction: '/student/action/interpretExamAction.php',
		interpretresult: '/student/exam/interpret_result.php',
		blankExamAction: '/student/action/blankExamAction.php',
	 	wrstep1: '/student/exam/wr_step_1.php',
	 	wrstep2: '/student/exam/wr_step_2.php',
	 	wrstep3: '/student/exam/wr_step_3.php',
		wrExamAction: '/student/action/wrExamAction.php',
		wrchoose: '/student/exam/wr_choose.php',
		wrintro1: '/student/exam/wr_intro_1.php',
		wrintro2: '/student/exam/wr_intro_2.php',
	 	spstep1: '/student/exam/sp_step_1.php',
	 	spstep2: '/student/exam/sp_step_2.php',
	 	spstep3: '/student/exam/sp_step_3.php',
		spExamAction: '/student/action/spExamAction.php',
		spchoose: '/student/exam/sp_choose.php',
		spintro1: '/student/exam/sp_intro_1.php',
		chainExamAction: '/student/action/chainExamAction.php',
		rcResult: '/student/class/rc_result.php',


	};
	if(data[page]){
		return data[page];
	}
	else{
		alert("해당 페이지를 찾을수 없습니다.");
		return;
	}
}

function getPaging(cur_page, total_size , rows){
	var cur_page = parseInt(cur_page);
	var total_size = parseInt(total_size);
	var rows = parseInt(rows);
	var row = rows || 10;

	var page_list_max = 5;

	var total_page = Math.ceil(total_size/row);
	var retValue = '<div class="paging subpaging"><ul class="pageLst clear">';
	var prev_page = cur_page-1;
	var next_page = cur_page+1;
	if(cur_page > 1){
		retValue += " <li class=\"prev\" onclick=\"setNewPage("+prev_page+");\"><a style='cursor: pointer;'> &lt; Prev</a></li> ";
	}

	var start_page = ( ( Math.floor( (cur_page - 1 ) / page_list_max ) ) * page_list_max ) + 1;
	var end_page	= start_page + (page_list_max-1);

	if(end_page >= total_page) end_page = total_page;
	if(total_page >= 1){
		for(var k=start_page;k<=end_page;k++){
			if(cur_page != k){ retValue += " <li onclick=\"setNewPage("+k+");\"><a style='cursor: pointer;'>"+k+"</a></li> "; }
			else{ retValue += " <li class=\"on\"><a>"+k+"</a></li> "; }
		}
	}


	if(cur_page < total_page){
		retValue += " <li class=\"next\" onclick=\"setNewPage("+next_page+");\"><a style='cursor: pointer;'>Next &gt; </a></li> ";
	}
	retValue += '</ul></div>';

	return retValue;

}
function setNewPage(page){
	var url = location.protocol+"//"+location.host+location.pathname;
	$("#frm_paging input[name$='page']").val(page);
	$("#frm_paging").attr({method: 'GET', action: url}).submit();
}

function centerTrim(str, strcut1, strcut2){
	var stridx = 0;
	var no_roop = 0;
	while(true){
		no_roop++;
		var a = str.indexOf(strcut1, stridx);
		if(a!=-1){
			var b = str.indexOf(strcut2, stridx);
			str = str.substr(0,(a+1))+str.substr(b);
			stridx = a+2;
		}
		else{
			break;
		}
		if(no_roop>3000){break;}
	}
	return str;
}

function regExp(str){  
	var regExp = /[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\(\=]/gi;
	if(str){
		str = str.replace(regExp, "");
	}
	return str;
}
function compactTrim(str){
	if(str){
		str = str.replace(/(\s*)/g,""); 
	}
	return str;
}








