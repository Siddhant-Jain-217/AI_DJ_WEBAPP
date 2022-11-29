song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristY = 0;
rightWristX = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
song1_status = "";
song2_status = "";


function preload() {
   song1 = loadSound("music.mp3");
   song2 = loadSound("Kesariya(PagalWorld.com.se).mp3");
}


function setup() {
 canvas = createCanvas(600, 500);
 canvas.center();

 video = createCapture(VIDEO);
 video.hide();

 poseNet = ml5.poseNet(video, modelLoaded);
 poseNet.on('pose', gotPoses);
}

function gotPoses(results) {
 if(results.length > 0)
 {
   scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreLeftWrist);

        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log(scoreRightWrist);

  console.log(results);
  console.log( "scoreRightWrist" + scoreRightWrist+"scoreLeftWrist = " + scoreLeftWrist);
  leftWristX = results[0].pose.leftWrist.x;
  leftWristY = results[0].pose.leftWrist.y;
  console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY );

  rightWristX = results[0].pose.rightWrist.x;
  rightWristY = results[0].pose.rightWrist.y;
  console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY );
 }
}

function modelLoaded() {
 console.log('Posenet is Initialized');
}

function draw() {
 image(video, 0, 0, 600, 500);
 fill('#FF0000');
 stroke('#FF0000');

 if (scoreRightWrist > 0.2 ) {
    circle(rightWristX,rightWristY,20)
 song1.stop()
 if (song2_status == false) {
    song2.play();
    document.getElementById("song").innerHTML = "Playing song Kesariya";
 }
 }
 
 if(scoreLeftWrist > 0.2){
   circle(leftWristX,leftWristY,20);
   song2.stop();
   if(song1_status == false){

       song1.play();
       document.getElementById("song").innerHTML = "Playing song Tusme pyaar Karke"
       
   }
}  
}



function play() {
 song1.play(); 
}



