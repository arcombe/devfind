import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';
import Spinner from '../common/Spinner';

class Profile extends Component {
  render() {
    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col">
              <ProfileHeader />
              <ProfileAbout />
              <ProfileCreds />
              <ProfileGithub />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
