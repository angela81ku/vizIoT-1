// import React from 'react';
// import {
//   pushRealTimeDestinationMetricTraffic,
//   pushRealTimeDestinationTraffic
// } from '../actions/packetActions';
// import {
//   selectRealTimeDestinationMetricTraffic,
//   selectRealTimeDestinationTraffic
// } from '../selectors/packetSelector';
// import {DestinationCount, DestinationMetric, DeviceDataDestination} from '../socket/subscribe';
// import LineGraphPage from './LineGraphPage';
// import {resourceFactory} from '../Factories/ResourceFactory';
// import {factFactory} from '../Factories/FactFactory';
// import {parseDeviceIO, parseDeviceDestination} from '../data/api/packetApi';
// import {fetcherFactory} from '../Factories/FetcherFactory';
// import {fetchDeviceData} from '../data/api/devicesApi';
// import {getDevices} from '../data/aggregators/DeviceAggregator';
// import {getDeviceDestinationData} from '../data/aggregators/DeviceDataDestinationAggregator';
//
//
// //export const DestinationTableTab = ({combinedNetworkDevice, mainChartConfig}) => {
//   export const DestinationTableTab = ({}) => {
//
//   const countriesAssumed = ['US','UK','CN','others']
//
//
//   const vol1stFact = factFactory(countriesAssumed[0], 'white', true);
//   const vol2ndFact = factFactory(countriesAssumed[1], '#03cbac', true);
//   const vol3rdFact = factFactory(countriesAssumed[2], '#d9b409', true);
//   const otherFact = factFactory(countriesAssumed[3], 'red', true);
//
//   const facts = [vol1stFact, vol2ndFact, vol3rdFact, otherFact]
//
//   const resources = resourceFactory(DestinationCount, selectRealTimeDestinationTraffic, pushRealTimeDestinationTraffic)
//   const metricResources = resourceFactory(DestinationMetric, selectRealTimeDestinationMetricTraffic, pushRealTimeDestinationMetricTraffic)
//   const individualGraphResources = resourceFactory(DeviceDataDestination, getDeviceDestinationData, parseDeviceDestination)
//   const deviceFetcher = fetcherFactory(fetchDeviceData, getDevices, 15000)
//
//   resources.inUse = true;
//   return (
//       <LineGraphPage
//           graphResource={resources}
//           graphSocketOverride={true}
//           metricResource={metricResources}
//           metricSocketOverride={true}
//           individualGraphResource={individualGraphResources}
//           individualGraphSize='device-large-chart'
//           individualDeviceFetcher={deviceFetcher}
//           facts={facts}
//           pageTitle={'Destination View'}
//           pageSubtitle={'View destination by device connection'}
//           graphTitle={'Network Traffic'}
//           chartTitle={'Network'}
//           chartSubtitle={'BYTES / SEC'}
//           legendTitle={'-'}
//       />);
//
//
// };



import React from 'react';
import {
  pushRealTimeProtocolMetricTraffic,
  pushRealTimeProtocolTraffic
} from '../actions/packetActions';
import {
  selectRealTimeProtocolMetricTraffic,
  selectRealTimeProtocolTraffic
} from '../selectors/packetSelector';
import {IOMetric, ProtocolCount, ProtocolMetric, DeviceDataIO, DeviceDataProtocol} from '../socket/subscribe';
import LineGraphPage from './LineGraphPage';
import {resourceFactory} from '../Factories/ResourceFactory';
import {factFactory} from '../Factories/FactFactory';
import {getDeviceIOData} from '../data/aggregators/DeviceDataIOAggregator';
import {parseDeviceIO, parseDeviceProtocol} from '../data/api/packetApi';
import {fetcherFactory} from '../Factories/FetcherFactory';
import {fetchDeviceData} from '../data/api/devicesApi';
import {getDevices} from '../data/aggregators/DeviceAggregator';
import {getDeviceProtocolData} from '../data/aggregators/DeviceDataProtocolAggregator';


