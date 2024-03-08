import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const RequireAuth = () => {
  const { userInfo } = useSelector((state) => state.auth);

  if (!userInfo) {
    return (
      <div style={{ fontSize: "5rem", color: "red" }}>
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
