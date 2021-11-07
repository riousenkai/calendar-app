import { useState, useEffect } from "react";
import { useUser } from "../context/User";

const Home = ({ data }) => {
  const [events, setEvents] = useState([]);
  const { day, user, currMonth, year, setDay, setCurrMonth, setYear } = useUser();

  useEffect(() => {
    const eventList = data.events.filter(
      (event) =>
        event.day === +day && event.month === currMonth && event.year === year
    );
    setEvents(eventList);
  }, [day]);

  const remove = (obj) => {
    const allEvents = data.events.filter(d => d !== obj)
  
    data.events = allEvents
    setDay(obj.day)
    setCurrMonth(obj.month)
    setYear(obj.year)
  };

  return (
    <div className="main-body">
      {events.map((event) => (
        <div>
          <p>{event.name}</p>
          {event.user === +user && (
            <>
              <button>Edit</button>
              <button onClick={() => remove(event)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Home;
