import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getOngoingGames } from "../features/game/gameAction";
import { useGetOngoingGamesQuery } from "../app/services/game/gameService";
import OngoingGameCard from "./OngoingGameCard";

const OngoingGames = () => {
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
    </>
  );
};

export default OngoingGames;
