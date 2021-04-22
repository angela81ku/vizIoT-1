import React, {useState} from 'react';
import PropTypes from 'prop-types';

import SolidRow from "../../components/BeanUILibrary/SolidRow";
import TabColumn from "../../components/BeanUILibrary/TabColumn";
import BIcon from "../../components/BeanUILibrary/BIcon";
import {
  BorderedSolidRow,
} from '../ConnectionTableRows/ColumnStyles';
import styled from 'styled-components';
import SectionSubtitle from '../../components/SectionSubtitle';

const DeviceHeader = styled.h5`
  font-weight:600;
  display: flex;
  align-items: center;
  margin-bottom: 0;
`

export const AllDevicesRow = ({}) => {

  return <BorderedSolidRow height={'30px'} style={{width:'100%',
                                                   display:'inline-flex',
                                                   gridTemplateColumns:'10% 90%',
                                                   gridColumnGap:'10px',
                                                   verticalAlign:'middle',
                                                   justifyContent:'start',
                                                   paddingLeft:'5%'}}>
    <input type='checkbox' />
    <DeviceHeader>All</DeviceHeader>
  </BorderedSolidRow>
}