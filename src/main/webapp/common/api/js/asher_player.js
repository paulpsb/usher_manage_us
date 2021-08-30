

var asher_player = function(){};

asher_player.prototype.init = function(soundFile, opt, callBackF){
	this.setSoundList(soundFile);
	this.skipSw = false;
	var txt1 = (opt && opt.txt1)?opt.txt1:'';
	var txt2 = (opt && opt.txt2)?opt.txt2:'';
	
	this.hidden = false;
	if(opt && opt.hidden === true){
		this.hidden = true;
	}
	if(opt && opt.aside){
		console.log(this);
		this.aside();
	}
	else{
		this.playbar = opt.playbar || undefined;
	}
	
	if(opt && opt.autoStart){
		this.autoStart = true;
	}
	else{
		this.autoStart = false;
	}
	if(txt1 && txt2){
		this.contents = txt1;
		this.arrTxt = txt1.split("\n"); 
		for(var i=0;i<this.arrTxt.length;i++){
			this.arrTxt[i] = this.arrTxt[i].replace(/\<\/sync\>/g, "");
		}
		this.contents2 = txt2;
		this.arrTxt2 = txt2.split("\n");
		for(var a=0;a<this.arrTxt2.length;a++){
			this.arrTxt2[a] = this.arrTxt2[a].replace(new RegExp(String.fromCharCode(13), 'g'), "");
		}
	}
	if(opt && opt.script){
		this.script = true;
	}
	else{
		this.script = false;
	}
	if(opt && opt.q_idx){
		this.q_idx = opt.q_idx;
	}
	else{
		this.q_idx = false;
	}
	
	this.callBackF = callBackF;	
	
	this.sTime = 0;
	this.eTime = 999999;
	this.repeatSw = false;
	this.letterSw = false;
	this.re = (opt && opt.re)?opt.re:null;
	
	this.drawPlayer();
	this.setSpeed();
	if(this.jPlayer){
		this.startPlayer();
	}
	else{
		this.makePlayer();
	}
	//this.repeatCnt = 0;
	
	//if(txt1 & txt2){
	if(opt.mode && opt.mode == 'LC'){ 
		this.tagging();
	}
	//}

};
asher_player.prototype.continuePlayer = function(){
	this.jPlayer.jPlayer("play");
};
asher_player.prototype.stopPlayer = function(){
	this.jPlayer.jPlayer("stop");
};
asher_player.prototype.pausePlayer = function(){
	this.jPlayer.jPlayer("pause");
};
asher_player.prototype.startPlayer = function(){
	//console.log(this.soundList);
	var _this = this;
	this.jPlayer.jPlayer("setMedia", {
		mp3: _this.soundList[0].mp3
    }).jPlayer('play');
	//this.jPlayer.jPlayer("destory");
};
asher_player.prototype.destroy = function(){
	
	this.jPlayer.jPlayer("destory");
};
asher_player.prototype.aside = function(){
	var _this = this;
	this.aside = $('<div>', {'id':'aside', 'class':'lc_aside'});
	$('#header').after(this.aside);
	
	var control = $('<div>',{'class': 'control'}).appendTo(this.aside);
	var a1 = $('<a>').css({fontSize: '18px', top: '-4px',height: '26px'}).html("&#9654;").appendTo(control);
	a1.on('click', function(){
		_this.continuePlayer();
	});
	var a2 = $('<a>').css({top: '-1px'}).html("&#9609;").appendTo(control);
	a2.on('click', function(){
		_this.stopPlayer();
	});
	var a3 = $('<a>').appendTo(control);
	a3.on('click', function(){
		_this.pausePlayer();
	});
	var a3_img = $('<img>').attr({src: '/fs/image/class/lc/sound_btn_1.png'}).appendTo(a3);
	
	var span_playing = $("<span>").html('playing').appendTo(this.aside);
	var control_bar = $("<div>", {'class': 'control_bar'}).css({width: '270px'}).appendTo(this.aside);
	var play_bar = $('<div>', {'class':'play_bar'}).appendTo(control_bar);
	var all1 = $('<div>', {'class': 'all'}).appendTo(play_bar);
	var playing1 = $('<div>',{'class': 'playing'}).html("<span></span>").appendTo(play_bar);
	var span_time = $('<span>',{'class': 'time'}).css({display: 'none'}).html("0").appendTo(this.aside);
	var span_speed = $('<span>').html("Speed").appendTo(this.aside);
	var version = $("<input type='text' disabled>").val("1.0").appendTo(this.aside);
	
	
	var a4 = $('<a>', {'class': 'input_btn'}).html("&#9650;").appendTo(this.aside);
	/*
	 * this.rangeText.val(this.speedRange.val());
	this.speed = this.rangeText.val();
	if(this.jPlayer){
		this.jPlayer.jPlayer({playbackRate: this.speed});
	}
	 */
	a4.on('click', function(){
		var speed = parseFloat(version.val());
		if(speed<7){
			speed = speed+0.1
			_this.speed = speed;
			version.val(speed.toFixed(1));
			if(_this.jPlayer){
				_this.jPlayer.jPlayer({playbackRate: _this.speed});
			}
		}
	});
	
	var a5 = $('<a>', {'class': 'input_btn'}).html("&#9660;").appendTo(this.aside);
	a5.on('click', function(){
		var speed = parseFloat(version.val());
		if(speed>0.3){
			speed = speed-0.1
			_this.speed = speed;
			version.val(speed.toFixed(1));
			if(_this.jPlayer){
				_this.jPlayer.jPlayer({playbackRate: _this.speed});
			}
		}
	});
	
	
	var span_repeat = $('<span>', {'class':'pdl_10'}).css({display: 'none'}).html("Repeat").appendTo(this.aside);
	this.repeatText = $('<input type="text" disabled>').css({display: 'none'}).val(3).appendTo(this.aside);
	
	var btn1 = $('<a>', {'class': 'input_btn'}).css({cursor: 'pointer'}).css({display: 'none'}).html("&#9664;").appendTo(this.aside);
	btn1.on('click', function(){
		var tmp_cnt = parseInt(_this.repeatText.val());
		if(tmp_cnt>0){
			tmp_cnt--;
		}
		_this.repeatText.val(tmp_cnt);
		this.repeatCnt = tmp_cnt;
	})
	var btn2 = $('<a>', {'class': 'input_btn'}).css({cursor: 'pointer'}).css({display: 'none'}).html("&#9654;").appendTo(this.aside);
	btn2.on('click', function(){
		var tmp_cnt = parseInt(_this.repeatText.val());
		if(tmp_cnt<10){
			tmp_cnt++;
		}
		_this.repeatText.val(tmp_cnt);
		this.repeatCnt = tmp_cnt;
	})
	this.repeatCnt = parseInt(this.repeatText.val());
	var range_repeat_span = $('<span>', {'class': 'pd1_10'}).html("구간반복").css({display: 'none'}).appendTo(range_repeat_span);
	var control_bar2 = $('<div>', {'class': 'control_bar'}).css({width: '200px',display: 'none'}).appendTo(this.aside);
	var play_bar2 = $('<div>', {'class': 'play_bar'}).css({display: 'none'}).appendTo(control_bar2);
	var all2 = $('<div>', {'class': 'all'}).css({display: 'none'}).appendTo(play_bar2);
	var playing2 = $('<div>', {'class': 'playing'}).css({display: 'none'}).html("<span></span>").appendTo(play_bar2);
	
	var span_time2 = $('<span>',{'class': 'time'}).css({display: 'none'}).html("00:00").appendTo(this.aside);
	var a6 = $('<a>', {'class': 'btn'}).html("S").css({cursor: 'pointer',display: 'none'}).appendTo(this.aside);
	a6.on('click', function(){
		_this.skip('s');
	})
	var a7 = $('<a>', {'class': 'btn'}).html("E").css({cursor: 'pointer',display: 'none'}).appendTo(this.aside);
	a7.on('click', function(){
		console.log(_this.sTime);
		_this.skip('e');
	})
	var a8 = $('<a>', {'class': 'btn'}).html("C").css({cursor: 'pointer',display: 'none'}).appendTo(this.aside);
	a8.on('click', function(){
		_this.repeatCancel();
	})
	var mute = $('<a>', {'class': 'mute'}).appendTo(this.aside);
	var mute_img = $('<img>').attr({'src': '/fs/image/class/lc/sound_btn_2.png'}).appendTo(mute);
	
	var control_bar3 = $('<div>', {'class': 'control_bar'}).css({width: '120px'}).appendTo(this.aside);
	var play_bar3 = $('<div>', {'class': 'play_bar'}).appendTo(control_bar3);
	var all3 = $('<div>', {'class': 'all'}).appendTo(play_bar3);
	
	var playing3 = $('<div>', {'class': ''})
	.css({width: '80%', position: 'absolute', left: '-2%', backgroundColor: '#24afb2', height: '10px', top: '5px', borderRadius: '10px', padding: '0 2px'})
	.appendTo(play_bar3);
	var volumeSpan = $('<span>').css({float: 'right', position: 'relative', display: 'block', height: '15px', width: '15px', backgroundColor: '#666', borderRadius: '20px', top: '-3px', cursor: 'pointer', padding: '0px', right: '-5px'})
	.appendTo(playing3);
	//this.jPlayer.jPlayer("");
	
	all1.on('click', function(e){
		var left = e.offsetX;
		var per = left/249*100;
		playing1.css({width: per+'%'});
		playing2.css({width: per+'%'});
		_this.jPlayer.jPlayer('stop');
		_this.jPlayer.jPlayer("playHead", per);
		_this.jPlayer.jPlayer("play");
	});
	playing1.on('click', function(e){
		var left = e.offsetX;
		var per = left/249*100;
		if(per>100){
			per = 100;
		}
		playing1.css({width: per+'%'});
		playing2.css({width: per+'%'});
		_this.jPlayer.jPlayer('stop');
		_this.jPlayer.jPlayer("playHead", per);
		_this.jPlayer.jPlayer("play");
	});
	
	all2.on('click', function(e){
		var left = e.offsetX;
		var per = left/176*100;
		playing1.css({width: per+'%'});
		playing2.css({width: per+'%'});
		_this.jPlayer.jPlayer('stop');
		_this.jPlayer.jPlayer("playHead", per);
		_this.jPlayer.jPlayer("play");
	});
	playing2.on('click', function(e){
		var left = e.offsetX;
		var per = left/176*100;
		if(per>100){
			per = 100;
		}
		playing1.css({width: per+'%'});
		playing2.css({width: per+'%'});
		_this.jPlayer.jPlayer('stop');
		_this.jPlayer.jPlayer("playHead", per);
		_this.jPlayer.jPlayer("play");
	});
	
	
	
	all3.on('click', function(e){
		var left = e.offsetX;
		var per = left/93*100;
		playing3.css({width: per+'%'})
		_this.jPlayer.jPlayer("volume", per/100);
	});
	playing3.on('click', function(e){
		var left = e.offsetX;
		var per = left/93*100;
		if(per>100){
			per = 100;
		}
		playing3.css({width: per+'%'})
		
		_this.jPlayer.jPlayer("volume", per/100);
	});
	this.playbar = $('.playing');
	this.topPos = 0;
};
asher_player.prototype.setSoundList = function(soundFile){
	//this.soundList = soundList;
	//
	var path = "/fs";
	this.soundList = [{mp3: path+soundFile}];
	console.log(this.soundList);
	//this.soundList = [{mp3: "/fs/sound/class/lc/question/tpo/TPO_10_LC_1_1.mp3"}];
	//this.soundList = [{mp3: "/fs/sound/class/sp/lcfiles/1339074927184_3-00 Vending Machines.mp3"}];
	
};
asher_player.prototype.drawPlayer = function(){
	var _this = this;
	var playerWrap = $('#asher_player');
	if(this.hidden){
		playerWrap.css({display: 'none'});
	}
	else{
		playerWrap.css({display: 'block'});
	}
	var player = $('<div>', {'id': 'jquery_jplayer_1'}).appendTo(playerWrap);
	var container = $('<div>', {'id': 'jp_container_1'}).appendTo(playerWrap);
	
	var btn_start = $('<div>', {'class': 'jp-play'}).html("PLAY").appendTo(container);
	var btn_pause = $('<div>', {'class': 'jp-pause'}).html("PAUSE").appendTo(container);
	var btn_stop = $('<div>', {'class': 'jp-stop'}).html("STOP").appendTo(container);
	var btn_stop = $('<div>', {'class': 'jp-seek-bar'}).html("STOP").appendTo(container);
	var range_wrap = $('<div>', {'class': 'jp-range_wrap'}).appendTo(container);
	this.speedRange = $('<input type="range" min="0.3" max="2.5" step="0.1">').val(1).on('change', function(){
		_this.setSpeed(this);
	}).appendTo(range_wrap);
	this.rangeText = $('<input type="text" disabled>').val(1).appendTo(range_wrap)
	var repeat_wrap = $('<div>', {'class': 'jp-range_wrap'}).appendTo(container);
	this.repeatRange = $('<input type="range" min="0" max="10" step="1">').val(0).on('change', function(){
		//_this.setRepeat(this);
	}).appendTo(repeat_wrap);
//	/this.repeatText = $('<input type="text" disabled>').val(0).appendTo(repeat_wrap);
	
	this.testBtn = $('<button>').html("구간반복 시작").on('click', function(){
		_this.repeat();
	}).appendTo(container);
	this.testBtn = $('<button>').html("구간반복 해제").on('click', function(){
		_this.repeatCancel();
	}).appendTo(container);
	this.skipBtn = $('<button>').html("시작 설정").on('click', function(){
		_this.skip('s');
	}).appendTo(container);
	this.skipBtn = $('<button>').html("종료 설정").on('click', function(){
		_this.skip('e');
		_this.skipSw = true;
	}).appendTo(container);
	
	this.skipBtn = $('<button>').html("Tagging").on('click', function(){
		_this.tagging();
	}).appendTo(container);

	if(this.contents){
		var val = '';
		for(var a=0;a<this.arrTxt2.length;a++){
			val = val+(this.arrTxt2[a]+" ");
		}
		
		//this.txtArea = $('<textarea disabled>').css({width: '700px', height: '500px', overflowX: 'hidden', overflowY: 'scroll'}).val(val).appendTo($('#viewer'));
		this.txtArea = $('#paragraph');
		console.log(this.txtArea);
		//this.txtArea.on('select', function(){
			//_this.getSelect();
		//});
		this.txtArea.on('mouseup', function(){
			_this.getSelect();
		});
		var mouseDown = $('body').on('mousedown', function(e){
			console.log(_this.skipSw);
			_this.repeatCancel();
			//if(!_this.skipSw)_this.repeatCancel();
		});
	}
};
asher_player.prototype.putSelect = function(){
	var _this = this;
	this.txtArea = $('#paragraph');
	console.log(this.txtArea);
	//this.txtArea.on('select', function(){
		//_this.getSelect();
	//});
	this.txtArea.on('mouseup', function(){
		_this.getSelect();
	});
	var mouseDown = $('body').on('mousedown', function(){
		_this.repeatCancel();
		//if(!_this.skipSw)_this.repeatCancel();
	});
}
asher_player.prototype.getSelect = function(){
	this.skipSw = false;
	var caretOffset = 0;
	var element = this.txtArea[0];
    var doc = element.ownerDocument || element.document;
    var win = doc.defaultView || doc.parentWindow;
    var sel;
    var range;
    if (typeof win.getSelection != "undefined") {
        sel = win.getSelection();
        if (sel.rangeCount > 0) {
            range = win.getSelection().getRangeAt(0);
            var preCaretRange = range.cloneRange();
            preCaretRange.selectNodeContents(element);
            preCaretRange.setEnd(range.endContainer, range.endOffset);
            caretOffset = preCaretRange.toString().length;
        }
    }
    if(range.toString().length<2 || range.toString() == ""){
    	return false;
    }
    var field = this.txtArea;
	var startPos = parseInt(caretOffset)-parseInt(range.toString().length);
	var endPos = parseInt(caretOffset);
	var field_value = field.text();
	var start_tmp_pos = 0;
	var end_tmp_pos = 0;
	while(true){
		if(field_value.substring(startPos-start_tmp_pos, startPos-(start_tmp_pos+1)) == " " || startPos-start_tmp_pos<1){
			break;
		}
		else{
			start_tmp_pos++;
		}
		if(startPos-start_tmp_pos<1){
			break;
		}
	}
	while(true){
		if(field_value.substring(endPos+end_tmp_pos, endPos+(end_tmp_pos+1)) == " " || endPos+end_tmp_pos>field_value.length){
			endPos = endPos+end_tmp_pos+1;
			break;
		}
		else{
			end_tmp_pos++;
		}
		if(end_tmp_pos> field_value.length){
			break;
		}
	}
	
	startPos = startPos-start_tmp_pos;
	
	if(field_value == '' || field_value == null || field_value == undefined){
		return false;
	} 
	var selectedText = field_value.substring(startPos,endPos);
	selectedText = shine.util.trim(selectedText);
	if(selectedText.length < 5){
		alert("5글자 이상 선택하세요");
		return false;
	}
	var selArr = selectedText.split(" ");
	var startIdx = 0;
	var s_idx = 0;
	var e_idx = 0;
	var endIdx = 0;
	var check = false;
	
	var loopx =0;
	console.log(this.arrTxt2);
	while(!check){
		for(var i=startIdx;i<this.arrTxt.length;i++){
			var str_pos1 = this.arrTxt[i].indexOf(">");
			var compare_txt = this.arrTxt[i].substring(str_pos1+1);
			compare_txt = shine.util.trim(compare_txt);
			
			if(compare_txt == shine.util.trim(selArr[0])){
				console.log(compare_txt);
				startIdx = i;
				break;
			}
		}
		var cnt = 0;
		console.log(selArr.length)
		for(var x=0;x<selArr.length;x++){
			
			console.log(selArr.length+ "|||"+(x+startIdx)+"||||| arrTxt2:["+this.arrTxt2[x+startIdx]+"] ||| selArr:["+selArr[cnt]+"]")
			if(this.arrTxt2[x+startIdx] == selArr[cnt]){
				cnt++;
				continue;
			}
			break;
		}
		loopx++;
		if(loopx > 2000){
			break;
		}
		console.log("cnt:"+cnt+" ||| length:"+selArr.length)
		if(cnt == selArr.length){
			endIdx = selArr.length+startIdx;
			check = true;
		}
		else{
			startIdx++;
		}
	}
	
	if(check){
		
		var ed_idx1 = this.arrTxt[startIdx].indexOf("\\\'>");
		var txt1 = this.arrTxt[startIdx].substring(16,ed_idx1-2);
		
		var ed_idx2 = this.arrTxt[endIdx].indexOf("\\\'>");
		var txt2 = this.arrTxt[endIdx].substring(16,ed_idx2-2);
		
		this.sTime = parseFloat(txt1);
		this.eTime = parseFloat(txt2);
		
		this.jPlayer.jPlayer("stop");
		this.jPlayer.jPlayer("play", this.sTime);
		this.repeatSw = true;
		
	}  
	
	/*
	var field = this.txtArea;
	var startPos = field[0].selectionStart;
	var endPos = field[0].selectionEnd;
	var field_value = field.val();
	var start_tmp_pos = 0;
	var end_tmp_pos = 0;
	while(true){
		if(field_value.substring(startPos-start_tmp_pos, startPos-(start_tmp_pos+1)) == " " || startPos-start_tmp_pos<1){
			break;
		}
		else{
			start_tmp_pos++;
		}
		if(startPos-start_tmp_pos<1){
			break;
		}
	}
	while(true){
		if(field_value.substring(endPos+end_tmp_pos, endPos+(end_tmp_pos+1)) == " " || endPos+end_tmp_pos>field_value.length){
			endPos = endPos+end_tmp_pos+1;
			break;
		}
		else{
			end_tmp_pos++;
		}
		if(end_tmp_pos> field_value.length){
			break;
		}
	}
	
	startPos = startPos-start_tmp_pos;
	
	if(field_value == '' || field_value == null || field_value == undefined){
		return false;
	} 
	var selectedText = field_value.substring(startPos,endPos);
	selectedText = shine.util.trim(selectedText);
	if(selectedText.length < 5){
		alert("5글자 이상 선택하세요");
		return false;
	}
	var selArr = selectedText.split(" ");
	var startIdx = 0;
	var s_idx = 0;
	var e_idx = 0;
	var endIdx = 0;
	var check = false;
	
	var loopx =0;
	console.log(this.arrTxt2);
	while(!check){
		for(var i=startIdx;i<this.arrTxt.length;i++){
			var str_pos1 = this.arrTxt[i].indexOf(">");
			var compare_txt = this.arrTxt[i].substring(str_pos1+1);
			compare_txt = shine.util.trim(compare_txt);
			
			if(compare_txt == shine.util.trim(selArr[0])){
				console.log(compare_txt);
				startIdx = i;
				break;
			}
		}
		var cnt = 0;
		console.log(selArr.length)
		for(var x=0;x<selArr.length;x++){
			
			console.log(selArr.length+ "|||"+(x+startIdx)+"||||| arrTxt2:["+this.arrTxt2[x+startIdx]+"] ||| selArr:["+selArr[cnt]+"]")
			if(this.arrTxt2[x+startIdx] == selArr[cnt]){
				cnt++;
				continue;
			}
			break;
		}
		loopx++;
		if(loopx > 2000){
			break;
		}
		console.log("cnt:"+cnt+" ||| length:"+selArr.length)
		if(cnt == selArr.length){
			endIdx = selArr.length+startIdx;
			check = true;
		}
		else{
			startIdx++;
		}
	}
	
	if(check){
		
		var ed_idx1 = this.arrTxt[startIdx].indexOf("\\\'>");
		var txt1 = this.arrTxt[startIdx].substring(16,ed_idx1-2);
		
		var ed_idx2 = this.arrTxt[endIdx].indexOf("\\\'>");
		var txt2 = this.arrTxt[endIdx].substring(16,ed_idx2-2);
		
		this.sTime = parseFloat(txt1);
		this.eTime = parseFloat(txt2);
		
		this.jPlayer.jPlayer("stop");
		this.jPlayer.jPlayer("play", this.sTime);
		this.repeatSw = true;
		
	}
	*/
	
}
asher_player.prototype.repeatCancel = function(){
	this.sTime = 0;
	this.eTime = 999999;
};
asher_player.prototype.tagging = function(){
	var _this = this;
	var t_s_time = null;
	var t_e_time = null;
	$('body').on('keydown', function(e){
		var __this = this;
		//console.log(e.keyCode);
		if(e.keyCode == 32 && t_s_time==null){
		//if(e.keyCode == 32){
			t_s_time = _this.jPlayer.data('jPlayer').status.currentTime;
			if(_this.playbar){
				//_this.playbar.css({width: _this.seekPercent+'%'});
				if(_this.re){
					var chk_depth =_this.playbar.parent();
					var chk_point = $('<span>', {'class': 'chk_point'}).css({'left': _this.seek_percent+'%'}).html("<!-- &#9751; --><span></span>").appendTo(chk_depth);
					
				}
			}
		}
		else{
			return false;
		}
		
	});
	
	$('body').on('keyup', function(e2){
		
		var __this = this;
		if(e2.keyCode == 32 && t_e_time==null && t_s_time){
			t_e_time = _this.jPlayer.data('jPlayer').status.currentTime;
			var s_a = 0;
			var s_g = false;
			var e_a = 0;
			var e_g = false;
			var str = '';
			//console.log("length : "+_this.arrTxt.length);
			for(var i=0;i<_this.arrTxt.length;i++){
				//console.log("arr: "+i);
				var ed_idx1 = _this.arrTxt[i].indexOf("\\\'>");
				var txt1 = _this.arrTxt[i].substring(16,ed_idx1-2);
				var g_time = parseFloat(txt1);
				console.log("g_time : "+g_time)
				console.log("t_s_time : "+t_s_time)
				console.log("t_e_time : "+t_e_time)
				if(g_time>=t_s_time && !s_g){
					s_a = i
					s_g = true
				}
				if(g_time>=t_e_time && !e_g){
					e_a = i;
					e_g = true;
					break;
				}
			}
			console.log("s_a:"+s_a);
			console.log("e_a:"+e_a);
			for(var i=s_a;i<=e_a;i++){
				if(i==e_a){
					str = str+_this.arrTxt2[i];
				}
				else{
					str = str+_this.arrTxt2[i]+" ";
				}
			}
			
			//var str = ''; // 임시
			
			var q_data = {};
			
			var param = {
					startIdx: s_a,
					endIdx: e_a,
					str1: str,
					q_idx: _this.q_idx,
					type1: "LC",
					type2: "T"
			}
			
			function taggingCallBack(_rs){
				if(_rs.error == API_SUCCESS){
					
					return false;
				}
			}
			requestApi('POST', apiList('tagging'), param, taggingCallBack);
			//console.log(str);
			
			t_e_time = null;
			t_s_time = null;
		}
		else{
			return false;
		}
	});
	
	/*
	if(this.contents){
		var t_time = this.jPlayer.data('jPlayer').status.currentTime;
		var q_data = {};
		var param = {
				startIdx: startPos,
				endIdx: endPos,
				str1: selectedText,
				type1: "LC",
				type2: t_type
		}
		
		function taggingCallBack(_rs){
			if(_rs.error == API_SUCCESS){
				_this.airCommand.remove();
				return false;
			}
		}
		requestApi('POST', apiList('tagging'), param, taggingCallBack);
	}
	*/
	
}
asher_player.prototype.skip = function(sw){
	console.log("skip:: "+sw)
	if(sw == 's'){
		this.sTime = this.jPlayer.data('jPlayer').status.currentTime;
		console.log(this.sTime);
	}
	if(sw == 'e'){
		this.eTime = this.jPlayer.data('jPlayer').status.currentTime;
	}
			
	if(this.eTime && this.eTime <= this.sTime){
		this.sTime = 0;
		this.eTime = 999999;
	}
	else{
		if(sw == 'e'){
			console.log(this.sTime);
			console.log(this.eTime);
			this.repeat();
		}
	}
}
asher_player.prototype.repeat = function(){
	var _this = this;
	
	if(this.sTime && this.eTime){
		
		this.jPlayer.jPlayer("stop");
		this.jPlayer.jPlayer("play", this.sTime);
		this.repeatSw = true;
	}
}
asher_player.prototype.setSpeed = function(){
	
	this.rangeText.val(this.speedRange.val());
	this.speed = this.rangeText.val();
	if(this.jPlayer){
		//this.jPlayer.jPlayer({playbackRate: this.speed});
		this.jPlayer.jPlayer({playbackRate: 3});
	}
	
};
asher_player.prototype.setRepeat = function(){
	
	//this.repeatText.val(this.repeatRange.val());
	//this.repeatCnt = this.repeatText.val();
};
asher_player.prototype.doEnd = function(){
	
	if(this.repeatSw){
		
		this.jPlayer.jPlayer("stop");
		this.jPlayer.jPlayer("play", this.sTime);
	}
	else if(this.repeatCnt>0){
		
		this.repeatCnt--;
		
		
		//this.repeatRange.val(this.repeatCnt);
		this.repeatText.val(this.repeatCnt);
		if(this.jPlayer){
			this.jPlayer.jPlayer("play");
		}
	}
	else if(this.callBackF){
		this.destroy();
		this.callBackF();
	}
	else{
		this.destory();
	}
	
};
asher_player.prototype.setPlayBar = function(seekPercent){
	if(this.playbar){
		this.playbar.css({width: seekPercent+'%'});
		if(this.re){
			
			
		}
	}
	
},
asher_player.prototype.makeSyncList = function(){
	this.syncArr = [];
	var _this = this;
	for(var i=0;i<this.arrTxt.length;i++){
		
		var ed_idx1 = this.arrTxt[i].indexOf("\\\'>");
		var txt1 = this.arrTxt[i].substring(16,ed_idx1-2);
		var g_time = txt1;
		this.syncArr.push(g_time);
		this.syncSw = true;
	}
	
	
	var param = {
			type1: 'LC',
			q_idx: 'TPO_1_LC_1'
	};
	function getTaggingCallBack(_rs){
		if(_rs.error == API_SUCCESS){
			_this.taggingList = _rs.data.data_list;
			
		}
		
	}
	requestApi('POST', apiList('getTagging'), param, getTaggingCallBack);
	
},
asher_player.prototype.checkTaggingCnt = function(idx){
	
	var cnt = 0;
	var _this = this;
	for(var i=0;i<_this.taggingList.length;i++){
		var st= parseInt(_this.taggingList[i].startIdx);
		var et= parseInt(_this.taggingList[i].endIdx);
		//console.log("out!!! s : ["+st+"], e : ["+et+"], idx: ["+idx+"], cnt : ["+cnt+"]");
		if((st <= parseInt(idx)) && (et >= parseInt(idx))){
			
			cnt++;
			//console.log("in!!! s : ["+st+"], e : ["+et+"], idx: ["+idx+"], cnt : ["+cnt+"]");
		}
	}
	var color = "none";
	if(cnt>6){
		color = "#e6a0a0";
	}
	else if(cnt>3){
		color = "#F4E1BC";
	}
	else if(cnt>0){
		color = "#CFE6A1";
	}
	
	return color;
	
},
asher_player.prototype.getSync = function(t){
	
	var tmp = '';
	var _this = this;
	if(this.syncSw){
		this.syncSw = false;
		
		for(var i=0;_this.syncArr.length;i++){
			var sy = parseFloat(_this.syncArr[i]);
			var t = parseFloat(t);
			if(t>sy){
				var sy =sy.toFixed(2);
				tmp = sy.replace(/\./g, "");
				if($('.class_'+tmp).css('color')!='black'){
					$('.class_'+tmp).css({color: 'black'});
					$('#script_wrap2').find($('.class_'+tmp)).css({backgroundColor: _this.checkTaggingCnt(i)});
					$('#script_wrap3').find($('.class_'+tmp)).css({backgroundColor: _this.checkTaggingCnt(i)});
				}
				
			}
			else{
				break;
			}
		}
		
		if(tmp){
			var top = $('.class_'+tmp).offset().top
			if(_this.topPos<top){
				
				_this.topPos = top;
				$('.script_wrap').scrollTop(_this.topPos-185);
			}
			tmp = '';
		}
		_this.syncSw = true;
	}
},
asher_player.prototype.makePlayer = function(){
	var _this = this;
	if(_this.script){
		this.makeSyncList();
	}
	//_this.getSync();
	console.log(_this.soundList[0].mp3);
	
	var progressCount = 0;
	this.jPlayer = $("#jquery_jplayer_1").jPlayer({
		ready: function(){
			if(_this.autoStart){
				$(this).jPlayer("setMedia", {
					mp3: _this.soundList[0].mp3
			    }).jPlayer('play');
			}
			else{
				$(this).jPlayer("setMedia", {
					mp3: _this.soundList[0].mp3
			    });
			}
		},
		timeupdate: function(event){
			//console.log(event.jPlayer.status.currentPercentRelative);
			_this.seek_percent = (event.jPlayer.status.currentPercentRelative);
			_this.setPlayBar(_this.seek_percent)
			_this.getTime = (event.jPlayer.status.currentTime);
			if(_this.script){_this.getSync(_this.getTime);}
				
			if(event.jPlayer.status.currentTime > _this.eTime && _this.repeatSw){
				$(this).jPlayer('stop');
				_this.doEnd();
			}
		},
		
		
		supplied: "mp3",
		minPlaybackRate: 0.5,
		maxPlaybackRate: 2.5,
		ended: function(){
			if(!_this.repeatSw){_this.doEnd();}
		},
		cssSelectorAncestor: "#jp_container_1",
		smoothPlayBar: true,
		keyEnabled: true,
        remainingDuration: true,
        toggleDuration: true,
        seeked: function(d){
        	
        }
	});
};
asher_player.prototype.getContents = function(fileName){
	
}