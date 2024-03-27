import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useGetPreviousGamesQuery } from "../app/services/game/gameService";
import { useGetUserQuery } from "../app/services/user/userService";
import PreviousGame from "./PreviousGame";
import useTitle from "../hooks/useTitle";

const Profile = () => {
  useTitle("Profile");
  const { userId } = useParams();

  const { userInfo } = useSelector((state) => state.auth);

  console.log("query userid", userId);

  const { data: user } = useGetUserQuery(userId || userInfo.id, {
    refetchOnMountOrArgChange: true,
  });

  const {
    data: previousGames,
    isLoading,
    isSuccess,
  } = useGetPreviousGamesQuery(user?.username, {
    refetchOnMountOrArgChange: true,
  });
  const myProfile = !userId || userId === userInfo.id;

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const onLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      <h2>
        {myProfile
          ? `Welcome, ${user?.username}`
          : `${user?.username}'s profile`}
      </h2>
      <p className="message message-smaller">ELO {user?.elo}</p>
      <section id="profile">
        <div id="previous-games-container">
          <h3>Previous games</h3>
          {isLoading ? (
            <p className="message loading-ellipses">Loading</p>
          ) : (
            isSuccess && (
              <section className="previous-games">
                {previousGames.length > 0 ? (
                  previousGames.map((prevGame) => (
                    <PreviousGame
                      game={prevGame}
                      key={prevGame._id}
                      myProfile={myProfile}
                    />
                  ))
                ) : (
                  <p className="text-red">No games to show 😔</p>
                )}
              </section>
            )
          )}
        </div>

        {myProfile && (
          <div className="button-container">
            <Link to="/update-password" className="btn btn-secondary">
              Reset password
            </Link>
            <button className="btn btn-danger" onClick={onLogout}>
              Log out
            </button>
          </div>
        )}
      </section>
    </>
  );
};

export default Profile;
