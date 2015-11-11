var app = angular.module('quizApp');

app.controller('ResultsCtrl', function ($scope, answers, questions, quizService, $stateParams) {
	$scope.answers = answers;
	$scope.questions = questions;
	
	$scope.quizName = $stateParams.quizName.charAt(0).toUpperCase() + $stateParams.quizName.substr(1).toLowerCase();
	var date = $stateParams.quiz
	$scope.quizDate = moment()
	
	$scope.checkMyAnswers = function () {
		quizService.checkMyAnswers($scope.questions, $scope.answers).then(function (response) {
			$scope.results = response;
		});
	}
	
	$scope.checkMyAnswers();
	
})