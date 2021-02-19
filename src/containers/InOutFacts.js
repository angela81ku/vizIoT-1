import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    selectNumberOfDevices,
} from '../selectors/deviceSelectors';
import {
    selectRealtimeVelocitySizeSample,
    selectTodayPacketCount,
} from '../selectors/packetSelector';

import Flex, { JustifyContent } from '../components/BeanUILibrary/Flex';
import FlexSize from '../components/BeanUILibrary/FlexSize';
import DataWell from '../components/BeanUILibrary/DataWell';
import DataWellValue from '../components/BeanUILibrary/DataWellValue';
import DataWellTitle from '../components/BeanUILibrary/DataWellTitle';
import styled from 'styled-components';
import { selectMostContactedHostLastPeriod } from '../selectors/analyticsSelector';
import { DateConstants } from '../constants/DateConstants';
import { convertDateTypeToString } from '../utility/TimeUtility';
import SectionTitle from '../components/SectionTitle';
import BIcon from '../components/BeanUILibrary/BIcon';
import TypographyComponent from 'UIBean/TypographyComponent';
import GridItem from '../components/BeanUILibrary/GridItem';
import BCard from 'UIBean/BCard';
import { createSocket } from 'VizIoT/socket/subscribe';
import { H2 } from '../components/BeanUILibrary/functional-css/TypographyStyles';
import {
    numberOfActiveDevices,
    selectTodaySize,
    selectVelocity1Min
} from '../selectors/packetSelector';
import moment from 'moment';
import { formatBytes } from '../utility/FormatUtility';

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

class InOutFacts extends PureComponent {
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

        const val1 = Math.floor( 100 * Math.random());
        const val2 = Math.floor( 100 * Math.random());

        const factsToday = [
            {
                title: 'Total',
                dataSelector: (state) => formatBytesPerSecond(transformData(selectRealtimeVelocitySizeSample(state),0,2)),
                iconType: 'eva',
                icon: 'cube',
            },
            {
                title: 'Devices',
                dataSelector: () => { return 1}, //numberOfActiveDevices,
                icon: 'directions_run',
            },
        ];

        // Replaced dataSelector with function that retrieves this in/out traffic
        // consider changing icon to some kind of up/down arrow (check icon lib)
        console.log((state) => selectTodaySize((state)))
        console.log(selectRealtimeVelocitySizeSample);
        console.log(selectRealtimeVelocitySizeSample());
        // console.log(curr)
        const factsInOut = [
            {
                title: 'Received',
                dataSelector: (state) => formatBytesPerSecond(transformData(selectRealtimeVelocitySizeSample(state),0,1)),
                iconType: 'eva',
                icon: 'cube'
            },
            {
                title: 'Sent',
                dataSelector: (state) => formatBytesPerSecond(transformData(selectRealtimeVelocitySizeSample(state),1,1)),
                iconType: 'eva',
                icon: 'cube'
            }
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
                    factsInOut,
                    'In/Out',
                    'col-start / span 12',
                    '2 / span 12',
                    {
                        md: 12,
                        lg: 6 }
                )}
            </QuickFactsWrapper>
        );
    }
}

export default InOutFacts;

/**
 *  Finds the size of the most recent data packets from the current stream.
 *  Stream 0: In
 *  Stream 1: Out
 *
 * @param data the data stream to pull info from
 * @param start the index to start transforming data from
 * @param len how many entries should be summed (1 or 2)
 * @returns {number}
 */
function transformData(data, start, len) {
    if (data && data.length) {
        let tot = 0;
        for (let i = start; i < start + len; ++i) {
            tot += data[data.length-1].size[i];
        }
        return tot;
    }
    return 0;
}

/**
 * Formats Bytes per Second for each stream.
 *
 * @param data numeric data to be formatted.
 * @returns {string}
 */
const formatBytesPerSecond = data => {
    return data + ' B/s'
}