import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserDetailsQuery } from "../app/services/auth/authService";
import { logout, setCredentials } from "../features/auth/authSlice";
import { useGetPreviousGamesQuery } from "../app/services/game/gameService";
import PreviousGame from "./PreviousGame";

const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const {
    data: previousGames,
    isLoading,
    isSuccess,
    isError,
  } = useGetPreviousGamesQuery(userInfo.username);

  useEffect(() => {
    console.log("previous games:", previousGames);
  }, [previousGames]);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const onLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      <h2>Welcome, {userInfo.username}</h2>
      <section id="profile">
        <div id="previous-games-container">
          <h3>Previous games</h3>
          {isLoading ? (
            <p className="message loading-ellipses">Loading</p>
          ) : (
            <section className="previous-games">
              {previousGames.map((prevGame) => (
                <PreviousGame game={prevGame} key={prevGame._id} />
              ))}
            </section>
          )}
        </div>

        <div className="button-container">
          <button className="btn btn-secondary">Reset password</button>
          <button className="btn btn-danger" onClick={onLogout}>
            Log out
          </button>
        </div>
      </section>
    </>
  );
};

export default Profile;
