class Star{

    constructor()
    {
        this.reset();
        this.x = Math.random()*canvas.width;
    }

    reset()
    {
        this.y = Math.random()* canvas.height;
        this.z = Math.floor(Math.random()*(config.stars.maxSize-config.stars.minSize))+config.stars.minSize;
        this.x = -this.z;
        if(config.stars.rainbow)
        {
            let r = Math.floor(Math.random()*255);
            r = r.toString(16);
            if(r.length == 1) r = "0"+r;

            let g = Math.floor(Math.random()*255);
            g = g.toString(16);
            if(g.length == 1) g = "0"+g;

            let b = Math.floor(Math.random()*255);
            b = b.toString(16);
            if(b.length == 1) b = "0"+b;

            let hex = "#"+r+g+b;
            this.fillStyle = hex;
        }
        else this.fillStyle = config.stars.color;
    }
    
    update(dt)
    {
        this.x+=this.z*.1*dt;

        if(this.x > canvas.width+this.z)
            this.reset();
    }

    draw()
    {
        ctx.fillStyle = this.fillStyle;
        ctx.fillRect(this.x, this.y, this.z, this.z);
    }
}
