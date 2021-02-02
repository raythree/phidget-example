const connectAll = require('./connections');
const monitorDevices = require('./devices');

// Put the IP or hostname of any phidget SBC or VINT Hub
const servers = [
  'phidgetsbc.local',
  'hub5000.local'
];

connectAll(servers);

monitorDevices();