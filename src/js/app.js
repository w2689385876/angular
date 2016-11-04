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
app.controller("demoList", ['$scope', '$http', '$uibModal', '$log', '$stateParams', function($scope, $http, $uibModal, $log, $stateParams) {
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
    $scope.type=$stateParams.type?$stateParams.type:"0";
    $scope.style=$stateParams.style?$stateParams.style:"0";
    $scope.area=$stateParams.area?$stateParams.area:"0";
    function getData(n) {
        $scope.loadingShow = true;
        $http.get("http://m.jiajuol.com/partner/weixin/subject/subject_list.php",{
            params:{
                page:n,
                house_type:$scope.type,
                house_style:$scope.style,
                house_area:$scope.area
            }
        }).success(function(response) {
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
            url: "/demo/tab1_edit/:id",
            templateUrl: "/view/demo/tab1/edit.html",
            controller: ['$stateParams', '$scope','$state','$location','item', function($stateParams, $scope,$state,$location,item) {
                if(item===1){
                    // $state.go('tip',{msg:'没有权限'}); 
                    $location.path('/tip/没有权限');
                    return;
                }
                // alert($stateParams.id)
                $scope.edit = true;
                $scope.title = "tab1编辑";
            }],
            resolve: {
                item: function() {
                    return 1;
                }
            }
        })
        .state("demo.tab1_search", {
            url: "/tab1/?style&type&area",
            templateUrl: "/view/demo/tab1/list.html",
            controller:'demoList'
            // controller: ['$stateParams', '$scope', function($stateParams, $scope, $http) {
            //     alert($stateParams.style+'\n'+$stateParams.area)
            // }]
        })
        .state("demo_tab2_edit", {
            url: "/demo/tab2_edit/:id",
            templateUrl: "/view/demo/tab2/edit.html",
            controller: ['$stateParams', '$scope', function($stateParams, $scope) {
                alert($stateParams.id)
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
app.run(['$rootScope', '$location','$state','$http', function($rootScope, $location,$state,$http) {
    //监听路由变化
    $rootScope.$on('$locationChangeSuccess', function(event, newUrl, oldUrl) {
        // console.log(newUrl);
        // if(newUrl.indexOf('demo/tab2')>0){
        //     $state.go('tip',{msg:'没有权限'}); 
        // }
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
    //提示框
    $rootScope.alerts = [{
        type: 'success',
        msg: '欢迎登录CRM管理系统'
    }];
    $rootScope.addAlert = function() {
        $rootScope.alerts.push({
            msg: 'Another alert!'
        });
    };
    $rootScope.closeAlert = function(index) {
        $rootScope.alerts.splice(index, 1);
    };
}]);