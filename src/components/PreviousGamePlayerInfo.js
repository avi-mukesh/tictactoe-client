import React from "react";
import { useGetUserQuery } from "../app/services/user/userService";

const PreviousGamePlayerInfo = ({ playerId, result }) => {
  const { data: user, isSuccess } = useGetUserQuery(playerId);

  return (
    isSuccess && (
      <div className={`previous-game-player-info ${result.toLowerCase()}`}>
        {user.username}
      </div>
    )
  );
};

export default PreviousGamePlayerInfo;
