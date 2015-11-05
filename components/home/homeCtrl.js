var app = angular.module('quizApp');

app.controller('HomeCtrl', function($scope, quizList) {
	
	$scope.quizzes = quizList;
})