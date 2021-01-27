import React, { useEffect, useState } from 'react';
import { Display } from './Display';
import { startLoop } from './game';
import { GAME_STATE_COLOR_MAPPING } from './enums';
import { LEFT_KEY, RIGHT_KEY, DOWN_KEY, ROTATE_KEY } from './settings';


function App() {
  let [matrix, changeMatrix] = useState([]);
  const [scores, changeScore] = useState(0);
  const [game, changeGame] = useState(null);

  useEffect(() => {
    changeGame(startLoop(changeMatrix, changeScore));
  }, []);

  const displayMatrix = matrix.map(
    sub_list => sub_list.map(
      el => ({color: GAME_STATE_COLOR_MAPPING[el]})
      )
  );

  const handleRestartGame = () => {
    game.endGame();
    changeGame(startLoop(changeMatrix, changeScore));
  };

  return (
    <div className="App">
      <header className="header">
        <h1>
          Tetris game
        </h1>
      </header>
      <div className="container">
        <Display matrix={displayMatrix} />
      </div>
      <div className="controls">
        <p className="scores">Scores: {scores}</p>
        <button className="restart-btn" onClick={handleRestartGame}>Restart</button>
        <div className="controls-btn">
          <h3 className="header-controls">Control buttons: </h3>
          <p className="control-rules"><span className="key">{ ROTATE_KEY }</span> - rotate figure</p>
          <p className="control-rules"><span className="key">{ LEFT_KEY }</span> - move figure left</p>
          <p className="control-rules"><span className="key">{ RIGHT_KEY }</span> - move figure right</p>
          <p className="control-rules"><span className="key">{ DOWN_KEY }</span> - move figure down</p>
        </div>
      </div>
    </div>
  );
}

export default App;
