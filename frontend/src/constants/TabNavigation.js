'use es6';

import keyMirror from 'keymirror';

export const tabKeys = keyMirror({
  // LOGGER: null,
  OVERVIEW: null,
  DEVICES: null,
  // TIME: null,
  // DESTINATIONS: null,
  INOUT: null,
  PROTOCOL: null,
  CONNECTION_TABLE: null,
});

export const Tabs = {
  // [tabKeys.LOGGER]: {
  //   key: tabKeys.LOGGER,
  //   title: 'Logger',
  //   path: '/logger',
  // },
  [tabKeys.OVERVIEW]: {
    key: tabKeys.OVERVIEW,
    title: 'Overview',
    path: '/overview',
  },
  [tabKeys.DEVICES]: {
    key: tabKeys.DEVICES,
    title: 'Devices',
    path: '/devices',
  },
  // [tabKeys.TIME]: {
  //   key: tabKeys.TIME,
  //   title: 'Time',
  //   path: '/time',
  // },
  // [tabKeys.DESTINATIONS]: {
  //   key: tabKeys.DESTINATIONS,
  //   title: 'Destinations',
  //   path: '/destinations',
  // },
  [tabKeys.INOUT]: {
    key: tabKeys.INOUT,
    title: 'Sent/Received',
    path: '/sentreceived'
  },
  [tabKeys.PROTOCOL]: {
    key: tabKeys.PROTOCOL,
    title: 'Protocol',
    path: '/protocol'
  },
  [tabKeys.CONNECTION_TABLE]: {
    key: tabKeys.CONNECTION_TABLE,
    title: 'Connections',
    path: '/connection'
  }
};

export const getTabByPath = path => {
  const key = Object.keys(tabKeys).filter(k => Tabs[k].path === path);
  return Tabs[key];
};

const tabOrder = [tabKeys.OVERVIEW, tabKeys.DEVICES, tabKeys.GEOGRAPHY];
