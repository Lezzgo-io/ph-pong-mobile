class URL {
  static phPongUserService() {
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
  static phPongReceptionService() {
    let env = process.env.REACT_APP_ENV;

    if (env === 'dev') {
      return '/';
    } else if (env === 'uat') {
      return 'http://ec2-54-169-100-103.ap-southeast-1.compute.amazonaws.com:2403';
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
      return 'http://ec2-54-169-100-103.ap-southeast-1.compute.amazonaws.com:2404';
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
