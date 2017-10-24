app.controller("accountController", function ($scope, $location, $http) {
    $scope.currentNavItem = 'signin';
    $scope.bool_signin = true;
    $scope.signUpData = {};
    $scope.signInData = {};

    $scope.goto = function (page) {
        if ('signin' === page)
            $scope.bool_signin = true;
        else
            $scope.bool_signin = false;
    }

    $scope.signUpSubmit = function () {
        if ($scope.signUpData.password != $scope.signUpData.confirmPassword) {
            window.console.log("error");
        } else {
            var ws = new WebSocket('ws://localhost:8080/SignUp');
    
            ws.onopen = function(){
                var data = {
                    username: $scope.signUpData.username,
                    password: $scope.signUpData.password
                }
                window.console.log(JSON.stringify(data));
                ws.send(JSON.stringify(data));
            }
    
            ws.onmessage = function(evt){
                var response = JSON.parse(evt.data);
                if ("SUCCESS" == response.attempt){              
                    this.close();
                    window.console.log("redirecting to /main");
                    $location.path('/main');
                    $scope.$apply();      
                } else if ("FAILED" == response.attempt){
                    window.console.log("fail");
                }
            }
    
            ws.onclose = function(){ 
                window.console.log("connection closed"); 
            };
        }
    }

    $scope.signInSubmit = function () {
        var ws = new WebSocket('ws://localhost:8080/SignIn');

        ws.onopen = function(){
            var data = {
                username: $scope.signInData.username,
                password: $scope.signInData.password
            }
            window.console.log(JSON.stringify(data));
            ws.send(JSON.stringify(data));
        }

        ws.onmessage = function(evt){
            var response = JSON.parse(evt.data);
            if ("SUCCESS" == response.attempt){
                window.console.log("redirecting to /main");
                this.close();
                $location.path('/main');
                $scope.$apply()
            } else if ("FAILED" == response.attempt){
                window.console.log("fail");
            }
        }

        ws.onclose = function(){ 
            window.console.log("connection closed"); 
        };
    }

}).directive('signin', function () {
    return {
        templateUrl: 'templates/account/signin.html'
    };
}).directive('signup', function () {
    return {
        templateUrl: 'templates/account/signup.html'
    };
});