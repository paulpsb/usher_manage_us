var audio_context;
var recorder;

function startUserMedia(stream) {
	var input = audio_context.createMediaStreamSource(stream);
    //input.connect(audio_context.destination);
    recorder = new Recorder(input);
    console.log(recorder);
}

function startRecording(button) {
	recorder && recorder.record();
	//button.disabled = true;
	//button.nextElementSibling.disabled = false;
}

function stopRecording(button) {
	recorder && recorder.stop();
	console.log(recorder);
    //button.disabled = true;
    //button.previousElementSibling.disabled = false;
    sendFile();
    recorder.clear();
}

function startVoiceRec(){
	try{
		window.AudioContext = window.AudioContext || window.webkitAudioContext;
	    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
	    window.URL = window.URL || window.webkitURL;
	    audio_context = new AudioContext;
	}
	catch(e){
		alert('No web audio support in this browser!');
	}
	    
	navigator.getUserMedia({audio: true}, startUserMedia, function(e) {

	});
	
}

function sendFile() {
	recorder && recorder.exportWAV(function(blob) {
	   	var formData = new FormData();
	    formData.append('audio_blob', blob);
        xhr(formData, function(_rs){
        	console.log(_rs);
			// 성공시 제거
        });
        function xhr(data, callback) {
            var request = new XMLHttpRequest();
            request.onreadystatechange = function() {
                if (request.readyState == 4 && request.status == 200) {
                    callback(request.responseText);
                }
            };
            
            request.open('POST', "/api/async/record.php");
            request.send(data);
        }
 	});
}