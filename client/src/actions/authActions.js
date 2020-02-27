import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_USER } from "./types";

// Register User
const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => {
      history.push("/login");
      console.log(res.data);
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login User

const loginUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Save to localStorage
      const { token } = res.data;
      // Set token to ls
      localStorage.setItem("jwtToken", token);
      // Set token to auth header
      setAuthToken(token);

      // Decode token to get data
      const decoded = jwt_decode(token);
      // Set user
      console.log(decoded);
      history.push("/dashboard");
      dispatch({ type: SET_USER, payload: decoded });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

const logoutUser = () => dispatch => {
  console.log("logout");

  // Remove token LS
  localStorage.removeItem("jwtToken");

  // Remove auth header
  setAuthToken(false);

  // Remove current user
  dispatch({ type: SET_USER, payload: {} });
};

export { registerUser, loginUser, logoutUser };
