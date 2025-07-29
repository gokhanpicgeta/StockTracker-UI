import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import React from "react";
import { useState, useEffect, useMemo } from "react";
import { themeMaterial } from "ag-grid-community";
import { useFavorites } from "../contexts/FavoritesContext";
import FavoriteRenderer from "./FavoriteRenderer";
ModuleRegistry.registerModules([AllCommunityModule]);

import { AgGridReact } from "ag-grid-react";

export default function MovingAverages({ stocks }) {
  const [stocksData, setStocksData] = useState({});
  const [rowData, setRowData] = useState([]);
  useEffect(() => {
    setRowData(
      Object.entries(stocks).map(([symbol, status]) => ({
        symbol,
        status,
      }))
    );
  }, [stocks]);

  // Get the shared favorites Set and toggle function
  const { favorites, toggleFavorite } = useFavorites();

  const columnDefs = useMemo(
    () => [
      {
        field: "symbol",
        headerName: "Symbol",
        flex: 1,
        sortable: true,
        resizable: true,
      },
      {
        field: "status",
        headerName: "Signal",
        flex: 1,
        sortable: true,
        resizable: true,
      },
      {
        headerName: "",
        field: "fav",
        width: 100,
        headerName: "Favorite",
        // use our FavoriteRenderer for that star
        cellRenderer: FavoriteRenderer,
        sortable: true,
      },
    ],
    []
  );

  return (
    <div>
      <h1 className="text-center flex justify-center my-4 text-2xl tracking-wide font-bold">
        Moving Averages
      </h1>
      <div className="h-96 w-2/3 mx-auto">
        {console.log("Stocks Data:", stocksData)}
        <AgGridReact
          theme={themeMaterial}
          rowData={rowData}
          columnDefs={columnDefs}
          context={{ favorites, toggleFavorite }}
          defaultColDef={{ sortable: true, resizable: true }}
        />
      </div>
    </div>
  );
}
