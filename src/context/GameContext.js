import { GAME_RESULT } from "../util/gameResult";

import { socket } from "../app/socket";
import { usePlayerContext } from "./PlayerContext";

const { createContext, useContext, useState, useEffect } = require("react");
const { SquareState, EmptyBoard } = require("../squareState");

const GameContext = createContext(null);

export const GameProvider = ({ children }) => {
  const [gameRoomId, setGameRoomId] = useState(null);
  const [isMatchedWithOpponent, setIsMatchedWithOpponent] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMyTurn, setIsMyTurn] = useState(false);
  const { mySymbol, opponentSymbol, reverseSymbols } = usePlayerContext();
  const [lastMoveCoordinates, setLastMoveCoordinates] = useState(null);
  const [gameResult, setGameResult] = useState(null);
  const [opponentInfo, setOpponentInfo] = useState(null);
  const [rematchRequested, setRematchRequested] = useState(false);
  const [receivedRematchRequest, setReceivedRematchRequest] = useState(false);

  const [boardState, setBoardState] = useState([
    [SquareState.EMPTY, SquareState.EMPTY, SquareState.EMPTY],
    [SquareState.EMPTY, SquareState.EMPTY, SquareState.EMPTY],
    [SquareState.EMPTY, SquareState.EMPTY, SquareState.EMPTY],
  ]);

  const resetGameState = () => {
    console.log("starting new game");
    setBoardState([
      [SquareState.EMPTY, SquareState.EMPTY, SquareState.EMPTY],
      [SquareState.EMPTY, SquareState.EMPTY, SquareState.EMPTY],
      [SquareState.EMPTY, SquareState.EMPTY, SquareState.EMPTY],
    ]);
    setGameResult(null);
    reverseSymbols();
    setRematchRequested(false);
    setReceivedRematchRequest(false);
  };

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
      const { x, y } = lastMoveCoordinates;
      const sameSymbol = (symbol) => {
        return symbol === boardState[y][x];
      };

      const sameRow = boardState[y].every(sameSymbol);
      const sameCol = boardState.map((row) => row[x]).every(sameSymbol);
      const sameDiag =
        x === y
          ? boardState.map((row, index) => row[index]).every(sameSymbol)
          : x == 2 - y
          ? boardState.map((row, index) => row[2 - index]).every(sameSymbol)
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
  }, [lastMoveCoordinates, isMyTurn]);

  useEffect(() => {
    if (gameResult) {
      setIsPlaying(false);
      if (isMyTurn) {
        const winner =
          gameResult === GAME_RESULT.DRAW
            ? null
            : GAME_RESULT.LOSS
            ? opponentInfo.username
            : "";

        socket.emit("game_ended", {
          gameRoomId,
          winner,
        });
      }
    }
  }, [gameResult, setIsPlaying]);

  useEffect(() => {
    socket.on("made_move", opponentMadeMove);
    socket.on("set_opponent_info", setOpponentInfo);
    socket.on("rematch_requested", () => setReceivedRematchRequest(true));
    socket.on("accepted_rematch_request", resetGameState);
    return () => {
      socket.off("made_move", opponentMadeMove);
      socket.off("set_opponent_info", setOpponentInfo);
      socket.off("rematch_requested");
      socket.off("accepted_rematch_request", resetGameState);
    };
  });

  const requestRematch = () => {
    console.log("requesting rematch");
    setRematchRequested(true);
    socket.emit("request_rematch", gameRoomId);
  };

  const revokeRematchRequest = () => {
    console.log("revoking rematch");
    setRematchRequested(false);
    socket.emit("revoke_rematch");
  };

  const acceptRematchRequest = () => {
    resetGameState();
    socket.emit("accept_rematch_request", gameRoomId);
    console.log("accepting rematch request");
  };

  const declineRematchRequest = () => {
    console.log("declining rematch request");
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
        gameRoomId,
        setGameRoomId,
        gameResult,
        opponentInfo,
        rematchRequested,
        requestRematch,
        revokeRematchRequest,
        receivedRematchRequest,
        acceptRematchRequest,
        declineRematchRequest,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

const useGameState = () => useContext(GameContext);

export default useGameState;
