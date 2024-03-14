import React from "react";

const Strike = ({ strikeCoordinates }) => {
  const startCoords = strikeCoordinates.startCoords;
  const endCoords = strikeCoordinates.endCoords;
  // const startCoords = { x: 2, y: 0 };
  // const endCoords = { x: 0, y: 2 };

  let l = 0;
  let t = 0;
  let transform = "";

  let transformOriginTop = true;

  if (startCoords.x === endCoords.x) {
    l = (100 / 3) * startCoords.x + 50 / 3;
    t = 50;
    transform = "translateY(-50%)";
  } else if (startCoords.y === endCoords.y) {
    l = 50;
    t = (100 / 3) * startCoords.y + 50 / 3;
    transform = "rotateZ(-90deg) translateY(-50%)";
  } else if (startCoords.x === startCoords.y) {
    l = 50;
    t = 50;
    transform = "rotateZ(-45deg) translateX(-50%) translateY(-50%)";
  } else {
    l = 50 / 3;
    t = -50 / 6;
    transform = "rotateZ(45deg)";
    transformOriginTop = false;
  }

  const strikeStyle = {
    left: `${l}%`,
    top: `${t}%`,
    transform,
  };

  // if (startCoords.x === 0) {
  // }

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
