import React from "react";
import { NavLink } from "react-router";

export default function Navbar() {
  return (
    <header className="bg-white text-black p-4 w-screen text-center flex flex-row items-center rounded-lg shadow-md justify-between">
      <h1 className="text-2xl font-bold tracking-wider">StockTracker</h1>
      <nav className="flex gap-8 text-black-900 text-md">
        <NavLink to="/">
          <h2>Favs</h2>
        </NavLink>
        <NavLink to="/averages" className="hover:text-blue-500">
          <h2>Moving Averages</h2>
        </NavLink>
        <NavLink to="/double-tops">
          <h2>Double Tops</h2>
        </NavLink>
        <NavLink to="/double-bottoms">
          <h2>Double Bottoms</h2>
        </NavLink>
      </nav>
    </header>
  );
}
