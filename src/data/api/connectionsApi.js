import {
  addConnections,
  addPackets,
  updateConnectionListeners,
  updatePacketListeners,
  METRICS, getPackets
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

export async function fetchSecondConnections() {
  const url = `${baseUrlApi}/tcpData/connections/1s`;
  const res =  await axios.get(url, { headers })
  const connections = res.data.connections;
  connections.forEach(conn => {
    addPackets({id: conn.id, size: conn.size, time: conn.time}, METRICS.SECOND)
  })
  updatePacketListeners();
}

export async function fetchFiveSecondConnections() {
  const url = `${baseUrlApi}/tcpData/connections/5s`;
  const res =  await axios.get(url, { headers })
  const connections = res.data.connections;
  addPackets(connections, METRICS.FIVE);
  updatePacketListeners();
}

export async function fetchThirtySecondConnections() {
  const url = `${baseUrlApi}/tcpData/connections/30s`;
  const res =  await axios.get(url, { headers })
  const connections = res.data.connections;
  addPackets(connections, METRICS.THIRTY);
  updatePacketListeners();
}