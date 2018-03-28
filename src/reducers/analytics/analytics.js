import {
  startCoreAnalyze,
  successCoreAnalyze,
  failureCoreAnalyze,
} from '../../actions/analyzeActions';
import { createReducer } from 'redux-act';
import NetworkState from '../../constants/NetworkState';
import TimeDimension from '../../data/dimensions/TimeDimension';
/*
Example rawReport with time.
const reportsExample =
  {
    columns: {
      dimensions: ['SECOND'],
      metrics: ['HITS'],
    },
    data: {
      rows: [
        {
          dimensions: ['1330030030'],
          metrics: ['20'],
        },
        {
          dimensions: ['1330030031'],
          metrics: ['50'],
        },
        {
          dimensions: ['1330030032'],
          metrics: ['34'],
        }
      ],
    }
  };
*/
const defaultState = {
  networkState: NetworkState.READY,
  values: {},
};

const padWithZeros = (rawData, requestRecord) => {
  if (!rawData || !rawData.length) {
    return rawData;
  }

  const startTime = requestRecord.getStartTimeAsMoment();
  const endTime = requestRecord.getEndTimeAsMoment();
  const dimensions = requestRecord.getDimensions();
  const reducer = requestRecord.getReducer();
  const filter = requestRecord.getFilter();

  /*
  Example rawReport:
  const reportsExample =
    {
      columns: {
        dimensions: ['DOMAIN'],
        metrics: ['HITS'],
      },
      data: {
        rows: [
          {
            dimensions: ['google.com'],
            metrics: ['20'],
          },
          {
            dimensions: ['baidu.com'],
            metrics: ['50'],
          },
          {
            dimensions: ['apple.com'],
            metrics: ['34'],
          }
        ],
      }
    };
  */
  debugger;
  const rawReport = rawData.report;
  const rawRows = rawReport.data.rows;

  const numMetrics = rawReport.columns.metrics.length;
  const timeDimension = dimensions.some(d =>
    Object.values(TimeDimension).includes(d)
  );
  const timeDimensionIndex = dimensions.indexOf(timeDimension);

  const createZeroRow = (row, keepIndex) => {
    const metrics = new Array(numMetrics).fill(0);
    metrics[keepIndex] = row.metrics[keepIndex];
    return {
      ...row,
      metrics,
    };
  };

  if (timeDimension) {
    const processedData = [];
    switch (timeDimension) {
      case TimeDimension.SECONDS:
        const startTime = Math.floor(startTime);
        const endTime = Math.floor(endTime);
        for (let t = startTime; t <= endTime; t += 1) {
          // TODO optimization here for find index
          const foundIdx = rawRows.findIndex(({ dimensions }) => {
            let timeDimension = dimensions[timeDimensionIndex];
            return Math.floor(parseFloat(timeDimension)) === t;
          });
          if (foundIdx < 0) {
            const zeroRow = {
              ...createZeroRow(dimensions, timeDimensionIndex),
              timestamp: t,
            };
            processedData.push(zeroRow);
          } else {
            processedData.push({
              ...rawData[foundIdx],
              timestamp: t,
            });
          }
        }
    }
    return processedData;
  } else {
    return rawRows;
  }
};

const mergeData = (oldMapping, requestRecord, payload) => {
  // TODO merge with, instead of replace the old data
  return {
    ...oldMapping,
    [requestRecord.hashCode()]: {
      config: requestRecord,
      data: padWithZeros(payload, requestRecord),
    },
  };
};

const onSuccess = (state, { payload, requestBody }) => {
  return {
    ...state,
    networkState: NetworkState.READY,
    values: mergeData(state.values, requestBody, payload),
  };
};

const onFailure = state => {
  return {
    ...state,
    networkState: NetworkState.READY,
  };
};

const onStart = state => {
  return {
    ...state,
    networkState: NetworkState.LOADING,
  };
};

export default createReducer(
  {
    [startCoreAnalyze]: onStart,
    [successCoreAnalyze]: onSuccess,
    [failureCoreAnalyze]: onFailure,
  },
  defaultState
);
