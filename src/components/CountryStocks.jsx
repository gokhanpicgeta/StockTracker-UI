import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { themeMaterial } from "ag-grid-community";
//import { useFavorites } from "../contexts/FavoritesContext";
import FavoriteRenderer from "./FavoriteRenderer";

export default function CountryStocks({ country, stocks }) {
  const [stocksData, setStocksData] = useState({});
  const movingAverages = stocks.crossover_results || {};
  const doubleBottoms = stocks.double_bottom_results || {};
  const doubleTops = stocks.double_top_results || {};
  const colData = [
    { field: "symbol", headerName: "Symbol", flex: 1 },
    { field: "movingAverage", headerName: "9 Crossing 45", flex: 1 },
    { field: "doubleBottom", headerName: "Double Bottom", flex: 1 },
    { field: "peakPrice", headerName: "Peak %", flex: 1 },
    { field: "dbDate", headerName: "Bottom Date", flex: 1 },
    { field: "doubleTop", headerName: "Double Top", flex: 1 },
    { field: "troughPrice", headerName: "Trough %", flex: 1 },
    { field: "dtDate", headerName: "Top Date", flex: 1 },
    { field: "rsi", headerName: "RSI", flex: 1 },
    {
      field: "fav",
      headerName: "Favorite",
      width: 100,
      cellRenderer: FavoriteRenderer,
      cellRendererParams: { country },
    },
  ];

  useEffect(() => {
    const rowData = Object.entries(stocks.rsi).map(([symbol, rsi]) => ({
      symbol,
      movingAverage: movingAverages[symbol] || "–",
      doubleBottom: doubleBottoms[symbol] ? "✓" : "–",
      peakPrice: doubleBottoms[symbol]
        ? (
            (doubleBottoms[symbol][1][5] /
              ((doubleBottoms[symbol][1][2] + doubleBottoms[symbol][1][3]) /
                2)) *
            100
          ).toFixed(2) + "%"
        : "–",
      dbDate: doubleBottoms[symbol]
        ? new Date(doubleBottoms[symbol][1][1]).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "–",
      doubleTop: doubleTops[symbol] ? "✓" : "–",
      troughPrice: doubleTops[symbol]
        ? (
            (doubleTops[symbol][1][5] /
              ((doubleTops[symbol][1][2] + doubleTops[symbol][1][3]) / 2)) *
            100
          ).toFixed(2) + "%"
        : "–",
      rsi: rsi.toFixed(2),
      dtDate: doubleTops[symbol]
        ? new Date(doubleTops[symbol][1][1]).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "–",
    }));
    console.log("Double Tops Rows:", rowData);
    setStocksData(rowData);
  }, [stocks]);

  return (
    <div>
      <h1 className="text-center flex justify-center my-4 text-2xl tracking-wide font-bold">
        Double Bottoms
      </h1>
      <div className="ag-theme-alpine h-96 w-5/6 mx-auto">
        {console.log("Stocks Data:", stocksData)}
        <AgGridReact
          theme={themeMaterial}
          rowData={stocksData}
          columnDefs={colData}
        />
      </div>
    </div>
  );
}
