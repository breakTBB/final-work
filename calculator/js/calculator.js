var myApp = angular.module("myApp", []);
myApp.controller("myController", function ($scope) {
    $scope.shuzi = "";
    $scope.jieguo = 0;
    $scope.num = function (num) {
        $scope.shuzi += num;
    }
    $scope.js = function () {
        $scope.jieguo = (eval($scope.shuzi));
    }
    $scope.reversal = function () {
        if (eval($scope.shuzi) > 0) {
            $scope.shuzi = "-" + $scope.shuzi;
        } else {
            $scope.shuzi = $scope.shuzi.substring(1);
        }
    }
    $scope.remove = function () {
        $scope.shuzi = "";
        $scope.jieguo = 0;
    }
}) 