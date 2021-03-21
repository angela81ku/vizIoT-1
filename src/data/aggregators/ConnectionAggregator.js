let connections = [];
const packets = {};

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
  if (packets.hasOwnProperty(packet.id)) {
    let packetArr = packets[packet.id];
    packetArr.push(packet.size);
    if (packetArr.length > 75) {
      packetArr = packetArr.slice(-75)
    }
    packets[packet.id] = packetArr;
  } else {
    packets[packet.id] = [packet.size];
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
