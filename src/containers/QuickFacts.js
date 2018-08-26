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

const DataWellValueWithFontSize = styled(DataWellValue)`
  font-size: ${props => props.fontSize};
`;

const QuickFactsWrapper = styled.div`
  margin-bottom: 60px;
  padding-bottom: 50px;
`;

const Proto = styled.div`
  letter-spacing: 0;
  text-align: center;
  width: 100%;
  padding-bottom: 3.0rem;
  font-size: 25px;
  font-weight: 800;
  color: #a7b4ca8f;
`;

const StyledDataWell = styled(DataWell)`
`;

class QuickFacts extends React.Component {
  renderQuickFactRow(facts, title) {
    return (
      <div className="m-bot-5">
        <Proto>{title}</Proto>
        {/*<SectionTitle title={title} cardPadding={false} />*/}
        <Flex gutter={3} justifyContent={JustifyContent.CENTER}>
          {facts.map(({ title, data, fontSize, icon, iconType }) => {
            return (
              <FlexSize key={title} size={{ md: 6, lg: 4 }}>
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

    const hugeText = [
      {
        title: 'Active',
        data: numberOfDevices,
        icon: 'directions_run',
      }
    ];

    const factsToday = [
        // {
        //   title: 'Active',
        //   data: numberOfDevices,
        // },
      {
        title: 'Inactive',
        data: 0,
        icon: 'cloud_off',
      },
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
          this.renderQuickFactRow(hugeText, 'Today')
        }
        {
          // eslint-disable-next-line quotes
          this.renderQuickFactRow(factsToday, "")
        }
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
