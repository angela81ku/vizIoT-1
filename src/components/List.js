'use es6';

import React from 'react';
import FlipMove from 'react-flip-move';

export default ({ children }) => {
  return (
    <FlipMove duration={750} easing="ease-out">
      {children}
    </FlipMove>
  );
};
