var teacherPdf = {
		uploadDoc: function(){
				var formData = new FormData();
			    formData.append('file1', $( '#file1' )[0].files[0]);
			    xhr(formData, function(_rs){
			    	var ifr = $('<iframe>').css({width: '100%', height: '780px', position: 'absolute', left: '0px', top: '20px', zIndex: 0, opacity: 0.5}).appendTo($('#wrap'));
					var data = eval('('+_rs+')');
					var xBtn = $('<div>').html("X").css({position: 'absolute',lineHeight: '20px', cursor: 'pointer', top: '23px', left: '98%', width: '20px', height: '20px', border: '1px solid #000000'}).appendTo($('#wrap'));
					xBtn.on('click', function(){
						ifr.remove();
						this.remove();
					});
					ifr.attr({src: data.data.urlpath+data.data.filename});
			    	
			    });
			    function xhr(data, callback) {
			        var request = new XMLHttpRequest();
			        request.onreadystatechange = function() {
			            if (request.readyState == 4 && request.status == 200) {
			                callback(request.responseText);
			            }
			        };
			        
			        request.open('POST', "/api/async/uploadPdf.php");
			        request.send(data);
				
				}
		}
}