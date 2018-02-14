angular.module("BlogApp", [])
	.controller("BlogController", BlogController);
	function BlogController($scope, $http, $rootScope){
		$scope.createPost = createPost;
		$scope.deletePost = deletePost;
		$scope.editPost = editPost;
		$scope.updatePost = updatePost;
		$scope.getPostsByName = getPostsByName;

		function getPostsByName(){
			console.log("In getPostsByName blogctrl:", $rootScope.currentUserEmail);
			$http
			.get("/api/blogposts/"+$rootScope.currentUserEmail)
			.then(function(allPosts){
				$scope.allPostsData = allPosts.data.Item.blogs;
				console.log("allPostsData---", $scope.allPostsData);
			});
		}

		function updatePost(post){
			console.log("In updatePost post--",post.postid);
			var postID = post.postid;
			var emailid = $rootScope.currentUserEmail;
			$http
			.put("/api/blogpost/"+postID+"/"+emailid, post)
			.then(successCallback, errorCallback);
			function successCallback(){
				    //success code
				    init();
				    $scope.post = null
				}
				function errorCallback(error){
				    //error code
				};

		}

		function editPost(post){
			console.log("In edit post--",post.postid);
			var postID = post.postid;
			var emailid = $rootScope.currentUserEmail;
			// this will go get a post with the id
			$http
			.get("/api/blogpost/"+postID+"/"+emailid)
			.then(function(post){
				$scope.post=post.data;
			});
		}

		function init(){
			//getAllPosts();
			getPostsByName();
		}
		init();
		
		function deletePost(post){
			var postID = post.postid;
			var emailid = $rootScope.currentUserEmail;
			console.log("In delete post--", post.postid);
			$http
			.delete("/api/blogpost/"+postID+"/"+emailid)
			.then(getPostsByName);
		}

		function getAllPosts(){
			console.log("In getAllPosts");
			$http
			.get("/api/blogpost")
			.then(function(allPosts){
				$scope.allPostsData = allPosts.data.Item.blogs;
			});
		}

		function createPost(post) {
			console.log(post);
			post.bloggedBy = $rootScope.currentUserEmail;
			console.log("Rootscope-- ", $rootScope.currentUserEmail);
			console.log("BLOGGED BY: ",post.bloggedBy);
			$http
			.post("/api/blogpost", post).then(successCallback, errorCallback);

				function successCallback(){
				    //success code
				    init();
				    $scope.post = null
				}
				function errorCallback(error){
				    //error code
				};
			//.success(getAllPosts);
			  
		}
	};