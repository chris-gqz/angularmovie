(function(angular){
'use strict';

//创建正在热映的模块
var module = angular.module('moviecat.coming_soon', [
    'ngRoute',
     'moviecat.services.http'
    ])
//配置模块的路由
module.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/coming_soon/:page', {
    templateUrl: 'coming_soon/view.html',
    controller: 'ComingSoonController'
  });
}])

module.controller('InTheatersController',
    ['$scope',
    '$routeParams',
    'HttpService',
    function($scope,$routeParams,HttpService) {
    var count = 10;  //每一页的条数
    var page = parseInt($routeParams.page);//当前第几页
    var start = (page -1)*count;//从那一页开始
        $scope.subjects={};
        $scope.message='';
        $scope.loading = true;
        $scope.totalCount=0;
        $scope.totalPages=0;
HttpService.jsonp('http://api.douban.com/v2/movie/coming_soon',{
    start:start,count:count
},function(data){
            $scope.subjects=data;
            $scope.totalCount=data.total;
            $scope.totalPages=Math.ceil($scope.totalCount/count)
            // $apply的作用就是让指定的表达式重新同步

        $scope.loading =false;
        $scope.$apply()//调用一次apply所有的值同步一次此处指loading和subjects
        console.log($scope.subjects);
        })



}]);
})(angular)





    // 获取豆瓣api数据
    // var doubanApiAddress='http://api.douban.com/v2/movie/in_theaters'
    // 测试服务器  在同一目录下通过ajax请求 获取数据
    //doubanApiAddress替换
    //datas/in_theaters.json（本地）
    //$http.jsonp('datas/in_theaters.json')替换
    //$http.get('datas/in_theaters.json')
    //在angular中使用jsonp的方式做跨域请求，
    //就必须给当前地址加上一个参数
    //callback=JSON_CALLBACK
    // $http.jsonp(doubanApiAddress+'?callback=json_CALLBACK').then(function(res){
    //  if (res.status==200) {
    // $scope.subjects = res.data;
    //  }else{
    //     $scope.message='获取数据错误,错误信息'+res.statusText;
    //  };


    // },function(err){
    //     console.log(err);
    //     $scope.message='获取数据错误,错误信息'+err.statusText;
    // });
    //