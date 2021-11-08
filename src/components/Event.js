import { useState, useEffect } from "react";
import { useEasybase } from "easybase-react";
import isNotAvailable from "../helpers/isNotAvailable";
import { useUser } from "../context/User";
import data from "../data/information";

const Event = ({ remove, event, eventsData, setEventsData }) => {
  const { db } = useEasybase();
  const { user, day, currMonth, year } = useUser();
  const [eventName, setEventName] = useState(event.name);
  const [eventDesc, setEventDesc] = useState(event.description);
  const [eventStart, setEventStart] = useState(event.strt);
  const [eventEnd, setEventEnd] = useState(event.ending);
  const [errors, setErrors] = useState([]);
  const isPastEvent = new Date(event.yr, event.mon, event.dy + 1) < new Date();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    document.querySelectorAll(".editButtons").forEach((edit) => {
      edit.classList.remove("hidden");
    });
    setVisible(false);
    setErrors([]);
  }, [day, currMonth, year, eventsData]);

  useEffect(() => {
    setVisible(false);
  }, [user]);

  const fix = async (obj, e) => {
    e.preventDefault();
    const errs = [];

    const duplicate = eventsData.find((event) => {
      let isSameDate =
        event.dy === obj.dy && event.mon === obj.mon && event.yr === obj.yr;
      return (
        isSameDate &&
        isNotAvailable(event, eventStart, eventEnd) &&
        eventsData.indexOf(obj) !== eventsData.indexOf(event)
      );
    });

    if (eventStart === eventEnd) {
      errs.push("End time cannot be at the same time as start time!");
    } else if (eventStart > eventEnd) {
      errs.push("Start time cannot be later than end time!");
    }

    if (eventName.length > 50) {
      errs.push("Appointment name is too long!");
    }

    if (duplicate) {
      errs.push("There is already an event scheduled for that timeframe.");
    }

    if (errs.length > 0) {
      return setErrors(errs);
    }

    await db("APPTS")
      .return()
      .where({
        mon: obj.mon,
        dy: obj.dy,
        yr: obj.yr,
        strt: obj.strt,
        ending: obj.ending,
        name: obj.name.replace(/'/g, ""),
        description: obj.description.replace(/'/g, ""),
      })
      .set({
        name: eventName,
        description: eventDesc,
        strt: eventStart,
        ending: eventEnd,
      })
      .all();

    setErrors();

    let data = await db("APPTS")
      .return()
      .orderBy({
        by: "strt",
        sort: "asc",
      })
      .orderBy({
        by: "strt",
        sort: "asc",
      })
      .all();

    setEventsData(data);
    setVisible(false);
    document.querySelectorAll(".editButtons").forEach((edit) => {
      edit.classList.remove("hidden");
    });
  };

  const hide = () => {
    setVisible(true);
    setErrors();
    document.querySelectorAll(".editButtons").forEach((edit) => {
      edit.classList.add("hidden");
    });
  };

  const show = (e) => {
    e.preventDefault();

    setEventName(event.name);
    setEventDesc(event.description);
    setEventStart(event.strt);
    setEventEnd(event.ending);

    setVisible(false);
    setErrors();
    document.querySelectorAll(".editButtons").forEach((edit) => {
      edit.classList.remove("hidden");
    });
  };

  return (
    <div className="appt-card">
      <div className="appt-details" hidden={visible}>
        <p className="event-name">{event.name}</p>
        <div className="desc">Notes: {event.description}</div>
        <p>Organizer: {data.users[event.userid].name}</p>
        <p>Start Time: {event.strt}</p>
        <p>End Time: {event.ending}</p>
      </div>
      {errors?.length > 0 && (
        <div hidden={errors.length < 1} className="errors">
          <ul>
            {errors.map((err) => (
              <li>{err}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="edit-form-all">
        <form
          onSubmit={(e) => fix(event, e)}
          hidden={!visible}
          className="edit-form"
        >
          Title:
          <input
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="edit-input"
          />
          Notes:
          <textarea
            value={eventDesc}
            onChange={(e) => setEventDesc(e.target.value)}
            className="edit-input-2"
          />
          <p className="edit-time">
            Start Date:{" "}
            <input
              value={eventStart}
              type="time"
              min="09:00"
              max="16:59"
              onChange={(e) => setEventStart(e.target.value)}
              required
            />
          </p>
          <p className="edit-time">
            End Date:{" "}
            <input
              value={eventEnd}
              type="time"
              min="09:01"
              max="17:00"
              onChange={(e) => setEventEnd(e.target.value)}
              required
            />
          </p>
          <div className="edit-submit">
            <button className="editBtn">Submit</button>
            <button onClick={(e) => show(e)} className="delBtn">
              Cancel
            </button>
          </div>
        </form>
      </div>
      {event.userid === +user && !isPastEvent && (
        <div hidden={visible} className={`editButtons edit-${event.userid}`}>
          <button onClick={() => hide()} className="editBtn">
            Edit
          </button>
          <button onClick={() => remove(event)} className="delBtn">
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Event;
