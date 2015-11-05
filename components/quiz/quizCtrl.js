var app = angular.module('quizApp');

app.controller('QuizCtrl', function ($scope, questions, quizService, $stateParams) {

	$scope.obj = {};
	$scope.obj.instant = false;
	$scope.results = {};

	$scope.questions = questions;
	$scope.answers = {};
	$scope.currentQuestion = $scope.questions[0];
	
	$scope.setCurrentQuestion = function (question) {
		$scope.currentQuestion = question;
	}

	$scope.nextQuestion = function () {
		var idx = $scope.questions.indexOf($scope.currentQuestion);
		if ($scope.questions[idx + 1]) {
			$scope.currentQuestion = $scope.questions[idx + 1];
		} else {
			return;
		}
	}

	$scope.saveAnswer = function (id, answer) {
		$scope.answers[id] = answer;
		$scope.nextQuestion();
		
		if ($scope.results.done || $scope.obj.instant) {
		//we've already hit 'check answers' so update the answer results
			$scope.checkMyAnswers();
		}
	}
	
	$scope.saveMyAnswers = function() {
		quizService.saveMyAnswers($scope.answers, $stateParams.quizName)
			.then(function(message) {
				console.log(message)	
			});
	}
	
	$scope.checkMyAnswers = function() {
		quizService.checkMyAnswers($scope.questions, $scope.answers).then(function(response) {
			$scope.results = response;
		});
	}
	
	$scope.reset = function() {
		$scope.obj.instant = false;
		$scope.results = {};
		$scope.answers = {};
		$scope.currentQuestion = $scope.questions[0]
	}
	
	$scope.checkForResults = function() {
		if ($scope.obj.instant && !$scope.results.hasOwnProperty(questions[0].id)) {
			$scope.checkMyAnswers();
		}
	}

});