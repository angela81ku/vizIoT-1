import React from 'react';
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

const { H1 } = TypographyComponent;

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

// grid-column-start: ${({ columns: { start } }) => start};
// grid-column-end: ${({ columns: { end } }) => end};
// grid-row-start: ${({ rows: { start } }) => start};
// grid-row-end: ${({ rows: { end } }) => end};

const StyledGridItem = styled(GridItem)`
  width: 100%;
`;

const Proto = styled(H1)`
  padding-bottom: 3rem;
  font-weight: 200;
  color: #fff;
`;

const StyledDataWell = styled(DataWell)`
  padding-bottom: 7rem;
`;

class QuickFacts extends React.Component {
  renderGroup(facts, title, column, row, wellSize) {
    return (
      <StyledGridItem column={column} row={row} className="m-bot-7">
        <Flex alignContent={JustifyContent.FLEX_START} fillAll>
          <Proto>{title}</Proto>
          {/*<SectionTitle title={title} cardPadding={false} />*/}
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
      numberOfDevices,
      busiestDevice,
      mostContactedHost,
      packetCount,
    } = this.props;

    const hugeText = [];

    const factsToday = [
      {
        title: 'Packets',
        data: packetCount || '~',
        iconType: 'eva',
        icon: 'cube',
      },
      {
        title: 'Active Devices',
        data: numberOfDevices || '~',
        icon: 'directions_run',
      },
    ];

    const factsLast10Min = [
      {
        title: 'Average Packets / s',
        data: '~',
        icon: 'av_timer',
      },
      {
        title: 'Busiest Device',
        data: busiestDevice.name,
        icon: 'trending_up',
      },
      {
        title: 'Most Popular Host',
        data: mostContactedHost,
        icon: 'domain',
      },
    ];

    return (
      <QuickFactsWrapper>
        {this.renderGroup(factsToday, 'Today', 'col-start / span 12', '3 / 6', {
          md: 12,
          lg: 4,
        })}
        {this.renderGroup(
          factsLast10Min,
          '10 Minutes Ago',
          'col-start / span 12',
          '1 / span 2',
          { md: 12, lg: 4 }
        )}
      </QuickFactsWrapper>
    );
  }
}

QuickFacts.propTypes = {
  packetCount: PropTypes.number,
  numberOfDevices: PropTypes.number,
  busiestDevice: PropTypes.object.isRequired,
  mostContactedHost: PropTypes.string.isRequired,
};

const mapStateToProps = state => {
  return {
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
