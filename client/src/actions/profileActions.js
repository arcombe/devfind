import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_USER
} from './types';
import axios from 'axios';

const createProfile = (profileData, history) => dispatch => {
  console.log('fetch from here, do something cool');

  axios
    .post('api/profile', profileData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

const deleteAccount = () => dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    axios
      .delete('/api/profile')
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
    .get('/api/profile')
    .then(res => {
      dispatch({ type: GET_PROFILE, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: GET_PROFILE, payload: {} });
    });
};

const getAllProfiles = () => dispatch => {
  dispatch(setProfileLoading());

  axios
    .get('/api/profile/all')
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};

const addExperience = (experience, history) => dispatch => {
  axios
    .post('api/profile/experience', experience)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

const addEducation = (education, history) => dispatch => {
  axios
    .post('api/profile/education', education)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

const deleteExperience = expID => dispatch => {
  axios
    .delete(`api/profile/experience/${expID}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

const deleteEducation = eduId => dispatch => {
  axios
    .delete(`api/profile/education/${eduId}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
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

export {
  getCurrentProfile,
  clearProfile,
  createProfile,
  deleteAccount,
  addExperience,
  addEducation,
  deleteExperience,
  deleteEducation,
  getAllProfiles
};
