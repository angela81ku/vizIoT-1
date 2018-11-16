import React from 'react';
import PropTypes from 'prop-types';

/**
 * Used for auto fitting components. Accepts a single child, and injects dynamic dimension props to it.
 * TODO try using HoC instead
 */
class AutoFitComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    containerWidth: 0,
    containerHeight: 0,
  };

  fitChartToContainer = () => {
    this.setState(() => {
      return {
        containerWidth: this.containerElement.getBoundingClientRect().width,
        containerHeight: this.containerElement.getBoundingClientRect().height,
      };
    });
  };

  componentDidMount() {
    this.fitChartToContainer();
    window.addEventListener('resize', this.fitChartToContainer);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.fitChartToContainer);
  }

  renderResizableChild(Child) {
    return React.cloneElement(Child, {
      dimension: {
        width: this.state.containerWidth,
        height: this.state.containerHeight,
      },
    });
  }

  render() {
    const { children } = this.props;

    const shouldRenderChart =
      this.state.containerWidth &&
      this.state.containerHeight &&
      React.Children.count(children) === 1;

    return (
      <div
        ref={el => {
          this.containerElement = el;
        }}
        className={this.props.className}
      >
        {shouldRenderChart && this.renderResizableChild(children)}
      </div>
    );
  }
}

AutoFitComponent.propTypes = {
  className: PropTypes.string,
};

export default AutoFitComponent;
