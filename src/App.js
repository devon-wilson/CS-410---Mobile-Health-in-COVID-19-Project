import React from "react";
import "./App.css";
import Calendar from "./components/Calendar"
import Chart from "./components/Chart"
import Analytics from "./components/Analytics"
import { Tab, Tabs, AppBar } from "@material-ui/core"
import { Route, Switch, Link, BrowserRouter as Router } from "react-router-dom"
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

function App() {
  
  return (
    <Router>
      <div>
        <Navbar class="primary" variant="dark">
          <Nav.Link as={Link} to="/Calendar">Calendar</Nav.Link>
          <Nav.Link as={Link} to="/Chart">Progress</Nav.Link>
          <Nav.Link as={Link} to="/Analytics">Analytics</Nav.Link>
        </Navbar>
        <Switch>
          <Route path="/Calendar">
            <Calendar />
          </Route>
          <Route path="/Chart">
            <Chart />
          </Route>
          <Route path="/Analytics">
            <Analytics />
          </Route>
        </Switch> 
      </div>   
    </Router>
  );
}

export default App