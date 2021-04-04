module.exports = {
  removeLeadingZeros,
}

function removeLeadingZeros(macAddress) {
  const macVals = macAddress.split(':');
  for (let i = 0; i < macVals.length; ++i) {
    if (macVals[i].length === 2 && macVals[i][0] === '0') {
      macVals[i] = macVals[i][1];
    }
  }
  return macVals.join(':');
}
