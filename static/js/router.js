/**
 * 路由配置
 */
app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
    //使用HTML5格式
    // $locationProvider.html5Mode(true);
    
    //如果没有满足的路由条件默认跳转主页
    $urlRouterProvider.otherwise("/home");

    //重定向
    $urlRouterProvider.when("/demo", "/demo/table");

    // 匹配规则
    $stateProvider.state("main", {
            url: "/home",
            template: "<h1>欢迎登录CRM管理系统</h1>"
        })
        .state("demo", {
            url: "/demo",
            templateUrl: "view/demo/tab.html"
        })
        .state("demo.table", {
            url: "/table",
            templateUrl: "view/demo/table.html",
            controller: "demoList"
        })

    .state("demo.form", {
        url: "/form",
        templateUrl: "view/demo/form.html",
        controller: "form"
    });
}]);