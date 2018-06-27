'use es6';

const fontStyles = {
  H0: {
    size: 5.5, // rem
    weight: 800,
  },
  H1: {
    size: 3.2,
  },
  H2: {
    size: 2.4,
  },
  H3: {
    size: 2.2,
  },
  H4: {
    size: 2.0,
    distance: 0.5, // rem
  },
  H5: {
    size: 1.6,
    weight: 'normal',
    distance: 1.0,
  },
  H6: {
    size: 1.4,
    weight: 600,
    distance: 0.5,
  },
  Paragraph: {
    size: 1.2,
    weight: 'normal',
  },
};

const convertToStyleString = setting => {
  const { size, weight, distance } = setting;
  return `
    ${size ? `font-size: ${size}rem` : ''};
    ${weight ? `font-weight: ${weight}` : ''};
    ${distance ? `margin-bottom: ${distance}` : ''};
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
