import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import useTitle from "./hooks/useTitle";
import Login from "./components/Login";
import Register from "./components/Register";
import Play from "./components/Play";
import Spectate from "./components/Spectate";
import Leaderboard from "./components/Leaderboard";
import OngoingGames from "./components/OngoingGames";
import NotLoggedInSharedLayout from "./components/NotLoggedInSharedLayout";
import Profile from "./components/Profile";
import RequireAuth from "./components/RequireAuth";
import { SpectateProvider } from "./context/SpectateContext";
import { PlayerProvider } from "./context/PlayerContext";
import { GameProvider } from "./context/GameContext";
import PasswordResetEmail from "./components/PasswordResetEmail";
import UpdatePassword from "./components/UpdatePassword";

function App() {
  useTitle("Home");

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
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Route>
        <Route path="/ongoing-games" element={<OngoingGames />} />
        <Route
          path="/spectate/:roomId"
          element={
            <SpectateProvider>
              <Spectate />
            </SpectateProvider>
          }
        />
        <Route path="/password-reset-email" element={<PasswordResetEmail />} />
      </Route>
    </Routes>
  );
}

export default App;
