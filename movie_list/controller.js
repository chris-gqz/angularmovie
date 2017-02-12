(function(angular){
'use strict';
//创建正在热映的模块
var module = angular.module('moviecat.movie_list', [
    'ngRoute',
     'moviecat.services.http'
    ])
//配置模块的路由
module.config(['$routeProvider', function($routeProvider) {
    console.log('llll');
  $routeProvider.when('/:category/:page', {
    templateUrl: 'movie_list/view.html',
    controller: 'MovieListController'
  });
}])
module.controller('MovieListController',
    ['$scope',
    '$route',
    '$routeParams',
    'HttpService',
    'AppConfig',
    function($scope,$route,$routeParams,HttpService,AppConfig){
    var count = AppConfig.pageSize;  //每一页的条数
    var page = parseInt($routeParams.page);//当前第几页
    var start = (page -1)*count;//从那一页开始
        $scope.subjects={};
        $scope.message='';
        $scope.loading = true;
        $scope.totalCount=0;
        $scope.totalPages=0;
      $scope.currentPage = page;
HttpService.jsonp(AppConfig.listApiAddress+$routeParams.category,{
    //$routeParams 的数据来源：1.路由匹配出来的2.？后的参数
    start:start,count:count,q:$routeParams.q
},function(data){
            $scope.subjects=data;
            $scope.totalCount=data.total;
            $scope.totalPages=Math.ceil($scope.totalCount/count)
            // $apply的作用就是让指定的表达式重新同步
        $scope.loading =false;
        $scope.$apply()//调用一次apply所有的值同步一次此处指loading和subjects
        console.log($scope.subjects);
        });
        $scope.go = function (page){
        if(page >= 1 && page<= $scope.totalPages){
            $route.updateParams({page:page});
        }
        }
}]);
})(angular)
