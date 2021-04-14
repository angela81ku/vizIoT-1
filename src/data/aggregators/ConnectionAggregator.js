
/*
Note, in all arrays of length 2, index 0 is SENT, index 1 is RECEIVED
{
  one: [[sent, received]]
  metric1: [sent, received], <- 5 seconds
  metric2: [sent, received]  <- 30 seconds
}
 */
const packets = {};
let connections = [];

let packetListeners = [];
let connectionListeners = [];

export const METRICS = {
  SECOND: 0,
  FIVE: 1,
  THIRTY: 2,
}

export const addConnections = (connectionArray) => {
  connections = connectionArray;
}

export const getConnections = () => {
  //return all collected devices
  return connections;
}

export const addPackets = (packet, metric) => {
  // check for 1 sec stream
  // console.log(packet)
  switch (metric) {
    case (METRICS.SECOND): {
      if (packets.hasOwnProperty(packet.id)) {
        // get object with array for connection
        const packetObj = packets[packet.id];
        // get array for one second
        let packetArr = packetObj.one;
        // if new packet is the newest packet in the array, push to the back
        if (packetArr.length === 0 || packet.time > packetArr[packetArr.length - 1].time) {
          packetArr.push({
            size: packet.size,
            time: packet.time,
          });
        }
        // otherwise binsearch, and slice new array around the position
        else {
          const pos = binSearch(packetArr.map(x => x.time), packet.time);
          packetArr.splice(pos, 0, {size: packet.size, time: packet.time})
        }

        // limit the packets held to 75, since no viz requires more than a minute of data
        if (packetArr.length > 75) {
          packetArr = packetArr.slice(-75)
        }
        packets[packet.id]['one'] = packetArr;
      } else {
        packets[packet.id] = makeInitialPacket([{size: packet.size, time: packet.time}], undefined, undefined);
      }
      break;
    }
      // check for 5 sec stream
    case (METRICS.FIVE): {
      const idSet = new Set();
      for (let i = 0; i < packet.length; ++i) {
        const p = packet[i];
        if (packets.hasOwnProperty(p.id)) {
          packets[p.id]['metric1'] = p.size;
        } else {
          packets[p.id] = makeInitialPacket([], p.size, undefined);
        }
        idSet.add(p.id)
      }

      Object.keys(packets).forEach(key => {
        if (!idSet.has(key)) {
          packets[key].metric1 = [0, 0];
        }
      })

      break;
    }

      // check for 30 sec stream
    case (METRICS.THIRTY): {
      const idSet = new Set();
      for (let i = 0; i < packet.length; ++i) {
        const p = packet[i]
        if (packets.hasOwnProperty(p.id)) {
          packets[p.id]['metric2'] = p.size;
        } else {
          packets[p.id] = makeInitialPacket([], undefined, p.size);
        }
        idSet.add(p.id)
      }

      Object.keys(packets).forEach(key => {
        if (!idSet.has(key)) {
          packets[key].metric2 = [0, 0];
        }
      })
      break;
    }
  }
}

const makeInitialPacket = (second, metric1, metric2) => {
  return {
    one: second,
    metric1: metric1,
    metric2: metric2,
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

// recursive bin search since there isn't one built into javascript................
// iterative b/c I don't abuse the stack like that
const binSearch = (arr, val) => {

  let hi = arr.length - 1;
  let lo = 0;

  while (lo < hi) {
    let mid = Math.floor((hi + lo) / 2);
    const curr = arr[mid];
    if (curr === val) {
      return mid;
    }
    else if (curr < val) {
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }

  return lo;

}
