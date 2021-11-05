import { createContext, useContext, useState } from "react";
import data from "../data/information.js"

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState(0);

  let date = new Date();
  let days = [];

  const [year, setYear] = useState(+date.getFullYear())

  const dayFinder = (d) => {
    let num = d.toString().split(" ")[2];

    if (num[0] === "0") {
      return +num[1];
    } else {
      return +num;
    }
  };

  const [currMonth, setCurrMonth] = useState(+date.getMonth())

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

  let availDays = days.filter(day => day >= dayFinder(date))

  return (
    <UserContext.Provider
      value={{ user, setUser, month, days, date, day, setDay, availDays, currMonth, setCurrMonth, year, setYear }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
