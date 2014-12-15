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



/*
 Results object:
{ questionID: {
    questionString: string,
    options: question.Options, (with num_responses added to each option)
    total: num
  }
}
*/
var construct_results = function(questions, responses){
	var results = {};
	var question;
	for(var i = 0; i < questions.length; i++){
		question = questions[i];
		// initialize num_responses to each option
		for(var j = 0; j < question.Options.length; j++){
			question.Options[j]["num_responses"] = 0;
		}
		var q_obj = {questionString: question.questionString,
					 options: question.Options,
					 total: 0};
		results[question.id] = q_obj;
	}
	var response;
	for(i = 0; i < responses.length; i++){
		response = responses[i];
		if (response.Question && response.Option){
			add_result_to_options(results[response.Question.id]["options"], response.Option);
			results[response.Question.id]["total"] += 1;
		}
	}

	return results;
};

var add_result_to_options = function(options, option){
	var opt;
	for(var i = 0; i < options.length; i ++){
		opt = options[i];
		if (opt.id == option.id){
			opt["num_responses"] += 1;
			break;
		}
	}
};




router.get('/admin', function(req, res) {
	models.Question.findAll({
		include: [ models.Option ]
	}).then(function(questions) {
		models.Response.findAll({
			include: [models.Option, models.Question]
		}).then(function (responses){
			var results = construct_results(questions, responses);
			res.render('admin', {
				title: 'Sumo Challenge',
				results: results
			});
		});
	});
});

module.exports = router;
