/**
 * Thrown when something is trying to set a value onto an object using a setter
 * that isn't supported.
 *
 * @author Oliver Lillie
 */
export default class UnsettableProperty extends Error {
    constructor(message) {
        super(message);

        Object.setPrototypeOf(this, UnsettableProperty.prototype);
    }
}