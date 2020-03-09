import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { SET_USER, CLEAR_CURRENT_PROFILE } from "./actions/types";

import store from "./store";

// css
import "./App.css";

// Private Routes
import PrivateRoute from "./components/common/PrivateRoute";

// Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";

// Check for token
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);

  const decoded = jwt_decode(localStorage.jwtToken);

  const currentTime = Date.now() / 1000;

  store.dispatch({
    type: SET_USER,
    payload: decoded
  });

  console.log(decoded.exp, currentTime);

  if (decoded.exp < currentTime) {
    // Remove token LS
    localStorage.removeItem("jwtToken");

    // Remove auth header
    setAuthToken(false);

    // Remove current user
    store.dispatch({ type: SET_USER, payload: {} });

    store.dispatch({
      type: CLEAR_CURRENT_PROFILE
    });
    window.location.href = "/login";

    localStorage.delete("jwtToken");
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path="/profile/edit"
                component={EditProfile}
              />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
