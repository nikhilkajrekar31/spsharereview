class AppInfo {
  constructor() {
    this.name = 'SP Share';
    this.url = 'http://localhost:3000';
    this.serverAddress ='http://localhost:8080';
    // this.url = 'https://thawing-badlands-89809.herokuapp.com';
    // this.serverAddress ='https://quiet-stream-72857.herokuapp.com';
  }

  serverAddressWithTokenFor(url, token) {
    return this.serverAddress + '/' + url + '/token=' + token;
  }

  securedRoutes() {
    return {
      'root': '/',
      'accountSettings': '/account/settings',
      'callback': '/callback',
    };
  }

  unsecuredRoutes() {
    return {
      'signIn': '/signin',
      'errorSignIn': '/error/signin',
      'errorSomething': '/error/SomethingWentWrong',
    };
  }

  getRoutes() {
    return {
      ...this.securedRoutes(),
      ...this.unsecuredRoutes(),
      'default': '*',
    };
  }
}

class AppSecurity {
  getNameBlackList() {
    return /[/\\+*]/;
  }
}

const appInfo = new AppInfo();
const appSecurity = new AppSecurity();
export {
  appInfo,
  appSecurity,
};
