import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const RequireAuth = () => {
  const { userInfo } = useSelector((state) => state.auth);

  if (!userInfo) {
    return (
      <>
        <div style={{ fontSize: "3rem", color: "red" }}>
          Unauthorized brother!
        </div>
        <Link to="/" className="btn btn-primary">
          Back to log in
        </Link>
      </>
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
