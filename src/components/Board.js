import React from "react";
import Row from "./Row";
import { Square } from "./Square";

const Board = () => {
  return (
    <div className="board">
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
