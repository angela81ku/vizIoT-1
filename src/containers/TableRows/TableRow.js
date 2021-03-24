import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';

import {
  ArrowColumn,
  ArrowContainerColumn,
  BorderedSolidRow, CountryColumn,
  DestinationColumn, GraphColumn,
  IPColumn, MetricColumn, MetricSymbolColumn, OverallMetricColumn, RecentMetricColumn,
  SourceColumn
} from './ColumnStyles';
import SolidRow from '../../components/BeanUILibrary/SolidRow';
import TabColumn from '../../components/BeanUILibrary/TabColumn';
import BIcon from '../../components/BeanUILibrary/BIcon';
import {DualLineGraph} from '../../components/d3/DualLineGraph';
import {ConnectionTable} from '../ConnectionTable';
import {formatBytes} from "../../utility/FormatUtility";

function useDimensions(targetRef) {
  const getDimensions = () => {
    return {
      width: targetRef.current ? targetRef.current.offsetWidth : 0,
      height: targetRef.current ? targetRef.current.offsetHeight : 0
    };
  };

  const [dimensions, setDimensions] = useState(getDimensions);

  const handleResize = () => {
    setDimensions(getDimensions());
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  const dims = getDimensions();
  if (dims.width !== dimensions.width || dims.height !== dimensions.height) {
    return dims;
  } else {
    return dimensions;
  }
}

export const TableRow = ({
  name,
  ip,
  country,
  data,
  sentFive,
  sentSixty,
  receivedFive,
  receivedSixty,
  timeFrame,
  timeStamp,
  ticks,
  sentColor,
  receivedColor
}) => {

  const graphRef = useRef();
  const dimensions = useDimensions(graphRef)

  return <BorderedSolidRow height='100px' >
    <SourceColumn>
      <SolidRow>
        <TabColumn>
          {handleUndefinedValue(name)}
        </TabColumn>
      </SolidRow>
    </SourceColumn>
    <ArrowColumn>
      <SolidRow>
        <ArrowContainerColumn>
          <BIcon name='arrow-back-outline' type='eva' size={28} color={(receivedColor ? receivedColor : '#0073ff')}/>
        </ArrowContainerColumn>
        <ArrowContainerColumn>
          <BIcon name='arrow-forward-outline' type='eva' size={28} color={(sentColor ? sentColor : '#ff1e00')}/>
        </ArrowContainerColumn>
      </SolidRow>
    </ArrowColumn>
    <DestinationColumn>
      <SolidRow>
        <IPColumn>
          {handleUndefinedValue(ip)}
        </IPColumn>
        <CountryColumn>
          {handleUndefinedValue(country)}
        </CountryColumn>
      </SolidRow>
    </DestinationColumn>
    <GraphColumn style={{alignContent:'center'}}>
      <div style={{height:'100%', width:'100%'}} ref={graphRef}>
        <DualLineGraph
          height={dimensions.height}
          width={dimensions.width}
          data={data}
          timeFrame={timeFrame}
          timeStamp={timeStamp}
          ticks={ticks}
          topColor={sentColor}
          bottomColor={receivedColor}
        />
      </div>
    </GraphColumn>
    <MetricColumn>
      <SolidRow height='50%'>
        <MetricSymbolColumn style={{paddingLeft:'5%'}}>
          <BIcon name='arrow-circle-up-outline' type='eva' size={28} color={(sentColor ? sentColor : '#ff1e00')}/>
        </MetricSymbolColumn>
        <RecentMetricColumn>
          {handleUndefinedNumeric(sentFive)}
        </RecentMetricColumn>
        <OverallMetricColumn>
          {handleUndefinedNumeric(sentSixty)}
        </OverallMetricColumn>
      </SolidRow>
      <SolidRow height='50%'>
        <MetricSymbolColumn style={{paddingLeft:'5%'}}>
          <BIcon name='arrow-circle-down-outline' type='eva' size={28} color={(receivedColor ? receivedColor : '#0073ff')}/>
        </MetricSymbolColumn>
        <RecentMetricColumn>
          {handleUndefinedNumeric(receivedFive)}
        </RecentMetricColumn>
        <OverallMetricColumn>
          {handleUndefinedNumeric(receivedSixty)}
        </OverallMetricColumn>
      </SolidRow>
    </MetricColumn>
  </BorderedSolidRow>
}

TableRow.propTypes = {
  name: PropTypes.string.isRequired,
  ip: PropTypes.string.isRequired,
  country: PropTypes.string,
  data: PropTypes.array.isRequired,
  sentFive: PropTypes.number,
  sentSixty: PropTypes.number,
  receivedFive: PropTypes.number,
  receivedSixty: PropTypes.number,
  timeFrame: PropTypes.number,
  timeStamp: PropTypes.number.isRequired,
  ticks: PropTypes.number,
  sentColor: PropTypes.string,
  receivedColor: PropTypes.string,
}

const handleUndefinedValue = val => {
  if (val) { return val; }
  return '~'
}

const handleUndefinedNumeric = num => {
  if (num) { return formatBytes(num, 's', 0, false); }
  return '~ B/s'
}