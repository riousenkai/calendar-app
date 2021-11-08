import { createContext, useContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  let date = new Date();
  let days = [];
  const [user, setUser] = useState(0);
  const [currMonth, setCurrMonth] = useState(+date.getMonth());
  const [year, setYear] = useState(+date.getFullYear());

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
        days,
        date,
        day,
        setDay,
        availDays,
        currMonth,
        setCurrMonth,
        year,
        setYear,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
