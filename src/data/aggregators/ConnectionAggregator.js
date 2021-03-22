
/*
Note, in all arrays of length 2, index 0 is SENT, index 1 is RECEIVED
{
  one: [[sent, received]]
  five: [sent, received],
  sixty: [sent, received]
}
 */
const packets = {};
let connections = [];

let packetListeners = [];
let connectionListeners = [];

export const addConnections = (connectionArray) => {
  connections = connectionArray;
}

export const getConnections = () => {
  //return all collected devices
  return connections;
}

export const addPackets = (packet) => {
  // check for 1 sec stream
  // console.log(packet)
  if (packet.hasOwnProperty('size1s')) {
    if (packets.hasOwnProperty(packet.id)) {
      const packetObj = packets[packet.id];
      let packetArr = packetObj.one;
      packetArr.push(packet.size1s);
      if (packetArr.length > 75) {
        packetArr = packetArr.slice(-75)
      }
      packets[packet.id]['one'] = packetArr;
    } else {
      packets[packet.id] = makeInitialPacket([packet.size1s], undefined, undefined);
    }
  }
  // check for 5 sec stream
  if (packet.hasOwnProperty('size5s')) {
    if (packets.hasOwnProperty(packet.id)) {
      packets[packet.id]['five'] = packet.size5s;
    } else {
      packets[packet.id] = makeInitialPacket([], packet.size5s, undefined);
    }
  }

  // check for 60 sec stream
  if (packet.hasOwnProperty('size60s')) {
    if (packets.hasOwnProperty(packet.id)) {
      packets[packet.id]['sixty'] = packet.size60s;
    } else {
      packets[packet.id] = makeInitialPacket([], undefined, packet.size60s);
    }
  }
}

const makeInitialPacket = (second, five, sixty) => {
  return {
    one: second,
    five: five,
    sixty: sixty,
  }
}

export const getPackets = () => {
  return packets;
}

export const addPacketListener = (listener) => {
  if (packetListeners.indexOf(listener) < 0) {
    packetListeners.push(listener);
  }
}

export const removePacketListener = (listener) => {
  packetListeners = packetListeners.filter(a => a !== listener);
}

export const updatePacketListeners = () => {
  packetListeners.forEach(l => {
      l(packets);
  })
}

export const addConnectionListener = (listener) => {
  if (connectionListeners.indexOf(listener) < 0) {
    connectionListeners.push(listener);
  }
}

export const removeConnectionListener = (listener) => {
  connectionListeners = connectionListeners.filter(a => a !== listener);
}

export const updateConnectionListeners = () => {
  connectionListeners.forEach(l => {
      l(connections);
  })
}
