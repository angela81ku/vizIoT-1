'use es6';

import { createGenericRequester } from 'VizIoT/actions/requestStatusActionFactory';
import { packetApi, packetApiKeys } from 'VizIoT/data/api/packetApi';
import {
  pushIndividualSizeToday,
  recentsActionBundle,
} from 'VizIoT/actions/packetActions';
import { ByDeviceSizeRoomToday } from 'VizIoT/socket/subscribe';

export const streamPacketsTodayByDevice = socket => {
  socket.on(ByDeviceSizeRoomToday, pushIndividualSizeToday);
};

export const requestRecentPackets = createGenericRequester(
  recentsActionBundle,
  packetApi[packetApiKeys.PACKET]
);
