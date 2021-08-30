var shine = {};

shine = {
		$id: function(id){
			var obj = null;
			if(document.getElementById(id)){
				obj = document.getElementById(id);
			}
			else{
				var doc = parent.document;
				while(doc && !doc.getElementById(id)){
					doc = parent.doc;
					
				}
				if(doc && doc.getElementById(id)){
				}
			}
			
			return obj;
		},
		$body: function(){
			return document.body;
		},
		$window: function(){
			return window;
		},
		$document: function(){
			return document;
		},
		$focus: function(id){
			return this.$id(id).focus();
		},
		$setAttr: function(ele, obj){
			if(obj && (typeof(obj) == 'object')){
				for(var attr in obj){
					if(attr == 'class' || attr == 'className'){
						ele.className = obj[attr];
					}
					else{
						ele.setAttribute(attr, obj[attr]);
					}
				}
			}
		},
		$getAttr: function(ele, attr){
			return ele.getAttribute(attr);
		},
		$sValue: function(id, value){
			this.$id(id).value = value;
		},
		$gValue: function(id){
			return this.$id(id).value;
		},
		$hide: function(obj){
			obj.style.display = 'none';
		},
		$show: function(obj){
			obj.style.display = 'block';
		},
		$log: function(log){
			if(window.console && window.console.log){
				console.log(log);
			}
		},
		$css: function(ele, obj){
			if(obj && (typeof(obj) == 'object')){
				for(var p in obj){
					var pName = '';
					switch (p) {
					case 'x':
						pName = 'left';
						break;
					case 'y':
						pName = 'top';
						break;
					case 'w':
						pName = 'width';
						break;
					case 'h':
						pName = 'height';
						break;
					default:
						pName = p;
						break;
					}
					if(pName in ele.style){
						ele.style[pName] = obj[p];
					}
					else if(pName == 'opacity'){
						shine.$setOpacity(ele, obj[p]);
					}
				}
			}
		},
		$event: function(ele, event, fn, bool){
			if(!bool){
				bool = false;
			}
			if(ele.addEventListener){
				ele.addEventListener(event, fn, bool);
			}
			else if(ele.attachEvent){
				ele.attachEvent('on'+event, fn, false);
			}
		},
		$removeEvent: function(ele, event, fn, bool){
			//(add.removeEventListener("click", addEvent, false);
			if(!bool){
				bool = false;
			}
			if(ele.removeEventListener){
				ele.removeEventListener(event, fn, bool);
			}
			else if(ele.detachEvent){
				ele.detachEvent('on'+event, fn);
			}
		},
		$setOpacity: function(obj, value){
			if('opacity' in obj.style){
				obj.style.opacity = value;
			}
			else{
				var ieValue = value * 100;
				obj.style.filter='progid:DXImageTransform.Microsoft.Alpha(Opacity='+ieValue+')'; 
			}
		},
		$getOpacity: function(obj){
			var opacity;
			if('opacity' in obj.style){
				opacity = obj.style.opacity;
			}
			else{
				ieOpacity = obj.filters.item("DXImageTransform.Microsoft.Alpha").opacity;
				opacity = ieOpacity*0.01;
			}
			return opacity;
		},
		$mkEle: function(parentsEle, ele, id, className){
			if(id == 'undefined' || id == null || id == ''){
				id = ele + "_" + Math.round((new Date()).getTime() / 1000);
			}
			if(className == 'undefined' || className == null || className == ''){
				className = ele + "_" + Math.round((new Date()).getTime() / 1000);
			}
			
			var element = document.createElement(ele);
			element.setAttribute("id", id);
			element.setAttribute("class", className);
			
			if(parentsEle){
				if(parentsEle == 'body'){
					parentsEle = document.body;
				}
				parentsEle.appendChild(element);
			}
			
			element.$css = function(obj){
				return shine.$css(element, obj);
			};
			element.$mkEle = function(ele, eleId, eleClassName){
				return shine.$mkEle(element, ele, eleId, eleClassName);
			};
			element.$getAttr = function(attr){
				return shine.$getAttr(element, attr);
			};
			element.$setAttr = function(obj){
				shine.$setAttr(element, obj);
			};
			element.$mkTxt = function(txt){
				return shine.$mkTxt(element, txt);
			};
			element.$mkTxtBox = function(txt){
				return shine.$mkTxtBox(element, txt);
			};
			element.$event = function(event, fn, bool){
				return shine.$event(element, event, fn, bool);
			};
			element.$removeEvent = function(event, fn, bool){
				return shine.$removeEvent(element, event, fn, bool);
			};
			element.$show = function(){
				shine.$show(element);
			};
			element.$hide = function(){
				shine.$hide(element);
			};
			return element;
		},
		$removeEle: function(ele){
            if(ele.parentNode.removeChild(ele)){
                    return true;
            }
            else{
                    return false;
            }
		},
		$removeEleAll: function(ele){
			while(ele.firstChild){
				ele.removeChild(ele.firstChild);
			}
		},
		$mkTxt: function(parentsEle, txt){
			var txtNode = document.createTextNode(txt);
			parentsEle.appendChild(txtNode);
			return txtNode;
		},
		$mkTxtBox: function(parentsEle, txt){
			var txtBox = shine.$mkEle(parentsEle, 'span');
			var txtNode = document.createTextNode(txt);
			txtBox.appendChild(txtNode);
			return txtBox;
		},
		$width: function(opt, parentCnt){
			var parentCnt =  parentCnt || 0;
			var w = this.$window();
			var d = this.$document();
			var p = null;
			for(var i=0; i<parentCnt;i++){
				p = (p)?p.parent:parent;
			}
			w = (p)?p.shine.$window():this.$window();
			d = (p)?p.shine.$document():this.$document();
			var width = '';
			switch (opt) {
			case 'i':
				width = w.innerWidth || d.documentElement.clientWidth || d.body.clientWidth;
				break;
			case 'o':
				width = w.pageXOffset || d.documentElement.scrollLeft || d.body.scrollLeft;
				break;
			case 's':
				width = d.body.scrollWidth;
				break;
			}
			return width;
		},
		$objWidth: function(obj){
			return obj.offsetWidth;
		},
		$objHeight: function(obj){
			return obj.offsetHeight;
		},
		$height: function(opt, /* Number */parentCnt){
			var parentCnt =  parentCnt || 0;
			var w = this.$window();
			var d = this.$document();
			var p = null;
			for(var i=0; i<parentCnt;i++){
				p = (p)?p.parent:parent;
			}
			w = (p)?p.shine.$window():this.$window();
			d = (p)?p.shine.$document():this.$document();
			var height = '';
			switch (opt) {
			case 'i':
				height = w.innerHeight || d.documentElement.clientHeight || d.body.clientHeight;
				break;
			case 'o':
				height = w.pageYOffset || d.documentElement.scrollTop || d.body.scrollTop;
				break;
			case 's':
				
				height = d.body.scrollHeight;
				break;
			}
			return height;
		},
		$objHeight: function(obj){
			return obj.offsetHeight;
		}
		
};


