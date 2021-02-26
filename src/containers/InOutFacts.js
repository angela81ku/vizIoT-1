import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { selectRealTimeIOTraffic } from '../selectors/packetSelector';
import PropTypes from 'prop-types';

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
                width: '120px',
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
                <Proto>{title}</Proto>
                <Flex alignContent={JustifyContent.FLEX_START} fillAll>

                    <Flex style={{width:'500px'}} gutter={3} justifyContent={JustifyContent.FLEX_START} noWrap={true} >
                        {facts.map(({ title, dataSelector, fontSize, icon, iconType, color }) => {
                            return (
                                <FlexSize width={'200px'} key={title} size={wellSize}>
                                    <StyledDataWell>
                                      {this.getDataWellHead(icon, iconType, color)}
                                      <DataWellTitle fontSize={'2.5rem'}>{title}</DataWellTitle>
                                      <ConnectedDataValue fontSize={fontSize || '5.0rem'} color={color || 'white'} dataSelector={dataSelector} />
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

        const title = this.props.legendTitle;
        const displayFacts = this.props.displayFacts;
        const displayStreams = this.props.displayStreams;
        let facts = [];
        for (let i = 0; i < displayFacts.length; ++i) {
            if (displayStreams.includes(i)) {
                facts.push({
                    title: displayFacts[i],
                    dataSelector: (state) => formatBytesPerSecond(transformData(this.props.packetSelector(state), i)),
                    iconType: 'eva',
                    color: this.props.lineColors[i],
                })
            } else {
                facts.push({
                    title: displayFacts[i],
                    dataSelector: (state) => formatBytesPerSecond(transformData(this.props.packetSelector(state), i)),
                    iconType: 'eva',
                    icon: 'cube',
                    color: this.props.lineColors[i],
                })
            }
        }

        return (
            <QuickFactsWrapper>
                {this.renderGroup(
                    facts,
                    title,
                    'col-start / span 12',
                    '1 / span 12',
                    {
                        md: 12,
                        lg: 6 }
                )}
            </QuickFactsWrapper>
        );
    }
}

export default InOutFacts;

InOutFacts.propTypes = {
    packetSelector: PropTypes.func.isRequired,
    legendTitle: PropTypes.string,
    lineColors: PropTypes.array,
    displayFacts: PropTypes.array.isRequired,
    displayStreams: PropTypes.array,
}

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
function transformData(data, index) {
    if (data && data.length) {
        let lag = Math.min(2, parseInt(data.length))
        return data[data.length - lag].size[index];
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
    return data + ' B/s';
}

