import React from "react";
import "./App.css";
import Calendar from "./components/Calendar"
import Chart from "./components/Chart"
import Analytics from "./components/Analytics"

function App() {
  return (
      <div>
        <Calendar />
        <Chart />
        <Analytics />
      </div>
  );
}

export default App