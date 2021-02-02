# Phidget Connection Example

This example demostrates a problem with detecting failed connections to SBC devices or WiFi VINT hubs.

```
git clone https://github.com/raythree/phidget-example

cd phidget-example

npm install

npm run index
```

Before running the example, first edit the file `src/index.js` and add the IP address or hostnames of any local Phidget SBC or VINT hubs. A connection will be established for each, and then callbacks using `Phidget.Manager` will show device attach and detach events. 

Any connection errors should also be logged.

Running the program and disconnecting devices from a WiFi VINT hub's ports will show the detach and attach events. However, unplugging the WiFi VINT hub will not show any connection errors. 


