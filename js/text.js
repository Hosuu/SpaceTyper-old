class Text {

    constructor(word) {
        this.x = -100;
        this.y = Math.random() * (canvas.height - config.text.size * 2) + config.text.size;
        this.text = word;
    }

    update(dt) {
        this.x += .1* difficulty[config.game.difficulty].textSpeed * dt;

        if (this.x > canvas.width) {
            wordPassed(this);
        }

    }

    draw() {
        ctx.fillStyle = config.text.color;
        if (this.x > 1600) ctx.fillStyle = config.text.highlightColor;

        ctx.font = `${textStyle()}${config.text.size}px '${config.text.font}'`;
        ctx.fillText(this.text, this.x, this.y);
    }
}

$(document).keypress(button =>  {
    if($("input").is(":focus")) return;
    input += button.key; 
});

$(document).keydown(button => {

    if($("input").is(":focus")) return;

    if (button.key == "Backspace") {
        event.preventDefault();
        input = input.slice(0, input.length - 1);
    }
    else
    if (button.key == "Enter" || button.key == " ") {
        event.preventDefault();
        check(input);
    }
    else
    if(button.key == "F1"){
        event.preventDefault();
        reRenderStars();
    }
});

function check(word) {
    if(input="start" && !GameStarted) GameState("Game");
    input = ""

    if(words.find( ({text}) => text == word) != undefined ) {
        words.splice(words.findIndex( ({text}) => text == word), 1);
        score+=word.length;
    }
    updateDisplay();
}

function wordPassed(element) {
    lives--;
    words.splice(words.findIndex( ({text}) => text == element.text), 1);
    updateDisplay();
}

var words = [];
var textDelay = 1000;

function textDelayUpdate(dt)
{
    textDelay-=dt;
    if(textDelay <= 0)
    {
        textDelay=difficulty[config.game.difficulty].baseInterval-Math.floor((Date.now()-gameStartDate)/1000);
        words.push(new Text(difficulty[config.game.difficulty].words[Math.floor(Math.random() * difficulty[config.game.difficulty].words.length)]));
    }
}