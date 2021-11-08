import { useState, useEffect } from "react";
import { useEasybase } from "easybase-react";
import isNotAvailable from "../helpers/isNotAvailable";
import { useUser } from "../context/User";

const Event = ({ remove, event, eventsData, setEventsData, i }) => {
  const { db } = useEasybase();
  const date = new Date();
  const { user, target, setTarget, day, currMonth, year } = useUser();
  const [eventName, setEventName] = useState(event.name);
  const [eventDesc, setEventDesc] = useState(event.description);
  const [eventStart, setEventStart] = useState(event.strt);
  const [eventEnd, setEventEnd] = useState(event.ending);
  const [errors, setErrors] = useState([]);
  const [visible, setVisible] = useState(false);

  const isPastEvent = new Date(event.yr, event.mon, event.dy + 1) < new Date();

  useEffect(() => {
    setTarget(false);
    setVisible(false);
  }, [day, currMonth, year]);

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
        name: obj.name,
        description: obj.description,
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
    setTarget(false);
    setVisible(false);
  };

  const hide = () => {
    setTarget(true);
    setVisible(true);
  };

  const show = () => {
    setTarget(false);
    setVisible(false);
  };

  return (
    <div className="appt-card">
      <p hidden={visible}>{event.name}</p>
      {errors?.length > 0 && (
        <>
          <div>
            The following error{errors.length > 1 ? "s" : null} occured:
          </div>
          <ul>
            {errors?.map((err) => (
              <li>{err}</li>
            ))}
          </ul>
        </>
      )}
      <form onSubmit={(e) => fix(event, e)} hidden={!visible}>
        Event Name:
        <input
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        Event Description:
        <textarea
          value={eventDesc}
          onChange={(e) => setEventDesc(e.target.value)}
        />
        Start Date:
        <input
          value={eventStart}
          type="time"
          min="09:00"
          max="16:59"
          onChange={(e) => setEventStart(e.target.value)}
          required
        />
        End Date:
        <input
          value={eventEnd}
          type="time"
          min="09:01"
          max="17:00"
          onChange={(e) => setEventEnd(e.target.value)}
          required
        />
        <button>Submit</button>
        <button onClick={() => show()}>Cancel</button>
      </form>
      {event.userid === +user && !isPastEvent && (
        <div hidden={visible}>
          <button onClick={() => hide()} disabled={target}>
            Edit
          </button>
          <button onClick={() => remove(event)} disabled={target}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Event;
