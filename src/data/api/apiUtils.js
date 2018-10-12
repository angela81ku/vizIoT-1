'use es6';
import axios from 'axios';
import { headers } from 'VizIoT/constants/RequestConstants';

export const postCallWithRecord = (payloadRecord, url) => {
  return axios({
    method: 'post',
    url,
    headers,
    data: payloadRecord.toJS(),
  });
};