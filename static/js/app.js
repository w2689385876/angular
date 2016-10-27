var app = angular.module('app',['ui.bootstrap']);


app.component('modalComponent', {
  templateUrl: 'myModalContent.html',
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controller: function () {
    var $ctrl = this;

    $ctrl.$onInit = function () {
      $ctrl.items = $ctrl.resolve.items;
      $ctrl.selected = {
        item: $ctrl.items[0]
      };
    };

    $ctrl.ok = function () {
      $ctrl.close({$value: $ctrl.selected.item});
    };

    $ctrl.cancel = function () {
      $ctrl.dismiss({$value: 'cancel'});
    };
  }
});




//分页器
// app.directive("pageDirective", function() {
//     return {
//         restrict : "EA",
//         templateUrl:"/template/page.html",
//         controller: function($scope){
//         	$scope.curpage=1;//当前页码
// 			$scope.count="10";//每页条数
// 			$scope.dataLen=50;//总条数
// 			$scope.pages=Math.ceil($scope.dataLen/$scope.count);//页数
// 			$scope.countChange=function(e){//每页条数选择
// 				$scope.pages=Math.ceil($scope.dataLen/$scope.count);//页数
// 				$scope.curpage=1;
// 				if($scope.pages==1){
// 					$scope.nextDisabled=true;
// 				}else{
// 					$scope.nextDisabled=false;
// 				}
// 			}
// 			$scope.prevDisabled=true;
// 			$scope.nextDisabled=false;
// 			$scope.pagePrev=function(){
// 				if($scope.curpage>1){
// 					$scope.curpage--;
// 					if($scope.curpage==1){
// 						$scope.prevDisabled=true;
// 					}
// 					$scope.nextDisabled=false;
// 				}
// 			}
// 			$scope.pageNext=function(){
// 				if($scope.curpage<$scope.pages){
// 					$scope.curpage++;
// 					$scope.prevDisabled=false;
// 					if($scope.curpage==$scope.pages){
// 						$scope.nextDisabled=true;
// 					}
// 				}
// 			}
// 			$scope.$watch('dataLen', function(){
// 				$scope.pages=Math.ceil($scope.dataLen/$scope.count);//页数
// 				$scope.curpage=1;
// 				if($scope.pages==1){
// 					$scope.nextDisabled=true;
// 				}else{
// 					$scope.nextDisabled=false;
// 				}
// 			})
//         }
//     };
// });

//请求
// app.factory('getData', function() {
//    var factory = {};
   
//    factory.multiply = function(a, b) {
//       return a * b
//    }
//    return factory;
// });

