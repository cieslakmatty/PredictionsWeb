import tornado.ioloop
import tornado.web
import io

import ProfileManager
#import LobbyManager

def ReadIP():
    with io.open('./ip') as file:
        return file.read()


ip = ReadIP()
url = "http://" + ip

def make_app():
    print("Making new app")
    return tornado.web.Application([
        (r"/SignIn", ProfileManager.SignIn),
        (r"/SignUp", ProfileManager.SignUp)#,
        #(r"/Lobby", LobbyManagger.Lobby)
    ],
    debug = True,
    url = url )

if __name__ == "__main__":
    app = make_app()
    app.listen(8080)
    print("listening on port 8080")
    tornado.ioloop.IOLoop.current().start()