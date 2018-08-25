'use es6';

import React from 'react';
import PropTypes from 'prop-types';

import Flex from 'UIBean/Flex';
import TimedSwitcher from 'UIBean/TimedSwitcher';
import styled from 'styled-components';
import BCard from 'UIBean/BCard';
import SectionTitle from 'VizIoT/components/SectionTitle';
import DeviceList from 'VizIoT/components/DeviceList';
import ActivityFeed from 'VizIoT/components/ActivityFeed';
import connect from 'react-redux/es/connect/connect';
import { selectDeviceList, selectLastSeen, selectNumberOfConnections } from 'VizIoT/selectors/deviceSelectors';
import { selectMostRecentDomains } from 'VizIoT/selectors/analyticsSelector';
import BIcon from 'UIBean/BIcon';
import { CARD_COLOR, LIGHTER_COLOR, LIGHTER_COLOR_TRANS } from 'VizIoT/styles/base/viz-theme';

const FixedSidebarWrapper = styled.section`
  position: fixed;
  left: 0;
  top: 0;
  width: 350px;
  height: 100vh;
  overflow-y: scroll;
  padding: 0.5rem;

  @media (max-width: 1200px) {
    display: none;
  }
  z-index: 1;
  
  transform: ${({ hide }) => hide ? 'translateX(-350px)' : 'translateX(0)' };
  opacity: ${({ hide }) => hide ? '0' : '1' };
  transition: opacity 1.5s, transform 2s;
  // transition-timing-function: ease-in-out;
`;

const FullHeightBCard = styled(BCard)`
  height: 100%;
  background: rgba(8, 22, 39, 0.4) !important;
  border-radius: 2rem;
  border: 2px solid #1f385685;
`;

const HideBtn = styled.button`
  display: inline-block;
  width: fit-content;
  padding: 6px;
  margin-left: auto;
 
  background: ${CARD_COLOR};
  color: white;
  border: none;
  border-radius: 50%;
  
  &:hover {
    background: ${LIGHTER_COLOR_TRANS};
  }
  
  &:active {
    background: ${LIGHTER_COLOR};
  }
`;

const Sidebar = ({
                   hide,
                   devices,
                   deviceToNumConnection,
                   lastSeen,
                   mostRecentHosts,
                   onSwitch,
                   onClickHide,
                 }) => {

  const deviceList = (
    <div>
      <SectionTitle title="TODAY'S DEVICES" />
      <DeviceList
        devices={devices}
        deviceToNumConnection={deviceToNumConnection}
        lastSeen={lastSeen}
      />
    </div>
  );

  const hostList = (
    <div>
      <SectionTitle title="LATEST ACTIVITY" />
      <ActivityFeed hosts={mostRecentHosts} />
    </div>
  );

  return (
    <FixedSidebarWrapper hide={hide}>
      <FullHeightBCard noShadow={true} noPadding={false}>
        <HideBtn type="button" onClick={_.over([onClickHide, ])}><BIcon name={'chevron_left'} size={26} weight={600}/></HideBtn>
        <Flex>
          <TimedSwitcher
            options={[
              { value: hostList, delay: 3500000 },
              { value: deviceList, delay: 7000 },
            ]}
          />
        </Flex>
      </FullHeightBCard>
    </FixedSidebarWrapper>
  );
};

Sidebar.defaultProps = {
  onSwitch: () => {},
  onClickHide: () => {},
  hide: false,
};

Sidebar.propTypes = {
  onSwitch: PropTypes.func,
  onClickHide: PropTypes.func,
  devices: PropTypes.array.isRequired,
  deviceToNumConnection: PropTypes.object.isRequired,
  lastSeen: PropTypes.object.isRequired,
  mostRecentHosts: PropTypes.array.isRequired,
  hide: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  devices: selectDeviceList(state),
  deviceToNumConnection: selectNumberOfConnections(state),
  lastSeen: selectLastSeen(state),
  mostRecentHosts: selectMostRecentDomains(state, 15),
});

const withHideable = (ConnectedSidebar) => {
  class HideableSidebar extends React.Component {
    state = {
      isHidden: false,
      useDefault: true
    };

    onClickHide = () => {
      this.setState({
        isHidden: !this.state.isHidden,
      });
    };

    render() {
      return (
        <ConnectedSidebar
          onClickHide={this.onClickHide}
          hide={this.state.isHidden}
          {...this.props}
        />
      );
    }
  }
  return HideableSidebar;
};

export default withHideable(connect(mapStateToProps)(Sidebar));
