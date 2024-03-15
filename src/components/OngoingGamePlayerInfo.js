import React, { useEffect } from "react";
import { useGetUserQuery } from "../app/services/user/userService";
import { combineSlices } from "@reduxjs/toolkit";
import { SquareState } from "../squareState";

const OngoingGamePlayerInfo = ({ playerId, symbol }) => {
  const { data: player, isLoading, error } = useGetUserQuery(playerId);

  useEffect(() => {
    console.log(player);
  }, [player]);

  return (
    <>
      {!isLoading && !error && (
        <div className="ongoing-games-player-card">
          <p>{player.username}</p>
          <span>{SquareState[symbol]}</span>
        </div>
      )}
    </>
  );
};

export default OngoingGamePlayerInfo;
