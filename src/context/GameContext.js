import { socket } from "../app/socket";
import { usePlayerContext } from "./PlayerContext";

const { createContext, useContext, useState, useEffect } = require("react");
const { SquareState } = require("../squareState");

const GameContext = createContext(null);

export const GameProvider = ({ children }) => {
  const { symbol, opponentSymbol } = usePlayerContext();

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
  };

  const opponentMadeMove = ({ coordinates }) => {
    console.log(
      `setting ${opponentSymbol} in ${coordinates.x}, ${coordinates.y}`
    );
    const newBoardState = [...boardState];
    newBoardState[coordinates.x][coordinates.y] = SquareState[opponentSymbol];
    setBoardState(newBoardState);
  };

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
