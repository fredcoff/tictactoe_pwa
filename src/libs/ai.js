import { GAME_DIFFICULTIES } from '../contexts/gameState';

function preventImminentLose(board) {
  function isImminentLose(xCellname, yCellname, zCellname) {
    const x = board[xCellname];
    const y = board[yCellname];
    const z = board[zCellname];
    
    let nOfX = 0;
    let nOfNull = 0;

    if (x === 'x') nOfX++;
    if (y === 'x') nOfX++;
    if (z === 'x') nOfX++;
    if (x === null) nOfNull++;
    if (y === null) nOfNull++;
    if (z === null) nOfNull++;

    if (nOfX === 2 && nOfNull === 1) {
      return [
        { name: xCellname, value: x },
        { name: yCellname, value: y },
        { name: zCellname, value: z },
      ].find(c => c.value === null).name;
    }

    return false;
  }

  const possibilities = [
    // lines
    isImminentLose('a1', 'b1', 'c1'),
    isImminentLose('a2', 'b2', 'c2'),
    isImminentLose('a3', 'b3', 'c3'),

    // columns
    isImminentLose('a1', 'a2', 'a3'),
    isImminentLose('b1', 'b2', 'b3'),
    isImminentLose('c1', 'c2', 'c3'),

    // transversal
    isImminentLose('a1', 'b2', 'c3'),
    isImminentLose('a3', 'b2', 'c1'),
  ].filter(p => p !== false);

  return possibilities;
}

function checkImminentWin(board) {
  function isImminentWin(xCellname, yCellname, zCellname) {
    const x = board[xCellname];
    const y = board[yCellname];
    const z = board[zCellname];
    
    let nOfO = 0;
    let nOfNull = 0;

    if (x === 'o') nOfO++;
    if (y === 'o') nOfO++;
    if (z === 'o') nOfO++;
    if (x === null) nOfNull++;
    if (y === null) nOfNull++;
    if (z === null) nOfNull++;

    if (nOfO === 2 && nOfNull === 1) {
      return [
        { name: xCellname, value: x },
        { name: yCellname, value: y },
        { name: zCellname, value: z },
      ].find(c => c.value === null).name;
    }

    return false;
  }

  const possibilities = [
    // lines
    isImminentWin('a1', 'b1', 'c1'),
    isImminentWin('a2', 'b2', 'c2'),
    isImminentWin('a3', 'b3', 'c3'),

    // columns
    isImminentWin('a1', 'a2', 'a3'),
    isImminentWin('b1', 'b2', 'b3'),
    isImminentWin('c1', 'c2', 'c3'),

    // transversal
    isImminentWin('a1', 'b2', 'c3'),
    isImminentWin('a3', 'b2', 'c1'),
  ].filter(p => p !== false);

  return possibilities;
}

function preventPossibleLose(board) {
  function isPossibleLose(xCellname, yCellname, zCellname) {
    const x = board[xCellname];
    const y = board[yCellname];
    const z = board[zCellname];
    
    let nOfX = 0;
    let nOfNull = 0;

    if (x === 'x') nOfX++;
    if (y === 'x') nOfX++;
    if (z === 'x') nOfX++;
    if (x === null) nOfNull++;
    if (y === null) nOfNull++;
    if (z === null) nOfNull++;

    if (nOfX === 1 && nOfNull === 2) {
      return [
        { name: xCellname, value: x },
        { name: yCellname, value: y },
        { name: zCellname, value: z },
      ].filter(c => c.value === null)
      .map(c=> c.name);
    }

    return [false];
  }

  const possibilities = [
    // lines
    ...isPossibleLose('a1', 'b1', 'c1'),
    ...isPossibleLose('a2', 'b2', 'c2'),
    ...isPossibleLose('a3', 'b3', 'c3'),

    // columns
    ...isPossibleLose('a1', 'a2', 'a3'),
    ...isPossibleLose('b1', 'b2', 'b3'),
    ...isPossibleLose('c1', 'c2', 'c3'),

    // transversal
    ...isPossibleLose('a1', 'b2', 'c3'),
    ...isPossibleLose('a3', 'b2', 'c1'),
  ].filter(p => p !== false);

  return possibilities;
}

