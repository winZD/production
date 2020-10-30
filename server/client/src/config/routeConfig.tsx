import React from "react";
import { createBrowserHistory } from "history";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import back from "../icons/back.png";
import calendar from "../icons/calendar.png";
import Home from "../layout/home";
import ClientScreenInfo from "../layout/clientScreen";
import Patterns from "../layout/patterns";
import LoginScreen from "../layout/loginScreen";
import RegisterScreen from "../layout/registerScreen";
import AdminScreen from "../layout/adminScreen";
import withAuthorization from "../layout/withAuth";

const Routing = () => {
  const history = createBrowserHistory();

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/clientScreen" component={ClientScreenInfo}></Route>
        <Route path="/patterns" component={Patterns}></Route>
        <Route path="/login" component={LoginScreen}></Route>
        <Route path="/register" component={RegisterScreen}></Route>
        <Route
          path="/adminScreen"
          component={withAuthorization(AdminScreen)}
        ></Route>
      </Switch>
    </Router>
  );
};
export default Routing;
