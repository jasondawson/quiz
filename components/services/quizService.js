var app = angular.module('quizApp');

app.service('quizService', function ($q, $firebaseObject) {

	var firebaseUrl = '<url to your firebase app>'

	var quizzes = new Firebase(firebaseUrl + '/quizzes');
	var quizzesObj = $firebaseObject(quizzes);


	var getNames = function (list) {
		var names = [];
		for (var key in list) {
			if (list.hasOwnProperty(key) && key.charAt(0) !== '$') {
				names.push({ 'name': key, 'displayName': list[key].name });
			}
		}
		return names;
	}

	this.getQuizNames = function () {
		var dfd = $q.defer();

		quizzesObj.$loaded().then(function () {
			var names = getNames(quizzesObj);
			dfd.resolve(names);
		})
		return dfd.promise;
	}

	this.getQuestions = function (name) {
		var dfd = $q.defer();
		quizzesObj.$loaded().then(function() {
			var questions = quizzesObj[name].questions;
			dfd.resolve(questions);
		})
		return dfd.promise;
	}
	
	this.saveMyAnswers = function(answers, quiz) {
		var dfd = $q.defer();
		var myAnswers = $firebaseObject(new Firebase(firebaseUrl + '/answers/'));
		myAnswers.$loaded().then(function() {
			myAnswers[quiz] = answers;
			myAnswers.$save();
			dfd.resolve('answers saved');
		})
		return dfd.promise;
	}
	
	
	this.checkMyAnswers = function(questions, answers) {
		var dfd = $q.defer();
		var results = {
			done: true
		};
		for (var i = 0; i < questions.length; i++) {
			var isCorrect = questions[i].qtype === 'multiple' ? questions[i].choices[questions[i].correct] === answers[questions[i].id] : (questions[i].qtype === 'blank' ? questions[i].correct === answers[questions[i].id] : false)
			results[questions[i].id] = isCorrect;
		}
		dfd.resolve(results);
		
		return dfd.promise;
	}

})
