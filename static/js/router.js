var app = angular.module("app", [ "ui.router", "ui.bootstrap" ]);

/**
 * 公用控制器
*/
//路由
app.controller("ctrl", function($scope,$rootScope) {
    $scope.menuShow = false;
    $scope.toggleMenu = function() {
        $scope.menuShow = !$scope.menuShow;
    };
    $scope.menuOpen = function(e) {
        console.log(e);
    };
});

//表单页面
app.controller("form", function($scope,$rootScope) {
    $rootScope.subPageCur={
        isForm:"active"
    }
});

//列表页面
app.controller("demoList", function($scope, $http, $timeout, $rootScope) {
    $http.get("http://m.jiajuol.com/partner/weixin/subject/subject_list.php").success(function(response) {
        $scope.data = response.data;
        $scope.tableShow = true;
        $timeout(function() {
            $scope.loadingHide = true;
        }, 200);
        $scope.maxSize = 4;
        //最大可见分页
        $scope.bigTotalItems = 100;
        //总条数
        $scope.bigCurrentPage = 1;
        //当前页码
        $scope.itemsPerPage = 20;

        $rootScope.subPageCur={
            isTable:"active"
        }
    });
});

//路由配置
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