/** @typedef {{x: Number, y: Number, z: Number}} Vector3 */

/**
 * Enum for directions.
 * @enum {Vector3}
 */
export const Directions = {
    /** @type {Vector3} @readonly */
    Up: {x: 0, y: 1, z: 0},
    /** @type {Vector3} @readonly */
    Down: {x: 0, y: -1, z: 0},
    /** @type {Vector3} @readonly */
    North: {x: 0, y: 0, z: -1},
    /** @type {Vector3} @readonly */
    South: {x: 0, y: 0, z: 1},
    /** @type {Vector3} @readonly */
    East: {x: 1, y: 0, z: 0},
    /** @type {Vector3} @readonly */
    West: {x: -1, y: 0, z: 0}
}

/**
 * Stringifies the given vector.
 * @param {Vector3} v 
 * @returns {String}
 */
export function stringifyVec(v) {
    const {x,y,z} = v;
    return [x,y,z].join(' ');
}

/**
 * Returns the floor of the components of `v`.
 * @param {Vector3} v 
 * @returns {Vector3}
 */
export function floor(v) {
    return {
        x: Math.floor(v.x),
        y: Math.floor(v.y),
        z: Math.floor(v.z),
    };
}

/**
 * Returns the ceiling of the components of `v`.
 * @param {Vector3} v 
 * @returns {Vector3}
 */
export function ceil(v) {
    return {
        x: Math.ceil(v.x),
        y: Math.ceil(v.y),
        z: Math.ceil(v.z),
    };
}

/**
 * Returns the vector addition `u` + `v`.
 * @param {Vector3} u 
 * @param {Vector3} v 
 * @returns {Vector3}
 */
export function add(u, v) {
    return {
        x: u.x + v.x,
        y: u.y + v.y,
        z: u.z + v.z
    };
}

/**
 * Returns the vector subtraction `u` - `v`.
 * @param {Vector3} u 
 * @param {Vector3} v 
 * @returns {Vector3}
 */
export function sub(u, v) {
    return {
        x: u.x - v.x,
        y: u.y - v.y,
        z: u.z - v.z
    };
}