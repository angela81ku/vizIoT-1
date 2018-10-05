'use es6';

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { getProp } from 'UIBean/UtilGet';
import { Column, Table, defaultTableRowRenderer } from 'react-virtualized'
import 'react-virtualized/styles.css';
import TypographicStyles from 'UIBean/TypographyStyles';

const StyledTable = styled(Table)`
  & > .ReactVirtualized__Table__headerRow {
    text-transform: initial;
    font-weight: 400;
    font-size: ${TypographicStyles['H5']};
  }
  
  & .ReactVirtualized__Table__row {
    background: white;
    color: #48515d;
    .ReactVirtualized__Table__rowColumn {
      line-height: initial;    
    }
  }
  
  .ReactVirtualized__Table__rowColumn:first-child {
    color: #939dab;
  }
  
  .ReactVirtualized__Table__rowColumn:nth-child(2) {
    font-weight: 700;
  }
  
  .ReactVirtualized__Table__row:after {
    content: '';
    margin: auto;
    position: absolute;
    width: 90%;
    height: 1px;
    top: 98%;
    left: 5%;
    right: 5%;
    background: #b9b7b666;
  }
`;

const TableHeaderRow = styled.div`
`;

const HeaderItem = styled.div`
  width: ${getProp('width')};
`;

const DataTable = ({ headerData, rowData }) => {
  return (
    <StyledTable
      height={700}
      width={760}
      headerHeight={20}
      rowHeight={50}
      rowCount={rowData.length}
      rowGetter={({ index }) => rowData[index]}
    >
      {
        headerData.map(({ label, key, width }) => {
          return <Column key={key} label={label} dataKey={key} width={width} />
        })
      }
    </StyledTable>
  );

  // return (
  //   <TableContainer>
  //     <TableHeaderRow>{
  //       headerData.map(({ title, width }) => <HeaderItem width={width}>{title}</HeaderItem>)
  //     }</TableHeaderRow>
  //     {children}
  //   </TableContainer>
  // );
};

DataTable.propTypes = {
  headerData: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    key: PropTypes.string,
    width: PropTypes.number,
  })).isRequired,
  rowData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)).isRequired,
  children: PropTypes.any,
};

export default DataTable;