import React, { useEffect } from "react";

const PlayerCard = ({ playerInfo, theirTurn }) => {
  let className = "player-card ";
  className += theirTurn ? "player-card-turn" : "player-card-not-turn";

  return <div className={className}>{playerInfo?.username}</div>;
};

export default PlayerCard;
