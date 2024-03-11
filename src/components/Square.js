import React from "react";
import { SquareState } from "../squareState";
import { socket } from "../app/socket";
import useGameState from "../context/GameContext";

export const Square = ({ coordinates }) => {
  const { boardState, myMove, isPlaying, isMyTurn } = useGameState();

  const isFilled =
    boardState[coordinates.y][coordinates.x] !== SquareState.EMPTY;

  const handleClick = () => {
    if (!isFilled) {
      myMove(coordinates);
      socket.emit("made_move", { coordinates });
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
