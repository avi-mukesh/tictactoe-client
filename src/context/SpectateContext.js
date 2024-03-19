import { useContext, useState, createContext, useEffect } from "react";
import { SquareState } from "../util/squareState";
import { socket } from "../app/socket";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  const madeMove = (data) => {
    let symbolToSet;
    if (playerInfo?.playerOne.username === data.username) {
      symbolToSet = playerInfo?.playerOne.symbol;
    } else {
      symbolToSet = playerInfo?.playerTwo.symbol;
    }
    console.log(playerInfo);

    const newBoardState = [...boardState];
    newBoardState[data.coordinates.y][data.coordinates.x] =
      SquareState[symbolToSet];
    setBoardState(newBoardState);
  };

  const handleInvalidGameRoom = () => {
    // navigate("/ongoing-games");
    setGameRoomId(null);
  };

  const gameEnded = ({ winner, strikeCoordinates }) => {
    setStrikeCoordinates(strikeCoordinates);
    console.log("game ended motherfucker", winner, strikeCoordinates);
  };

  useEffect(() => {
    if (gameRoomId) {
      socket.emit("spectate_game", { gameRoomId: gameRoomId });
    }
  }, [gameRoomId]);

  useEffect(() => {
    socket.on("receive_ongoing_game_player_info", (data) => {
      setPlayerInfo(data.ongoingGamePlayerInfo);
      setPlayerOneTurn(true);
    });
    socket.on("receive_ongoing_game_boardstate", (data) => {
      setBoardState(data.ongoingGameBoardState);
    });
    socket.on("made_move", madeMove);
    socket.on("game_ended", gameEnded);
    socket.on("invalid_game_room", handleInvalidGameRoom);
    return () => {
      socket.off("receive_ongoing_game_player_info");
      socket.off("receive_ongoing_game_boardstate");
      socket.off("made_move", madeMove);
      socket.off("game_ended", gameEnded);
      socket.off("invalid_game_room", handleInvalidGameRoom);
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
