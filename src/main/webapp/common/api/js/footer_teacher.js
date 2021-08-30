$(document).ready(function(e){
	var footer = $('#footer')
	var sear1 = $('<div>', {'class': 'sear'}).appendTo(footer);
	var sear1_span = $('<span>').html("사 전").appendTo(sear1);
	var sear1_input = $('<input type="text">').appendTo(sear1);
	var sear1_a = $('<a>').appendTo(sear1);
	var sear1_a_img = $('<img>').appendTo(sear1_a);
	var sear2 = $('<div>', {'class': 'sear'}).appendTo(footer);
	var sear2_input = $('<input type="text">').css({width: '400px'}).appendTo(sear2);
	
	
	
	
	var detail_view = $('<div>', {'class': 'detail_view'}).css({display: 'none'}).appendTo(footer);
	var detail_view_div = $('<div>').appendTo(detail_view);
	var detail_view_div_h5 = $('<h5>').appendTo(detail_view);
	var view_select = $('<div>', {'class': 'view_select'}).appendTo(footer)
	
	
	var sear2_a = $('<a>').css({cursor: 'pointer'}).html("자세히보기").appendTo(sear2);
	
	
	
	sear1_input.on('keydown', function(e){
		if(e.keyCode == 13){
			var param = {
					dicWord: sear1_input.val()
			}
			function dicCallBack(_rs){
				if(_rs.error == API_SUCCESS){
					var d = _rs.data.data_list.explain;
					var showD = '';
					if(d.length>40){
						showD = d.substr(0, 40)+" ...";
					}
					else{
						showD = D;
					}
					sear2_input.val(showD);
					detail_view_div.html(d);
				}
				else{
					alert("찾을수 없는 단어 입니다.");
					sear2_input.val('');
					detail_view_div.html('');
				}
			}
			requestApi('POST', apiList('dic'), param, dicCallBack);
		}
	});
	
	
	sear2_a.on('click', function(){
		if(detail_view.css('display') == 'none'){
			if(!sear2_input.val()){
				alert("검색 결과가 없습니다.");
			}
			else{
				detail_view.css({'display': 'block'});
			}
		}
		else{
			detail_view.css({'display': 'none'});
		}
	});
	
	var view_select_select1 = $('<select>').appendTo(view_select);
	var view_select_select1_opt1 = $('<option>').html("내용1").appendTo(view_select_select1);
	var view_select_select1_opt2 = $('<option>').html("내용2").appendTo(view_select_select1);
	var view_select_select1_opt3 = $('<option>').html("내용3").appendTo(view_select_select1);
	var view_select_select1_opt4 = $('<option>').html("내용4").appendTo(view_select_select1);
	var view_select_select1_opt5 = $('<option>').html("내용5").appendTo(view_select_select1);
	
	var view_select_select2 = $('<select>').appendTo(view_select);
	var view_select_select2_opt1 = $('<option>').html("내용1").appendTo(view_select_select2);
	var view_select_select2_opt2 = $('<option>').html("내용2").appendTo(view_select_select2);
	var view_select_select2_opt3 = $('<option>').html("내용3").appendTo(view_select_select2);
	var view_select_select2_opt4 = $('<option>').html("내용4").appendTo(view_select_select2);
	var view_select_select2_opt5 = $('<option>').html("내용5").appendTo(view_select_select2);
	
	var view_select_a = $('<a>').html("보기").appendTo(view_select);
	//var img_logo = $('<img>', {'class':'logo', id:'logo'}).attr({src: '/fs/image/class/teacher/footer_logo.png'}).appendTo(footer);
	var usher_logo = $('<img>', {'id':'teacher_footer_logo'}).attr({src: '/fs/image/common/footer/usher_logo.png'}).css({marginLeft: '30px', cursor: 'pointer'}).appendTo(footer);
	var fileUpload = $('<img>', {'id':'teacher_footer_file_upload'}).attr({src: '/fs/image/common/footer/b1.png'}).css({marginLeft: '15px', cursor: 'pointer'}).appendTo(footer);
	var chromeDown = $('<img>').attr({src: '/fs/image/common/footer/b2.png'}).css({marginLeft: '15px', cursor: 'pointer'}).appendTo(footer);
	var uTube = $('<img>').attr({src: '/fs/image/common/footer/b3.png'}).css({marginLeft: '15px', cursor: 'pointer'}).appendTo(footer);
	usher_logo.on('click', function(){
		window.open('http://usher.co.kr/');
	});
	chromeDown.on('click', function(){
		window.open('https://www.google.com/');
	})
	uTube.on('click', function(){
		window.open('https://www.youtube.com/?gl=KR&hl=ko');
	})
	fileUpload.on('click', function(){
		var _this = this;
		var wOpt = {
				size: {w: 344, h: 44},
				pos: {
					mode: false
				},
				border: '2px',
				borderColor: '#e6dfc1',
				boxRadius: '5px',
				boxBgColor: '#ffffff',
				boxBgImage: '',
				boxShadow : false,
				wrapBgColor: '#e6dfc1',
				wrapOpacity: 0.6,
				tick: 20,
				effectTerm: 0.06,
				boxId: 'oriImg',
				wrapId: 'oriImgWrap',
		
				closeBtn: {
					mode: false,
				},
				wrapClose: true,
				
			};
		
		var vp = shine.window.showPopup(wOpt);
		
		var file = $('<div>', {'class': 'file_pop_wrap'}).appendTo(vp);
		$('<input type="file" id="file1">').css({position: 'absolute', left: '10px', top: '10px'}).appendTo(file);
		var fileSendBtn = $('<div>', {'id':'fileSendBtn'}).css({position: 'absolute', borderRadius: '3px', cursor: 'pointer', left: '296px', top: '10px', height: '22px', lineHeight: '22px', width: '32px', border: '1px solid #000000', backgroundColor: '#4CFF93'}).html("전송").appendTo(file);
		fileSendBtn.on('click', function(){
			vp.close();
			teacherPdf.uploadDoc();
		});
		
	});
});
