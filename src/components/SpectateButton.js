import React from "react";
import { Link } from "react-router-dom";

const SpectateButton = () => {
  return (
    <Link id="spectate-button" to="/spectate" className="btn btn-secondary">
      Spectate
    </Link>
  );
};

export default SpectateButton;
