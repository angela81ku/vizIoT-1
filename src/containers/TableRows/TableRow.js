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
   sentFive,
   sentSixty,
   receivedFive,
   receivedSixty
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
          <BIcon name='arrow-back-outline' type='eva' size={28} color='blue'/>
        </ArrowContainerColumn>
        <ArrowContainerColumn>
          <BIcon name='arrow-forward-outline' type='eva' size={28} color='red'/>
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
        <DualLineGraph height={dimensions.height} width={dimensions.width}/>
      </div>
    </GraphColumn>
    <MetricColumn>
      <SolidRow height='50%'>
        <MetricSymbolColumn style={{paddingLeft:'5%'}}>
          <BIcon name='arrow-circle-up-outline' type='eva' size={28} color='red'/>
        </MetricSymbolColumn>
        <RecentMetricColumn>
          {handleUndefinedValue(sentFive)} B/S
        </RecentMetricColumn>
        <OverallMetricColumn>
          {handleUndefinedValue(sentSixty)} B/S
        </OverallMetricColumn>
      </SolidRow>
      <SolidRow height='50%'>
        <MetricSymbolColumn style={{paddingLeft:'5%'}}>
          <BIcon name='arrow-circle-down-outline' type='eva' size={28} color='blue'/>
        </MetricSymbolColumn>
        <RecentMetricColumn>
          {handleUndefinedValue(receivedFive)} B/S
        </RecentMetricColumn>
        <OverallMetricColumn>
          {handleUndefinedValue(receivedSixty)} B/S
        </OverallMetricColumn>
      </SolidRow>
    </MetricColumn>
  </BorderedSolidRow>
}

TableRow.propTypes = {
  name: PropTypes.string.isRequired,
  ip: PropTypes.string.isRequired,
  country: PropTypes.string,
  sentFive: PropTypes.number.isRequired,
  sentSixty: PropTypes.number.isRequired,
  receivedFive: PropTypes.number.isRequired,
  receivedSixty: PropTypes.number.isRequired,
}

const handleUndefinedValue = val => {
  if (val) { return val; }
  return '~'
}