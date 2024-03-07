import React from "react";
import { Outlet } from "react-router-dom";
import Board from "./Board";
import SpectateButton from "./SpectateButton";

const NotLoggedInSharedLayout = () => {
  return (
    <>
      <Board />
      <section>
        <Outlet />
        <SpectateButton />
      </section>
    </>
  );
};

export default NotLoggedInSharedLayout;
