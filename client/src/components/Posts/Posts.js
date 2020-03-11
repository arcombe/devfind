import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import PostForm from './PostForm';
import { getPosts } from '../../actions/postActions';
import PostFeed from './PostFeed';

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { posts, loading } = this.props.post;

    let postContent;

    if (loading) {
      postContent = <Spinner />;
    } else {
      postContent = <PostFeed posts={posts} />;
    }
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col">
              <PostForm />
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  post: propTypes.object.isRequired,
  getPosts: propTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);
