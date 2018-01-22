import React from 'react';

class CardWrapper extends React.Component {
  CardWrapper(props) {
    this.props = props;
  }

  render() {
    return (
      <div className={"cardWrapper"}>
        {this.props.children}
      </div>
    );
  }
}

export default CardWrapper;