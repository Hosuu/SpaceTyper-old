class Star {

    constructor() {
        this.reset();
        this.x = Math.random() * canvas.width;
    }

    reset() {
        this.y = Math.random() * canvas.height;
        this.z = Math.floor(Math.random() * (config.stars.maxSize - config.stars.minSize)) + config.stars.minSize;
        this.x = -this.z;
        if (config.stars.rainbow) this.fillStyle = randomHexColor();
        else this.fillStyle = config.stars.color;
    }

    update(dt) {
        this.x += this.z * .1 * dt;

        if (this.x > canvas.width + this.z)
            this.reset();
    }

    draw() {
        ctx.fillStyle = this.fillStyle;
        ctx.fillRect(this.x, this.y, this.z, this.z);
    }
}

//Stars
function reRenderStars() {
    for (let i = 0; i < config.stars.count; i++) {
        stars[i] = new Star();
    }
}