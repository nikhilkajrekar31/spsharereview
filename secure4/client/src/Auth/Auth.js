import auth0 from 'auth0-js';
import { appInfo } from './../global/constants';
import user from '../models/User';

class Auth {
  constructor() {
    const routes = appInfo.getRoutes();
    this.clientID = 'ATgqm_2d-H595P0cgfNluRZA-FU3UpAd';
    this.auth0 = new auth0.WebAuth({
      'domain': 'venom-in-veins.auth0.com',
      'clientID': this.clientID,
      'redirectUri': appInfo.url + routes.callback,
      'responseType': 'token id_token',
      'scope': 'openid email profile'
    });

    this.getProfile = this.getProfile.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.handleAuthentication_cache = null;
  }

  getProfile() {
    return this.profile;
  }

  getIdToken() {
    return this.idToken;
  }

  handleAuthentication() {
    if (this.handleAuthentication_cache === null) {
      this.handleAuthentication_cache = new Promise((resolve, reject) => {
        this.auth0.parseHash((err, authResult) => {
          if (err) return reject(err);
          if (!authResult || !authResult.idToken) {
            return reject(err);
          }
          this.setSession(authResult).then(() => {
            resolve();
          });
        });
      });
    }
    return this.handleAuthentication_cache;
  }

  async setSession(authResult) {
    this.idToken = authResult.idToken;
    this.profile = authResult.idTokenPayload;
    this.expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    await user.populateFrom(authResult.accessToken);
  }

  silentAuth() {
    return new Promise((resolve, reject) => {
      this.auth0.checkSession({}, (err, authResult) => {
        if (err) return reject(err);
        this.setSession(authResult)
          .then(() => {
            resolve();
          })
          .catch(err => {
            reject(err);
          });
      });
    });
  }

  isAuthenticated() {
    const result = new Date().getTime() < this.expiresAt;
    return result;
  }

  // scheduleRenewal() {
  //   const delay = this.expiresAt - Date.now();
  //   if (delay > 0) {
  //     this.tokenRenewalTimeout = setTimeout(() => {
  //       this.renewToken();
  //     }, delay);
  //   }
  // }

  signIn() {
    this.auth0.authorize();
  }

  signOut() {
    this.auth0.logout({
      'returnTo': appInfo.url,
      'clientID': this.clientID,
    });
  }
}

const auth0Client = new Auth();

export default auth0Client;
