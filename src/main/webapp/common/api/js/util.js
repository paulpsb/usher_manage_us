var util = {};
util.movePage = function(url, page){
	$("<input type='hidden' name='page'>").val(page).appendTo($('#pageFrm'));
	$('#pageFrm').submit();
};
function makeDigit(num){
	if(num<10){
		num = "0"+num;
	}
	else{
		num = ""+num;
	}
	return num;
}
util.number_style = {
		toStr: function(x){
			return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		},
		toInt: function(x){
		    return parseInt(x.split(",").join(""));
		}
};

var ex_map = {'1':'A','2':'B','3':'C','4':'D','5':'E','6':'F'};
