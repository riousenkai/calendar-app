import { useState, useEffect } from "react";
import { useUser } from "../context/User";

const Calendar = ({ data, eventsData }) => {
  const date = new Date();

  const { setDay, currMonth, setCurrMonth, year, setYear, day } = useUser();

  const [totalDays, setTotalDays] = useState([]);
  const [currDay, setCurrDay] = useState(day);

  useEffect(() => {
    let dayAmt = [];

    if (currMonth === 1 && year % 4 === 0) {
      for (let j = 1; j <= 29; j++) {
        dayAmt.push(j);
      }
    } else {
      for (let i = 1; i <= +data.months[currMonth].days; i++) {
        dayAmt.push(i);
      }
    }
    setTotalDays(dayAmt);
  }, [currMonth]);

  useEffect(() => {
    setCurrDay(+day);
  }, [day]);

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

  const jumpToDate = (e) => {
    setCurrDay(e.target.value);
    document
      .getElementById(e.target.value)
      .scrollIntoView({ behavior: "smooth" });
    setDay(+e.target.value);
  };

  return (
    <div className="calendar-right">
      <div className="calendar-top">
        <button
          onClick={reverseMonth}
          className="date-change-btn-back"
        >{`<`}</button>
        <h2 className="month">
          {data.months[currMonth].month} {year}
        </h2>
        <button
          onClick={changeMonth}
          className="date-change-btn-forward"
        >{`>`}</button>
      </div>
      <button onClick={returnToMonth} className="date-return">
        Return to current date
      </button>
      <div className="date-jump">
        Jump to day:
        <select
          id={0}
          value={currDay}
          onChange={(e) => jumpToDate(e)}
          className="date-select"
        >
          {totalDays.map((day, i) => (
            <option key={i}>{day}</option>
          ))}
        </select>
      </div>
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
                  <div className="calendar-event-details">
                    {event.name?.length < 15
                      ? event?.name
                      : `${event.name?.slice(0, 13)}...`}{" "}
                    from {event.strt} to {event.ending}
                  </div>
                ) : null}
              </div>
            ))}
            {!eventsData.find(
              (event) =>
                event.dy === day && event.mon === currMonth && event.yr === year
            ) ? (
              <div className="calendar-event-details">No appointments</div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
