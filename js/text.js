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
        ctx.fillStyle = "#fff";
        if (this.x > 1600) ctx.fillStyle = "#f00";
        ctx.font = `${config.text.style} ${config.text.size}px '${config.text.font}'`;
        ctx.fillText(this.text, this.x, this.y);
    }
}

$(document).keypress(button =>  {input += button.key; })

$(document).keydown(button => {

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
})

function remove(word, point = false) {
    for (let index = 0; index < words.length; index++) {
        if (words[index].text == word) {
            if (point) score += word.length;
            words.splice(index, 1);
            return;
        }
    }
}

function check(word) {
    if(input="start" && !GameStarted) GameState("Game");
    input = ""
    remove(word, true);
    updateDisplay();
}

function wordPassed(element) {
    lives--;
    remove(element.text);
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