import { useEffect, useState } from "react";
import { useUser } from "../context/User";
import { useEasybase } from "easybase-react";
import Calendar from "react-calendar";
import data from "../data/information";
import "react-calendar/dist/Calendar.css";
import isNotAvailable from "../helpers/isNotAvailable";

const Navigation = ({ users, setEventsData, eventsData }) => {
  const { db } = useEasybase();
  const { user, setUser, setDay, setCurrMonth, setYear } = useUser();
  const [username, setUsername] = useState(users[0].name);
  const [eventName, setEventName] = useState("");
  const [eventDesc, setEventDesc] = useState("");
  const [eventDate, setEventDate] = useState(new Date());
  const [eventStart, setEventStart] = useState("09:00");
  const [eventEnd, setEventEnd] = useState("09:30");
  const [errors, setErrors] = useState();
  const [notVisible, setNotVisible] = useState(true);

  const eventsDb = async () => {
    const events = await db("APPTS")
      ?.return()
      .orderBy({
        by: "strt",
        sort: "asc",
      })
      .all();

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

  const cancelSubmit = (e) => {
    e.preventDefault();

    setEventName("");
    setEventDesc("");
    setEventDate(new Date());
    setEventStart("09:00");
    setEventEnd("09:30");
    setErrors();
    setNotVisible(true);
  };

  const newEvent = async (e) => {
    e.preventDefault();

    let fullDate = eventDate.toString().split(" ");

    const m = data.months.find((month) => month.short === fullDate[1]);
    const eDay = d(eventDate);

    const errs = [];

    const duplicate = eventsData.find((event) => {
      let isSameDate =
        event.dy === eDay &&
        event.mon === m.id &&
        event.yr === Number(fullDate[3]);

      return isSameDate && isNotAvailable(event, eventStart, eventEnd);
    });

    if (eventStart === eventEnd) {
      errs.push("End time cannot be at the same time as start time!");
    } else if (eventStart > eventEnd) {
      errs.push("Start time cannot be later than end time!");
    }

    if (duplicate) {
      errs.push("There is already an event scheduled for that timeframe.");
    }

    if (eventName.length > 50) {
      errs.push("Appointment name is too long!");
    }

    if (errs.length > 0) {
      return setErrors(errs);
    }

    await db("APPTS")
      .insert({
        mon: m.id,
        dy: eDay,
        yr: +fullDate[3],
        strt: eventStart,
        ending: eventEnd,
        name: eventName.replace(/'/g, ""),
        description: eventDesc.replace(/'/g, ""),
        userId: user,
      })
      .one();

    setErrors();

    eventsDb();
    setDay(eDay);
    setCurrMonth(m.id);
    setYear(+fullDate[3]);
    setEventName("");
    setEventDesc("");
    setEventDate(new Date());
    setEventStart("09:00");
    setEventEnd("09:30");

    setNotVisible(true);
  };

  return (
    <div className="nav-main">
      <div className="greeting">Hello, {username}!</div>

      <div className="add-event">
        <div className="add-event-text">Add Event</div>{" "}
        <img
          onClick={() => setNotVisible(!notVisible)}
          className="add-img"
          src="https://img.icons8.com/flat-round/64/000000/plus.png"
        />
      </div>
      {errors &&
        errors.map((error) => (
          <div className="create-errors" key={error}>
            {error}
          </div>
        ))}
      <div className="event-form-main">
        <form
          className="add-event-form"
          onSubmit={(e) => newEvent(e)}
          hidden={notVisible}
        >
          <p className="event-form-label">Title</p>
          <input
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
          <p className="event-form-label">Notes</p>
          <textarea
            value={eventDesc}
            onChange={(e) => setEventDesc(e.target.value)}
          />
          <Calendar
            className="calendar"
            defaultValue={new Date()}
            value={eventDate}
            minDate={new Date()}
            onChange={(e) => setEventDate(e)}
          />
          <p className="event-form-label">Start Date</p>
          <input
            className="event-time"
            value={eventStart}
            type="time"
            min="09:00"
            max="16:59"
            onChange={(e) => setEventStart(e.target.value)}
            required
          />
          <p className="event-form-label">End Date</p>
          <input
            className="event-time"
            value={eventEnd}
            type="time"
            min="09:01"
            max="17:00"
            onChange={(e) => setEventEnd(e.target.value)}
            required
          />
          <div className="event-submit-btns">
            <button className="event-submit">Submit</button>
            <button className="event-cancel" onClick={(e) => cancelSubmit(e)}>
              Cancel
            </button>
          </div>
        </form>
      </div>
      <div className="change-user">
        Change User:{" "}
        <select
          className="user-fix"
          onChange={(e) => setUser(e.target.value)}
          value={user}
        >
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Navigation;
