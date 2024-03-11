import { GAME_RESULT } from "../util/gameResult";

import { socket } from "../app/socket";
import { usePlayerContext } from "./PlayerContext";

const { createContext, useContext, useState, useEffect } = require("react");
const { SquareState } = require("../squareState");

const GameContext = createContext(null);

export const GameProvider = ({ children }) => {
  const [isMatchedWithOpponent, setIsMatchedWithOpponent] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMyTurn, setIsMyTurn] = useState(false);
  const { mySymbol, opponentSymbol } = usePlayerContext();
  const [lastMoveCoordinates, setLastMoveCoordinates] = useState(null);
  const [gameResult, setGameResult] = useState(null);
  const [opponentInfo, setOpponentInfo] = useState(null);

  const [boardState, setBoardState] = useState([
    [SquareState.EMPTY, SquareState.EMPTY, SquareState.EMPTY],
    [SquareState.EMPTY, SquareState.EMPTY, SquareState.EMPTY],
    [SquareState.EMPTY, SquareState.EMPTY, SquareState.EMPTY],
  ]);

  const myMove = (coordinates) => {
    const newBoardState = [...boardState];
    newBoardState[coordinates.y][coordinates.x] = SquareState[mySymbol];
    setBoardState(newBoardState);
    setLastMoveCoordinates(coordinates);
    setIsMyTurn(false);
  };

  const opponentMadeMove = ({ coordinates }) => {
    const newBoardState = [...boardState];
    newBoardState[coordinates.y][coordinates.x] = SquareState[opponentSymbol];
    setBoardState(newBoardState);
    setLastMoveCoordinates(coordinates);
    setIsMyTurn(true);
  };

  useEffect(() => {
    if (lastMoveCoordinates) {
      console.log("new board state", boardState);
      const { x, y } = lastMoveCoordinates;
      const sameSymbol = (symbol) => {
        return symbol === boardState[y][x];
      };

      const sameRow = boardState[y].every(sameSymbol);
      const sameCol = boardState.map((row) => row[x]).every(sameSymbol);
      const sameDiag =
        x === y
          ? boardState.map((row, index) => row[index]).every(sameSymbol)
          : false;

      if (sameRow || sameCol || sameDiag) {
        if (!isMyTurn) {
          setGameResult(GAME_RESULT.WIN);
        } else {
          setGameResult(GAME_RESULT.LOSS);
        }
      } else if (
        boardState.flat().every((symbol) => symbol !== SquareState.EMPTY)
      ) {
        setGameResult(GAME_RESULT.DRAW);
      }
    }
  }, [lastMoveCoordinates, boardState, isMyTurn]);

  useEffect(() => {
    setIsPlaying(false);
  }, [gameResult, setIsPlaying]);

  useEffect(() => {
    socket.on("made_move", opponentMadeMove);
    socket.on("set_opponent_info", setOpponentInfo);
    return () => {
      socket.off("made_move", opponentMadeMove);
      socket.off("set_opponent_info", setOpponentInfo);
    };
  });

  useEffect(() => {
    console.log("you are up against", opponentInfo);
  }, [opponentInfo]);

  const requestRematch = () => {
    console.log("requesting rematch");
    socket.emit("request_rematch");
  };

  return (
    <GameContext.Provider
      value={{
        boardState,
        myMove,
        isMyTurn,
        isPlaying,
        setIsPlaying,
        setIsMyTurn,
        setIsMatchedWithOpponent,
        isMatchedWithOpponent,
        gameResult,
        requestRematch,
        opponentInfo,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

const useGameState = () => useContext(GameContext);

export default useGameState;
