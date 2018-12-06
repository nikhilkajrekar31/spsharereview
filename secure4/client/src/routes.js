import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage/Main';
import NotFoundPage from './components/SystemMessages/Errors/NotFound/Main';
import SignInError from './components/SystemMessages/Errors/SignIn/Main';
import SomethingWentWrong from './components/SystemMessages/Errors/SomethingWentWrong/Main';
import ValidatingSession from './components/SystemMessages/Loading/ValidaingSession/Main';
import SignIn from './Auth/SignIn';
import auth0Client from './Auth/Auth';
import Callback from './Auth/Callback';
import AccountSettings from './components/Account/Settings/Main';
import { appInfo } from './global/constants';
// <Route exact path={'/order/:type(' + productTypes.join('|') + ')'} component={OrderPage}></Route>

class SecuredRoute extends Component {
  render() {
    if (this.props.checkingSession) {
      return <ValidatingSession/>;
    }
    if (!auth0Client.isAuthenticated()) {
      auth0Client.signIn();
      return <div></div>;
    }
    return <Route path={this.props.path} component={this.props.component}></Route>;
  }
}

class Routes extends Component {
  render() {
    const routes = appInfo.getRoutes();
    return <Switch>
      <SecuredRoute exact path={routes.root} component={HomePage} checkingSession={this.props.checkingSession}></SecuredRoute>
      <SecuredRoute exact path={routes.accountSettings} component={AccountSettings} checkingSession={this.props.checkingSession}></SecuredRoute>
      <Route exact path={routes.signIn} component={SignIn}/>
      <Route exact path={routes.errorSignIn} component={SignInError}/>
      <Route exact path={routes.errorSomething} component={SomethingWentWrong}/>
      <Route exact path={routes.callback} component={Callback}/>
      <Route exact path={routes.default} component={NotFoundPage}></Route>
    </Switch>;
  }
}

export default Routes;
