angular.module("AllBlogApp", [])
	.controller("AllBlogController", AllBlogController);

		function AllBlogController($scope, $http, $rootScope){

			function init(){
				getAllPosts();
			}
		init();


		function getAllPosts(){
			console.log("In getAllPosts");
			$http
			.get("/api/blogpost")
			.then(function(allPosts){
				$scope.allPostsData = allPosts.data;
				console.log($scope.allPostsData)
			});
		}

};