'use es6';

import keyMirror from 'keymirror';

export const DateConstants = keyMirror({
  NOW: null,
  TODAY: null,
  YESTERDAY: null,
  N_SECONDS_AGO: null,
  N_DAYS_AGO: null,
  DATE: null,
});

export const DateToRegex = {
  N_DAYS_AGO: /^([0-9]+)daysAgo$/,
  N_SECONDS_AGO: /^([0-9]+)secondsAgo$/,
  DATE: /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/,
};
