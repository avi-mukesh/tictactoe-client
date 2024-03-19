import React, { useState } from "react";
import PreviousGamePlayerInfo from "./PreviousGamePlayerInfo";
import { GAME_RESULT } from "../util/gameResult";
import { useSelector } from "react-redux";

const PreviousGame = ({ game }) => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <article>
      <PreviousGamePlayerInfo
        playerId={game.playerOne}
        result={
          !game.winner
            ? GAME_RESULT.DRAW
            : game.playerOne === game.winner
            ? GAME_RESULT.WIN
            : GAME_RESULT.LOSS
        }
      />
      <p>
        {!game.winner
          ? "Draw"
          : game.winner === userInfo.id
          ? "You won!"
          : "You lost!"}
      </p>
      <PreviousGamePlayerInfo
        playerId={game.playerTwo}
        result={
          !game.winner
            ? GAME_RESULT.DRAW
            : game.playerTwo === game.winner
            ? GAME_RESULT.WIN
            : GAME_RESULT.LOSS
        }
      />
    </article>
  );
};

export default PreviousGame;
