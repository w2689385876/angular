# AngularJS
基于AngularJS路由实现的一整套演示页面

## 用到的插件 ##
- ui-bootstrap-tpls.js
- angular-animate.js
- angular-sanitize.js
- angular-ui-router.js

## 相关文档地址 ##
[https://angularjs.org](https://angularjs.org "angularjs官网")  
[https://github.com/angular-ui/ui-router](https://github.com/angular-ui/ui-router "ui-router Github")  
[http://angular-ui.github.io/bootstrap/](http://angular-ui.github.io/bootstrap/ "angular-ui")  

## ui-router发现的bug ##
    .state("demo.tab1_search", {
        url: "/tab1/?style&type&area",
        templateUrl: "/view/demo/tab1/list.html",
        controller: ['$stateParams', '$scope', function($stateParams, $scope, $http) {
        	alert($stateParams.style+'\n'+$stateParams.area)
        }]
    })
    // tab1后面的斜线必须添加否则刷新页面会导致获取不到参数