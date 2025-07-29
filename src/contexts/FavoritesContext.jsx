// FavoritesContext.jsx
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  // 1. Initialize from localStorage (once)
  const [favorites, setFavorites] = useState(() => {
    const raw = localStorage.getItem("favorites");
    return raw ? new Set(JSON.parse(raw)) : new Set();
  });

  // 2. Sync back whenever it changes
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify([...favorites]));
  }, [favorites]);

  // 3. Toggle helper
  const toggleFavorite = useCallback((symbol) => {
    setFavorites((favs) => {
      const next = new Set(favs);
      next.has(symbol) ? next.delete(symbol) : next.add(symbol);
      return next;
    });
  }, []);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
