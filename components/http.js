/*
* @Author: Marte
* @Date:   2017-02-01 19:24:01
* @Last Modified by:   Marte
* @Last Modified time: 2017-02-05 14:04:52
*/

'use strict';
(function(angular){
//由于默认angular提供的异步请求对象不支持自定义回调函数名
//angular随机分配的回调函数名称不被豆瓣支持
var http = angular.module('moviecat.services.http',[]);
http.service('HttpService',['$window','$document',function($window,$document){
//url:http://api.douban.com/sdfsfd-> <script>  -->html可自动执行
//
    //1.处理url中的回调参数
    //2.创建一个script标签
    //3.挂载回调函数
    //4.将script标签放在页面中
    //跨域请求的实现   下面这个函数
 this.jsonp=function(url, data, callback) {
 //如果第二个参数是函数则执行（兼容问题）。
    // if (typeof data == 'function') {
    //     callback =data;
    // };
    var querystring = url.indexOf('?') == -1 ? '?' : '&';
    for (var key in data) {
      querystring += key + '=' + data[key] + '&';
    }
    var fnSuffix = Math.random().toString().replace('.', '');
    var cbFuncName = 'my_json_cb_' + fnSuffix;
    // 不推荐

    querystring += 'callback=' + cbFuncName;
    var scriptElement = $document[0].createElement('script');
    scriptElement.src = url + querystring;
    $window[cbFuncName] = callback;
    $document[0].body.appendChild(scriptElement);
  };
 }])



})(angular)