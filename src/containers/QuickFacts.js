import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  selectBusiestDevice,
  selectNumberOfDevices,
  selectPercentUnsecuredToday,
} from '../selectors/deviceSelectors';
import Grid from '../components/BeanUILibrary/Grid';
import GridItem from '../components/BeanUILibrary/GridItem';
import DataWell from '../components/BeanUILibrary/DataWell';
import DataWellValue from '../components/BeanUILibrary/DataWellValue';
import DataWellTitle from '../components/BeanUILibrary/DataWellTitle';
import styled from 'styled-components';
import { selectMostContactedHostToday } from '../selectors/analyticsSelector';
import CountUp from 'react-countup';

const DataWellValueWithFontSize = styled(DataWellValue)`
  font-size: ${props => props.fontSize};
`;

const QuickFactsWrapper = styled.div`
  margin-bottom: 60px;
`;

class QuickFacts extends React.Component {
  render() {
    const {
      numberOfDevices,
      percentOfHttpConnections,
      busiestDevice,
      mostContactedHost,
    } = this.props;

    const facts = [
      {
        title: 'DEVICES',
        data: numberOfDevices,
      },
      {
        title: 'BUSIEST DEVICE TODAY',
        data: busiestDevice.name,
        // fontSize: '3.6rem',
      },
      {
        title: 'MOST POPULAR HOST TODAY',
        data: mostContactedHost,
      },
    ];

    return (
      <QuickFactsWrapper>
        <Grid gutter={3}>
          {facts.map(({ title, data, fontSize }) => {
            return (
              <GridItem key={title} size={{ md: 6, lg: 4 }}>
                <DataWell>
                  <DataWellValueWithFontSize fontSize={fontSize || '5.0rem'}>
                    {Number(data) ? (
                      <CountUp start={0} end={data} duration={3} />
                    ) : (
                      data
                    )}
                  </DataWellValueWithFontSize>
                  <DataWellTitle>{title}</DataWellTitle>
                </DataWell>
              </GridItem>
            );
          })}
        </Grid>
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
    mostContactedHost: selectMostContactedHostToday(state).domainName,
  };
};
export default connect(mapStateToProps)(QuickFacts);
