class URL {
  static api() {
    let env = process.env.REACT_APP_ENV;

    if (env === 'dev') {
      return 'http://localhost:2430';
    } else if (env === 'uat') {
      return 'http://ec2-13-229-82-191.ap-southeast-1.compute.amazonaws.com:2430';
    } else if (env === 'prod') {
      return '/';
    }

    return '/';
  }
}

export default URL;
