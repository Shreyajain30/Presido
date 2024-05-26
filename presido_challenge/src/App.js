// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import BuyerPage from "./Component/Buyer/BuyerPage";
import Form from "./Component/form/Form";
import './App.css';

const App = () => (
  <Router>
    <div className="App">
      <Switch>
        <Route exact path="/" component={BuyerPage} />
        <Route path="/form" component={Form} />
        <Redirect to="/" />
      </Switch>
    </div>
  </Router>
);

export default App;
