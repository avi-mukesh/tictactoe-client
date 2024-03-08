import React from "react";
import { Link } from "react-router-dom";

const NavButton = ({ linkTo, children }) => {
  return (
    <li className="nav-button">
      <Link to={linkTo}>{children}</Link>
    </li>
  );
};

export default NavButton;
