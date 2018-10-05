'use es6';

import keyMirror from 'keymirror';

export const tabKeys = keyMirror({
  LOGGER: null,
  OVERVIEW: null,
  DEVICES: null,
  TIME: null,
  GEOGRAPHY: null,
});

export const Tabs = {
  [tabKeys.LOGGER]: {
    key: tabKeys.LOGGER,
    title: 'LOGGER',
    path: '/logger',
    background: '',
  },
  [tabKeys.OVERVIEW]: {
    key: tabKeys.OVERVIEW,
    title: 'OVERVIEW',
    path: '/overview',
    background: '',
  },
  [tabKeys.DEVICES]: {
    key: tabKeys.DEVICES,
    title: 'DEVICES',
    path: '/devices',
    background: '',
  },
  [tabKeys.TIME]: {
    key: tabKeys.TIME,
    title: 'TIME',
    path: '/time',
    background: '',
  },
  [tabKeys.GEOGRAPHY]: {
    key: tabKeys.GEOGRAPHY,
    title: 'GEOGRAPHY',
    path: '/geography',
    background: 'location-bubble-tab-background',
  },
};

const tabOrder = [tabKeys.OVERVIEW, tabKeys.DEVICES, tabKeys.GEOGRAPHY];
