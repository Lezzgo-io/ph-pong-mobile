class URL {
  static phPongUserService() {
    let env = process.env.REACT_APP_ENV;

    if (env === 'dev') {
      return '/';
    } else if (env === 'uat') {
      return 'https://lezzgoapp.com:24431';
    } else if (env === 'prod') {
      return '/';
    }

    return '/';
  }
  static phPongMatchService() {
    let env = process.env.REACT_APP_ENV;

    if (env === 'dev') {
      return '/';
    } else if (env === 'uat') {
      return 'https://lezzgoapp.com:24432';
    } else if (env === 'prod') {
      return '/';
    }

    return '/';
  }
  static lezzgoNftService() {
    let env = process.env.REACT_APP_ENV;

    if (env === 'dev') {
      return '/';
    } else if (env === 'uat') {
      return '/';
    } else if (env === 'prod') {
      return '/';
    }

    return '/';
  }
}

export default URL;
