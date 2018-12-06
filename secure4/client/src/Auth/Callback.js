import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import auth0Client from './Auth';
import LoadingProfile from '../components/SystemMessages/Loading/LoadingProfile/Main';
import user from '../models/User';
import { appInfo } from '../global/constants';

class Callback extends Component {


  async componentDidMount() {
    const routes = appInfo.getRoutes();
    await auth0Client.handleAuthentication();
    let url = '/';
    if (user && user.info.isNewUser) {
      url = routes.accountSettings;
    }
    this.props.history.replace(url);
  }

  render() {
    return (
      <LoadingProfile/>
    );
  }
}

export default withRouter(Callback);
