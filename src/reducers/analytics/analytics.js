import {
  startCoreAnalyze,
  successCoreAnalyze,
  failureCoreAnalyze,
} from '../../actions/analyzeActions';
import { createReducer } from 'redux-act';
import NetworkState from '../../constants/NetworkState';
import TimeDimension from '../../data/dimensions/TimeDimension';

const defaultState = {
  networkState: NetworkState.READY,
  values: {},
};

// const padWithZeros = (rawData, requestRecord) => {
//   // TODO pad with zeros if necessary
//   if (!rawData || true) {
//     return rawData;
//   }
//
//   const startTime = requestRecord.getStartTimeAsMoment();
//   const endTime = requestRecord.getEndTimeAsMoment();
//   const dimensions = requestRecord.getDimensions();
//   const reducer = requestRecord.getReducer();
//   const filter = requestRecord.getFilter();
//
//   const rawReport = rawData.report;
//   const rawRows = rawReport.data.rows;
//
//   const numMetrics = rawReport.columns.metrics.length;
//   const timeDimension = dimensions.some(d =>
//     Object.values(TimeDimension).includes(d)
//   );
//   const timeDimensionIndex = dimensions.indexOf(timeDimension);
//
//   const createZeroRow = (row, keepIndex) => {
//     const metrics = new Array(numMetrics).fill(0);
//     metrics[keepIndex] = row.metrics[keepIndex];
//     return {
//       ...row,
//       metrics,
//     };
//   };
//
//   if (timeDimension) {
//     const processedData = [];
//     switch (timeDimension) {
//       case TimeDimension.SECONDS:
//         const startTime = Math.floor(startTime);
//         const endTime = Math.floor(endTime);
//         for (let t = startTime; t <= endTime; t += 1) {
//           // TODO optimization here for find index
//           const foundIdx = rawRows.findIndex(({ dimensions }) => {
//             let timeDimension = dimensions[timeDimensionIndex];
//             return Math.floor(parseFloat(timeDimension)) === t;
//           });
//           if (foundIdx < 0) {
//             const zeroRow = {
//               ...createZeroRow(dimensions, timeDimensionIndex),
//               timestamp: t,
//             };
//             processedData.push(zeroRow);
//           } else {
//             processedData.push({
//               ...rawData[foundIdx],
//               timestamp: t,
//             });
//           }
//         }
//     }
//     return processedData;
//   } else {
//     return rawRows;
//   }
// };

const onSuccess = (state, { payload, requestBody }) => {
  return {
    ...state,
    networkState: NetworkState.READY,
    values: {
      ...state.values,
      [requestBody.hashCode()]: {
        config: requestBody,
        data: payload,
      }
    },
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
