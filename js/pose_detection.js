// varients for video
var hz = document.getElementById("hz");
var canvas_hz = document.createElement('canvas_hz');

// varients for webcam
var video = document.getElementById('webcam');
var canvas = document.createElement('canvas');


// canvas size
canvas.width = video.offsetWidth;
canvas.height = video.offsetHeight;
canvas_hz.width = hz.offsetWidth;
canvas_hz.height = hz.offsetHeight;

// varients for detecting 17 keypoints of pose in frame
// let detectorConfig, detector, context;
let detectorConfig, detector;


// video play and pause
function playHz() { 
    hz.play();
  } 
  function pauseHz() { 
    hz.pause(); 
  } 


// called automatically when the page is loaded
window.onload = async function () {
    // detect poses
    detectorConfig = {modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING};
    detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig); 
    
    // feed webcam
    navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
        console.log('webcam works!')
        console.log(stream)
        video.srcObject = stream;
    })
    .catch(function (err0r) {
        console.log("Something went wrong!");
    });

    window.requestAnimationFrame(capture);
}


async function capture() {
    // context 용도 다시 찾기 - 아마 오버레이용 같은데 호출되는 곳 없어서 안 쓰임
    var context = canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    const poses = await detector.estimatePoses(canvas);
    console.log(poses);
    window.requestAnimationFrame(capture);
}