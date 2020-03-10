import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';
import Spinner from '../common/Spinner';
import { getProfileByHandle } from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty';

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileCreds
            education={profile.education}
            experience={profile.experience}
          />
          {isEmpty(profile.githubusername) ? null : (
            <ProfileGithub username={profile.githubusername} />
          )}
        </div>
      );
    }

    return (
      <div className="profile">
        <div className="container">{profileContent}</div>
      </div>
    );
  }
}

Profile.propTypes = {
  profile: propTypes.object.isRequired,
  getProfileByHandle: propTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfileByHandle })(Profile);