function checkPossibleWin(board) {
  function isPossibleWin(xCellname, yCellname, zCellname) {
    const x = board[xCellname];
    const y = board[yCellname];
    const z = board[zCellname];
    
    let nOfO = 0;
    let nOfNull = 0;

    if (x === 'o') nOfO++;
    if (y === 'o') nOfO++;
    if (z === 'o') nOfO++;
    if (x === null) nOfNull++;
    if (y === null) nOfNull++;
    if (z === null) nOfNull++;

    if (nOfO === 1 && nOfNull === 2) {
      return [
        { name: xCellname, value: x },
        { name: yCellname, value: y },
        { name: zCellname, value: z },
      ].filter(c => c.value === null)
      .map(c=> c.name);
    }

    return [false];
  }

  const possibilities = [
    // lines
    ...isPossibleWin('a1', 'b1', 'c1'),
    ...isPossibleWin('a2', 'b2', 'c2'),
    ...isPossibleWin('a3', 'b3', 'c3'),

    // columns
    ...isPossibleWin('a1', 'a2', 'a3'),
    ...isPossibleWin('b1', 'b2', 'b3'),
    ...isPossibleWin('c1', 'c2', 'c3'),

    // transversal
    ...isPossibleWin('a1', 'b2', 'c3'),
    ...isPossibleWin('a3', 'b2', 'c1'),
  ].filter(p => p !== false);

  return possibilities;
}

function getEmptyCells(board) {
  const emptyCells = Object
    .keys(board)
    .map(key => ({ key, value: board[key] }))
    .filter(o => o.value === null)
    .map(o => o.key);
  
  return emptyCells;
}

function getFirstCell(board) {
  const filledCells = Object
      .keys(board)
      .map(key => ({ key, value: board[key] }))
      .filter(o => o.value !== null)
      .map(o => o.key);
    
  if (filledCells.length !== 1) {
    console.log('critical issue here');
  }
  else {
    if (filledCells[0] !== 'b2') {
      const possibilities = {
        a1: ['a2', 'b1', 'b3', 'c2'],
        a2: ['b1', 'b3', 'c1', 'c3'],
        a3: ['a2', 'b1', 'b3', 'c2'],
        b1: ['a2', 'a3', 'c2', 'c3'],
        b3: ['a1', 'a2', 'c1', 'c2'],
        c1: ['a2', 'b1', 'b3', 'c2'],
        c2: ['a1', 'a3', 'b1', 'b3'],
        c3: ['a2', 'b1', 'b3', 'c2']
      };
      const candidateCells = possibilities[filledCells[0]];

      return candidateCells[Math.floor(Math.random() * candidateCells.length)];
    }
  }

  return false;
}

export default function(board, difficulty, round) {
  // AI
  //
  // 1. Check for imminent lose
  //    When 2 cells of the row are filled
  //    with your mark, and one
  //    is empty
  //
  // 2. Check for imminent win
  //    When 2 cells of the row are filled
  //    with the opponent mark, and one is empty
  //
  // 3. Check for possible lose
  //    When one cell of the row is filled
  //    with your mark, and two are empty
  //
  // 4. Check for possible win
  //    When one cell of the row is filled
  //    with the opponent mark, and two are empty
  //
  // 5. First move strategy
  //    Correct first moves
  //    https://mindyourdecisions.com/blog/2016/11/01/the-best-first-move-in-misere-tic-tac-toe-3-in-a-row-is-losing-game-theory-tuesdays/

  // Empty Cells
  const emptyCells = getEmptyCells(board);

  // 1
  const imminentLoseCells = preventImminentLose(board);
  const step1Cells = emptyCells.filter(cell => (imminentLoseCells.find(c => (cell === c)) === undefined));
  if (step1Cells.length === 0 || difficulty === GAME_DIFFICULTIES.EASY)
    return emptyCells[Math.floor(emptyCells.length * Math.random())];

  // 2
  const imminentWinCells = checkImminentWin(board);
  const step2Cells = step1Cells.filter(cell => (imminentWinCells.find(c => (cell === c)) === undefined));
  if (step2Cells.length === 0  || difficulty === GAME_DIFFICULTIES.MEDIUM)
    return step1Cells[Math.floor(step1Cells.length * Math.random())];

  // 5
  if (round === 1) {
    const firstCell = getFirstCell(board);
    if (firstCell) {
      return firstCell;
    }
  }

  // 3
  const possibleLoseCells = preventPossibleLose(board);
  const step3Cells = step2Cells.filter(cell => (possibleLoseCells.find(c => (cell === c)) === undefined));
  if (step3Cells.length === 0)
    return step2Cells[Math.floor(step2Cells.length * Math.random())];

  // 4
  const possibleWinCells = checkPossibleWin(board);
  const step4Cells = step3Cells.filter(cell => (possibleWinCells.find(c => (cell === c)) === undefined));
  if (step4Cells.length === 0)
    return step3Cells[Math.floor(step3Cells.length * Math.random())];

  // console.log('still here');
  return step4Cells[Math.floor(Math.random() * step4Cells.length)];
}