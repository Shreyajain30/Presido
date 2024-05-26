// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import BuyerPage from "./Component/Buyer/BuyerPage";
import Form from "./Component/form/Form";
import "./App.css";

const App = () => (
  <Router>
    <div className="App">
      <Routes>
        <Route exact path="/" element={<BuyerPage />} />
        <Route path="/form" element={<Form />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  </Router>
);

export default App;
