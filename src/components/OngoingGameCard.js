import React from "react";
import OngoingGamePlayerInfo from "./OngoingGamePlayerInfo";

const OngoingGameCard = ({ game }) => {
  const playerOneId = game.playerOne;
  const playerTwoId = game.playerTwo;

  return (
    <div className="ongoing-game-card">
      <OngoingGamePlayerInfo playerId={playerOneId} />
      <OngoingGamePlayerInfo playerId={playerTwoId} />
    </div>
  );
};

export default OngoingGameCard;
