'use es6';

import * as R from 'ramda';
import { mapped } from 'ramda-lens'
import immLens from 'VizIoT/data/immLens';

export const devices = immLens('devices');
export const name = immLens('name');
export const nameList = R.compose(name, mapped, devices);
