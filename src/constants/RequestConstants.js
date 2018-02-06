import { URL } from 'url';

const HOSTS = {
  DEV: 'http://54.193.126.147:3000',
  PROD: 'http://54.193.126.147:3000',
  MOCK: 'https://8810cdde-2c17-48ed-b323-505b1dfdcf82.mock.pstmn.io'
}

const IP = HOSTS.MOCK;

export const API = {
  fetchDevices: () => (`${IP}/api/devices`),
  aggregateSimple: (macAddress) => (`${IP}/api/devices/${macAddress}/aggregateSimple`),


}