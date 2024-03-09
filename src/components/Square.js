import React, { useState } from "react";
import { SquareState } from "../squareState";
import { socket } from "../app/socket";
import { useSelector } from "react-redux";
import useGameState from "../context/GameContext";

export const Square = ({ coordinates }) => {
  const { boardState, myMove } = useGameState();

  const [squareState, setSquareState] = useState(SquareState.EMP);

  const handleClick = () => {
    myMove(coordinates);
    socket.emit("made_move", { coordinates });
  };

  return (
    <div className="board__square" onClick={handleClick}>
      {boardState[coordinates.x][coordinates.y]}
    </div>
  );
};
