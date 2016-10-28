/**
 * 路由配置
*/
app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/home");//如果没有满足的路由条件默认跳转主页

    $urlRouterProvider.when("/demo","/demo/table");//重定向

    $stateProvider.state("main", {
        url:"/home",
        template:"<h1>欢迎登录CRM管理系统</h1>"
    })
    .state("demo", {
        url:"/demo",
        templateUrl:"view/demo/tab.html"
    })
    .state("demo.table", {
        url:"/table",
        templateUrl:"view/demo/table.html",
        controller:"demoList"
    })
    
    .state("demo.form", {
        url:"/form",
        templateUrl:"view/demo/form.html",
        controller:"form"
    });
});