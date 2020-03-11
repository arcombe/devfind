import {
  ADD_POST,
  GET_ERRORS,
  GET_ALL_POSTS,
  POST_LOADING,
  DELETE_POST
} from './types';

import axios from 'axios';

const addPost = post => dispatch => {
  axios
    .post('/api/posts', post)
    .then(res =>
      dispatch({
        type: ADD_POST,
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

const getPosts = () => dispatch => {
  dispatch(setLoadingState());

  axios
    .get('/api/posts')
    .then(res => dispatch({ type: GET_ALL_POSTS, payload: res.data }))
    .catch(err => dispatch({ type: GET_ALL_POSTS, payload: [] }));
};

const deletePost = id => dispatch => {
  axios
    .delete(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_POST,
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

const addLike = id => dispatch => {
  axios
    .post(`/api/posts/like/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

const removeLike = id => dispatch => {
  axios
    .delete(`/api/posts/like/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

const setLoadingState = () => {
  return {
    type: POST_LOADING,
    payload: true
  };
};

export { addPost, getPosts, deletePost, addLike, removeLike };
