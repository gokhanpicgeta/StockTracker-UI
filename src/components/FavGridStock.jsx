// FavGridStock.jsx
import React from "react";

export default function FavStockGrid({ favorites, toggleFavorite, results }) {
  const gridContainer = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "16px",
    padding: "16px",
  };
  const cardStyle = {
    position: "relative",
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "12px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    display: "grid",
    gridTemplateRows: "auto 1fr",
  };
  const innerGrid = {
    display: "grid",
    gridTemplateColumns: "auto auto",
    rowGap: "4px",
    columnGap: "8px",
    fontSize: "0.9rem",
    marginTop: "8px",
  };

  if (favorites.size === 0) {
    return (
      <div style={gridContainer}>
        <p className="text-gray-500 text-center w-screen text-4xl font-bold">
          No favorites selected. Click the star icon to favorite stocks.
        </p>
      </div>
    );
  }

  return (
    <div style={gridContainer}>
      {Array.from(favorites).map((symbol) => {
        const crossover = results.crossover_results[symbol] ?? "–";

        const dt = results.double_top_results[symbol];
        let dtWindow = "–",
          dtStart = "–",
          dtEnd = "–",
          dtPct = "–";
        if (dt) {
          dtWindow = `${dt[0]}d`;
          const [
            startISO,
            endISO,
            prevPeak,
            currPrice,
            troughDate,
            troughPrice,
          ] = dt[1];
          dtStart = new Date(startISO).toLocaleDateString();
          dtEnd = new Date(endISO).toLocaleDateString();
          dtPct = `${(
            (troughPrice / ((prevPeak + currPrice) / 2)) *
            100
          ).toFixed(2)}%`;
        }

        const db = results.double_bottom_results[symbol];
        let dbWindow = "–",
          dbStart = "–",
          dbEnd = "–",
          dbPct = "–";
        if (db) {
          dbWindow = `${db[0]}d`;
          const [startISO, endISO, prevBottom, currPrice, peakDate, peakPrice] =
            db[1];
          dbStart = new Date(startISO).toLocaleDateString();
          dbEnd = new Date(endISO).toLocaleDateString();
          dbPct = `${(
            (peakPrice / ((prevBottom + currPrice) / 2)) *
            100
          ).toFixed(2)}%`;
        }

        const isFav = favorites.has(symbol);

        return (
          <div key={symbol} style={cardStyle}>
            <div
              className="text-rose-700 text-center"
              style={{ fontSize: "1.1rem", fontWeight: 700 }}
            >
              <span
                onClick={() => toggleFavorite(symbol)}
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  cursor: "pointer",
                  fontSize: "1.2rem",
                  color: isFav ? "#f59e0b" : "#aaa",
                }}
                title={isFav ? "Unfavorite" : "Favorite"}
              >
                {isFav ? "★" : "☆"}
              </span>
              {symbol}
            </div>

            <div style={innerGrid}>
              <div style={{ fontWeight: 600 }}>9/45 Crossover:</div>
              <div style={{ textAlign: "right" }}>{crossover}</div>

              <div style={{ fontWeight: 600 }}>Double Top:</div>
              <div style={{ textAlign: "right" }}>
                {dt ? (
                  <>
                    <div>{dtWindow}</div>
                    <div style={{ fontSize: "0.8rem" }}>
                      {dtStart} – {dtEnd}
                    </div>
                    <div>{dtPct}</div>
                  </>
                ) : (
                  <div>-</div>
                )}
              </div>

              <div style={{ fontWeight: 600 }}>Double Bottom:</div>
              <div style={{ textAlign: "right" }}>
                {db ? (
                  <>
                    <div>Window: {dbWindow}</div>
                    <div style={{ fontSize: "0.8rem" }}>
                      {dbStart} – {dbEnd}
                    </div>
                    <div>Peak Percent: {dbPct}</div>
                  </>
                ) : (
                  <div>-</div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
