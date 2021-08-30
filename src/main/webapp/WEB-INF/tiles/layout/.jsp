<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1">
		<title>Usher Institute</title>

		<!-- include common vendor stylesheets -->
		<link rel="stylesheet" type="text/css" href="/common/modules/bootstrap/dist/css/bootstrap.css">
		<link rel="stylesheet" type="text/css" href="/common/modules/fortawesome/fontawesome-free/css/fontawesome.css">
		<link rel="stylesheet" type="text/css" href="/common/modules/fortawesome/fontawesome-free/css/regular.css">
		<link rel="stylesheet" type="text/css" href="/common/modules/fortawesome/fontawesome-free/css/brands.css">
		<link rel="stylesheet" type="text/css" href="/common/modules/fortawesome/fontawesome-free/css/solid.css">

		<!-- include vendor stylesheets used in "Form Elements" page. see "application/views/default/pages/partials/form-elements/@vendor-stylesheets.hbs" -->
		<link rel="stylesheet" type="text/css" href="/common/modules/nouislider/distribute/nouislider.min.css">
		<link rel="stylesheet" type="text/css" href="/common/modules/ion-rangeslider/css/ion.rangeSlider.min.css">
		<link rel="stylesheet" type="text/css" href="/common/modules/tiny-date-picker/tiny-date-picker.css">
		<link rel="stylesheet" type="text/css" href="/common/modules/tiny-date-picker/date-range-picker.css">
		<link rel="stylesheet" type="text/css" href="/common/modules/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css">
		<link rel="stylesheet" type="text/css" href="/common/modules/bootstrap-colorpicker/dist/css/bootstrap-colorpicker.css">
		<link rel="stylesheet" type="text/css" href="/common/dist/css/ace-font.css">
		<link rel="stylesheet" type="text/css" href="/common/dist/css/ace.css">
		<!-- "Form Elements" page styles specific to this page for demo purposes -->
		
		<!-- include common vendor scripts used in demo pages -->
		<script type="text/javascript" src="/common/modules/jquery/dist/jquery.js"></script>

	</head>
		<script>
			function disableEnterKey(e)
			{
				var key;
				if(window.event)
				{
					key = window.event.keyCode;     //IE
				}else{
					 key = e.which;     //firefox (97)
				}
				if (e.ctrlKey){
					return false;	
				}
				
				if (e.altKey){
					return false;	
				}

				if (key >= 112 && key <= 123) {
					key = 0;
					return false;
				}
				if (key == 92 || key == 93) {
					return false;
				}
				return true;
			}
			function disable_copy(e)
			{
				var elemtype = e.target.nodeName;
				var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
				elemtype = elemtype.toUpperCase();
				var checker_IMG = '';
				if (elemtype == "IMG" && checker_IMG == 'checked' && e.detail >= 2) 
				{
						return false;
				}
				if (elemtype != "TEXT" && elemtype != "TEXTAREA" && elemtype != "INPUT" && elemtype != "PASSWORD" && elemtype != "SELECT" && elemtype != "OPTION" && elemtype != "EMBED")
				{
					if (isSafari){
						return true;
					}else{
						return false;
					}				
				}
			}
			function disable_copy_ie()
			{
				var elemtype = window.event.srcElement.nodeName;
				elemtype = elemtype.toUpperCase();
				if (elemtype == "IMG") {
					return false;
				}
				if (elemtype != "TEXT" && elemtype != "TEXTAREA" && elemtype != "INPUT" && elemtype != "PASSWORD" && elemtype != "SELECT" && elemtype != "OPTION" && elemtype != "EMBED")
				{
					return false;
				}
			}
			function reEnable()
			{
				return true;
			}
			document.onkeydown = disableEnterKey;
			document.onselectstart = disable_copy_ie;
			if(navigator.userAgent.indexOf('MSIE')==-1)
			{
				document.onmousedown = disable_copy;
				document.onclick = reEnable;
			}
			function disableSelection(target)
			{
				//For IE This code will work
				if (typeof target.onselectstart!="undefined")
				{
					target.onselectstart = disable_copy_ie;
				}else if (typeof target.style.MozUserSelect!="undefined"){//For Firefox This code will work
					target.style.MozUserSelect="none";
				}else{//All other  (ie: Opera) This code will work
					target.onmousedown=function(){
						return false;
					}
					target.style.cursor = "default";
					
				}
			}
			//Calling the JS function directly just after body load
			window.onload = function(){
				disableSelection(document.body);
			};
			
			document.ondragstart = function() { 
				return false;
			}
			
			function nocontext(e) {
				return false;
			}
			document.oncontextmenu = nocontext;
			
		</script>	
	<body>
		<div class="body-container">
			<tiles:insertAttribute name="header" />
			<div class="main-container">
				<div role="main" class="main-content">
					<tiles:insertAttribute name="content" />
					<tiles:insertAttribute name="footer" />
				</div>
			</div>
		</div>
		<script type="text/javascript" src="/common/modules/popper.js/dist/umd/popper.js"></script>
		<script type="text/javascript" src="/common/modules/bootstrap/dist/js/bootstrap.js"></script>
		
		
		<!-- include vendor scripts used in "Form Elements" page. see "application/views/default/pages/partials/form-elements/@vendor-scripts.hbs" -->
		<script type="text/javascript" src="/common/modules/autosize/dist/autosize.js"></script>
		<script type="text/javascript" src="/common/modules/bootstrap-maxlength/bootstrap-maxlength.js"></script>
		
		<script type="text/javascript" src="/common/modules/inputmask/dist/jquery.inputmask.js"></script>
		
		
		<script type="text/javascript" src="/common/modules/nouislider/distribute/nouislider.js"></script>
		<script type="text/javascript" src="/common/modules/ion-rangeslider/js/ion.rangeSlider.js"></script>
		
		
		<script type="text/javascript" src="/common/modules/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.js"></script>
		
		
		<script type="text/javascript" src="/common/modules/tiny-date-picker/dist/date-range-picker.js"></script>
		<script type="text/javascript" src="/common/modules/moment/moment.js"></script>
		<script type="text/javascript" src="/common/modules/eonasdan-bootstrap-datetimepicker/src/js/bootstrap-datetimepicker.js"></script>
		
		
		<script type="text/javascript" src="/common/modules/bootstrap-colorpicker/dist/js/bootstrap-colorpicker.js"></script>
		
		<script type="text/javascript" src="/common/modules/es6-object-assign/dist/object-assign-auto.js"></script>
		<script type="text/javascript" src="/common/modules/jaames/iro/dist/iro.js"></script>
		
		<script type="text/javascript" src="/common/modules/sweetalert2/dist/sweetalert2.all.js"></script>
		
		
		<script type="text/javascript" src="/common/modules/jquery-knob/dist/jquery.knob.min.js"></script>
		
		
		<!-- include Ace script -->
		<script type="text/javascript" src="/common/dist/js/ace.js"></script>
		
		
		<script type="text/javascript" src="/common/assets/js/demo.js"></script>
		<script type="text/javascript" src="/common/js/common.js"></script>
		<script type="text/javascript" src="/common/js/md5.js"></script>
		<!-- this is only for Ace's demo and you don't need it -->
	</body>
</html>