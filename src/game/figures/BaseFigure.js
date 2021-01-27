import { FIELD_HEIGHT, FIELD_WIDTH } from '../../constants';

export class BaseFigure {
  shape = []
  coordinates = []

  constructor(matrix, x, y, color) {
    this.matrix = matrix;
    this.coordinates = [x, y];
    this.color = color;
  }

  leftRotate() {
    // new shape
    const old_shape_x = this.shape.length, old_shape_y = this.shape[0].length;
    const new_shape_x = old_shape_y, new_shape_y = old_shape_x;
    const new_shape = Array(new_shape_x).fill(null).map(() => Array(new_shape_y).fill(0));
    const max_shape = Array(Math.max(new_shape_x, old_shape_x))
      .fill(null).map(() => Array(Math.max(new_shape_y, old_shape_y)).fill(0));
    for (let [x, y, val] of this.shape_gen()) {
      if (val) {
        const new_x = Math.abs(new_shape_x - y - 1), new_y = x;
        new_shape[new_x][new_y] = val;
        max_shape[new_x][new_y] = val;
      }
    }
    // new shape diffs
    const diff_pos_not_exists = []; // dots which not exists in prev shape, but exists in new one
    const diff_pos_exists = [];  // dots which exists in prev shape. but not exists in new one
    for (let [x, y, val] of this.shape_gen(max_shape)) {
      if (this.shape[x] === undefined || this.shape[x][y] === undefined) {
        if (val) {
          diff_pos_not_exists.push([x, y]);
        }
      } else if (this.shape[x][y] !== val) {
        if (this.shape[x][y]) {
          diff_pos_exists.push([x, y]);
        } else {
          diff_pos_not_exists.push([x, y]);
        }
      }
    }
    // diffs is empty
    const [coordinate_x, coordinate_y] = this.coordinates;
    for (let [x, y] of diff_pos_not_exists) {
      const check_x = x + coordinate_x, check_y = y + coordinate_y;
      if (!(check_x in this.matrix) || !(check_y in this.matrix[check_x])
        || this.matrix[check_x][check_y]) {
        return;
      }
    }
    // delete old figure
    for (const [x, y] of diff_pos_exists) {
      this.matrix[coordinate_x + x][coordinate_y + y] = 0;
    }
    // write new figure
    for (const [x, y] of diff_pos_not_exists) {
      this.matrix[coordinate_x + x][coordinate_y + y] = this.color;
    }
    this.shape = new_shape;
  }

  moveLeft() {
    const [x] = this.coordinates;
    return this._move_x_axis(-1, x - 1);
  }

  moveRight() {
    const [x] = this.coordinates;
    return this._move_x_axis(1,this.shape.length + x);
  }

  moveDown() {
    const [x, y] = this.coordinates;
    if (y === 0) {
      return;
    }
    const new_y = y - 1;
    this._change_figure_pos(x, y, x, new_y);
  }

  shouldStop() {
    const { matrix, coordinates: [c_x, c_y] } = this;
    const handledX = [];
    for (const [x, y, val] of this.shape_gen()) {
      if (!handledX.includes(x) && val) {
        if (c_y + y === 0 || matrix[x + c_x][c_y + y - 1]) {
          return true;
        }
        handledX.push(x);
      }
    }
  }

  _move_x_axis(delta_x, edge_check) {
    const [x, y] = this.coordinates;
    const matrix = this.matrix;
    const new_x = x + delta_x;
    if (!(new_x in matrix) || !(edge_check in matrix)) {
      return;
    }
    const y_length = this.shape[0].length;
    for (let i_y = 0; i_y < y_length; i_y++) {
      const val = this.matrix[edge_check][i_y + y];
      if (val) {
        return;
      }
    }
    this._change_figure_pos(x, y, x + delta_x, y);
  }

  *shape_gen(shape) {
    shape = shape || this.shape;
    const x_length =shape.length;
    const y_length = shape[0].length;
    for (let i_x = 0; i_x < x_length; i_x++) {
      for (let i_y = 0; i_y < y_length; i_y++) {
        yield [i_x, i_y, shape[i_x][i_y]];
      }
    }
  }

  _change_figure_pos(old_x, old_y, new_x, new_y) {
    for (let [x, y, val] of this.shape_gen()) {
      if (val) {
        this.matrix[old_x + x][old_y + y] = 0;
      }
    }
    for (let [x, y, val] of this.shape_gen()) {
      if (val) {
        this.matrix[new_x + x][new_y + y] = this.color;
      }
    }
    this.coordinates = [new_x, new_y];
  }

  placeFigure() {
    let x, y;
    const x_length = this.shape.length;
    const y_length = this.shape[0].length;
    y = FIELD_HEIGHT - y_length;
    x = Math.floor((FIELD_WIDTH - x_length) / 2);
    for (let [i_x, i_y, val] of this.shape_gen()) {
      if (val) {
        this.matrix[x + i_x][y + i_y] = this.color;
      }
    }
    this.coordinates = [x, y];
  }
}
