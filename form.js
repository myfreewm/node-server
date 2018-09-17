
var http = require('http');
var qs = require('querystring');
var items = [];

var server = http.createServer((req,res)=>{
    
    console.log(req);
    if('/' == req.url){
        
        switch(req.method){

            case 'GET':
                show(res);
                break;
            case 'POST':
                add(req,res);
                break;
            default:
                badRequest(res);

        }
    }else{

        notFound(res);
    }
})

function show(res){

    var html = '<html><head><title>ToDo List</title></head><body>'
            + '<h1>To do list</h1>'
            + '<ul>'
        + items.map(function(item){
            return '<li>'+item+'</li>'
        }).join('')
        + '</ul>'
        + '<form method="post" action="/">'
        + '<p><input type="text" name="item" /></p>'
        + '<p><input type="submit" value="add item" /></p>'
        + '</form></body></html>';
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Length',Buffer.byteLength(html));
    res.end(html);
}

function notFound(res){

    res.statusCode = 404;

    res.setHeader('Content-Type', 'text/html');
    res.end('not found');
}

function badRequest(res){

    res.statusCode = 400;

    res.setHeader('Content-Type', 'text/html');
    res.end('bad request');
}

function add(req,res){

    var body = '';
    req.setEncoding('utf8');

    req.on('data',function(chunk){

        body += chunk;
    })
    req.on('end',function(){

        var obj = qs.parse(body);
        console.log(obj);
        items.push(obj.item);
        show(res);
    })
}

server.listen(3000);
