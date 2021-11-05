import { useEffect, useState } from "react";
import { useUser } from "../context/User";
import Calendar from "react-calendar";
import data from "../data/information";
import "react-calendar/dist/Calendar.css";

const Navigation = ({ users }) => {
  const { user, setUser, availDays } = useUser();
  const [username, setUsername] = useState(users[0].name);
  const [eventName, setEventName] = useState("");
  const [eventDesc, setEventDesc] = useState("");
  const [eventDate, setEventDate] = useState();
  const [eventStart, setEventStart] = useState("09:00");
  const [eventEnd, setEventEnd] = useState();

  useEffect(() => {
    let spec = users.find((ele) => ele.id === +user);
    setUsername(spec.name);
    console.log(data.times[1]);
  }, [user]);

  const newEvent = (e) => {
    e.preventDefault();

    const duplicate = data.events.find((event) => event.start === 1);

    const newEventObj = {
      month: 10,
      day: 5,
      year: 2021,
      start: "09:00",
      end: "09:30",
      user: 0,
      name: "Test",
      description: "Appointment with Michael",
    };
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
          {data?.times?.map((time) => (
            <option>{time}</option>
          ))}
        </select>
        End Date:
        <select>
         {data.times.map((time, i) => (
           i > data.times.indexOf(eventStart) ? <option>{time}</option> : null
         ))}
        </select>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Navigation;
