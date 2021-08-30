var asher_canvas = function(){};
asher_canvas.prototype.getCanvas = function(color){
	if(color){
		this.backColor = color
	}
	this.draw();
	this.cStep = -1;
	this.lastX = undefined;
	this.lastY = undefined;
	this.sqrS = {X: '', Y: ''};
	this.stroke = {color: "#000000", width: 5};
	this.mousePointer= {x: undefined, y: undefined}; 
	this.lHeight= 30;
	this.canvasOffset = $('#canvas').offset();
	this.offset = {X:this.canvasOffset.left, Y: this.canvasOffset.top};
	//console.log(this.offset);
	this.isMouseDown = false;
	
	this.cPushArray = new Array();
	this.mode="pen";
	this.chgLine($("#linewidth"));
    this.setPaint();
    this.setBtnAction();
}

asher_canvas.prototype.draw = function(){
	/*
	 * font-family: Arial, Helvetica, sans-serif, 'Nanum Gothic'
	 */
	var _this = this;
	var body = $('<div>', {'id':'canvas_wrap'}).css({position: 'absolute', left: '0px', top: '80px', zIndex: 1000}).appendTo("#contents");
	
	var pen_type = $('<div>', {'class': 'pen_type', 'id':'pallet'}).css({zIndex: 10000, left: '200px', top: '100px'}).appendTo($('body'));
	var pentype_top = $('<div>', {'class': 'top'}).appendTo(pen_type);
	var pentype_top_a = $('<a>').html('X').css({cursor: 'pointer'}).appendTo(pentype_top);
	pentype_top_a.on('click', function(){
		pen_type.remove();
	});
	
	
	
	var select_pen = $('<div>', {'class': 'select_pen'}).appendTo(pen_type);
	//var select_pen_a1 = $('<a>', {'class': 'left'}).html("‹ ").appendTo(select_pen);
	var pen_type_div = $('<div>').appendTo(select_pen)
	var pen_type_div_a1 = $('<a>').appendTo(pen_type_div);
	var pen_type_div_a1_img = $('<img>', {'id':'pen'}).attr({src: '/fs/image/class/teacher/pen_1.jpg'}).appendTo(pen_type_div_a1);
	
	var pen_type_div_a2 = $('<a>').appendTo(pen_type_div);
	var pen_type_div_a2_img = $('<img>', {'id':'marker'}).attr({src: '/fs/image/class/teacher/pen2.jpg'}).appendTo(pen_type_div_a2);
	var pen_type_div_a3 = $('<a>').appendTo(pen_type_div);
	var pen_type_div_a3_img = $('<img>', {'id':'eraser'}).attr({src: '/fs/image/class/teacher/era.jpg'}).appendTo(pen_type_div_a3);
	var pen_type_div_a4 = $('<a>').appendTo(pen_type_div);
	var pen_type_div_a4_img = $('<img>', {'id': 'undo'}).attr({src: '/fs/image/class/teacher/back.jpg'}).appendTo(pen_type_div_a4);
	var pen_type_div_a5 = $('<a>').appendTo(pen_type_div);
	var pen_type_div_a5_img = $('<img>', {'id': 'redo'}).attr({src: '/fs/image/class/teacher/front.jpg'}).appendTo(pen_type_div_a5);
	
	var pen_type_div_a6 = $('<a>').css({backgroundColor: '#fff'}).appendTo(pen_type_div);
	var pen_type_div_a6_img = $('<img>', {'id': 'reset'}).attr({src: '/fs/image/class/teacher/reset.png'}).appendTo(pen_type_div_a6);
	
	var pen_type_div_a7 = $('<a>').css({backgroundColor: '#fff'}).appendTo(pen_type_div);
	var pen_type_div_a7_img = $('<img>', {'id': 'export'}).attr({src: '/fs/image/class/teacher/save_as.png'}).appendTo(pen_type_div_a7);
	
	
	//var select_pen_a1 = $('<a>', {'class': 'right'}).html("›").appendTo(select_pen);
	
	var lineWidth = $('<input id="linewidth" type="range" min="5" max="20" step="1">').css({verticalAlign: 'middle', marginTop: '5px', marginLeft: '5px', border: '1px solid'}).val(5).on('change', function(){
		_this.chgLine(this);
	}).appendTo(pen_type_div);
	lineWidth.on('mousedown', function(e){
		e.stopPropagation();
		alert(this.val());
	});
	var penthick = $('<canvas>', {'id': "penthick"}).attr({width: '30', height: '30'}).css({border: '1px solid', verticalAlign: 'middle', marginTop: '5px', marginLeft: '5px'}).appendTo(pen_type_div);
	
	
	var sel_color = $('<div>', {'class': 'pen_type sel_color', 'id':'pallet2'}).css({display: 'none',zIndex: 10000, left: '200px', top: '200px'}).appendTo(body);
	var sel_color_top = $('<div>', {'class': 'top'}).appendTo(sel_color);
	var sel_color_top_a = $('<a>').html("X").css({cursor: 'pointer'}).appendTo(sel_color_top);
	sel_color_top_a.on('click', function(){
		sel_color.css({display: 'none'});
	});
	var sel_color_select_pen = $('<div>', {'class': 'select_pen'}).appendTo(sel_color);
	//var sel_color_select_pen_a = $('<a>', {'class': 'left'}).html("&#8249;").appendTo(sel_color_select_pen);
	var sel_color_div = $('<div>').appendTo(sel_color_select_pen);
	var sel_color_div_a1 = $('<a>', {'class':'color_1 penColor'}).appendTo(sel_color_div);
	sel_color_div_a1.on('click', function(){
		sel_color.css({display: 'none'});
	});
	var sel_color_div_a2 = $('<a>', {'class':'color_2 penColor'}).appendTo(sel_color_div);
	sel_color_div_a2.on('click', function(){
		sel_color.css({display: 'none'});
	});
	var sel_color_div_a3 = $('<a>', {'class':'color_3 penColor'}).appendTo(sel_color_div);
	sel_color_div_a3.on('click', function(){
		sel_color.css({display: 'none'});
	});
	var sel_color_div_a4 = $('<a>', {'class':'color_4 penColor'}).appendTo(sel_color_div);
	sel_color_div_a4.on('click', function(){
		sel_color.css({display: 'none'});
	});
	var sel_color_div_a5 = $('<a>', {'class':'color_5 penColor'}).appendTo(sel_color_div);
	sel_color_div_a5.on('click', function(){
		sel_color.css({display: 'none'});
	});
	var sel_color_div_a6 = $('<a>', {'class':'color_6 penColor'}).appendTo(sel_color_div);
	sel_color_div_a6.on('click', function(){
		sel_color.css({display: 'none'});
	});
	var sel_color_div_a7 = $('<a>', {'class':'color_7 penColor'}).appendTo(sel_color_div);
	sel_color_div_a7.on('click', function(){
		sel_color.css({display: 'none'});
	});
	var sel_color_div_a8 = $('<a>', {'class':'color_8 penColor'}).appendTo(sel_color_div);
	sel_color_div_a8.on('click', function(){
		sel_color.css({display: 'none'});
	});
	var sel_color_div_a9 = $('<a>', {'class':'color_9 penColor'}).appendTo(sel_color_div);
	sel_color_div_a9.on('click', function(){
		sel_color.css({display: 'none'});
	});
	var sel_color_div_a10 = $('<a>', {'class':'color_10 penColor'}).appendTo(sel_color_div);
	sel_color_div_a10.on('click', function(){
		sel_color.css({display: 'none'});
	});
	var sel_color_div_a11 = $('<a>', {'class': 'penColor'}).css({backgroundColor: '#fff200'}).appendTo(sel_color_div);
	sel_color_div_a11.on('click', function(){
		sel_color.css({display: 'none'});
	});
	//var sel_color_select_pen_a = $('<a>', {'class': 'right'}).html("&#8250;").appendTo(sel_color_select_pen);
	
	
	pen_type_div_a1_img.on('click', function(){
		sel_color.css({display: 'block'});
	});
	pen_type_div_a2_img.on('click', function(){
		sel_color.css({display: 'block'});
	});
	
	var canvas_wrap = $('<div>', {id: 'nk'}).css({overflowY: 'auto', overflowX: 'hidden', position: 'relative', width: '1920px', height: '817px'}).appendTo(body);
	var canvas_bg = $('<canvas>', {id: "backgrounds"}).attr({width: '1880', height: '795'})
		.css({opacity: 0, left:'0px', top: '0px', border: '1px solid #999999', cursor: 'crosshair', margin: '10px', position: 'absolute', zIndex: '0', backgroundColor: '#ffffff'})
		.appendTo(canvas_wrap);
	
	if(this.backColor){
		canvas_bg.css({backgroundColor: this.backColor, opacity: 1});
	}
	this.canvas = $('<canvas>', {id: "canvas"}).attr({width: '1880', height: '795'})
	.css({left:'0px', top: '0px', border: '1px solid #999999', cursor: 'crosshair', margin: '10px', position: 'absolute', zIndex: '1'})
	.appendTo(canvas_wrap);
	this.ctx = this.canvas[0].getContext('2d');
	
	
	this.text = "";

	
	this.txts = this.text.split('\n');
	
	closeBtn = $('<a>', {'id': 'closeXBtn'}).html("&#10005;").css({position: 'absolute', left: '1870px', top: '15px', zIndex: 200000, cursor: 'pointer'}).appendTo(canvas_wrap);
	closeBtn.on('click', function(){
		$('#canvas_wrap').remove();
		$('#pallet').remove();
		$('#pallet2').remove();
	});
    
	
	var img_L = 0;
	var img_T = 0;
	var targetObj;

	function getLeft(o){
		var rv = 0;
		if(o.style.left){
			rv =parseInt(o.style.left.replace('px', ''));
		}
	    return rv;
	}
	function getTop(o){
		var rv = 0;
		if(o.style.top){
			rv =parseInt(o.style.top.replace('px', ''));
		}
	    return rv;
	}

	function moveDrag(e){
	     var e_obj = window.event? window.event : e;
	     var dmvx = parseInt(e_obj.clientX + img_L);
	     var dmvy = parseInt(e_obj.clientY + img_T);
	     targetObj.style.left = dmvx +"px";
	     targetObj.style.top = dmvy +"px";
	     return false;
	}

	function startDrag(e, obj){
		e.stopPropagation();
	     targetObj = obj;
	     var e_obj = window.event? window.event : e;
	     img_L = getLeft(obj) - e_obj.clientX;
	     img_T = getTop(obj) - e_obj.clientY;
	     document.onmousemove = moveDrag;
	     document.onmouseup = stopDrag;
	     if(e_obj.preventDefault)e_obj.preventDefault(); 
	}

	// 드래그 멈추기
	function stopDrag(){
	     document.onmousemove = null;
	     document.onmouseup = null;
	}
	pen_type.on('mousedown', function(){
		startDrag(event, this);		
	});
	sel_color.on('mousedown', function(){
		startDrag(event, this);
	});
}
asher_canvas.prototype.cPush = function(){
	 this.cStep++;
	 if(this.cStep < this.cPushArray.length){
		 this.cPushArray.length = this.cStep;
	 }
	 this.cPushArray.push($('#canvas')[0].toDataURL());
	 console.log(this.cPushArray);
}
asher_canvas.prototype.chgFontsize = function(val){
	
	var fontHeight = $(val).val();
	$("#backgrounds").css({fontSize: fontHeight+"px", lineHeight: (fontHeight*2)+"px"});
	this.setPaint();
}
asher_canvas.prototype.chgLine = function(val){
	this.stroke.width = $(val).val();
	var penthick=$("#penthick");
	var ctxpen=penthick[0].getContext("2d");
	ctxpen.clearRect(0, 0,$("#penthick").width() , $("#penthick").height());
	
	ctxpen.beginPath();
	ctxpen.globalCompositeOperation="source-over";
	ctxpen.fillStyle = this.stroke.color;
	
	ctxpen.arc(15,15,this.stroke.width/2,0,Math.PI*2,false);
	ctxpen.fill();
}
asher_canvas.prototype.setPaint = function(){
	var b_canvas = $("#backgrounds");
	var b_ctx = b_canvas[0].getContext('2d');
	b_ctx.clearRect(0, 0,$("#backgrounds").width() , $("#backgrounds").height());
	
	b_ctx.font = $('#text_size').val()+'px Ariel';
	
	var line = 0;
	for(var s in this.txts){
		//b_ctx.fillText(this.txts[s], 10, line+=50);
	}
}
asher_canvas.prototype.handleMouseDown = function(e){
	 this.mousePointer.X=parseInt(e.clientX-this.offset.X)-1;
     this.mousePointer.Y=parseInt(e.clientY+document.getElementById('nk').scrollTop-this.offset.Y);
     // Put your mousedown stuff here
     this.lastX=this.mousePointer.X;
     this.lastY=this.mousePointer.Y;
     if(this.mode == 'marker' && this.sqrS.X == '' && this.sqrS.Y==''){
    	 this.sqrS.X = this.lastX;
    	 this.sqrS.Y = this.lastY;
     }
     this.isMouseDown=true;
}

