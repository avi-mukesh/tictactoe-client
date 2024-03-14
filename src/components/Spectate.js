import React, { useEffect } from "react";
import useSpectate from "../context/SpectateContext";
import SpectateBoard from "./SpectateBoard";
import { socket } from "../app/socket";
import { SquareState } from "../squareState";

const Spectate = () => {
  const {
    gameRoomId,
    setGameRoomId,
    boardState,
    setBoardState,
    playerInfo,
    setPlayerInfo,
  } = useSpectate();

  return (
    <>
      <p className="message">Spectating</p>
      <SpectateBoard />
      <div style={{ fontSize: "3rem", color: "orangered" }}>
        <p>Player 1: {playerInfo?.playerOne?.username}</p>
        <p>Player 2: {playerInfo?.playerTwo?.username}</p>
      </div>
    </>
  );
};

export default Spectate;
