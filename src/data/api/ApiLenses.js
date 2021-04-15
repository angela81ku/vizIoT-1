'use es6';

import immLens from 'VizIoT/data/immLens';
import {view} from 'ramda';

export const callLens = immLens('call');
export const getCall = view(callLens);

export const paramParser = immLens('paramParser');
export const getParamParser = view(paramParser);

export const resParser = immLens('resParser');
export const getResParser = view(resParser);
