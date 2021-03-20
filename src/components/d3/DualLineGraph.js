import React, {useState} from 'react';
import PropTypes from 'prop-types';

const textXOffset = 15;
const textYOffset = 17;
const strokeColor = '#777'

const drawX = (start, end, yPos) => {
  return <line x1={start} y1={yPos} x2={end} y2={yPos} stroke={strokeColor} strokeWidth={1}/>
}

const drawXLabels = (ticks, start, end, yPos) => {

  const xSkip = (end - start) / ticks;
  const skipPos = [];
  for (let i = 0; i < ticks; ++i) {
    skipPos[i] = {
      pos: end - (i * xSkip),
      time: i * 10,
    }
  }

  return <g>
    {skipPos.map(tick => {
      return <g>
        <text x={tick.pos - textXOffset} y={yPos + textYOffset} fill={strokeColor} fontSize={10}>{tick.time}sec</text>
        <line
          x1={tick.pos}
          y1={yPos + 5}
          x2={tick.pos}
          y2={yPos - 5}
          stroke={strokeColor}
          strokeWidth={1}
        />
      </g>
    })}
  </g>

}

export const DualLineGraph = ({
  height,
  width,
}) => {

  const view = `0 0 ${width} ${height}`
  const xAxisStart = 0;
  const xAxisEnd = width;
  const xAxisYPos = (height / 2);

  return (
    <svg viewBox={view}>
      {drawX(xAxisStart, xAxisEnd, xAxisYPos)}
      {drawXLabels(3, xAxisStart, xAxisEnd, xAxisYPos)}
    </svg>
  )

}

DualLineGraph.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
}