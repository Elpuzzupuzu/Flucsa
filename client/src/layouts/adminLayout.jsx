import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";

export default function adminLayout() {
  return (
    <>
      <main className="pt-4">
        <Outlet />
      </main>
    </>
  );
}
