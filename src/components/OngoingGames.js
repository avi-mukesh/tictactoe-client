import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getOngoingGames } from "../features/game/gameAction";
import { useGetOngoingGamesQuery } from "../app/services/game/gameService";
import OngoingGameCard from "./OngoingGameCard";
import useTitle from "../hooks/useTitle";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";

const OngoingGames = () => {
  useTitle("Ongoing Games");
  const { userInfo } = useSelector((state) => state.auth);

  // this is the pattern using normal Redux toolkit
  // you have gameSlice and gameAction
  //   const { loading, success, ongoingGames } = useSelector((state) => state.game);
  //   const dispatch = useDispatch();
  //   useEffect(() => {
  //     dispatch(getOngoingGames());
  //   }, [dispatch]);

  // this is the pattern using RTK Query - just one line
  // can optionally specify how often to refetch the as well
  const {
    data: ongoingGames,
    error,
    isLoading,
  } = useGetOngoingGamesQuery(
    undefined
    // {
    // pollingInterval: 10000,
    // }
  );

  return (
    <>
      <h2>Spectate</h2>
      {isLoading ? (
        <p className="loading-ellipses">Loading</p>
      ) : error ? (
        <p className="message">Something went wrong</p>
      ) : (
        <>
          <h3>Ongoing Games</h3>
          {ongoingGames.length === 0 ? (
            <p className="message">No games to show</p>
          ) : (
            <section className="ongoing-games">
              {ongoingGames.map((game) => (
                <OngoingGameCard key={game._id} game={game} />
              ))}
            </section>
          )}
        </>
      )}
      {userInfo === null ? (
        <Link to="/" className="btn btn-primary btn-center">
          Back to log in
        </Link>
      ) : (
        <Navbar />
      )}
    </>
  );
};

export default OngoingGames;
