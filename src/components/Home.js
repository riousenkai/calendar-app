import { useState, useEffect } from "react";
import { useUser } from "../context/User";

const Home = ({data}) => {
    const [events, setEvents] = useState([])
    const {month, day} = useUser()

  useEffect(() => {
    const eventList = data.events.filter(event => event.day === +day)
    setEvents(eventList)
    console.log(events)
  }, [])

  return <div className="main-body">{events.map(event => (
      <div>
          <p>{event.name}</p>
      </div>
  ))}</div>;
};

export default Home;
