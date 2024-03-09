const { createContext, useState, useContext } = require("react");

const PlayerContext = createContext(null);

export const PlayerProvider = ({ children }) => {
  const [symbol, setSymbol] = useState(null);
  const [opponentSymbol, setOpponentSymbol] = useState(null);

  const setMySymbol = (val) => {
    setSymbol(val);
    setOpponentSymbol(val === "NOUGHTS" ? "CROSSES" : "NOUGHTS");
  };

  return (
    <PlayerContext.Provider value={{ symbol, opponentSymbol, setMySymbol }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => useContext(PlayerContext);
