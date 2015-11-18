var app = angular.module('quizApp');

app.service('quizService', function ($q, $firebaseObject, $firebaseArray) {
	
	var firebaseUrl = '<your firebase url>'

	var quizzes = new Firebase(firebaseUrl + '/quizzes');
	var quizzesObj = $firebaseObject(quizzes);
	var answers = new Firebase(firebaseUrl + '/answers')
	var pastQuizArray = $firebaseArray(answers);


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
			.catch(function (err) {
				dfd.reject(err);
			})
		return dfd.promise;
	}

	this.getPastQuizzes = function () {
		var dfd = $q.defer();

		pastQuizArray.$loaded().then(function (snapshot) {
			var pastQuizObj = {};

			dfd.resolve(pastQuizArray);
		})
			.catch(function (err) {
				dfd.reject(err)
			})

		return dfd.promise;
	}
	
	this.getAnswers = function (quizName, quiz) {
		console.log(quizName, quiz)
		var dfd = $q.defer();
		
		var quizAnswersRef = new Firebase(firebaseUrl + '/answers/' + quizName + '/' + quiz);
		var quizAnswers = $firebaseObject(quizAnswersRef)
		quizAnswers.$loaded()
			.then(function () {
				console.log(quizAnswers)
				var answers = quizAnswers.answers;
				console.log(answers);
				dfd.resolve(answers);
			})
			.catch(function (err) {
				dfd.reject(err);
			})
		
		return dfd.promise;
	}

	this.getQuestions = function (name) {
		var dfd = $q.defer();
		quizzesObj.$loaded().then(function () {
			var questions = quizzesObj[name].questions;
			dfd.resolve(questions);
		})
		.catch(function (err) {
				dfd.reject(err)
			})
		return dfd.promise;
	}

	this.saveMyAnswers = function (answers, quiz, quizDate, quizName) {
		var dfd = $q.defer();
		var myAnswers = new Firebase(firebaseUrl + '/answers/' + quiz + '/' + quizDate + '/answers');
		if (quizName) {
			myAnswers.parent().set({name: quizName})
		} 
		myAnswers.set(answers);
		dfd.resolve('answers saved');

		return dfd.promise;
	}


	this.checkMyAnswers = function (questions, answers) {
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
