import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";

export default function userLayout() {
  return (
    <>
      {/* <Header /> */}
      <main className="pt-4">
        <Outlet />
      </main>
    </>
  );
}
