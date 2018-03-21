const HOSTS = {
  DEV: 'http://54.193.126.147:3000',
  DEV_HEROKU: 'https://moniotr-smart-router-server.herokuapp.com',
  PROD: 'http://54.193.126.147:3000',
  MOCK: 'https://c4bfb248-a02b-4dce-a75a-8529b5e9d2f4.mock.pstmn.io',
};
export const baseUrl = HOSTS.DEV_HEROKU;

export const defaultNetwork = '42';

export const headers = {
  'Access-Control-Allow-Origin': '*',
};
