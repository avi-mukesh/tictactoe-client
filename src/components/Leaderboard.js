import React from "react";
import { useGetUsersQuery } from "../app/services/user/userService";

const Leaderboard = () => {
  const { data: users, error, isLoading } = useGetUsersQuery();

  return (
    <>
      <h2>Leaderboard</h2>
      <section className="leaderboard">
        <table>
          <thead>
            <th>Username</th>
            <th>ELO</th>
          </thead>

          <tbody>
            {isLoading ? (
              <p className="message loading-ellipses">Loading</p>
            ) : (
              users.map((user) => (
                <tr>
                  <td>{user.username}</td>
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
