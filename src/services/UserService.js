import axios from 'axios';

class UserService {
  static validate(payload, address) {
    return axios({
      method: 'GET',
      baseURL:
        'http://ec2-13-229-82-191.ap-southeast-1.compute.amazonaws.com:2410',
      url: '/customer/validate',
      params: payload,
    });
  }
  static getValidation(payload, address) {
    return axios({
      method: 'GET',
      baseURL:
        'http://ec2-13-229-82-191.ap-southeast-1.compute.amazonaws.com:2410',
      url: '/customer/get-validation',
      params: payload,
    });
  }
}

export default UserService;
