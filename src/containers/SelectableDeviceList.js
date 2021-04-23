import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import BCard from '../components/BeanUILibrary/BCard';
import {fetchDeviceData} from '../data/api/devicesApi';
import { getDevices } from '../data/aggregators/DeviceAggregator';
import {FixedTitle} from './ConnectionTableRows/ColumnStyles';
import {AllDevicesRow} from './DeviceTableRows/AllDevicesRow';
import {SingleDeviceRow} from './DeviceTableRows/SingleDeviceRow';
import {useForceUpdate} from '../components/BeanUILibrary/hooks/useForceUpdate';

// top level
const ConnectionCard = styled(BCard)`
  overflow-y: scroll;
`
export const SelectableDeviceList = ({
                                  deviceSelector,
                                  height
                                }) => {
  const [devices, setDevices] = useState({})
  const [allDevices, setAllDevices] = useState(true)
  const [forceVal, setForceVal] = useState({})

  // create a useEffect with empty dependences so it only runs on mount
  useEffect (() => {

    const portDevices = (devices) => {

      const selectableDevices = {}

      Object.keys(devices).forEach(key => {
        selectableDevices[key] = {
          macAddress: devices[key].macAddress,
          name: devices[key].name,
          selected: true,
          setSelected: () => {selectableDevices[key].selected = !selectableDevices[key].selected;
                              setForceVal({})}
        }
      })

      return selectableDevices
    }

    fetchDeviceData()
      .then(e => setDevices(portDevices(getDevices())))
      .catch(e => console.log('error fetching devices'));
  }, [])

  const checkAllDevicesSet = (isAllEnabled) => {

    if (isAllEnabled === true) {
      Object.keys(devices).forEach(key => {
        devices[key].selected = true;
      })
    }

    setAllDevices(isAllEnabled)
  }

  // console.log(devices)
  console.log(allDevices)

  return <div style={{height:height, width:'100%'}}>
    <FixedTitle title='Devices' style={{height:'5%', textAlign:'center'}}/>
    <ConnectionCard style={{height: '95%'}}>
      <AllDevicesRow isEnabled={allDevices} setEnabled={checkAllDevicesSet}/>
      <div style={{paddingTop:'4px'}}/>
      {Object.keys(devices).map(key => {
        return <SingleDeviceRow
          isEnabled={devices[key].selected}
          setEnabled={devices[key].setSelected}
          name={devices[key].name} />
      })}
    </ConnectionCard>
  </div>

}

SelectableDeviceList.propTypes = {
  deviceSelector: PropTypes.func.isRequired,
  height: PropTypes.number.isRequired
}