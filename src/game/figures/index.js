import { FIGURE_COLOR_NUMBERS } from '../../enums';
import { FIELD_HEIGHT, FIELD_WIDTH } from '../../constants';
import { DotFigure } from './DotFigure';
import { SquareFigure } from './SquareFigure';
import { LightningFigure } from './LightningFigure';
import { LineFigure } from './LineFigure';
import { LFigure } from './LFigure';


const figureMapping = {
  dot: DotFigure,
  square: SquareFigure,
  lightning: LightningFigure,
  'l-figure': LFigure,
  line: LineFigure,
}


export function createFigure(figure, gameMatrix, x, y, color) {
  return new figureMapping[figure](gameMatrix, x ,y, color);
}


export function createRandomFigure(gameMatrix) {
  const figuresKeys = Object.keys(figureMapping);
  const figureName = figuresKeys[Math.floor(Math.random() * figuresKeys.length)];
  const color = FIGURE_COLOR_NUMBERS[Math.floor(Math.random() * FIGURE_COLOR_NUMBERS.length)];
  return createFigure(figureName, gameMatrix, Math.floor(FIELD_WIDTH / 2), FIELD_HEIGHT - 1, color);
}
