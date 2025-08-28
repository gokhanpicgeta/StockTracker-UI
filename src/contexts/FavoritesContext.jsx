// FavoritesContext.jsx
import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  useContext,
} from "react";

const FavoritesContext = createContext(null);

// Optional: use two keys so each list persists independently
const US_KEY = "favorites:american";
const IN_KEY = "favorites:indian";

export function FavoritesProvider({ children }) {
  // 1) hydrate each set from localStorage once
  const [american, setAmerican] = useState(() => {
    try {
      return new Set(JSON.parse(localStorage.getItem(US_KEY) ?? "[]"));
    } catch {
      return new Set();
    }
  });
  const [indian, setIndian] = useState(() => {
    try {
      return new Set(JSON.parse(localStorage.getItem(IN_KEY) ?? "[]"));
    } catch {
      return new Set();
    }
  });

  // 2) persist each set when it changes
  useEffect(() => {
    localStorage.setItem(US_KEY, JSON.stringify([...american]));
  }, [american]);

  useEffect(() => {
    localStorage.setItem(IN_KEY, JSON.stringify([...indian]));
  }, [indian]);

  // 3) independent togglers
  const toggleAmerican = useCallback((id) => {
    setAmerican((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const toggleIndian = useCallback((id) => {
    setIndian((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  // (optional) helpers
  const hasAmerican = useCallback((id) => american.has(id), [american]);
  const hasIndian = useCallback((id) => indian.has(id), [indian]);

  const value = useMemo(
    () => ({
      american,
      indian,
      toggleAmerican,
      toggleIndian,
      hasAmerican,
      hasIndian,
    }),
    [american, indian, toggleAmerican, toggleIndian, hasAmerican, hasIndian]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useAmericanFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx)
    throw new Error(
      "useAmericanFavorites must be used within FavoritesProvider"
    );
  return {
    all: ctx.american, // <— Set (not array)
    has: ctx.hasAmerican,
    toggle: ctx.toggleAmerican,
  };
}

export function useIndianFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx)
    throw new Error("useIndianFavorites must be used within FavoritesProvider");
  return {
    all: ctx.indian, // <— Set (not array)
    has: ctx.hasIndian,
    toggle: ctx.toggleIndian,
  };
}

export function useFavorites(list /* "american" | "indian" */) {
  const ctx = useContext(FavoritesContext);
  if (!ctx)
    throw new Error("useFavorites must be used within FavoritesProvider");

  const isIndian = list === "indian";
  const set = isIndian ? ctx.indian : ctx.american;
  const toggle = isIndian ? ctx.toggleIndian : ctx.toggleAmerican;
  const has = (id) => set.has(id);

  // 'all' is the Set itself so consumers can use .size and .has
  return { all: set, has, toggle };
}
