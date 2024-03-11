import React, { useRef } from "react";
import { Link } from "react-router-dom";

const NavButton = ({ linkTo, children }) => {
  const linkRef = useRef(null);

  return (
    <li className="nav-button" onClick={() => linkRef.current.click()}>
      <Link ref={linkRef} to={linkTo}>
        {children}
      </Link>
    </li>
  );
};

export default NavButton;
