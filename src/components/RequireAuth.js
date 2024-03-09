import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import Navbar from "./Navbar";

const RequireAuth = () => {
  const { userInfo } = useSelector((state) => state.auth);

  if (!userInfo) {
    return (
      <div style={{ fontSize: "3rem", color: "red" }}>
        Unauthorized brother!
      </div>
    );
  }

  return (
    <>
      <Outlet />
      <Navbar />
    </>
  );
};

export default RequireAuth;
