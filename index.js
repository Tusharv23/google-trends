const googleTrends = require('google-trends-api');
const http = require("http");
const url  = require('url');
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    if (req.url == '/google_trends') {
        googleTrends.dailyTrends({geo: 'IN'})
        .then(function(results) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify({
                'data':results,
                'error':null
            }));
            res.end();
        })
        .catch(function(err) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify({
                'data':null,
                'error':err
            }));
            res.end();
        })
        
    } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello World\n');
    }

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
