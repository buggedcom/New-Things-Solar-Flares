/**
 * Thrown when some request input isn't correct.
 *
 * @author Oliver Lillie
 */
export default class ValidationError extends Error {
    constructor(message) {
        super(message);

        Object.setPrototypeOf(this, ValidationError.prototype);
    }
}
