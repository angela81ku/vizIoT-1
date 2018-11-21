'use es6';

import { buildGenericRequester } from 'VizIoT/actions/requestStatusActionFactory';
import { packetApi, packetApiKeys } from 'VizIoT/data/api/packetApi';
import { recentsActionBundle } from 'VizIoT/actions/packetActions';

export const requestRecentPackets = buildGenericRequester(
  recentsActionBundle,
  packetApi[packetApiKeys.PACKET]
);
