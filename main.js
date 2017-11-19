var mediaSource = new MediaSource();

mediaSource.addEventListener('sourceopen', handleSourceOpen, false);
//初始化
var mediaRecorder, recordeBlobs, sourceBuffer;
var sourceVideo = document.getElementById('source');
var recordButton = document.getElementById('record');

//重录制按钮事件绑定
recordButton.onclick = toggleRecording;

var constraints = {audio: true, video: {width: 320}};

function handleSuccess(stream) {
	recordButton.disabled = false;
	window.stream = stream;
	sourceVideo.srcObject = stream;
}

navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);
function handleSourceOpen(event) {
	sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs='vp8);
}

function handleDataAvailabel(event) {
	if (event.data && event.data.size > 0) {
		//将数据追加到录制中
		recordedBlobs.push(event.data);
	}
}

function toggleRecording() {
	if (recordButton.textContent === '开始录制') {
		startRecording();
	}else {
		stopRecording();
		recordButton.textContent = '开始录制';
	}
}
//开录
function startRecording() {
	recordedBlobs = [];
	var mimeTypes = [
	'viedo/webm;codecs=vp9',
	'video/webm;codecs=vp8',
	'video/webm'];

	var mimeType = mimeTypes.find(type=>MediaRecorder.isTypeSupported(type) || '');
	try {
		mediaRecorder = new MediaRecorder(window.stream, ( mimeType ));
	} catch(e) {
		alert('创建媒体录制器异常' + options.mimeType);
		return;
	}
		recordButton.textContent = '停止录制';
		mediaRecorder.ondataavailable = handleDataAvailable;
		mediaRecorder.start(10);
}
//停录
function stopRecording() {
	mediaRecorder.stop();
		var buf = new Blob(recordedBlobs, { type: 'video/webm'});
		//设置已录制的视频源为录制好的视频
		recordedVideo.src = window.URL.createObjectURL(buf);
}
