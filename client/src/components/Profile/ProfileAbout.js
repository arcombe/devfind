import React, { Component } from 'react';
import isEmpty from '../../validation/is-empty';

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;

    const firstname = profile.userID.name.split(' ')[0];

    return (
      <div className="row">
        <div className="col">
          <div className="card card-body bg-light mb-3 text-center">
            <h3 className="text-info">{firstname}'s bio</h3>
            {isEmpty(profile.bio) ? (
              <p className="lead">No bio added</p>
            ) : (
              <p className="lead">{profile.bio}</p>
            )}
            <hr />
            <h3 className="text-info">Skill Set</h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-around align-items-center w-100">
                {profile.skills.map((skill, index) => (
                  <div className="p-3" key={index}>
                    <i className="fa fa-check" />
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileAbout;
