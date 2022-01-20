song = "";
leftWristX = 0;
rightWristX = 0;
leftWristY = 0;
rightWristY=0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
function preload(){
    song = loadSound("music.mp3");
}
function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);   
}
function draw(){
    image(video, 0, 0, 600, 500);
    fill("red");
    stroke("red");
    if(scoreRightWrist>0.2){
        circle(rightWristX, rightWristY, 20);
    
    
    if(rightWristY>0 && rightWristY<=100){
        document.getElementById("status").innerHTML = "status = 0.5X";
        song.rate(0.5);
    }
    else if(rightWristY>100 && rightWristY<=200){
        document.getElementById("status").innerHTML = "status = 1X";
        song.rate(1);
    }
    else if(rightWristY>200 && rightWristY<=300){
        document.getElementById("status").innerHTML = "status = 1.5X";
        song.rate(1.5);
    }
    else if(rightWristY>300 && rightWristY<=400){
        document.getElementById("status").innerHTML = "status = 2X";
        song.rate(2);
    }
    else if(rightWristY>400 && rightWristY<=500){
        document.getElementById("status").innerHTML = "status = 2.5X";
        song.rate(2.5);
    }
}
    if(scoreLeftWrist>0.2){
        circle(leftWristX, leftWristY, 20);
        InNumberleftWristY = Number(leftWristY);
        remove_decimals = floor(InNumberleftWristY);
        volume = remove_decimals/500;
        document.getElementById("volume").innerHTML = "volume is"+volume;
        song.setVolume(volume);
    }
   
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function modelLoaded(){
    console.log("poseNet is initialized");
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("score right wrist = "+scoreRightWrist);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("score left wrist = "+scoreLeftWrist);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("right wrist x ="+rightWristX+"right wrist y ="+rightWristY);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("left wrist x ="+leftWristX+"left wrist y ="+leftWristY);
    }
}