import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="container">
      <header>
        <h1>Tic-Tac-Toe</h1>
      </header>
      <Outlet />
    </div>
  );
};

export default Layout;
