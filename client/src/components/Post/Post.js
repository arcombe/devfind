import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Spinner from '../common/Spinner';
import { getPost } from '../../actions/postActions';
import PostItem from '../Posts/PostItem';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';
import isEmpty from '../../validation/is-empty';

class Post extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      this.props.getPost(id);
    }
  }

  render() {
    const { post, loading } = this.props.post;

    let postContent;

    if (loading || post === {}) {
      postContent = <Spinner />;
    } else {
      postContent = <PostItem post={post} displayActions={false} />;
    }

    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col">
              <Link to="/posts" className="btn btn-light mb-3">
                Back To Feed
              </Link>
              {postContent}
              {isEmpty(post) ? null : <CommentForm postId={post._id} />}
              {isEmpty(post.comment) ? null : (
                <CommentFeed comments={post.comment} postId={post._id} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  getPost: propTypes.func.isRequired,
  post: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);
