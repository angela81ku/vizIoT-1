'use es6';

import keyMirror from 'keymirror';

export const ScreenSizes = keyMirror({
  xs: null,
  sm: null,
  md: null,
  lg: null,
  xl: null,
});

/**
 * The following are SCREEN breakpoints, NOT container breakpoints.
 */
export const ScreenBreakPoints = {
  [ScreenSizes.xs]: 0,
  [ScreenSizes.sm]: 600,
  [ScreenSizes.md]: 1024,
  [ScreenSizes.lg]: 1440,
  [ScreenSizes.xl]: 1920,
  // tv: '1920 & 1',
};

export const ContainerBreakPoints = {
  [ScreenSizes.xs]: '544px',
  [ScreenSizes.sm]: '768px',
  [ScreenSizes.md]: '992px',
  [ScreenSizes.lg]: '1216px',
  xxl: '1440px',
  xxxl: '1664px',
};
