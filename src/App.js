import { Route, Switch } from "react-router-dom";
import Home from "./components/Home.js";
import Calendar from "./components/Calendar.js";
import Navigation from "./components/Navigation.js";
import data from "./data/information.js";

function App() {
  return (
    <div className="main">
      <Navigation users={data.users} />
      <Switch>
        <Route exact path="/">
          <Home data={data} />
        </Route>
      </Switch>
      <Calendar data={data} />
    </div>
  );
}

export default App;
