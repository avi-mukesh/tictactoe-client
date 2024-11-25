import React from "react";

const PlayerCard = ({ username, elo, theirTurn }) => {
  let className = "player-card ";
  className += theirTurn ? "player-card-turn" : "player-card-not-turn";

  return (
    <div className={className}>
      <p>{username}</p>
      <span>{elo}</span>
    </div>
  );
};

export default PlayerCard;
