import { BaseFigure } from './BaseFigure';


export class LineFigure extends BaseFigure {
  shapeName = 'line'

  constructor(matrix, x, y, color) {
    super(matrix, x, y, color);
    this.shape = [[1, 1, 1]];
    this.placeFigure();
  }
}
