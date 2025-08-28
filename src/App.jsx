import { useState, useEffect } from "react";
import FavStockGrid from "./components/FavGridStock";
import "./App.css";
import MovingAverages from "./components/MovingAverages";
import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import DoubleTop from "./components/DoubleTops";
import DoubleBottom from "./components/DoubleBottoms";
//import { useFavorites } from "./contexts/FavoritesContext";
import CountryStocks from "./components/CountryStocks";
import FavStockGridUS from "./components/FavGridStockUS";
import FavStockGridIndia from "./components/FavGridStockIndia";

function App() {
  const [signals, setSignals] = useState([]);
  const [crossOvers, setCrossOvers] = useState([]);
  const [doubleTops, setDoubleTops] = useState([]);
  const [doubleBottoms, setDoubleBottoms] = useState([]);
  //const { favorites, toggleFavorite } = useFavorites();
  const [results, setResults] = useState([]);
  const [americanStocks, setAmericanStocks] = useState([]);
  const [indianStocks, setIndianStocks] = useState([]);
  const [favs, setFavs] = useState(
    JSON.parse(localStorage.getItem("favs") || "[]")
  );

  async function fetchWithFallBack(dateString, maxTries = 10) {
    let currentDate = new Date(dateString);
    for (let i = 0; i < maxTries; i++) {
      const isoDate = currentDate.toISOString().slice(0, 10);
      const indianUrl = `https://stocktracker-api.onrender.com/api/signals?date=${isoDate}&country=India`;
      let r = await fetch(indianUrl);
      let data = await r.json();
      console.log("Fetched data for date:", isoDate, data);

      // Change this check depending on your API response structure:
      if (!Array.isArray(data)) {
        setIndianStocks(data);
      }
      const americanUrl = `https://stocktracker-api.onrender.com/api/signals?date=${isoDate}&country=America`;
      r = await fetch(americanUrl);
      data = await r.json();
      console.log("Fetched data for date:", isoDate, data);

      // Change this check depending on your API response structure:
      if (!Array.isArray(data)) {
        setAmericanStocks(data);
        return;
      }

      // Move to previous day
      currentDate.setDate(currentDate.getDate() - 1);
    }
  }

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);

    console.log("Fetching signals for date:", today);
    fetchWithFallBack(today).catch(console.error);
  }, []);

  console.log("stock signals:", signals);
  console.log("American Stocks:", americanStocks);
  if (americanStocks.length == 0 || indianStocks.length == 0) {
    return <p>Loading Signals</p>;
  }

  return (
    <>
      <div className="bg-rose-50 w-screen h-screen">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<FavStockGridUS results={americanStocks} />}
          />
          <Route
            path="/indianFavs"
            element={<FavStockGridIndia results={indianStocks} />}
          />
          <Route
            path="/nifty50"
            element={<CountryStocks country="India" stocks={indianStocks} />}
          />
          <Route
            path="/sp500"
            element={<CountryStocks country="USA" stocks={americanStocks} />}
          />
        </Routes>
      </div>
    </>
  );
}
export default App;
