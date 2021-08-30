
$(document).ready(function(e){
	
	var param = {course_subject_name: $('#p_title').val()};
	
	
	
	var header = $("<div>", {id: 'tap_wrap'}).css({width: '100%', margin: '0 auto', overflowX: 'auto'}).prependTo('#contents');
	var ul1 = $("<ul>", {'class': 'tap result_tap_1'}).css({padding: '20px', margin: '0 auto'}).appendTo(header);
	//var ul2 = $("<div>", {'class': 'tap result_tap_1'}).css({width: '100%', padding: '20px'}).appendTo(header);
	
	var tot_width = 0;
	function studyListCallBack(_rs){
		if(_rs.error == API_SUCCESS){
			console.log(_rs);
			var data1 = _rs.data.BEFORE;
			var data2 = _rs.data.AFTER;	
			function makeLink(obj, link){
				obj.on('click', function(e){
					if(link){
						pageMove(link, true);
					}
				});
			}
			for(var i=0;i<data1.length;i++){
				var li1 = $('<li>').css({float: 'left', listStyle: 'none', border: '1px solid', marginRight: '10px', fontSize: '13px', padding: '3px 5px'}).appendTo(ul1);
				var a1 = $('<a>').appendTo(li1);
				var span1 = $('<span>').appendTo(a1);
				//span1.html(data1[i].course_name+"("+data1[i].course_subject_name+")");
				span1.html(data1[i].course_name);
				if(i==data1.length-1){
					li1.css({marginRight: '40px'});
				}
				console.log(li1.width());
				tot_width = tot_width + li1.width()+50;
				makeLink(span1, data1[i].link)
			}
			tot_width = tot_width + 40;
			for(var i=0;i<data2.length;i++){
				var li1 = $('<li>').css({float: 'left', listStyle: 'none', border: '1px solid', marginRight: '10px', fontSize: '13px', padding: '3px 5px'}).appendTo(ul1);
				var a1 = $('<a>').appendTo(li1);
				var span1 = $('<span>').appendTo(a1);
				//span1.html(data2[i].course_name+"("+data2[i].course_subject_name+")");
				span1.html(data2[i].course_name);
				tot_width = tot_width + li1.width()+10;
				makeLink(span1, data2[i].link)
			}
			ul1.css({width: tot_width+'px'});
			
		}
		
	}
	requestApi('POST', apiList('studyList'), param, studyListCallBack);
	
	
	
});