angular.module('myApp',[])
.controller('myCtrl',function($scope){
	$scope.shopLists=[
		{"name":'香蕉','price':8.99,'num':10},
		{"name":'苹果','price':6.5,'num':10},
		{"name":'李子','price':8.99,'num':10},
		{"name":'梨','price':5.0,'num':10},
		{"name":'猕猴桃','price':8.99,'num':10},
		{"name":'榴莲','price':65,'num':10},
		{"name":'橘子','price':8.99,'num':10},
		{"name":'西瓜','price':2.5,'num':10}
	];
	
	//减少
	$scope.reduce = function(index){
		if($scope.shopLists[index].num>1){
			$scope.shopLists[index].num--;
		}else{
			$scope.remove(index);
		}
	};
	//增加
	$scope.add = function(index){
		$scope.shopLists[index].num++;
	};
	//使得输入框中不得小于等于0
	$scope.change= function(index){
		if($scope.shopLists[index].num>=1){
			return;
		}else{
			$scope.shopLists[index].num=1;
		}
	};
	//移除一项
	$scope.remove = function(index){
		if(confirm('确定删除此项吗？')){
			$scope.shopLists.splice(index,1);
		}
	};
	//计算总价
	$scope.allSum = function(){
		var allPrice = 0;
		for(var i = 0;i < $scope.shopLists.length;i++){
			allPrice += $scope.shopLists[i].num*$scope.shopLists[i].price;
		}
		return '$'+allPrice;
	};
	
	//计算总数量
	$scope.allNum = function(){
		var allShu = 0;
		for(var i = 0;i < $scope.shopLists.length;i++){
			allShu += $scope.shopLists[i].num;
		}
		return allShu;
	};
	//清空购物车
	$scope.removeAll = function(){
		if(confirm('你确定清空购物车？')){
			$scope.shopLists = [];
		}
	}
	
})