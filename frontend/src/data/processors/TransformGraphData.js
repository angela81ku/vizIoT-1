import moment from "moment";

export const transformData = data => {

  if (data && data.length) {
    const catchUpSeconds = 2;
    return data.map(({startMS, size: sizeData}) => {
      const packetData = [];
      if (sizeData.length) {
        sizeData.forEach((yData) => {
          packetData.push({
            xData: moment
              .unix(startMS / 1000.0)
              .add(catchUpSeconds, 'seconds')
              .toDate(),
            yData,
          })
        })
      } else {
        const yData = sizeData;
        packetData.push({
          xData: moment
            .unix(startMS / 1000.0)
            .add(catchUpSeconds, 'seconds')
            .toDate(),
          yData,
        })
      }
      return packetData;
    });
  }
  return [];
};