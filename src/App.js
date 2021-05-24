import React from "react";
import "./App.css";
import Calendar from "./components/Calendar"
import Chart from "./components/Chart"
import Analytics from "./components/Analytics"
import { Tab, Tabs, AppBar } from "@material-ui/core"
import { Redirect, Route, Switch, Link, BrowserRouter as Router } from "react-router-dom"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Home from "./Home"
function App() {
  
  return (
    <Switch>
      <Route exact path="/" render={props => <Home {...props} />} />
    </Switch>
  )
}

export default App