export const DestinationTableTab = ({}) => {

  const countriesAssumed = ['CN','HK','CA','others']
  const vol1stFact = factFactory(countriesAssumed[0], '#03cbac', true);
  const vol2ndFact = factFactory(countriesAssumed[1], 'pink', true);
  const vol3rdFact = factFactory(countriesAssumed[2], 'red', true);
  const otherFact = factFactory(countriesAssumed[3], '#d9b409', true);

  const facts = [vol1stFact, vol2ndFact, vol3rdFact, otherFact]

  const resources = resourceFactory(ProtocolCount, selectRealTimeProtocolTraffic, pushRealTimeProtocolTraffic)
  const metricResources = resourceFactory(ProtocolMetric, selectRealTimeProtocolMetricTraffic, pushRealTimeProtocolMetricTraffic)
  const individualGraphResources = resourceFactory(DeviceDataProtocol, getDeviceProtocolData, parseDeviceProtocol)
  const deviceFetcher = fetcherFactory(fetchDeviceData, getDevices, 15000)

  resources.inUse = true;

  return (

      <LineGraphPage
          graphResource={resources}
          graphSocketOverride={true}
          metricResource={metricResources}
          metricSocketOverride={true}
          individualGraphResource={individualGraphResources}
          individualGraphSize='device-large-chart'
          individualDeviceFetcher={deviceFetcher}
          facts={facts}
          pageTitle={'Destination View'}
          pageSubtitle={'View destination by device connection'}
          graphTitle={'Network Traffic'}
          chartTitle={'Network'}
          chartSubtitle={'BYTES / SEC'}
          legendTitle={'-'}
      />
  )
}

//
// import React from 'react';
// import {
//   pushRealTimeProtocolMetricTraffic,
//   pushRealTimeProtocolTraffic
// } from '../actions/packetActions';
// import {
//   selectRealTimeProtocolMetricTraffic,
//   selectRealTimeProtocolTraffic
// } from '../selectors/packetSelector';
// import {IOMetric, ProtocolCount, ProtocolMetric, DeviceDataIO, DeviceDataProtocol} from '../socket/subscribe';
// import LineGraphPage from './LineGraphPage';
// import {resourceFactory} from '../Factories/ResourceFactory';
// import {factFactory} from '../Factories/FactFactory';
// import {getDeviceIOData} from '../data/aggregators/DeviceDataIOAggregator';
// import {parseDeviceIO, parseDeviceProtocol} from '../data/api/packetApi';
// import {fetcherFactory} from '../Factories/FetcherFactory';
// import {fetchDeviceData} from '../data/api/devicesApi';
// import {getDevices} from '../data/aggregators/DeviceAggregator';
// import {getDeviceProtocolData} from '../data/aggregators/DeviceDataProtocolAggregator';
//
//
// export const DestinationTableTab = ({}) => {
//
//     const countriesAssumed = ['CN','HK','CA','others']
//   const vol1stFact = factFactory(countriesAssumed[0], '#03cbac', true);
//   const vol2ndFact = factFactory(countriesAssumed[1], 'white', true);
//   const vol3rdFact = factFactory(countriesAssumed[2], 'red', true);
//   const otherFact = factFactory(countriesAssumed[3], '#d9b409', true);
//
//   const facts = [vol1stFact, vol2ndFact, vol3rdFact, otherFact]
//
//   const resources = resourceFactory(ProtocolCount, selectRealTimeProtocolTraffic, pushRealTimeProtocolTraffic)
//   const metricResources = resourceFactory(ProtocolMetric, selectRealTimeProtocolMetricTraffic, pushRealTimeProtocolMetricTraffic)
//   const individualGraphResources = resourceFactory(DeviceDataProtocol, getDeviceProtocolData, parseDeviceProtocol)
//   const deviceFetcher = fetcherFactory(fetchDeviceData, getDevices, 15000)
//
//   resources.inUse = true;
//
//   return (
//       <LineGraphPage
//                     graphResource={resources}
//                     graphSocketOverride={true}
//                     metricResource={metricResources}
//                     metricSocketOverride={true}
//                     individualGraphResource={individualGraphResources}
//                     individualGraphSize='device-large-chart'
//                     individualDeviceFetcher={deviceFetcher}
//                     facts={facts}
//                     pageTitle={'Destination View'}
//                     pageSubtitle={'View destination by device connection'}
//                     graphTitle={'Network Traffic'}
//                     chartTitle={'Network'}
//                     chartSubtitle={'BYTES / SEC'}
//                     legendTitle={'-'}
//       />
//   )
// }