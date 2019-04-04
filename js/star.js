class Star{

    constructor()
    {
        this.reset();
        this.x = Math.random()*canvas.width;
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
