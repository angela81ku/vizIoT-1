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
import { DateConstants } from '../constants/DateConstants';
import { convertDateTypeToString } from '../utility/TimeUtility';
import SectionTitle from '../components/SectionTitle';
import BIcon from 'UIBean/BIcon';
import TypographyComponent from 'UIBean/TypographyComponent';
import GridItem from 'UIBean/GridItem';
import BCard from 'UIBean/BCard';
import { createSocket } from 'VizIoT/socket/subscribe';
import { H2 } from 'UIBean/functional-css/TypographyStyles';
import {
  numberOfActiveDevices,
  selectTodaySize,
  selectVelocity1Min
} from 'VizIoT/selectors/packetSelector';
import moment from 'moment';
import { formatBytes } from 'VizIoT/utility/FormatUtility';

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

const ConnectedDataValue = connect((state, { dataSelector }) => {
  return {
    children: dataSelector(state) || '~',
  };
})(DataWellValueWithFontSize);

class QuickFacts extends PureComponent {
  state = {
    currentMoment: moment(),
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidMount() {
    this.interval = setInterval(this.updateTime, 45000);
  }

  updateTime = () => {
    this.setState(() => ({ currentMoment: moment() }));
  };

  renderGroup(facts, title, column, row, wellSize) {
    return (
      <StyledGridItem column={column} row={row} className="m-bot-7">
        <Flex alignContent={JustifyContent.FLEX_START} fillAll>
          <Proto>{title}</Proto>
          <Flex gutter={3} justifyContent={JustifyContent.FLEX_START} fill>
            {facts.map(({ title, dataSelector, fontSize, icon, iconType }) => {
              return (
                <FlexSize key={title} size={wellSize}>
                  <StyledDataWell>
                    <div>
                      {icon && <BIcon name={icon} type={iconType} size={28} />}
                    </div>
                    <DataWellTitle>{title}</DataWellTitle>
                    <ConnectedDataValue fontSize={fontSize || '5.0rem'} dataSelector={dataSelector} />
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
      currentMoment,
    } = this.state;

    const factsToday = [
      {
        title: 'Total',
        dataSelector: (state) => formatBytes(selectTodaySize(state)),
        iconType: 'eva',
        icon: 'cube',
      },
      {
        title: 'Devices',
        dataSelector: numberOfActiveDevices,
        icon: 'directions_run',
      },
    ];

    const factsRecent = [
      {
        title: 'Averaged traffic rate',
        dataSelector: (state) => formatBytes(selectVelocity1Min(state), 's'),
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
        {'Today, '}<WelcomeEmphasize>{currentMoment.format('MMMM DD YYYY')}</WelcomeEmphasize>
      </div>
    );

    return (
      <QuickFactsWrapper>
        {this.renderGroup(factsToday, todayText, 'col-start / span 12', '3 / 6', {
          md: 12,
          lg: 6,
        })}
        {this.renderGroup(
          factsRecent,
          'In the last minute',
          'col-start / span 12',
          '1 / span 2',
          { md: 12, lg: 6 }
        )}
      </QuickFactsWrapper>
    );
  }
}

export default QuickFacts;
