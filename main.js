musicone = "";
musictwo = "";
playing = "";  
playing2 = "";
rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload(){
    musicone = loadSound("musicone.mp3");
    musictwo = loadSound("musictwo.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses)
}

function modelLoaded(){
    console.log("model loaded!");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreLeftWrist = "+scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log("leftwristX = "+leftWristX+"  leftwristY = "+leftWristY);
        console.log("rightwristX = "+rightWristX+"  rightwristY = "+rightWristY);
    }
}

function draw(){
    image(video, 0, 0, 600, 500);

    fill("#ff0000");
    stroke("#ff0000");
    playing = musicone.isPlaying();
    playing2 = musictwo.isPlaying();

    if(scoreLeftWrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        musictwo.stop();
        if(playing = "false"){
            musicone.play();
        }
    }
    if(scoreRightWrist > 0.2){
        circle(rightWristX, rightWristY, 20);
        musicone.stop();
        if(playing2 = "false"){
            musictwo.play();
        }
    }
}