import React, { useEffect } from "react";
import { useGetUsersQuery } from "../app/services/user/userService";
import useTitle from "../hooks/useTitle";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";

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
            <th></th>
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
                .map((user, i) => (
                  <tr>
                    <td className="position">
                      {i === 0 ? (
                        <span id="crown">
                          <FontAwesomeIcon icon={faCrown} />
                        </span>
                      ) : (
                        i + 1
                      )}
                    </td>
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
