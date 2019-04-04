const canvas = document.getElementById("game-screen");
const ctx = canvas.getContext('2d');

//Game Variables
var input = "";

var diff= 0;

var score = 0;
var lives = 3;

var stars = [];

var startDate = Date.now();

//Delta Time tick
var lastUpdate = Date.now();
setInterval(tick, 0);
function tick() {
    let now = Date.now();
    let dt = now - lastUpdate;
    lastUpdate = now;

    //Clear canvas
    ctx.fillStyle = "#000"
    ctx.clearRect(0,0, canvas.width, canvas.height);

    // Render stars
    stars.forEach(star => {
        star.update(dt);
        star.draw();
    });

    //Render words
    words.forEach(word => {
        word.update(dt);
        word.draw();
    });

    $('#time').html(`${Math.floor((Date.now()-startDate)/60000)}:${Math.floor(((Date.now()-startDate)/1000)%60)}`)
}


$(document).keypress(button =>{
    input+=button.key;
    updateDisplay();
})

$(document).keydown(button =>{

    if(button.key == "Backspace"){
        event.preventDefault();
        input=input.slice(0,input.length-1);
    }
    if(button.key == "Enter" || button.key == " "){
        event.preventDefault();
        check(input);
    }

    updateDisplay(); 
})

function updateDisplay(){
    $('#score').html(score);
    $('#input').html(input);
    $('#lives').html(lives);
}

//Spawners
    //words
    setInterval(() => {
        write(wordsbase[diff].words[Math.floor(Math.random()*wordsbase[diff].words.length)])
    }, 1000);

    //Stars
    for (let i = 0; i < 50; i++) {
        stars[i] = new Star(); 
    }