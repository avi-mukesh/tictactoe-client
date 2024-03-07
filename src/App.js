import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import useTitle from "./hooks/useTitle";
import Login from "./components/Login";
import Register from "./components/Register";
import NotLoggedInSharedLayout from "./components/NotLoggedInSharedLayout";

function App() {
  useTitle("Login");

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<NotLoggedInSharedLayout />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
