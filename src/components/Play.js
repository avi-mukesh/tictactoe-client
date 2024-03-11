import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { socket } from "../app/socket";
import { usePlayerContext } from "../context/PlayerContext";
import useGameState from "../context/GameContext";
import Game from "./Game";

const Play = () => {
  const { setMySymbol } = usePlayerContext();

  const { userInfo } = useSelector((state) => state.auth);

  const [isConnected, setIsConnected] = useState(false);
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

  const matchedWithOpponent = useCallback(
    (symbols) => {
      console.log("i am ", symbols[socket.id]);
      setMySymbol(symbols[socket.id]);
      setIsMatchedWithOpponent(true);
    },
    [setIsMatchedWithOpponent, setMySymbol]
  );

  const sendPlayerInfo = () => {
    socket.emit("receive_player_info", { username: userInfo.username });
  };

  const rematchRequested = () => {
    console.log("They requested a rematch!");
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
    socket.on("matched_with_opponent", matchedWithOpponent);
    socket.on("request_player_info", sendPlayerInfo);
    socket.on("rematch_requested", rematchRequested);

    return () => {
      socket.off("connect", onConnect);
      socket.off("connect", onDisconnect);
      socket.off("matched_with_opponent", matchedWithOpponent);
      socket.off("request_player_info", sendPlayerInfo);
      socket.off("rematch_requested", rematchRequested);
    };
  }, [matchedWithOpponent, setIsConnected]);

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
            <>
              <p className="message loading-ellipses">
                Waiting for someone to join
              </p>
              <button className="btn btn-primary" onClick={leaveWaitingRoom}>
                Cancel
              </button>
            </>
          )}
          {/* <button className="btn btn-primary">Play a friend</button> */}
        </section>
      )}
      {isMatchedWithOpponent && <Game />}
    </>
  );
};

export default Play;
