import { useState, useEffect } from "react";
import { useUser } from "../context/User";
import { useEasybase } from "easybase-react";

const Home = ({ data, eventsData, setEventsData }) => {
  console.log(eventsData);
  const { db } = useEasybase();
  const [dateName, setDateName] = useState("");
  const { day, user, currMonth, year, setDay, setCurrMonth, setYear } =
    useUser();

  const finder = async () => {
    const eventList = await db("APPTS")
      ?.return()
      .where({
        mon: currMonth,
        dy: day,
        yr: year,
      })
      .all();

    let currDate = data.months.find((m) => m.id === currMonth);
    setDateName(currDate.month);
    setEventsData(eventList);
  };

  useEffect(() => {
    finder();
  }, [day, currMonth]);

  const remove = async (obj) => {
    await db("APPTS").delete().where({ obj }).one();
    setDay(obj.dy);
    setCurrMonth(obj.mon);
    setYear(obj.yr);
    finder();
  };

  return (
    <div className="main-body">
      <p className="header-body">
        Appointments for {dateName} {day}, {year}
      </p>
      {eventsData?.map((event) => (
        <div>
          <p>{event.name}</p>
          {console.log(user, event)}
          {+event.userid === +user && (
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
