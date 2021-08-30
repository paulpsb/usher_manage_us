$(document).ready(function(e){
	var footer = $('#footer')
	.css({position: "absolute", bottom: "0px", height: "49px", lineHeight: "49px", borderTop: "1px solid #888", background: "#ccc", width: "100%"});
	
	var table1 = $("<table>").attr({width: '100%', cellpadding: '0', cellspacing: '0'}).css({tableLayout: 'fixed'}).appendTo(footer);
	var tr1 = $('<tr>').appendTo(table1);
	
	var td1 = $('<td>').attr({height: '49', width: '40', align: 'left'}).css({paddingLeft: '10px', fontSize: '16px', fontWeight: 'bold'}).text("사전").appendTo(tr1);
	
	var td2 = $('<td>').attr({width: '180'}).appendTo(tr1);
	var td2_input = $('<input type="text" placeholder="ex) apple">').css({height: "22px", border: "1px solid #888", width: "175px", fontSize: "14px", color: '#A20000', textIndent: '2px', fontWeight:' bold'}).appendTo(td2);
	
	var td3 = $('<td>').attr({width: '70'}).appendTo(tr1);
	var td3_input = $('<input type="button" class="btn1">').val("찾기").appendTo(td3);
	
	var td4 = $('<td>').attr({width: '260', align: 'center'}).appendTo(tr1);
	var td4_input = $('<input type="text" placeholder="검색 결과">').css({height: "22px", border: "1px solid #888", width: "240px", fontSize: "14px", color: '#A20000', textIndent: '2px', fontWeight:' bold'}).appendTo(td4);
	
	var td5 = $('<td>').attr({width: '100', align: 'center'}).appendTo(tr1);
	var td5_input = $('<input type="button" class="btn1">').val("자세히보기").appendTo(td5);
	
	var td6 = $('<td>').attr({align: 'left'}).appendTo(tr1);
	var td6_input = $('<input type="button" class="btn1" id="tail_question">').val("질문하기").appendTo(td6);
	
	
	var td7 = $('<td>').attr({width: '130', align: 'right'}).css({paddingRight: '10px'}).appendTo(tr1);
	var td7_input = $('<input type="button" class="btn2">').val("END (00:00:00)").appendTo(td7);
	
});
