import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useSpectate from "../context/SpectateContext";
import SpectateBoard from "./SpectateBoard";
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
    strikeCoordinates,
  } = useSpectate();

  const { roomId } = useParams();

  useEffect(() => {
    setGameRoomId(roomId);
  }, [setGameRoomId, roomId]);

  return (
    <>
      <p className="message">Spectating</p>
      <SpectateBoard strikeCoordinates={strikeCoordinates} />
      <article className="player-card-container">
        <PlayerCard
          playerInfo={playerInfo?.playerOne}
          theirTurn={playerOneTurn}
        />
        <PlayerCard
          playerInfo={playerInfo?.playerTwo}
          theirTurn={!playerOneTurn}
        />
      </article>
    </>
  );
};

export default Spectate;
