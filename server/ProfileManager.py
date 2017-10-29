import json
import tornado.web
from tornado.escape import json_encode

import server

host = server.ip

class SignIn(tornado.web.RequestHandler):
    #Handles SignIn requests from the client
    def set_default_headers(self):
        origin = self.request.headers.get('Origin')
        if origin:
            self.set_header('Access-Control-Allow-Origin', origin)
        self.set_header('Access-Control-Allow-Credentials', 'true')

    def post(self):
        data = tornado.escape.json_decode(self.request.body)
        print(data)
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
        self.write(json.dumps(response))



class SignUp(tornado.web.RequestHandler):
    #Handles Signup requests from the client
    def set_default_headers(self):
        origin = self.request.headers.get('Origin')
        if origin:
            self.set_header('Access-Control-Allow-Origin', origin)
        self.set_header('Access-Control-Allow-Credentials', 'true')

    def post(self):
        data = tornado.escape.json_decode(self.request.body)
        username = data['username']
        password = data['password']
        response = {'attempt': 'FAILED'}
        # make sure the username doesnt already exist
        command = ("SELECT * FROM user WHERE username = '%s'" % username)
        #check = db.sql_command(command, True)
        if False:#check:
            self.write(json.dumps(response))
        else:
            command = ("INSERT INTO user (username, password) VALUES ('%s', '%s')" %
                       (username, password))
            #new_id = db.sql_command(command, False)
            response = {'attempt': 'SUCCESS'}
        self.write(json.dumps(response))
        