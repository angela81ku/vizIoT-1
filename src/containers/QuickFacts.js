import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  selectBusiestDevice,
  selectNumberOfDevices,
  selectPercentUnsecuredToday,
} from '../selectors/deviceSelectors';
import Flex from 'UIBean/Flex';
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

const DataWellValueWithFontSize = styled(DataWellValue)`
  font-size: ${props => props.fontSize};
`;

const QuickFactsWrapper = styled.div`
  margin-bottom: 60px;
`;

const Proto = styled.div`
  letter-spacing: 0;
  text-align: left;
  width: 100%;
  padding: 6px 0px;
  font-size: 25px;
  font-weight: 800;
  color: #a7b4ca8f;
`;

class QuickFacts extends React.Component {
  renderQuickFactRow(facts, title) {
    return (
      <div className="m-bot-5">
        <Proto>{title}</Proto>
        {/*<SectionTitle title={title} cardPadding={false} />*/}
        <Flex gutter={3}>
          {facts.map(({ title, data, fontSize }) => {
            return (
              <FlexSize key={title} size={{ md: 6, lg: 4 }}>
                <DataWell>
                  <div>
                    <DataWellValueWithFontSize fontSize={fontSize || '5.0rem'}>
                      {Number(data) ? (
                        <CountUp start={0} end={data} duration={3} />
                      ) : (
                        data
                      )}
                    </DataWellValueWithFontSize>
                    <DataWellTitle>{title}</DataWellTitle>
                  </div>
                </DataWell>
              </FlexSize>
            );
          })}
        </Flex>
      </div>
    );
  }

  render() {
    const {
      numberOfDevices,
      percentOfHttpConnections,
      busiestDevice,
      mostContactedHost,
    } = this.props;

    const factsToday = [
      {
        title: 'DEVICES',
        data: numberOfDevices,
      },
      {
        title: 'CONNECTIONS',
        data: '~',
      },
      {
        title: 'UNSECURED',
        data: '~',
      },
    ];

    const factsLast10Min = [
      {
        title: 'AVG CONN / SEC',
        data: 'N/A',
      },
      {
        title: 'BUSIEST DEVICE',
        data: busiestDevice.name,
      },
      {
        title: 'MOST POPULAR HOST',
        data: mostContactedHost,
      },
    ];

    return (
      <QuickFactsWrapper>
        {this.renderQuickFactRow(factsToday, "Today's Stats")}
        {this.renderQuickFactRow(factsLast10Min, '10 Minutes Ago')}
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
