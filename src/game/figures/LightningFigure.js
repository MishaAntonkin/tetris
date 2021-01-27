import { BaseFigure } from './BaseFigure';


export class LightningFigure extends BaseFigure {
  shapeName = 'lightning'
  constructor(matrix, x, y, color) {
    super(matrix, x, y, color);
    this.shape = [[1, 1, 0], [0, 1, 1]];
    this.placeFigure();
  }
}
