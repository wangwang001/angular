angular.module('myApp',['ngRoute'])
.config(['$locationProvider','$routeProvider',function($locationProvider,$routeProvider){
	$locationProvider.hashPrefix(''); 
	$routeProvider
	.when('/',{
		template:
		"<ul id='oUl'>"+
			"<li ng-repeat='fruit in ifruit' ng-controller='eachCtrl' class='{{li_border}}'>"+
			"<h4 ng-bind='fruit.name'></h4>"+
			"<p>单价：<span ng-bind='fruit.price'></span></p>"+
			"数量：<a href='javascript:;' ng-click='reduce()'>-</a>"+
			"<span ng-bind='fruit.num'></span>"+
			"<a href='javascript:;' ng-click='add()'>+</a>"+
			"<div class='{{have_click}}' ng-click='addTo($event)' ng-bind='con'></div>"+
			"</li>"+
		"</ul>"
	})
	.when('/go_buy',{
		template:
		"<ul id='item'>"+
			"<li ng-repeat='ofruit in new_fruits' ng-click='{even:$even?true:false}' ng-hide='ofruit.num==0'>"+
			"<span ng-bind-template='{{ofruit.name}}:{{ofruit.price}}元/斤*{{ofruit.num}}斤'></span>"+
			"<span class='each_all' ng-bind-template='************&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ofruit.price * ofruit.num}}元'></span>"+
			"</li>"+
		"</ul>"
	})
}])
.controller('myCtrl',['$scope','$timeout',function($scope,$timeout){
	$scope.all_cal = {allPrice:0};
	$scope.arr_ifruit=[
		{"name":'香蕉','price':8.99,'num':10,'buy':false},
		{"name":'苹果','price':6.5,'num':10,'buy':false},
		{"name":'李子','price':8.99,'num':10,'buy':false},
		{"name":'梨','price':5.0,'num':10,'buy':false},
		{"name":'猕猴桃','price':8.99,'num':10,'buy':false},
		{"name":'榴莲','price':65,'num':10,'buy':false},
		{"name":'橘子','price':8.99,'num':10,'buy':false},
		{"name":'西瓜','price':2.5,'num':10,'buy':false}
	];
	//点击去结算
	$scope.ifruit = $scope.arr_ifruit;
	$scope.oturn = true;
	$scope.go_cal = function(event){
		$scope.new_fruits = [];
		//筛选出已经加入购物车的水果
		for(var i = 0;i < $scope.arr_ifruit.length;i++){
			if($scope.arr_ifruit[i].buy == true){
				$scope.new_fruits.push($scope.arr_ifruit[i]);
			}
		}
		if($scope.oturn){
			event.target.href = '#go_buy';
			event.target.innerHTML = "返回";
			setStyle(event.target,{'height':'30px','left':'95px','fontSize':'18px','lineHeight':'30px'});
			setStyle(event.target.parentNode,{'width':'400px','borderRadius':'0','left':'calc(50%-200px)'});
			setStyle( event.target.parentNode.children[0], {'opacity':0});
			setStyle( event.target.parentNode.children[1], {'left':'calc(50% - 140px)', 'bottom':'60px'});//不知道为什么这里不能用childNodes[1]无效
			$scope.oturn = false;
			$scope.ifruit = [];
		}else{
			event.target.href = "#/";
			event.target.innerHTML = "~去结算~";
			setStyle( event.target, {'height':'50px', 'left':'550px', 'fontSize':'25px', 'lineHeight':'50px'} );
			setStyle( event.target.parentNode, {'width':'800px', 'borderRadius':'30px', 'left':'calc(50% - 400px)'});
			setStyle( event.target.parentNode.children[1], {'left':'50px', 'bottom':'30px'});
			$scope.oturn = true;
			//设置延迟出现以防突兀
			$timeout(function(){
				$scope.ifruit = $scope.arr_ifruit;
			},400);
		}
	};
}])
.controller('eachCtrl',['$scope',function($scope){
	var oindex = $scope.$index;
	if($scope.arr_ifruit[oindex].buy){
		$scope.li_border = "li_adds";
		$scope.con = "取消购买";
		$scope.have_click = "have_adds";
	}else{
		$scope.li_border = "";
		$scope.con = "添加到购物车";
		$scope.have_click = "";
	}
	//点击-号时
	$scope.reduce = function(){
		if($scope.arr_ifruit[oindex].num == 1){
			return;
		}
		$scope.arr_ifruit[oindex].num = $scope.arr_ifruit[oindex].num-1;
		if($scope.arr_ifruit[oindex].buy){
			$scope.all_cal.allPrice = $scope.all_cal.allPrice - $scope.fruit.price;
		}
	};
	//点击+号时
	$scope.add = function(){
		if($scope.arr_ifruit[oindex].num == 99){
			return;
		}
		$scope.arr_ifruit[oindex].num = $scope.arr_ifruit[oindex].num + 1 ;
		if($scope.arr_ifruit[oindex].buy){
			$scope.all_cal.allPrice = $scope.all_cal.allPrice + $scope.fruit.price;
		}
	};
	//点击添加到购物车
	$scope.addTo = function(event){
		if($scope.arr_ifruit[oindex].buy){
			$scope.con = "添加到购物车";
			$scope.all_cal.allPrice = $scope.all_cal.allPrice - $scope.fruit.price*$scope.arr_ifruit[oindex].num;
			$scope.arr_ifruit[oindex].buy = false;
			$scope.li_border = "";
			$scope.have_click = "";
		}else{
			$scope.con = "取消购买";
			$scope.all_cal.allPrice = $scope.all_cal.allPrice + $scope.fruit.price*$scope.arr_ifruit[oindex].num;
			$scope.arr_ifruit[oindex].buy = true;
			$scope.li_border = "li_adds";
			$scope.have_click = "have_adds";
		}
	};
}]);
function setStyle(obj,json){
	for(attr in json){
		obj.style[attr] = json[attr];
	}
}
