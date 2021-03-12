
/*
{
  mac: <macaddr>,
  data: <[{startMS, endMS, size[]]>,
}
where size is an array of length 2 containing [sent, received] values
 */
// keeps track of all devices
const deviceData = {};
// keeps track of top 3 devices
let devicesInUse = {};

export const addTopThreeIOData = (devices) => {

  // console.log(deviceArray)
  const currentlyInUse = {};

  // if data does not exist for this device, create a new entry
  for (let i = 0; i < devices.length; ++i) {
    const device = devices[i];
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
      // if data is greater than 35, replace object value
      if (currData.length > 35) {
        currData = currData.slice(-35);
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
  // do this at end so as to minimize data race for devicesInUse should the line viz component attempt to access
  // during data update
  devicesInUse = currentlyInUse;
}

export const getTopThreeIOData = () => {
  return devicesInUse;
}