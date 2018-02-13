angular.module("AllProfileApp", [])
	.controller("AllProfileController", AllProfileController);

	function AllProfileController($scope, $http, $rootScope){


		function init(){
				getAllProfiles();
		}
		init();


		function getAllProfiles(){
			console.log("In getAllProfiles");
			$http
			.get("/api/profilepost")
			.then(function(allProfiles){
				$scope.allProfilesData = allProfiles.data;
				console.log($scope.allProfilesData)
			});
		}

	};