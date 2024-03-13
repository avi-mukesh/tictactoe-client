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

  useEffect(() => {
    console.log("player info", playerInfo);
  }, [playerInfo]);

  useEffect(() => {
    console.log("board state", boardState);
  }, [boardState]);

  useEffect(() => {
    socket.emit("spectate_game", { gameRoomId: "game_room" });

    socket.on("receive_ongoing_game_player_info", (info) =>
      setPlayerInfo(info)
    );
    socket.on("made_move", (data) => {
      let symbolToSet;
      if (playerInfo?.playerOne.username === data.username) {
        symbolToSet = playerInfo?.playerOne.symbol;
      } else {
        symbolToSet = playerInfo?.playerTwo.symbol;
      }
      console.log(
        `need to set ${symbolToSet} at ${data.coordinates.x}, ${data.coordinates.y}`
      );

      console.log("enum", SquareState);
      console.log("key", symbolToSet);

      const newBoardState = [...boardState];
      newBoardState[data.coordinates.y][data.coordinates.x] =
        SquareState[symbolToSet];
      setBoardState(newBoardState);
    });

    return () => {
      socket.off("receive_ongoing_game_info");
      socket.off("made_move");
    };
  }, []);

  return (
    <SpectateContext.Provider
      value={{
        gameRoomId,
        setGameRoomId,
        boardState,
        setBoardState,
        playerInfo,
        setPlayerInfo,
      }}
    >
      {children}
    </SpectateContext.Provider>
  );
};

const useSpectate = () => useContext(SpectateContext);
export default useSpectate;
