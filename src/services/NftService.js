import axios from 'axios';

class NftService {
  static listNfts(payload, address) {
    return axios({
      method: 'GET',
      baseURL:
        'http://ec2-13-229-82-191.ap-southeast-1.compute.amazonaws.com:2400',
      url: '/wallet/address',
      params: payload,
    });
  }
}

export default NftService;
