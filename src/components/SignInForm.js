import React from 'react';
import { Field, reduxForm } from 'redux-form';

const renderField = ({ input, label, type, meta: { touched, error } }) => {
  const hasError = (touched && error) ? 'has-danger' : '';
  return (
    <div className={`form-group ${hasError}`}>
      <label>{label}</label>
      <div>
        <input {...input} placeholder={label} type={type} className="form-control" />
        {touched && error && <div className="form-control-feedback">{error}</div>}
      </div>
    </div>
  );
};

const renderErrors = (errors) => (
  <div className="alert alert-danger" role="alert">
    {errors.map((error, index) => <span key={index}>{error.value}</span>)}
  </div>
);

const SignInForm = (props) => {
  const { handleSubmit } = props;
  const errors = props.errors <= 0 ? null : renderErrors(props.errors);
  return (
    <form onSubmit={handleSubmit}>
      {errors}
      <Field name="Organisation" type="text" component={renderField} label="Organisation" />
      <Field name="Company" type="text" component={renderField} label="Company" />
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
}

const validate = (values) => {
  const errors = {}

  if (!values.Organisation) {
    errors.Organisation = 'Required';
  } else if (values.Organisation.length <= 3) {
    errors.Organisation = 'Must be at least 4 characters';
  }

  if (!values.Company) {
    errors.Company = 'Required';
  } else if (values.Company.length <= 3) {
    errors.Company = 'Must be at least 4 characters';
  }

  return errors;
}

// Decorate the form component
export default reduxForm({
  form: 'SignInForm', // a unique name for this form
  validate
})(SignInForm);