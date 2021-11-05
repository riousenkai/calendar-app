import { useState, useEffect } from "react";
import { useUser } from "../context/User";
import data from "../data/information";

const Calendar = ({data}) => {
  const {month, days, date, setDay} = useUser()

  return (
    <div className="calendar-right">
      <h1 className="month">
        {month} {date.getFullYear()}
      </h1>
      <div className="calendar-grid">
        {days.map((day) => (
          <div
            className="calendar-day-area"
            id={day}
            onClick={() => setDay(+day)}
            key={day}
          >
            <p className="calendar-day">{day}</p>
            {data.events.map(event => (
                <>{event.day === day ?
                    <div>{event.name} from {event.start} to {event.end}</div>
                    : null}</>
            ))}
            <p>Event</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
