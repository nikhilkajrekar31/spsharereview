import React, {Component} from 'react';
import auth0Client from './Auth';
import LoadingProfile from '../components/SystemMessages/Loading/LoadingProfile/Main';

class SignIn extends Component {


  componentDidMount() {
    auth0Client.signIn();
  }

  render() {
    return (
      <LoadingProfile/>
    );
  }
}

export default SignIn;
