var teacherWR = {
		qNum: 0,
		setData: function(_rs){
			teacherWR.qData = _rs.data_list;
			teacherWR.cData = _rs.cData;
			teacherWR.aData = {};
			
			
			teacherWR.makeFirstView();
		},

		makeFirstView: function(){

			var wrap = $('#wrap');
			var viewer1 = $('<div>', {'class': 'te_1'}).appendTo(wrap);
			var title = $('<h4>').css({textAlign: 'left'}).html(teacherWR.qData[teacherWR.qNum].question).appendTo(viewer1);
			var ol1 = $('<ol>').appendTo(title);

			
			var pr_nx = $('<div>', {'class': 'pr_nx'}).appendTo(viewer1);
			var back_q = $('<a>', {'class':'back_q'}).html("이전문제보기").appendTo(pr_nx);
			var next_q = $('<a>', {'class':'next_q'}).html("다음문제보기").appendTo(pr_nx);
			back_q.on('click', function(){
				if(teacherWR.qNum>0){
					teacherWR.qNum--;
					teacherWR.chkList = [];
					teacherWR.chkList.push('question_btn');
					teacherWR.makeView();
				}
				else{
					alert("첫번째 문제입니다.");
				}
			});
			next_q.on('click', function(){
				if(teacherWR.qNum+1<teacherWR.qData.length){
					teacherWR.qNum++;
					teacherWR.chkList = [];
					teacherWR.chkList.push('question_btn');
					teacherWR.makeView();
				}
				else{
					alert("마지막 문제입니다.");
				}
			});
			
			
		}
		

}