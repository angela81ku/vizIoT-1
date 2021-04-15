import React from 'react';
import {pushRealTimeIOTraffic, pushRealTimeIOMetricTraffic} from '../actions/packetActions';
import {selectRealTimeIOTraffic, selectRealTimeIOMetricTraffic} from '../selectors/packetSelector';
import {IOCount, IOMetric, DeviceDataIO} from '../socket/subscribe';
import LineGraphPage from './LineGraphPage';
import {factFactory} from '../Factories/FactFactory';
import {resourceFactory} from '../Factories/ResourceFactory';
import {getDeviceIOData} from "../data/aggregators/TopThreeIOAggregator";
import {parseDeviceIO} from "../data/api/packetApi";
import {fetcherFactory} from "../Factories/FetcherFactory";
import {fetchDeviceData} from "../data/api/devicesApi";
import {getDevices} from "../data/aggregators/DeviceAggregator";


export const SentReceivedTab = ({}) => {

  const totalFact = factFactory('Total', 'white', false);
  const receivedFact = factFactory('Received', '#03cbac', true);
  const sentFact = factFactory('Sent', '#d9b409', true);

  // const facts = [totalFact, receivedFact, sentFact]
  const facts = [totalFact, sentFact, receivedFact]

  const graphResources = resourceFactory(IOCount, selectRealTimeIOTraffic, pushRealTimeIOTraffic)
  const metricResources = resourceFactory(IOMetric, selectRealTimeIOMetricTraffic, pushRealTimeIOMetricTraffic)
  const individualGraphResources = resourceFactory(DeviceDataIO, getDeviceIOData, parseDeviceIO)
  const deviceFetcher = fetcherFactory(fetchDeviceData, getDevices, 15000)

  const cardSymbols = ['box', 'arrow-alt-circle-up', 'arrow-alt-circle-down']

  // console.log(individualGraphResources)

  // TODO: Debug overrides -- without specifying overrides, sockets are being called twice after ~6 packet collections
  return (
    <LineGraphPage
      graphResource={graphResources}
      graphSocketOverride={true}
      metricResource={metricResources}
      metricSocketOverride={true}
      individualGraphResource={individualGraphResources}
      individualGraphSize='device-medium-chart'
      individualDeviceFetcher={deviceFetcher}
      cardSymbols={cardSymbols}
      facts={facts}
      pageTitle={'Sent/Received Traffic'}
      pageSubtitle={'View network sent/received traffic in real time'}
      graphTitle={'Network Traffic'}
      chartTitle={'Network'}
      chartSubtitle={'BYTES / SEC'}
      legendTitle={'Total sent/received traffic over last 60 seconds'}
    />
  )
}