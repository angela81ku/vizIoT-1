import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  selectBusiestDevice,
  selectNumberOfDevices,
  selectPercentUnsecuredToday,
} from '../selectors/deviceSelectors';
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

const { H1 } = TypographyComponent;

const DataWellValueWithFontSize = styled(DataWellValue)`
  font-size: ${props => props.fontSize};
`;

const QuickFactsWrapper = styled.div`
  margin-bottom: 60px;
  padding-bottom: 50px;
  display: grid;
  grid-template-columns: repeat(12, [col-start] 1fr);
  grid-gap: 2rem;
  grid-template-rows: repeat(2, auto);
`;

// grid-column-start: ${({ columns: { start } }) => start};
// grid-column-end: ${({ columns: { end } }) => end};
// grid-row-start: ${({ rows: { start } }) => start};
// grid-row-end: ${({ rows: { end } }) => end};

const StyledGridItem = styled(GridItem)`
  // background: #FFFFFFAA;
`;

const Proto = styled(H1)`
  letter-spacing: 0;
  text-align: left;
  width: 100%;
  padding-bottom: 3.0rem;
  font-weight: 800;
  color: #fff;
`;

const StyledDataWell = styled(DataWell)`
`;

class QuickFacts extends React.Component {

  renderGroup(facts, title, column, row, wellSize) {
    return (
      <StyledGridItem column={column} row={row} className="m-bot-7">
        <Flex alignContent={JustifyContent.CENTER} fillAll>
        <Proto>{title}</Proto>
        {/*<SectionTitle title={title} cardPadding={false} />*/}
        <Flex gutter={3} justifyContent={JustifyContent.FLEX_START} fill>
          {facts.map(({ title, data, fontSize, icon, iconType }) => {
            return (
              <FlexSize key={title} size={wellSize}>
                <StyledDataWell>
                  <div>
                    {
                      icon && <BIcon name={icon} type={iconType} size={28} />
                    }
                  </div>
                  <DataWellTitle>{title}</DataWellTitle>
                  <DataWellValueWithFontSize fontSize={fontSize || '5.0rem'}>
                    <div>
                      {Number(data) ? (
                        <CountUp start={0} end={data} duration={3} />
                      ) : (
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
      percentOfHttpConnections,
      busiestDevice,
      mostContactedHost,
    } = this.props;

    const hugeText = [
    ];

    const factsToday = [
      {
        title: 'Connections',
        data: '~',
        icon: 'send',
      },
      {
        title: 'Unsecured',
        data: '~',
        icon: 'lock_open'
      },
      {
        title: 'Active',
        data: numberOfDevices,
        icon: 'directions_run',
      },
      {
        title: 'Inactive',
        data: 0,
        icon: 'cloud_off',
      },
    ];

    const factsLast10Min = [
      {
        title: 'Avg. Connections / Second',
        data: 'N/A',
        icon: 'av_timer'
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
        {
          this.renderGroup(factsToday, 'Today', 'col-start 7 / span 6', '1', { md: 6, lg: 5 })
        }
        {
          this.renderGroup(factsLast10Min, '10 Minutes Ago', 'col-start / span 5', '1 / span 2', { md: 12, lg: 4 })
        }
      </QuickFactsWrapper>
    );
  }
}

QuickFacts.propTypes = {
  numberOfDevices: PropTypes.number.isRequired,
  percentOfHttpConnections: PropTypes.string.isRequired,
  busiestDevice: PropTypes.object.isRequired,
  mostContactedHost: PropTypes.string.isRequired,
};

const mapStateToProps = state => {
  return {
    numberOfDevices: selectNumberOfDevices(state),
    percentOfHttpConnections: `${selectPercentUnsecuredToday(state)}%`,
    busiestDevice: selectBusiestDevice(state),
    mostContactedHost: selectMostContactedHostLastPeriod(
      state,
      convertDateTypeToString[DateConstants.N_SECONDS_AGO](600)
    ).domainName,
  };
};
export default connect(mapStateToProps)(QuickFacts);
