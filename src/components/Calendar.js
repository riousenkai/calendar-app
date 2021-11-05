import { useState, useEffect } from "react";

const Calendar = () => {
  const [day, setDay] = useState();
  let date = new Date();
  let grids = [];

  const getDays = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
    date
  );

  const days = getDays(new Date(date.getFullYear(), date.getMonth()));

  for (let i = 1; i <= days; i++) {
    grids.push(i);
  }

  return (
    <div className="calendar-right">
      <h1 className="month">
        {month} {date.getFullYear()}
      </h1>
      <div className="calendar-grid">
        {grids.map((grid) => (
          <div
            className="calendar-day-area"
            id={`grid-cell-${grid}`}
            onClick={() => setDay(grid)}
            key={grid}
          >
            <p className="calendar-day">{grid}</p>
            <p>Event</p>
            <p>Event</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
