'use es6';

import { createGenericRequester } from 'VizIoT/actions/requestStatusActionFactory';
import { packetApi, packetApiKeys } from 'VizIoT/data/api/packetApi';
import { recentsActionBundle } from 'VizIoT/actions/packetActions';

export const requestRecentPackets = createGenericRequester(
  recentsActionBundle,
  packetApi[packetApiKeys.PACKET]
);
