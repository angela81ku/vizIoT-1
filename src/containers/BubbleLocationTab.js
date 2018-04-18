import React from 'react';
import Grid from '../components/BeanUILibrary/Grid';
import GridItem from '../components/BeanUILibrary/GridItem';
import { connect } from 'react-redux';
import BubbleChart from '../components/d3/BubbleChart';
import { SPACING } from '../data/records/Spacing';
import AutoFitComponent from '../components/AutoFitComponent';
import BucketUnitConstants from '../constants/BucketUnit';
import FlexWrapper from '../components/BeanUILibrary/FlexWrapper';
import { analyzeAggregationByDomain } from '../actions/analyzeActions';
import { selectDomainsToday } from '../selectors/analyticsSelector';
import { DateConstants } from '../constants/DateConstants';
import { convertDateTypeToString } from '../utility/TimeUtility';

const DATA_REFRESH_DELAY_MS = 5 * 1000;

class BubbleLocationTab extends React.Component {
  componentWillMount() {
    // First calls:
    analyzeAggregationByDomain(
      convertDateTypeToString[DateConstants.TODAY](),
      convertDateTypeToString[DateConstants.NOW]()
    );

    // Looped calls:
    const dataFetchLoop = setInterval(() => {
      analyzeAggregationByDomain(
        convertDateTypeToString[DateConstants.TODAY](),
        convertDateTypeToString[DateConstants.NOW]()
      );
    }, DATA_REFRESH_DELAY_MS);

    this.setState(() => ({
      dataFetchLoop: dataFetchLoop,
    }));
  }

  componentWillUnmount() {
    clearInterval(this.state.dataFetchLoop);
  }

  render() {
    // const data = [
    //   { id: 'main.network1.device1.apple', value: 1 },
    //   { id: 'main.network1.device1.google', value: 4 },
    //   { id: 'main.network2.device2.google', value: 3 },
    //   { id: 'main.network1.device3.xiaomi', value: 8 },
    //   { id: 'main.network1.device3.xiaomi', value: 10 },
    //   { id: 'main.network2.device3.xiaomi', value: 15 },
    //   { id: 'main.network2.device3.xiaomi', value: 20 },
    //   { id: 'main.network1.device3.xiaomi', value: 10 },
    // ];
    const data = this.props.domain;

    return (
      <div className="location-bubble-tab">
        <Grid gutter={3}>
          <GridItem size={{ md: 12 }}>
            <AutoFitComponent className="location-bubble-chart">
              <BubbleChart
                dimension={{
                  width: 0,
                  height: 0,
                }}
                data={data}
                dataWindowSize={0}
                dataWindowUnit={BucketUnitConstants.LOCATION}
                padding={new SPACING({ l: 20, r: 20, t: 20, b: 20 })}
              />
            </AutoFitComponent>
            <FlexWrapper className="location-bubble-tab__titleWrapper">
              <h5 className="wide-letter location-bubble-tab__title">
                DESTINATIONS BY 2ND LEVEL DOMAIN
              </h5>
            </FlexWrapper>
          </GridItem>
        </Grid>
      </div>
    );
  }
}

BubbleLocationTab.defaultProps = {};

const mapStateToProps = state => {
  return {
    domain: selectDomainsToday(state),
  };
};
export default connect(mapStateToProps)(BubbleLocationTab);
