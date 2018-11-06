'use es6';

import { ScreenBreakPoints } from 'UIBean/Breakpoints';

export const mediaQuery = (screenSize, onMinimum, styleStr) => `
  @media only screen and (${onMinimum ? 'min' : 'max'}-width: ${ScreenBreakPoints[screenSize] /
10.0}rem) {
    ${styleStr}
  }
`;

// Responsive:
export const _hideWhen = size => `
  ${mediaQuery(size, false, 'display: none;')}
`;

// Layout:
export const _sticky = () => 'position: fixed';

// Spacing:
export const _zeroSpacing = () => `
  margin: 0;
  padding: 0;
`;

// Text:

export const _wideLetter = () => `
  letter-spacing: 4px;
`;

// TODO verify
export const _truncateParent = () => `
  flex: 1;
  min-width: 0;
`;

// TODO verify
export const _truncate = () => `
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

