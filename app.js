var app = angular.module('quizApp', ['ui.router', 'firebase']);

app.run(function ($rootScope, $state) {
	
	$rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
		console.log('error', error);
	});
	
	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
		if(toState.name === 'quiz') {
			event.preventDefault();
			$state.go('quiz.view', toParams)
		}
	})
});

app.config(function ($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'components/home/homeView.html',
			controller: 'HomeCtrl',
			resolve: {
				quizList: function (quizService) {
					return quizService.getQuizNames();
				}
			}
		})
		.state('quiz', {
			url: '/quiz/:quizName',
			templateUrl: 'components/quiz/views/quizContainerView.html',
			controller: 'QuizCtrl',
			resolve: {
				questions: function (quizService, $state, $stateParams) {
					var name = $stateParams.quizName
					return quizService.getQuestions(name);
				}
			},

		})
		.state('quiz.view', {
			parent: 'quiz',
			views: {
				'list': {
					templateUrl: 'components/quiz/views/questionListView.html'
				},
				'detail': {
					templateUrl: 'components/quiz/views/questionDetailView.html'
				}
			}
		})

})


