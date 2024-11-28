import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useGameState from "../context/GameContext";
import { usePlayerContext } from "../context/PlayerContext";
import Board from "./Board";
import { SYMBOL } from "../util/symbol";
import { Link } from "react-router-dom";
import PlayerCard from "./PlayerCard";
import { GAME_RESULT } from "../util/gameResult";
import { useGetUserQuery } from "../app/services/user/userService";

const Game = () => {
  const {
    isPlaying,
    isMyTurn,
    setIsMyTurn,
    gameResult,
    setIsPlaying,
    rematchRequested,
    requestRematch,
    revokeRematchRequest,
    receivedRematchRequest,
    acceptRematchRequest,
    declineRematchRequest,
    opponentInfo,
    strikeCoordinates,
    resetGameState,
    setIsMatchedWithOpponent,
  } = useGameState();

  const { userInfo } = useSelector((state) => state.auth);

  const { data: user } = useGetUserQuery(userInfo.id, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 2000,
  });
  const { data: opponent, isLoading: loadingOpponent } = useGetUserQuery(
    opponentInfo?.id,
    {
      refetchOnMountOrArgChange: true,
      pollingInterval: 2000,
    }
  );

  const { mySymbol } = usePlayerContext();

  const backToPlayMainPage = () => {
    resetGameState();
    setIsMatchedWithOpponent(false);
  };

  useEffect(() => {
    setIsPlaying(true);
    setIsMyTurn(mySymbol === SYMBOL.NOUGHTS);
  }, [mySymbol, setIsMyTurn, setIsPlaying]);

  return (
    <section className="game-container">
      <div className="game-message-container">
        {isPlaying && (
          <p className="game-turn-message ">
            {isMyTurn ? "Your turn" : `${opponent?.username}'s turn`}
          </p>
        )}
        {gameResult && (
          <p
            className={`game-result-message game-result-message-${gameResult.toLowerCase()}`}
          >
            {gameResult === GAME_RESULT.WIN
              ? "You win!"
              : gameResult === GAME_RESULT.LOSS
              ? "You lost!"
              : "It's a draw!"}
          </p>
        )}
      </div>
      <Board strikeCoordinates={strikeCoordinates} />
      {isPlaying && (
        <article className="player-card-container">
          <PlayerCard
            username={userInfo?.username}
            elo={user?.elo}
            theirTurn={isMyTurn}
          />
          {
            <PlayerCard
              username={opponentInfo?.username}
              elo={opponent?.elo || opponentInfo?.elo}
              theirTurn={!isMyTurn}
            />
          }
        </article>
      )}
      {gameResult && (
        <div>
          {rematchRequested ? (
            <p className="message loading-ellipsis">Waiting for response...</p>
          ) : receivedRematchRequest ? (
            <button className="btn btn-primary" onClick={acceptRematchRequest}>
              Accept rematch
            </button>
          ) : (
            <button className="btn btn-primary" onClick={requestRematch}>
              Play opponent again
            </button>
          )}
          <Link
            to="/play"
            className="btn btn-secondary"
            onClick={backToPlayMainPage}
          >
            New opponent
          </Link>
        </div>
      )}
    </section>
  );
};

export default Game;
