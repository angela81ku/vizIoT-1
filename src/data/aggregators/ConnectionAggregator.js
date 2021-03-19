let connections = [];

export const addConnections = (connectionArray) => {
  connections = connectionArray;
}

export const getConnections = () => {
  //return all collected devices
  return connections;
}
