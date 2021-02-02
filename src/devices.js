const phidget = require('phidget22');

function log(msg) {
  console.log(`Devices: ${msg}`);
}

//----------------------------------------------------------------------------------------
// Manager / device discovery related
//----------------------------------------------------------------------------------------
function deviceAttached(d) {
  log(`****** Device Attached **********************************`);
  log(`Name: ${d.getDeviceName()} key: ${d.getKey()}`)
}  

function deviceDetached(d) {
  log(`****** Device Detached ***********************************`);
  log(`Name: ${d.getDeviceName()} key: ${d.getKey()}`)
}

async function channelAttached(c) {
  log(`====== Channel Attached =================================`);
  log(`Name: ${c.getDeviceName()} key: ${c.getKey()} Channel: ${c.getChannel()}`);
}

function channelDetatched(c) {
  log(`====== Channel Detached =================================`);
  log(`Name: ${c.getDeviceName()} key: ${c.getKey()} Channel: ${c.getChannel()}`);
}

function monitorDevices() {
  var man = new phidget.Manager({
    onDeviceAttach: function (device) { deviceAttached(device); },
    onDeviceDetach: function (device) { deviceDetached(device); },
    onAttach: function (channel) { channelAttached(channel); },
    onDetach: function (channel) { channelDetatched(channel); }
  });
  man.open();
}

module.exports = monitorDevices;