import React from "react";
import { useState } from "react";
import Auth from "./Components/Auth";
import HomeContainer from "./Container/HomeContainer";
import { Routes, Route } from "react-router-dom";
import "./index.css";

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Auth />} /> */}
      <Route path="/home" element={<HomeContainer />} />
    </Routes>
  );
}

export default App;
