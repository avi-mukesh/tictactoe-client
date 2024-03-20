import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useSpectate from "../context/SpectateContext";
import SpectateBoard from "./SpectateBoard";
import PlayerCard from "./PlayerCard";
import useTitle from "../hooks/useTitle";

const Spectate = () => {
  useTitle("Spectating");

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
      {gameRoomId ? (
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
      ) : (
        <p className="message message-error">Invalid game room supplied</p>
      )}
      <Link to="/ongoing-games" className="btn btn-primary">
        Back to ongoing games
      </Link>
    </>
  );
};

export default Spectate;
