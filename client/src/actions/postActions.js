import {
  ADD_POST,
  GET_ERRORS,
  GET_ALL_POSTS,
  POST_LOADING,
  DELETE_POST,
  GET_POST,
  ADD_COMMENT,
  CLEAR_ERRORS
} from './types';

import axios from 'axios';

const addPost = post => dispatch => {
  dispatch(clearErrors());
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

const getPost = id => dispatch => {
  dispatch(setLoadingState());

  axios
    .get(`/api/posts/${id}`)
    .then(res => dispatch({ type: GET_POST, payload: res.data }))
    .catch(err => dispatch({ type: GET_POST, payload: {} }));
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

const addComment = (newComment, id) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/posts/comment/${id}`, newComment)
    .then(res =>
      dispatch({
        type: ADD_COMMENT,
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

const removeComment = (postId, commentId) => dispatch => {
  axios
    .delete(`/api/posts/comment/${postId}/${commentId}`)
    .then(res => dispatch({ type: GET_POST, payload: res.data }))
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

const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

export {
  addPost,
  getPost,
  getPosts,
  deletePost,
  addLike,
  removeLike,
  addComment,
  removeComment
};
