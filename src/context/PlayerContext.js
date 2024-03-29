import { createContext, useState, useContext } from "react";
import { SYMBOL } from "../util/symbol";

const PlayerContext = createContext(null);

export const PlayerProvider = ({ children }) => {
  const [mySymbol, setSymbol] = useState(null);
  const [opponentSymbol, setOpponentSymbol] = useState(null);

  const setMySymbol = (val) => {
    setSymbol(val);
    setOpponentSymbol(val === SYMBOL.NOUGHTS ? SYMBOL.CROSSES : SYMBOL.NOUGHTS);
  };

  const reverseSymbols = () => {
    setMySymbol(mySymbol === SYMBOL.NOUGHTS ? SYMBOL.CROSSES : SYMBOL.NOUGHTS);
    setOpponentSymbol(
      opponentSymbol === SYMBOL.NOUGHTS ? SYMBOL.CROSSES : SYMBOL.NOUGHTS
    );
  };

  return (
    <PlayerContext.Provider
      value={{ mySymbol, opponentSymbol, setMySymbol, reverseSymbols }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => useContext(PlayerContext);
