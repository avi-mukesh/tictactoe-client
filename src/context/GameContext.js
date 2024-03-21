import { GAME_RESULT } from "../util/gameResult";

import { socket } from "../app/socket";
import { usePlayerContext } from "./PlayerContext";

const { createContext, useContext, useState, useEffect } = require("react");
const { SquareState } = require("../util/squareState");

const GameContext = createContext(null);

export const GameProvider = ({ children }) => {
  const [isPlayingComputer, setIsPlayingComputer] = useState(false);
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
  const [strikeCoordinates, setStrikeCoordinates] = useState(null);

  const [boardState, setBoardState] = useState([
    [SquareState.EMPTY, SquareState.EMPTY, SquareState.EMPTY],
    [SquareState.EMPTY, SquareState.EMPTY, SquareState.EMPTY],
    [SquareState.EMPTY, SquareState.EMPTY, SquareState.EMPTY],
  ]);

  const startNewGame = (newGameRoomId) => {
    resetGameState();
    setGameRoomId(newGameRoomId);
  };

  const resetGameState = () => {
    setBoardState([
      [SquareState.EMPTY, SquareState.EMPTY, SquareState.EMPTY],
      [SquareState.EMPTY, SquareState.EMPTY, SquareState.EMPTY],
      [SquareState.EMPTY, SquareState.EMPTY, SquareState.EMPTY],
    ]);
    setGameResult(null);
    reverseSymbols();
    setRematchRequested(false);
    setReceivedRematchRequest(false);
    setStrikeCoordinates(null);
    setGameRoomId(null);
  };

  const myMove = (coordinates, isPlayingComputer = false) => {
    console.log(mySymbol, opponentSymbol);
    const newBoardState = [...boardState];
    newBoardState[coordinates.y][coordinates.x] = SquareState[mySymbol];
    setBoardState(newBoardState);
    // setBoardState((board) =>
    //   board.map((row, i) =>
    //     row.map((el, j) =>
    //       i === coordinates.y && j === coordinates.x
    //         ? SquareState[mySymbol]
    //         : el
    //     )
    //   )
    // );
    setLastMoveCoordinates(coordinates, newBoardState);
    setIsMyTurn(false);

    if (isPlayingComputer) {
      checkWinner(coordinates, newBoardState);
    }
  };

  const checkWinner = (coordinates, currentBoardState) => {
    const { x, y } = coordinates;
    console.log(x, y);
    const sameSymbol = (symbol) => {
      return symbol === currentBoardState[y][x];
    };

    const sameRow = currentBoardState[y].every(sameSymbol);
    const sameCol = currentBoardState.map((row) => row[x]).every(sameSymbol);
    const sameDiag =
      x === y
        ? currentBoardState.map((row, index) => row[index]).every(sameSymbol)
        : x === 2 - y
        ? currentBoardState
            .map((row, index) => row[2 - index])
            .every(sameSymbol)
        : false;

    let startCoords = { x: 0, y: 0 };
    let endCoords = { x: 0, y: 0 };

    if (sameRow || sameCol || sameDiag) {
      if (sameRow) {
        startCoords.x = 0;
        startCoords.y = y;
        endCoords.x = 2;
        endCoords.y = y;
      } else if (sameCol) {
        startCoords.x = x;
        startCoords.y = 0;
        endCoords.x = x;
        endCoords.y = 2;
      } else if (sameDiag) {
        startCoords.y = 0;
        endCoords.y = 2;
        if (
          currentBoardState[0][0] === currentBoardState[2][2] &&
          currentBoardState[1][1] === currentBoardState[0][0]
        ) {
          startCoords.x = 0;
          endCoords.x = 2;
        } else {
          startCoords.x = 2;
          endCoords.x = 0;
        }
      }

      setStrikeCoordinates({ startCoords, endCoords });

      if (isMyTurn) {
        setGameResult(GAME_RESULT.WIN);
      } else {
        setGameResult(GAME_RESULT.LOSS);
      }
    } else if (
      currentBoardState.flat().every((symbol) => symbol !== SquareState.EMPTY)
    ) {
      setGameResult(GAME_RESULT.DRAW);
    } else {
      computerMove();
    }
  };

  const computerMove = () => {
    console.log("computer made move");

    const coordinates = {
      x: Math.floor(Math.random() * 3),
      y: Math.floor(Math.random() * 3),
    };

    opponentMadeMove({
      coordinates,
    });
  };

  useEffect(() => {
    console.log("new board state", boardState);
  }, [boardState]);

  const opponentMadeMove = ({ coordinates }) => {
    const newBoardState = [...boardState];
    newBoardState[coordinates.y][coordinates.x] = SquareState[opponentSymbol];
    setBoardState(newBoardState);
    // setBoardState((board) =>
    //   board.map((row, i) =>
    //     row.map((el, j) =>
    //       i === coordinates.y && j === coordinates.x
    //         ? SquareState[opponentSymbol]
    //         : el
    //     )
    //   )
    // );
    setLastMoveCoordinates(coordinates);
    setIsMyTurn(true);
  };

  useEffect(() => {
    if (lastMoveCoordinates) {
      const { x, y } = lastMoveCoordinates;
      console.log(x, y);
      const sameSymbol = (symbol) => {
        return symbol === boardState[y][x];
      };

      const sameRow = boardState[y].every(sameSymbol);
      const sameCol = boardState.map((row) => row[x]).every(sameSymbol);
      const sameDiag =
        x === y
          ? boardState.map((row, index) => row[index]).every(sameSymbol)
          : x === 2 - y
          ? boardState.map((row, index) => row[2 - index]).every(sameSymbol)
          : false;

      let startCoords = { x: 0, y: 0 };
      let endCoords = { x: 0, y: 0 };

      if (sameRow || sameCol || sameDiag) {
        if (sameRow) {
          startCoords.x = 0;
          startCoords.y = y;
          endCoords.x = 2;
          endCoords.y = y;
        } else if (sameCol) {
          startCoords.x = x;
          startCoords.y = 0;
          endCoords.x = x;
          endCoords.y = 2;
        } else if (sameDiag) {
          startCoords.y = 0;
          endCoords.y = 2;
          if (
            boardState[0][0] === boardState[2][2] &&
            boardState[1][1] === boardState[0][0]
          ) {
            startCoords.x = 0;
            endCoords.x = 2;
          } else {
            startCoords.x = 2;
            endCoords.x = 0;
          }
        }

        setStrikeCoordinates({ startCoords, endCoords });

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

        if (!isPlayingComputer) {
          socket.emit("game_ended", {
            gameRoomId,
            winner,
            strikeCoordinates,
          });
        }
      }
    }
  }, [gameResult, setIsPlaying]);

  useEffect(() => {
    if (isPlayingComputer) {
      if (!isMyTurn) {
        computerMove();
      }
    }
  }, [isMyTurn, isPlayingComputer]);

  useEffect(() => {
    socket.on("made_move", opponentMadeMove);
    socket.on("set_opponent_info", setOpponentInfo);
    socket.on("rematch_requested", () => setReceivedRematchRequest(true));
    socket.on("accepted_rematch_request", startNewGame);
    socket.on("new_game_room_id", setGameRoomId);
    return () => {
      socket.off("made_move", opponentMadeMove);
      socket.off("set_opponent_info", setOpponentInfo);
      socket.off("rematch_requested");
      socket.off("accepted_rematch_request", startNewGame);
      socket.off("new_game_room_id", setGameRoomId);
    };
  });

  useEffect(() => {
    console.log(`new game room id: ${gameRoomId}`);
  }, [gameRoomId]);

  const requestRematch = () => {
    setRematchRequested(true);
    socket.emit("request_rematch", gameRoomId);
  };

  const revokeRematchRequest = () => {
    setRematchRequested(false);
    socket.emit("revoke_rematch");
  };

  const acceptRematchRequest = () => {
    resetGameState();
    socket.emit("accept_rematch_request", { gameRoomId });
  };

  const declineRematchRequest = () => {};

  const playComputer = () => {
    console.log("Now playing computer");
    setIsMyTurn(true);
    setIsPlaying(true);
    setIsPlayingComputer(true);
    setOpponentInfo({ username: "Computer" });
  };

  useEffect(() => {
    console.log("it is my turn:", isMyTurn);
  }, [isMyTurn]);

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
        strikeCoordinates,
        resetGameState,
        playComputer,
        isPlayingComputer,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

const useGameState = () => useContext(GameContext);

export default useGameState;
