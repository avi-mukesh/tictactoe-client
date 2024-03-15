import React, { useEffect } from "react";

const OngoingGameCard = ({ game }) => {
  const playerOneId = game.playerOne;
  const playerTwoId = game.playerTwo;

  useEffect(() => {
    console.log(game);
  }, []);
  return <div className="ongoing-game-card"></div>;
};

export default OngoingGameCard;
