import React, { useEffect } from "react";
import { useGetUsersQuery } from "../app/services/user/userService";
import useTitle from "../hooks/useTitle";
import { Link } from "react-router-dom";

const Leaderboard = () => {
  useTitle("Leaderboard");
  const { data: users, error, isLoading } = useGetUsersQuery();

  useEffect(() => {
    console.log();
  }, [users]);

  return (
    <>
      <h2>Leaderboard</h2>
      <section className="leaderboard">
        <table className="leaderboard-table">
          <thead>
            <th>Username</th>
            <th>ELO</th>
          </thead>

          <tbody>
            {isLoading ? (
              <p className="message loading-ellipses">Loading</p>
            ) : (
              users
                .toSorted((user1, user2) =>
                  user1.elo < user2.elo ? 1 : user1.elo > user2.elo ? -1 : 0
                )
                .map((user) => (
                  <tr>
                    <td>
                      <Link to={`/profile/${user._id}`}>{user.username}</Link>
                    </td>
                    <td>{user.elo}</td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default Leaderboard;
