/**
 * 公用控制器
*/
var app = angular.module("app", [ "ui.router", "ui.bootstrap" ]);

//首页
app.controller("ctrl", function($scope,$rootScope,$uibModal, $log) {
    $scope.menuShow = false;
    $scope.toggleMenu = function() {
        $scope.menuShow = !$scope.menuShow;
    };
    $scope.menuOpen = function(e) {
        console.log(e);
    };
    
    //删除确认模态框
    $scope.del = function(opt) {
        opt.temp='confirm.html';
        modal(opt)
    };
    function modal(opt){
        var modalInstance = $uibModal.open({
            templateUrl: opt.temp,
            controller:opt.controller,
            backdrop: "static",
            // size: size,
            resolve: {
                item: function () {
                    return opt.data;
                }
            }
        });
    }
});




//表单页面
app.controller("form", function($scope,$rootScope,$timeout) {
    $rootScope.subPageCur={
        isForm:"active"
    }
    var bitian=['name','select','sex'];
    $scope.user={}
    $scope.submit=function(){
         bitian.forEach(function(e){
            if(!$scope.user[e]){
                $scope.alerts.push({msg: e+'不能为空'});
            }
        })
    }
});




//列表页面
app.controller("demoList", function($scope, $http, $timeout, $rootScope) {
    //设置当前页菜单焦点
    $rootScope.subPageCur={
        isTable:"active"
    }

    //分页
    $scope.page={
        maxSize : 4, //最大可见分页
        totalItems : 100, //总条数
        currentPage : 1, //当前页码
        itemsPerPage: 10, //每页条数
        pageChange:function(){
            getData($scope.page.currentPage);
        }
    }
    function getData(n){
       $scope.loadingShow = true;
       $http.get("http://m.jiajuol.com/partner/weixin/subject/subject_list.php?page="+n).success(function(response) {
            $scope.data = response.data;
            $scope.tableShow = true;
            $scope.loadingShow = false;
        }); 
    }
    getData(1);
});
app.controller('delDate', function ($scope, $uibModalInstance,item) {
    $scope.title="系统提示";
    $scope.content="确定要删除 "+item.subject+" ？";

    $scope.ok = function () {
        $uibModalInstance.close();
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});