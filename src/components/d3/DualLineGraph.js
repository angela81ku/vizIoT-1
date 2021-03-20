import React, {useState} from 'react';
import PropTypes from 'prop-types';

const textXXOffset = 15;
const textXYOffset = 17;
const textYXOffset = 10;
const textYYOffset = 4;
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
        <text x={tick.pos - textXXOffset} y={yPos + textXYOffset} fill={strokeColor} fontSize={10}>{tick.time}sec</text>
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

const drawYLabels = (max, height) => {

  const mid = (height / 2);
  const midTop = mid + (height / 4);
  const midBottom = mid - (height / 4);
  const tickVal = Math.floor(max / 2);

  return <g>
    <text x={textYXOffset} y={midTop + textYYOffset} fill={strokeColor} fontSize={12}>{tickVal}B</text>
    <text x={textYXOffset} y={midBottom + textYYOffset} fill={strokeColor} fontSize={12}>{tickVal}B</text>
    <line x1={0} y1={midTop} x2={5} y2={midTop} stroke={strokeColor} strokeWidth={1}/>
    <line x1={0} y1={midBottom} x2={5} y2={midBottom} stroke={strokeColor} strokeWidth={1}/>
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
      {drawYLabels(2000, height)}
    </svg>
  )

}

DualLineGraph.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
}