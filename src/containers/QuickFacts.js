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

const DataWellValueWithFontSize = styled(DataWellValue)`
  font-size: ${props => props.fontSize};
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
        title: 'BUSIEST DEVICE',
        data: busiestDevice.name,
        // fontSize: '3.6rem',
      },
      {
        title: 'MOST POPULAR HOST',
        data: mostContactedHost,
      },
    ];

    return (
      <Grid gutter={3}>
        {facts.map(({ title, data, fontSize }) => {
          return (
            <GridItem key={title} size={{ md: 6, lg: 4 }} space="m-bot-12">
              <DataWell>
                <DataWellValueWithFontSize fontSize={fontSize || '5.0rem'}>
                  {data}
                </DataWellValueWithFontSize>
                <DataWellTitle>{title}</DataWellTitle>
              </DataWell>
            </GridItem>
          );
        })}
      </Grid>
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
