# Phidget Connection Example

This example demostrates a problem with detecting failed connections to SBC devices or WiFi VINT hubs. In production, our code runs on an SBC and uses Bonjour to detect all other networked Phidgets (WiFi VINT hubs). In developent, if running the code on a laptop, we also discover the SBC. Once the list of networked servers is found, we open connections to them, and then use the `phidget.Manager` to listen for device and channel attach and detach events. 

## Setup

Attach some devices (e.g. 4x thermocouples and 4x Relays) to one or more WiFi VINT hubs. Edit `src/index.js` and add the hostnames or IP address of the hubs. Then run the example as follows:

```
git clone https://github.com/raythree/phidget-example

cd phidget-example

npm install

npm run example
```

The example will connect to all hosts, and display any device attach and detach events. Note that if any of the WiFi VINT hubs are powered off when starting the program, the initial connection failures will be retried, and they will get connected when they are powered on, and all attach device events will be seen.

Unplugging devices from any VINT hub will detected detach events.

## Problem scenario

After detecting attached devices, power off one of the WiFi VINT hubs. We exepected to eventually see a connection error, which the example program logs. However, we never saw this happen, even though we were reading temperatures from thermocouple devices attached to the powered off hub. The `getTemperature` simply continued to return the last value. Likewise, powering the hub back on did not cause the devices to issue a re-attach event, and they continued reading the old temperature values.

## Expected behavior

We expected `Connection.onError` or `Connection.onDisconnect` to trigger so that we could retry the connection. Another issue is that we make connections to all networked phidgets discovered by Bonjour, but when we get the attach events from the `Manager` we don't see a way to know what devices that attached are associated with what connections. We have the device hierachy, but we need to go one level up and know the network hierachy. That way, if a connection fails, we know which devices are effected (even without the attach and detach events).
