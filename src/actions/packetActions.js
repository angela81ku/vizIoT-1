import { analyzeApi, analyzeApiKeys } from '../data/api/analyzeApi';
import { createAction } from 'redux-act';
import DeviceDimension from '../data/dimensions/DeviceDimension';
import { ConnectionMetric } from '../data/metrics/ConnectionMetric';
import { convertDateTypeToString } from '../utility/TimeUtility';
import { DateConstants } from '../constants/DateConstants';
import { packetApi, packetApiKeys } from 'VizIoT/data/api/packetApi';

export const startRecentPackets = createAction();
export const successRecentPackets = createAction();
export const failureRecentPackets = createAction();

export const requestRecentPackets = options => {
  startRecentPackets();
  const { call, REQUEST_RECORD } = packetApi[packetApiKeys.PACKET];
  const requestBody = new REQUEST_RECORD(options);

  return new Promise(resolve => {
    call(requestBody)
      .then(resolve)
      .catch(error => {
        failureRecentPackets();
      });
  }).then(res => {
    successRecentPackets({
      payload: res.data,
      requestBody,
    });
  });
};
