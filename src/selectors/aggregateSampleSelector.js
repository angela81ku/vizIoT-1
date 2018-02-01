import moment from 'moment';

const mockData = {
  "data": {
    "1517009506": 1,
    "1517009538": 1,
    "1517009555": 2,
    "1517009556": 1,
    "1517009570": 1,
    "1517009602": 1,
    "1517009634": 1,
    "1517009666": 1,
    "1517009698": 1,
    "1517009730": 1,
    "1517009762": 1,
    "1517009794": 1,
    "1517009825": 1,
    "1517009856": 1,
    "1517009857": 1,
    "1517009889": 1,
    "1517011070": 1,
    "1517011103": 1,
    "1517011120": 2,
    "1517011121": 1,
    "1517011135": 1,
    "1517011166": 1,
    "1517011198": 1,
    "1517011230": 1,
    "1517011454": 1,
    "1517011486": 1,
    "1517011503": 2,
    "1517011504": 1,
    "1517011518": 1,
    "1517011550": 1,
    "1517011582": 1,
    "1517011614": 1,
    "1517011646": 1,
    "1517011678": 1
  }
}

export const selectAggregateSample = ({aggregateSample}) => {
  // let toReturn = mockData.data;
  let toReturn = aggregateSample.aggregatedTest && aggregateSample.aggregatedTest.data;
  console.log("in selectAggre");
  let reformattedData = Object
    .keys(toReturn).reduce((arr, time_stamp) => {
      const newArr = [...arr, {
        time_stamp: moment.unix(parseInt(time_stamp)),
        tally: toReturn[time_stamp]
      }];
      return newArr;
    }, []);
  return {
    "192.168.10.115:39490": reformattedData,
    "192.168.11.102:46611": reformattedData,
  }
};
