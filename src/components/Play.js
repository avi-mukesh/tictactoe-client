import React, { useEffect, useState } from "react";
import Board from "./Board";
import Navbar from "./Navbar";
import { socket } from "../app/socket";
import useAuth from "../context/AuthContext";

const Play = () => {
  const userInfo = useAuth();

  const [isConnected, setIsConnected] = useState(false);

  const createChallenge = () => {
    socket.emit("challenge-created", { username: userInfo.username });
  };

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("challenge-accepted", (name) => {
      console.log("You are up against", name);
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("connect", onDisconnect);
      socket.off("challenger");
    };
  }, []);

  return (
    <>
      <Board />
      <section id="playButtons">
        <button className="btn btn-primary" onClick={createChallenge}>
          Play a stranger
        </button>
        <button className="btn btn-primary">Play a friend</button>
      </section>
    </>
  );
};

export default Play;
