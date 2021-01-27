import { BaseFigure } from './BaseFigure';


export class SquareFigure extends BaseFigure {
  shapeName = 'square'

  constructor(matrix, x, y, color) {
    super(matrix, x, y, color);
    this.shape = [[1, 1], [1, 1]];
    this.placeFigure();
  }

  leftRotate() {}
}
