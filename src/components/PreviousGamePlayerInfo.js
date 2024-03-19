import React from "react";
import { useGetUserDetailsQuery } from "../app/services/auth/authService";

const PreviousGamePlayerInfo = ({ playerId, result }) => {
  const { data: user, isSuccess } = useGetUserDetailsQuery(playerId);

  return (
    isSuccess && (
      <div className={`previous-game-player-info ${result.toLowerCase()}`}>
        {user.username}
      </div>
    )
  );
};

export default PreviousGamePlayerInfo;
