import { useState, useEffect } from "react";
import { useUser } from "../context/User";

const Home = ({data}) => {
    const [events, setEvents] = useState([])
    const {month, day, user} = useUser()

  useEffect(() => {
    const eventList = data.events.filter(event => event.day === +day)
    setEvents(eventList)
    console.log(events)
  }, [])

  const remove = () => {

  }

  return <div className="main-body">{events.map(event => (
      <div>
          <p>{event.name}</p>
          {event.user === +user &&
          <>
          <button>Edit</button>
          <button onClick={() => remove()}>Delete</button>
          </>
          }
      </div>
  ))}</div>;
};

export default Home;
