// test-connection.js
const http = require('http');

const PORT = 24670;
const HOST = '0.0.0.0';

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  
  const response = {
    status: 'online',
    server: 'Bot Controller',
    version: '3.1.4',
    timestamp: new Date().toISOString(),
    endpoints: {
      test: '/test',
      upload: '/upload',
      bots: '/bots',
      tokens: '/tokens',
      deploy: '/deploy',
      status: '/status'
    }
  };
  
  res.end(JSON.stringify(response, null, 2));
});

server.listen(PORT, HOST, () => {
  console.log(`✅ Test server running on http://${HOST}:${PORT}`);
  console.log(`📡 Accessible from:`);
  console.log(`   Local: http://localhost:${PORT}`);
  console.log(`   Network: http://${getIPAddress()}:${PORT}`);
  console.log(`\n📋 Testing endpoints:`);
  console.log(`   curl http://localhost:${PORT}/test`);
  console.log(`   curl http://localhost:${PORT}/status`);
});

function getIPAddress() {
  const interfaces = require('os').networkInterfaces();
  for (const name in interfaces) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}