angular.module('userApp', ['appRoutes','userControllers','userServices', 'mainController','authServices', 'BlogApp','ProfileApp','ResetApp','AllBlogApp','AllProfileApp'])

.config(function($httpProvider){
	$httpProvider.interceptors.push('AuthInterceptors');
});
