import Flex, {FlexDirection, JustifyContent} from '../components/BeanUILibrary/Flex';
import FlexSize from '../components/BeanUILibrary/FlexSize';
import React from 'react';
import PropTypes from 'prop-types';
import {useTimedFetcher} from "../components/BeanUILibrary/hooks/useTimedFetcher";
import {fetchDevices} from "../actionsRequest/deviceRequest";
import styled from "styled-components";
import {H2, H4} from "../components/BeanUILibrary/functional-css/TypographyStyles";
import {connect} from "react-redux";
import {selectThreeDevices} from "../selectors/deviceSelectors";
import {selectDeviceToLiveSamples} from "../selectors/packetSelector";
import {selectLiveLineChartConfig, selectSingleDeviceChartConfig} from "../selectors/chartSelectors";
import DeviceCollection from "../components/device/DeviceCollection";
import {fetchDeviceData} from "../data/api/devicesApi";
import {getDevices} from "../data/aggregators/DeviceAggregator";
import DeviceCollectionNormalized from "../components/device/DeviceCollectionNormalized";
import {useSocket} from "../components/BeanUILibrary/hooks/useSocket";
import {TopThree} from "../socket/subscribe";
import {parseTop3IO} from "../data/api/packetApi";
import {getTopThreeIOData} from '../data/aggregators/TopThreeIOAggregator';
import LineGraphPage from "./LineGraphPage";

const Title = styled.div`
  ${H2}
  padding-bottom: 3rem;
  font-weight: 200;
`;

const RecentDevicesTitle = styled(Title)`
  padding-top: 5rem;
  padding-bottom: 1rem;
`;

const RecentDevices = styled.div`
  ${H4}
`;

const DeviceContainer = ({
  chartConfig,
  individualGraphResource,
  individualGraphSize,
  individualDeviceFetcher,
  graphColors,
  factColors,
  cardSymbols,
}) => {

  useTimedFetcher(individualDeviceFetcher.fetcher, individualDeviceFetcher.delay)
  useSocket(individualGraphResource.apiSource, individualGraphResource.packetPusher)

  return <div style={{display:'grid', gridColumn:1}} className={'grid-container'}>
    <div className={'grid-item'}>
      <Flex gutter={2} direction={FlexDirection.ROW} fillAll alignItems={JustifyContent.CENTER}>
        <FlexSize size={{ lg: 3 }}>
          <RecentDevicesTitle>Recent Devices</RecentDevicesTitle>
          <RecentDevices>Most activity within the last 30 seconds</RecentDevices>
        </FlexSize>
      </Flex>
    </div>
    <div className={'grid-item'}>
      <Flex>
        <FlexSize width={'100%'}>
          <Flex direction={FlexDirection.ROW} fillAll justifyContent={JustifyContent.FLEX_START}>
            <DeviceCollectionNormalized
              mode={'CARD'}
              deviceCollector={individualDeviceFetcher.collector}
              packetCollector={individualGraphResource.packetSelector}
              chartConfig={chartConfig}
              graphColors={graphColors}
              graphSize={individualGraphSize}
              factColors={factColors}
              cardSymbols={cardSymbols}
            />
          </Flex>
        </FlexSize>
      </Flex>
    </div>
  </div>
}

DeviceContainer.propTypes = {
  individualGraphResource: PropTypes.object.isRequired,
  individualGraphSize: PropTypes.string,
  individualDeviceFetcher: PropTypes.object.isRequired,
  graphColors: PropTypes.array,
  factColors: PropTypes.array,
  cardSymbols: PropTypes.array,
}

const mapStateToProps = (state, props) => {

  return {
    chartConfig: selectSingleDeviceChartConfig(state),
  };
}

export default connect(mapStateToProps)(DeviceContainer);
