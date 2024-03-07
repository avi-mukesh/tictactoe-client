import React from "react";
import Board from "./Board";
import Navbar from "./Navbar";

const Play = () => {
  return (
    <>
      <Board />
      <section id="playButtons">
        <button className="btn btn-primary">Play a stranger</button>
        <button className="btn btn-primary">Play a friend</button>
      </section>
      <Navbar />
    </>
  );
};

export default Play;
