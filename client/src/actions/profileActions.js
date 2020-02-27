import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from "./types";
import axios from "axios";

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

export { getCurrentProfile, clearProfile };
