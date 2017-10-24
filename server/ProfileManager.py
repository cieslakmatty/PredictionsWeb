import json
import tornado.websocket
from tornado.escape import json_encode

import server

host = server.ip

class SignIn(tornado.websocket.WebSocketHandler):
    #Handles SignIn requests from the client

    def check_origin(self, origin):
        return True

    def open(self):
        print('new connection')

    def on_message(self, message):
        data = json.loads(message)
        username = data['username']
        password = data['password']
        response = {'attempt': 'FAILED'}
        #compare with data in DB
        command = ("SELECT id, username, password FROM user WHERE username = '%s';"
                    % str(username))
        #data = db.sql_command(command, True)
        #user was found AND password == password
        if True:#len(data) > 0 AND str(data[0]['password']) == str(password):
            response = {'attempt': 'SUCCESS'}
        self.write_message(json.dumps(response))

    def on_close(self):
        print('connection closed')



class SignUp(tornado.websocket.WebSocketHandler):
    #Handles Signup requests from the client

    def check_origin(self, origin):
        return True

    def open(self):
        print('new connection')

    def on_message(self, message):
        data = json.loads(message)
        username = data['username']
        password = data['password']
        response = {'attempt': 'FAILED'}
        # make sure the username doesnt already exist
        command = ("SELECT * FROM user WHERE username = '%s'" % username)
        #check = db.sql_command(command, True)
        if False:#check:
            self.write_messagewrite(response)
        else:
            command = ("INSERT INTO user (username, password) VALUES ('%s', '%s')" %
                            (username, password))
            #new_id = db.sql_command(command, False)
            response = {'attempt': 'SUCCESS'}
        self.write_message(json.dumps(response))

    def on_close(self):
        print('connection closed')