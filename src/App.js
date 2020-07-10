import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom"
import Home from "./Pages/Home";

function App() {
  return (
    <div className="App">
<BrowserRouter>
  <Switch>
    <Route exact path='/' component={Home}/>
  </Switch>
</BrowserRouter>
    </div>
  );
}

export default App;
