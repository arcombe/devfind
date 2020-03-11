import React from 'react';
import CommentItem from './CommentItem';
import propTypes from 'prop-types';

function CommentFeed({ comments, postId }) {
  return comments.map(comment => (
    <CommentItem key={comment._id} comment={comment} postId={postId} />
  ));
}

CommentFeed.propTypes = {
  comments: propTypes.array.isRequired,
  postId: propTypes.string.isRequired
};

export default CommentFeed;
