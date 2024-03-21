import React from "react";
import { SquareState } from "../util/squareState";
import { socket } from "../app/socket";
import useGameState from "../context/GameContext";
import { useSelector } from "react-redux";

export const Square = ({ coordinates }) => {
  const {
    boardState,
    myMove,
    isPlaying,
    isPlayingComputer,
    isMyTurn,
    gameRoomId,
  } = useGameState();
  const { userInfo } = useSelector((state) => state.auth);

  const isFilled =
    boardState[coordinates.y][coordinates.x] !== SquareState.EMPTY;

  const handleClick = () => {
    if (!isFilled) {
      myMove(coordinates, isPlayingComputer);

      if (!isPlayingComputer) {
        socket.emit("made_move", {
          coordinates,
          username: userInfo.username,
          gameRoomId,
        });
      }
    }
  };

  return (
    <div
      className="board__square"
      onClick={isPlaying && isMyTurn ? handleClick : null}
      style={{
        cursor: isPlaying && isMyTurn && !isFilled ? "pointer" : "default",
      }}
    >
      {boardState[coordinates.y][coordinates.x]}
    </div>
  );
};
