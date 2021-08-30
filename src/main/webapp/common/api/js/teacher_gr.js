var teacherGR = {
		qNum: 0,
		setData: function(_rs){
			teacherGR.qData = _rs.data_list;
			teacherGR.cData = _rs.cData;
			teacherGR.aData = {};
			
			$('#text_btn').remove();
			$('#text_btn_text').remove();
			
			$('#script_btn').remove();
			$('#script_btn_text').remove();
			
			$('#reason_btn').remove();
			$('#reason_btn_text').remove();
			
			$('#tagging_btn').remove();
			$('#tagging_btn_text').remove();
			
			$('#chain_btn').remove();
			$('#chain_btn_text').remove();
			
			for(var i=0;i<_rs.answer.length;i++){
				var question_idx = _rs.answer[i]['question_idx'];
				var answer_cnt = parseInt(_rs.answer[i]['cnt']);
				var s_answer_1 = _rs.answer[i]['s_answer_1'];
				var s_answer_2 = _rs.answer[i]['s_answer_2'];
				if(!teacherGR.aData[question_idx]){
					teacherGR.aData[question_idx] = {};
				}
				if(!teacherGR.aData[question_idx]['s_answer_1']){
					teacherGR.aData[question_idx]['s_answer_1'] = {};
				}
				
				if(!teacherGR.aData[question_idx]['s_answer_1'][s_answer_1]){
					teacherGR.aData[question_idx]['s_answer_1'][s_answer_1] = answer_cnt;
				}	
				else{
					var tempCnt = parseInt(teacherGR.aData[question_idx]['s_answer_1'][s_answer_1]);
					tempCnt = tempCnt + parseInt(answer_cnt);
					teacherGR.aData[question_idx]['s_answer_1'][s_answer_1] = tempCnt;
				}

				if(!teacherGR.aData[question_idx]['s_answer_2']){
					teacherGR.aData[question_idx]['s_answer_2'] = {};
				}
				
				if(!teacherGR.aData[question_idx]['s_answer_2'][s_answer_1]){
					teacherGR.aData[question_idx]['s_answer_2'][s_answer_1] = [];
					teacherGR.aData[question_idx]['s_answer_2'][s_answer_1].push(s_answer_2);
				}
				else{
					
					teacherGR.aData[question_idx]['s_answer_2'][s_answer_1].push(s_answer_2);
				}

				
			}
			
			teacherGR.makeFirstView();
		},
		getPercent1: function(index_no, ansKey){
			var tot1 = 0;
			var ansCnt1 = 0;
			
			for(var aa in teacherGR.aData[""+index_no]){
				if(aa == 's_answer_1'){
					for(var bb in teacherGR.aData[""+index_no][aa]){
						var bb_arr = bb.split("|");
						for(var k=0;k<bb_arr.length;k++){
							tot1 += parseInt(teacherGR.aData[""+index_no]['s_answer_1'][bb]);
							if(bb_arr[k] == ansKey){
								ansCnt1 += parseInt(teacherGR.aData[""+index_no]['s_answer_1'][bb]);
							}
						}
					}
				}
			}
			var per = Math.round(ansCnt1/tot1*100);
			if(isNaN(per)){
				per = 0;
			}
			return per;
		},
		getPercentArrList: function(index_no, ansKey){
			
			var bb_arr = '';
			for(var aa in teacherGR.aData[""+index_no]){
				if(aa == 's_answer_2'){
					for(var bb in teacherGR.aData[""+index_no][aa]){
						if(bb && bb==ansKey){
							for(var i=0;i<teacherGR.aData[""+index_no][aa][bb].length;i++){
								bb_arr =bb_arr+","+teacherGR.aData[""+index_no][aa][bb][i];
							}
						}
					}
				}
			}
			if(bb_arr.charAt(0) == ','){
				bb_arr = bb_arr.substring(1,bb_arr.length);
			}
			return bb_arr;
		},
		makeFirstView: function(){

			var wrap = $('#wrap');
			var viewer1 = $('<div>', {'class': 'te_1'}).appendTo(wrap);
			
			var question_text = teacherGR.qData[teacherGR.qNum].question;
			question_text = question_text.replace(/\^/,"__________");
			var title = $('<h4>').css({textAlign: 'left'}).html(question_text).appendTo(viewer1);
			var ol1 = $('<ol>').appendTo(title);
			var ex = teacherGR.qData[teacherGR.qNum].exam;
			for(var i=0;i<ex.length;i++){
				if(ex[i]){
					var li1 = $('<li>').css({textAlign: 'left'}).html(ex[i]+" ( "+teacherGR.getPercent1(teacherGR.qData[teacherGR.qNum].index_no, ex_map[i+1])+"% ) ").appendTo(ol1);
				}
			}
			
			var pr_nx = $('<div>', {'class': 'pr_nx'}).appendTo(viewer1);
			var back_q = $('<img>').attr({src: '/fs/image/class/teacher/01.png'})
			.css({display:'block', float: 'left', width: '130px', textAlign: 'center'}).appendTo(pr_nx);
			var next_q = $('<img>').attr({src: '/fs/image/class/teacher/02.png'})
			.css({display:'block', float: 'left', width: '130px', textAlign: 'center'}).appendTo(pr_nx);
			back_q.on('click', function(){
				if(teacherGR.qNum>0){
					teacherGR.qNum--;
					teacherGR.chkList = [];
					teacherGR.chkList.push('question_btn');
					teacherGR.makeView();
				}
				else{
					alert("첫번째 문제입니다.");
				}
			});
			next_q.on('click', function(){
				if(teacherGR.qNum+1<teacherGR.qData.length){
					teacherGR.qNum++;
					teacherGR.chkList = [];
					teacherGR.chkList.push('question_btn');
					teacherGR.makeView();
				}
				else{
					alert("마지막 문제입니다.");
				}
			});
		},
		makeView: function(){
			var _this = this;
			var wrap = $('#wrap');
			wrap.empty();
			
			var viewer1 = $('<div>', {'class': 'te_1'}).appendTo(wrap);
			var m_result = teacherGR.qData[teacherGR.qNum].m_result;
			var question_text = teacherGR.qData[teacherGR.qNum].question;
			
			var title = $('<h4>').css({textAlign: 'left'}).appendTo(viewer1);
			var ol1 = $('<ol>').appendTo(title);
			var ex = teacherGR.qData[teacherGR.qNum].exam;
			function showAnswerList(obj, idx){
				obj.on('click', function(){
					$('#answerList').remove();
					var answerList = $('<div>', {'id': 'answerList'}).html("학생답 리스트 : ["+teacherGR.getPercentArrList(teacherGR.qData[teacherGR.qNum].index_no, ex_map[idx+1])+"]").appendTo(title)
				})
			}
			for(var i=0;i<ex.length;i++){
				if(ex[i]){
					var li1 = $('<li>').css({textAlign: 'left'}).html(ex[i]+" ( "+teacherGR.getPercent1(teacherGR.qData[teacherGR.qNum].index_no, ex_map[i+1])+"% ) ").appendTo(ol1);
					if(m_result){
						question_text =  question_text.replace(new RegExp(ex[i]), function($1){
							return "<span style='text-decoration:underline'>"+$1+"</span>";
						});
						showAnswerList(li1, i);
					}
				}
			}
			if(!m_result){
				question_text = question_text.replace(/\^/,"__________");
			}
			title.prepend(question_text);
			
			var pr_nx = $('<div>', {'class': 'pr_nx'}).appendTo(viewer1);
			var back_q = $('<img>').attr({src: '/fs/image/class/teacher/01.png'})
			.css({display:'block', float: 'left', width: '130px', textAlign: 'center'}).appendTo(pr_nx);
			var next_q = $('<img>').attr({src: '/fs/image/class/teacher/02.png'})
			.css({display:'block', float: 'left', width: '130px', textAlign: 'center'}).appendTo(pr_nx);
			back_q.on('click', function(){
				if(teacherGR.qNum>0){
					teacherGR.qNum--;
					teacherGR.chkList = [];
					teacherGR.chkList.push('question_btn');
					teacherGR.makeView();
				}
				else{
					alert("첫번째 문제입니다.");
				}
			});
			next_q.on('click', function(){
				if(teacherGR.qNum+1<teacherGR.qData.length){
					teacherGR.qNum++;
					teacherGR.chkList = [];
					teacherGR.chkList.push('question_btn');
					teacherGR.makeView();
				}
				else{
					alert("마지막 문제입니다.");
				}
			});
			
		}
		

}