// From: https://stackoverflow.com/questions/35969656/how-can-i-generate-the-opposite-color-according-to-current-color
export function invertColor(hex, bw) {
  // return '#FFF';
  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
    throw new Error('Invalid HEX color.');
  }
  let r = parseInt(hex.slice(0, 2), 16),
    g = parseInt(hex.slice(2, 4), 16),
    b = parseInt(hex.slice(4, 6), 16);
  if (bw) {
    // http://stackoverflow.com/a/3943023/112731
    return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? '#000000' : '#FFFFFF';
  }
  // invert color components
  r = (255 - r).toString(16);
  g = (255 - g).toString(16);
  b = (255 - b).toString(16);
  // pad each with zeros and return
  return '#' + padZero(r) + padZero(g) + padZero(b);
}

export function padZero(str, len) {
  len = len || 2;
  var zeros = new Array(len).join('0');
  return (zeros + str).slice(-len);
}

// these colors are color-blind friendly
// please continue adding colorblind color schemes for accessibility purposes
const staticColors = [
  'rgb(204,51,17)',
  'rgb(0,119,187)',
  'rgb(238,51,119)',
  'rgb(51,187,238)',
  'rgb(238,119,51)',
  'rgb(0,153,136)',
]

// creates count number of colors
export function findColors(count) {

  const maxVal = 255;
  const jumpVal = Math.floor(maxVal / count);
  const colors = [];

  // use provided static colors either up to all provided static colors or requested colors
  for (let i = 0; i < staticColors.length && i < count; ++i) {
    colors.push(staticColors[i]);
  }

  // if there are more colors than what is provided in static colors, interpolate values
  for (let i = 0; i < count - staticColors.length; ++i) {
    const jump = i * jumpVal;
    const r = i * jump;
    const g = Math.floor(maxVal / 2)
    const b = maxVal - (jump)
    const colorString = 'rgb(' + r + ', ' + g + ', ' + b + ')';
    colors.push(colorString);
  }

  return colors;
}
