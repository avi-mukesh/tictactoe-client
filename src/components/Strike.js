import React from "react";

const Strike = ({ strikeCoordinates }) => {
  const startCoords = strikeCoordinates.startCoords;
  const endCoords = strikeCoordinates.endCoords;

  let l = 0;
  let t = 0;
  let transform = "";

  let transformOriginTop = true;
  let height = "clamp(110px, 45vw, 525px)";

  if (startCoords.x === endCoords.x) {
    l = (100 / 3) * startCoords.x + 50 / 3;
    t = 50;
    transform = "translateY(-50%)";
    height = "clamp(200px, 45vw, 400px)";
  } else if (startCoords.y === endCoords.y) {
    l = 50;
    t = (100 / 3) * startCoords.y + 50 / 3;
    transform = "rotateZ(-90deg) translateY(-50%)";
    height = "clamp(100px, 40vw, 475px)";
  } else if (startCoords.x === startCoords.y) {
    l = 50;
    t = 50;
    transform = "rotateZ(-45deg) translateX(-50%) translateY(-50%)";
  } else {
    l = 50;
    t = 50;
    transform = "rotateZ(45deg) translateY(-50%)";
    // transformOriginTop = false;
  }

  const strikeStyle = {
    left: `${l}%`,
    top: `${t}%`,
    transform,
    height,
  };

  return (
    <div
      className={`strike transform-origin-${
        transformOriginTop ? "top" : "bottom"
      }`}
      style={strikeStyle}
    ></div>
  );
};

export default Strike;
