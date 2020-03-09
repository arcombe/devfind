import React, { Component } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import { Link } from "react-router-dom";
import ProfileActions from "./ProfileActions";

class Dashboard extends Component {
  constructor() {
    super();

    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick(e) {
    e.preventDefault();

    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent = null;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else if (Object.keys(profile).length === 0) {
      dashboardContent = (
        <div className="container">
          <p className="lead text-muted">Welcome {user.name}</p>
          <p>You have not yet set up a profile please add some info</p>
          <Link to="/create-profile" className="btn btn-lg btn-info">
            Create Profile
          </Link>
        </div>
      );
    } else {
      dashboardContent = (
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <p className="lead text-muted">
                Welcome{" "}
                <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 ">
              <ProfileActions />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 ">
              <button className="btn btn-danger" onClick={this.onDeleteClick}>
                Delete Account
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="dashboard">
        <div className="container text-center">
          <div className="row">
            <div className="col-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: propTypes.func.isRequired,
  deleteAccount: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  profile: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
