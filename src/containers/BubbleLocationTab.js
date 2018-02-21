import React from 'react';
import Grid from '../components/BeanUILibrary/Grid';
import GridItem from '../components/BeanUILibrary/GridItem';
import { connect } from 'react-redux';

const DATA_REFRESH_DELAY_MS = 5 * 1000;

class BubbleLocationTab extends React.Component {

  componentWillMount() {
    const dataFetchLoop = setInterval(() => {
      const { devices } = this.props;
      devices.forEach(({ macAddr }) => {
        // TODO Fetch Locational Data
      });
    }, DATA_REFRESH_DELAY_MS);

    this.setState(() => ({
      dataFetchLoop: dataFetchLoop,
    }));
  }

  componentWillUnmount() {
    clearInterval(this.state.dataFetchLoop);
  }

  render() {
    return (
      <Grid gutter={3}>
        <GridItem size={{ md: 12 }}>
          <h5 className="wide-letter deviceList__title">
            REQUESTS BY LOCATION
          </h5>

        </GridItem>
      </Grid>
    );
  }
}

BubbleLocationTab.defaultProps = {

};

const mapStateToProps = state => {
  return {

  };
};
export default connect(mapStateToProps)(BubbleLocationTab);
