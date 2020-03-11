import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeComment } from '../../actions/postActions';

class CommentItem extends Component {
  onDeleteClick() {
    const { postId, comment } = this.props;
    this.props.removeComment(postId, comment._id);
  }

  render() {
    const { comment, auth } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2 d-cone d-md-block">
            <img src={comment.avatar} alt="" className="rounded-circle" />
            <br />
            <p className="text-center">{comment.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{comment.text}</p>
            {comment.user === auth.user.id ? (
              <button
                onClick={this.onDeleteClick.bind(this)}
                className="btn btn-danger"
              >
                <i className="fas fa-times" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
  comment: propTypes.object.isRequired,
  postId: propTypes.string.isRequired,
  removeComment: propTypes.func.isRequired,
  auth: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { removeComment })(CommentItem);
