export const FRAMES = 30;

export const LEFT_KEY = 'ArrowLeft';
export const RIGHT_KEY = 'ArrowRight';
export const DOWN_KEY = 'ArrowDown';
export const ROTATE_KEY = 'r';

export let FALLING_SPEED = {};
for (let i = 1; i <= 25; i++) {
    FALLING_SPEED[FRAMES * 10 * i] = FRAMES - i;
}
