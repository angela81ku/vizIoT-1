'use es6';

import {ScreenBreakPoints} from 'UIBean/Breakpoints';
import {mediaQuery} from 'UIBean/functional-css/layout';
import {Typography} from 'UIBean/definitions/typography'

const generateResponsiveSizing = sizeListing => {
  return Object.keys(sizeListing).reduce(
    (str, key) =>
      str.concat(mediaQuery(key, true, `font-size: ${sizeListing[key]}rem;`)),
    ''
  );
};

const convertToStyleString = setting => {
  const {size, weight, distance} = setting;
  return `
    ${weight ? `font-weight: ${weight};` : ''}
    ${distance ? `margin-bottom: ${distance}rem;` : ''}
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

export const JUMBO = convertToStyleString(Typography['JUMBO']);
export const H0 = convertToStyleString(Typography['H0']);
export const H1 = convertToStyleString(Typography['H1']);
export const H2 = convertToStyleString(Typography['H2']);
export const H3 = convertToStyleString(Typography['H3']);
export const H4 = convertToStyleString(Typography['H4']);
export const H5 = convertToStyleString(Typography['H5']);
export const H6 = convertToStyleString(Typography['H6']);

export const Paragraph = convertToStyleString(Typography['Paragraph']);

export const TypographyStyles = generateDefaultStyles(Typography);
