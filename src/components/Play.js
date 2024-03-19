import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { socket } from "../app/socket";
import { usePlayerContext } from "../context/PlayerContext";
import useGameState from "../context/GameContext";
import Game from "./Game";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCopy } from "@fortawesome/free-solid-svg-icons";

const Play = () => {
  const [customRoomLink, setCustomRoomLink] = useState();
  const [copiedCustomRoomLink, setCopiedCustomRoomLink] = useState(false);

  // TODO: carry on from here
  const { roomId } = useParams();
  console.log(roomId);

  const { setMySymbol } = usePlayerContext();

  const { userInfo } = useSelector((state) => state.auth);

  const [isConnected, setIsConnected] = useState(false);
  const [isInWaitingRoom, setIsInWaitingRoom] = useState(false);
  const { isMatchedWithOpponent, setIsMatchedWithOpponent, setGameRoomId } =
    useGameState();

  useEffect(() => {
    if (roomId) {
      socket.emit("join_custom_game_room", {
        username: userInfo.username,
        roomId,
      });
    }
  }, [userInfo.username, roomId]);

  const copyCustomGameRoomLink = () => {
    setCopiedCustomRoomLink(true);
    navigator.clipboard.writeText(customRoomLink);
  };

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
      setIsInWaitingRoom(false);
      setMySymbol(data.symbols[socket.id]);
      setIsMatchedWithOpponent(true);
      console.log("roomId is", data.roomId);
      setGameRoomId(data.roomId);
    },
    [setIsMatchedWithOpponent, setMySymbol, setGameRoomId]
  );

  const sendPlayerInfo = ({ gameRoomId }) => {
    socket.emit("receive_player_info", {
      user: { username: userInfo.username },
      gameRoomId,
    });
  };

  const createGameRoom = () => {
    setCopiedCustomRoomLink(null);
    socket.emit("create_custom_game_room", userInfo.username);
  };

  const customGameRoomCreated = (roomId) => {
    setCustomRoomLink(`http://localhost:3000/play/${roomId}`);
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
    socket.on("custom_game_room_created", customGameRoomCreated);

    return () => {
      socket.off("connect", onConnect);
      socket.off("connect", onDisconnect);
      socket.off("matched_with_opponent", matchedWithOpponent);
      socket.off("request_player_info", sendPlayerInfo);
      socket.off("custom_game_room_created", customGameRoomCreated);
    };
  }, [matchedWithOpponent, sendPlayerInfo, setIsConnected]);

  return (
    <>
      <h2>Play</h2>
      {!isMatchedWithOpponent && (
        <section id="playButtons">
          {!isInWaitingRoom && !customRoomLink && (
            <div className="button-container">
              <button className="btn btn-primary" onClick={joinWaitingRoom}>
                Play a stranger
              </button>
              <button className="btn btn-primary" onClick={createGameRoom}>
                Play a friend
              </button>
            </div>
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
          {customRoomLink && (
            <>
              <p className="message message-smaller">
                Share this link with your friend!
              </p>
              <p
                className="message message-link"
                onClick={copyCustomGameRoomLink}
              >
                {customRoomLink}
                <span
                  className={
                    copiedCustomRoomLink ? "green-text" : "purple-text"
                  }
                >
                  {copiedCustomRoomLink ? (
                    <>
                      <FontAwesomeIcon icon={faCheck} /> Copied!
                    </>
                  ) : (
                    <FontAwesomeIcon icon={faCopy} />
                  )}
                </span>
              </p>
            </>
          )}
        </section>
      )}
      {isMatchedWithOpponent && <Game />}
    </>
  );
};

export default Play;
