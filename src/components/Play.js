import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { socket } from "../app/socket";
import { usePlayerContext } from "../context/PlayerContext";
import useGameState from "../context/GameContext";
import Game from "./Game";

const Play = () => {
  const { setMySymbol } = usePlayerContext();

  const { userInfo } = useSelector((state) => state.auth);

  const [setIsConnected] = useState(false);
  const [isInWaitingRoom, setIsInWaitingRoom] = useState(false);
  const { isMatchedWithOpponent, setIsMatchedWithOpponent } = useGameState();

  const joinWaitingRoom = () => {
    setIsInWaitingRoom(true);
    socket.emit("join_waiting_room", { username: userInfo.username });
  };

  const leaveWaitingRoom = () => {
    setIsInWaitingRoom(false);
    socket.emit("leave_waiting_room", { username: userInfo.username });
  };

  const gameStarted = useCallback(
    (symbols) => {
      console.log("i am ", symbols[socket.id]);
      setMySymbol(symbols[socket.id]);
      setIsMatchedWithOpponent(true);
    },
    [setIsMatchedWithOpponent, setMySymbol]
  );

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    socket.on("game_started", gameStarted);

    return () => {
      socket.off("connect", onConnect);
      socket.off("connect", onDisconnect);
      socket.off("game_started", gameStarted);
    };
  }, [gameStarted, setIsConnected]);

  return (
    <>
      {!isMatchedWithOpponent && (
        <section id="playButtons">
          {!isInWaitingRoom && (
            <button className="btn btn-primary" onClick={joinWaitingRoom}>
              Play a stranger
            </button>
          )}
          {isInWaitingRoom && (
            <button className="btn btn-primary" onClick={leaveWaitingRoom}>
              Cancel
            </button>
          )}
          {/* <button className="btn btn-primary">Play a friend</button> */}
        </section>
      )}
      {isMatchedWithOpponent && <Game />}
    </>
  );
};

export default Play;
