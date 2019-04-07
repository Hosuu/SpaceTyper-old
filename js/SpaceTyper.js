const canvas = document.getElementById("game-screen");
const ctx = canvas.getContext('2d');

var GameStarted = false;
var score = 0;
var lives = 0;
var gameStartDate = 0;
var input = "";
var stars = [];

config = {

    game: {
        difficulty: 0,
        backgroundColor: "#050505",

    },

    text: {
        font: "Comfortaa",
        size: 24,
        style: "bold italic",
    },

    stars: {
        render: true,
        count: 120,
        minSize: 4,
        maxSize: 6,
        color: "#ccc",
        rainbow: false,
    }
}

GameState("Paused");
reRenderStars();

//Delta Time tick
var lastUpdate = Date.now();
setInterval(tick, 0);
function tick() {
    let now = Date.now();
    let dt = now - lastUpdate;
    lastUpdate = now;

    //Clear canvas
    ctx.fillStyle = config.game.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //Update UI
    updateDisplay();
    if(GameStarted) updateTimer();
    //Render stars
    if (config.stars.render)
        stars.forEach(element => {
            element.update(dt);
            element.draw();
        });
    //Render words
    if(GameStarted)
    {
        words.forEach(element => 
            {
                element.update(dt);
                element.draw();
            });

        textDelayUpdate(dt);
    }
    else
    {
        ctx.font = `${config.text.style} ${config.text.size*2}px '${config.text.font}'`;
        ctx.fillText('Type "start" to start the game', 620, 700);
        ctx.fillStyle = difficulty[config.game.difficulty].color;
        ctx.fillText("Difficulty: "+difficulty[config.game.difficulty].name, 750, 100);
    }

    if(lives==0)
    GameState("Gameover");
}

function updateDisplay() {
    $('#score').html(score);
    $('#input').html(input);
    $('#lives').html(lives);
}

function updateTimer(){
    let seconds = Math.floor((Date.now()-gameStartDate)/1000 )%60;
    let minutes = Math.floor((Date.now()-gameStartDate)/60000)%60;
    
    seconds = "00"+seconds.toString();
    minutes = "00"+minutes.toString();

    $('#time').html(`${minutes.slice(-2)}:${seconds.slice(-2)}`)
}

function GameState(state)
{
    switch(state){
        case "Game":
        $('.bar:nth-of-type(1)').html('<div class="bar-item size-1"><i class="fas fa-heart"></i> <span id="lives"></span> Lives</div><div id="score" class="bar-item size-4"></div><div class="bar-item size-1"><i class="far fa-clock"></i> <span id="time"></span></div>');
        
        gameStartDate = Date.now();

        score = 0;
        lives = difficulty[config.game.difficulty].lives;

        GameStarted = true;
        break;

        case "Gameover":
        GameStarted = false;
        gameEndDate= Date.now();

        break;

        case "Paused":
        GameStarted = false;
        $('.bar:nth-of-type(1)').html('<div class="bar-item size-1" style="letter-spacing: 3px; font-size: 6vh"><i class="fas fa-keyboard"></i> SpaceTyper</div>');
        words=[];
        break;
    } 
}