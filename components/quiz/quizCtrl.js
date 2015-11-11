var app = angular.module('quizApp');

app.controller('QuizCtrl', function ($scope, questions, quizService, $stateParams) {
	$scope.saving = false;

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

	$scope.saveMyAnswers = function () {
		$scope.saving = false;
		
		var customName = $scope.obj.defaultQuizName !== $scope.obj.saveQuizName ? $scope.obj.saveQuizName : null;
		console.log('customName', customName)
		quizService.saveMyAnswers($scope.answers, $stateParams.quizName, $scope.obj.defaultQuizName, customName)
			.then(function (message) {
				console.log(message)
			});
	}

	$scope.checkMyAnswers = function () {
		quizService.checkMyAnswers($scope.questions, $scope.answers).then(function (response) {
			$scope.results = response;
		});
	}

	$scope.reset = function () {
		$scope.obj.instant = false;
		$scope.obj.saveQuizName = '';
		$scope.results = {};
		$scope.answers = {};
		$scope.currentQuestion = $scope.questions[0]
	}

	$scope.checkForResults = function () {
		if ($scope.obj.instant && !$scope.results.hasOwnProperty(questions[0].id)) {
			$scope.checkMyAnswers();
		}
	}

	$scope.savePrompt = function () {
		$scope.obj.saveQuizName = moment().format('YYYYMMDDHHmmss');
		$scope.obj.defaultQuizName = $scope.obj.saveQuizName;
		// $scope.obj.defaultQuizName = moment($scope.obj.saveQuizName, 'YYYYMMDDHHmmss').format('MMM DD, YYYY HH:mm:ss')
		// console.log($scope.obj.defaultQuizName);
		$scope.saving = true;
	}

	$scope.cancelSave = function () {
		$scope.saving = false;
	}

});