import { pairs } from './ai';

export function checkResult(board) {

  function isEqual(x, y, z, w) {
    if (x === null
      || y === null
      || z === null
      || w === null) return false;
    return x === y && x === z && x === w;
  }

  for (let pair of pairs) {
    if (isEqual(board[pair[0]], board[pair[1]], board[pair[2]], board[pair[3]])) 
      return {
        winner: board[pair[0]],
        cells: pair,
      };
  }

  return null;
}