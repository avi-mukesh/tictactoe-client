import React from "react";
import { useNavigate } from "react-router-dom";
import OngoingGamePlayerInfo from "./OngoingGamePlayerInfo";
import { SYMBOL } from "../util/symbol";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const OngoingGameCard = ({ game }) => {
  const playerOneId = game.playerOne;
  const playerTwoId = game.playerTwo;

  const navigate = useNavigate();

  const spectate = () => {
    console.log(`trying to spectate ${game.roomId}`);
    navigate(`/spectate/${game.roomId}`);
  };

  return (
    <div className="ongoing-game-card">
      <OngoingGamePlayerInfo playerId={playerOneId} symbol={SYMBOL.NOUGHTS} />
      <div>
        <button className="btn btn-primary btn-icon" onClick={spectate}>
          <FontAwesomeIcon icon={faEye} />
        </button>
      </div>
      <OngoingGamePlayerInfo playerId={playerTwoId} symbol={SYMBOL.CROSSES} />
    </div>
  );
};

export default OngoingGameCard;
