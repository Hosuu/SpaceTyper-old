const canvas = document.getElementById("game-screen");
const ctx = canvas.getContext('2d');

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
}

class Star{

    constructor()
    {
        this.reset();
        this.x = Math.random()*800;
    }

    reset()
    {
        this.y = Math.random()* canvas.height;
        this.z = Math.random()*4+1;
        this.x = -this.z;
    }
    
    update(dt)
    {
        this.x+=this.z*.1*dt;

        if(this.x > canvas.width+this.z)
            this.reset();
    }

    draw()
    {
        ctx.fillStyle ="#fff";
        ctx.fillRect(this.x, this.y, this.z, this.z);
    }
}

class Text{
    
    constructor(word)
    {
        this.x = 0;
        this.y = Math.random()*canvas.height;
        this.word = word;
    }

    update(dt)
    {
        this.x+=.1*dt;
    }

    draw()
    {
        ctx.fillStyle = "#fff";
        ctx.font = "20px Arial";
        ctx.fillText(this.word,this.x,this.y);
    }
}

stars = [];
for (let i = 0; i < 10; i++) {
    stars[i] = new Star(); 
}

words = [];
function write(word)
{
    words.push(new Text(word));
}

function check(word)
{
    for (let check = 0; check < words.length; check++) 
    {
        if(words[check].word == word) return words.splice(check,1);      
    }
}

setInterval(() => {
    write(wordsbase[Math.floor(Math.random()*wordsbase.length)])
}, 1000);



wordsbase = ["lol", "rofl", "xD"]