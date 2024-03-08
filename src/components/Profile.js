import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserDetailsQuery } from "../app/services/auth/authService";
import { logout, setCredentials } from "../features/auth/authSlice";

const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { data, isFetching } = useGetUserDetailsQuery("userDetails", {
    pollingInterval: 900000,
  });

  useEffect(() => {
    if (data) dispatch(setCredentials(data));
  }, [data, dispatch]);

  return (
    <>
      <div style={{ fontSize: "3rem" }}>
        {isFetching
          ? "Fetching your profile"
          : userInfo !== null
          ? `Logged in! Your access token is: ${userInfo.accessToken}`
          : "You're not logged in"}
      </div>
      <div>
        <button className="btn btn-danger">Log out</button>
      </div>
    </>
  );
};

export default Profile;
