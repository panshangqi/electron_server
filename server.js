var http = require('http');
var express = require('express');
var fs=require("fs");

process.on('uncaughtException', function (err) {
    console.log(err);
});

var app = express();
app.get('/download/*', function (req, res, next) {

    console.log(req.params);
    var filename = req.params[0];

    //第二种方式
    var path="./act/" + filename;

    var f = fs.createReadStream(path);
    f.on('open', function(fd){
        res.writeHead(200, {
            'Content-Type': 'application/force-download',
            'Content-Disposition': 'attachment; filename='+filename
        });
        f.pipe(res);
    });

});
app.get("/",function(req,res){
    res.send("Hello Electron Server")
})

http.createServer(app).listen(8081,'www.pansq.local', () => {
    
});
console.log('Server running at http://127.0.0.1:8081/');