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

const drawLine = (data, max, height, width, color, isSent) => {

  const halfHeight = height / 2;
  const maxMult = halfHeight / (max * 1.0);
  const pointWidth = width / data.length;
  let pointStr = '';
  for (let i = 0; i < data.length; ++i) {

    let relativeY = halfHeight;
    if (isSent) { relativeY = halfHeight - (maxMult * data[i]); }
    else { relativeY = height - (maxMult * data[i]); }

    const relativeX = pointWidth * (i + 1);

    pointStr += relativeX + ',' + relativeY + ' ';
  }

  return <polyline
    fill='none'
    stroke={color}
    strokeWidth='1'
    points={pointStr}
  />
}

export const DualLineGraph = ({
  height,
  width,
}) => {

  const view = `0 0 ${width} ${height}`
  const xAxisStart = 0;
  const xAxisEnd = width;
  const xAxisYPos = (height / 2);

  const sent = [];
  const received = [];
  for (let i = 0; i < 30; i++) {
    const a = Math.floor(Math.random() * 2000);
    const b = Math.floor(Math.random() * 2000);
    sent.push(a);
    received.push(b);
  }

  return (
    <svg viewBox={view}>
      {drawX(xAxisStart, xAxisEnd, xAxisYPos)}
      {drawXLabels(3, xAxisStart, xAxisEnd, xAxisYPos)}
      {drawYLabels(2000, height)}
      {drawLine(sent, 2000, height, width, 'red', true)}
      {drawLine(received, 2000, height, width, 'blue', false)}
    </svg>
  )
}

DualLineGraph.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
}