import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class TruncateString extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {children, className, useFlex} = this.props;
    const content = <span className={classnames('truncateString', className)}>{children}</span>;

    if (useFlex) {
      return <span className="truncateStringParent">{content}</span>;
    }

    return content;
  }
}

TruncateString.propTypes = {
  useFlex: PropTypes.bool,
};

export default TruncateString;
