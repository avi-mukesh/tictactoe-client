import React from "react";
import Row from "./Row";
import SpectateSquare from "./SpectateSquare";

const SpectateBoard = () => {
  return (
    <div className="board">
      <Row>
        <SpectateSquare coordinates={{ x: 0, y: 0 }} />
        <SpectateSquare coordinates={{ x: 1, y: 0 }} />
        <SpectateSquare coordinates={{ x: 2, y: 0 }} />
      </Row>
      <Row>
        <SpectateSquare coordinates={{ x: 0, y: 1 }} />
        <SpectateSquare coordinates={{ x: 1, y: 1 }} />
        <SpectateSquare coordinates={{ x: 2, y: 1 }} />
      </Row>
      <Row>
        <SpectateSquare coordinates={{ x: 0, y: 2 }} />
        <SpectateSquare coordinates={{ x: 1, y: 2 }} />
        <SpectateSquare coordinates={{ x: 2, y: 2 }} />
      </Row>
    </div>
  );
};

export default SpectateBoard;
