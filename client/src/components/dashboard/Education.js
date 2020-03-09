import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profileActions';

class Education extends Component {
  onDeleteClick(expID) {
    this.props.deleteEducation(expID);
  }

  render() {
    const educations = this.props.education.map(exp => (
      <tr key={exp._id}>
        <td className="align-middle">{exp.school}</td>
        <td className="align-middle">{exp.degree}</td>
        <td className="align-middle">{exp.fieldofstudy}</td>
        <td className="align-middle">
          <Moment format="YYYY-MM-DD">{exp.from}</Moment> -{' '}
          {exp.current ? (
            'current'
          ) : (
            <Moment format="YYYY-MM-DD">{exp.to}</Moment>
          )}
        </td>
        <td className="align-middle">
          <button
            className="btn btn-danger"
            onClick={this.onDeleteClick.bind(this, exp._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));

    return (
      <div>
        <h4 className="mb-4">Education Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Field Of Study</th>
              <th>Duration</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{educations}</tbody>
        </table>
      </div>
    );
  }
}

Education.propTypes = {
  deleteEducation: propTypes.func.isRequired
};

export default connect(null, { deleteEducation })(Education);
