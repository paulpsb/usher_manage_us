var array_junior= [
	"U",
	"S",
	"H",
	"E",
	"R"
];


var array_senior= [
	"완초1",
	"완초2",
	"Intermediate",
	"K1",
	"K2"
];

var array_speech_part = [
    'a',
    'ad',
    'aux. v',
    'conj',
    'n',
    'phr',
    'prep',
    'pron',
    'v'
];


jQuery(document).ready(function(){
	$("#search_student_name_school").keydown(function(key) {
		if (key.keyCode == 13) {
			cfmSearchStudentSchool();
		}

	});
});

function cfmSearchStudentSchool()
{
	var v_search_name = $("#search_student_name_school").val();
	if(v_search_name.length >= 2){
		location.href = "/main/search_student.do?student_name="+v_search_name;
	}else{
		alert("2글자 이상 입력하세요.");
	}
}
function cfmLogout()
{
	location.replace("/logout.do");
}

function cfmGetToMonth()
{
	var today = new Date();   

	var year = today.getFullYear(); // 년도
	var month = today.getMonth() + 1;  // 월
	
	var ret = year+"년 ";
	if(month < 10){
		ret = ret+"0"+month+"월";
	}else{
		ret = ret+month+"월";
	}
	
	return ret;
}

function cfmGetToDefaultMonth()
{
	var today = new Date();   

	var year = today.getFullYear(); // 년도
	var month = today.getMonth() + 1;  // 월
	
	var ret = year+"- ";
	if(month < 10){
		ret = ret+"0"+month;
	}else{
		ret = ret+month;
	}
	
	return ret;
}

function cfmGetToDate()
{
	var today = new Date();   

	var year = today.getFullYear(); // 년도
	var month = today.getMonth() + 1;  // 월
	var date = today.getDate();  // 날짜
	
	var ret = year+"-";
	if(month < 10){
		ret = ret+"0"+month+"-";
	}else{
		ret = ret+month+"-";
	}

	if(date < 10){
		ret = ret+"0"+date;
	}else{
		ret = ret+date;
	}
	
	return ret;
}

function cfmDateChar(vDate, vFormat)
{
	if(!vFormat) vFormat = "yyyy-mm-dd";
	
    var yyyy = vDate.getFullYear().toString();
    var mm = (vDate.getMonth() + 1).toString();
    var dd = vDate.getDate().toString();
    
	if(vFormat == "yyyy-mm-dd"){
	    return yyyy + "-" + (mm[1] ? mm : "0" + mm[0]) + "-" + (dd[1] ? dd : "0" + dd[0]);
	}else if(vFormat == "yyyy-mm"){
		return yyyy + "-" + (mm[1] ? mm : "0" + mm[0]);
	}
	
	return yyyy + (mm[1] ? mm : "0" + mm[0]) + (dd[1] ? dd : "0" + dd[0]);;
}

function cfmDateFormat(vDate, vFormat)
{
	if(!vFormat) vFormat = "K";
	
	var strArray = vDate.split("-");
	if(vFormat == "K"){
		return strArray[0]+"년 "+strArray[1]+"월 "+strArray[2]+"일";
	}
	
	return vDate;
}

function cfmSetCookie(name, value, expires, path, domain, secure) 
{
    if (!path) {
        path = "/";
    }
    document.cookie = name + "=" + escape (value) +
                    ((expires) ? "; expires=" + expires : "") +
                    ((path) ? "; path=" + path : "") +
                    ((domain) ? "; domain=" + domain : "") +
                    ((secure) ? "; secure" : "");
}

function cfmGetCookie(name)
{
    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    while (i < clen) {
        var j = i + alen;
        if (document.cookie.substring(i, j) == arg) {
            return _getCookieVal(j);
        }
        i = document.cookie.indexOf(" ", i) + 1;
        if (i == 0) break;
    }
    return "";	
}
 
function _getCookieVal(offset)
{
    var endstr = document.cookie.indexOf (";", offset);
    if (endstr == -1) {
        endstr = document.cookie.length;
    }
    return unescape(document.cookie.substring(offset, endstr));
}

function cfmDeleteCookie(name, path, domain)
{
    if (!path) {
        path = "/";
    }
    if (cfmGetCookie(name)) {
        document.cookie = name + "=" +
            ((path) ? "; path=" + path : "") + 
            ((domain) ? "; domain=" + domain : "") + 
            "; expires=Thu, 01-Jan-70 00:00:01 GMT";
    }
	
}

function cfmGetExpDate(days, hours, minutes) {
    var expDate = new Date( );
    if (typeof days == "number" && typeof hours == "number" &&
        typeof hours == "number") {
        expDate.setDate(expDate.getDate( ) + parseInt(days));
        expDate.setHours(expDate.getHours( ) + parseInt(hours));
        expDate.setMinutes(expDate.getMinutes( ) +
        parseInt(minutes));
        return expDate.toGMTString( );
    }
}

