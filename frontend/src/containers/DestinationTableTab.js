import React from 'react';
import {
  pushRealTimeDestinationMetricTraffic,
  pushRealTimeDestinationTraffic
} from '../actions/packetActions';
import {
  selectRealTimeDestinationMetricTraffic,
  selectRealTimeDestinationTraffic
} from '../selectors/packetSelector';
import {DestinationCount, DestinationMetric, DeviceDataDestination} from '../socket/subscribe';
import LineGraphPage from './LineGraphPage';
import {resourceFactory} from '../Factories/ResourceFactory';
import {factFactory} from '../Factories/FactFactory';
import {parseDeviceIO, parseDeviceDestination} from '../data/api/packetApi';
import {fetcherFactory} from '../Factories/FetcherFactory';
import {fetchDeviceData} from '../data/api/devicesApi';
import {getDevices} from '../data/aggregators/DeviceAggregator';
import {getDeviceDestinationData} from '../data/aggregators/DeviceDataDestinationAggregator';


//export const DestinationTableTab = ({combinedNetworkDevice, mainChartConfig}) => {
  export const DestinationTableTab = ({}) => {

  const countriesAssumed = ['US','UK','CN','others']


  const tcpFact = factFactory(countriesAssumed[0], 'white', true);
  const udpFact = factFactory(countriesAssumed[1], '#03cbac', true);
  const httpFact = factFactory(countriesAssumed[2], '#d9b409', true);
  const dnsFact = factFactory(countriesAssumed[3], 'red', true);

  const facts = [tcpFact, udpFact, httpFact, dnsFact]

  const resources = resourceFactory(DestinationCount, selectRealTimeDestinationTraffic, pushRealTimeDestinationTraffic)
  const metricResources = resourceFactory(DestinationMetric, selectRealTimeDestinationMetricTraffic, pushRealTimeDestinationMetricTraffic)
  const individualGraphResources = resourceFactory(DeviceDataDestination, getDeviceDestinationData, parseDeviceDestination)
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
      />);


};

