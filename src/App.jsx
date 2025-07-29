import { useState, useEffect } from "react";
import FavStockGrid from "./components/FavGridStock";
import "./App.css";
import MovingAverages from "./components/MovingAverages";
import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import DoubleTop from "./components/DoubleTops";
import DoubleBottom from "./components/DoubleBottoms";
import { useFavorites } from "./contexts/FavoritesContext";

function App() {
  const [signals, setSignals] = useState([]);
  const [crossOvers, setCrossOvers] = useState([]);
  const [doubleTops, setDoubleTops] = useState([]);
  const [doubleBottoms, setDoubleBottoms] = useState([]);
  const { favorites, toggleFavorite } = useFavorites();
  const [results, setResults] = useState([]);
  const [favs, setFavs] = useState(
    JSON.parse(localStorage.getItem("favs") || "[]")
  );

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    console.log("Fetching signals for date:", today);
    const tempUrl = `https://stocktracker-api.onrender.com/api/signals?date=${today}`;
    fetch(tempUrl)
      .then((r) => r.json())
      .then((data) => {
        // data is { crossover_results, double_top_results, double_bottom_results }
        setResults(data);
      })
      .catch(console.error);
  }, []);

  console.log("stock signals:", signals);

  if (results.length == 0) {
    return <p>Loading Signals</p>;
  }

  return (
    <>
      <div className="bg-rose-50 w-screen h-screen">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <FavStockGrid favorites={[...favorites]} results={results} />
            }
          />
          <Route
            path="/averages"
            element={<MovingAverages stocks={results.crossover_results} />}
          />
          <Route
            path="/double-tops"
            element={<DoubleTop stocks={results.double_top_results} />}
          />
          <Route
            path="/double-bottoms"
            element={<DoubleBottom stocks={results.double_bottom_results} />}
          />
        </Routes>
      </div>
    </>
  );
}
export default App;
