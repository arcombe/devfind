import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_USER
} from "./types";
import axios from "axios";

const createProfile = (profileData, history) => dispatch => {
  axios
    .post("api/profile", profileData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

const deleteAccount = () => dispatch => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    axios
      .delete("/api/profile")
      .then(res =>
        dispatch({
          type: SET_USER,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());

  axios
    .get("/api/profile")
    .then(res => {
      dispatch({ type: GET_PROFILE, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: GET_PROFILE, payload: {} });
    });
};

const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

const clearProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

export { getCurrentProfile, clearProfile, createProfile, deleteAccount };
