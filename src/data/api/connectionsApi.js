import {
  addConnections,
  addPackets,
  updateConnectionListeners,
  updatePacketListeners
} from "../aggregators/ConnectionAggregator";

export const parseConnections = res => {
  if (res.hasOwnProperty('connections')) {
    const connections = res.connections;
    addConnections(connections);
    updateConnectionListeners();
  } else {
    console.log('No connection data in message from server');
  }
}

export const parseConnectionPackets = res => {
  if (res.hasOwnProperty('connections')) {
    const conns = res.connections;
    for (let i = 0; i < conns.length; ++i) {
      addPackets(conns[i]);
    }
    updatePacketListeners();
  } else {
    console.log('No packet data for connections in message from server');
  }
}