/*
* @Author: Marte
* @Date:   2017-02-03 15:45:24
* @Last Modified by:   Marte
* @Last Modified time: 2017-02-03 18:22:49
*/

'use strict';
(function(angular){
  angular.module('moviecat.directives.auto_focus',[])
  //每一个的自定义标签都会走这个程序一遍
  .directive('autoFocus',['$location',function($location){
    // var path=$location.path();
    return {
        restrict:'A',
        link:function($scope,iElm,iAttrs,controller){
        // watch 只能监听$scope 上面的东西
        $scope.$location=$location;
        $scope.$watch('$location.path()',function(now){
        var aLink = iElm.children().attr('href');
        var type = aLink.replace(/#(\/.+?)\/\d+/,'$1');
       //初始状态下，首个active
        if (now.startsWith(type)) {
         iElm.parent().children().removeClass('active');
            iElm.addClass('active');
        };


        })


        // iElm.on('click',function(){

        //     iElm.parent().children().removeClass('active');
        //     iElm.addClass('active');
        // })
        }
    }
  }])

})(angular)