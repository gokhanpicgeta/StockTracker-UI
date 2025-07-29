// src/components/FavoriteRenderer.jsx
import React from "react";
import { useFavorites } from "../contexts/FavoritesContext";

export default function FavoriteRenderer({ data }) {
  const { favorites, toggleFavorite } = useFavorites();
  const isFav = favorites.has(data.symbol);
  console.log("FavoriteRenderer data:", data, "isFav:", isFav);
  return (
    <span
      style={{ cursor: "pointer", fontSize: "1.2em" }}
      onClick={() => toggleFavorite(data.symbol)}
      title={isFav ? "Remove from favorites" : "Add to favorites"}
    >
      {isFav ? "★" : "☆"}
    </span>
  );
}
