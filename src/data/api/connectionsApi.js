import {
  addConnections,
  addPackets,
  updateConnectionListeners,
  updatePacketListeners,
  METRICS
} from "../aggregators/ConnectionAggregator";
import {baseUrlApi, headers} from "../../constants/RequestConstants";
import axios from "axios";

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

export async function fetchFiveSecondConnections() {
  const url = `${baseUrlApi}/device/connections/5s`;
  const res =  await axios.get(url, { headers })
  const connections = res.data.connections;
  for (let i = 0; i < connections.length; ++i) {
    addPackets(connections[i], METRICS.FIVE);
  }
  updatePacketListeners();
}

export async function fetchSixtySecondConnections() {
  const url = `${baseUrlApi}/device/connections/60s`;
  const res =  await axios.get(url, { headers })
  const connections = res.data.connections;
  for (let i = 0; i < connections.length; ++i) {
    addPackets(connections[i], METRICS.SIXTY);
  }
  updatePacketListeners();
}