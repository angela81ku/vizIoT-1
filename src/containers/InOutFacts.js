import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
    selectRealtimeVelocitySizeSample,
} from '../selectors/packetSelector';

import Flex, { JustifyContent } from '../components/BeanUILibrary/Flex';
import FlexSize from '../components/BeanUILibrary/FlexSize';
import DataWell from '../components/BeanUILibrary/DataWell';
import DataWellValue from '../components/BeanUILibrary/DataWellValue';
import DataWellTitle from '../components/BeanUILibrary/DataWellTitle';
import styled from 'styled-components';
import BIcon from '../components/BeanUILibrary/BIcon';
import GridItem from '../components/BeanUILibrary/GridItem';
import { H2 } from '../components/BeanUILibrary/functional-css/TypographyStyles';
import moment from 'moment';

// to get rid of color, remove color attribute (USED FOR LEGEND PURPOSES)
const DataWellValueWithFontSize = styled(DataWellValue)`
  font-size: ${props => props.fontSize};
  color: ${props => props.color};
  background-color: ${props => props.backgroundColor};
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
  overflow: visible;
  
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

  /**
   * Return an icon if specified, other create colored line.
   *
   * @param icon icon to be displayed (optional)
   * @param iconType icon-type per eva library
   * @param color color of icon or line
   * @returns {JSX.Element}
   */
    getDataWellHead(icon, iconType, color) {
      if (icon) {
        return (
          <div>
            {icon && <BIcon name={icon} type={iconType} size={28} color={color} />}
          </div>
        )
      } else {
        return (
          <div
            style={{
              marginBottom: '5px'
            }}
          >
            <hr
              style={{
                color: color,
                backgroundColor: color,
                height: '5px',
                width: '60%',
                marginLeft: '2px'
              }}
            />
          </div>
        )
      }
    }


    renderGroup(facts, title, column, row, wellSize) {
        return (
            <StyledGridItem column={column} row={row} className="m-bot-7">
                <Flex alignContent={JustifyContent.FLEX_START} fillAll>
                    <Proto>{title}</Proto>
                    <Flex gutter={3} justifyContent={JustifyContent.FLEX_START} noWrap={true} fill>
                        {facts.map(({ title, dataSelector, fontSize, icon, iconType, color }) => {
                            return (
                                <FlexSize key={title} size={wellSize}>
                                    <StyledDataWell>
                                      {/*HEY DUDE REINSTATE DIV FOR COLORED CUBE ICONS*/}
                                      {/*<div>*/}
                                      {/*    {icon && <BIcon name={icon} type={iconType} size={28} color={color} />}*/}
                                      {/*</div>*/}
                                      {/*<hr*/}
                                      {/*  style={{*/}
                                      {/*    color: 'white',*/}
                                      {/*    backgroundColor: 'white',*/}
                                      {/*    width: '60%',*/}
                                      {/*    margin: '2px'*/}
                                      {/*  }}*/}
                                      {/*/>*/}
                                      {/*HEY DUDE REPLACE THE BOTTOM LINE FOR ICONS AND LINES*/}
                                      {this.getDataWellHead(icon, iconType, color)}
                                      <DataWellTitle>{title}</DataWellTitle>
                                      {/* The line below will make the FONT COLORED*/}
                                      <ConnectedDataValue fontSize={fontSize || '5.0rem'} color={color || 'white'} dataSelector={dataSelector} />
                                      {/* The line below will make the font BACKGROUND COLORED*/}
                                      {/*<ConnectedDataValue fontSize={fontSize || '5.0rem'} color={'white'} backgroundColor={color} dataSelector={dataSelector} />*/}
                                      {/* The line below will return the FONT TO THE WAY IT WAS BEFORE -- UNCOMMENT UPPER DIV FOR ORIGINAL LAYOUT*/}
                                      {/*<ConnectedDataValue fontSize={fontSize || '5.0rem'} color={'white'} backgroundColor={'#0c1a38'} dataSelector={dataSelector} />*/}
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

        // Replaced dataSelector with function that retrieves this in/out traffic
        // consider changing icon to some kind of up/down arrow (check icon lib)
        // console.log((state) => selectTodaySize((state)))
        // console.log(selectRealtimeVelocitySizeSample);
        // console.log(selectRealtimeVelocitySizeSample());
        // console.log(curr)
        const factsInOut = [
            {
                title: 'Total',
                dataSelector: (state) => formatBytesPerSecond(transformData(selectRealtimeVelocitySizeSample(state),0,2)),
                iconType: 'eva',
                icon: 'cube',
            },
            {
                title: 'Received',
                dataSelector: (state) => formatBytesPerSecond(transformData(selectRealtimeVelocitySizeSample(state),0,1)),
                iconType: 'eva',
                //icon: 'minus-outline',
                // this is the colors icon, may be left out
                color: this.props.lineColors[0],
            },
            {
                title: 'Sent',
                dataSelector: (state) => formatBytesPerSecond(transformData(selectRealtimeVelocitySizeSample(state),1,1)),
                iconType: 'eva',
                //icon: 'minus-outline',
                // this colors the icon, may be left out
                color: this.props.lineColors[1],
            }
        ];

        const todayText = (
            <div>
                {'Today, '}<WelcomeEmphasize>{currentMoment.format('MMMM DD YYYY')}</WelcomeEmphasize>
            </div>
        );

        return (
            <QuickFactsWrapper>
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