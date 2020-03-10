import React, { Component } from 'react';
import Moment from 'react-moment';
import isEmpty from '../../validation/is-empty';

class ProfileCreds extends Component {
  render() {
    const { education, experience } = this.props;

    const eduItems = education.map(edu => (
      <li key={edu._id} className="list-group-item">
        <h4>{edu.school}</h4>
        <p>
          <Moment format="YYYY-MM-DD">{edu.from}</Moment> -{' '}
          {isEmpty(edu.to) ? (
            'current'
          ) : (
            <Moment format="YYYY-MM-DD">{edu.to}</Moment>
          )}
        </p>
        <p>
          <strong>Degree: </strong> {edu.degree}
        </p>
        <p>
          <strong>Field of study: </strong> {edu.fieldofstudy}
        </p>
        {isEmpty(edu.description) ? null : (
          <p>
            <strong>Description: </strong> {edu.description}
          </p>
        )}
      </li>
    ));

    const expItems = experience.map(exp => (
      <li key={exp._id} className="list-group-item">
        <h4>{exp.company}</h4>
        <p>
          <Moment format="YYYY-MM-DD">{exp.from}</Moment> -{' '}
          {isEmpty(exp.to) ? (
            'current'
          ) : (
            <Moment format="YYYY-MM-DD">{exp.to}</Moment>
          )}
        </p>
        <p>
          <strong>Position: </strong> {exp.title}
        </p>
        {isEmpty(exp.location) ? null : (
          <p>
            <strong>Location: </strong> {exp.location}
          </p>
        )}
        {isEmpty(exp.description) ? null : (
          <p>
            <strong>Description: </strong> {exp.description}
          </p>
        )}
      </li>
    ));

    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Experience</h3>
          {expItems.length > 0 ? (
            <ul className="list-group">{expItems}</ul>
          ) : null}
        </div>
        <div className="col-md-6">
          <h3 className="text-center text-info">Education</h3>
          {eduItems.length > 0 ? (
            <ul className="list-group">{eduItems}</ul>
          ) : null}
        </div>
      </div>
    );
  }
}

export default ProfileCreds;
