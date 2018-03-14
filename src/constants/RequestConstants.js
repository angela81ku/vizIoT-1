const HOSTS = {
  DEV: 'http://54.193.126.147:3000',
  DEV_HEROKU: 'https://moniotr-smart-router-server.herokuapp.com',
  PROD: 'http://54.193.126.147:3000',
  MOCK: 'https://7f1bae45-6a9e-45db-a423-d83426b2d13f.mock.pstmn.io',
};
export const baseUrl = HOSTS.DEV_HEROKU;

export const defaultNetwork = '42';

export const headers = {
  'Access-Control-Allow-Origin': '*',
};
