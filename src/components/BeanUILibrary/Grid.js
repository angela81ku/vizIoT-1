import React from "react";

class Grid extends React.Component {
  Grid(props) {
    this.props = props;
  }

  render() {
    return (
      <div className="flex-row">
        {this.props.children}
      </div>
    );
  }
}

export default Grid;