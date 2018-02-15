import axios from 'axios';
import { headers, baseUrl } from '../../constants/RequestConstants';

export const fetchDevices = networkId => {
  const url = `${baseUrl}/api/network/${networkId}/devices`;
  return axios.get(url, { headers });
};
