import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import useTitle from "./hooks/useTitle";
import Login from "./components/Login";
import Register from "./components/Register";
import Play from "./components/Play";
import NotLoggedInSharedLayout from "./components/NotLoggedInSharedLayout";
import Profile from "./components/Profile";

function App() {
  useTitle("Login");

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<NotLoggedInSharedLayout />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/play" element={<Play />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
