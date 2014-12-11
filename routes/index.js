var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Sumo Challenge' });
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


module.exports = router;
