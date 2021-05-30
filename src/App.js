import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom"
import Home from "./Home"
function App() {
  
  return (
    <Switch>
      <Route exact path="/" render={props => <Home {...props} />} />
    </Switch>
  )
}

export default App