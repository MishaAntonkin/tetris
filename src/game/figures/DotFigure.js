import { BaseFigure } from './BaseFigure';


export class DotFigure extends BaseFigure {
  shapeName = 'dot'

  constructor(matrix, x, y, color) {
    super(matrix, x, y, color);
    this.shape = [[1]];
    this.placeFigure();
  }

  leftRotate() {}
}
