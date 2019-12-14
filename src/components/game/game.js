import React from 'react';
import Score from '../score/score';
import GameGrid from '../game-grid/game-grid';
import Status from '../status/status';
import MatchStatus from '../match-status/match-status';
import './game.css';

function Game() {
  return (
    <div className="game animated zoomIn fast">
      <Score />
      <GameGrid />
      <Status />
      <MatchStatus />
    </div>
  )
}

export default Game;