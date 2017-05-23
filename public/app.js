(function(){
    var app=angular.module('app',['ngRoute']);

    app.config(function($routeProvider){
        $routeProvider.when('/',{
            controller:"HomeController",
            controllerAs:'vm',
            templateUrl:'./home.html'
        });
        $routeProvider.otherwise('/');
    });

    app.controller('HomeController',['$http','$scope',function($http,$scope){
        var vm=this;
        vm.title="Welcome";
    }]);
});