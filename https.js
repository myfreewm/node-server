
var https = require('https');

var fs = require('fs');

var options = {
    key:fs.readFileSync('./key.pem'),
    cert:fs.readFileSync('./key-cert.pem')
}

https.createServer(options,(req,res) => {

    res.writeHead(200);
    res.end('Hello world');
}).listen(3000)
