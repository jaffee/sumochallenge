var express = require('express');
var models  = require('../models');
var router = express.Router();

router.post('/create', function(req, res) {
	models.Question.create({
		questionString: req.param('question_text')
	}).then(function(question) {
		var optStrings = [];
		var form_keys = Object.keys(req.body);
		for(var i = 0; i < form_keys.length; i++){
			// for each key that starts with "option"
			if (form_keys[i].lastIndexOf("option", 0) === 0){
				var optionString = req.body[form_keys[i]];
				if(optionString){
					optStrings.push(optionString);
				}
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
