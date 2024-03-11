import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useGameState from "../context/GameContext";
import { usePlayerContext } from "../context/PlayerContext";
import Board from "./Board";
import { SYMBOL } from "../util/symbol";
import { Link } from "react-router-dom";
import PlayerCard from "./PlayerCard";
import { GAME_RESULT } from "../util/gameResult";

const Game = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const {
    isPlaying,
    isMyTurn,
    setIsMyTurn,
    gameResult,
    setIsPlaying,
    requestRematch,
    opponentInfo,
  } = useGameState();

  const { mySymbol } = usePlayerContext();
  useEffect(() => {
    console.log("GAME STARTED. My symbol is", mySymbol);
    setIsPlaying(true);
    setIsMyTurn(mySymbol === SYMBOL.NOUGHTS);
  }, [mySymbol, setIsMyTurn, setIsPlaying]);

  return (
    <section className="game-container">
      <div className="game-message-container">
        {isPlaying && (
          <p className="game-turn-message ">
            {isMyTurn ? "Your turn" : `${opponentInfo?.username}'s turn`}
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
      <Board />
      <article className="player-card-container">
        <PlayerCard playerInfo={userInfo} theirTurn={isMyTurn} />
        <PlayerCard playerInfo={opponentInfo} theirTurn={!isMyTurn} />
      </article>
      {gameResult && (
        <div>
          <button className="btn btn-primary" onClick={requestRematch}>
            Play geeza again
          </button>
          <Link to="play" class="btn btn-secondary">
            Give me a new brudda
          </Link>
        </div>
      )}
    </section>
  );
};

export default Game;
