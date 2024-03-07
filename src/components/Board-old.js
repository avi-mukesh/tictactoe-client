import React, { useEffect, useRef } from "react";

const Board = (props) => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const context = canvas.getContext("2d");

    const draw = (ctx) => {
      ctx.beginPath();
      ctx.moveTo(canvas.width / 3, 0);
      ctx.lineTo(canvas.width / 3, canvas.height);
      ctx.strokeStyle = "#f5f5f5";
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo((2 * canvas.width) / 3, 0);
      ctx.lineTo((2 * canvas.width) / 3, canvas.height);
      ctx.strokeStyle = "#f5f5f5";
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, 200);
      ctx.lineTo(600, 200);
      ctx.strokeStyle = "#f5f5f5";
      ctx.stroke();
    };

    draw(context);
  }, []);

  return <canvas className="board" ref={ref} {...props}></canvas>;
};

export default Board;
