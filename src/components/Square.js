import React from "react";
import { SquareState } from "../squareState";
import { socket } from "../app/socket";
import useGameState from "../context/GameContext";

export const Square = ({ coordinates }) => {
  const { boardState, myMove } = useGameState();

  const isFilled =
    boardState[coordinates.x][coordinates.y] !== SquareState.EMPTY;

  const handleClick = () => {
    if (!isFilled) {
      myMove(coordinates);
      socket.emit("made_move", { coordinates });
    }
  };

  return (
    <div
      className="board__square"
      onClick={handleClick}
      style={{ cursor: isFilled ? "default" : "pointer" }}
    >
      {boardState[coordinates.x][coordinates.y]}
    </div>
  );
};
