import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profileActions';

class Experience extends Component {
  onDeleteClick(expID) {
    this.props.deleteExperience(expID);
  }

  render() {
    const experiences = this.props.experience.map(exp => (
      <tr key={exp._id}>
        <td className="align-middle">{exp.company}</td>
        <td className="align-middle">{exp.title}</td>
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
        <h4 className="mb-4">Experience Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Duration</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{experiences}</tbody>
        </table>
      </div>
    );
  }
}

Experience.propTypes = {
  deleteExperience: propTypes.func.isRequired
};

export default connect(null, { deleteExperience })(Experience);
