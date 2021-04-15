'use es6';

import {Record} from 'immutable';
import DataReducerTypes from '../../constants/DataReducerTypes';
import {convertStringDateToMoment} from '../../utility/TimeUtility';
import _ from 'lodash';
import hash from 'object-hash';

export default class AnalyticsRequest extends Record(
  {
    dimensions: [],
    metrics: [],
    reducer: DataReducerTypes.INDIVIDUAL,
    startTime: '',
    endTime: '',
  },
  'AnalyticsRequest'
) {
  equals(other) {
    return (
      other &&
      _.isEqual(this.dimensions.sort(), other.dimensions.sort()) &&
      _.isEqual(this.metrics.sort(), other.metrics.sort()) &&
      _.isEqual(this.reducer, other.reducer) &&
      _.isEqual(this.startTime, this.startTime) &&
      _.isEqual(this.endTime, this.endTime)
    );
  }

  hashCode() {
    return hash(this.toJS());
  }

  getStartTime() {
    return this.startTime;
  }

  getStartTimeAsMoment() {
    return convertStringDateToMoment(this.getStartTime());
  }

  getEndTime() {
    return this.endTime;
  }

  getEndTimeAsMoment() {
    return convertStringDateToMoment(this.getEndTime());
  }

  getDimensions() {
    return this.dimensions;
  }
}
