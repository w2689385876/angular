/**
 * 公用控制器
 */
var app = angular.module("app", ["ui.router", "ui.bootstrap", 'ngAnimate', 'ngSanitize']);

//首页
app.controller("ctrl", ['$scope', function($scope) {
    $scope.menuShow = false;
    $scope.toggleMenu = function() {
        $scope.menuShow = !$scope.menuShow;
    };
}]);

//表单页面
app.controller("form", ['$scope', '$rootScope', '$timeout', function($scope, $rootScope, $timeout) {
    var bitian = ['name', 'select', 'sex'];
    $scope.user = {};
    $scope.submit = function() {
        bitian.forEach(function(e) {
            if (!$scope.user[e]) {
                $scope.alerts.push({
                    msg: e + '不能为空'
                });
            }
        });
    };
}]);

//列表页面
app.controller("demoList", ['$scope', '$http', '$uibModal', '$log', function($scope, $http, $uibModal, $log) {
    //分页
    $scope.page = {
        maxSize: 4, //最大可见分页
        totalItems: 100, //总条数
        currentPage: 1, //当前页码
        itemsPerPage: 10, //每页条数
        pageChange: function() {
            getData($scope.page.currentPage);
        }
    };

    function getData(n) {
        $scope.loadingShow = true;
        $http.get("http://m.jiajuol.com/partner/weixin/subject/subject_list.php?page=" + n).success(function(response) {
            $scope.data = response.data;
            $scope.tableShow = true;
            $scope.loadingShow = false;
        });
    }
    getData(1);

    //删除确认模态框
    $scope.del = function(data) {
        var modalInstance = $uibModal.open({
            templateUrl: '/template/modal.html',
            controller: 'delDate',
            backdrop: "static", //控制背景状态
            // size: 'sm',
            resolve: {
                item: function() {
                    return data;
                }
            }
        });
        modalInstance.result.then(function(data) {
            $log.info(data);
        }, function(data) {
            $log.info(data);
        });
    };
}]);
app.controller('delDate', ['$scope', '$uibModalInstance', 'item', function($scope, $uibModalInstance, item) {
    $scope.title = "系统提示";
    $scope.content = "确定要删除 <span class='text-danger'>" + item.subject + "</span>？";
    $scope.ok = function() {
        $uibModalInstance.close('yes');
    };
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
}]);



/**
 * 路由配置
 */
app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
    //使用HTML5格式
    // $locationProvider.html5Mode(true);

    //如果没有满足的路由条件默认跳转主页
    $urlRouterProvider.otherwise("/home");

    //重定向
    $urlRouterProvider.when("/demo", "/demo/tab1");

    // 首页
    $stateProvider.state("main", {
        url: "/home",
        template: "<h1>欢迎登录CRM管理系统</h1>"
    })

    // demo页面
    .state("demo", {
            url: "/demo",
            templateUrl: "/view/demo/tab.html"
        })
        .state("demo.tab1", {
            url: "/tab1",
            templateUrl: "/view/demo/tab1/list.html",
            controller: "demoList"
        })
        .state("demo.tab2", {
            url: "/tab2",
            templateUrl: "/view/demo/tab2/list.html",
            controller: "demoList"
        })
        .state("demo_tab1_edit", {
            url: "/demo/tab1/:id",
            templateUrl: "/view/demo/tab1/edit.html",
            controller: ['$stateParams', '$scope', function($stateParams, $scope) {
                // alert($stateParams.id)
                $scope.edit = true;
                $scope.title = "tab1编辑";
            }]
        })
        .state("demo_tab1_search", {
            url: "/demo/tab1_search?id&type",
            templateUrl: "/view/demo/tab1/list.html",
            controller: ['$stateParams', '$scope', function($stateParams, $scope, $http) {
                // alert($stateParams.id+'\n'+$stateParams.type)
                $scope.search = true;
                $scope.title = "tab1查询结果";
            }]
        })
        .state("demo_tab2_edit", {
            url: "/demo/tab2/:id",
            templateUrl: "/view/demo/tab2/edit.html",
            controller: ['$stateParams', '$scope', function($stateParams, $scope) {
                // alert($stateParams.id)
                $scope.edit = true;
                $scope.title = "tab2编辑";
            }]
        })

    // 提示页面
    .state("tip", {
        url: "/tip/:msg",
        templateUrl: "/view/tip.html",
        controller: ['$stateParams', '$scope', function($stateParams, $scope) {
            $scope.msg = $stateParams.msg;
        }]
    });
}]);

// 初始化运行
app.run(['$rootScope', '$location', function($rootScope, $location) {
    //监听路由变化，暂时无用
    $rootScope.$on('$locationChangeSuccess', function(event, newUrl, oldUrl) {
        // alert(newUrl)
    });

    //标记当前页面焦点
    $rootScope.isActive = function(route) {
        var flag = null;
        if (typeof route === 'string') {
            flag = ($location.path().indexOf(route) >= 0);
        } else {
            route.forEach(function(d) {
                if ($location.path().indexOf(d) >= 0) {
                    flag = true;
                    return false;
                }
            });
        }
        return flag;
    };
}]);