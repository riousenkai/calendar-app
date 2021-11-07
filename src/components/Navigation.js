import { useEffect, useState } from "react";
import { useUser } from "../context/User";
import { useEasybase } from "easybase-react";
import Calendar from "react-calendar";
import data from "../data/information";
import "react-calendar/dist/Calendar.css";

const Navigation = ({ users }) => {
  const { user, setUser, setDay, setCurrMonth, setYear } = useUser();
  const [username, setUsername] = useState(users[0].name);
  const [eventName, setEventName] = useState("");
  const [eventDesc, setEventDesc] = useState("");
  const [eventDate, setEventDate] = useState();
  const [eventStart, setEventStart] = useState("09:00");
  const [eventEnd, setEventEnd] = useState("09:30");

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

  const newEvent = (e) => {
    e.preventDefault();

    let fullDate = eventDate.toString().split(" ")

    const m = data.months.find(
      (month) => month.short === fullDate[1]
    );
    const eDay = d(eventDate);

    const duplicate = data.events.find((event) => event.start === 1);

    const newEventObj = {
      month: m.id,
      day: eDay,
      year: fullDate[3],
      start: eventStart,
      end: eventEnd,
      user: +user,
      name: eventName,
      description: eventDesc,
    };

    data.events.push(newEventObj);
    setDay(eDay)
    setCurrMonth(m.id)
    setYear(fullDate[3])
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
      <form className="add-event-form" onSubmit={(e) => newEvent(e)}>
        Event Name:
        <input
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        Description:
        <textarea
          value={eventDesc}
          onChange={(e) => setEventDesc(e.target.value)}
        />
        <Calendar
          defaultValue={new Date()}
          minDate={new Date()}
          onChange={(e) => setEventDate(e)}
        />
        Start Date:
        <select
          value={eventStart}
          onChange={(e) => setEventStart(e.target.value)}
        >
          {data?.times?.map((time) =>
            time !== "05:00" ? <option>{time}</option> : null
          )}
        </select>
        End Date:
        <select onChange={(e) => setEventEnd(e.target.value)} value={eventEnd}>
          {data.times.map((time, i) =>
            i > data.times.indexOf(eventStart) ? <option>{time}</option> : null
          )}
        </select>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Navigation;
