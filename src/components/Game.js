import React, { useEffect } from "react";
import useGameState from "../context/GameContext";
import { usePlayerContext } from "../context/PlayerContext";
import Board from "./Board";

const Game = () => {
  const { isPlaying, isMyTurn, setIsMyTurn, gameResult, setIsPlaying } =
    useGameState();

  const { mySymbol } = usePlayerContext();
  useEffect(() => {
    console.log("GAME STARTED. My symbol is", mySymbol);
    setIsPlaying(true);
    setIsMyTurn(mySymbol === "NOUGHTS");
  }, [mySymbol, setIsMyTurn, setIsPlaying]);

  return (
    <div className="game-container">
      {isPlaying && <p>{isMyTurn ? "My turn" : "Opponent's turn"}</p>}
      {gameResult && <p>{gameResult}</p>}
      <Board />
      {gameResult && <button className="btn btn-primary">Play again</button>}
    </div>
  );
};

export default Game;
