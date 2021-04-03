
function initSocketIO(http) {

  const Server = require('socket.io');
  const io = new Server(http)
  const TcpDataDa = require('./api/tcpData/tcpData.da')


//
// io.on('connection', function(socket){
//   console.log('a user connected');
//   socket.on('chat message', function(msg){
//     console.log('message: ' + msg);
//   });
//
// });

  const chat = io
    .of('/chat')

  chat.on('connection', function (socket) {
    // console.log('a cat user connected');
    socket.on('/chat/message', function(data) {
      // chat.emit('/chat/message', data)
      // socket.broadcast.emit('/chat/message', data);

      // console.log(data)
    })
    socket.on('/total/count', function(data) {
      // chat.emit('/chat/message', data)
      // socket.broadcast.emit('/chat/message', data);

      // console.log(data)
    })
    socket.on('/total/count/500ms', function(data) {
      // chat.emit('/chat/message', data)
      // socket.broadcast.emit('/chat/message', data);

      // console.log(data)
    })

    //
    // socket.emit('a message', {
    //   that: 'only',
    //   '/chat': 'will get'
    // });
    // chat.emit('a message', {
    //   everyone: 'in',
    //   '/chat': 'will get'
    // });
  });


  const interval = 1000
  // setInterval(async () => {
  //   const result = await TcpDataDa.getRecentDataWithinNSeconds(interval)
  //   chat.emit('/chat/message', result);
  // }, interval)

  setInterval(async () => {
    const result = await TcpDataDa.getTotalCountFromStartOfTheDay()
    // console.log(result)
    chat.emit('/total/count', result);
  }, interval)

  setInterval(async () => {
    const result = await TcpDataDa.getTotalCountOfRecentDataWithinNSeconds(interval)
    // console.log(result)
    chat.emit('/total/count/1s', result);
  }, interval)

 setInterval(async () => {
    const result = await TcpDataDa.getTotalSizeFromStartOfTheDay(interval)
    // console.log(result)
    chat.emit('/total/size', result);
  }, interval)


  setInterval(async () => {
    const result = await TcpDataDa.getTotalSizeOfRecentDataWithinNSeconds(interval)
    // console.log(result)
    chat.emit('/total/size/1s', result);
  }, interval)


  setInterval(async () => {
    const result = await TcpDataDa.getAggregateMacAddressSizeDataWithinNSeconds(interval)
    // console.log(result)
    chat.emit('/individual/size/1s', result);
  }, interval)

  setInterval(async () => {
    const result = await TcpDataDa.getAggregateMacAddressSizeDataFromStartOfTheDay()
    // console.log(result)
    chat.emit('/individual/size', result);
  }, interval)

  const tenMinutes = 10 * 60 * 1000

  setInterval(async () => {
    const result = await TcpDataDa.getTotalSizeOfRecentDataWithinNSeconds(tenMinutes)
    // console.log(result)
    chat.emit('/total/size/10min', result);
  }, interval)


  setInterval(async () => {
    const result = await TcpDataDa.getTotalCountOfRecentDataWithinNSeconds(tenMinutes)
    // console.log(result)
    chat.emit('/total/count/10min', result);
  }, interval)

  const oneMinute = 1 * 60 * 1000

  setInterval(async () => {
    const result = await TcpDataDa.getTotalSizeOfRecentDataWithinNSeconds(oneMinute)
    // console.log(result)
    chat.emit('/total/size/1min', result);
  }, interval)


  setInterval(async () => {
    const result = await TcpDataDa.getTotalCountOfRecentDataWithinNSeconds(oneMinute)
    // console.log(result)
    chat.emit('/total/count/1min', result);
  }, interval)

  setInterval(async () => {
    // console.log('starting get');
    const result = await TcpDataDa.getAggregateSentReceivedDataWithinNSeconds(interval);

    // shear total off of the metrics for live line graph
    result.size = result.size.slice(1);

    chat.emit('/total/IO/1s', result);
    // chat.emit('/total/IO/metric/1s', tempMetric);
  }, interval)

  setInterval(async () => {
    // console.log('starting get');
    const result = await TcpDataDa.getAggregateSentReceivedDataWithinNSeconds(interval * 60);

    chat.emit('/total/IO/metric/1s', result);
  }, interval)

  // send top 3 devices for IO here
  setInterval(async () => {

    const secondData = TcpDataDa.getDeviceSentReceivedDataWithinNSeconds(interval);
    const minuteData = TcpDataDa.getDeviceSentReceivedDataWithinNSeconds(interval * 30);

    const awaitVals = await Promise.all([secondData, minuteData]);
    const second = awaitVals[0];
    const minute = awaitVals[1];

    const devices = [];

    Object.keys(minute.deviceData).forEach(d => {
      const secondDevice = second.deviceData[d];
      if (secondDevice) {
        devices.push({
          macAddress: d,
          velocity: 0,
          totalTraffic: minute.deviceData[d].total,
          inTraffic: minute.deviceData[d].received,
          outTraffic: minute.deviceData[d].sent,
          data: {
            startMS: second.startMS,
            endMS: second.endMS,
            size: [secondDevice.received, secondDevice.sent],
          }
          ,
        })
      } else {
        devices.push({
          macAddress: d,
          velocity: 0,
          totalTraffic: minute.deviceData[d].total,
          inTraffic: minute.deviceData[d].received,
          outTraffic: minute.deviceData[d].sent,
          data: {
            startMS: second.startMS,
            endMS: second.endMS,
            size: [0, 0],
          },
        })
      }
    })

    devices.sort((a, b) => { return a.totalTraffic - b.totalTraffic })
    const sortedDevices = devices.slice(-3);

    const deviceData = {
      deviceData: sortedDevices,
    }

    chat.emit('/data/top3/IO/1s', deviceData);
  }, interval)


// const news = io
//   .of('/news')
//   .on('connection', function (socket) {
//     socket.emit('item', { news: 'item' });
//   });

}

module.exports = {
  initSocketIO,
}
