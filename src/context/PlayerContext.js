import { createContext, useState, useContext, useEffect } from "react";
import { SYMBOL } from "../util/symbol";

const PlayerContext = createContext(null);

export const PlayerProvider = ({ children }) => {
  const [mySymbol, setSymbol] = useState(null);
  const [opponentSymbol, setOpponentSymbol] = useState(null);

  const setMySymbol = (val) => {
    setSymbol(val);
    setOpponentSymbol(val === SYMBOL.NOUGHTS ? SYMBOL.CROSSES : SYMBOL.NOUGHTS);
  };

  return (
    <PlayerContext.Provider value={{ mySymbol, opponentSymbol, setMySymbol }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => useContext(PlayerContext);
