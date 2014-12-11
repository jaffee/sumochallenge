"use strict";

module.exports = function(sequelize, DataTypes) {
	var Option = sequelize.define("Option", {
		optionString: DataTypes.STRING
	}, {
		classMethods: {
			associate: function(models) {
				Option.belongsTo(models.Question);
			}
		}
	});

	return Option;
};
