import React, { useContext } from 'react';
import GameStateContext, { GAME_STATE, GAME_STATE_ACTION_TYPE } from '../../contexts/gameState';
import './status.css';

function Status() {
  const [gameState, dispatchGameState] = useContext(GameStateContext);

  function reset() {
    dispatchGameState({
      type: GAME_STATE_ACTION_TYPE.RESET,
    });
  }

  function phrase() {
    if (gameState.matchState !== GAME_STATE.MATCH_IN)
      return `${gameState.score.you} : ${gameState.score.opponent}`;
    
    switch (gameState.state) {
      case GAME_STATE.IDLE:
        return 'Let\'s go!';
      case GAME_STATE.YOUR_TURN:
        return 'Your turn!';
      case GAME_STATE.WIN:
        return 'Victory!';
      case GAME_STATE.DEFEAT:
        return 'You were defeated!';
      case GAME_STATE.DRAW:
        return 'It\'s a draw!';
      default:
        return '';
    }
  }

  function ResetButton() {
    if (gameState.matchState !== GAME_STATE.MATCH_IN)
      return null;
    
    switch (gameState.state) {
      case GAME_STATE.WIN:
        return (
          <button
            onClick={reset}
            className="status__reset-btn"
          >
            Play again!
          </button>
        );
      case GAME_STATE.DEFEAT:
        return (
          <button
            onClick={reset}
            className="status__reset-btn status__reset-btn--red"
          >
            Play again!
          </button>
        );
      case GAME_STATE.DRAW:
        return (
          <button
            onClick={reset}
            className="status__reset-btn status__reset-btn--red"
          >
            Play again!
          </button>
        );
      default:
        return null;
    }
  }

  return <div className="status">
    <div>
      <div>
        {phrase()}
      </div>
      <div>
        {ResetButton()}
      </div>
    </div>
  </div>
};

export default Status;