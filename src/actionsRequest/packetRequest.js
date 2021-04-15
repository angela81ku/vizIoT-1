'use es6';

import {createGenericRequester} from '../actions/requestStatusActionFactory';
import {packetApi, packetApiKeys} from '../data/api/packetApi';
import {
  pushIndividualSizeToday,
  recentsActionBundle,
} from '../actions/packetActions';
import {ByDeviceSizeRoomToday} from 'VizIoT/socket/subscribe';

export const requestRecentPackets = createGenericRequester(
  recentsActionBundle,
  packetApi[packetApiKeys.PACKET]
);
