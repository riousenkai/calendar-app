import { useEffect, useState } from "react";
import { useUser } from "../context/User";

const Navigation = ({ users }) => {
  const { user, setUser } = useUser();
  const [username, setUsername] = useState(users[0].name);
  const [eventName, setEventName] = useState('')
  const [eventDesc, setEventDesc] = useState('')

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
        <div className="add-event">
            <div className="add-event-text">Add Event</div> <img className="add-img" src="https://img.icons8.com/flat-round/64/000000/plus.png"/>
        </div>
        <form className="add-event-form">
            Event Name:
            <input value={eventName} onChange={(e) => setEventName(e.target.value)} />
            Description:
            <textarea value={eventDesc} onChange={(e) => setEventDesc(e.target.value)} />
        </form>
    </div>
  );
};

export default Navigation;
