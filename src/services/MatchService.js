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
  static getByUser(authUid, access_token) {
    return axios({
      method: 'GET',
      baseURL: URL.phPongMatchService(),
      url: `/customer/matches/${authUid}/by-user`,
      headers: {
        'access-token': access_token,
      },
    });
  }
  static payGameFee(payload, matchUid, access_token) {
    return axios({
      method: 'PUT',
      baseURL: URL.phPongMatchService(),
      url: `/customer/matches/${matchUid}/pay-game-fee`,
      data: payload,
      headers: {
        'access-token': access_token,
      },
    });
  }
  static join(payload, matchUid, access_token) {
    return axios({
      method: 'POST',
      baseURL: URL.phPongMatchService(),
      url: `/customer/matches/${matchUid}/join`,
      data: payload,
      headers: {
        'access-token': access_token,
      },
    });
  }
}

export default MatchService;
