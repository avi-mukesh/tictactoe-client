import React, { useEffect, useRef } from "react";
import Row from "./Row";
import { Square } from "./Square";

const Board = () => {
  return (
    <div className="board">
      <Row>
        <Square />
        <Square />
        <Square />
      </Row>
      <Row>
        <Square />
        <Square />
        <Square />
      </Row>
      <Row>
        <Square />
        <Square />
        <Square />
      </Row>
    </div>
  );
};

export default Board;
