import React from "react";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Inventory from "./Pages/Inventory";
import Reports from "./Pages/Reports";
import Transactions from "./Pages/Transactions";
import Profile from "./Pages/Profile";
import Header from "./Components/Header";
import "./App.css";

function App() {
  return (
    <div>
      <Router>
        <Navbar>
          <Header />
          <Routes>
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Inventory" element={<Inventory />} />
            <Route path="/Reports" element={<Reports />} />
            <Route path="/Transactions" element={<Transactions />} />
            <Route path="/Profile" element={<Profile />} />
          </Routes>
        </Navbar>
      </Router>
    </div>
  );
}

export default App;
