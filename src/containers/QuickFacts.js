import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  selectBusiestDevice,
  selectNumberOfDevices,
} from '../selectors/deviceSelectors';
import {
  selectTodayPacketCount,
} from '../selectors/packetSelector';

import Flex, { JustifyContent } from 'UIBean/Flex';
import FlexSize from 'UIBean/FlexSize';
import DataWell from 'UIBean/DataWell';
import DataWellValue from 'UIBean/DataWellValue';
import DataWellTitle from 'UIBean/DataWellTitle';
import styled from 'styled-components';
import { selectMostContactedHostLastPeriod } from '../selectors/analyticsSelector';
import CountUp from 'react-countup';
import { DateConstants } from '../constants/DateConstants';
import { convertDateTypeToString } from '../utility/TimeUtility';
import SectionTitle from '../components/SectionTitle';
import BIcon from 'UIBean/BIcon';
import TypographyComponent from 'UIBean/TypographyComponent';
import GridItem from 'UIBean/GridItem';
import BCard from 'UIBean/BCard';
import { closeSocket, createSocket, subscribeToRoom } from 'VizIoT/socket/subscribe';
import { H2 } from 'UIBean/functional-css/TypographyStyles';
import { selectTodaySize, selectSize10Min, selectVelocity10Min } from 'VizIoT/selectors/packetSelector';

const DataWellValueWithFontSize = styled(DataWellValue)`
  font-size: ${props => props.fontSize};
`;

const QuickFactsWrapper = styled(Flex)`
  margin-bottom: 60px;
  padding-bottom: 50px;
  // display: grid;
  // grid-template-columns: repeat(12, [col-start] 1fr);
  // grid-gap: 2rem;
  // grid-template-rows: repeat(2, auto);
`;

const WelcomeEmphasize = styled.span`
  color: rgba(255, 255, 255, 1);
  font-weight: 500;
`;

const StyledGridItem = styled(GridItem)`
  width: 100%;
`;

const Proto = styled.div`
  ${H2}
  padding-bottom: 3rem;
  font-weight: 200;
  color: #fff;
`;

const StyledDataWell = styled(DataWell)`
  padding-bottom: 7rem;
`;

class QuickFacts extends PureComponent {
  renderGroup(facts, title, column, row, wellSize) {
    return (
      <StyledGridItem column={column} row={row} className="m-bot-7">
        <Flex alignContent={JustifyContent.FLEX_START} fillAll>
          <Proto>{title}</Proto>
          <Flex gutter={3} justifyContent={JustifyContent.FLEX_START} fill>
            {facts.map(({ title, data, fontSize, icon, iconType }) => {
              return (
                <FlexSize key={title} size={wellSize}>
                  <StyledDataWell>
                    <div>
                      {icon && <BIcon name={icon} type={iconType} size={28} />}
                    </div>
                    <DataWellTitle>{title}</DataWellTitle>
                    <DataWellValueWithFontSize fontSize={fontSize || '5.0rem'}>
                      <div>
                        {Number(data) ?
                          // (
                          //   <CountUp start={0} end={data} duration={3} />
                          // )
                          data
                          : (
                          data
                        )}
                      </div>
                    </DataWellValueWithFontSize>
                  </StyledDataWell>
                </FlexSize>
              );
            })}
          </Flex>
        </Flex>
      </StyledGridItem>
    );
  }

  render() {
    const {
      velocity10Min,
      numberOfDevices,
      busiestDevice,
      mostContactedHost,
      packetCount,
      sizeToday,
    } = this.props;

    const hugeText = [];

    const factsToday = [
      {
        title: 'Total',
        data: sizeToday || '~',
        iconType: 'eva',
        icon: 'cube',
      },
      {
        title: 'Devices',
        data: numberOfDevices || '~',
        icon: 'directions_run',
      },
    ];

    const factsLast10Min = [
      {
        title: 'Average Velocity / s',
        data: velocity10Min || '~',
        icon: 'av_timer',
      },
      // {
      //   title: 'Busiest Device',
      //   data: busiestDevice.name,
      //   icon: 'trending_up',
      // },
      // {
      //   title: 'Most Popular Host',
      //   data: mostContactedHost,
      //   icon: 'domain',
      // },
    ];

    const todayText = (
      <div>
        {'Today, '}<WelcomeEmphasize>{'December 13, 2018'}</WelcomeEmphasize>
      </div>
    );

    return (
      <QuickFactsWrapper>
        {this.renderGroup(factsToday, todayText, 'col-start / span 12', '3 / 6', {
          md: 12,
          lg: 6,
        })}
        {this.renderGroup(
          factsLast10Min,
          '10 Minutes Ago',
          'col-start / span 12',
          '1 / span 2',
          { md: 12, lg: 6 }
        )}
      </QuickFactsWrapper>
    );
  }
}

QuickFacts.propTypes = {
  sizeToday: PropTypes.string,
  packetCount: PropTypes.number,
  velocity10Min: PropTypes.string,
  numberOfDevices: PropTypes.number,
  busiestDevice: PropTypes.object,
  mostContactedHost: PropTypes.string.isRequired,
};

const formatBytes = (val) => {

  if (!val) {
    return val;
  }

  const byteRanges = [
    {
      unit: 'GB',
      limit: Math.pow(10, 9)
    },
    {
      unit: 'MB',
      limit: Math.pow(10, 6)
    },
    {
      unit: 'KB',
      limit: Math.pow(10, 3)
    },
    {
      unit: 'B',
      limit: 0
    },
  ];

  const { limit, unit } = byteRanges.find(({ limit }) => val > limit);

  return `${parseFloat(val / parseFloat(limit)).toFixed(2)} ${unit}`;
};

const mapStateToProps = state => {


  return {
    sizeToday: formatBytes(selectTodaySize(state)),
    velocity10Min: formatBytes(selectVelocity10Min(state)),
    packetCount: selectTodayPacketCount(state),
    numberOfDevices: selectNumberOfDevices(state),
    busiestDevice: selectBusiestDevice(state),
    mostContactedHost: selectMostContactedHostLastPeriod(
      state,
      convertDateTypeToString[DateConstants.N_SECONDS_AGO](600)
    ).domainName,
  };
};
export default connect(mapStateToProps)(QuickFacts);
