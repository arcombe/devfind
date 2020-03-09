import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import propTypes from 'prop-types';
import { addEducation } from '../../actions/profileActions';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';

class AddEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school: '',
      degree: '',
      fieldofstudy: '',
      from: '',
      to: '',
      current: false,
      description: '',
      errors: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({ errors: nextProps.errors });
  }

  onSubmit(e) {
    e.preventDefault();

    const newEdu = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    this.props.addEducation(newEdu, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onCheck(e) {
    this.setState(prevState => ({ current: !prevState.current, to: '' }));
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Education</h1>
              <p className="lead text-center">
                Add relavente education that you have attended.
              </p>
              <p className="text-muted">* = required fields.</p>
              <form onSubmit={this.onSubmit} className="form">
                <TextFieldGroup
                  name="school"
                  placeholder="* School"
                  value={this.state.school}
                  error={errors.school}
                  onChange={this.onChange}
                />

                <TextFieldGroup
                  name="degree"
                  placeholder="* Degree"
                  value={this.state.degree}
                  error={errors.degree}
                  onChange={this.onChange}
                />

                <TextFieldGroup
                  name="fieldofstudy"
                  placeholder="* Field of study"
                  value={this.state.fieldofstudy}
                  error={errors.fieldofstudy}
                  onChange={this.onChange}
                />

                <h6>From date:</h6>

                <TextFieldGroup
                  name="from"
                  value={this.state.from}
                  error={errors.from}
                  onChange={this.onChange}
                  type="date"
                />

                <h6>To date:</h6>

                <TextFieldGroup
                  name="to"
                  value={this.state.to}
                  error={errors.to}
                  onChange={this.onChange}
                  type="date"
                  disabled={this.state.current}
                />

                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="current"
                    onChange={this.onCheck}
                    value={this.state.current}
                    checked={this.state.current}
                    id="current"
                  />
                  <label htmlFor="current" className="form-check-label">
                    Current Education
                  </label>
                </div>

                <TextAreaFieldGroup
                  name="description"
                  placeholder="Tell us about the program..."
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                />

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddEducation.propTypes = {
  addEducation: propTypes.func.isRequired,
  errors: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps, { addEducation })(
  withRouter(AddEducation)
);
