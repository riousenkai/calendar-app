import { useEffect, useState } from "react";
import { useUser } from "../context/User";

const Navigation = ({ users }) => {
  const { user, setUser } = useUser();
  const [username, setUsername] = useState(users[0].name);

  useEffect(() => {
    let spec = users.find((ele) => ele.id === +user);
    setUsername(spec.name);
  }, [user]);

  return (
    <div className="nav-main">
      <div className="greeting">Hello, {username}!</div>
      <div className="change-user">
        Change User:
        <select onChange={(e) => setUser(e.target.value)} value={user}>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Navigation;
