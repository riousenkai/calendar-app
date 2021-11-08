import { useState, useEffect } from "react";
import { useUser } from "../context/User";
import { useEasybase } from "easybase-react";
import Event from "./Event";

const Home = ({ data, eventsData, setEventsData }) => {
  const { db } = useEasybase();
  const [dateName, setDateName] = useState("");
  const { day, currMonth, year, setDay, setCurrMonth, setYear } =
    useUser();

  const finder = async () => {
    const eventList = await db("APPTS")
      ?.return()
      .where({
        mon: currMonth,
      })
      .orderBy({
        by: "strt",
        sort: "asc",
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
    await db("APPTS")
      .delete()
      .where({
        mon: obj.mon,
        dy: obj.dy,
        yr: obj.yr,
        name: obj.name,
        description: obj.description,
        userid: obj.userid,
        strt: obj.strt,
        ending: obj.ending,
      })
      .one();
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
      <div className="appts-container">
        {eventsData?.map((event, i) => {
          return (
            event.mon === currMonth &&
            event.yr === year &&
            event.dy === day && (
              <Event
                i={i}
                key={i}
                remove={remove}
                event={event}
                eventsData={eventsData}
                setEventsData={setEventsData}
              />
            )
          );
        })}
      </div>
    </div>
  );
};

export default Home;
