import Home from "./components/Home.js";
import Calendar from "./components/Calendar.js";
import Navigation from "./components/Navigation.js";
import data from "./data/information.js";
import { useState, useEffect } from 'react'
import { useEasybase } from "easybase-react";

function App() {
  const { db } = useEasybase()
  const [eventsData, setEventsData] = useState([])

  const getData = async () => {
    const events = await db("APPTS")?.return().orderBy({
      by: "strt",
      sort: "asc",
    }).all();

    setEventsData(events)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="main">
      <Navigation users={data.users} setEventsData={setEventsData} eventsData={eventsData} />
      <Home data={data} eventsData={eventsData} setEventsData={setEventsData} />
      <Calendar data={data} eventsData={eventsData} />
    </div>
  );
}

export default App;
