import tornado.ioloop
import tornado.web


import ProfileManager

def readIP():
    with open("ip", "r") as file:
        return file.read()


ip = readIP()
url = "http://" + ip
#list of WebSocket connections
connections = {}

def make_app():
    print("Making new app")
    return tornado.web.Application([
        (r"/SignIn", ProfileManager.SignIn),
        (r"/SignUp", ProfileManager.SignUp)
    ],
    debug = True,
    url = url )

if __name__ == "__main__":
    app = make_app()
    app.listen(8080)
    print("listening on port 8080")
    tornado.ioloop.IOLoop.current().start()