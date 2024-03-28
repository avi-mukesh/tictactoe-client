import { SquareState } from "./squareState";

// Function to check if the board is full
function isBoardFull(board) {
  return board.every((row) => row.every((cell) => cell !== SquareState.EMPTY));
}
// Function to check if the game is over
function gameOver(board) {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] !== SquareState.EMPTY &&
      board[i][0] === board[i][1] &&
      board[i][1] === board[i][2]
    ) {
      return true;
    }
  }
  // Check columns
  for (let i = 0; i < 3; i++) {
    if (
      board[0][i] !== SquareState.EMPTY &&
      board[0][i] === board[1][i] &&
      board[1][i] === board[2][i]
    ) {
      return true;
    }
  }
  // Check diagonals
  if (
    board[0][0] !== SquareState.EMPTY &&
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2]
  ) {
    return true;
  }
  if (
    board[0][2] !== SquareState.EMPTY &&
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0]
  ) {
    return true;
  }
  // Check if board is full
  return isBoardFull(board);
}

// Function to evaluate the board
function evaluate(board, computerSymbol) {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] !== SquareState.EMPTY &&
      board[i][0] === board[i][1] &&
      board[i][1] === board[i][2]
    ) {
      return board[i][0] === computerSymbol ? 1 : -1;
    }
  }
  // Check columns
  for (let i = 0; i < 3; i++) {
    if (
      board[0][i] !== SquareState.EMPTY &&
      board[0][i] === board[1][i] &&
      board[1][i] === board[2][i]
    ) {
      return board[0][i] === computerSymbol ? 1 : -1;
    }
  }
  // Check diagonals
  if (
    board[0][0] !== SquareState.EMPTY &&
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2]
  ) {
    return board[0][0] === computerSymbol ? 1 : -1;
  }
  if (
    board[0][2] !== SquareState.EMPTY &&
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0]
  ) {
    return board[0][2] === computerSymbol ? 1 : -1;
  }
  // If no winner, return 0 for draw or undecided
  return 0;
}

// Function to get available moves
function getAvailableMoves(board) {
  const moves = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === SquareState.EMPTY) {
        moves.push({ x: i, y: j });
      }
    }
  }
  return moves;
}

function minimax(board, depth, isMaximizing, computerSymbol, mySymbol) {
  //   console.log("finding best move in ", JSON.parse(JSON.stringify(board)));
  if (gameOver(board)) {
    return evaluate(board, computerSymbol);
  }

  const availableMoves = getAvailableMoves(board);

  //   console.log(
  //     "available moves from this position",
  //     JSON.parse(JSON.stringify(availableMoves))
  //   );

  if (availableMoves.length === 0) {
    return 0;
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (const move of availableMoves) {
      board[move.x][move.y] = computerSymbol;
      const score = minimax(board, depth + 1, false, computerSymbol);
      board[move.x][move.y] = SquareState.EMPTY;
      bestScore = Math.max(score, bestScore);
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (const move of availableMoves) {
      board[move.x][move.y] = mySymbol;
      const score = minimax(board, depth + 1, true, computerSymbol);
      board[move.x][move.y] = SquareState.EMPTY;
      bestScore = Math.min(score, bestScore);
    }
    return bestScore;
  }
}

export const findBestMove = (board, computerSymbol, mySymbol) => {
  let bestMove;
  let bestScore = -Infinity;
  const availableMoves = getAvailableMoves(board);

  console.log(availableMoves);

  for (const move of availableMoves) {
    board[move.x][move.y] = computerSymbol;
    const score = minimax(board, 0, true, computerSymbol, mySymbol);
    board[move.x][move.y] = SquareState.EMPTY;
    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }
  return bestMove;
  //   return { x: bestMove.y, y: bestMove.x };
};
