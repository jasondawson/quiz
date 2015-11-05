var app = angular.module('quizApp');

app.directive('fillBlank', function() {
	return {
		scope: {
			question: '=',
			save: '&',
			answers: '='
		},
		restrict: 'AE',
		replace: true,
		templateUrl: 'components/quiz/partials/fillBlankTmpl.html',
		controller: function($scope) {
			$scope.$watch('question', function() {
				$scope.formattedQuestion = $scope.question.title;
				if ($scope.answers[$scope.question.id]) {
					$scope.answer = $scope.answers[$scope.question.id];	
				} else {
					$scope.answer = '';
				}
				
			})
			
			$scope.saveAnswer = function(answer) {
				$scope.save({id: $scope.question.id, answer: answer})
				
			}
		}
	}
})