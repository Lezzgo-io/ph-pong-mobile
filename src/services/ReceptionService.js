import axios from 'axios';
import URL from '../config/url';

class ReceptionService {
  static scanCreate() {
    return axios({
      method: 'POST',
      baseURL: URL.phPongAdminService(),
      url: '/customer/reception/scan/create',
    });
  }
  static scanAvailable() {
    return axios({
      method: 'GET',
      baseURL: URL.phPongAdminService(),
      url: '/customer/reception/scan/available',
    });
  }
}

export default ReceptionService;
