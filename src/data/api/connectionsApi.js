import {
  addConnections,
  addPackets,
  updateConnectionListeners,
  updatePacketListeners,
  METRICS
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

export const parseSecondConnectionPackets = res => {
  if (res.hasOwnProperty('connections')) {
    const conns = res.connections;
    for (let i = 0; i < conns.length; ++i) {
      addPackets(conns[i], METRICS.SECOND);
    }
    updatePacketListeners();
  } else {
    console.log('No packet data for connections in message from server');
  }
}

export const parseFiveSecondConnectionPackets = res => {
  if (res.hasOwnProperty('connections')) {
    const conns = res.connections;
    for (let i = 0; i < conns.length; ++i) {
      addPackets(conns[i], METRICS.FIVE);
    }
    updatePacketListeners();
  } else {
    console.log('No packet data for connections in message from server');
  }
}

export const parseSixtySecondConnectionPackets = res => {
  if (res.hasOwnProperty('connections')) {
    const conns = res.connections;
    for (let i = 0; i < conns.length; ++i) {
      addPackets(conns[i], METRICS.SIXTY);
    }
    updatePacketListeners();
  } else {
    console.log('No packet data for connections in message from server');
  }
}