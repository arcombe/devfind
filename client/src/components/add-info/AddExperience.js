import React, { Component } from 'react';
import { connect } from 'react-redux';
import proptypes from 'prop-types';
import { addExperience } from '../../actions/profileActions';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { Link, withRouter } from 'react-router-dom';

class AddExperience extends Component {
  constructor(props) {
    super(props);

    this.state = {
      company: '',
      title: '',
      location: '',
      from: '',
      to: '',
      current: false,
      description: '',
      errors: {},
      disabled: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({ errors: nextProps.errors });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onCheck(e) {
    this.setState(prev => ({
      current: !prev.current,
      disabled: !prev.disabled
    }));
  }

  onSubmit(e) {
    e.preventDefault();

    const newExp = {
      company: this.state.company,
      location: this.state.location,
      title: this.state.title,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    this.props.addExperience(newExp, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Experience</h1>
              <p className="lead text-center">
                Add any job or position you have had in the past or current.
              </p>
              <small className="d-black pb-3">* = required field.</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  name="company"
                  placeholder="* Company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                />

                <TextFieldGroup
                  name="title"
                  placeholder="* Job Title"
                  value={this.state.title}
                  onChange={this.onChange}
                  error={errors.title}
                />

                <TextFieldGroup
                  name="location"
                  placeholder="Location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                />

                <h6>From date:</h6>

                <TextFieldGroup
                  name="from"
                  value={this.state.from}
                  type="date"
                  onChange={this.onChange}
                  error={errors.from}
                />

                <h6>To date:</h6>

                <TextFieldGroup
                  name="to"
                  value={this.state.to}
                  type="date"
                  onChange={this.onChange}
                  error={errors.to}
                  disabled={this.state.disabled ? 'disabled' : ''}
                />
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="current"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.onCheck}
                    id="current"
                  />
                  <label htmlFor="current" className="form-check-label">
                    Current Position
                  </label>
                </div>

                <TextAreaFieldGroup
                  name="description"
                  placeholder="Job Description"
                  value={this.state.description}
                  errors={errors.description}
                  onChange={this.onChange}
                  info="Tell us about your position."
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

AddExperience.propTypes = {
  addExperience: proptypes.func.isRequired,
  errors: proptypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps, { addExperience })(
  withRouter(AddExperience)
);
