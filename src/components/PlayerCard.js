import React from "react";

const PlayerCard = ({ playerInfo, theirTurn }) => {
  let className = "player-card ";
  className += theirTurn ? "player-card-turn" : "player-card-not-turn";

  return (
    <div className={className}>
      <p>{playerInfo?.username}</p>
      <span>{playerInfo?.elo}</span>
    </div>
  );
};

export default PlayerCard;
