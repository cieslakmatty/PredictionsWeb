import json
import tornado.websocket
from tornado.escape import json_encode

import server

host = server.ip
connections = {}


class Lobby(tornado.websocket.WebSocketHandler):
    def check_origin(self, origin):
        return True

    def open(self):
        print('Lobby connection')

    def on_message(self, message):
        data = json.loads(message)
        action = data['action']
        response
        if ('newLobby' == action):
            NewLobby.createLobby()
        self.write_message(json.dumps(response))

    def on_close(self):
        print('Lobby closed')

class NewLobby:
    def createLobby(self):
        print("wtf")
        