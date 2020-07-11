import React from 'react';
import './App.scss';
import {BrowserRouter, Route, Switch} from "react-router-dom"
import Home from "./Pages/Home";
import {Dots} from 'react-preloader';

function App() {
  return (
    <div className="App">
        <Dots background="#000510" color="#E8B730"/>
<BrowserRouter>
  <Switch>
    <Route exact path='/' component={Home}/>
  </Switch>
</BrowserRouter>
    </div>
  );
}

export default App;
