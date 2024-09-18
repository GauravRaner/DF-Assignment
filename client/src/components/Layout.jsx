// src/components/Layout.js
import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="p-5 w-full relative flex flex-col justify-between h-[890px]">
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
