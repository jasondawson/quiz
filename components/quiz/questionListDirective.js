var app = angular.module('quizApp');

app.directive('questionList', function () {
	return {
		scope: {
			obj: '=',
			questions: '=',
			results: '=',
			answers: '=',
			currentQuestion: '=',
			setCurrentQuestion: '&?'
		},
		templateUrl: 'components/quiz/partials/questionListView.html',
		controller: function ($scope, quizService, $stateParams) {

			// $scope.obj = {};
			// $scope.obj.instant = false;
			// $scope.results = {};

			// $scope.currentQuestion = $scope.questions[0];

			$scope.setQuestion = function (question) {
				$scope.setCurrentQuestion({ question: question });
			}

			// $scope.nextQuestion = function () {
			// 	var idx = $scope.questions.indexOf($scope.currentQuestion);
			// 	if ($scope.questions[idx + 1]) {
			// 		$scope.currentQuestion = $scope.questions[idx + 1];
			// 	} else {
			// 		return;
			// 	}
			// }

			// $scope.saveAnswer = function (id, answer) {
			// 	$scope.answers[id] = answer;
			// 	$scope.nextQuestion();

			// 	if ($scope.results.done || $scope.obj.instant) {
			// 		//we've already hit 'check answers' so update the answer results
			// 		$scope.checkMyAnswers();
			// 	}
			// }

			// $scope.saveMyAnswers = function () {
			// 	$scope.saving = false;
			// 	quizService.saveMyAnswers($scope.answers, $stateParams.quizName, $scope.saveQuizName)
			// 		.then(function (message) {
			// 			console.log(message)
			// 		});
			// }

			// $scope.checkMyAnswers = function () {
			// 	quizService.checkMyAnswers($scope.questions, $scope.answers).then(function (response) {
			// 		$scope.results = response;
			// 	});
			// }

			// $scope.reset = function () {
			// 	$scope.obj.instant = false;
			// 	$scope.results = {};
			// 	$scope.answers = {};
			// 	$scope.currentQuestion = $scope.questions[0]
			// }

			// $scope.checkForResults = function () {
			// 	if ($scope.obj.instant && !$scope.results.hasOwnProperty(questions[0].id)) {
			// 		$scope.checkMyAnswers();
			// 	}
			// }
			

		}
	}
})