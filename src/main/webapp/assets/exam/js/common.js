function cfmLogin()
{
	location.replace("/main/login.do");
}

function cfmLogout()
{
	location.replace("/main/logout.do");
}

function cfmRegister()
{
	window.open('http://www.usher.co.kr/bbs/register.php','Modify','width=1150,height=700,toolbars=no,resizable=yes,scrollbars=yes');
}
function cfmPage(write_pages, cur_page, total_page, fnName)
{
	var vHtml = "";
	vHtml += '<div class="col-lg-12 mt-20">';
	vHtml += '<nav>';
	vHtml += '<ul class="pagination justify-content-center">';
	var start_page = (parseInt((cur_page - 1 ) / write_pages))* write_pages + 1;
	var end_page = start_page + write_pages - 1;
	
	if (end_page >= total_page) end_page = total_page;
	
	if(start_page > 1){
		vHtml += '<li class="page-item"><a href="javascript:'+fnName+'('+(start_page-1)+');" class="page-link">Previous</a></li>';
	}
	
	if (total_page > 1) {
        for(var k=start_page;k<=end_page;k++) {
            if(cur_page != k){
            	vHtml += '<li class="page-item"><a href="javascript:'+fnName+'('+k+');" class="page-link">'+k+'</a></li>';
            }else{
            	vHtml += '<li class="page-item active"><a href="javascript:'+fnName+'('+k+');" class="page-link">'+k+'</a></li>';
            }
        }
    }
	
	if (total_page > end_page){
		vHtml += '<li class="page-item"><a href="javascript:'+fnName+'('+(end_page+1)+');" class="page-link">Next</a></li>';
	}
	vHtml += '</ul>';
	vHtml += '</nav>';
	vHtml += '</div>';
	return vHtml;
}

function cfmNumberCommaWon( number )
{
	if(!number) return number;
	
	if( String(number).length > 3 )
	{
		var nArr = String(number).split('').join(',').split('');
		for( var i=nArr.length-1, j=1; i>=0; i--, j++)  if( j%6 != 0 && j%2 == 0) nArr[i] = '';
		return nArr.join('');
	}
	else return number+"원";
}

function isBrowserCheck(){ 
	const agt = navigator.userAgent.toLowerCase(); 
	if (agt.indexOf("chrome") != -1) return true; 
	if (agt.indexOf("opera") != -1) return true; 
	if (agt.indexOf("safari") != -1) return true;
	return false;
}

function cfmShowLoadingBar() { 
	var maskHeight = $(document).height(); 
	var maskWidth = window.document.body.clientWidth; 
	var mask = "<div id='mask' style='position:absolute; z-index:9999; background-color:#000000; display:none; left:0; top:0;'></div>"; 
	var loadingImg = ''; 
	loadingImg += "<div id='loadingImg' style='position:absolute; left:50%; top:40%; display:none; z-index:10000;'>"; 
	loadingImg += " <img src='/images/loading.gif'/>"; 
	loadingImg += "</div>"; 
	
	$('body').append(mask).append(loadingImg); 
	$('#mask').css({ 'width' : maskWidth , 'height': maskHeight , 'opacity' : '0.3' }); 
	$('#mask').show(); $('#loadingImg').show(); 
}

function cfmHideLoadingBar() { 
	$('#mask, #loadingImg').hide(); 
	$('#mask, #loadingImg').remove(); 
}

function cfmNvl2(value, defaultValue)
{
	var result = false;
	if(!value){
		result =  true;
	}	
	if( value == "" ) {
		result =  true;
	}
	if( value == "null" ) {
		result =  true;
	}
	
	if( value == null ) {
		result =  true;
	}
	
	if( /^\s+$/.test(value) ) {
		value = "";
		result =  true;
	}
	if(result)
	{
		return defaultValue;
	}else{
		return value;
	}
	
}



function cfmNvl1(value)
{
	var result = false;
	if(!value){
		result =  true;
	}
	if( value == "" ) {
		result =  true;
	}
	if( value == "null" ) {
		result =  true;
	}
	
	if( value == null ) {
		result =  true;
	}
	
	if( /^\s+$/.test(value) ) {
		value = "";
		result =  true;
	}
	if(result)
	{
		return "";
	}else{
		return value;
	}
	
}

jQuery(document).ready(function(){
	if(!isBrowserCheck()){
		alert("사용 할 수 없는 브라우저입니다.\n크롬 다운로드 페이지로 이동합니다.");
		location.replace("https://www.google.co.kr/chrome/");
	}
});