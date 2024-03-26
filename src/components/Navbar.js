import React from "react";
import NavButton from "./NavButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGamepad,
  faRankingStar,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <footer className="footer">
      <nav className="nav">
        <ul>
          <NavButton linkTo="/leaderboard">
            <FontAwesomeIcon icon={faRankingStar} />
            <p>Leaderboard</p>
          </NavButton>
          <NavButton linkTo="/ongoing-games">
            <FontAwesomeIcon icon={faEye} />
            <p>Spectate</p>
          </NavButton>
          <NavButton linkTo="/play">
            <FontAwesomeIcon icon={faGamepad} />
            <p>Play</p>
          </NavButton>
          <NavButton linkTo="/profile">
            <FontAwesomeIcon icon={faUser} />
            <p>My Profile</p>
          </NavButton>
        </ul>
      </nav>
    </footer>
  );
};

export default Navbar;