asher_canvas.prototype.handleMouseUp = function(e){
	this.mousePointer.X=parseInt(e.clientX-this.offset.X)-1;
    this.mousePointer.Y=parseInt(e.clientY+document.getElementById('nk').scrollTop-this.offset.Y);

    // Put your mouseup stuff here
		if(this.mode=="marker"){
			this.ctx.globalAlpha = 0.25;
			this.ctx.beginPath();
			this.ctx.globalCompositeOperation="source-over";
			
			this.ctx.fillStyle = this.stroke.color;
			var aa = this.mousePointer.X - this.sqrS.X;
			var bb = this.mousePointer.Y - this.sqrS.Y;
			if(aa<10){
				aa=15;
				this.sqrS.X = this.sqrS.X - 10;
			}
			if(bb<10){
				bb = 15;
				this.sqrS.Y = this.sqrS.Y - 10;
			}
			this.ctx.fillRect(this.sqrS.X, this.sqrS.Y, aa, bb);
			this.sqrS.X='';
			this.sqrS.Y='';
			this.ctx.globalAlpha = 1;
		//ctx.fill();
		}
		this.isMouseDown=false;
		this.cPush();
}
asher_canvas.prototype.handleMouseOut = function(e){
	this.mousePointer.X=parseInt(e.clientX-this.offset.X)-1;
    this.mousePointer.Y=parseInt(e.clientY+document.getElementById('nk').scrollTop-this.offset.Y);

    // Put your mouseOut stuff here
    if(this.isMouseDown){
		this.cPush();
    }

    this.isMouseDown=false;
}

