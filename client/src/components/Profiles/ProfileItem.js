import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="card">
        <div className="card-body bg-light">
          <div className="row">
            <div className="col-2">
              <img
                src={profile.userID.avatar}
                alt=""
                className="rounded-circle"
              />
            </div>
            <div className="col-lg-6 col-md-4 col-8">
              <h3>{profile.userID.name}</h3>
              <p>
                {profile.status}{' '}
                {isEmpty(profile.company) ? '' : profile.company}
              </p>
              <p>{isEmpty(profile.location) ? null : profile.company}</p>
              <Link to={`/profile/${profile.handle}`} className="btn btn-info">
                View Profile
              </Link>
            </div>
            <div className="col-md-4 d-none d-md-block">
              <h4>Skill Set</h4>
              <ul className="list-group">
                {profile.skills.slice(0, 4).map((skill, index) => (
                  <li key={index} className="list-group-item">
                    <i className="fa fa-check pr-1" /> {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: propTypes.object.isRequired
};

export default ProfileItem;
