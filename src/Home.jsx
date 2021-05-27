import React from "react";
import { Tabs, Tab, AppBar } from "@material-ui/core";
import ChemCalendar from "./components/Calendar"
import Chart from "./components/Chart"
import Analytics from "./components/Analytics";

const Home = props => {
  
  const [selectedTab, setSelectedTab] = React.useState(0)

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      <AppBar position="static" style={{backgroundColor: "#82b1ff", color: "primary"}}>
        <Tabs value={selectedTab} onChange={handleChange}>
          <Tab label="Calendar" />
          <Tab label="Progress" />
          <Tab label="Analytics" />
        </Tabs>
      </AppBar>
      {selectedTab === 0 && <ChemCalendar />}
      {selectedTab === 1 && <Chart />}
      {selectedTab === 2 && <Analytics />}
    </>
  );
};

export default Home;