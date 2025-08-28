// FavStockGridIndia.jsx
import { useFavorites } from "../contexts/FavoritesContext";
import FavStockGrid from "./FavGridStock";

export default function FavGridStockUS({ results }) {
  const { all, has, toggle } = useFavorites("american");
  console.log("FavGridStockUS all:", all, "has:", has, "toggle:", toggle);

  // FavGridStock expects prop 'toggleFavorite', not 'onToggle'
  return (
    <FavStockGrid results={results} favorites={all} toggleFavorite={toggle} />
  );
}
