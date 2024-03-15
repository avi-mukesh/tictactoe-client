import { useContext, useState, createContext, useEffect } from "react";
import { SquareState } from "../squareState";
import { socket } from "../app/socket";

const SpectateContext = createContext(null);

export const SpectateProvider = ({ children }) => {
  const [playerInfo, setPlayerInfo] = useState(null);
  const [gameRoomId, setGameRoomId] = useState(null);
  const [boardState, setBoardState] = useState([
    [SquareState.EMPTY, SquareState.EMPTY, SquareState.EMPTY],
    [SquareState.EMPTY, SquareState.EMPTY, SquareState.EMPTY],
    [SquareState.EMPTY, SquareState.EMPTY, SquareState.EMPTY],
  ]);
  const [playerOneTurn, setPlayerOneTurn] = useState(null);
  const [strikeCoordinates, setStrikeCoordinates] = useState(null);

  const madeMove = (data) => {
    let symbolToSet;
    if (playerInfo?.playerOne.username === data.username) {
      symbolToSet = playerInfo?.playerOne.symbol;
    } else {
      symbolToSet = playerInfo?.playerTwo.symbol;
    }

    const newBoardState = [...boardState];
    newBoardState[data.coordinates.y][data.coordinates.x] =
      SquareState[symbolToSet];
    setBoardState(newBoardState);
  };

  const gameEnded = ({ winner, strikeCoordinates }) => {
    setStrikeCoordinates(strikeCoordinates);
    console.log("game ended motherfucker", winner, strikeCoordinates);
  };

  useEffect(() => {
    socket.emit("spectate_game", { gameRoomId: gameRoomId });
  }, [gameRoomId]);

  useEffect(() => {
    socket.on("receive_ongoing_game_player_info", (data) => {
      setPlayerInfo(data.ongoingGamePlayerInfo);
      setPlayerOneTurn(true);
    });
    socket.on("made_move", madeMove);
    socket.on("game_ended", gameEnded);

    return () => {
      socket.off("receive_ongoing_game_info");
      socket.off("made_move", madeMove);
      socket.off("game_ended", gameEnded);
    };
  });

  return (
    <SpectateContext.Provider
      value={{
        gameRoomId,
        setGameRoomId,
        boardState,
        setBoardState,
        playerInfo,
        setPlayerInfo,
        playerOneTurn,
        strikeCoordinates,
      }}
    >
      {children}
    </SpectateContext.Provider>
  );
};

const useSpectate = () => useContext(SpectateContext);
export default useSpectate;
