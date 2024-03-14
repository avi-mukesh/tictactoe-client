import React, { useEffect } from "react";
import useSpectate from "../context/SpectateContext";
import SpectateBoard from "./SpectateBoard";
import { socket } from "../app/socket";
import { SquareState } from "../squareState";
import PlayerCard from "./PlayerCard";

const Spectate = () => {
  const {
    gameRoomId,
    setGameRoomId,
    boardState,
    setBoardState,
    playerInfo,
    setPlayerInfo,
    playerOneTurn,
  } = useSpectate();

  return (
    <>
      <p className="message">Spectating</p>
      <SpectateBoard />
      <article className="player-card-container">
        <PlayerCard
          playerInfo={playerInfo.playerOne}
          theirTurn={playerOneTurn}
        />
        <PlayerCard
          playerInfo={playerInfo.playerTwo}
          theirTurn={!playerOneTurn}
        />
      </article>
    </>
  );
};

export default Spectate;
