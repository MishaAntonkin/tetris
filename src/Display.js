import React from 'react';
import './Display.css';
import { FIELD_HEIGHT, FIELD_WIDTH, GAME_END_LINE } from './constants';


function Display({ matrix }) {
  const display_cell = (x, y) => {
    try {
      return <div key={[x, y].join(',')} className={`td ${matrix[x][y].color}`}/>;
    } catch(e) {
      console.error(x, y);
      return <div key={[x, y].join(',')} className="td red"/>;
    }
  }
  const display_row = (y) => {
    const res = [];
    for (let x = 0; x < FIELD_WIDTH; x++) {
      res.push(display_cell(x, y));
    }
    return (<div className={y === GAME_END_LINE ? 'tr bordered': 'tr'} key={y}>{res}</div>);
  };
  const display_table = () => {
    const res = [];
    for (let y = FIELD_HEIGHT - 1; y >= 0; y--) {
      res.push(display_row(y));
    }
    return res;
  }

  return (
    <div className="table" >
    {matrix.length ? display_table() : null}
    </div>
  );
}

export { Display };
