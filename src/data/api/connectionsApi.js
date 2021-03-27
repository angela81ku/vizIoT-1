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
  const url = `${baseUrlApi}/device/connections/1s`;
  const res =  await axios.get(url, { headers })
  const connections = res.data.connections;
  Object.keys(connections).forEach(conn => {
    const data = connections[conn];
    for (let i = 0; i < data.length; ++i) {
      const d = data[i];
      addPackets({id: conn, size: d.size, time: d.time}, METRICS.SECOND)
    }
  })
  updatePacketListeners();
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