import { BaseFigure } from './BaseFigure';


export class LFigure extends BaseFigure {
  shapeName = 'l-figure'

  constructor(matrix, x, y, color) {
    super(matrix, x, y, color);
    this.shape = [[1, 1, 1], [1, 0, 0]];
    this.placeFigure();
  }
}
