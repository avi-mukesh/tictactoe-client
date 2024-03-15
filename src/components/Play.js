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
  const { isMatchedWithOpponent, setIsMatchedWithOpponent, setGameRoomId } =
    useGameState();

  const joinWaitingRoom = () => {
    setIsInWaitingRoom(true);
    socket.emit("join_waiting_room", { username: userInfo.username });
  };

  const leaveWaitingRoom = () => {
    setIsInWaitingRoom(false);
    socket.emit("leave_waiting_room", { username: userInfo.username });
  };

  const matchedWithOpponent = useCallback(
    (data) => {
      setMySymbol(data.symbols[socket.id]);
      setIsMatchedWithOpponent(true);
      console.log("roomId is", data.roomId);
      setGameRoomId(data.roomId);
    },
    [setIsMatchedWithOpponent, setMySymbol]
  );

  const sendPlayerInfo = ({ gameRoomId }) => {
    socket.emit("receive_player_info", {
      user: { username: userInfo.username },
      gameRoomId,
    });
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

    return () => {
      socket.off("connect", onConnect);
      socket.off("connect", onDisconnect);
      socket.off("matched_with_opponent", matchedWithOpponent);
      socket.off("request_player_info", sendPlayerInfo);
    };
  }, [matchedWithOpponent, setIsConnected]);

  return (
    <>
      <h2>Play</h2>
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
