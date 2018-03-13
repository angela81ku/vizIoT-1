'use es6';

import React from 'react';
import PropTypes from 'prop-types';

const SectionTitle = ({ icon, title }) => (
  <h5 className="wide-letter sectionTitle">
    {icon ? <i className="material-icons m-right-2">{icon}</i> : null}
    {title}
  </h5>
);

SectionTitle.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default SectionTitle;
