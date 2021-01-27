import { FIELD_HEIGHT, FIELD_WIDTH, LINE_SCORES, MAX_SCORE, GAME_END_LINE } from '../constants';
import { FRAMES, LEFT_KEY, RIGHT_KEY, DOWN_KEY, ROTATE_KEY } from '../settings';
import { createRandomFigure } from './figures';


const allowedKeys = [LEFT_KEY, RIGHT_KEY, DOWN_KEY, ROTATE_KEY];


class TetrisGame {
  constructor(changeMatrix, changeScore) {
    this.matrix = Array(FIELD_WIDTH).fill(null).map(() => Array(FIELD_HEIGHT).fill(0));
    this._interval = null;
    this._figure = null;
    this._last_value = null;
    this._loop_counter = 0;
    this._changeMatrix = changeMatrix;
    this._changeScore = changeScore;
    this._score = 0;
  }

  set interval(val) {
    this._interval = val;
  }

  iterLoop = () => {
    if (this._last_value && this._figure) {
      switch (this._last_value) {
        case LEFT_KEY: this._figure.moveLeft(); break;
        case RIGHT_KEY: this._figure.moveRight(); break;
        case DOWN_KEY: this._figure.moveDown(); break;
        case ROTATE_KEY: this._figure.leftRotate(); break;
        default: console.warn('not existed key handler');
      }
      if (this._figure.shouldStop()) {
        this._figure = null;
        this.deleteLines();
        this.checkGameEnd();
      }
    }
    this._last_value = null;

    this._loop_counter += 1;
    if (this._loop_counter % FRAMES === 0) {
      if (this._figure) {
        this._figure.moveDown();
        if (this._figure.shouldStop()) {
          this._figure = null;
          this.deleteLines();
          this.checkGameEnd();
        }
      } else {
        this._figure = createRandomFigure(this.matrix);
      }
    }

    this.matrix = [...this.matrix]; // react count on reference equality, so we have to copy array
    this._changeMatrix(this.matrix);
    this._changeScore(this._score);
  }

  copy_line = (from ,to) => {
    for (let i_x = 0; i_x < FIELD_WIDTH; i_x++) {
      this.matrix[i_x][to] = this.matrix[i_x][from];
      this.matrix[i_x][from] = 0;
    }
  }

  deleteLines = () => {
    let scores = 0;
    // go through all lines
    const x_lines_full = [];
    for (let i_y = 0; i_y < FIELD_HEIGHT; i_y++) {
      let filled_dots = 0;
      for (let i_x = 0; i_x < FIELD_WIDTH; i_x++) {
        const val = this.matrix[i_x][i_y];
        if (!val) {
          break;
        } else {
          filled_dots += 1;
        }
      }
      if (filled_dots === FIELD_WIDTH) {
        x_lines_full.push(i_y);
      }
    }
    // count scores
    let prev_line = -1, lines_in_row = 1;
    for (const i_y of x_lines_full) {
      if (prev_line === -1) {
      } else if (i_y === prev_line + 1) {
        lines_in_row += 1;
      } else {
        scores += LINE_SCORES[lines_in_row] || MAX_SCORE;
        lines_in_row = 1;
      }
      prev_line = i_y;
    }
    scores += LINE_SCORES[lines_in_row] || MAX_SCORE;
    // make them empty
    for (const i_y of x_lines_full) {
      for (let i_x = 0; i_x < FIELD_WIDTH; i_x++) {
        this.matrix[i_x][i_y] = 0;
      }
    }
    // fall down not full lines
    // const search_from, lines_to_fill;
    if (!x_lines_full.length) {
      return;
    }

    let search_from, lines_to_fill = x_lines_full[0];
    search_from = lines_to_fill + 1;
    for (;search_from < FIELD_HEIGHT; search_from++) {
      for (let i_x = 0; i_x < FIELD_WIDTH; i_x++) {
        if (this.matrix[i_x][search_from]) {
          // copy from line to line
          this.copy_line(search_from, lines_to_fill);
          lines_to_fill += 1;
          break;
        }
      }
    }
    this._score += scores;
  }

  checkGameEnd = () => {
    // check 17 hor
    // if some dot end the game
    for (let i_x = 0; i_x < FIELD_WIDTH; i_x++) {
      if (this.matrix[i_x][GAME_END_LINE]) {
        this.stopLoop();
        return;
      }
    }
  }

  continueLoop = () => {
    if (!this._interval) {
      this.interval = setInterval(this.iterLoop, 1000 / FRAMES);
    }
  }

  stopLoop = () => {
    if (this._interval) {
      clearInterval(this._interval);
      this._interval = null;
    }
  }

  addEventListeners = () => {
    window.addEventListener('keydown', this.handleKeyPress, false);
  }

  removeEventListeners = () => {
    window.removeEventListener('keydown', this.handleKeyPress, false);
  }

  endGame = () => {
    this.stopLoop();
    this.removeEventListeners();
  }

  handleKeyPress = (e) => {
    if (allowedKeys.includes(e.key)) {
      this._last_value = e.key;
    }
    e.stopPropagation();
  }
}


export function startLoop(changeMatrix, changeScore) {
  const game = new TetrisGame(changeMatrix, changeScore);
  game.interval = setInterval(game.iterLoop, 1000 / FRAMES);
  game.addEventListeners();
  return game;
}