asher_canvas.prototype.handleMouseMove = function(e){
	this.mousePointer.X=parseInt(e.clientX-this.offset.X)-1;
    this.mousePointer.Y=parseInt(e.clientY+document.getElementById('nk').scrollTop-this.offset.Y);

    // Put your mousemove stuff here
    if(this.isMouseDown){
    	this.ctx.beginPath();
    	if(this.mode=="pen"){
    		this.ctx.globalCompositeOperation="source-over";
    		this.ctx.moveTo(this.lastX,this.lastY);
    		this.ctx.lineTo(this.mousePointer.X,this.mousePointer.Y);
    		this.ctx.strokeStyle = this.stroke.color;
    		this.ctx.lineWidth = this.stroke.width;
    		this.ctx.lineCap = "round";
    		this.ctx.stroke();
    	}
    	else if(this.mode=='marker'){

		}
		else{
			this.ctx.globalCompositeOperation="destination-out";
			this.ctx.arc(this.lastX,this.lastY,this.stroke.width*2,0,Math.PI*2,false);
			this.ctx.fill();
		}
    	this.lastX=this.mousePointer.X;
    	this.lastY=this.mousePointer.Y;

    }
}

asher_canvas.prototype.setBtnAction = function(){
	var _this=this;
	$("#canvas").on('mousedown', function(e){
		_this.handleMouseDown(e);
	});
	$("#canvas").on('mousemove', function(e){
		_this.handleMouseMove(e);
	});
	$("#canvas").on('mouseup', function(e){
		_this.handleMouseUp(e);
	});
	$("#canvas").on('mouseout', function(e){
		_this.handleMouseOut(e);
	});
	 	 
	$("#pen").on('click', function(e){
		_this.mode= "pen";
		_this.ctx.globalAlpha = 1;
		
	});     
	$("#marker").on('click', function(e){
		_this.mode="marker";
	});
	$("#eraser").on('click', function(e){
		_this.mode="eraser";
		_this.ctx.globalAlpha = 1;
	});
	$("#reset").on('click', function(e){
		_this.mode="pen";
	    _this.ctx.clearRect(0, 0,$("#canvas").width() , $("#canvas").height());
	    _this.setPaint();
	    _this.cPushArray = new Array();
	    _this.cStep = -1;
	});
	$(".penColor").on('click', function(e){
		if(_this.mode == "") {
			_this.mode="pen";
		}
		_this.stroke.color =$(this).css('backgroundColor');
		
	});
	$('#export').on('click', function(e){
		_this.stroke.color = "#000000";
		if(_this.mode!="pen"){
			_this.ctx.globalAlpha = 1;
			_this.ctx.globalCompositeOperation="source-over";
		}
		var imgdata = _this.ctx.getImageData(0,0,$("#canvas").width(),$("#canvas").height());
		_this.ctx.font = '20px Arial';
		var line = 0;
		for(var s in _this.txts){
			_this.ctx.fillText(_this.txts[s], 10, line+=50);
		}
		var canvas2 = null;
		$('#wrap').css({backgroundColor: '#fff'});
		_this.canvas.css({border: '0px'});
		$('#closeXBtn').hide();
		
		html2canvas($('#contents')[0], {
			onrendered: function(canvas) {
				
				$(canvas).css({backgroundColor: '#fff', zIndex: 2, position: 'absolute'}).appendTo($('#nk'));
				
				$(canvas)[0].toBlob(function(blob){
					var filename = function(){
						return new Date().getTime();
					}
					saveAs(blob, filename()+".jpg"); //to-do : 파일명 변경 201502121322-초보1-강사이경연.png
				});
				$(canvas).remove();
				_this.canvas.css({border: '1px solid #999999'});
				$('#closeXBtn').show();
			},
			width: 1880,
			height: 850
		});
	
		
		_this.ctx.putImageData(imgdata,0,0);

		if(_this.mode!="pen"){
			_this.ctx.globalCompositeOperation="destination-out";
		}
	});

	$('#undo').on('click', function(e){
		if(_this.cStep >= 0) {
			_this.cStep--;
			var canvasPic = new Image();
			canvasPic.src = _this.cPushArray[_this.cStep]; 
			_this.ctx.clearRect(0, 0,$("#canvas").width() , $("#canvas").height());
			canvasPic.onload = function(){
				_this.ctx.drawImage(canvasPic, 0, 0);
			}
		}
	});
	$('#redo').on('click', function(e){
		if(_this.cStep < _this.cPushArray.length-1) {
			_this.cStep++;
			var canvasPic = new Image();
			canvasPic.src = _this.cPushArray[_this.cStep];
			_this.ctx.clearRect(0, 0,$("#canvas").width() , $("#canvas").height());
			canvasPic.onload = function(){
				_this.ctx.drawImage(canvasPic, 0, 0);
			}
		}
	});
}