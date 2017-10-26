app.controller("accountController", function ($scope, $location, $http, $compile) {
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

    $scope.finallyLoggedIn = function () {
        /*var body = angular.element("body");
        window.console.log(body);
        body[0].setAttribute("md-swipe-right", "openLeft()");
        body[0].setAttribute("md-swipe-left", "closeLeft()");
        $scope = body.scope();
        $injector = body.injector();
        $injector.invoke(function($compile){
           $compile(body)($scope)
        })*/
        loggedIn = true;
        $location.path('/main');
        $scope.$apply();
    }

    $scope.signUpSubmit = function () {
        if ($scope.signUpData.password != $scope.signUpData.confirmPassword) {
            window.console.log("error");
        } else {
            var ws = new WebSocket('ws://localhost:8080/SignUp');

            ws.onopen = function () {
                var data = {
                    username: $scope.signUpData.username,
                    password: $scope.signUpData.password
                }
                ws.send(JSON.stringify(data));
            }

            ws.onmessage = function (evt) {
                var response = JSON.parse(evt.data);
                if ("SUCCESS" == response.attempt) {
                    this.close();
                    $scope.finallyLoggedIn();
                } else if ("FAILED" == response.attempt) {
                    window.console.log("fail");
                }
            }

            ws.onclose = function () {};
        }
    }

    $scope.signInSubmit = function () {
        var ws = new WebSocket('ws://localhost:8080/SignIn');

        ws.onopen = function () {
            var data = {
                username: $scope.signInData.username,
                password: $scope.signInData.password
            }
            ws.send(JSON.stringify(data));
        }

        ws.onmessage = function (evt) {
            var response = JSON.parse(evt.data);
            if ("SUCCESS" == response.attempt) {
                this.close();
                $scope.finallyLoggedIn();
            } else if ("FAILED" == response.attempt) {
                window.console.log("fail");
            }
        }

        ws.onclose = function () { };
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