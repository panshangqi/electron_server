import tornado.httpserver
import tornado.ioloop
import tornado.web

class Hello(tornado.web.RequestHandler):
    def get(self):
        self.write("hello world")

class MyFile(tornado.web.StaticFileHandler):
    def set_extra_headers(self, path):
        self.set_header("Cache-control", "no-cache")

app = tornado.web.Application([
    (r"/", Hello),
    (r"/myfile/(.*)", MyFile, {"path":"/opt/www/electron_server/download/"})
])

if __name__ == '__main__':
    http_server = tornado.httpserver.HTTPServer(app)
    http_server.listen(9999)
    tornado.ioloop.IOLoop.instance().start()