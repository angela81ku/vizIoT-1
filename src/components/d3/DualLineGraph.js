import React, {useState} from 'react';
import PropTypes from 'prop-types';

export const DualLineGraph = ({
  height,
  width,
}) => {

  const view = `0 0 ${width} ${height}`

  return (
    <svg viewBox={view}/>
  )

}

DualLineGraph.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
}