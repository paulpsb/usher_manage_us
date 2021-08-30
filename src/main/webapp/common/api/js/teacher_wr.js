var teacherWR = {
		qNum: 0,
		setData: function(_rs){
			teacherWR.qData = _rs.data_list;
			teacherWR.cData = _rs.cData;
			teacherWR.aData = {};
			
			$('#reason_btn').remove();
			$('#reason_btn_text').remove();
			
			$('#chain_btn_text').css({width: '60px'}).text('Editing');
			
			
			teacherWR.setChkBox();
			teacherWR.makeView();
		},

		makeFirstView: function(){

			var wrap = $('#wrap');
			wrap.empty();
			var viewer1 = $('<div>', {'class': 'te_1'}).appendTo(wrap);
			var title = $('<h4>').css({textAlign: 'left', border: '1px solid #dfdfdf', padding: '10px'}).html("<span style='font-weight: bolder'>Question</span> : "+teacherWR.qData[teacherWR.qNum].essay).appendTo(viewer1);
			
			if(teacherWR.qData[teacherWR.qNum].rc){
				var div_left = $('<div>').css({marginTop: '10px', border: '1px solid #dfdfdf', padding: '10px', textAlign: 'left'}).appendTo(viewer1);
				div_left.html(teacherWR.qData[teacherWR.qNum].rc);
			}
			
			var pr_nx = $('<div>', {'class': 'pr_nx'}).appendTo(viewer1);
			var back_q = $('<img>').attr({src: '/fs/image/class/teacher/01.png'})
			.css({display:'block', float: 'left', width: '130px', textAlign: 'center'}).appendTo(pr_nx);
			var next_q = $('<img>').attr({src: '/fs/image/class/teacher/02.png'})
			.css({display:'block', float: 'left', width: '130px', textAlign: 'center'}).appendTo(pr_nx);
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
		},
		makeView: function(){
			$('#asher_player').remove();
			teacherWR.player_container = null;
			teacherWR.audio = null;
			teacherWR.top_audio = null;
			teacherWR.chkList = [];
			$('#aside').remove();
			$('.chk_box_btn').each(function(){
				if($(this).attr('flag')=='on'){
					teacherWR.chkList.push($(this).attr('id'));
				}
			});
			var wrap = $('#wrap');
			wrap.empty();
			var type = teacherWR.qData[teacherWR.qNum].type;
			var viewer1 = $('<div>', {'class': 'te_1'}).appendTo(wrap);
			
			if(type == "independent"){
				for(var i=0;i<teacherWR.chkList.length;i++){
					console.log(teacherWR.chkList[i]);
					if(teacherWR.chkList[i] == "question_btn"){
						viewer1.empty();
						var title = $('<h4>').css({textAlign: 'left', border: '1px solid #dfdfdf', padding: '10px'}).html("<span style='font-weight: bolder'>Question</span> : "+teacherWR.qData[teacherWR.qNum].essay).appendTo(viewer1);
						
					}
					else if(teacherWR.chkList[i] == "text_btn"){
						if(i==0){
							viewer1.empty();
						}
						if(teacherWR.qData[teacherWR.qNum].rc){
							var div_left = $('<div>').css({marginTop: '10px', border: '1px solid #dfdfdf', padding: '10px', textAlign: 'left'}).appendTo(viewer1);
							div_left.html(teacherWR.qData[teacherWR.qNum].rc);
						}
					}
				}
			}
			else if(type == "integrated"){
				for(var i=0;i<teacherWR.chkList.length;i++){
					console.log(teacherWR.chkList[i]);
					if(teacherWR.chkList[i] == "question_btn"){
						viewer1.empty();
						var title = $('<h4>').css({textAlign: 'left', border: '1px solid #dfdfdf', padding: '10px'}).html("<span style='font-weight: bolder'>Question</span> : "+teacherWR.qData[teacherWR.qNum].essay).appendTo(viewer1);
						
					}
					else if(teacherWR.chkList[i] == "text_btn"){
						if(i==0){
							viewer1.empty();
						}
						if(teacherWR.qData[teacherWR.qNum].rc){
							var div_left = $('<div>', {'id': 'div_left'}).css({marginTop: '10px', border: '1px solid #dfdfdf', padding: '10px', textAlign: 'left'}).appendTo(viewer1);
							div_left.html(teacherWR.qData[teacherWR.qNum].rc);
							
						}
					}
					else if(teacherWR.chkList[i] == "script_btn"){
						
						if(i==0){
							viewer1.empty();
						}
						else if(i==1){
							if(teacherWR.chkList[0] == 'question_btn'){
								var div_left = $('<div>', {'id': 'div_left'}).css({marginTop: '10px', border: '1px solid #dfdfdf', padding: '10px', textAlign: 'left'}).appendTo(viewer1);
								div_left.html(teacherWR.qData[teacherWR.qNum].rc);
								teacherWR.player_container = $('<div>', {id: 'asher_player'}).appendTo('#main_wrap');
								teacherWR.audio = {
										audioPlayer: function(file, opt, callBackF){
											if(teacherWR.top_audio){

											}
											else{
												teacherWR.top_audio = new asher_player();
												//this.top_audio.aside();
											}
											teacherWR.top_audio.init(file, opt, callBackF);
										},
										start: function(){
											var opt = {hidden: true, aside: true};
											var soundPath = "/sound/class/wr/lcfiles/";
											var soundFile = teacherWR.qData[teacherWR.qNum].sound;

											teacherWR.audio.audioPlayer(soundPath+soundFile, opt, function(){
												alert("재생 완료");
											});
										}
								}
								teacherWR.audio.start();
							}
							
						}
						else{
							$('#div_left').css({width: '48%', float: 'left', height: '570px', overflowY: 'auto'});
							var div_right = $('<div>').css({marginTop: '10px', height: '570px', overflowY: 'auto', border: '1px solid #dfdfdf', padding: '10px', textAlign: 'left', width: '48%', float: 'left'}).appendTo(viewer1);
							div_right.html(teacherWR.qData[teacherWR.qNum].rc);
							if(!teacherWR.player_container){
								
								teacherWR.player_container = $('<div>', {id: 'asher_player'}).appendTo('#main_wrap');
								teacherWR.audio = {
										audioPlayer: function(file, opt, callBackF){
											if(teacherWR.top_audio){
	
											}
											else{
												teacherWR.top_audio = new asher_player();
												//this.top_audio.aside();
											}
											teacherWR.top_audio.init(file, opt, callBackF);
										},
										start: function(){
											var opt = {hidden: true, aside: true};
											var soundPath = "/sound/class/wr/lcfiles/";
											var soundFile = teacherWR.qData[teacherWR.qNum].sound;
	
											teacherWR.audio.audioPlayer(soundPath+soundFile, opt, function(){
												alert("재생 완료");
											});
										}
								}
								teacherWR.audio.start();
							}
						}
					}
				}
			}
			
			
			
			var pr_nx = $('<div>', {'class': 'pr_nx'}).appendTo(viewer1);
			var back_q = $('<img>').attr({src: '/fs/image/class/teacher/01.png'})
			.css({display:'block', float: 'left', width: '130px', textAlign: 'center'}).appendTo(pr_nx);
			var next_q = $('<img>').attr({src: '/fs/image/class/teacher/02.png'})
			.css({display:'block', float: 'left', width: '130px', textAlign: 'center'}).appendTo(pr_nx);
			
			
			
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
		},
		makeData: function(){
			
		},
		setChkBox: function(){
			teacherWR.chkList = [];
			$('.chk_box_btn').each(function(){
				$(this).on('click', function(){
					teacherWR.chkList = [];
					$('.chk_box_btn').each(function(){
						if($(this).attr('flag')=='on'){
							teacherWR.chkList.push($(this).attr('id'));
						}
					});
					console.log(teacherWR.chkList);
					teacherWR.makeView();
				});
			});
			
		}
		

}