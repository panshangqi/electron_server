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
    var state = fs.lstatSync(path);
    f.on('open', function(fd){
        res.writeHead(200, {
            'Content-Type': 'application/force-download',
            'Content-Length': state.size,
            'Content-Disposition': 'attachment; filename='+filename
        });
        f.pipe(res);
    });

});
app.get("/",function(req,res){
    res.send("Hello Electron Server")
})
var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})
