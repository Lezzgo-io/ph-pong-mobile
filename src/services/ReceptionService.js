import axios from 'axios';

class ReceptionService {
  static accept(payload, address) {
    return axios({
      method: 'POST',
      baseURL:
        'http://ec2-13-229-82-191.ap-southeast-1.compute.amazonaws.com:2430',
      url: '/reception/scan-accept',
      data: payload,
    });
  }
}

export default ReceptionService;
