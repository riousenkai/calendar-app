import { useState, useEffect } from "react";
import { useUser } from "../context/User";

const Calendar = ({ data }) => {
  const { setDay, currMonth, setCurrMonth, year, setYear, eventsData, setEventsData } =
    useUser();

  const [totalDays, setTotalDays] = useState([])

  useEffect(() => {
    let dayAmt = []
    for (let i = 1; i <= +data.months[currMonth].days; i++) {
      dayAmt.push(i)
    }
    setTotalDays(dayAmt)
  }, [currMonth])

  const changeMonth = () => {
    if (currMonth === 11) {
      setCurrMonth(0);
      setYear((year) => year + 1);
    } else {
      setCurrMonth((month) => month + 1);
    }
  };

  return (
    <div className="calendar-right">
      <h1 className="month">
        {data.months[currMonth].month} {year}
      </h1>
      <button onClick={() => changeMonth()}>{`>`}</button>
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
        {totalDays.map((day) => (
          <option>{day}</option>
        ))}
      </select>
      <div className="calendar-grid">
        {totalDays.map((day) => (
          <div
            className="calendar-day-area"
            id={day}
            onClick={() => setDay(+day)}
            key={day}
          >
            <p className="calendar-day">{day}</p>
            {eventsData.map((event) => (
              <>
                {event.day === day && event.month === currMonth && event.year === year ? (
                  <div>
                    {event.name} from {event.start} to {event.ending}
                  </div>
                ) : null}
              </>
            ))}
            {!eventsData.find(
              (event) => event.day === day && event.month === currMonth && event.year === year
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
