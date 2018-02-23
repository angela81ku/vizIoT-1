import axios from 'axios';
import { headers, baseUrl } from '../../constants/RequestConstants';

export const fetchDevices = networkId => {
  const url = `${baseUrl}/api/networks/${networkId}/devices`;
  return axios.get(url, { headers });
};
