'use es6';

import keyMirror from 'keymirror';

export const tabKeys = keyMirror({
  LOGGER: null,
  OVERVIEW: null,
  DEVICES: null,
  TIME: null,
  DESTINATIONS: null,
});

export const Tabs = {
  [tabKeys.LOGGER]: {
    key: tabKeys.LOGGER,
    title: 'Logger',
    path: '/logger',
    background: '',
  },
  [tabKeys.OVERVIEW]: {
    key: tabKeys.OVERVIEW,
    title: 'Overview',
    path: '/overview',
    background: '',
  },
  [tabKeys.DEVICES]: {
    key: tabKeys.DEVICES,
    title: 'Devices',
    path: '/devices',
    background: '',
  },
  [tabKeys.TIME]: {
    key: tabKeys.TIME,
    title: 'Time',
    path: '/time',
    background: '',
  },
  [tabKeys.DESTINATIONS]: {
    key: tabKeys.DESTINATIONS,
    title: 'Destinations',
    path: '/destinations',
    background: 'location-bubble-tab-background',
  },
};

const tabOrder = [tabKeys.OVERVIEW, tabKeys.DEVICES, tabKeys.GEOGRAPHY];
