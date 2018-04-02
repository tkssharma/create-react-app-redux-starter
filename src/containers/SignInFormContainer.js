import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import SignInForm from '../components/SignInForm';
import { signIn } from '../actions';

class SignInFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { errors: [] };
  }

  handleSubmit(values) {
    this.props.router.replace('/');
  }
  render() {
    return (
      <SignInForm
        onSubmit={this.handleSubmit.bind(this)}
        errors={this.state.errors}
      />
    );
  }
};



const SignInWithData = (withRouter(SignInFormContainer));

const mapDispatchToProps = (dispatch) => ({
  signInDispatcher(token) {
    dispatch(signIn(token));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(SignInWithData);

