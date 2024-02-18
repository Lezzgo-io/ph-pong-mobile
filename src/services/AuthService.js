import axios from 'axios';
import URL from '../config/url';

class AuthService {
  static register(payload, address) {
    return axios({
      method: 'POST',
      baseURL: URL.api(),
      url: '/auth/register',
      data: payload,
    });
  }
  static login(payload, address) {
    return axios({
      method: 'POST',
      baseURL: URL.api(),
      url: '/auth/login',
      data: payload,
    });
  }
}

export default AuthService;
