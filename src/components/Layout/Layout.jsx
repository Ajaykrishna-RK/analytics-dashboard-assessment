import React, { useState } from "react";
import SideBar from "../sidebar/Sidebar";
import Header from "../header/Header";
import { Outlet } from "react-router-dom";

function Layout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <SideBar open={open} setOpen={setOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header open={open} setOpen={setOpen} />

        {/* Scrollable Outlet */}
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
