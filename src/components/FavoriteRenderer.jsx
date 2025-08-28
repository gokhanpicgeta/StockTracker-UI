// FavoriteRenderer.jsx
import React from "react";
import { useFavorites } from "../contexts/FavoritesContext"; // new unified hook

export default function FavoriteRenderer({ data, country }) {
  const listId = country === "India" ? "indian" : "american";
  const { all, has, toggle } = useFavorites(listId); // <- hooks called unconditionally
  console.log("FavoriteRenderer all:", all, "has:", has, "toggle:", toggle);
  console.log("Rendering data for:", data);
  if (!data || !data.symbol) return null; // safety check

  const isFav = has(data.symbol);

  return (
    <span
      style={{ cursor: "pointer", fontSize: "1.2em" }}
      onClick={() => toggle(data.symbol)}
      title={isFav ? "Remove from favorites" : "Add to favorites"}
    >
      {isFav ? "★" : "☆"}
    </span>
  );
}
