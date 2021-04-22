import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import BCard from '../components/BeanUILibrary/BCard';
import {useSocket} from '../components/BeanUILibrary/hooks/useSocket';
import {
  DeviceConnectionPackets1s,
} from '../socket/subscribe';
import {
  addConnectionListener,
  addPacketListener,
  removeConnectionListener, removePacketListener
} from '../data/aggregators/ConnectionAggregator';
import {BlankRow} from './ConnectionTableRows/BlankRow';
import {TableHeader} from './ConnectionTableRows/TableHeader';
import {TableRow} from './ConnectionTableRows/TableRow';
import {fetchDeviceData} from '../data/api/devicesApi';
import { getDevices } from '../data/aggregators/DeviceAggregator';
import {useDimensions} from '../components/BeanUILibrary/hooks/useDimensions';
import {FixedTitle} from "./ConnectionTableRows/ColumnStyles";
import {AllDevicesRow} from "./DeviceTableRows/AllDevicesRow";

// top level
const ConnectionCard = styled(BCard)`
  overflow-y: scroll;
`
export const SelectableDeviceList = ({
                                  deviceSelector
                                }) => {
  const [devices, setDevices] = useState({})

  // create a useEffect with empty dependences so it only runs on mount
  useEffect (() => {

    const portDevices = (devices) => {

      const selectableDevices = {}

      Object.keys(devices).forEach(key => {
        selectableDevices[key] = {
          macAddress: devices[key].macAddress,
          name: devices[key].name,
          selected: true,
        }
      })

      return selectableDevices
    }

    fetchDeviceData()
      .then(e => setDevices(portDevices(getDevices())))
      .catch(e => console.log('error fetching devices'));
  }, [])

  console.log(devices)

  return <div>
    <FixedTitle title='Devices' style={{height:'5%', textAlign:'center'}}/>
    <ConnectionCard style={{height: '95%'}}>
      <AllDevicesRow/>
    </ConnectionCard>
  </div>

}

SelectableDeviceList.propTypes = {
  deviceSelector: PropTypes.func
}