function cfmAddDate(date, nDays) {
	var sDate = cfmGetDigit(date);
    var yy = parseInt(sDate.substr(0, 4), 10);
    var mm = parseInt(sDate.substr(4, 2), 10);
    var dd = parseInt(sDate.substr(6, 2), 10);

    d = new Date(yy, mm - 1, dd + nDays);

    yy = d.getFullYear();
    mm = d.getMonth() + 1; mm = (mm < 10) ? '0' + mm : mm;
    dd = d.getDate(); dd = (dd < 10) ? '0' + dd : dd;

    return '' + yy + '-' +  mm  + '-' + dd;

}

function cfmGetDigit(str){
	var res;
    res = str.replace(/[^0-9]/g,"");
    return res;
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

function cfmZeroSpace(value)
{
	if(parseInt(value) == 0){
		return "";
	}
	
	return value;
}

function cfmNullToZero(value)
{
	if(value){
		return value;
	}
	
	return "0";
}


function cfmPage(write_pages, cur_page, total_page, fnName)
{
	var vHtml = "";
	
	var start_page = (parseInt((cur_page - 1 ) / write_pages))* write_pages + 1;
	var end_page = start_page + write_pages - 1;
	
	if (end_page >= total_page) end_page = total_page;
	
	if(start_page > 1){
		vHtml += '<li class="page-item"><a href="javascript:'+fnName+'('+(start_page-1)+');" class="page-link"><</a></li>';
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
		vHtml += '<li class="page-item"><a href="javascript:'+fnName+'('+(end_page+1)+');" class="page-link">></a></li>';
	}
	
	return vHtml;
}

function cfmCalcMonth(sDate, eDate)
{
	if(!sDate) return 0;
	if(!eDate) return 0;
	
    var ar1 = sDate.split('-');
    var ar2 = eDate.split('-');
    //var da1 = new Date(ar1[0], ar1[1], ar1[2]);
    //var da2 = new Date(ar2[0], ar2[1], ar2[2]);
    var da1 = new Date(ar1[0], ar1[1], 1);
    var da2 = new Date(ar2[0], ar2[1], 1);
    var dif = da2 - da1;
    var cDay = 24 * 60 * 60 * 1000;// 시 * 분 * 초 * 밀리세컨
    var cMonth = cDay * 30;// 월 만듬
    var cYear = cMonth * 12; // 년 만듬
    
    var vMonth = parseInt(dif/cMonth);
    if(ar1[2] < ar2[2]) vMonth++;
    //return parseInt(dif/cMonth);
    return vMonth;
}

function cfmLpad(str, padLen, padStr) {
	if(padStr == " ") padStr = "&nbsp;";
	var fLen = str.length;
	if(fLen >= padLen) return str;
	var cLen = padLen - fLen;
	for(var i=0; i<cLen; i++)
	{
		str = padStr + str;
	}
    
    return str;
    
	/*
    if (padStr.length > padLen) {
        console.log("오류 : 채우고자 하는 문자열이 요청 길이보다 큽니다");
        return str;
    }
    str += ""; // 문자로
    padStr += ""; // 문자로
    while (str.length < padLen)
        str = padStr + str;
    str = str.length >= padLen ? str.substring(0, padLen) : str;
    return str;
    */
}

function cfmLpadNull(str, padLen, padStr) {
	var fLen = str.length;
	if(fLen >= padLen) return str;
	var cLen = padLen - fLen;
	for(var i=0; i<cLen; i++)
	{
		str = padStr + str;
	}
    
    return str;
}

function cfmShowLoadingBar() { 
	var maskHeight = $(document).height(); 
	var maskWidth = window.document.body.clientWidth; 
	var mask = "<div id='mask' style='position:absolute; z-index:9000; background-color:#000000; display:none; left:0; top:0;'></div>"; 
	var loadingImg = ''; 
	loadingImg += "<div id='loadingImg' style='position:absolute; left:50%; top:40%; display:none; z-index:10000;'>"; 
	loadingImg += " <img src='/assets/img/loading.gif'/>"; 
	loadingImg += "</div>"; 
	
	$('body').append(mask).append(loadingImg); 
	$('#mask').css({ 'width' : maskWidth , 'height': maskHeight , 'opacity' : '0.3' }); 
	$('#mask').show(); $('#loadingImg').show(); 
}

function cfmHideLoadingBar() { 
	$('#mask, #loadingImg').hide(); 
	$('#mask, #loadingImg').remove(); 
}

function cfmRemoveZeroToFloat(number){
	var tmp = number + "";
	if(tmp.indexOf(".") != -1){
		number = number.toFixed(2);
		number = number.replace(/(0+$)/, "");
	}
	return number;
}

function cfmBooleanToChar(isValue)
{
	if(isValue) return "1";
	
	return "0";
}

function cfmNumberToComma(vValue)
{
	if(!vValue) return "";
	
	return vValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}