import { useState, useEffect } from "react";
import { useUser } from "../context/User";

const Calendar = ({ data, eventsData }) => {
  const date = new Date();

  const { setDay, currMonth, setCurrMonth, year, setYear } = useUser();

  const [totalDays, setTotalDays] = useState([]);

  useEffect(() => {
    let dayAmt = [];
    for (let i = 1; i <= +data.months[currMonth].days; i++) {
      dayAmt.push(i);
    }
    setTotalDays(dayAmt);
  }, [currMonth]);

  const changeMonth = () => {
    if (currMonth === 11) {
      setCurrMonth(0);
      setYear((year) => year + 1);
    } else {
      setCurrMonth((month) => month + 1);
    }
  };

  const reverseMonth = () => {
    if (currMonth === 0) {
      setCurrMonth(11);
      setYear((year) => year - 1);
    } else {
      setCurrMonth((month) => month - 1);
    }
  };

  const returnToMonth = () => {
    setCurrMonth(date.getMonth());
    setYear(date.getFullYear());
    setDay(date.getDate());
  };

  return (
    <div className="calendar-right">
      <button
        onClick={reverseMonth}
        disabled={date.getFullYear() === year && date.getMonth() === currMonth}
      >{`<`}</button>
      <h1 className="month">
        {data.months[currMonth].month} {year}
      </h1>
      <button onClick={changeMonth}>{`>`}</button>
      <button onClick={returnToMonth}>Return to current date</button>
      <select
        id={0}
        onChange={(e) =>
          document
            .getElementById(e.target.value)
            .scrollIntoView({ behavior: "smooth" })
        }
        defaultValue="Jump to date..."
      >
        <option disabled={true}>Jump to date...</option>
        {totalDays.map((day, i) => (
          <option key={i}>{day}</option>
        ))}
      </select>
      <div className="calendar-grid">
        {totalDays.map((day, i) => (
          <div
            className="calendar-day-area"
            id={day}
            onClick={() => setDay(+day)}
            key={i}
          >
            <p className="calendar-day">{day}</p>
            {eventsData.map((event, i) => (
              <div key={i}>
                {event.dy === day &&
                event.mon === currMonth &&
                event.yr === year ? (
                  <div>
                    {event.name} from {event.strt} to {event.ending}
                  </div>
                ) : null}
              </div>
            ))}
            {!eventsData.find(
              (event) =>
                event.dy === day && event.mon === currMonth && event.yr === year
            ) ? (
              <div>No events.</div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
