import { useEffect, useState } from "react";
import Home from "./pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import "./App.css";
import AllEvList from "./pages/AllEvList/AllEvList";

function App() {
  return (
    <div >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/allevlist" element={<AllEvList />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
