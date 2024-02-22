import axios from 'axios';
import URL from '../config/url';

class AuthService {
  static register(payload) {
    return axios({
      method: 'POST',
      baseURL: URL.phPongAdminService(),
      url: '/auth/register',
      data: payload,
    });
  }
  static login(payload) {
    return axios({
      method: 'POST',
      baseURL: URL.phPongAdminService(),
      url: '/auth/login',
      data: payload,
    });
  }
  static logout() {
    return axios({
      method: 'POST',
      baseURL: URL.phPongAdminService(),
      url: '/auth/logout',
    });
  }
  static user() {
    return axios({
      method: 'GET',
      baseURL: URL.phPongAdminService(),
      url: '/auth/user',
    });
  }
}

export default AuthService;
