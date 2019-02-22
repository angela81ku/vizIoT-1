'use es6';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { selectDeviceList } from 'VizIoT/selectors/deviceSelectors';
import SectionSubtitle from '../components/SectionSubtitle';
import SectionTitle from 'VizIoT/components/SectionTitle';
import { fetchDevices } from 'VizIoT/actionsRequest/deviceRequest';
import { selectDataForAllDevices } from 'VizIoT/selectors/analyticsSelector';
import DeviceCollection from 'VizIoT/components/device/DeviceCollection';
import BTextInput from 'UIBean/BTextInput';
import BCheckBox from 'VizIoT/components/BCheckBox';

const TitleContainer = styled.div`
  
`;

const PageBackground = styled.div`
  // background-image: linear-gradient(rgb(24, 23, 60) 3%, rgb(7, 92, 142));
  min-height: 700px; // page min height
  height: 100vh;
  overflow-y: scroll;
  
  // @keyframes example {
  //   0% {transform: translateY(-10px);}
  //   100% {transform: translateY(+10px);}
  // }
`;

const PageContent = styled.div`
  padding-top: 45px;
  padding-left: 7%;
  padding-right: 7%;
`;


class DeviceOverview extends Component {
  componentWillMount() {
    fetchDevices();
  }

  render() {
    const { devices, deviceToData } = this.props;
    return (
      <PageBackground>
        <PageContent>
          <TitleContainer className="m-tb-10">
            <SectionTitle title="Devices" size="lg" cardPadding={false} />
            <SectionSubtitle text="Explore and analyze your device activities" margins={true} />
          </TitleContainer>
          <BTextInput
            placeholder="Search 'fridge' or 'sensor'"
            onChange={e => { console.log(e.target.value) }}
            inline
          />
          <BCheckBox title={'Map'} inline />
          <DeviceCollection mode={'LIST'} devices={devices} deviceToData={deviceToData} />
        </PageContent>
      </PageBackground>
    );
  }
}

DeviceOverview.propTypes = {
  devices: PropTypes.array.isRequired,
  deviceToData: PropTypes.objectOf({
    velocity: PropTypes.number,
    total: PropTypes.number,
  }),
};

export default connect(state => {
  return ({
    devices: selectDeviceList(state) || [],
    deviceToData: selectDataForAllDevices(state),
  });
})(DeviceOverview);
