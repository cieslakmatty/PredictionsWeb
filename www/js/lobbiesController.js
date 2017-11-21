app.controller("lobbiesController", function ($scope) {
    $scope.lobbyNo = -1;
    $scope.lobbyData = {};
    var lobbies = []
    $scope.lobbies = lobbies,
        selected = 0,
        previous = 0;
    $scope.selectedIndex = 0;

    $scope.init = function () {
        $scope.getLobbies();
    }

    $scope.ws = new WebSocket('ws:\\' + serverUrl + '\Lobby');
    $scope.ws.onmessage = function (evt) {
        var response = JSON.parse(evt.data);
        if ("new_lobby" == response.action) {
            if ("success" == response.status) {
                $scope.lobbyNo = response.lobby_id;
                window.console.log("Created new lobby");
            } else {
                window.console.log("Failed to create new lobby");
            }
        } else if ("join_lobby" == response.action) {
            if ("success" == response.status) {
                lobbyNo = response.lobby_id;
                window.console.log("Joined lobby with id: " + $scope.lobbyNo);
            } else {
                window.console.log("Failed to join lobby with id: " + $scope.lobbyNo);
            }
        }
    }
    $scope.ws.onerror = function (error) {
        window.console.log('WebSocket Error ' + error);
    }

    $scope.createNewLobby = function () {
        var data = {
            action: 'new_lobby',
            username: username,
            lobby_name: $scope.lobbyData.name
        }
        $scope.ws.send(JSON.stringify(data));
    }

    $scope.joinLobby = function () {
        var data = {
            action: 'join_lobby',
            username: username,
            lobby_id: $scope.lobbyNo
        }
        window.console.log(data);
        $scope.ws.send(JSON.stringify(data));
    }

    $scope.getLobbies = function () {
        data = {};
        response = function (data) {
            if (data.lobbies == "none") {
                window.console.log("no lobbies");
            } else {
                /*calculate length of data nad members*/
                var dataLength = 0;
                var membersLength = [];
                for (var k in data)
                    if (data.hasOwnProperty(k)) dataLength++;
                for (var i = 0; i < dataLength; i++)
                    for (var k in data[i])
                        if (data[i].hasOwnProperty(k))membersLength[i]++;
                /*calculate length of data nad members*/
                $scope.lobbies = [];
                for (var i = 0; i < dataLength; i++) {
                    var view = "";
                    for (var j = 0; j < membersLength[i]; j++) {
                        view += data[i].members[j] + "\n";
                        window.console.log(data[i].members[j].name);
                    }
                    view += " Content View";
                    $scope.lobbies.push({
                        title: data[i].name,
                        content: view,
                        disabled: false
                    });
                }
                $scope.$apply();
            }
        }
        HttpRequest.post('GetLobbies', data, response);
    }

    $scope.$watch('selectedIndex', function (current, old) {
        previous = selected;
        selected = lobbies[current];
    });
    $scope.init();
});