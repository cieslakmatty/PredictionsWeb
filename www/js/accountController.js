app.controller("accountController", function ($scope, $location) {
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
        loggedIn = true;
        $location.path('/lobbies');
        $scope.$apply();
    }

    $scope.signUpSubmit = function () {
        if ($scope.signUpData.password != $scope.signUpData.confirmPassword) {
            window.console.log("error");
        } else {
            var data = {
                username: $scope.signUpData.username,
                password: $scope.signUpData.password
            }
            response = function (data) {
                if ("SUCCESS" == data.attempt) {
                    username = $scope.signUpData.username;
                    $scope.finallyLoggedIn();
                } else if ("FAILED" == data.attempt) {
                    window.console.log("fail");
                }
            }
            HttpRequest.post('SignUp', data, response);
        }
    }

    $scope.signInSubmit = function () {
        var data = {
            username: $scope.signInData.username,
            password: $scope.signInData.password
        }
        response = function (data) {
            if ("SUCCESS" == data.attempt) {
                username = $scope.signInData.username;
                $scope.finallyLoggedIn();
            } else if ("FAILED" == data.attempt) {
                window.console.log("fail");
            }
        }
        HttpRequest.post('SignUp', data, response);
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