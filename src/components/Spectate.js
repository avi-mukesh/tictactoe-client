import React, { useEffect } from "react";
import useSpectate from "../context/SpectateContext";
import SpectateBoard from "./SpectateBoard";

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
    </>
  );
};

export default Spectate;
