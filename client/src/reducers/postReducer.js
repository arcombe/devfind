import { GET_POST, GET_ALL_POSTS } from '../actions/types';

const initialState = {
  post: {},
  posts: [],
  loading: false
};

export default (prevState = initialState, action) => {
  switch (action.type) {
    case GET_POST:
      return { ...prevState, post: { text: 'text' } };
    case GET_ALL_POSTS:
      return { ...prevState, posts: [{ text: 'hi' }, { text: 'there' }] };
    default:
      return prevState;
  }
};
