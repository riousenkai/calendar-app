import { useState, useEffect } from "react";
import { useUser } from "../context/User";
import { useEasybase } from "easybase-react"

const Home = ({ data }) => {
  const { db } = useEasybase()
  const [events, setEvents] = useState([]);
  const [dateName, setDateName] = useState("");
  const { day, user, currMonth, year, setDay, setCurrMonth, setYear } =
    useUser();
  const [eventsData, setEventsData] = useState([]);

  const finder = async () => {
    const eventList = await db("APPTS")
      .return()
      .where({
        month: currMonth,
        day: day,
        year: year,
      })
      .all();

    let currDate = data.months.find((m) => m.id === currMonth);
    setDateName(currDate.month);
    setEvents(eventList);
  };

  useEffect(() => {
    return finder();
  }, [day, currMonth]);

  const remove = (obj) => {

    setDay(obj.day);
    setCurrMonth(obj.month);
    setYear(obj.year);
  };

  return (
    <div className="main-body">
      <p className="header-body">
        Appointments for {dateName} {day}, {year}
      </p>
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
