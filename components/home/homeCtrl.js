var app = angular.module('quizApp');

app.controller('HomeCtrl', function($scope, quizList, pastQuizList) {
	console.log(pastQuizList)
	$scope.quizzes = quizList;
	$scope.pastQuizzes = pastQuizList;
})