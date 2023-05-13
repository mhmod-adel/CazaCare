const http = require('http');

// Define the data array
let data = [
  {
    id: 1,
    imgUrl: "assets/about1.avif",
    title: 'العرض الاول',
    description: 'شرح العرض الاول في ايجاز'
  },
  {
    id: 2,
    imgUrl: 'assets/about3.avif',
    title: 'العرض الثاني',
    description: 'شرح العرض الثاني في ايجاز'
  },
  {
    id: 3,
    imgUrl: 'assets/about2.avif',
    title:'العرض الثالث',
    description: 'شرح العرض الثالث في ايجاز'
  }
];

// Create the HTTP server
const server = http.createServer((req, res) => {
  // Set the response headers
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');

  // Handle GET requests to /data
  if (req.method === 'GET' && req.url === '/data') {
    res.statusCode = 200;
    res.end(JSON.stringify(data));
  }

  // Handle GET requests to /data/:id
  else if (req.method === 'GET' && /^\/data\/\d+$/.test(req.url)) {
    const id = parseInt(req.url.split('/')[2]);
    const item = data.find(item => item.id === id);
    if (item) {
      res.statusCode = 200;
      res.end(JSON.stringify(item));
    } else {
      res.statusCode = 404;
      res.end();
    }
  }

  // Handle POST requests to /data
  else if (req.method === 'POST' && req.url === '/data') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const item = JSON.parse(body);
      item.id = data.length + 1;
      data.push(item);
      res.statusCode = 201;
      res.end(JSON.stringify(item));
    });
  }

  // Handle DELETE requests to /data
  else if (req.method === 'DELETE' && req.url === '/data') {
    data = [];
    res.statusCode = 204;
    res.end();
  }

  // Handle DELETE requests to /data/:id
  else if (req.method === 'DELETE' && /^\/data\/\d+$/.test(req.url)) {
    const id = parseInt(req.url.split('/')[2]);
    const itemIndex = data.findIndex(item => item.id === id);
    if (itemIndex >= 0) {
      data.splice(itemIndex, 1);
      res.statusCode = 204;
      res.end();
    } else {
      res.statusCode = 404;
      res.end();
    }
  }

  // Handle GET requests to /
  else if (req.method === 'GET' && req.url === '/') {
    res.setHeader('Content-Type', 'text/plain');
    res.statusCode = 200;
    res.end('Hello, world!');
  }

  // Handle all other requests
  else {
    res.statusCode = 404;
    res.end();
  }
});

// Start the server on port 3000
server.listen(3000||process.env.PORT, () => {
  console.log('Server running on port 3000');
});