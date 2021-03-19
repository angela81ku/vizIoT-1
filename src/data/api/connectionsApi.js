import {addConnections} from "../aggregators/ConnectionAggregator";

export const parseConnections = res => {
  if (res.hasOwnProperty('connections')) {
    const connections = res.connections;
    addConnections(connections);
  } else {
    console.log('No connection data in message from server')
  }
}