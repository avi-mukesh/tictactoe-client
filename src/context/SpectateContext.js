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

  const madeMove = (data) => {
    console.log("player info is", playerInfo);
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
  };

  useEffect(() => {
    socket.emit("spectate_game", { gameRoomId: "game_room" });
  }, []);

  useEffect(() => {
    socket.on("receive_ongoing_game_player_info", (info) =>
      setPlayerInfo(info)
    );
    socket.on("made_move", madeMove);

    return () => {
      socket.off("receive_ongoing_game_info");
      socket.off("made_move", madeMove);
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
      }}
    >
      {children}
    </SpectateContext.Provider>
  );
};

const useSpectate = () => useContext(SpectateContext);
export default useSpectate;
