import React from "react";
import useSpectate from "../context/SpectateContext";

const SpectateSquare = ({ coordinates }) => {
  const { boardState } = useSpectate();

  return (
    <div className="board__square">
      {boardState[coordinates.y][coordinates.x]}
    </div>
  );
};

export default SpectateSquare;
