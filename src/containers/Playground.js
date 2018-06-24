'use es6';

import React from 'react';

export default class Playground extends React.Component {
  render() {
    const stuff = (
      <div className="flex-parent">
        <div className="child1">
          <h3 id="title">
            Section Title Section Title Section Title Section Title Section
            Title Section Title Section Title Section Title Section Title
            Section Title Section Title Section Title Section Title Section
            Title
          </h3>
        </div>
        <div className="child2" />
      </div>
    );

    return stuff;
  }
}
