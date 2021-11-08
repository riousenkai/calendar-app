import { createContext, useContext, useState } from "react";
import { useEasybase } from "easybase-react";
import { useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  let date = new Date();
  let days = [];
  const { db } = useEasybase();
  const [user, setUser] = useState(0);
  const [eventsData, setEventsData] = useState([]);
  const [currMonth, setCurrMonth] = useState(+date.getMonth());
  const [year, setYear] = useState(+date.getFullYear());

  const eventsDb = async () => {
    const events = await db("APPTS")?.return().orderBy({
      by: "strt",
      sort: "asc",
    }).all();

    setEventsData(events);
  };

  useEffect(() => {
    eventsDb();
  }, []);

  const dayFinder = (d) => {
    let num = d.toString().split(" ")[2];

    if (num[0] === "0") {
      return +num[1];
    } else {
      return +num;
    }
  };

  const [day, setDay] = useState(dayFinder(date));

  const getDays = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
    date
  );

  const daysAmt = getDays(new Date(date.getFullYear(), date.getMonth()));

  for (let i = 1; i <= daysAmt; i++) {
    days.push(i);
  }

  let availDays = days.filter((day) => day >= dayFinder(date));

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        month,
        days,
        date,
        day,
        setDay,
        availDays,
        currMonth,
        setCurrMonth,
        year,
        setYear,
        eventsData,
        setEventsData,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
