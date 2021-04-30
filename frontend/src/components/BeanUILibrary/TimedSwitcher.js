'use es6';

import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class TimedSwitcher extends Component {
  constructor(props) {
    super(props);

    const {options} = this.props;

    if (options && options.length > 1) {
      const {delay} = options[0];
      const timer = setTimeout(() => {
        this.rotateToNextIndex();
      }, delay);

      this.state = {
        currentOptionIndex: 0,
        timer,
      };
    }
  }

  rotateToNextIndex = () => {
    const {options, onSwitch} = this.props;

    // Clear previous timer
    const {timer} = this.state;
    timer && clearTimeout(timer);

    // Info about the next index
    let currentOptionIndex = this.state.currentOptionIndex;
    const newIndex = ++currentOptionIndex % options.length;
    const {delay} = options[newIndex];

    // Add new timer
    const newTimer = setTimeout(() => {
      this.rotateToNextIndex();
    }, delay);

    // Update date
    this.setState({currentOptionIndex: newIndex, timer: newTimer});

    onSwitch(newIndex);
  };

  render() {
    const {options} = this.props;
    const {currentOptionIndex} = this.state;
    if (
      options &&
      0 <= currentOptionIndex &&
      currentOptionIndex < options.length
    ) {
      return options[this.state.currentOptionIndex].value;
    }
    return null;
  }
}

TimedSwitcher.defaultProps = {
  options: [],
  onSwitch: () => {
  },
};

TimedSwitcher.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.node.isRequired,
      delay: PropTypes.number.isRequired,
    })
  ),
  onSwitch: PropTypes.func,
};
