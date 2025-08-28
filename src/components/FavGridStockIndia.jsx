// FavStockGridIndia.jsx
import { useFavorites } from "../contexts/FavoritesContext";
import FavStockGrid from "./FavGridStock";

export default function FavStockGridIndia({ results }) {
  const { all, has, toggle } = useFavorites("indian");
  console.log("FavStockGridIndia all:", all, "has:", has, "toggle:", toggle);

  // FavGridStock expects prop 'toggleFavorite', not 'onToggle'
  return (
    <FavStockGrid results={results} favorites={all} toggleFavorite={toggle} />
  );
}
