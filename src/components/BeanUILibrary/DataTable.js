'use es6';

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { getProp } from 'UIBean/UtilGet';
import { Column, Table, defaultTableRowRenderer } from 'react-virtualized'
import 'react-virtualized/styles.css';
import { H5 } from 'UIBean/functional-css/TypographyStyles';

const StyledTable = styled(Table)`
  & > .ReactVirtualized__Table__headerRow {
    text-transform: initial;
    font-weight: 400;
    ${H5}
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


class DataTable extends React.Component {

  constructor(props) {
    super(props);
    this.testTableRef = React.createRef();
  }

  state = {
    scrollRow: 0
  };

  componentDidUpdate() {
    if (this.state.scrollRow !== this.props.rowData.length - 1) {
      console.log(this.state.scrollRow);
      console.log(this.props.rowData.length);
      this.setState({ scrollRow: this.props.rowData.length - 1 });
    }
  }

  render() {
    const { headerData, rowData } = this.props;
    // const rowRenderer = ({index,       // Index of row
    //                       columns,
    //                        className,
    //                      isScrolling, // The List is currently being scrolled
    //                      isVisible,   // This row is visible within the List (eg it is not an overscanned row)
    //                      key,         // Unique key within array of rendered rows
    //                      parent,      // Reference to the parent List (instance)
    //                      style} ) => {
    //   const row = rowData[index];
    //   // debugger
    //   return (
    //     <div className={className} key={row[key]} role="row" style={style}>
    //       {columns}
    //     </div>
    //   );
    // };

    console.log(rowData);
    return (
      <StyledTable
        ref={this.testTableRef}
        className="logger-table"
        height={700}
        width={760}
        headerHeight={20}
        rowHeight={50}
        rowCount={rowData.length}
        scrollToRow={this.state.scrollRow}
        // rowRenderer={rowRenderer}
        rowGetter={({ index }) => rowData[index]}
      >
        {
          headerData.map(({ label, key, width }) => {
            return <Column key={key} label={label} dataKey={key} width={width} />
          })
        }
      </StyledTable>
    );
  }
}

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