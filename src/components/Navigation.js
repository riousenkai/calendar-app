import { useEffect, useState } from "react";
import { useUser } from "../context/User";
import { useEasybase } from "easybase-react";
import Calendar from "react-calendar";
import data from "../data/information";
import "react-calendar/dist/Calendar.css";

const Navigation = ({ users }) => {
  const { db } = useEasybase();
  const { user, setUser, setDay, setCurrMonth, setYear } = useUser();
  const [username, setUsername] = useState(users[0].name);
  const [eventName, setEventName] = useState("");
  const [eventDesc, setEventDesc] = useState("");
  const [eventDate, setEventDate] = useState(new Date());
  const [eventStart, setEventStart] = useState("09:00");
  const [eventEnd, setEventEnd] = useState("09:30");
  const [errors, setErrors] = useState();
  const [eventsData, setEventsData] = useState();

  const eventsDb = async () => {
    const events = await db("APPTS").return().all();

    setEventsData(events);
  };

  useEffect(() => {
    let spec = users.find((ele) => ele.id === +user);
    setUsername(spec.name);
  }, [user]);

  const d = (date) => {
    let num = date.toString().split(" ")[2];

    if (num[0] === "0") {
      return +num[1];
    } else {
      return +num;
    }
  };

  const newEvent = async (e) => {
    e.preventDefault();

    eventsDb();

    let fullDate = eventDate.toString().split(" ");

    const m = data.months.find((month) => month.short === fullDate[1]);
    const eDay = d(eventDate);

    const errs = [];

    const duplicate = eventsData.find(
      (event) =>
        event.day === eDay &&
        event.month === m.id &&
        event.year === Number(fullDate[3]) &&
        parseInt(event.start) >= parseInt(eventStart) &&
        parseInt(event.ending) <= parseInt(eventStart)
    );

    if (eventStart === eventEnd) {
      errs.push("End time cannot be at the same time as start time!");
    } else if (eventStart > eventEnd) {
      errs.push("Start time cannot be later than end time!");
    }

    if (duplicate) {
      errs.push("There is already an event scheduled for that timeframe.");
    }

    if (errs.length > 0) {
      return setErrors(errs);
    }

    await db("APPTS")
      .insert({
        month: m.id,
        day: eDay,
        year: +fullDate[3],
        start: eventStart,
        ending: eventEnd,
        userId: +user,
        name: eventName,
        description: eventDesc,
      })
      .one()

    setErrors();

    setDay(eDay);
    setCurrMonth(m.id);
    setYear(+fullDate[3]);
    return eventsDb();
  };

  return (
    <div className="nav-main">
      <div className="greeting">Hello, {username}!</div>
      <div className="change-user">
        Change User:
        <select onChange={(e) => setUser(e.target.value)} value={user}>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
      <div className="add-event">
        <div className="add-event-text">Add Event</div>{" "}
        <img
          className="add-img"
          src="https://img.icons8.com/flat-round/64/000000/plus.png"
        />
      </div>
      {errors && errors.map((error) => <div>{error}</div>)}
      <form className="add-event-form" onSubmit={(e) => newEvent(e)}>
        Event Name:
        <input
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          required
        />
        Description:
        <textarea
          value={eventDesc}
          onChange={(e) => setEventDesc(e.target.value)}
        />
        <Calendar
          defaultValue={new Date()}
          value={eventDate}
          minDate={new Date()}
          onChange={(e) => setEventDate(e)}
        />
        Start Date:
        <input
          value={eventStart}
          type="time"
          min="09:00"
          max="16:30"
          onChange={(e) => setEventStart(e.target.value)}
          required
        />
        End Date:
        <input
          value={eventEnd}
          type="time"
          min="09:30"
          max="17:00"
          onChange={(e) => setEventEnd(e.target.value)}
          required
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Navigation;
