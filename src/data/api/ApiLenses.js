'use es6';

import * as R from 'ramda';
import immLens from 'VizIoT/data/immLens';

export const callLens = immLens('call');
export const paramParser = immLens('paramParser');
export const resParser = immLens('resParser');