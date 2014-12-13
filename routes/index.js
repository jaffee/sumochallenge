var express = require('express');
var sequelize = require('sequelize');
var router = express.Router();
var models = require('../models');


function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

/* GET home page. */
router.get('/', function(req, res) {
	if (!("seenQuestions" in  res.cookie)) {
		res.cookie.seenQuestions = [];
		res.cookie.maxAge = 1000000;
	}
	var seenQuestions = res.cookie["seenQuestions"];

	// find all questions that are not in seenQuestions
	models.Question.findAll({
		// couldn't find the way to do NOT IN list, so... this hack
		where: sequelize.and.apply(this, seenQuestions.map(function (id){
			return {id: {ne: id}};
		})),
		include: [models.Option]
	}).then(function(questions){
		if(questions.length != 0){
			// pick one at random
			var question = questions[getRandomInt(0, questions.length)];
			res.cookie.seenQuestions.push(question.id);
			res.render('index', {
				title: 'Sumo Challenge',
				question: question
			});
		}
		else {
			res.render('index', {title: 'Sumo Challenge'});
		}
	});
});


router.get('/admin', function(req, res) {
	models.Question.findAll({
		include: [ models.Option ]
	}).then(function(questions) {
		models.Response.findAll({
			include: [models.Option, models.Question]
		}).then(function (responses){
			res.render('admin', {
				title: 'Sumo Challenge',
				questions: questions,
				responses: responses
			});
		});
	});
});

module.exports = router;
