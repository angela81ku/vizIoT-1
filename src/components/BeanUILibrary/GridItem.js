'use es6';

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getProp } from 'UIBean/UtilGet';

const GridItemWrapper = styled.div`
  overflow: ${getProp('overflow')};
  grid-column: ${getProp('column')};
  grid-row: ${getProp('row')};
`;

const GridItem = props => {
  const { children, ...rest } = props;
  return <GridItemWrapper {...rest}>{children}</GridItemWrapper>;
};

GridItem.defaultProps = {
  overflow: 'hidden',
  column: 'auto',
  row: 'auto',
};

GridItem.propTypes = {
  overflow: PropTypes.string,
  column: PropTypes.string,
  row: PropTypes.string,
};

export default GridItem;
