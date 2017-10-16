app.controller("accountController", function ($scope, $location) {
    $scope.currentNavItem = 'login';
    $scope.bool_login = true;
    $scope.signUpData = {};

    $scope.goto = function (page) {
        if ('login' === page)
            $scope.bool_login = true;
        else
            $scope.bool_login = false;
    }

    $scope.signUpSubmit = function () {
        if ($scope.signUpData.password != $scope.signUpData.confirmPassword) {
            window.console.log("error");
        } else {
            window.console.log("pass");
            //TODO: send data to server
        }
    }

    $scope.signInSubmit = function () {
        //TODO: implement
        if (true/*uName/pass combo correct*/) {
            window.console.log("pass");
            //TODO: enter app
            $location.path('/main');
        } else {
            window.console.log("fail");
            //TODO: show error
        }
    }

}).directive('login', function () {
    return {
        templateUrl: 'templates/account/login.html'
    };
}).directive('signup', function () {
    return {
        templateUrl: 'templates/account/signup.html'
    };
});