const phidget = require('phidget22');

const RETRY_INTERVAL = 10000; // Timer for retrying failed connections

// List of objects of {name, host} that have disconnected, 
// or failed to connect and need to be be retried
let retryList = [];

function log(msg) {
  console.log(`connections: ${msg}`);
}

async function connectAll(servers) {
  log(`Connecting to ${Object.keys(servers).length} server(s)`)

  servers.forEach(async (server) => {
    const result = await addConnection(server);
  });  
  retryConnections();
}

async function retryConnections() {
  setInterval(async () => {        
    if (retryList.length) {    
      log(`Retrying connection to ${retryList.length} server(s)`);
      const newList = [...retryList];
      retryList = [];
      const result = await connectAll(newList);
    }
  }, RETRY_INTERVAL);
}

async function addConnection(server) {

  log(`Attempting to connect to ${server}...`);
  const conn = new phidget.Connection({
    hostname: server,
    onConnect: () => {
      log(`Connected to server ${server}`);
    },
    onDisconnect: () => {
      log(`Disconnected from server ${server}`);
      retryList.push(server);
    },
    onError: () => {
      log(`Connection error for server ${server}`);
      retryList.push(server);
    },
    onAuthenticationNeeded:() => {
      log(`Authenticating for ${server}`)
      return 'xxxx';
    }
  });
  try {
    await conn.connect();
    return true;
  }
  catch (err) {
    log(`Failed to connect to ${server}: ${err.toString()}`);
    retryList.push(server);
    return false;
  }
}

module.exports = connectAll;