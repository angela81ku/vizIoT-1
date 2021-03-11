
/*
{
  mac: <macaddr>,
  data: <data[]>,
}
 */
// keeps track of all devices
const deviceData = {};
// keeps track of top 3 devices
let devicesInUse = {};

export const addData = (deviceArray) => {

  // console.log(deviceArray)
  const currentlyInUse = {};

  // if data does not exist for this device, create a new entry
  for (let i = 0; i < deviceArray.length; ++i) {
    const device = deviceArray[i];
    if (!deviceData.hasOwnProperty(device.macAddress)) {
      deviceData[device.macAddress] = {
        mac: device.macAddress,
        data: [device.data],
      }
    }
    // otherwise append data to existing entry
    else {
      let currData = deviceData[device.macAddress].data;
      currData.push(device.data)
      // if data is greater than 70, replace object value
      if (currData.length > 70) {
        currData = currData.slice(-70);
      }
      deviceData[device.macAddress] = {
        mac: device.macAddress,
        data: currData
      }
    }

    // create entry in current devices for device using its data inside of deviceData
    currentlyInUse[device.macAddress] = deviceData[device.macAddress];
  }

  // checks for those devices that were in use during the last call
  // if they were not in the most recent stream from the backend,
  // then reset their data to an empty array -- prevents old data from being shown
  // if device removed from data stream is re-inserted
  Object.keys(devicesInUse).forEach(deviceMac => {
    if (!currentlyInUse.hasOwnProperty(deviceMac)) {
      deviceData[deviceMac].data = [];
    }
  })

  // console.log(currentlyInUse)

  // console.log(deviceData)
  // reset devices in use after all operations have been completed
  devicesInUse = currentlyInUse;
}

export const getData = () => {
  return devicesInUse;
}