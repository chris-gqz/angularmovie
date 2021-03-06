'use strict';


angular.module('moviecat', [
  'ngRoute',
    'moviecat.movie_detail',
  'moviecat.movie_list',
  'moviecat.directives.auto_focus'
])
.constant('AppConfig',{
  pageSize:10,
  listApiAddress:'http://api.douban.com/v2/movie/',
  detailApiAddress:'http://api.douban.com/v2/movie/subject/'
})
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/in_theaters/1'});
}])
.controller('SearchController',[
    '$scope',
    '$route',
     'AppConfig',
    function($scope,$route,AppConfig){
    $scope.input='';
    $scope.search=function(){
    $route.updateParams({category: 'search', q: $scope.input })
    }
}])

