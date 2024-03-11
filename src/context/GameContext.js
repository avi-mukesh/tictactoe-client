import { socket } from "../app/socket";
import { usePlayerContext } from "./PlayerContext";

const { createContext, useContext, useState, useEffect } = require("react");
const { SquareState } = require("../squareState");

const GameContext = createContext(null);

export const GameProvider = ({ children }) => {
  const { symbol, opponentSymbol } = usePlayerContext();
  const [lastMoveCoordinates, setLastMoveCoordinates] = useState(null);

  const [boardState, setBoardState] = useState([
    [SquareState.EMPTY, SquareState.EMPTY, SquareState.EMPTY],
    [SquareState.EMPTY, SquareState.EMPTY, SquareState.EMPTY],
    [SquareState.EMPTY, SquareState.EMPTY, SquareState.EMPTY],
  ]);

  const myMove = (coordinates) => {
    console.log(
      `setting ${opponentSymbol} in ${coordinates.x}, ${coordinates.y}`
    );
    const newBoardState = [...boardState];
    newBoardState[coordinates.x][coordinates.y] = SquareState[symbol];
    setBoardState(newBoardState);
    setLastMoveCoordinates(coordinates);
  };

  const opponentMadeMove = ({ coordinates }) => {
    console.log(
      `setting ${opponentSymbol} in ${coordinates.x}, ${coordinates.y}`
    );
    const newBoardState = [...boardState];
    newBoardState[coordinates.x][coordinates.y] = SquareState[opponentSymbol];
    setBoardState(newBoardState);
    setLastMoveCoordinates(coordinates);
  };

  useEffect(() => {
    if (lastMoveCoordinates) {
      const { x, y } = lastMoveCoordinates;
      const sameSymbol = (symbol) => {
        console.log(symbol);
        return symbol === boardState[y][x];
      };

      const sameRow = boardState[y].every(sameSymbol);

      const sameCol = boardState.map((row) => row[x]).every(sameSymbol);

      const sameDiag =
        x === y
          ? boardState.map((row, index) => row[index]).every(sameSymbol)
          : false;

      console.log(`same row: ${sameRow}`);
      console.log(`same col: ${sameCol}`);
      console.log(`same diag: ${sameDiag}`);
    }
  }, [lastMoveCoordinates, boardState]);

  useEffect(() => {
    socket.on("made_move", opponentMadeMove);
    return () => {
      socket.off("made_move", opponentMadeMove);
    };
  });

  return (
    <GameContext.Provider value={{ boardState, myMove }}>
      {children}
    </GameContext.Provider>
  );
};

const useGameState = () => useContext(GameContext);
export default useGameState;
