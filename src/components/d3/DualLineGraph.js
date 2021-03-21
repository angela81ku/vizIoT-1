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

  const xSkip = (end - start) / ((ticks * 10) - 1);
  const skipPos = [];
  for (let i = 0; i < ticks; ++i) {
    skipPos[i] = {
      pos: end - (i * xSkip * 10),
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
  const pointWidth = width / (29);
  let pointStr = '';
  const diff = 30 - data.length;
  for (let i = data.length - 1; i >= 0; --i) {

    let relativeY = halfHeight;
    if (isSent) { relativeY = halfHeight - (maxMult * data[i]); }
    else { relativeY = height - (maxMult * data[i]); }

    const relativeX = pointWidth * (i + diff);

    pointStr += relativeX + ',' + relativeY + ' ';
  }

  // manually add polygon points for fill using existing string
  let fillStr = pointStr;
  // prepend first point (leftmost)
  fillStr = '0,' + halfHeight + ' ' + fillStr;
  // append last point (rightmost)
  fillStr += width + ',' + halfHeight

  return <g>
    <polyline
      fill='none'
      stroke={color}
      strokeWidth='1'
      points={pointStr}
    />
    <polyline
      fill={color}
      opacity={0.3}
      stroke='transparent'
      points={fillStr}
    />
  </g>
}

export const DualLineGraph = ({
  height,
  width,
  data,
}) => {

  const view = `0 0 ${width} ${height}`
  const xAxisStart = 0;
  const xAxisEnd = width;
  const xAxisYPos = (height / 2);

  // console.log(data)

  const sent = [];
  const received = [];
  let max = 0;
  for (let i = 0; i < data.length; ++i) {
    const currSent = data[i][0];
    const currReceived = data[i][1];
    max = Math.max(max, currSent, currReceived)
    sent.push(data[i][0]);
    received.push(data[i][1]);
  }

  return (
    <svg viewBox={view}>
      {drawX(xAxisStart, xAxisEnd, xAxisYPos)}
      {drawXLabels(3, xAxisStart, xAxisEnd, xAxisYPos)}
      {drawYLabels(max, height)}
      {drawLine(sent, max, height, width, 'red', true)}
      {drawLine(received, max, height, width, 'blue', false)}
    </svg>
  )
}

DualLineGraph.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
}