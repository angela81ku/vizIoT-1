'use es6';

import React from 'react';
import styled from 'styled-components';

const get = key => props => props[key];

const GridDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(
    ${get('numCols')},
    minmax(${get('min')}, ${get('max')})
  );
`;

const Grid = ({
  columnSettings: { number: numCols, sizes: widthPriority },
  rowSettings: { number: numRows, sizes: heightPriority },
  children,
}) => {
  return (
    <GridDiv numCols={numCols} min={widthPriority[0]} max={widthPriority[1]}>
      {children}
    </GridDiv>
  );
};

export default Grid;
