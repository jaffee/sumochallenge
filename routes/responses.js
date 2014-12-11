var express = require('express');
var models  = require('../models');
var router = express.Router();

router.post('/create/:question_id', function(req, res) {
	models.Response.create({}).then(function(response) {
		question_id = req.param('question_id');
		option_id = req.param(question_id);
		response.setQuestion(question_id);
		response.setOption(option_id).then(function () {
			res.redirect('/');
		});
		// for(var i = 0; i < names.length; i++){
		// 	var optionString = req.param(names[i]);
		// 	if(optionString){
		// 		optStrings.push(optionString);
		// 	}
		// }
		// for(i = 0; i < optStrings.length; i++){
		// 	optionString = optStrings[i];
		// 	if (optionString){
		// 		models.Option.create({
		// 			optionString: optionString
		// 		}).then(function (opt){
		// 			if (opt.optionString == optStrings[optStrings.length - 1]){
		// 				opt.setQuestion(question).then(function () {
		// 					res.redirect('/admin');
		// 				});
		// 			}
		// 			else {
		// 				opt.setQuestion(question);
		// 			}
		// 		});
		// 	}
		// }
	});
});

module.exports = router;
