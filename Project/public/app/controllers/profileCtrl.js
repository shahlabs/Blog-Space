angular.module("ProfileApp", [])
	.controller("ProfileController", ProfileController);
	function ProfileController($scope, $http, $rootScope){
		$scope.createProfile = createProfile;
		$scope.deleteProfile = deleteProfile;
		$scope.editProfile = editProfile;
		$scope.updateProfile = updateProfile;
		$scope.getProfilesByName = getProfilesByName;

		function getProfilesByName(){
			$http
			.get("/api/profileposts/"+$rootScope.currentUserEmail)
			.then(function(allProfiles){
				$scope.allProfilesData = allProfiles.data.Item.profiles;
			});
		}

		function updateProfile(prof){
			var profID = prof.profileid;
			var emailid = $rootScope.currentUserEmail;
			$http
			.put("/api/profilepost/"+profID+"/"+emailid, prof)
			.then(successCallback, errorCallback);
			function successCallback(){
				    //success code
				    init();
				    $scope.prof = null
				}
				function errorCallback(error){
				    //error code
				};
		}

		function editProfile(prof){
			console.log(prof);
			var profID = prof.profileid;
			var emailid = $rootScope.currentUserEmail;
			console.log("In edit profile controller");
			$http
			.get("/api/profilepost/"+profID+"/"+emailid)
			.then(function(prof){
				$scope.prof=prof.data;
			});
		}

		function init(){
			getProfilesByName();
		}
		init();
		
		function deleteProfile(prof){
			var profID = prof.profileid;
			var emailid = $rootScope.currentUserEmail;
			//console.log("In delete post--", post.postid);
			$http
			.delete("/api/profilepost/"+profID+"/"+emailid)
			.then(getProfilesByName);
		}


		function createProfile(prof) {
			console.log(prof);
			prof.postedBy = $rootScope.currentUserEmail;
			console.log(prof.postedBy);
			$http
			.post("/api/profilepost", prof).then(successCallback, errorCallback);

				function successCallback(){
				    //success code
				   init();
				   $scope.prof = null
				}
				function errorCallback(error){
				    //error code
				};
			//.success(getAllPosts);
			  
		}
	};