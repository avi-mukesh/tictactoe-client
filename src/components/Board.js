import React from "react";
import Row from "./Row";
import { Square } from "./Square";
import Strike from "./Strike";
import useGameState from "../context/GameContext";

const Board = ({ strikeCoordinates }) => {
  return (
    <div className="board">
      {strikeCoordinates && <Strike strikeCoordinates={strikeCoordinates} />}
      <Row>
        <Square coordinates={{ x: 0, y: 0 }} />
        <Square coordinates={{ x: 1, y: 0 }} />
        <Square coordinates={{ x: 2, y: 0 }} />
      </Row>
      <Row>
        <Square coordinates={{ x: 0, y: 1 }} />
        <Square coordinates={{ x: 1, y: 1 }} />
        <Square coordinates={{ x: 2, y: 1 }} />
      </Row>
      <Row>
        <Square coordinates={{ x: 0, y: 2 }} />
        <Square coordinates={{ x: 1, y: 2 }} />
        <Square coordinates={{ x: 2, y: 2 }} />
      </Row>
    </div>
  );
};

export default Board;
