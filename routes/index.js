var express = require('express');
var router = express.Router();
var models = require('../models');


function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

/* GET home page. */
router.get('/', function(req, res) {
	models.Question.max('id').success(function (max){
		var rand_id = getRandomInt(1, max+1);
		models.Question.find({where: {id: rand_id}, include: [models.Option]}).then(function(question){
			res.render('index', {
				title: 'Sumo Challenge',
				question: question});
		});
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
