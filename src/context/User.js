import { createContext, useContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState(0);
  let date = new Date();

  const dayFinder = (d) => {
    let num = d.toString().split(" ")[2];

    if (num[0] === "0") {
      return +num[1];
    } else {
      return +num;
    }
  };

  const [day, setDay] = useState(dayFinder(date));

  let days = [];

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

  return (
    <UserContext.Provider
      value={{ user, setUser, month, days, date, day, setDay }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
