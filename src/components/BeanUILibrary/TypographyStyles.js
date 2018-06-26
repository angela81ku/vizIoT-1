'use es6';

const fontStyles = {
  h0: {
    size: 5.5, // rem
    weight: 800,
  },
  h1: {
    size: 3.2,
  },
  h2: {
    size: 2.4,
  },
  h3: {
    size: 2.2,
  },
  h4: {
    size: 2.0,
    distance: 0.5, // rem
  },
  h5: {
    size: 1.6,
    weight: 'normal',
    distance: 1.0,
  },
  h6: {
    size: 1.4,
    weight: 600,
    distance: 0.5,
  },
};

const convertToStyleString = setting => {
  const { size, weight, distance } = setting;
  return `
    ${size ? `font-size: ${size}` : ''};
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
