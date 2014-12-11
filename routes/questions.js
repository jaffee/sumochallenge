var express = require('express');
var models  = require('../models');
var router = express.Router();

router.post('/create', function(req, res) {
	models.Question.create({
		questionString: req.param('question_text')
	}).then(function(question) {
		// hack to not support arbitrary no. of options yet
		var names = ["option_one", "option_two", "option_three", "option_four"];
		var optStrings = [];
		for(var i = 0; i < names.length; i++){
			var optionString = req.param(names[i]);
			if(optionString){
				optStrings.push(optionString);
			}
		}
		for(i = 0; i < optStrings.length; i++){
			optionString = optStrings[i];
			if (optionString){
				models.Option.create({
					optionString: optionString
				}).then(function (opt){
					if (opt.optionString == optStrings[optStrings.length - 1]){
						opt.setQuestion(question).then(function () {
							res.redirect('/admin');
						});
					}
					else {
						opt.setQuestion(question);
					}
				});
			}
		}
	});
});

module.exports = router;
