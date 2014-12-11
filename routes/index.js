var express = require('express');
var router = express.Router();
var models = require('../models');


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

/* GET home page. */
router.get('/', function(req, res) {
	models.Question.max('id').success(function (max){
		models.Question.find({id: getRandomInt(1, max+1)}).then(function(question){
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
		res.render('admin', {
			title: 'Sumo Challenge',
			questions: questions
		});
	});
});

//

module.exports = router;
