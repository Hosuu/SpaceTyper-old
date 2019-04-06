const canvas = document.getElementById("game-screen");
const ctx = canvas.getContext('2d');

config={
    
    game:
    {
        difficulty: 3,
        backgroundColor: "#050505",

    },

    text:
    {
        font: "Comfortaa",
        size: 24,
        style: "bold italic",   
    },

    stars:
    {
        render: true,
        count: 120,
        minSize: 4,
        maxSize: 6,
        color: "#fff",
        rainbow: true,
    }
}

loadFont();

function loadFont()
{
    WebFont.load({
        google: {
            families: [config.text.font]
        }
    });
}


//Game Variables
var input = "";

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
    ctx.fillStyle = config.game.backgroundColor;
    ctx.fillRect(0,0, canvas.width, canvas.height);

    // Render stars
    if(config.stars.render)
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
    // new Audio(sfx.typing).play();
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
        write(wordsbase[config.game.difficulty].words[Math.floor(Math.random()*wordsbase[config.game.difficulty].words.length)])
    }, 1000);

    //Stars
    function reRenderStars()
    {
        for (let i = 0; i < config.stars.count; i++) {
            stars[i] = new Star(); 
        }
    }
    reRenderStars();
    