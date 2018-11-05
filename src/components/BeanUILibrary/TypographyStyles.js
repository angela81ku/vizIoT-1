'use es6';

import { ScreenBreakPoints } from 'UIBean/Breakpoints';

/**
 * All size unites in rem.
 */
const fontStyles = {
  H0: {
    size: {
      xs: 6.4,
    },
    weight: 800,
  },
  H1: {
    size: {
      xs: 4.2,
    },
  },
  H2: {
    size: {
      xs: 3.2,
    },
  },
  H3: {
    size: {
      xs: 2.4,
    },
  },
  H4: {
    size: {
      xs: 2.0,
    },
    distance: 0.5,
  },
  H5: {
    size: {
      xs: 1.8,
    },
    weight: 'normal',
    distance: 1.0,
  },
  H6: {
    size: {
      xs: 1.4,
      md: 1.5,
      xl: 1.8,
    },
    weight: 600,
    distance: 0.5,
  },
  Paragraph: {
    size: {
      xs: 1.4,
    },
    weight: 'normal',
  },
};

const mediaQuery = (screenSize, styleStr) => `
  @media only screen and (min-width: ${ScreenBreakPoints[screenSize] /
    10.0}rem) {
    ${styleStr}
  }
`;

const generateResponsiveSizing = sizeListing => {
  return Object.keys(sizeListing).reduce(
    (str, key) =>
      str.concat(mediaQuery(key, `font-size: ${sizeListing[key]}rem;`)),
    ''
  );
};

const convertToStyleString = setting => {
  const { size, weight, distance } = setting;
  return `
    ${weight ? `font-weight: ${weight}` : ''};
    ${distance ? `margin-bottom: ${distance}` : ''}rem;
    ${generateResponsiveSizing(size)}
  `;
};

const generateDefaultStyles = settings => {
  return Object.keys(settings).reduce(
    (acc, key) => ({
      [key]: convertToStyleString(settings[key]),
      ...acc,
    }),
    {}
  );
};

export default generateDefaultStyles(fontStyles);
