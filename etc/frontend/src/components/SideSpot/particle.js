const colors = [
    "#6a3700",
    "#e4a200",
    "#c77113",
    "#a66103",
    "#a66a33",
    "#FD5039",
    "#c1772e",
    "#FF6540",
    "#f93801"
];

/**
 * This is the class that makes the particles for the flair/spot explosion.
 *
 * @author Oliver Lillie
 */
export default class Particle {

    /**
     * Returns a random integer from between a given range.
     *
     * @author Oliver Lillie
     * @param {number} min
     * @param {number} max
     * @return {number}
     */
    static randomIntFromInterval(min, max) {
        return ~~(Math.random() * (max - min + 1) + min);
    }

    /**
     * The particles constructor sets up various settings for when the particle
     * is updated and drawn.
     *
     * @author Oliver Lillie
     * @param {{size:{string}, origin:{x:number, y:number}, decay:number, spring:number, friction:number, canvasContext:CanvasRenderingContext2D}} options
     */
    constructor(options) {
        const {
            size,
            origin,
            decay,
            spring,
            friction,
            canvasContext,
        } = options;

        this.decay = decay || .95;
        this.spring = spring || 0.5;
        this.size = size || 100;
        this.friction = friction || 0.2;
        this.canvasContext = canvasContext;

        this.randomInt = Particle.randomIntFromInterval(10, 70);
        const radius = this.size - this.randomInt;
        this.angle = Math.random() * 2 * Math.PI;

        this.pos = {
            x: origin.x + this.randomInt * Math.cos(this.angle),
            y: origin.y + this.randomInt * Math.sin(this.angle),
        };

        this.dest = {
            x: origin.x + radius * Math.cos(this.angle),
            y: origin.y + radius * Math.sin(this.angle),
        };

        this.color = colors[~~(Math.random() * colors.length)];

        this.vel = {
            x: 0,
            y: 0
        };
    }

    /**
     * Updates the position values of the particle acording to the given initial
     * settings - but does not redraw it year onto the canvas.
     *
     * @author Oliver Lillie
     */
    update() {
        const dx = (this.dest.x - this.pos.x);
        const dy = (this.dest.y - this.pos.y);

        this.vel.x += dx * this.spring;
        this.vel.y += dy * this.spring;

        this.vel.x *= this.friction;
        this.vel.y *= this.friction;

        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;

        if (this.randomInt > 0) {
            this.randomInt *= this.decay;
        }
    }

    /**
     * Draws the updated particle position onto the canvas.
     *
     * @author Oliver Lillie
     */
    draw() {
        this.canvasContext.fillStyle = this.color;
        this.canvasContext.beginPath();
        this.canvasContext.arc(this.pos.x, this.pos.y, this.randomInt, 0, 2 * Math.PI);
        this.canvasContext.fill();
    }

}