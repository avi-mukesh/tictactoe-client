import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import useTitle from "./hooks/useTitle";
import Login from "./components/Login";
import Register from "./components/Register";
import Play from "./components/Play";
import Spectate from "./components/Spectate";
import OngoingGames from "./components/OngoingGames";
import NotLoggedInSharedLayout from "./components/NotLoggedInSharedLayout";
import Profile from "./components/Profile";
import RequireAuth from "./components/RequireAuth";
import { SpectateProvider } from "./context/SpectateContext";
import { PlayerProvider } from "./context/PlayerContext";
import { GameProvider } from "./context/GameContext";

function App() {
  useTitle("Login");

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<NotLoggedInSharedLayout />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route
            path="/play/:roomId?"
            element={
              <PlayerProvider>
                <GameProvider>
                  <Play />
                </GameProvider>
              </PlayerProvider>
            }
          />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="ongoing-games" element={<OngoingGames />} />
        <Route
          path="/spectate/:roomId"
          element={
            <SpectateProvider>
              <Spectate />
            </SpectateProvider>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
