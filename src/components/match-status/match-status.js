import React, { useContext } from 'react';
import GameStateContext, { GAME_STATE, GAME_STATE_ACTION_TYPE } from '../../contexts/gameState';
import './match-status.css';

function MatchStatus() {
  const [gameState, dispatchGameState] = useContext(GameStateContext);

  function resetMatch() {
    dispatchGameState({
      type: GAME_STATE_ACTION_TYPE.MATCH_RESET,
    });
  }

  function phrase() {
    switch (gameState.matchState) {
      case GAME_STATE.MATCH_IDLE:
        return '';
      case GAME_STATE.MATCH_WIN:
        return 'You Win!';
      case GAME_STATE.MATCH_DEFEAT:
        return 'You Lose!';
      case GAME_STATE.MATCH_DRAW:
        return 'Draw!';
      default:
        return '';
    }
  }

  function ResetButton() {
    switch (gameState.matchState) {
      case GAME_STATE.MATCH_WIN:
        return (
          <button
            onClick={resetMatch}
            className="status__reset-btn"
          >
            Play again!
          </button>
        );
      case GAME_STATE.MATCH_DEFEAT:
        return (
          <button
            onClick={resetMatch}
            className="status__reset-btn status__reset-btn--red"
          >
            Play again!
          </button>
        );
      case GAME_STATE.MATCH_DRAW:
        return (
          <button
            onClick={resetMatch}
            className="status__reset-btn status__reset-btn--red"
          >
            Play again!
          </button>
        );
      default:
        return null;
    }
  }

  return <div className="match-status">
    <div>
      <div>
        {phrase()}
      </div>
    </div>
  </div>
};

export default MatchStatus;