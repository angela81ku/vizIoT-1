
/*
{
  mac: <macaddr>,
  data: <data[]>,
}
 */
const deviceData = {}

export const addData = (macAddress, packet) => {
  // if data does not exist for this device, create a new entry
  if (!deviceData.hasOwnProperty(macAddress)) {
    deviceData[macAddress] = {
      mac: macAddress,
      data: [packet],
    }
  }
  // otherwise append data to existing entry
  else {
    let currData = deviceData[macAddress].data;
    currData.push(packet)
    // if data is greater than 70, replace object value
    if (currData.length > 70) {
      currData = currData.slice(-70);
    }
    deviceData[macAddress] = {
      mac: macAddress,
      data: currData
    }
  }
}

export const getData = () => {
  return deviceData;
}