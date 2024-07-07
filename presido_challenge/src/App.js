// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import BuyerPage from "./Component/Buyer/BuyerPage";
import Form from "./Component/form/Form";
import Seller from "./Component/Seller/Seller";
import Navbar from "./Component/Navbar/Navbar";
import "./App.css";

const App = () => (
  <Router>
    <div className="App">
      <Navbar/>
      <Routes>
      <Route exact path="/buyer" element={<BuyerPage />} />
        <Route path="/" element={<Form />} />
        <Route path="/seller/:email" element={<Seller/>}/>
      </Routes>
    </div>
  </Router>
);

export default App;
