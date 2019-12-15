import { createContext } from 'react';
import { checkResult } from '../libs/helpers';

export const GAME_STATE = {
  IDLE: 'IDLE',
  YOUR_TURN: 'YOUR_TURN',
  OPPONENTS_TURN: 'OPPONENTS_TURN',
  WIN: 'WIN',
  DEFEAT: 'DEFEAT',
  DRAW: 'DRAW',
  MATCH_WIN: 'MATCH_WIN',
  MATCH_DEFEAT: 'MATCH_DEFEAT',
  MATCH_DRAW: 'MATCH_DRAW',
  MATCH_IN: 'MATCH_IN'
};

export const GAME_STATE_ACTION_TYPE = {
  CHECK: 'CHECK',
  RESET: 'RESET',
  MATCH_RESET: 'MATCH_RESET',
  RESET_SCORE: 'RESET_SCORE',
  CHANGE_DIFFICULTY: 'CHANGE_DIFFICULTY',
};

export const GAME_DIFFICULTIES = {
  EASY: 'EASY',
  MEDIUM: 'MEDIUM',
  HARD: 'HARD',
};

export const defaultValue = {
  score: {
    you: 0,
    opponent: 0,
  },
  match: 0,
  matchState: GAME_STATE.MATCH_IN,
  round: 0,
  board: {
    a1: null, b1: null, c1: null, d1: null,
    a2: null, b2: null, c2: null, d2: null,
    a3: null, b3: null, c3: null, d3: null,
  },
  winnerCells: [],
  state: GAME_STATE.IDLE,
  difficulty: localStorage.getItem('difficulty') || GAME_DIFFICULTIES.HARD,
};

export const dispatcher = (state, action) => {
  switch (action.type) {

    case GAME_STATE_ACTION_TYPE.CHECK:
    {
    // Validate payload
    // Scheme { target: String, value: String }
    if (!action.payload) throw new Error('payload is required');
    if (Object.keys(defaultValue.board).indexOf(action.payload.target) === -1) throw new Error('payload.target has unexpected value');
    if (['x', 'o'].indexOf(action.payload.value) === -1) throw new Error('payload.value is invalid. It expects `x` or `o`');
    if (state.board[action.payload.target] !== null) throw new Error('target is not empty');
    
      const newState = {...state};
      newState.board[action.payload.target] = action.payload.value;
      newState.round += 1;

      if (action.payload.value === 'o') newState.state = GAME_STATE.OPPONENTS_TURN;
      if (action.payload.value === 'x') newState.state = GAME_STATE.YOUR_TURN;

      const result = checkResult(newState.board);
      const won = result && result.winner === 'o';
      const lost = result && result.winner === 'x';
      const draw = !result && newState.round === 12;

      if (won || lost) {
        newState.winnerCells = result.cells;
      }

      if (won) {
        newState.score.you += 1;
        newState.state = GAME_STATE.WIN;
      }

      if (lost) {
        newState.score.opponent += 1;
        newState.state = GAME_STATE.DEFEAT;
      }

      if (draw) newState.state = GAME_STATE.DRAW;

      if (won || lost || draw) {
        newState.match += 1;

        if (newState.match === 3 || Math.abs(newState.score.you - newState.score.opponent) > 1) {
          if (newState.score.you > newState.score.opponent)
            newState.matchState = GAME_STATE.MATCH_WIN;
          else if (newState.score.you < newState.score.opponent)
            newState.matchState = GAME_STATE.MATCH_DEFEAT;
          else
            newState.matchState = GAME_STATE.MATCH_DRAW;
        }
      }

      return newState;
    }

    case GAME_STATE_ACTION_TYPE.RESET:
    {
      const newState = {...state};
      newState.round = 0;
      newState.board = {
        a1: null, b1: null, c1: null, d1: null,
        a2: null, b2: null, c2: null, d2: null,
        a3: null, b3: null, c3: null, d3: null,
      };
      newState.state = GAME_STATE.IDLE;
      newState.winnerCells = [];
      return newState;
    }

    case GAME_STATE_ACTION_TYPE.MATCH_RESET:
    {
      const newState = {...defaultValue};

      newState.board = {
        a1: null, b1: null, c1: null, d1: null,
        a2: null, b2: null, c2: null, d2: null,
        a3: null, b3: null, c3: null, d3: null,
      };

      newState.winnerCells = [];

      newState.score = {
        you: 0,
        opponent: 0,
      };
      
      return newState;
    }

    case GAME_STATE_ACTION_TYPE.RESET_SCORE:
    {
      const newState = {...state};
      newState.score = defaultValue.score;
      return newState;
    }

    case GAME_STATE_ACTION_TYPE.CHANGE_DIFFICULTY:
    {
      // Validate Payload
      const validPayloads = Object
        .keys(GAME_DIFFICULTIES)
        .map(k => GAME_DIFFICULTIES[k]);
      
      if (validPayloads.indexOf(action.payload) === -1) {
        throw new Error('Invalid payload');
      }

      localStorage.setItem('difficulty', action.payload);
      
      const newState = {...state};
      newState.difficulty = action.payload;
      return newState;
    }

    default:
      return state;
  }
}

export default createContext();
