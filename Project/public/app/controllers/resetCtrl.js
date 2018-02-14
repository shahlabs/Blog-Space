angular.module("ResetApp", ['ngRoute'])
	.controller("ResetController", ResetController);


	function ResetController($scope, $http, $routeParams){
		$scope.sendEmail = sendEmail;
		$scope.changePassword = changePassword;		
		function sendEmail(userEmail){
			var email = userEmail;
			console.log("In resetPassword--", email);
			$http
			.post("/api/resetPassword/"+email)
			.then(function(resp){
				$scope.resp=resp.data;
			});
		}

		function changePassword(user){
			console.log("In changePassword--", user);
			//var path = $location.path();

			user.token = $routeParams.randomToken;
			$http
			.post("/api/changePassword/",user)
			.then(function(){
				
			});
		}

	};