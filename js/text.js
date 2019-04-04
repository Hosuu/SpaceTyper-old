class Text{
    
    constructor(word)
    {
        this.x = -100;
        this.y = Math.random()*(canvas.height-48)+24;
        this.text = word;
    }

    update(dt)
    {
        this.x+=.1*dt;

        if(this.x > canvas.width)
        {
            wordPassed(this);
        }
            
    }

    draw()
    {
        ctx.fillStyle = "#fff";
        if(this.x > 1600) ctx.fillStyle = "#f00";
        ctx.font = "20px Arial";
        ctx.fillText(this.text,this.x,this.y);
    }
}

var words = [];

function write(word){ 
    words.push(new Text(word));
}

function remove(word, point=false)
{
    for (let index = 0; index < words.length; index++) 
    {
        if(words[index].text == word)
        {
            if(point) score+=word.length;
            words.splice(index,1);
            return; 
        } 
    }
}

function check(word)
{
    input=""
    remove(word,true);
    updateDisplay();
}

function wordPassed(element){
    lives--;
    remove(element.text);
    updateDisplay();
}