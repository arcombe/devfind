import {
  GET_POST,
  GET_ALL_POSTS,
  POST_LOADING,
  ADD_POST,
  DELETE_POST
} from '../actions/types';

const initialState = {
  post: {},
  posts: [],
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return { ...state, posts: [action.payload, ...state.posts] };
    case POST_LOADING:
      return { ...state, loading: action.payload };
    case GET_POST:
      return { ...state, post: action.payload, loading: false };
    case GET_ALL_POSTS:
      return { ...state, posts: action.payload, loading: false };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(x => x._id !== action.payload._id)
      };
    default:
      return state;
  }
};
