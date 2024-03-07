import React from "react";
import NavButton from "./NavButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <footer className="footer">
      <nav className="nav">
        <ul>
          <NavButton>
            <FontAwesomeIcon icon={faEye} />
            <p>Spectate</p>
          </NavButton>
          <NavButton>Play</NavButton>
          <NavButton>
            <FontAwesomeIcon icon={faUser} />
            <p>My Profile</p>
          </NavButton>
        </ul>
      </nav>
    </footer>
  );
};

export default Navbar;
