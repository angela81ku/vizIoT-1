import DeviceActionConstants from './constants/DeviceActionConstant'
import axios from 'axios'

export const actionStartStream = ({dispatch, param}) => {
  // Network
  axios
    .get('')
    .then(response => {
      dispatch(
        {
          type: DeviceActionConstants.FINISH_FETCH_DEVICE_LIST,
          data: response,
        }
      )
    })
    .catch(error => {
      dispatch(
        {
          type: DeviceActionConstants.FINISH_FETCH_DEVICE_LIST,
          error,
        }
      )
    });

  return {
      type: DeviceActionConstants.FETCH_DEVICE_LIST,
  };
}