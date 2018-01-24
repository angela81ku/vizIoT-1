import NetworkState from '../constants/NetworkState'
import moment from 'moment'
import myData4 from './testLog4.json';
import myData5 from './testLog5.json';

const testLog = {
  'dst_ip': '52.199.108.216',
  'dst_port': '80',
  'host': 'info.cspserver.net',
  'http_method': 'GET',
  'src_ip': '192.168.10.115',
  'src_port': '39490',
  'time_stamp': moment('1512765114.959939', 'X')
}

const testLog2 = {
  'dst_ip': '52.199.108.216',
  'dst_port': '80',
  'host': 'info.cspserver.net',
  'http_method': 'GET',
  'src_ip': '192.168.10.115',
  'src_port': '39490',
  'time_stamp': moment('1512765116.959939', 'X')
}

const testLog3 = [{
  'dst_ip': '52.199.108.216',
  'dst_port': '80',
  'host': 'info.cspserver.net',
  'http_method': 'GET',
  'src_ip': '192.168.10.115',
  'src_port': '39490',
  'time_stamp': '1512765114.959939'
},
  {
    'dst_ip': '52.199.108.216',
    'dst_port': '80',
    'host': 'info.cspserver.net',
    'http_method': 'GET',
    'src_ip': '192.168.10.115',
    'src_port': '39490',
    'time_stamp': '1512765147.096362'
  },
  {
    'dst_ip': '52.199.108.216',
    'dst_port': '80',
    'host': 'info.cspserver.net',
    'http_method': 'GET',
    'src_ip': '192.168.10.115',
    'src_port': '39490',
    'time_stamp': '1512765164.377303'
  },
  {
    'dst_ip': '52.197.195.62',
    'dst_port': '80',
    'host': 'info.cspserver.net',
    'http_method': 'GET',
    'src_ip': '192.168.10.115',
    'src_port': '51944',
    'time_stamp': '1512765164.494316'
  },
  {
    'dst_ip': '52.199.108.216',
    'dst_port': '80',
    'host': 'info.cspserver.net',
    'http_method': 'GET',
    'src_ip': '192.168.10.115',
    'src_port': '39490',
    'time_stamp': '1512765165.330442'
  },
  {
    'dst_ip': '52.199.108.216',
    'dst_port': '80',
    'host': 'info.cspserver.net',
    'http_method': 'GET',
    'src_ip': '192.168.10.115',
    'src_port': '39490',
    'time_stamp': '1512765178.979258'
  },
  {
    'dst_ip': '52.199.108.216',
    'dst_port': '80',
    'host': 'info.cspserver.net',
    'http_method': 'GET',
    'src_ip': '192.168.10.115',
    'src_port': '39490',
    'time_stamp': '1512765210.943031'
  },
  {
    'dst_ip': '52.199.108.216',
    'dst_port': '80',
    'host': 'info.cspserver.net',
    'http_method': 'GET',
    'src_ip': '192.168.10.115',
    'src_port': '39490',
    'time_stamp': '1512765242.872936'
  },
  {
    'dst_ip': '52.199.108.216',
    'dst_port': '80',
    'host': 'info.cspserver.net',
    'http_method': 'GET',
    'src_ip': '192.168.10.115',
    'src_port': '39490',
    'time_stamp': '1512765274.821182'
  },
  {
    'dst_ip': '52.199.108.216',
    'dst_port': '80',
    'host': 'info.cspserver.net',
    'http_method': 'GET',
    'src_ip': '192.168.10.115',
    'src_port': '39490',
    'time_stamp': '1512765306.834978'
  },
  {
    'dst_ip': '52.199.108.216',
    'dst_port': '80',
    'host': 'info.cspserver.net',
    'http_method': 'GET',
    'src_ip': '192.168.10.115',
    'src_port': '39490',
    'time_stamp': '1512765338.769152'
  },
  {
    'dst_ip': '52.199.108.216',
    'dst_port': '80',
    'host': 'info.cspserver.net',
    'http_method': 'GET',
    'src_ip': '192.168.10.115',
    'src_port': '39490',
    'time_stamp': '1512765370.668888'
  },
  {
    'dst_ip': '52.199.108.216',
    'dst_port': '80',
    'host': 'info.cspserver.net',
    'http_method': 'GET',
    'src_ip': '192.168.10.115',
    'src_port': '39490',
    'time_stamp': '1512765402.617216'
  },
  {
    'dst_ip': '52.199.108.216',
    'dst_port': '80',
    'host': 'info.cspserver.net',
    'http_method': 'GET',
    'src_ip': '192.168.10.115',
    'src_port': '39490',
    'time_stamp': '1512765434.541332'
  },
  {
    'dst_ip': '157.55.184.57',
    'dst_port': '80',
    'host': 'www.samsungotn.net',
    'http_method': 'GET',
    'src_ip': '192.168.10.115',
    'src_port': '48720',
    'time_stamp': '1512765465.701744'
  },
  {
    'dst_ip': '52.199.108.216',
    'dst_port': '80',
    'host': 'info.cspserver.net',
    'http_method': 'GET',
    'src_ip': '192.168.10.115',
    'src_port': '39490',
    'time_stamp': '1512765466.435288'
  },
  {
    'dst_ip': '52.199.108.216',
    'dst_port': '80',
    'host': 'info.cspserver.net',
    'http_method': 'GET',
    'src_ip': '192.168.10.115',
    'src_port': '39490',
    'time_stamp': '1512765498.574533'
  },
  {
    'dst_ip': '52.199.108.216',
    'dst_port': '80',
    'host': 'info.cspserver.net',
    'http_method': 'GET',
    'src_ip': '192.168.10.115',
    'src_port': '39490',
    'time_stamp': '1512765530.516048'
  },
  {
    'dst_ip': '52.199.108.216',
    'dst_port': '80',
    'host': 'info.cspserver.net',
    'http_method': 'GET',
    'src_ip': '192.168.10.115',
    'src_port': '39490',
    'time_stamp': '1512765562.477355'
  },
  {
    'dst_ip': '52.199.108.216',
    'dst_port': '80',
    'host': 'info.cspserver.net',
    'http_method': 'GET',
    'src_ip': '192.168.10.115',
    'src_port': '39490',
    'time_stamp': '1512765594.421327'
  },
  {
    'dst_ip': '52.199.108.216',
    'dst_port': '80',
    'host': 'info.cspserver.net',
    'http_method': 'GET',
    'src_ip': '192.168.10.115',
    'src_port': '39490',
    'time_stamp': '1512765626.403984'
  },
  {
    'dst_ip': '52.199.108.216',
    'dst_port': '80',
    'host': 'info.cspserver.net',
    'http_method': 'GET',
    'src_ip': '192.168.10.115',
    'src_port': '39490',
    'time_stamp': '1512765658.319468'
  },
  {
    'dst_ip': '52.199.108.216',
    'dst_port': '80',
    'host': 'info.cspserver.net',
    'http_method': 'GET',
    'src_ip': '192.168.10.115',
    'src_port': '39490',
    'time_stamp': '1512765690.413630'
  },
  {
    'dst_ip': '52.199.108.216',
    'dst_port': '80',
    'host': 'info.cspserver.net',
    'http_method': 'GET',
    'src_ip': '192.168.10.115',
    'src_port': '39490',
    'time_stamp': '1512765722.338083'
  },
  {
    'dst_ip': '52.199.108.216',
    'dst_port': '80',
    'host': 'info.cspserver.net',
    'http_method': 'GET',
    'src_ip': '192.168.10.115',
    'src_port': '39490',
    'time_stamp': '1512765754.317086'
  },
  {
    'dst_ip': '157.55.184.57',
    'dst_port': '80',
    'host': 'www.samsungotn.net',
    'http_method': 'GET',
    'src_ip': '192.168.10.115',
    'src_port': '48723',
    'time_stamp': '1512765766.479485'
  },
  {
    'dst_ip': '52.199.108.216',
    'dst_port': '80',
    'host': 'info.cspserver.net',
    'http_method': 'GET',
    'src_ip': '192.168.10.115',
    'src_port': '39490',
    'time_stamp': '1512765786.245944'
  },
  {
    'dst_ip': '52.199.108.216',
    'dst_port': '80',
    'host': 'info.cspserver.net',
    'http_method': 'GET',
    'src_ip': '192.168.10.115',
    'src_port': '39490',
    'time_stamp': '1512765818.169329'
  },
  {
    'dst_ip': '52.199.108.216',
    'dst_port': '80',
    'host': 'info.cspserver.net',
    'http_method': 'GET',
    'src_ip': '192.168.10.115',
    'src_port': '39490',
    'time_stamp': '1512765850.033841'
  },
  {
    'dst_ip': '52.199.108.216',
    'dst_port': '80',
    'host': 'info.cspserver.net',
    'http_method': 'GET',
    'src_ip': '192.168.10.115',
    'src_port': '39490',
    'time_stamp': '1512765881.970341'
  },
  {
    'dst_ip': '52.199.108.216',
    'dst_port': '80',
    'host': 'info.cspserver.net',
    'http_method': 'GET',
    'src_ip': '192.168.10.115',
    'src_port': '39490',
    'time_stamp': '1512765914.011939'
  },
  {
    'dst_ip': '52.199.108.216',
    'dst_port': '80',
    'host': 'info.cspserver.net',
    'http_method': 'GET',
    'src_ip': '192.168.10.115',
    'src_port': '39490',
    'time_stamp': '1512765945.966229'
  },
  {
    'dst_ip': '52.199.108.216',
    'dst_port': '80',
    'host': 'info.cspserver.net',
    'http_method': 'GET',
    'src_ip': '192.168.10.115',
    'src_port': '39490',
    'time_stamp': '1512765977.923524'
  },
  {
    'dst_ip': '52.199.108.216',
    'dst_port': '80',
    'host': 'info.cspserver.net',
    'http_method': 'GET',
    'src_ip': '192.168.10.115',
    'src_port': '39490',
    'time_stamp': '1512766009.769664'
  },
  {
    'dst_ip': '52.199.108.216',
    'dst_port': '80',
    'host': 'info.cspserver.net',
    'http_method': 'GET',
    'src_ip': '192.168.10.115',
    'src_port': '39490',
    'time_stamp': '1512766041.728245'
  },
  {
    'dst_ip': '52.199.108.216',
    'dst_port': '80',
    'host': 'info.cspserver.net',
    'http_method': 'GET',
    'src_ip': '192.168.10.115',
    'src_port': '39490',
    'time_stamp': '1512766073.668011'
  },
  {
    'dst_ip': '52.199.108.216',
    'dst_port': '80',
    'host': 'info.cspserver.net',
    'http_method': 'GET',
    'src_ip': '192.168.10.115',
    'src_port': '39490',
    'time_stamp': '1512766105.606447'
  },
  {
    'dst_ip': '52.199.108.216',
    'dst_port': '80',
    'host': 'info.cspserver.net',
    'http_method': 'GET',
    'src_ip': '192.168.10.115',
    'src_port': '39490',
    'time_stamp': '1512766137.571208'
  },
  {
    'dst_ip': '52.199.108.216',
    'dst_port': '80',
    'host': 'info.cspserver.net',
    'http_method': 'GET',
    'src_ip': '192.168.10.115',
    'src_port': '39490',
    'time_stamp': '1512766169.525532'
  },
  {
    'dst_ip': '52.199.108.216',
    'dst_port': '80',
    'host': 'info.cspserver.net',
    'http_method': 'GET',
    'src_ip': '192.168.10.115',
    'src_port': '39490',
    'time_stamp': '1512766201.458999'
  },
  {
    'dst_ip': '52.199.108.216',
    'dst_port': '80',
    'host': 'info.cspserver.net',
    'http_method': 'GET',
    'src_ip': '192.168.10.115',
    'src_port': '39490',
    'time_stamp': '1512766233.355592'
  },
  {
    'dst_ip': '52.199.108.216',
    'dst_port': '80',
    'host': 'info.cspserver.net',
    'http_method': 'GET',
    'src_ip': '192.168.10.115',
    'src_port': '39490',
    'time_stamp': '1512766265.264395'
  },
  {
    'dst_ip': '52.199.108.216',
    'dst_port': '80',
    'host': 'info.cspserver.net',
    'http_method': 'GET',
    'src_ip': '192.168.10.115',
    'src_port': '39490',
    'time_stamp': '1512766297.212386'
  },
  {
    'dst_ip': '52.199.108.216',
    'dst_port': '80',
    'host': 'info.cspserver.net',
    'http_method': 'GET',
    'src_ip': '192.168.10.115',
    'src_port': '39490',
    'time_stamp': '1512766329.368878'
  },
  {
    'dst_ip': '52.199.108.216',
    'dst_port': '80',
    'host': 'info.cspserver.net',
    'http_method': 'GET',
    'src_ip': '192.168.10.115',
    'src_port': '39490',
    'time_stamp': '1512766361.338395'
  },
  {
    'dst_ip': '52.199.108.216',
    'dst_port': '80',
    'host': 'info.cspserver.net',
    'http_method': 'GET',
    'src_ip': '192.168.10.115',
    'src_port': '39490',
    'time_stamp': '1512766393.264835'
  },
  {
    'dst_ip': '52.199.108.216',
    'dst_port': '80',
    'host': 'info.cspserver.net',
    'http_method': 'GET',
    'src_ip': '192.168.10.115',
    'src_port': '39490',
    'time_stamp': '1512766425.211118'
  },
  {
    'dst_ip': '52.199.108.216',
    'dst_port': '80',
    'host': 'info.cspserver.net',
    'http_method': 'GET',
    'src_ip': '192.168.10.115',
    'src_port': '39490',
    'time_stamp': '1512766457.269148'
  },
  {
    'dst_ip': '52.199.108.216',
    'dst_port': '80',
    'host': 'info.cspserver.net',
    'http_method': 'GET',
    'src_ip': '192.168.10.115',
    'src_port': '39490',
    'time_stamp': '1512766489.223454'
  },
  {
    'dst_ip': '52.199.108.216',
    'dst_port': '80',
    'host': 'info.cspserver.net',
    'http_method': 'GET',
    'src_ip': '192.168.10.115',
    'src_port': '39490',
    'time_stamp': '1512766521.167202'
  },
  {
    'dst_ip': '52.199.108.216',
    'dst_port': '80',
    'host': 'info.cspserver.net',
    'http_method': 'GET',
    'src_ip': '192.168.10.115',
    'src_port': '39490',
    'time_stamp': '1512766553.139099'
  },
  {
    'dst_ip': '52.199.108.216',
    'dst_port': '80',
    'host': 'info.cspserver.net',
    'http_method': 'GET',
    'src_ip': '192.168.10.115',
    'src_port': '39490',
    'time_stamp': '1512766585.109356'
  },
  {
    'dst_ip': '52.199.108.216',
    'dst_port': '80',
    'host': 'info.cspserver.net',
    'http_method': 'GET',
    'src_ip': '192.168.10.115',
    'src_port': '39490',
    'time_stamp': '1512766617.019392'
  },
  {
    'dst_ip': '52.199.108.216',
    'dst_port': '80',
    'host': 'info.cspserver.net',
    'http_method': 'GET',
    'src_ip': '192.168.10.115',
    'src_port': '39490',
    'time_stamp': '1512766648.964821'
  },
  {
    'dst_ip': '52.199.108.216',
    'dst_port': '80',
    'host': 'info.cspserver.net',
    'http_method': 'GET',
    'src_ip': '192.168.10.115',
    'src_port': '39490',
    'time_stamp': '1512766680.909552'
  },
  {
    'dst_ip': '52.199.108.216',
    'dst_port': '80',
    'host': 'info.cspserver.net',
    'http_method': 'GET',
    'src_ip': '192.168.10.115',
    'src_port': '39490',
    'time_stamp': '1512766712.719859'
  },
  {
    'dst_ip': '52.199.108.216',
    'dst_port': '80',
    'host': 'info.cspserver.net',
    'http_method': 'GET',
    'src_ip': '192.168.10.115',
    'src_port': '39490',
    'time_stamp': '1512766744.714365'
  },
  {
    'dst_ip': '52.199.108.216',
    'dst_port': '80',
    'host': 'info.cspserver.net',
    'http_method': 'GET',
    'src_ip': '192.168.10.115',
    'src_port': '39490',
    'time_stamp': '1512766776.654975'
  },
  {
    'dst_ip': '52.199.108.216',
    'dst_port': '80',
    'host': 'info.cspserver.net',
    'http_method': 'GET',
    'src_ip': '192.168.10.115',
    'src_port': '39490',
    'time_stamp': '1512766808.599843'
  },
  {
    'dst_ip': '52.199.108.216',
    'dst_port': '80',
    'host': 'info.cspserver.net',
    'http_method': 'GET',
    'src_ip': '192.168.10.115',
    'src_port': '39490',
    'time_stamp': '1512766840.559796'
  },
  {
    'dst_ip': '52.199.108.216',
    'dst_port': '80',
    'host': 'info.cspserver.net',
    'http_method': 'GET',
    'src_ip': '192.168.10.115',
    'src_port': '39490',
    'time_stamp': '1512766872.520043'
  }]

const testLog4 = myData4;
const testLog5 = myData5;

const defaultState = {
  logs: [testLog],
  mappedLogs: {
    '192.168.10.115:39490': testLog4,
    '192.168.11.102:46611': testLog5,
  },
  networkState: NetworkState.READY,
}

export default (state = defaultState, action) => {
  switch (action) {
    default:
      return state
  }
}