shine.util = {};

shine.util.keyMap = {
		backSpace: 8,
		tab: 9,
		enter: 13,
		shift: 16,
		ctrl: 17,
		alt: 18,
		pauseBreak: 19,
		capsLock: 20,
		ko_en: 21,
		chinese: 25,
		esc: 27,
		space: 32,
		pageUp: 33,
		pageDown: 34,
		end: 35,
		home: 36,
		keyLeft: 37,
		keyUp: 38,
		keyRight: 39,
		keyDown: 40,
		insert: 45,
		'delete': 46,
		'0': 48,
		'1': 49,
		'2': 50,
		'3': 51,
		'4': 52,
		'5': 53,
		'6': 54,
		'7': 55,
		'8': 56,
		'9': 57
};

shine.util.keyFunction = function(fn, /* keyCode or keyName(keyName은 keyMap에 등록되어 있어야 한다.) */keyCode){
	for(var a in this.keyMap){
		if(a == keyCode || this.keyMap[a] == keyCode){
			keyCode = this.keyMap[a];
			break;
		}
	}
	if(event.keyCode == keyCode){
		fn();
		return;
	}
	return;
};

//이메일 검증 함수 리턴이 false 라면 invalid email
shine.util.checkEmail = function(email){
	var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if (!filter.test(email)) {
		return false;
	}
	else{
		return true;
	}
};
shine.util.isMobile2 = {
	Android: function() {
    	return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
    	return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
    	return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
    	return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
    	return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
    	return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};
shine.util.isMobile = function(){
	var ua = navigator.userAgent;
	var mobileList = ['Android', 'BlackBerry', 'iPhone', 'iPad', 'iPod', 'Opera Mini', 'IEMobile'];
	
	var returnValue = false;
	for(var i=0;i<mobileList.length;i++){
		if(ua.indexOf(mobileList[i]) != -1){
			returnValue = true;		
			break;
		}
	}
	return returnValue;
};
shine.util.trim = function(str){
	if(str){
		//console.log(str)
		str = str.replace(/(^\s*)|(\s*$)/g,"");
	}
	return str;
};
shine.util.session = {
	set: function(key, value){
		sessionStorage.setItem(key, value);
	},
	get: function(key){
		return sessionStorage.getItem(key);
	},
	clear: function(key){
		sessionStorage.removeItem(key);
	},
	clearAll: function(){
		sessionStorage.clear();
	}
};
shine.util.lStorage = {
		set: function(key, value){
			localStorage.setItem(key, value);
		},
		get: function(key){
			return localStorage.getItem(key);
		},
		clear: function(key){
			localStorage.removeItem(key);
		},
		clearAll: function(){
			localStorage.clear();
		}
	};
shine.util.cookie = {
		get: function(cookieName){
		 	var search = cookieName + "=";
		  	var cookie = document.cookie;
		 
		 	if( cookie.length > 0 ){
		 		startIndex = cookie.indexOf( cookieName );
		 		if( startIndex != -1 ){
		 			startIndex += cookieName.length;
		    		endIndex = cookie.indexOf( ";", startIndex );
		    		if( endIndex == -1) endIndex = cookie.length;
		   			return unescape( cookie.substring( startIndex + 1, endIndex ) );
		   		}
				else{
		  			return false;
		  		}
		 	}
		 	else
		 	{
		  		return false;
			}
		},
        set: function(name ,value ,expire ,path, domain){
            path = (!path)?"/":path;
            var todaydate = new Date();
            unixtime = todaydate.getTime();
            if (value==null) {
                    expire = 0;
            }
            if (expire != null) {
                    if(expire != 0){
                            extime = unixtime+(expire*1000);
                            todaydate.setTime(extime);
                            expiretime = " expires=" + todaydate.toUTCString() +";";
                    }
                    else{
                            expiretime = "";
                    }
            }
            else{
                    expiretime = "";
            }
            if (domain==null){
                    domain = "";
            }
            if(value == false){
                    var expireDate = new Date();
                expireDate.setDate(expireDate.getDate() -1); //-1: 쿠키 삭제
                    document.cookie = name + "=" + escape(value) + "; path=" + path + ";" + expireDate.toGMTString() + "; domain = " + domain;
            }
            else{
                    document.cookie = name + "=" + escape(value) + "; path=" + path + ";" + expiretime + "; domain = " + domain;
            }
        }
		
};
shine.util.openNewWnd = {
	width: '',
	height: '',
	open: function(url){
		if(this.width && this.height){
			window.open(url, "_blank", "width="+this.width+","+"height="+this.height);
		}
		else{
			window.open(url, "_blank");
		}
	}
}
shine.util.historyBack = function(depth){
    if(depth){
            history.back(depth);
    }
    else{
            history.back(1);
    }
};
shine.util.moveUrl = function(url){
	if(url){
		location.href = url;
	}
	else{
		location.href = document.location.href;
	}
    
};
shine.util.thisUrl = function(){
	return document.location.href;
};
shine.util.setMoneyStyle = function(x){
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
shine.util.setNumberStyle = function(x){
    return parseInt(x.split(",").join(""));
};
shine.util.getHost = function(){
	return window.location.hostname;
};
shine.util.getVerIE = function(){
	var ua = navigator.userAgent;
	var rs = false;
	if((ua.indexOf('MSIE 7')!=-1 && ua.indexOf('Trident/4.0')==-1) || ua.indexOf('MSIE 6')!=-1){
		rs = true;
	}
	else if(ua.indexOf('MSIE 8')!=-1 || (ua.indexOf('MSIE 7')!=-1 && ua.indexOf('Trident/4.0')!=-1)){
		rs = true;
	}
	else{
		rs = false;
	}
	return rs;
};
shine.util.string = {
	encode: function(str, num){
		num = (num)?num:1;
		switch (num) {
		case 1:
			return encodeURI(str);
			break;
		case 2:
			return encodeURIComponent(str);
		default:
			return encodeURI(str);
			break;
		}
	},
	decode: function(str, num){
		num =(num)?num:1;
		switch (num) {
		case 1:
			return decodeURI(str);
			break;
		case 2:
			return decodeURIComponent(str);
		default:
			return decodeURI(str);
			break;
		}
	},
	json: {
		encode: function(obj){
			return JSON.stringify(obj);
		},
		decode: function(obj){
			try{
				return eval('('+obj+')');
			}
			catch(e){
				alert(obj);
				return;
			}
			
		}
	}
};
shine.util.base64 = {
	// private property
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
	// public method for encoding
	encode : function (input) {
	   	var output = "";
	    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
	    var i = 0;
	    input = this.utf8_encode(input);
	    while (i < input.length) {
	    	chr1 = input.charCodeAt(i++);
	        chr2 = input.charCodeAt(i++);
	        chr3 = input.charCodeAt(i++);
	        enc1 = chr1 >> 2;
	        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
	        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
	        enc4 = chr3 & 63;
	        if (isNaN(chr2)) {
	            enc3 = enc4 = 64;
	        }
	        else if (isNaN(chr3)) {
	            enc4 = 64;
	        }
	        output = output +
	        this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
	        this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
	 
	    }
	 
	    return output;
	},
	// public method for decoding
	decode : function (input) {
	    var output = "";
	    var chr1, chr2, chr3;
	    var enc1, enc2, enc3, enc4;
	    var i = 0;
	    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
	    while (i < input.length) {
	        enc1 = this._keyStr.indexOf(input.charAt(i++));
	        enc2 = this._keyStr.indexOf(input.charAt(i++));
	        enc3 = this._keyStr.indexOf(input.charAt(i++));
	        enc4 = this._keyStr.indexOf(input.charAt(i++));
	        chr1 = (enc1 << 2) | (enc2 >> 4);
	        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
	        chr3 = ((enc3 & 3) << 6) | enc4;
	        output = output + String.fromCharCode(chr1);
	        if (enc3 != 64) {
	            output = output + String.fromCharCode(chr2);
	        }
	        if (enc4 != 64) {
	            output = output + String.fromCharCode(chr3);
	        }
	    }
	    output = this.utf8_decode(output);
		return output;
	},
	// private method for UTF-8 encoding
	utf8_encode : function (string) {
	    string = string.replace(/\r\n/g,"\n");
	    var utftext = "";
	    for (var n = 0; n < string.length; n++) {
	        var c = string.charCodeAt(n);
	        if (c < 128) {
	            utftext += String.fromCharCode(c);
	        }
	        else if((c > 127) && (c < 2048)) {
	            utftext += String.fromCharCode((c >> 6) | 192);
	            utftext += String.fromCharCode((c & 63) | 128);
	        }
	        else {
	            utftext += String.fromCharCode((c >> 12) | 224);
	            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
	            utftext += String.fromCharCode((c & 63) | 128);
	        }
	    }
	    return utftext;
	},
	// private method for UTF-8 decoding
	utf8_decode : function (utftext) {
	    var string = "";
	    var i = 0;
	    var c = c1 = c2 = 0;
	    while ( i < utftext.length ) {
	    	c = utftext.charCodeAt(i);
	        if (c < 128) {
	            string += String.fromCharCode(c);
	            i++;
	        }
	        else if((c > 191) && (c < 224)) {
	            c2 = utftext.charCodeAt(i+1);
	            string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
	            i += 2;
	        }
	        else {
	            c2 = utftext.charCodeAt(i+1);
	            c3 = utftext.charCodeAt(i+2);
	            string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
	            i += 3;
	        }
	    }
	    return string;
	}
	 
};
shine.util.ajax = {
	xmlHttpReq: false,
	cache: false,
    send: function(method, url, param, f){
    	var _this = this;
    	if (window.XMLHttpRequest) {
    		this.xmlHttpReq = new XMLHttpRequest();
    	}
    	else if (window.ActiveXObject) {
    		try {
    			this.xmlHttpReq = new ActiveXObject("Msxml2.XMLHTTP");
    		}
    		catch (e) {
    			try {
    				this.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
    			}
    			catch (e) {}
    		}
    	}
    	method = method.toUpperCase();
    	if(!this.cache){
    		if(param){
    			param = param+"&utc="+new Date().getTime();
    		}
    		else{
    			param = "utc="+new Date().getTime();
    		}
    	}
    	var getUrl = '';
    	if(param){
    		getUrl = url + "?"+param;
    	}
    	else{
    		getUrl = url
    	} 
    	var postUrl = url;
    	this.xmlHttpReq.open(method, (method=='GET')?getUrl:postUrl , true); // 접속요청
    	this.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    	this.xmlHttpReq.msCaching = 'disabled';  
    	this.xmlHttpReq.onreadystatechange = function(){
    		if (_this.xmlHttpReq.readyState == 4) {
    			if (_this.xmlHttpReq.status == 200) {
    				f(shine.util.trim(_this.xmlHttpReq.responseText));
    			}
    			else{
    				alert("NETWORK ERROR");
    			}
    		}
    	};
    	this.xmlHttpReq.send((method=='GET')?null:param);
    }
};


shine.file = {
	fileList: [],
	read: function(fileObj,idx){
		var file = fileObj.files[0];
		var fr = new FileReader();
		fr.readAsDataURL(file);
		var data = {};
		
		fr.onload = function(){
			data = {
				name: file.name,
				data: fr.result,
				type: file.type
			};
			shine.file.fileList[idx]=data;
		};
	}
};

shine.form ={};

shine.form.chkValue = function(/*obj*/checkList){
	for(var a in checkList){
		if(!shine.$id(checkList[a]).value || shine.$id(checkList[a]).value=='' || shine.$id(checkList[a]).value == null || shine.$id(checkList[a]).value == undefined){
			shine.$id(checkList[a]).value = '';
			shine.$id(checkList[a]).focus();
			return a;
		} 
	}
	return true;
};
shine.form.chkPwd = function(obj){
	// obj.pwd1, obj.pwd2
	if(obj.pwd1 == obj.pwd2){
		return true;
	}
	else{
		return false;
	}
};

shine.form.method = function(obj, method){
	if(!method){
		method = 'get';
	}
	if(method == 'post' || method == 'get'){
		var obj = this.checkObj(obj);
		obj.method = method;
	}
	else{
		alert("'"+method + "' is wrong method.");
		return;
	}
};
shine.form.action = function(obj, url){
	var obj = this.checkObj(obj);
	return obj.action = url;
};
shine.form.reset = function(obj){
	obj.reset();
};
shine.form.checkObj = function(obj){
	if(shine.$id(obj)){
		return shine.$id(obj);
	}
	else{
		return obj;
	}
};
/* obj 와 id 값 모두 사용 가능 */
shine.form.sendForm = function(obj, url, method){
	var obj = this.checkObj(obj);
	this.method(obj, method);
	this.action(obj, url);
	obj.submit();
};

shine.window = {};
shine.window.showPopup = function(obj, /* default is body */ parentCnt){
	
	obj.size.w = parseInt(obj.size.w);
	obj.size.h = parseInt(obj.size.h);
	
	var parentCnt = parentCnt || 0;
	var body = shine.$body();
	var wnd = shine.$window();
	var p = null;
	for(var i=0; i<parentCnt;i++){
		p = (p)?p.parent:parent;
	}
	body = (p)?p.shine.$body():shine.$body();
	wnd = (p)?p.shine.$window():shine.$window();
	
	body = (obj.body)?obj.body:body;
	
	var width, height, wrapBgColor, boxBgColor, border, borderColor;
	var boxRadius, boxId, wrapId, tick, wrapOpacity, effectTerm;
	
	var sHeight = (obj.body)?0:shine.$height('s', parentCnt);
	var iHeight = (obj.body)?parseInt(obj.body.offsetHeight):shine.$height('i', parentCnt);
	var sWidth = (obj.body)?0:shine.$width('s', parentCnt);
	var iWidth = (obj.body)?parseInt(obj.body.offsetWidth):shine.$width('i', parentCnt);
	var offsetWidth = (obj.body)?0:shine.$width('o');
	var offsetHeight = (obj.body)?0:shine.$height('o');
	var t = Math.round((new Date()).getTime() / 1000);
	
	if(obj && (typeof(obj) == 'object')){
		width = (obj.size.w && obj.size.w >= 30)? obj.size.w: 30;
		height = (obj.size.h && obj.size.h >= 30)? obj.size.h: 30;
		wrapBgColor = obj.wrapBgColor || '#000000';
		boxBgColor = obj.boxBgColor;
		wrapOpacity = obj.wrapOpacity || 0.5;
		border = obj.border || '2px';
		borderColor = obj.borderColor || '#ffffff';
		boxRadius = obj.boxRadius || '5px';
		tick = obj.tick || 100;
		effectTerm = obj.effectTerm || 0.1;
		boxId = obj.boxId || "boxWindow" + t;
		wrapId = obj.wrapId || "wrapWindow" + t;
	}
		
	var classNameBox = "boxWindow";
	var classNameWrap = "wrapWindow";
	
	var boxWindow = shine.$mkEle((obj.body)?obj.body:body,'div');
	boxWindow.setAttribute("id", boxId);
	boxWindow.setAttribute("class", classNameBox);
		
	var viewPort = boxWindow.$mkEle('div');
	viewPort.setAttribute("id", boxId+'_viewport');
	viewPort.setAttribute("class", classNameBox+'_viewport');
	
	// 닫기 버튼
	if(obj.closeBtn && obj.closeBtn.mode === true){
		var closeBtnOpt = {
				pos: {x: obj.closeBtn.pos.x, y: obj.closeBtn.pos.y},
				img: obj.closeBtn.img
		};
		closeBtnOpt.size = {};
		closeBtnOpt.size.w = (obj.closeBtn.size && obj.closeBtn.size.w)? obj.closeBtn.size.w : undefined;
		closeBtnOpt.size.h = (obj.closeBtn.size && obj.closeBtn.size.h)? obj.closeBtn.size.h : undefined;
		
		closeBtnOpt.hoverImg = obj.closeBtn.hoverImg || undefined;
		
		var close = viewPort.$mkEle('IMG');
		shine.$setAttr(close, {src: closeBtnOpt.img});
		shine.$css(close, {position: 'absolute', left: closeBtnOpt.pos.x+'px', top: closeBtnOpt.pos.y+'px', zIndex: 70000, cursor: 'pointer'});
		if(closeBtnOpt.size && closeBtnOpt.size.w){
			shine.$css(close, {width: closeBtnOpt.size.w+'px'});
		}
		if(closeBtnOpt.size && closeBtnOpt.size.h){
			shine.$css(close, {height: closeBtnOpt.size.h+'px'});
		}
		
		if(closeBtnOpt.hoverImg){
			close.$event('mouseover', function(){
				shine.$setAttr(close, {src: closeBtnOpt.hoverImg});
			}, false);
			close.$event('mouseout',function(){
				shine.$setAttr(close, {src: closeBtnOpt.img});
			}, false);
		}
		if(close){
			close.$event('click', function(){
				closeWindow();
			}, false);
		}
	}
	
	// 다시보지않기 옵션 버튼
	if(obj.byeBtn && obj.byeBtn.mode === true){
		var byeBtnOpt = {
				pos: {x: obj.byeBtn.pos.x, y: obj.byeBtn.pos.y},
				img: obj.byeBtn.img
		};
		byeBtnOpt.size = {};
		byeBtnOpt.size.w = (obj.byeBtn.size && obj.byeBtn.size.w)? obj.byeBtn.size.w : undefined;
		byeBtnOpt.size.h = (obj.byeBtn.size && obj.byeBtn.size.h)? obj.byeBtn.size.h : undefined;
		
		byeBtnOpt.hoverImg = obj.byeBtn.hoverImg || undefined;
		
		var bye = viewPort.$mkEle('IMG');
		shine.$setAttr(bye, {src: byeBtnOpt.img});
		shine.$css(bye, {position: 'absolute', left: byeBtnOpt.pos.x+'px', top: byeBtnOpt.pos.y+'px', zIndex: 70000, cursor: 'pointer'});
		if(byeBtnOpt.size && byeBtnOpt.size.w){
			shine.$css(bye, {width: byeBtnOpt.size.w+'px'});
		}
		if(byeBtnOpt.size && byeBtnOpt.size.h){
			shine.$css(bye, {height: byeBtnOpt.size.h+'px'});
		}
		
		if(byeBtnOpt.hoverImg){
			close.$event('mouseover', function(){
				shine.$setAttr(bye, {src: byeBtnOpt.hoverImg});
			}, false);
			close.$event('mouseout', function(){
				shine.$setAttr(bye, {src: byeBtnOpt.img});
			}, false);
		};
		if(bye){
			bye.$event('click', function(){
				closeWindow();
			}, false);
		}
		
	}
	
	// 자동 닫기
	if(obj.autoClose && obj.autoClose.mode === true){
		var closeTime = obj.autoClose.closeTime;
		if(obj.autoClose.info && obj.autoClose.info.mode === true){
			var autoCloseContent = viewPort.$mkEle('DIV');
			shine.$css(autoCloseContent, {
				position: 'absolute',
				left: obj.autoClose.info.pos.x+'px',
				top: obj.autoClose.info.pos.y+'px',
				width: obj.autoClose.info.size.w+'px',
				height: obj.autoClose.info.size.h+'px',
				color: obj.autoClose.info.font.color,
				fontSize: obj.autoClose.info.font.size
			});
			autoCloseContent.innerHTML = closeTime +" "+ obj.autoClose.info.content;
		}
		timerFunction(closeTime);
		function timerFunction(closeTime){
			var autoCloseTimer = setTimeout(function(){
				closeTime--;
				if(closeTime>0){
					timerFunction(closeTime);
				}
				else{
					clearTimeout(autoCloseTimer);
					closeWindow();
				}
				if(obj.autoClose.info && obj.autoClose.info.mode === true){
					autoCloseContent.innerHTML = closeTime +" "+ obj.autoClose.info.content;
				}
			}, closeTime);
		}
	}
	
		
	var wrapWindow = shine.$mkEle((obj.body)?obj.body:body, 'div');
	wrapWindow.setAttribute("id", wrapId);
	wrapWindow.setAttribute("class", classNameWrap);
	
	var boxSize = (iHeight - (height + parseInt(border)*2))/2;
	if(boxSize<0){boxSize = 0;}
	var boxWindowPos = {
			left: offsetWidth + (iWidth - (width + parseInt(border)*2))/2,
			top: offsetHeight + boxSize
	}
	boxWindow.$css({
		left: parseInt(boxWindowPos.left)+'px',
		top: parseInt(boxWindowPos.top)+'px',
		width: parseInt(width) + 'px',
		height: parseInt(height) + 'px',
		backgroundColor: boxBgColor,
		zIndex: 40000,
		position: 'absolute',
		border: border + ' solid',
		borderColor: borderColor,
		WebkitBorderRadius: boxRadius,
		MozBorderRadius: boxRadius,
		borderRadius: boxRadius,
		OBorderRadius: boxRadius,
		KhtmlBorderRadius: boxRadius,
		textOverflow: 'ellipsis',
		zoom: 1,
		opacity: 0
	});
	if(obj.boxShadow !== false){
		boxWindow.$css({
			boxShadow: '2px 2px 2px #cecece'
		});
	}
	
		
	var wrapHeight = Math.max(sHeight, iHeight);
	var wrapWidth = Math.min(sWidth, iWidth);
	if(obj.body){
		wrapHeight = iHeight;
		wrapWidth = iWidth;
	}
	wrapWindow.$css({
		width: parseInt(wrapWidth)+'px',
		height: parseInt(wrapHeight)+'px',
		backgroundColor: wrapBgColor,
		zIndex: 35000,
		position: 'absolute',
		left: (offsetWidth+0) + 'px',
		top: (offsetHeight+0)+'px',
		zoom: 1,
		opacity: 0
	});

	var resize = function(){
		var iHeight = shine.$height('i', parentCnt);
		var iWidth = shine.$width('i', parentCnt);
		var offsetWidth = shine.$width('o', parentCnt);
		var offsetHeight = shine.$height('o', parentCnt);
		if(boxWindow){
			var boxSize = (iHeight - (height + parseInt(border)*2))/2;
			if(boxSize<0){boxSize = 0;}
			if(obj.fix && obj.fix.mode === true){
				boxWindow.$css({
					left: obj.fix.size.left+'px', top: obj.fix.size.left+'px'
				});
			}
			else{
				boxWindow.$css({
					left: offsetWidth+(iWidth - (width + parseInt(border)*2))/2 + 'px',
					top: offsetHeight + boxSize + 'px'
				});
			}
		}
		if(wrapWindow){
			var sHeight = shine.$height('s', parentCnt);
			var sWidth = shine.$width('s', parentCnt);
			var wrapHeight = Math.min(sHeight, iHeight);
			var wrapWidth = Math.min(sWidth, iWidth);
			wrapWindow.$css({
				width: wrapWidth+'px',
				height: wrapHeight+'px',
				left: (offsetWidth+0) + 'px',
				top: (offsetHeight+0)+'px'
			});
		}
	};
	
	if(obj.fix && obj.fix.mode === true){
		boxWindow.$css({
			left: obj.fix.size.left+'px', top: obj.fix.size.left+'px'
		});
	}
	if(!obj.body){
		shine.$event(wnd, 'resize', function(){
			resize();
		}, false);
		shine.$event(wnd, 'scroll', function(){
			resize();
		}, false);
	}
	
	var nextFunc = (obj.nextFunc)?obj.nextFunc:null;
	
	var boxEffectTerm = (1/wrapOpacity)*effectTerm;
	var closeWindow = function(){
		setTimeout(function(){
			shine.window.closePopup(boxWindow, wrapWindow, tick, effectTerm, boxEffectTerm, parentCnt, nextFunc, obj);
		}, tick);
	};
	setTimeout(function(){
		shine.window.openPopup(boxWindow, wrapWindow, wrapOpacity, tick, effectTerm, boxEffectTerm, obj, parentCnt);
	},tick);
	
	if(obj.wrapClose == true){
		wrapWindow.$event('click', function(){
			closeWindow();
		}, false);
	}
	
	
	if(obj.closeFunc === true){
		this.closeFunc = function(){
			closeWindow();
		};
	}
	viewPort.closePopup = function(){
		closeWindow();
	};
	viewPort.close = function(){
		closeWindow();
	};
	return viewPort;
};

shine.window.closePooupTimer=null;
shine.window.openPopupTimer=null;

shine.window.openPopup = function(boxWindow, wrapWindow, wrapOpacity, tick, effectTerm, boxEffectTerm, obj, parentCnt){
	var parentCnt = parentCnt || 0;
	var body = shine.$body();
	for(var i=0; i<parentCnt;i++){
		body = parent.shine.$body();
	}
	body = (obj.body)?obj.body:body;
	var dWrapOpacity = parseFloat(parseFloat(shine.$getOpacity(wrapWindow)).toFixed(2));
	var dBoxOpacity = parseFloat(parseFloat(shine.$getOpacity(boxWindow)).toFixed(2));
	
	dWrapOpacity = dWrapOpacity + effectTerm;
	dBoxOpacity = dBoxOpacity + boxEffectTerm;
	
	if(dWrapOpacity > wrapOpacity){
		dWrapOpacity = wrapOpacity;
	}
	if(dBoxOpacity > 1){
		dBoxOpacity = 1;
	}
	shine.$setOpacity(wrapWindow, dWrapOpacity);
	shine.$setOpacity(boxWindow, dBoxOpacity);
	if(dWrapOpacity < wrapOpacity){
		shine.window.openPopupTimer = setTimeout(function(){
			shine.window.openPopup(boxWindow, wrapWindow, wrapOpacity, tick, effectTerm, boxEffectTerm, obj, parentCnt);
		}, tick);
	}
	else{
		clearTimeout(shine.window.openPopupTimer);
	}
};

shine.window.closePopup = function(boxWindow, wrapWindow, tick, effectTerm, boxEffectTerm, parentCnt, nextFunc, obj){
	var parentCnt = parentCnt || 0;
	var body = shine.$body();
	for(var i=0; i<parentCnt;i++){
		body = parent.shine.$body();
	}
	body = (obj.body)?obj.body:body;
	var dWrapOpacity = parseFloat(parseFloat(shine.$getOpacity(wrapWindow)).toFixed(2));
	var dBoxOpacity = parseFloat(parseFloat(shine.$getOpacity(boxWindow)).toFixed(2));
	dWrapOpacity = dWrapOpacity - effectTerm;
	dBoxOpacity = dBoxOpacity - boxEffectTerm;
	if(dWrapOpacity < 0){
		dWrapOpacity = 0;
	}
	if(dBoxOpacity < 0){
		dBoxOpacity = 0;
	}
	shine.$setOpacity(wrapWindow, dWrapOpacity);
	shine.$setOpacity(boxWindow, dBoxOpacity);
	if(dWrapOpacity > 0.001){
		shine.window.closePooupTimer = setTimeout(function(){
			shine.window.closePopup(boxWindow, wrapWindow, tick, effectTerm, boxEffectTerm, parentCnt, nextFunc, obj);
		}, tick);
	}
	else{
		clearTimeout(shine.window.closePooupTimer);
		if(boxWindow){
			body.removeChild(boxWindow);
		}
		if(wrapWindow){
			body.removeChild(wrapWindow);
		}
		if(nextFunc){
			nextFunc();
		}
	}
};

shine.img= {};
shine.img = {
	list: {},
	load: function(obj){
		var cnt = 1;
		if(obj){
			for(var a in obj){
				var theImage = new Image();
				theImage.src = obj[a].url;
				this.list[a] = theImage;
				this.imgLoadEvent(theImage, cnt);
				cnt++;
			}
		}
	},
	imgLoadEvent: function(img, idx){
		var _this = this;
		img.onload = function(){
			_this.imgLoadCallBack(idx);
		}
	},
	imgLoadCallBack: function(idx){
		
	},
	rotateTimer: null,
	rotateMove: false,
	rotateIdx: 0,
	getRotateList: function(){
		var list = [];
		var i=0;
		for(var a in this.list){
			if(a == 'rotate'+i){
				list.push(this.list[a]);
				i++;
			}
		}
		return list;
	},
	rotateImg: function(rotateBox){
		this.rotateImgList = this.getRotateList();
		var _this = this;			
		var imgSlide = shine.$mkEle(rotateBox, 'DIV');
		imgSlide.$css({width: '691px', height: '391px', border: '0px', margin:'0 auto', textAlign: 'center', position: 'relative'});
		
		var showImg0 = imgSlide.$mkEle('IMG');
		showImg0.src = this.rotateImgList[0].src;
		showImg0.$css({opacity: 1, position: 'absolute', left: '0px', top: '0px'});
		
		var showImg1 = imgSlide.$mkEle( 'IMG');
		showImg1.src = this.rotateImgList[1].src;
		showImg1.$css({opacity: 0, position: 'absolute', left: '0px', top: '0px'});
		
		var bulletBox = imgSlide.$mkEle('DIV');
		bulletBox.$css({width: '691px', height: '20px', position: 'absolute', left: '0px', top: '0px', display: 'none'});
		var bullet = [];
		
		var speed = 30;
		var waitTime = 0;
		var obj = {
				img0: showImg0,
				img1: showImg1,
				bullet: bullet
		};
		var addFunc = function(bulletObj, i){
			bulletObj.$event('click', function(){
				for(var j=0;j<_this.rotateImgList.length;j++){
					obj.bullet[j].src = _this.list.bullet_off.src;
				}
				
					_this.rotateIdx = i-1;
				
				
			}, false);
		}
		
		for(var i=0;i<this.rotateImgList.length;i++){
			bullet[i] = bulletBox.$mkEle('IMG');
			bullet[i].src = this.list.bullet_off.src;
			bullet[i].$css({right: 10+(this.rotateImgList.length-1-i)*19 + 'px', top: '10px', position: 'absolute', cursor: 'pointer'});
			addFunc(bullet[i], i);
		}
		bullet[0].src = this.list.bullet_on.src;
		
		
		
		shine.$event(rotateBox, 'mouseover', function(){
			bulletBox.style.display = "block";
		}, false);
		shine.$event(rotateBox, 'mouseout', function(){
			bulletBox.style.display = "none";
		}, false);
		
		setTimeout(function(){
			_this.rotateTimer = _this.playRotate(obj, 1, 0, speed, waitTime);
		}, speed);
	},
	playRotate: function(obj, o0, o1, speed, waitTime){
		
		var _this = this;
		waitTime++;
		if(waitTime>=50){
			
			obj.bullet[this.rotateIdx+1].src = this.list.bullet_on.src;
			if(this.rotateIdx==-1){
				obj.bullet[this.rotateImgList.length-1].src = this.list.bullet_off.src;
			}
			else{
				obj.bullet[this.rotateIdx].src = this.list.bullet_off.src;
			}
			
			if(o0 > 0){
				o0 = o0 - 0.03;
			}
			else{
				o0 = 0;
			}
			if(o1 < 1){
				o1 = o1 + 0.03;
			}
			else{
				o1 = 1;
			}
			obj.img0.$css({opacity: o0});
			obj.img1.$css({opacity: o1});
		}
		
		if(o0 == 0 && o1 == 1){
			this.rotateIdx++;
			obj.img0.src = this.rotateImgList[this.rotateIdx].src;
			if(this.rotateIdx >= (this.rotateImgList.length-1)){this.rotateIdx=-1;}
			obj.img1.src = this.rotateImgList[(this.rotateIdx+1)].src;
			
			o0 = 1;
			o1 = 0;
			waitTime = 0;
			shine.$css(obj.img0, {opacity: o0});
			shine.$css(obj.img1, {opacity: o1});
			
		}
		setTimeout(function(){
			_this.rotateTimer = _this.playRotate(obj, o0, o1, speed, waitTime);
		}, speed);
	}
};

shine.toolbar = {};
shine.toolbar.top = function(/*tag*/parent, /*array*/imgList, /*obj*/ option){
	var toolBar = shine.$mkEle(parent,'div');
	var opt = {
			size: {
				w: option.w || 950+'px',
				h: option.h || 30+'px'
			},
			bgColor: option.bgColor || '#fbfbfb',
			border: {
				top: {
					mode: option.border.top.type || false,
					type: option.border.top.type || '1px solid',
					color: option.border.top.color || '#b3b3b3'
				},
				bottom: {
					mode: option.border.bottom.type || false,
					type: option.border.bottom.type || '1px solid',
					color: option.border.bottom.color || '#b3b3b3'
				},
				left: {
					mode: option.border.left.type || false,
					type: option.border.left.type || '1px solid',
					color: option.border.left.color || '#b3b3b3'
				},
				right: {
					mode: option.border.right.type || false,
					type: option.border.right.type || '1px solid',
					color: option.border.right.color || '#b3b3b3'
				}
			}
	};
	toolBar.$css({width: '100%', height: opt.size.h, backgroundColor: opt.bgColor});
	if(opt.border.top.mode){
		toolBar.$css({borderTop: opt.border.top.type, borderTopColor: opt.border.top.color});
	}
	if(opt.border.bottom.mode){
		toolBar.$css({borderBottom: opt.border.bottom.type, borderBottomColor: opt.border.bottom.color});
	}
	if(opt.border.left.mode){
		toolBar.$css({borderLeft: opt.border.left.type, borderLeftColor: opt.border.left.color});
	}
	if(opt.border.right.mode){
		toolBar.$css({borderBottom: opt.border.right.type, borderRightColor: opt.border.right.color});
	}
	var viewPort = toolBar.$mkEle('div');
	var iHeight = shine.$height('i');
	var iWidth = shine.$width('i');
	
	var pos = {
			left: (iWidth - parseInt(opt.size.w))/2,
			top: 0
	};
	viewPort.$css({position: 'absolute', width: opt.size.w, height: opt.size.h, border: '0px', left: pos.left+'px', top: pos.top+'px'});
	
	var imgTag = [];
	var toolTipBox = [];
	
	if(imgList){
		function addEvent(obj, listener, fn, param){
			obj[listener] = function(){
				fn(param);
			};
		}
		function addTipBoxEvent(obj, mode) {
			if(mode == 'over'){
				obj.onmouseover = function(){
					obj.style.display = 'block';
				};
			}
			else if(mode == 'out'){
				obj.onmouseout = function(){
					obj.style.display = 'none';
				};
			}
		}
		
		for(var i=0;i<imgList.length;i++){
			if(imgList[i].loc == 'out'){
				imgTag[i] = toolBar.$mkEle('IMG');
				toolTipBox[i] = toolBar.$mkEle('DIV');
				
			}
			else if(imgList[i].loc == 'in'){
				imgTag[i] = viewPort.$mkEle('IMG');
				toolTipBox[i] = viewPort.$mkEle('DIV');
			}
			
			imgTag[i].$css({position: 'absolute', left: imgList[i].pos.x, top: imgList[i].pos.y, zIndex: 10});
			imgTag[i].$setAttr({src: imgList[i].src});
			
			if(imgList[i].tipBox.mode === true){
				toolTipBox[i].$css({display: 'none', cursor: 'pointer', textAlign: 'center', lineHeight: '35px', position: 'absolute', left: (parseInt(imgList[i].pos.x)-51)+'px', top: (parseInt(imgList[i].pos.y)+30)+'px', zIndex: 12, width: '151px', height: '30px', backgroundImage: 'url('+ imgList[i].tipBox.backgroundImage +')'});
				addTipBoxEvent(toolTipBox[i], 'over');
				addTipBoxEvent(toolTipBox[i], 'out');
			}	
			for(var a in imgList[i]){
				if(a == 'css'){
					for(var c in imgList[i][a]){
						imgTag[i].style[c] = imgList[i][a][c]; 
					}
				}
				if(a == 'event'){
					for(var b in imgList[i][a]){
						if(imgList[i].tipBox.mode === true){
							toolTipBox[i].innerHTML = imgList[i].tipBox.text;
							toolTipBox[i].style.color = imgList[i].tipBox.fontColor; 
							imgList[i][a][b].param.push(toolTipBox[i]);
							if(b == 'onclick'){
								addEvent(toolTipBox[i], b, imgList[i][a][b].fn, imgList[i][a][b].param);
							}
						}
						addEvent(imgTag[i], b, imgList[i][a][b].fn, imgList[i][a][b].param);
					}
				}
			}
		}
	}
};
shine.toolbar.banner = function(arr){
	location.href=arr[0];
};
shine.toolbar.toolTip = function(arr){
	if(arr[0] == 'on'){
		arr[1].style.display = 'block';
	}
	else if(arr[0] == 'out'){
		arr[1].style.display = 'none';
	}
	
};
