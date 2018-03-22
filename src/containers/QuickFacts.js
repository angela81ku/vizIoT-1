import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  selectBusiestDevice,
  selectMostPopularHost,
  selectNumberOfDevices,
  selectPercentUnsecuredToday,
} from '../selectors/deviceSelectors';
import Grid from '../components/BeanUILibrary/Grid';
import GridItem from '../components/BeanUILibrary/GridItem';
import DataWell from '../components/BeanUILibrary/DataWell';
import DataWellValue from '../components/BeanUILibrary/DataWellValue';
import DataWellTitle from '../components/BeanUILibrary/DataWellTitle';

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
        title: 'UNSECURED CONNECTIONS',
        data: percentOfHttpConnections,
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
      <div className="">
        {/*<h5 className="wide-letter cardTitle">*/}
        {/*/!*<i className="material-icons m-right-2">access_time</i>*!/*/}
        {/*QUICK FACTS*/}
        {/*</h5>*/}
        <Grid gutter={3}>
          {facts.map(({ title, data }) => {
            return (
              <GridItem key={title} size={{ md: 6, lg: 3 }} space="m-bot-5">
                <DataWell>
                  <DataWellValue>{data}</DataWellValue>
                  <DataWellTitle>{title}</DataWellTitle>
                </DataWell>
              </GridItem>
            );
          })}
        </Grid>
      </div>
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
    mostContactedHost: selectMostPopularHost(state),
  };
};
export default connect(mapStateToProps)(QuickFacts);
