import axios from 'axios'
import { headers, baseUrl } from '../../constants/RequestConstants'
import { Record } from 'immutable'
import { DeviceGroupConstants } from '../../utility/RequestUtility'
import keyMirror from 'keyMirror';

const analyzeAggregationByTime = (payloadRecord, networkId) => {
  const url = `${baseUrl}/api/network/${networkId}/analyze/aggregateDataByTime`;

  return axios({
    method: 'post',
    url: url,
    headers,
    data: payloadRecord.toJS()
  })
}

export const analyzeApi = {
  ['analyzeAggregationByTime']: {
    call: analyzeAggregationByTime,
    requestRecord: new Record({
      forNetwork: null,
      forDevice: DeviceGroupConstants.ALL_COMBINED,
      bucketSize: 0,
      bucketProps: [],
      startMS: 0,
      endMS: 0,
    })
  }
}

export const analyzeApiKeys = keyMirror(analyzeApi)
