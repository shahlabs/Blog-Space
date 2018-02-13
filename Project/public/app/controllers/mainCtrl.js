 angular.module('mainController',['authServices'])
	.controller('mainCtrl', function(Auth, $timeout, $location, $rootScope){
		var app =this;

		app.loadme = false; // this variable is to hide all the html code taht loads when the internet is slow
		

		$rootScope.$on('$routeChangeStart', function(){
			if(Auth.isLoggedIn()){
				console.log("User is logged in");
				app.isLoggedIn = true;
				Auth.getUser().then(function(data){
					console.log(data.data.username);
					app.username = data.data.username;
					app.email = data.data.email;
					app.loadme = true;
					$rootScope.currentUser = app.username;
					$rootScope.currentUserEmail = app.email;
					console.log("var in rootscope:", $rootScope.currentUserEmail );
				})
			}else {
				console.log("User is NOT logged in");
				app.isLoggedIn = false;
				app.username = 'BlogFolio';
				app.loadme = true;
			}
		});

			

		this.doLogin = function(loginData){
			app.loading =true;
			app.errorMsg = false;
			

			// console.log("Testing button");
			// console.log(this.regData);
			// $http.post('/api/users', this.regData)


			Auth.login(app.loginData).then(function(data){
				console.log(data);
				if(data.data.success){
					app.loading = false;
					app.successMsg = data.data.message;
					$timeout(function() {
						$location.path('/about'); 
						app.loginData = '';
						app.successMsg = false;
					}, 2000);
					
				}else{
					app.loading = false;
					app.errorMsg = data.data.message;
				}
			});
		};
		

		this.logout = function(){
			Auth.logout();
			$rootScope.currentUser = "";
			$location.path('/logout');
			// $timeout(function(){
			// 	$location.path('/');
			// }, 5000);
		};
	});





// .controller('regCtrl', function($http, $location, $timeout, User){

// 		var app =this;

// 		this.regUser = function(regData){
// 			app.loading =true;
// 			app.errorMsg = false;
			

// 			// console.log("Testing button");
// 			// console.log(this.regData);
// 			// $http.post('/api/users', this.regData)
// 			User.create(app.regData).then(function(data){
// 				console.log(data);
// 				if(data.data.success){
// 					app.loading = false;
// 					app.successMsg = data.data.message;
// 					$timeout(function() {
// 						$location.path('/'); 
// 					}, 2000);
					
// 				}else{
// 					app.loading = false;
// 					app.errorMsg = data.data.message;
// 				}
// 			});
// 		};
// 	});

