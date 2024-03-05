import axios from 'axios';
import URL from '../config/url';

class MatchService {
  static list(payload, access_token) {
    return axios({
      method: 'GET',
      baseURL: URL.phPongMatchService(),
      url: '/customer/matches',
      params: payload,
      headers: {
        'access-token': access_token,
      },
    });
  }
  static create(payload, access_token) {
    return axios({
      method: 'POST',
      baseURL: URL.phPongMatchService(),
      url: '/customer/matches',
      data: payload,
      headers: {
        'access-token': access_token,
      },
    });
  }
  static getByUser(authId, access_token) {
    return axios({
      method: 'GET',
      baseURL: URL.phPongMatchService(),
      url: `/customer/matches/${authId}/by-user`,
      headers: {
        'access-token': access_token,
      },
    });
  }
}

export default MatchService;
