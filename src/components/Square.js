import React, { useState } from "react";
import { SquareState } from "../squareState";

export const Square = () => {
  const [squareState, setSquareState] = useState(SquareState.EMPTY);

  const handleClick = () => setSquareState(SquareState.NOUGHT);

  return (
    <div className="board__square" onClick={handleClick}>
      {squareState}
    </div>
  );
};
