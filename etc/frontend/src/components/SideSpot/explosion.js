import Particle from "./particle";

/**
 * Creates and handles all the particles created for the sub spot/flair
 * explosions.
 *
 * @author Oliver Lillie
 */
export default class Explosion {

    /**
     * Sets up the default settings for the particles in the explosion.
     * Then the particles are
     *
     * @author Oliver Lillie
     * @param {{x:number, y:number, particleCount:number, decay:number, size:number, spring:number, friction:number, canvasContext:CanvasRenderingContext2D}} options
     */
    constructor(options) {
        const { x, y, particleCount, decay, size, spring, friction, canvasContext } = options;

        this.origin = { x, y };
        this.decay = decay;
        this.size = size;
        this.spring = spring;
        this.friction = friction;
        this.canvasContext = canvasContext;
        this._buildParticles(particleCount);
    }

    /**
     * Initialises all the particles and pushes them into the internal array for
     * processing during update and drawing.
     *
     * @author Oliver Lillie
     * @param {number} particleCount The number of particles to create in the
     *  explosion.
     * @private
     */
    _buildParticles(particleCount) {
        this.particles = [];

        for (let i = 0; i < particleCount; i++) {
            this.particles.push(
                new Particle({
                    origin: this.origin,
                    size: this.size,
                    decay: this.decay,
                    spring: this.spring,
                    friction: this.friction,
                    canvasContext: this.canvasContext
                })
            );
        }
    }

    /**
     * Determines if the number of particles left in the explosion is 0. This
     * occurs over time as the particles are removes when they get to a certain
     * value.
     *
     * @author Oliver Lillie
     * @return {boolean}
     */
    isEmpty() {
        return this.particles.length === 0;
    }

    /**
     * Loops through all the particles and updates each position.
     *
     * @author Oliver Lillie
     */
    update() {
        this.particles.forEach((particle, index) => {
            particle.update();

            if (particle.randomInt < .5) {
                this.particles.splice(index, 1);
            }
        });
    }

    /**
     * Loops through the particles and tells each of them to redraw.
     *
     * @author Oliver Lillie
     */
    draw() {
        this.particles.forEach((particle) => particle.draw());
    }
}