import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { themeMaterial } from "ag-grid-community";
import { useFavorites } from "../contexts/FavoritesContext";
import FavoriteRenderer from "./FavoriteRenderer";

export default function DoubleTop({ stocks }) {
  console.log("Double Tops Stocks when loading:", stocks);
  const [stocksData, setStocksData] = useState({});
  const colData = [
    { field: "symbol", headerName: "Symbol", flex: 1 },
    { field: "window", headerName: "Window", flex: 1 },
    { field: "prevDate", headerName: "Previous Date", flex: 1 },
    { field: "prevPrice", headerName: "Previous High Price", flex: 1 },
    { field: "currPrice", headerName: "Current Price", flex: 1 },
    { field: "troughDate", headerName: "Trough Date", flex: 1 },
    { field: "troughPrice", headerName: "Trough Price", flex: 1 },
    { field: "troughPercentage", headerName: "Trough Percentage", flex: 1 },
    {
      fielder: "fav",
      headerName: "Favorite",
      width: 100,
      cellRenderer: FavoriteRenderer,
    },
  ];

  useEffect(() => {
    const rowData = Object.entries(stocks).map(
      ([symbol, [window, detailsArray]]) => ({
        symbol,
        window,
        prevDate: new Date(detailsArray[0]).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        currDate: detailsArray[1],
        prevPrice: detailsArray[2].toFixed(2),
        currPrice: detailsArray[3].toFixed(2),
        troughDate: new Date(detailsArray[4]).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        troughPrice: detailsArray[5].toFixed(2),
        troughPercentage:
          (
            (detailsArray[5] / ((detailsArray[2] + detailsArray[3]) / 2)) *
            100
          ).toFixed(2) + "%",
      })
    );
    console.log("Double Tops Rows:", rowData);
    setStocksData(rowData);
  }, [stocks]);

  return (
    <div>
      <h1 className="text-center flex justify-center my-4 text-2xl tracking-wide font-bold">
        Double Tops
      </h1>
      <div className="ag-theme-alpine h-96 w-3/4 mx-auto">
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
