import axios from 'axios';
import URL from '../config/url';

class NftService {
  static listNfts(payload, address) {
    return axios({
      method: 'GET',
      baseURL: URL.lezzgoNftService(),
      url: '/wallet/address',
      params: payload,
    });
  }
}

export default NftService;
