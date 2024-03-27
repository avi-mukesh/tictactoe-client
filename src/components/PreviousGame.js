import React, { useState } from "react";
import PreviousGamePlayerInfo from "./PreviousGamePlayerInfo";
import { GAME_RESULT } from "../util/gameResult";
import { useSelector } from "react-redux";

const PreviousGame = ({ game, myProfile }) => {
  console.log(myProfile);
  const { userInfo } = useSelector((state) => state.auth);

  const eloChange =
    game.playerOne === userInfo.id
      ? game.playerOneEloChange
      : game.playerTwoEloChange;

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
        {myProfile
          ? !game.winner
            ? "Draw"
            : game.winner === userInfo.id
            ? "You won!"
            : "You lost!"
          : ""}
        <span
          className={`elo-change ${
            eloChange > 0
              ? "green-text"
              : eloChange === 0
              ? "grey-text"
              : "red-text"
          }`}
        >
          {eloChange > 0 && "+"}
          {eloChange}
        </span>
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
