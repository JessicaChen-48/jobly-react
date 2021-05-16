import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import CompanyList from "./pages/CompanyList";
import CompanyDetail from "./components/CompanyDetail";
import JobsList from "./pages/JobsList";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import { useContext } from "react";
import UserContext from "./userContext";

function Routes({ signUp, loginUser }) {
  const { token } = useContext(UserContext);
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/companies">
        {token ? <CompanyList /> : <Redirect to="/login" />}
      </Route>
      <Route exact path="/companies/:handle">
        {token ? <CompanyDetail /> : <Redirect to="/login" />}
      </Route>
      <Route exact path="/jobs">
        {token ? <JobsList /> : <Redirect to="/login" />}
      </Route>
      <Route exact path="/login">
        <Login loginUser={loginUser} />
      </Route>
      <Route exact path="/signup">
        <Signup signUp={signUp} />
      </Route>
      <Route exact path="/profile">
        {token ? <Profile /> : <Redirect to="/login" />}
      </Route>
      <Redirect to="/" />
    </Switch>
  );
}

export default Routes;
