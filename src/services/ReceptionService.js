import axios from 'axios';
import URL from '../config/url';

class ReceptionService {
  static scanCreate(payload, access_token) {
    return axios({
      method: 'POST',
      baseURL: URL.phPongReceptionService(),
      url: '/customer/reception',
      data: payload,
      headers: {
        'access-token': access_token,
      },
    });
  }
  static scanAvailable(payload, access_token) {
    return axios({
      method: 'GET',
      baseURL: URL.phPongReceptionService(),
      url: '/customer/reception/scan/available',
      params: payload,
      headers: {
        'access-token': access_token,
      },
    });
  }
  static paidGameFee(payload, access_token) {
    return axios({
      method: 'GET',
      baseURL: URL.phPongReceptionService(),
      url: '/customer/reception/game-fee/paid',
      params: payload,
      headers: {
        'access-token': access_token,
      },
    });
  }
}

export default ReceptionService;
