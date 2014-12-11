"use strict";

module.exports = function(sequelize, DataTypes) {
	var Question = sequelize.define("Question", {
		questionString: DataTypes.STRING
	}, {
		classMethods: {
			associate: function(models) {
				Question.hasMany(models.Option);
			}
		}
	});

	return Question;
};
