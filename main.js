var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition;

function start() {
    document.getElementById("textbox").innerHTML = "";
    recognition.start();
    
}

recognition.onresult = function(event){
    console.log(event);
    Content = event.results[0][0].transcript;
    console.log(Content);

    document.getElementById("textbox").innerHTML = Content;
    if (Content == "take my selfie") {
        console.log("taking your selfie in 5 seconds");
        speak();
    }
    
}

function speak() {
    var synth = window.speechSynthesis;
    var speech_data = "Taking Your Selfie In 5 Seconds";
    var utter_this = new SpeechSynthesisUtterance(speech_data);
    console.log(utter_this);
    synth.speak(utter_this);
    Webcam.attach(camera);

    setTimeout(function(){
        take_snapshot();
        save();
    },5000);
}

Webcam.set({
    width:360,
    height: 250,
    image_format: 'png',
    png_quality: 90
});

var camera = document.getElementById("camera");

function take_snapshot(){
    Webcam.snap(function(data_url){
        document.getElementById("output").innerHTML = "<img id='selfie_img' src="+data_url+">";
    });
}

function save() {
    link = document.getElementById("link");
    img = document.getElementById("selfie_img").src;
    link.href = img;
    link.click();
}